import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { AtlasData } from '../types/atlas';
import { ANATOMICAL_SYSTEMS, DEFAULT_VISIBLE_SYSTEM_IDS } from '../data/systems';
import { decompressGzip } from '../utils/decompression';
import { calculateKnollingLayout } from '../utils/knolling';
import type { KnollingLayout } from '../utils/knolling';
import { FEMALE_MESH_CATALOG, type FemaleAnatomyPart } from '../data/femaleMeshCatalog';
import { fetchWithCache, fetchJsonWithCache } from '../utils/cacheStorage';

export interface ViewerOptions {
  container: HTMLDivElement;
  atlas: AtlasData;
  onSelectPart: (partId: string) => void;
  onProgress: (percent: number) => void;
  onError: (error: string) => void;
}

const SYSTEM_COLORS: Record<string, number> = {
  skeletal: 0xf4e8d0,
  borrowed: 0xf4e8d0, // Fitted skull, ribs, pelvis, arms, hands, feet bones
  muscular: 0xc85a53,
  'donor-muscle': 0xc85a53, // Female leg & lower extremity muscles
  cardiac: 0xd32f2f,
  arterial: 0xe53935,
  venous: 0x1e88e5,
  circulatory: 0xd32f2f,
  respiratory: 0x64b5f6,
  digestive: 0xffb74d,
  urinary: 0x81c784,
  reproductive: 0xec407a,
  pregnancy: 0xf06292,
  nervous: 0xfff176,
  brain: 0xce93d8, // Distinct Lilac for cerebral hemispheres & cerebellum
  endocrine: 0xba68c8,
  lymphatic: 0xaed581,
  integumentary: 0xdeb887,
  sensory: 0x4dd0e1,
  connective: 0xd7ccc8,
};

export const MALE_GENITALIA_IDS = new Set([
  'FJ3132', 'FJ3133', 'FJ3134', 'FJ3135', 'FJ3136',
  'FJ3137', 'FJ3138', 'FJ3139', 'FJ3140', 'FJ3141',
  'FJ3142', 'FJ3143'
]);

export const FEMALE_SPECIFIC_PARTS = new Set([
  'HRAF0003', // Female skin silhouette
  // Left breast & mammary structures
  'HRAF0004', 'HRAF0005', 'HRAF0006', 'HRAF0007', 'HRAF0008', 'HRAF0009', 'HRAF0010', 'HRAF0011',
  // Right breast & mammary structures
  'HRAF0012', 'HRAF0013', 'HRAF0014', 'HRAF0015', 'HRAF0016', 'HRAF0017', 'HRAF0018', 'HRAF0019',
  // Female reproductive organs & pelvic ligaments
  'HRAF0406', 'HRAF0407', 'HRAF0408', 'HRAF0409', 'HRAF0410', 'HRAF0411', 'HRAF0412', 'HRAF0413',
  'HRAF0414', 'HRAF0415', 'HRAF0416', 'HRAF0417', 'HRAF0418', 'HRAF0419', 'HRAF0420', 'HRAF0421',
  'HRAF0422', 'HRAF0423', 'HRAF0424', 'HRAF0425', 'HRAF0426', 'HRAF0427', 'HRAF0428', 'HRAF0429',
  'HRAF0430', 'HRAF0431', 'HRAF0432', 'HRAF0433', 'HRAF0434', 'HRAF0435', 'HRAF0436', 'HRAF0437',
  'HRAF0438', 'HRAF0439', 'HRAF0440', 'HRAF0441', 'HRAF0442', 'HRAF0443'
]);

// The HRA female atlas is the source of truth for female skin and native organs.
// Muscular coverage is partial, so shared male muscles remain only as a fallback.
const FEMALE_REPLACED_MALE_SYSTEMS = new Set([
  'integumentary',
  'sensory',
  'nervous',
  'brain',
  'digestive',
  'urinary',
  'cardiac',
  'arterial',
  'venous',
  'respiratory',
  'lymphatic',
  'skeletal',
  'connective',
  'reproductive',
]);

function isFemaleRenderablePart(_part: { id: string; system: string }): boolean {
  // Every official female-atlas mesh is loadable. Pregnancy meshes remain hidden by updateFemaleState
  // until the related part is explicitly selected, so they are available for study without showing by default.
  return true;
}

function isFemaleBreastPart(partId: string): boolean {
  return partId >= 'HRAF0004' && partId <= 'HRAF0019';
}

function normalizeMuscleName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\b(left|right|muscle|muscles|musculus|extraocular|oculi|oculus|eyes?|of)\b/g, ' ')
    .replace(/\bmedialis\b/g, 'medial')
    .replace(/\blateralis\b/g, 'lateral')
    .replace(/[^a-z0-9]+/g, '');
}

export class ThreeViewer {
  private container: HTMLDivElement;
  private atlas: AtlasData;
  private onSelectPart: (partId: string) => void;
  private onProgress: (percent: number) => void;
  private onError: (error: string) => void;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  // Active Gender
  private activeGender: 'male' | 'female' = 'male';
  private maleRoot = new THREE.Group();
  private femaleRoot = new THREE.Group();

  // GPU DataTextures (Male BodyParts3D)
  private stateWidth = 4096;
  private partStateArray!: Float32Array;
  private partStateTexture!: THREE.DataTexture;
  private selectionArray!: Uint8Array;
  private selectionTexture!: THREE.DataTexture;

  // Male Geometry & meshes
  private systemMaterials = new Map<string, THREE.MeshStandardMaterial>();
  private systemMeshes = new Map<string, THREE.Mesh>();
  private individualMeshes: THREE.Mesh[] = [];
  private partCentroids: THREE.Vector3[] = [];
  private partBoundingBoxes: THREE.Box3[] = [];
  private knolledCentroids: THREE.Vector3[] = [];
  // Cache the knolling layout by viewport aspect ratio; it should not be repacked on every animation frame.
  private knollingLayoutAspect: number | null = null;

