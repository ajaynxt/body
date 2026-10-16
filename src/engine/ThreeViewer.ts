import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import type { AtlasData } from '../types/atlas';
import { ANATOMICAL_SYSTEMS } from '../data/systems';
import { decompressGzip } from '../utils/decompression';
import { calculateKnollingLayout } from '../utils/knolling';
import type { KnollingLayout } from '../utils/knolling';
import { FEMALE_MESH_CATALOG, type FemaleAnatomyPart } from '../data/femaleMeshCatalog';

export interface ViewerOptions {
  container: HTMLDivElement;
  atlas: AtlasData;
  onSelectPart: (partId: string) => void;
  onProgress: (percent: number) => void;
  onError: (error: string) => void;
}

const SYSTEM_COLORS: Record<string, number> = {
  skeletal: 0xf4e8d0,
  muscular: 0xc85a53,
  cardiac: 0xd32f2f,
  arterial: 0xe53935,
  venous: 0x1e88e5,
  circulatory: 0xd32f2f,
  respiratory: 0x64b5f6,
  digestive: 0xffb74d,
  urinary: 0x81c784,
  reproductive: 0xec407a,
  nervous: 0xfff176,
  endocrine: 0xba68c8,
  lymphatic: 0xaed581,
  integumentary: 0xe0ac69,
  sensory: 0x4dd0e1,
};

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

  // Female Geometry & meshes (HuBMAP VHF 1.5)
  private femaleLoaded = false;
  private femaleLoading = false;
  private femaleMeshes = new Map<string, THREE.Mesh>();
  private femalePartBounds = new Map<string, THREE.Box3>();
  private femalePartCentroids = new Map<string, THREE.Vector3>();
  private femaleMeshOriginalPositions = new Map<string, THREE.Vector3>();
  private femaleMeshOriginalMaterials = new Map<string, THREE.Material>();
  private femaleCatalogMap = new Map<string, FemaleAnatomyPart>();
  private femaleSkinMesh: THREE.Mesh | null = null;
  private skinOpacity = 0.2;

  // Stage objects
  private floorStage!: THREE.Group;
  private groundMesh?: THREE.Mesh;
  private pedestalMesh?: THREE.Mesh;

  // State
  private explodeValue = 0;
  private currentExplodeDamped = 0;
  private visibleSystems = new Set<string>();
  private selectedPartIds = new Set<string>();
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

    // Default visible systems: all except integumentary
    ANATOMICAL_SYSTEMS.forEach(s => {
      if (s.id !== 'integumentary') {
        this.visibleSystems.add(s.id);
      }
    });

    this.initScene();
    this.initStage();
    this.initStateTextures();
    this.initMaterials();
    this.setupEvents();
    this.loadChunks();
    this.animate();
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

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0xf2f3f3);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
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

    // Circular ground plane
    const groundGeo = new THREE.CircleGeometry(30, 96);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0xd5dcda, roughness: 1 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.019;
    this.groundMesh = ground;
    this.floorStage.add(ground);

    // Stage pedestal
    const pedestalGeo = new THREE.CylinderGeometry(0.68, 0.7, 0.028, 100);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeec,
      metalness: 0.12,
      roughness: 0.67,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.016;
    this.pedestalMesh = pedestal;
    this.floorStage.add(pedestal);

    // Concentric shadow accent rings
    const ring1Geo = new THREE.RingGeometry(0.63, 0.632, 128);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x8c959f,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = -Math.PI / 2;
    ring1.position.y = 0.001;
    this.floorStage.add(ring1);

    const ring2Geo = new THREE.RingGeometry(0.55, 0.551, 128);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa4adb6,
      transparent: true,
      opacity: 0.16,
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
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`Chunk ${chunkIndex} could not be loaded (${resp.status})`);

      const rawBuffer = await resp.arrayBuffer();
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
      // 3 concurrent downloads
      let currentIndex = 0;
      await Promise.all(
        Array.from({ length: 3 }, async () => {
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

  // --- FEMALE 3D MODEL LOADING (HuBMAP VHF 1.5) ---

  private async loadFemaleModel(): Promise<void> {
    if (this.femaleLoaded || this.femaleLoading) return;
    this.femaleLoading = true;
    this.onProgress(10);

    try {
      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(MeshoptDecoder);

      const base = import.meta.env.BASE_URL || './';
      const femaleUrl = `${base.replace(/\/$/, '')}/models/female-atlas.glb`;
      const gltf = await new Promise<any>((resolve, reject) => {
        loader.load(
          femaleUrl,
          resolve,
          xhr => {
            if (xhr.lengthComputable) {
              const pct = Math.round((xhr.loaded / xhr.total) * 100);
              this.onProgress(pct);
            }
          },
          reject
        );
      });

      const scene = gltf.scene as THREE.Group;

      // Position female model so feet rest at y=0.0 on pedestal (bounding box min was -0.795)
      scene.position.y = 0.795;
      scene.updateMatrixWorld(true);

      this.femaleRoot.add(scene);

      // Traverse all meshes and organize by system and metadata
      scene.traverse(obj => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.castShadow = false;
          mesh.receiveShadow = false;

          const partId = mesh.name;
          this.femaleMeshes.set(partId, mesh);

          // Compute world bounding box & centroid
          const worldBox = new THREE.Box3().setFromObject(mesh);
          this.femalePartBounds.set(partId, worldBox);
          this.femalePartCentroids.set(partId, worldBox.getCenter(new THREE.Vector3()));
          this.femaleMeshOriginalPositions.set(partId, mesh.position.clone());

          const catalogItem = this.femaleCatalogMap.get(partId);
          const sysId = catalogItem ? catalogItem.system : 'other';

          // Assign medical system color
          if (partId === 'VH_F_skin') {
            const skinMat = new THREE.MeshStandardMaterial({
              color: 0xdeb887,
              roughness: 0.65,
              metalness: 0.08,
              transparent: true,
              opacity: this.skinOpacity,
              depthWrite: false,
              side: THREE.DoubleSide,
            });
            mesh.material = skinMat;
            this.femaleSkinMesh = mesh;
            this.femaleMeshOriginalMaterials.set(partId, skinMat);
          } else {
            const colorHex = SYSTEM_COLORS[sysId] || 0xe2e8f0;
            const mat = new THREE.MeshStandardMaterial({
              color: new THREE.Color(colorHex),
              roughness: 0.52,
              metalness: 0.08,
              side: THREE.DoubleSide,
            });
            mesh.material = mat;
            this.femaleMeshOriginalMaterials.set(partId, mat);
          }
        }
      });

      this.femaleLoaded = true;
      this.femaleLoading = false;
      this.updateFemaleState();
      this.onProgress(100);
    } catch (err) {
      this.femaleLoading = false;
      this.onError('महिला 3D मॉडल (HuBMAP VHF 1.5) लोड करने में त्रुटि: ' + (err as Error).message);
    }
  }

  public async switchGender(gender: 'male' | 'female'): Promise<void> {
    if (this.activeGender === gender) return;
    this.activeGender = gender;

    if (gender === 'female') {
      this.maleRoot.visible = false;
      this.femaleRoot.visible = true;
      if (!this.femaleLoaded) {
        await this.loadFemaleModel();
      } else {
        this.updateFemaleState();
      }
    } else {
      this.femaleRoot.visible = false;
      this.maleRoot.visible = true;
      this.updateStateTextures();
    }
  }

  public getActiveGender(): 'male' | 'female' {
    return this.activeGender;
  }

  public setSkinOpacity(val: number): void {
    this.skinOpacity = Math.max(0, Math.min(1, val));
    if (this.femaleSkinMesh) {
      const mat = this.femaleSkinMesh.material as THREE.MeshStandardMaterial;
      mat.opacity = this.skinOpacity;
      this.femaleSkinMesh.visible = this.skinOpacity > 0.01;
    }
  }

  public getSkinOpacity(): number {
    return this.skinOpacity;
  }

  // --- STATE UPDATES ---

  public updateState(): void {
    if (this.activeGender === 'male') {
      this.updateStateTextures();
    } else {
      this.updateFemaleState();
    }
  }

  public updateStateTextures() {
    if (this.activeGender !== 'male') return;

    const numSystems = ANATOMICAL_SYSTEMS.length;
    const aspect = (this.container.clientWidth || 1) / (this.container.clientHeight || 1);

    // Calculate 2D knolling inventory grid when exploded
    const layout: KnollingLayout = calculateKnollingLayout(this.atlas.parts, aspect);
    this.atlas.parts.forEach((part, idx) => {
      const cell = layout.cells.get(part.id);
      if (cell) {
        this.knolledCentroids[idx] = new THREE.Vector3(cell.x, cell.y + 0.85, 0);
      }
    });

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

      if (this.isIsolated) {
        isVisible = isSelected;
      } else {
        isVisible = this.visibleSystems.has(part.system) || isSelected;
      }

      this.partStateArray[idx * 4] = dx;
      this.partStateArray[idx * 4 + 1] = dy;
      this.partStateArray[idx * 4 + 2] = dz;
      this.partStateArray[idx * 4 + 3] = isVisible ? 1.0 : 0.0;

      this.selectionArray[idx * 4] = isSelected ? 255 : 0;

      // Update position on individualMesh for bounding raycasting
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
    if (!this.femaleLoaded || this.activeGender !== 'female') return;

    const explode = this.currentExplodeDamped;
    const isIso = this.isIsolated;

    this.femaleMeshes.forEach((mesh, partId) => {
      const catalogItem = this.femaleCatalogMap.get(partId);
      const sysId = catalogItem ? catalogItem.system : 'other';
      const isSelected = this.selectedPartIds.has(partId);

      // Visibility logic
      let isVisible = false;
      if (isIso) {
        isVisible = isSelected;
      } else {
        isVisible = this.visibleSystems.has(sysId) || isSelected;
      }
      mesh.visible = isVisible;

      // Explode translation outward radially from spine/center
      const origPos = this.femaleMeshOriginalPositions.get(partId);
      if (origPos) {
        if (explode > 0.01) {
          const centroid = this.femalePartCentroids.get(partId) || origPos;
          const radial = new THREE.Vector3(centroid.x, 0, centroid.z).normalize();
          if (radial.lengthSq() < 0.001) radial.set(0, 0, 1);
          const yDisp = (centroid.y - 0.85) * 0.35;
          mesh.position.copy(origPos).addScaledVector(radial, explode * 0.48);
          mesh.position.y += yDisp * explode;
        } else {
          mesh.position.copy(origPos);
        }
      }

      // Selection Highlight
      if (isSelected) {
        if (!mesh.userData.isSelected) {
          mesh.userData.isSelected = true;
          mesh.userData.origMat = mesh.material;
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x4debc2,
            emissive: 0x1aa385,
            emissiveIntensity: 0.6,
            roughness: 0.3,
            metalness: 0.2,
            side: THREE.DoubleSide,
          });
        }
      } else {
        if (mesh.userData.isSelected) {
          mesh.userData.isSelected = false;
          if (mesh.userData.origMat) {
            mesh.material = mesh.userData.origMat;
          }
        }
      }
    });

    // Skin transparency
    if (this.femaleSkinMesh && !isIso) {
      const skinMat = this.femaleSkinMesh.material as THREE.MeshStandardMaterial;
      skinMat.opacity = this.skinOpacity;
      this.femaleSkinMesh.visible = this.skinOpacity > 0.01 && this.visibleSystems.has('integumentary');
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

      // --- FEMALE RAYCASTING ---
      if (this.activeGender === 'female' && this.femaleLoaded) {
        const candidateMeshes: THREE.Mesh[] = [];
        this.femaleMeshes.forEach(mesh => {
          // If skin is translucent, let clicks pass through to organs
          if (mesh === this.femaleSkinMesh && this.skinOpacity < 0.75) return;
          if (mesh.visible) candidateMeshes.push(mesh);
        });

        const intersects = this.raycaster.intersectObjects(candidateMeshes, false);
        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Mesh;
          this.onSelectPart(hit.name);
          return;
        }

        // If no organ hit, but skin is visible, check skin
        if (this.femaleSkinMesh && this.femaleSkinMesh.visible) {
          const skinHits = this.raycaster.intersectObject(this.femaleSkinMesh, false);
          if (skinHits.length > 0) {
            this.onSelectPart(this.femaleSkinMesh.name);
            return;
          }
        }
        return;
      }

      // --- MALE RAYCASTING ---
      let closestDist = Infinity;
      let hitPartIdx = -1;

      // Test against bounding boxes first
      const tempBox = new THREE.Box3();
      this.atlas.parts.forEach((_, idx) => {
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

    if (this.activeGender === 'male') {
      this.atlas.parts.forEach((part, idx) => {
        if (this.selectedPartIds.has(part.id)) {
          const indMesh = this.individualMeshes[idx];
          const offset = indMesh ? indMesh.position : new THREE.Vector3();
          unionBox.union(this.partBoundingBoxes[idx].clone().translate(offset));
        }
      });
    } else {
      this.selectedPartIds.forEach(id => {
        const mesh = this.femaleMeshes.get(id);
        if (mesh) {
          const worldBox = new THREE.Box3().setFromObject(mesh);
          unionBox.union(worldBox);
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
      this.renderer.setClearColor(0x0a0f1d);
      if (this.groundMesh) {
        (this.groundMesh.material as THREE.MeshStandardMaterial).color.setHex(0x0b1120);
      }
      if (this.pedestalMesh) {
        (this.pedestalMesh.material as THREE.MeshStandardMaterial).color.setHex(0x1e293b);
      }
    } else {
      this.renderer.setClearColor(0xf2f3f3);
      if (this.groundMesh) {
        (this.groundMesh.material as THREE.MeshStandardMaterial).color.setHex(0xd5dcda);
      }
      if (this.pedestalMesh) {
        (this.pedestalMesh.material as THREE.MeshStandardMaterial).color.setHex(0xeeeeec);
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
    this.setAllSystemsVisible(true);
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
    this.isDestroyed = true;
    cancelAnimationFrame(this.animationFrameId);
    this.resizeObserver?.disconnect();
    this.controls?.dispose();
    this.renderer?.dispose();
    this.partStateTexture?.dispose();
    this.selectionTexture?.dispose();
    this.container.innerHTML = '';
  }
}