  // Female Geometry & GPU DataTextures (Complete HuBMAP Female Reference Atlas + Fitted Skeleton & VHF Muscles)
  private femaleAtlas: AtlasData | null = null;
  private femaleLoaded = false;
  private femaleLoading = false;
  private femaleStateWidth = 2048;
  private femalePartStateArray!: Float32Array;
  private femalePartStateTexture!: THREE.DataTexture;
  private femaleSelectionArray!: Uint8Array;
  private femaleSelectionTexture!: THREE.DataTexture;
  private femaleSystemMaterials = new Map<string, THREE.MeshStandardMaterial>();
  private femaleSystemMeshes = new Map<string, THREE.Mesh>();
  private femaleIndividualMeshes: THREE.Mesh[] = [];
  private femalePartCentroids: THREE.Vector3[] = [];
  private femalePartBoundingBoxes: THREE.Box3[] = [];
  private femaleCatalogMap = new Map<string, FemaleAnatomyPart>();
  private femaleSkinMesh: THREE.Mesh | null = null;
  private femaleReplacedMaleMuscleIds = new Set<string>();
  private skinOpacity = 0.35;

  // Stage objects
  private floorStage!: THREE.Group;
  private groundMesh?: THREE.Mesh;
  private pedestalMesh?: THREE.Mesh;

  // State
  private explodeValue = 0;
  private currentExplodeDamped = 0;
  private visibleSystems = new Set<string>();
  private selectedPartIds = new Set<string>();
  private hiddenPartIds = new Set<string>();
  private isIsolated = false;
  public currentView: 'three-quarter' | 'front' | 'side' | 'back' = 'three-quarter';
  public isAutoRotating = false;

  // Raycasting & gesture tracking
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private pointerDownPos = new THREE.Vector2();
  private pointerIsDrag = false;

  private animationFrameId = 0;
  private resizeObserver!: ResizeObserver;
  private isDestroyed = false;
  private initialized = false;

  constructor(options: ViewerOptions) {
    this.container = options.container;
    this.atlas = options.atlas;
    this.onSelectPart = options.onSelectPart;
    this.onProgress = options.onProgress;
    this.onError = options.onError;

    // Index female catalog
    FEMALE_MESH_CATALOG.forEach(p => {
      this.femaleCatalogMap.set(p.id, p);
    });

    // Use the same default visibility set as the React controls.
    DEFAULT_VISIBLE_SYSTEM_IDS.forEach(systemId => this.visibleSystems.add(systemId));

    try {
      this.initScene();
      // initScene reports WebGL creation failures via onError; stop before touching uninitialized fields.
      if (!this.renderer || !this.scene || !this.camera || !this.controls) return;

      this.initStage();
      this.initStateTextures();
      this.initMaterials();
      this.setupEvents();
      this.initialized = true;
      this.loadChunks();
      this.animate();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.onError(`The 3D anatomy viewer could not be initialized: ${message}`);
      this.destroy();
    }
  }

  public isReady(): boolean {
    return this.initialized && !this.isDestroyed;
  }

  private initScene() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    try {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      this.onError('WebGL could not be initialized on this browser.');
      return;
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    this.renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0xffffff);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    // Model root groups
    this.scene.add(this.maleRoot);
    this.scene.add(this.femaleRoot);
    this.femaleRoot.visible = false;

    // Camera setup (34 deg FOV, resting at 3/4 view)
    this.camera = new THREE.PerspectiveCamera(34, width / height, 0.005, 100);
    this.camera.position.set(1.4, 1.05, 3.6);

    // OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0.85, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.085;
    this.controls.minDistance = 0.07;
    this.controls.maxDistance = 40;
    this.controls.maxPolarAngle = Math.PI * 0.96;

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xa7aab2, 1.05);
    this.scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xfffc94, 2.3);
    dirLight1.position.set(-2, 4, 3);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe9f0ff, 1.8);
    dirLight2.position.set(2, 2, -3);
    this.scene.add(dirLight2);
  }

  private initStage() {
    this.floorStage = new THREE.Group();

    // Circular ground plane - crisp clinical white / light mint stage
    const groundGeo = new THREE.CircleGeometry(30, 96);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0xf8faf9, roughness: 0.95 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.019;
    this.groundMesh = ground;
    this.floorStage.add(ground);

    // Stage pedestal - pure clinical white
    const pedestalGeo = new THREE.CylinderGeometry(0.68, 0.7, 0.028, 100);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.55,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.016;
    this.pedestalMesh = pedestal;
    this.floorStage.add(pedestal);

    // Concentric shadow accent rings - surgical emerald green & subtle mint
    const ring1Geo = new THREE.RingGeometry(0.63, 0.635, 128);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x15803d,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = -Math.PI / 2;
    ring1.position.y = 0.001;
    this.floorStage.add(ring1);

    const ring2Geo = new THREE.RingGeometry(0.55, 0.553, 128);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 2;
    ring2.position.y = 0.001;
    this.floorStage.add(ring2);

    this.scene.add(this.floorStage);
  }

  private initStateTextures() {
    const numParts = this.atlas.parts.length;
    this.stateWidth = THREE.MathUtils.ceilPowerOfTwo(numParts);

    // 4 floats per part: [dx, dy, dz, isVisible]
    this.partStateArray = new Float32Array(this.stateWidth * 4);
    this.partStateTexture = new THREE.DataTexture(
      this.partStateArray,
      this.stateWidth,
      1,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    this.partStateTexture.needsUpdate = true;

    // 4 bytes per part: [isSelected, 0, 0, 0]
    this.selectionArray = new Uint8Array(this.stateWidth * 4);
    this.selectionTexture = new THREE.DataTexture(
      this.selectionArray,
      this.stateWidth,
      1,
      THREE.RGBAFormat,
      THREE.UnsignedByteType
    );
    this.selectionTexture.needsUpdate = true;

    // Initialize part centroids and bounding boxes
    this.partCentroids = this.atlas.parts.map(p => {
      const min = new THREE.Vector3(...p.bounds[0]);
      const max = new THREE.Vector3(...p.bounds[1]);
      return min.clone().add(max).multiplyScalar(0.5);
    });

    this.partBoundingBoxes = this.atlas.parts.map(p => {
      return new THREE.Box3(
        new THREE.Vector3(...p.bounds[0]),
        new THREE.Vector3(...p.bounds[1])
      );
    });

    this.knolledCentroids = [...this.partCentroids];
  }

  private initMaterials() {
    ANATOMICAL_SYSTEMS.forEach(sys => {
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(sys.color),
        metalness: 0.08,
        roughness: 0.53,
        side: THREE.DoubleSide,
        transparent: sys.id === 'integumentary',
        opacity: sys.id === 'integumentary' ? 0.1 : 1.0,
        depthWrite: sys.id !== 'integumentary',
      });

      // Inject GPU DataTexture lookups into material shaders
      mat.onBeforeCompile = shader => {
        shader.uniforms.partState = { value: this.partStateTexture };
        shader.uniforms.selectionState = { value: this.selectionTexture };
        shader.uniforms.stateWidth = { value: this.stateWidth };

        shader.vertexShader = `
          attribute float partIndex;
          uniform sampler2D partState;
          uniform sampler2D selectionState;
          uniform float stateWidth;
          varying float partVisible;
          varying float partSelected;
          ${shader.vertexShader}
        `;

        shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          vec2 stateUv = vec2((partIndex + 0.5) / stateWidth, 0.5);
          vec4 state = texture2D(partState, stateUv);
          transformed += state.xyz;
          partVisible = state.w;
          partSelected = texture2D(selectionState, stateUv).r;
          `
        );

        shader.fragmentShader = `
          varying float partVisible;
          varying float partSelected;
          ${shader.fragmentShader}
        `;

        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <clipping_planes_fragment>',
          `#include <clipping_planes_fragment>
          if (partVisible < 0.5) discard;
          `
        );

        // Mix vibrant cyan glow for selected parts
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <color_fragment>',
          `#include <color_fragment>
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.42, 0.85, 0.78), partSelected * 0.75);
          `
        );
      };

      this.systemMaterials.set(sys.id, mat);
    });
  }

  private async loadChunks() {
    const chunks = this.atlas.chunks;
    let completedChunks = 0;

    const systemGeometries = new Map<string, THREE.BufferGeometry[]>();

    const loadSingleChunk = async (chunkIndex: number) => {
      const chunk = chunks[chunkIndex];
      const base = import.meta.env.BASE_URL || './';
      const cleanGzip = chunk.gzip.startsWith('./')
        ? chunk.gzip.slice(2)
        : chunk.gzip.startsWith('/')
        ? chunk.gzip.slice(1)
        : chunk.gzip;
      const url = `${base.replace(/\/$/, '')}/${cleanGzip}`;
      const rawBuffer = await fetchWithCache(url);
      const decompressedBuffer = await decompressGzip(rawBuffer, chunk.bytes);

      this.atlas.parts.forEach((part, partIdx) => {
        if (part.chunk !== chunkIndex) return;

        const geo = new THREE.BufferGeometry();
        // Positions
        geo.setAttribute(
          'position',
          new THREE.BufferAttribute(
            new Float32Array(decompressedBuffer, part.positions, part.vertexCount * 3),
            3
          )
        );
        // Quantized 16-bit Normals (normalized: true)
        geo.setAttribute(
          'normal',
          new THREE.BufferAttribute(
            new Int16Array(decompressedBuffer, part.normals, part.vertexCount * 3),
            3,
            true
          )
        );
        // Indices
        geo.setIndex(
          new THREE.BufferAttribute(
            new Uint32Array(decompressedBuffer, part.indices, part.indexCount),
            1
          )
        );
        // partIndex attribute for GPU state lookup
        geo.setAttribute(
          'partIndex',
          new THREE.BufferAttribute(new Float32Array(part.vertexCount).fill(partIdx), 1)
        );

        const mesh = new THREE.Mesh(geo);
        mesh.matrixAutoUpdate = false;
        this.individualMeshes[partIdx] = mesh;

        const list = systemGeometries.get(part.system) || [];
        list.push(geo);
        systemGeometries.set(part.system, list);
      });

      completedChunks++;
      if (this.activeGender === 'male') {
        this.onProgress(Math.round((completedChunks / chunks.length) * 100));
      }
    };

    try {
      // 6 concurrent streams for rapid parallel chunk downloading
      let currentIndex = 0;
      await Promise.all(
        Array.from({ length: 6 }, async () => {
          while (currentIndex < chunks.length) {
            const idx = currentIndex++;
            await loadSingleChunk(idx);
          }
        })
      );

      // Merge geometries per system into single draw calls
      systemGeometries.forEach((geos, sysId) => {
        if (geos.length === 0) return;
        const merged = BufferGeometryUtils.mergeGeometries(geos, false);
        if (!merged) return;

        const mat = this.systemMaterials.get(sysId);
        const mesh = new THREE.Mesh(merged, mat);
        mesh.frustumCulled = false;
        this.maleRoot.add(mesh);
        this.systemMeshes.set(sysId, mesh);
      });

      this.updateStateTextures();
      if (this.activeGender === 'male') {
        this.onProgress(100);
      }
    } catch (err) {
      this.onError((err as Error).message || 'Failed to load anatomy models.');
    }
  }

  // --- FEMALE 3D MODEL LOADING (HRA female-native organs with a shared-muscle fallback) ---

  private async loadFemaleModel(): Promise<void> {
    if (this.femaleLoaded || this.femaleLoading) return;
    this.femaleLoading = true;
    this.onProgress(5);

    try {
      const base = import.meta.env.BASE_URL || './';
      const femaleAtlasUrl = `${base.replace(/\/$/, '')}/models/atlas-female.json`;
      const femaleData = await fetchJsonWithCache<AtlasData>(femaleAtlasUrl);
      this.femaleAtlas = femaleData;

      // Prefer all female-reference systems that are available in HRA v1.10.
      // Keep shared male muscles only where the female atlas has partial coverage, avoiding exact duplicates.
      const femaleMuscleNames = new Set(
        femaleData.parts
          .filter(part => part.system === 'donor-muscle' || part.system === 'muscular')
          .map(part => normalizeMuscleName(part.name))
          .filter(Boolean)
      );
      this.femaleReplacedMaleMuscleIds.clear();
      this.atlas.parts.forEach(part => {
        if (part.system === 'muscular' && femaleMuscleNames.has(normalizeMuscleName(part.name))) {
          this.femaleReplacedMaleMuscleIds.add(part.id);
        }
      });

      // 1. Initialize GPU DataTextures for female model
      this.femaleStateWidth = THREE.MathUtils.ceilPowerOfTwo(femaleData.parts.length);
      this.femalePartStateArray = new Float32Array(this.femaleStateWidth * 4);
      this.femalePartStateTexture = new THREE.DataTexture(
        this.femalePartStateArray,
        this.femaleStateWidth,
        1,
        THREE.RGBAFormat,
        THREE.FloatType
      );
      this.femalePartStateTexture.needsUpdate = true;

      this.femaleSelectionArray = new Uint8Array(this.femaleStateWidth * 4);
      this.femaleSelectionTexture = new THREE.DataTexture(
        this.femaleSelectionArray,
        this.femaleStateWidth,
        1,
        THREE.RGBAFormat,
        THREE.UnsignedByteType
      );
      this.femaleSelectionTexture.needsUpdate = true;

      // 2. Initialize Female System Materials & Shaders
      const uniqueSystems = new Set(femaleData.parts.map(p => p.system));
      uniqueSystems.forEach(sysId => {
        const colorHex = sysId === 'integumentary' ? 0xdda090 : SYSTEM_COLORS[sysId] || 0xe2e8f0;
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(colorHex),
          metalness: 0.08,
          roughness: 0.53,
          side: THREE.DoubleSide,
          transparent: false,
          opacity: 1.0,
          depthWrite: true,
        });

        mat.onBeforeCompile = shader => {
          shader.uniforms.partState = { value: this.femalePartStateTexture };
          shader.uniforms.selectionState = { value: this.femaleSelectionTexture };
          shader.uniforms.stateWidth = { value: this.femaleStateWidth };

          shader.vertexShader = `
            attribute float partIndex;
            uniform sampler2D partState;
            uniform sampler2D selectionState;
            uniform float stateWidth;
            varying float partVisible;
            varying float partSelected;
            ${shader.vertexShader}
          `;

          shader.vertexShader = shader.vertexShader.replace(
            '#include <begin_vertex>',
            `#include <begin_vertex>
            vec2 stateUv = vec2((partIndex + 0.5) / stateWidth, 0.5);
            vec4 state = texture2D(partState, stateUv);
            transformed += state.xyz;
            partVisible = state.w;
            partSelected = texture2D(selectionState, stateUv).r;
            `
          );

          shader.fragmentShader = `
            varying float partVisible;
            varying float partSelected;
            ${shader.fragmentShader}
          `;

          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <clipping_planes_fragment>',
            `#include <clipping_planes_fragment>
            if (partVisible < 0.5) discard;
            `
          );

          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <color_fragment>',
            `#include <color_fragment>
            diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.42, 0.85, 0.78), partSelected * 0.75);
            `
          );
        };

        this.femaleSystemMaterials.set(sysId, mat);
      });

      // Load every chunk needed for the female-reference body, organs, and available musculoskeletal meshes.
      // Pregnancy-only meshes remain excluded from the default female model.
      const targetChunkIndices = [...new Set(
        femaleData.parts
          .filter(isFemaleRenderablePart)
          .map(part => part.chunk)
      )].sort((a, b) => a - b);
      let completedChunks = 0;
      const systemGeometries = new Map<string, THREE.BufferGeometry[]>();
      let skinGeometry: THREE.BufferGeometry | null = null;

      const loadSingleFemaleChunk = async (chunkIndex: number) => {
        const chunk = femaleData.chunks[chunkIndex];
        if (!chunk) return;
        const cleanGzip = chunk.gzip.startsWith('./')
          ? chunk.gzip.slice(2)
          : chunk.gzip.startsWith('/')
          ? chunk.gzip.slice(1)
          : chunk.gzip;
        const url = `${base.replace(/\/$/, '')}/${cleanGzip}`;
        const rawBuffer = await fetchWithCache(url);
        const decompressedBuffer = await decompressGzip(rawBuffer, chunk.bytes);

        femaleData.parts.forEach((part, partIdx) => {
          if (part.chunk !== chunkIndex) return;
          // Use the female atlas for all non-pregnancy anatomy, not only skin/reproductive/skeletal parts.
          if (!isFemaleRenderablePart(part)) return;

          const geo = new THREE.BufferGeometry();
          geo.setAttribute(
            'position',
            new THREE.BufferAttribute(
              new Float32Array(decompressedBuffer, part.positions, part.vertexCount * 3),
              3
            )
          );
          geo.setAttribute(
            'normal',
            new THREE.BufferAttribute(
              new Int16Array(decompressedBuffer, part.normals, part.vertexCount * 3),
              3,
              true
            )
          );
          geo.setIndex(
            new THREE.BufferAttribute(
              new Uint32Array(decompressedBuffer, part.indices, part.indexCount),
              1
            )
          );
          geo.setAttribute(
            'partIndex',
            new THREE.BufferAttribute(new Float32Array(part.vertexCount).fill(partIdx), 1)
          );

          const mesh = new THREE.Mesh(geo);
          mesh.matrixAutoUpdate = false;
          this.femaleIndividualMeshes[partIdx] = mesh;

          // Centroid & Bounding Box
          const min = new THREE.Vector3(...part.bounds[0]);
          const max = new THREE.Vector3(...part.bounds[1]);
          this.femalePartBoundingBoxes[partIdx] = new THREE.Box3(min, max);
          this.femalePartCentroids[partIdx] = min.clone().add(max).multiplyScalar(0.5);

          if (part.id === 'HRAF0003') {
            skinGeometry = geo;
          } else {
            const list = systemGeometries.get(part.system) || [];
            list.push(geo);
            systemGeometries.set(part.system, list);
          }
        });

        completedChunks++;
        if (this.activeGender === 'female') {
          this.onProgress(Math.round((completedChunks / targetChunkIndices.length) * 100));
        }
      };

      // Limit decompression concurrency: the female reference contains multiple large geometry chunks,
      // and decoding all of them at once can cause avoidable memory spikes on laptops/mobile devices.
      // If one chunk fails, let in-flight workers finish but do not start more chunks; await every
      // worker before entering catch so a retry cannot race with the failed attempt.
      let nextChunkToLoad = 0;
      let chunkLoadFailed = false;
      let chunkLoadError: unknown;
      const workerCount = Math.min(4, targetChunkIndices.length);
      await Promise.all(
        Array.from({ length: workerCount }, async () => {
          while (!chunkLoadFailed && nextChunkToLoad < targetChunkIndices.length) {
            const chunkIndex = targetChunkIndices[nextChunkToLoad++];
            try {
              await loadSingleFemaleChunk(chunkIndex);
            } catch (error) {
              if (!chunkLoadFailed) {
                chunkLoadFailed = true;
                chunkLoadError = error;
              }
            }
          }
        })
      );
      if (chunkLoadFailed) {
        throw chunkLoadError instanceof Error
          ? chunkLoadError
          : new Error(String(chunkLoadError ?? 'Failed to load a female anatomy chunk'));
      }

      // 4. Merge geometries per system into single draw calls
      systemGeometries.forEach((geos, sysId) => {
        if (geos.length === 0) return;
        const merged = BufferGeometryUtils.mergeGeometries(geos, false);
        if (!merged) return;

        const mat = this.femaleSystemMaterials.get(sysId);
        const mesh = new THREE.Mesh(merged, mat);
        mesh.frustumCulled = false;
        this.femaleRoot.add(mesh);
        this.femaleSystemMeshes.set(sysId, mesh);
      });

      // 5. Dedicated translucent Skin mesh for female body contour
      if (skinGeometry) {
        const skinMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xdeb887),
          roughness: 0.65,
          metalness: 0.08,
          transparent: true,
          opacity: this.skinOpacity,
          depthWrite: false,
          side: THREE.DoubleSide,
        });
        const skinMesh = new THREE.Mesh(skinGeometry, skinMat);
        skinMesh.name = 'HRAF0003';
        skinMesh.frustumCulled = false;
        skinMesh.visible = this.skinOpacity > 0.02;
        this.femaleRoot.add(skinMesh);
        this.femaleSkinMesh = skinMesh;
      }

      this.femaleLoaded = true;
      this.femaleLoading = false;
      // Recompute shared anatomy visibility as soon as the female meshes are ready. This also
      // handles rapid male → female → male → female switching while one load is still in flight.
      this.updateStateTextures();
      this.updateFemaleState();
      if (this.activeGender === 'female') {
        this.onProgress(100);
      }
    } catch (err) {
      this.femaleLoading = false;
      this.femaleLoaded = false;
      this.femaleAtlas = null;
      this.femaleRoot.visible = false;

      // Dispose partial merged meshes and original per-part geometries (also used for raycasting).
      // Deduplicate resources because the skin geometry is referenced by both a mesh and a picker.
      const disposedGeometries = new Set<THREE.BufferGeometry>();
      const disposedMaterials = new Set<THREE.Material>();
      const disposeMeshResources = (mesh: THREE.Mesh) => {
        if (!disposedGeometries.has(mesh.geometry)) {
          mesh.geometry.dispose();
          disposedGeometries.add(mesh.geometry);
        }
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach(material => {
          if (!disposedMaterials.has(material)) {
            material.dispose();
            disposedMaterials.add(material);
          }
        });
      };
      this.femaleRoot.traverse(object => {
        if (object instanceof THREE.Mesh) disposeMeshResources(object);
      });
      this.femaleIndividualMeshes.forEach(mesh => {
        if (mesh) disposeMeshResources(mesh);
      });
      this.femaleRoot.clear();
      this.femaleSystemMeshes.clear();
      this.femaleSystemMaterials.forEach(material => {
        if (!disposedMaterials.has(material)) material.dispose();
      });
      this.femaleSystemMaterials.clear();
      this.femaleSkinMesh = null;
      this.femaleIndividualMeshes = [];
      this.femalePartCentroids = [];
      this.femalePartBoundingBoxes = [];
      this.femaleReplacedMaleMuscleIds.clear();
      this.femalePartStateTexture?.dispose();
      this.femaleSelectionTexture?.dispose();

      // Ensure the shared anatomy fallback becomes visible again after a failed or cancelled load.
      this.updateStateTextures();
      const message = err instanceof Error ? err.message : String(err);
      this.onError('महिला 3D मॉडल लोड करने में त्रुटि: ' + message);
    }
  }

  public async switchGender(gender: 'male' | 'female'): Promise<void> {
    if (this.activeGender === gender) {
      // A repeated request while the female atlas is still loading must not skip its eventual visibility refresh.
      if (gender === 'female' && !this.femaleLoaded && !this.femaleLoading) {
        await this.loadFemaleModel();
        this.updateStateTextures();
      }
      return;
    }
    this.activeGender = gender;

    // Retain shared meshes only where the female reference has no loaded replacement.
    this.maleRoot.visible = true;

    if (gender === 'female') {
      this.femaleRoot.visible = true;
      if (!this.femaleLoaded) {
        await this.loadFemaleModel();
      } else {
        this.updateFemaleState();
      }
    } else {
      this.femaleRoot.visible = false;
    }

    // Keep both rendered layers in sync after every gender transition, including a load fallback.
    this.updateStateTextures();
    if (gender === 'female' && this.femaleLoaded) this.updateFemaleState();
  }

  /** Retry the female reference load without forcing a full page refresh. */
  public async retryFemaleModel(): Promise<void> {
    if (this.activeGender !== 'female' || this.femaleLoading || this.femaleLoaded) return;
    // A previous failure hides the partial female root; make it visible before the clean retry.
    this.femaleRoot.visible = true;
    await this.loadFemaleModel();
    this.updateStateTextures();
    if (this.femaleLoaded) this.updateFemaleState();
  }

  public getActiveGender(): 'male' | 'female' {
    return this.activeGender;
  }

  public getFemaleAtlas(): AtlasData | null {
    return this.femaleAtlas;
  }

  public setSkinOpacity(val: number): void {
    this.skinOpacity = Math.max(0, Math.min(1, val));
    if (this.femaleSkinMesh) {
      const mat = this.femaleSkinMesh.material as THREE.MeshStandardMaterial;
      mat.opacity = this.skinOpacity;
      this.femaleSkinMesh.visible = this.skinOpacity > 0.02 && !this.isIsolated;
    }
    if (this.femaleLoaded) {
      this.updateFemaleState();
    }
  }

  public getSkinOpacity(): number {
    return this.skinOpacity;
  }

  // --- STATE UPDATES ---

  public updateState(): void {
    this.updateStateTextures();
    if (this.activeGender === 'female' && this.femaleLoaded) {
      this.updateFemaleState();
    }
  }

  public updateStateTextures() {
    const numSystems = ANATOMICAL_SYSTEMS.length;
    const aspect = (this.container.clientWidth || 1) / (this.container.clientHeight || 1);

    // Recompute the 2D inventory layout only when the viewport shape materially changes.
    // updateStateTextures can run every animation frame while the model is exploding; re-sorting
    // all anatomy parts on each frame caused avoidable allocations and stutter on mobile devices.
    if (
      this.knollingLayoutAspect === null ||
      Math.abs(aspect - this.knollingLayoutAspect) >= 0.01
    ) {
      const layout: KnollingLayout = calculateKnollingLayout(this.atlas.parts, aspect);
      this.atlas.parts.forEach((part, idx) => {
        const cell = layout.cells.get(part.id);
        if (cell) {
          this.knolledCentroids[idx] = new THREE.Vector3(cell.x, cell.y + 0.85, 0);
        }
      });
      this.knollingLayoutAspect = aspect;
    }

    const h = this.currentExplodeDamped;

    this.atlas.parts.forEach((part, idx) => {
      const orig = this.partCentroids[idx];
      const knolled = this.knolledCentroids[idx] || orig;

      let dx = 0;
      let dy = 0;
      let dz = 0;

      // Two-phase explosion mathematics
      if (h <= 0.45) {
        // Phase 1: Radial expansion by system group
        const t = h / 0.45;
        const sysIndex = Math.max(
          0,
          ANATOMICAL_SYSTEMS.findIndex(s => s.id === part.system)
        );
        const angle = (sysIndex / numSystems) * Math.PI * 2;
        dx = Math.sin(angle) * t * 0.48;
        dy = (orig.y - 0.85) * t * 0.28;
        dz = Math.cos(angle) * t * 0.48;
      } else {
        // Phase 2: Lerp to 2D Knolled Inventory Grid flat on Z=0
        const t = (h - 0.45) / 0.55;
        const sysIndex = Math.max(
          0,
          ANATOMICAL_SYSTEMS.findIndex(s => s.id === part.system)
        );
        const angle = (sysIndex / numSystems) * Math.PI * 2;
        dx = THREE.MathUtils.lerp(Math.sin(angle) * 0.48, knolled.x - orig.x, t);
        dy = THREE.MathUtils.lerp((orig.y - 0.85) * 0.28, knolled.y - orig.y, t);
        dz = THREE.MathUtils.lerp(Math.cos(angle) * 0.48, -orig.z, t);
      }

      const isSelected = this.selectedPartIds.has(part.id);
      let isVisible = false;

      if (this.hiddenPartIds.has(part.id)) {
        isVisible = false;
      } else if (this.isIsolated) {
        isVisible = isSelected;
      } else {
        isVisible = this.visibleSystems.has(part.system) || isSelected;
      }

      // Always suppress male genitalia in female mode. Hide matching male systems/muscles only
      // after the female atlas has loaded successfully; otherwise keep a usable fallback model visible.
      if (
        this.activeGender === 'female' &&
        (
          MALE_GENITALIA_IDS.has(part.id) ||
          (
            this.femaleLoaded &&
            (
              FEMALE_REPLACED_MALE_SYSTEMS.has(part.system) ||
              this.femaleReplacedMaleMuscleIds.has(part.id)
            )
          )
        )
      ) {
        isVisible = false;
      }

      this.partStateArray[idx * 4] = dx;
      this.partStateArray[idx * 4 + 1] = dy;
      this.partStateArray[idx * 4 + 2] = dz;
      this.partStateArray[idx * 4 + 3] = isVisible ? 1.0 : 0.0;

      this.selectionArray[idx * 4] = isSelected ? 255 : 0;

      // Update both local and world matrices: raycasting uses these standalone per-part meshes.
      const indMesh = this.individualMeshes[idx];
      if (indMesh) {
        indMesh.position.set(dx, dy, dz);
        indMesh.updateMatrix();
        indMesh.updateMatrixWorld(true);
      }
    });

    this.partStateTexture.needsUpdate = true;
    this.selectionTexture.needsUpdate = true;

    // Toggle stage floor visibility when exploded > 50% or isolated
    this.floorStage.visible = h < 0.5 && !this.isIsolated;
  }

  private updateFemaleState(): void {
    if (!this.femaleLoaded || !this.femaleAtlas || this.activeGender !== 'female') return;

    const explode = this.currentExplodeDamped;
    const isIso = this.isIsolated;

    this.femaleAtlas.parts.forEach((part, idx) => {
      // Render female-specific organs plus the fitted female skeleton and VHF lower-limb muscles.
      if (!isFemaleRenderablePart(part)) {
        this.femalePartStateArray[idx * 4 + 3] = 0.0;
        return;
      }

      const centroid = this.femalePartCentroids[idx];
      let dx = 0;
      let dy = 0;
      let dz = 0;

      if (explode > 0.001 && centroid) {
        // Outward radial expansion from spine / hip center
        const radial = new THREE.Vector3(centroid.x, 0, centroid.z).normalize();
        if (radial.lengthSq() < 0.001) radial.set(0, 0, 1);
        dx = radial.x * explode * 0.48;
        dy = (centroid.y - 0.85) * explode * 0.35;
        dz = radial.z * explode * 0.48;
      }

      // Anterior offset for breasts so mammary glands and nipples sit proudly on the chest
      if (part.id >= 'HRAF0004' && part.id <= 'HRAF0019') {
        dz += 0.045;
      }

      const isSelected = this.selectedPartIds.has(part.id) || this.selectedPartIds.has(part.conceptId);
      let isVisible = false;

      if (this.hiddenPartIds.has(part.id) || this.hiddenPartIds.has(part.conceptId)) {
        isVisible = false;
      } else if (isIso) {
        isVisible = isSelected;
      } else {
        if (part.id === 'HRAF0003') {
          isVisible = this.skinOpacity > 0.02 && this.visibleSystems.has('integumentary');
        } else if (part.system === 'skeletal' || part.system === 'borrowed') {
          isVisible = this.visibleSystems.has('skeletal') || isSelected;
        } else if (part.system === 'connective') {
          isVisible = this.visibleSystems.has('connective') || this.visibleSystems.has('skeletal') || isSelected;
        } else if (part.system === 'donor-muscle' || part.system === 'muscular') {
          isVisible = this.visibleSystems.has('muscular') || isSelected;
        } else if (part.system === 'brain' || part.system === 'sensory') {
          isVisible = this.visibleSystems.has('nervous') || this.visibleSystems.has(part.system) || isSelected;
        } else if (part.system === 'pregnancy') {
          isVisible = isSelected;
        } else if (part.system === 'reproductive') {
          isVisible = this.visibleSystems.has('reproductive') || isSelected;
        } else if (isFemaleBreastPart(part.id)) {
          isVisible = this.visibleSystems.has('integumentary') || this.visibleSystems.has('muscular') || isSelected;
        } else {
          isVisible = this.visibleSystems.has(part.system) || isSelected;
        }
      }

      this.femalePartStateArray[idx * 4 + 0] = dx;
      this.femalePartStateArray[idx * 4 + 1] = dy;
      this.femalePartStateArray[idx * 4 + 2] = dz;
      this.femalePartStateArray[idx * 4 + 3] = isVisible ? 1.0 : 0.0;

      this.femaleSelectionArray[idx * 4 + 0] = isSelected ? 255 : 0;

      const indMesh = this.femaleIndividualMeshes[idx];
      if (indMesh) {
        indMesh.position.set(dx, dy, dz);
        indMesh.updateMatrix();
        indMesh.updateMatrixWorld(true);
      }
    });

    this.femalePartStateTexture.needsUpdate = true;
    this.femaleSelectionTexture.needsUpdate = true;

    if (this.femaleSkinMesh) {
      this.femaleSkinMesh.visible = !isIso && this.skinOpacity > 0.02 && this.visibleSystems.has('integumentary');
      (this.femaleSkinMesh.material as THREE.MeshStandardMaterial).opacity = this.skinOpacity;
    }

    this.floorStage.visible = explode < 0.5 && !this.isIsolated;
  }

  private setupEvents() {
    const el = this.renderer.domElement;

    el.addEventListener('pointerdown', (e: PointerEvent) => {
      this.pointerDownPos.set(e.clientX, e.clientY);
      this.pointerIsDrag = false;
    });

    el.addEventListener('pointermove', (e: PointerEvent) => {
      if (this.pointerDownPos.distanceTo(new THREE.Vector2(e.clientX, e.clientY)) > 6) {
        this.pointerIsDrag = true;
      }
    });

    el.addEventListener('pointerup', (e: PointerEvent) => {
      if (this.pointerIsDrag) return; // Ignore drag/orbit

      const rect = el.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);

      // --- 1. FEMALE-SPECIFIC ORGANS RAYCASTING FIRST (Breasts, Uterus, Ovaries, Cervix, Vagina) ---
      if (this.activeGender === 'female' && this.femaleLoaded && this.femaleAtlas) {
        let closestDist = Infinity;
        let hitPartIdx = -1;

        const tempBox = new THREE.Box3();
        this.femaleAtlas.parts.forEach((part, idx) => {
          if (!isFemaleRenderablePart(part)) return;
          const indMesh = this.femaleIndividualMeshes[idx];
          if (!indMesh || this.femalePartStateArray[idx * 4 + 3] < 0.5) return;
          // When skin is translucent, skip skin so user can effortlessly click internal organs/bones
          if (part.id === 'HRAF0003' && this.skinOpacity < 0.5) return;

          tempBox.copy(this.femalePartBoundingBoxes[idx]).translate(indMesh.position);
          if (!this.raycaster.ray.intersectsBox(tempBox)) return;

          const intersects = this.raycaster.intersectObject(indMesh, false);
          if (intersects.length > 0 && intersects[0].distance < closestDist) {
            closestDist = intersects[0].distance;
            hitPartIdx = idx;
          }
        });

        if (hitPartIdx >= 0) {
          this.onSelectPart(this.femaleAtlas.parts[hitPartIdx].id);
          return;
        }

        // Test translucent skin mesh if nothing internal was clicked
        if (this.femaleSkinMesh && this.femaleSkinMesh.visible) {
          const skinHits = this.raycaster.intersectObject(this.femaleSkinMesh, false);
          if (skinHits.length > 0) {
            this.onSelectPart('HRAF0003');
            return;
          }
        }
      }

      // --- 2. UNIVERSAL FULL HUMAN BODY RAYCASTING (All 206 Bones, 400+ Muscles, Organs) ---
      let closestDist = Infinity;
      let hitPartIdx = -1;

      // Test against bounding boxes first
      const tempBox = new THREE.Box3();
      this.atlas.parts.forEach((part, idx) => {
        // Skip male genitalia when clicking in female mode
        if (this.activeGender === 'female' && MALE_GENITALIA_IDS.has(part.id)) return;

        const indMesh = this.individualMeshes[idx];
        if (!indMesh || this.partStateArray[idx * 4 + 3] < 0.5) return;

        tempBox.copy(this.partBoundingBoxes[idx]).translate(indMesh.position);
        if (!this.raycaster.ray.intersectsBox(tempBox)) return;

        const intersects = this.raycaster.intersectObject(indMesh, false);
        if (intersects.length > 0 && intersects[0].distance < closestDist) {
          closestDist = intersects[0].distance;
          hitPartIdx = idx;
        }
      });

      if (hitPartIdx >= 0) {
        this.onSelectPart(this.atlas.parts[hitPartIdx].id);
        return;
      }
    });

    // Resize observer
    this.resizeObserver = new ResizeObserver(() => {
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      if (w === 0 || h === 0) return;

      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      this.updateState();
    });
    this.resizeObserver.observe(this.container);
  }

  // --- PUBLIC API FOR APP COORDINATION ---

  public setExplode(value: number) {
    this.explodeValue = Math.max(0, Math.min(1, value));
  }

  public setSystemVisible(systemId: string, visible: boolean) {
    if (visible) {
      this.visibleSystems.add(systemId);
    } else {
      this.visibleSystems.delete(systemId);
    }
    this.updateState();
  }

  public setAllSystemsVisible(visible: boolean) {
    if (visible) {
      ANATOMICAL_SYSTEMS.forEach(s => this.visibleSystems.add(s.id));
    } else {
      this.visibleSystems.clear();
    }
    this.updateState();
  }

  public hidePart(partId: string) {
    this.hiddenPartIds.add(partId);
    this.updateState();
  }

  public unhidePart(partId: string) {
    this.hiddenPartIds.delete(partId);
    this.updateState();
  }

  public unhideAllParts() {
    this.hiddenPartIds.clear();
    this.updateState();
  }

  public isPartHidden(partId: string): boolean {
    return this.hiddenPartIds.has(partId);
  }

  public getHiddenPartsCount(): number {
    return this.hiddenPartIds.size;
  }

  public getVisibleSystems(): Set<string> {
    return new Set(this.visibleSystems);
  }

  public selectPart(partId: string | null) {
    this.selectedPartIds.clear();
    if (partId) {
      this.selectedPartIds.add(partId);
    }
    this.updateState();
  }

  public selectMultipleParts(partIds: string[]) {
    this.selectedPartIds.clear();
    partIds.forEach(id => this.selectedPartIds.add(id));
    this.updateState();
  }

  public setIsolated(isolate: boolean) {
    this.isIsolated = isolate;
    if (isolate) {
      this.explodeValue = 0;
      this.frameSelectedStructure();
    }
    this.updateState();
  }

  public frameSelectedStructure(offsetRatioX: number = 0) {
    if (this.selectedPartIds.size === 0) return;

    const unionBox = new THREE.Box3();

    // 1. Check universal anatomy (shared by male & female)
    this.atlas.parts.forEach((part, idx) => {
      if (this.selectedPartIds.has(part.id) || this.selectedPartIds.has(part.conceptId)) {
        const indMesh = this.individualMeshes[idx];
        const offset = indMesh ? indMesh.position : new THREE.Vector3();
        unionBox.union(this.partBoundingBoxes[idx].clone().translate(offset));
      }
    });

    // 2. Check female-specific anatomy if in female mode
    if (this.activeGender === 'female' && this.femaleAtlas) {
      this.femaleAtlas.parts.forEach((part, idx) => {
        if (!isFemaleRenderablePart(part)) return;
        if (this.selectedPartIds.has(part.id) || this.selectedPartIds.has(part.conceptId)) {
          const indMesh = this.femaleIndividualMeshes[idx];
          const offset = indMesh ? indMesh.position : new THREE.Vector3();
          if (this.femalePartBoundingBoxes[idx]) {
            unionBox.union(this.femalePartBoundingBoxes[idx].clone().translate(offset));
          }
        }
      });
    }

    if (unionBox.isEmpty()) return;

    const center = unionBox.getCenter(new THREE.Vector3());
    const size = unionBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 0.15);

    const fov = THREE.MathUtils.degToRad(this.camera.fov);
    const dist = (maxDim / (2 * Math.tan(fov / 2))) * 1.5;

    this.controls.target.copy(center);
    this.camera.position
      .copy(center)
      .add(new THREE.Vector3(0.2, 0.1, 1).normalize().multiplyScalar(dist));
    this.controls.update();

    if (offsetRatioX !== 0) {
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.setViewOffset(w, h, w * offsetRatioX, 0, w, h);
    } else {
      this.camera.clearViewOffset();
    }
  }

  public setViewPreset(preset: 'three-quarter' | 'front' | 'side' | 'back') {
    this.currentView = preset;
    const target = this.controls.target;
    const dist = 3.6;

    let dir = new THREE.Vector3(1.4, 0.2, 3.6).normalize();
    if (preset === 'front') dir = new THREE.Vector3(0, 0.02, 1).normalize();
    if (preset === 'back') dir = new THREE.Vector3(0, 0.02, -1).normalize();
    if (preset === 'side') dir = new THREE.Vector3(1, 0.02, 0).normalize();

    this.camera.position.copy(target).addScaledVector(dir, dist);
    this.controls.update();
  }

  public setAutoRotate(rotate: boolean) {
    this.isAutoRotating = rotate;
    this.controls.autoRotate = rotate;
    this.controls.autoRotateSpeed = 0.85;
  }

  public setTheme(theme: 'dark' | 'light') {
    if (!this.renderer) return;
    if (theme === 'dark') {
      this.renderer.setClearColor(0x081611);
      if (this.groundMesh) {
        (this.groundMesh.material as THREE.MeshStandardMaterial).color.setHex(0x05100c);
      }
      if (this.pedestalMesh) {
        (this.pedestalMesh.material as THREE.MeshStandardMaterial).color.setHex(0x0c2219);
      }
    } else {
      this.renderer.setClearColor(0xffffff);
      if (this.groundMesh) {
        (this.groundMesh.material as THREE.MeshStandardMaterial).color.setHex(0xf8faf9);
      }
      if (this.pedestalMesh) {
        (this.pedestalMesh.material as THREE.MeshStandardMaterial).color.setHex(0xffffff);
      }
    }
  }

  public resetView() {
    this.explodeValue = 0;
    this.isIsolated = false;
    this.selectedPartIds.clear();
    this.camera.clearViewOffset();
    this.controls.target.set(0, 0.85, 0);
    this.camera.position.set(1.4, 1.05, 3.6);
    this.controls.update();
    // Reset the camera and selection without unexpectedly overriding active layer filters.
    this.updateState();
  }

  private animate = () => {
    if (this.isDestroyed) return;
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Smoothly damp explosion value
    const delta = 0.05;
    if (Math.abs(this.currentExplodeDamped - this.explodeValue) > 0.001) {
      this.currentExplodeDamped = THREE.MathUtils.damp(
        this.currentExplodeDamped,
        this.explodeValue,
        8,
        delta
      );
      this.updateState();
    }

    // Modal switch: if exploded > 80%, change left click from Orbit to Pan
    if (this.controls) {
      this.controls.mouseButtons.LEFT =
        this.currentExplodeDamped > 0.8 ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    if (this.isDestroyed) return;
    this.isDestroyed = true;
    this.initialized = false;
    cancelAnimationFrame(this.animationFrameId);
    this.resizeObserver?.disconnect();
    this.controls?.dispose();

    const disposedGeometries = new Set<THREE.BufferGeometry>();
    const disposedMaterials = new Set<THREE.Material>();
    const disposeMesh = (mesh: THREE.Mesh) => {
      if (!disposedGeometries.has(mesh.geometry)) {
        mesh.geometry.dispose();
        disposedGeometries.add(mesh.geometry);
      }
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach(material => {
        if (!disposedMaterials.has(material)) {
          material.dispose();
          disposedMaterials.add(material);
        }
      });
    };
    this.maleRoot.traverse(object => {
      if (object instanceof THREE.Mesh) disposeMesh(object);
    });
    this.individualMeshes.forEach(mesh => {
      if (mesh) disposeMesh(mesh);
    });
    this.femaleRoot.traverse(object => {
      if (object instanceof THREE.Mesh) disposeMesh(object);
    });
    this.femaleIndividualMeshes.forEach(mesh => {
      if (mesh) disposeMesh(mesh);
    });

    this.systemMaterials.forEach(material => {
      if (!disposedMaterials.has(material)) material.dispose();
    });
    this.femaleSystemMaterials.forEach(material => {
      if (!disposedMaterials.has(material)) material.dispose();
    });
    this.partStateTexture?.dispose();
    this.selectionTexture?.dispose();
    this.femalePartStateTexture?.dispose();
    this.femaleSelectionTexture?.dispose();
    this.renderer?.dispose();
    this.container.innerHTML = '';
  }
}
