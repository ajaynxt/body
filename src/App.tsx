import { useEffect, useState, useRef, useCallback, lazy, Suspense } from 'react';
import type { AtlasData, StudyPartItem, ClinicalDisease } from './types/atlas';
import { BOOK_CHAPTERS } from './data/chapters';
import { ThreeViewer } from './engine/ThreeViewer';
import { Header } from './components/Header';
import { ThreeCanvas } from './components/ThreeCanvas';
import { BookReader } from './components/BookReader';
import { ControlsOverlay } from './components/ControlsOverlay';
import { SideOrganInspector } from './components/SideOrganInspector';
import { GoogleAssistantAudioPlayer } from './components/GoogleAssistantAudioPlayer';
import { QuickOrganFocusBar } from './components/QuickOrganFocusBar';
import { fetchJsonWithCache } from './utils/cacheStorage';
import { resolveAnatomicalPart } from './utils/anatomicalResolver';
import { medicalAudio } from './utils/medicalAudio';

// Code-split heavy modals and secondary views for instant first page load
const DiseaseExplorerModal = lazy(() => import('./components/DiseaseExplorerModal').then(m => ({ default: m.DiseaseExplorerModal })));
const AboutModal = lazy(() => import('./components/AboutModal').then(m => ({ default: m.AboutModal })));
const StudentQuizModal = lazy(() => import('./components/StudentQuizModal').then(m => ({ default: m.StudentQuizModal })));
const StudyLibrary = lazy(() => import('./components/StudyLibrary').then(m => ({ default: m.StudyLibrary })));
const PDFBookReader = lazy(() => import('./components/PDFBookReader').then(m => ({ default: m.PDFBookReader })));
const CompareModal = lazy(() => import('./components/CompareModal').then(m => ({ default: m.CompareModal })));
const StudySuiteModal = lazy(() => import('./components/StudySuiteModal').then(m => ({ default: m.StudySuiteModal })));
const StepByStepAITutor = lazy(() => import('./components/StepByStepAITutor').then(m => ({ default: m.StepByStepAITutor })));
const MedicalDiagnosticsModal = lazy(() => import('./components/MedicalDiagnosticsModal').then(m => ({ default: m.MedicalDiagnosticsModal })));
const StudentFunZoneModal = lazy(() => import('./components/StudentFunZoneModal').then(m => ({ default: m.StudentFunZoneModal })));

export const App: React.FC = () => {
  const [atlas, setAtlas] = useState<AtlasData | null>(null);
  const viewerRef = useRef<ThreeViewer | null>(null);

  // Active Gender Model ('male' = BodyParts3D 4.0, 'female' = HuBMAP VHF 1.5)
  const [activeGender, setActiveGender] = useState<'male' | 'female'>('male');
  const [skinOpacity, setSkinOpacity] = useState(0.35); // 0.35 gives clear full female body contour while showing inner organs

  // App & View State
  const [viewMode, setViewMode] = useState<'book' | 'explorer' | 'library' | 'reader'>('book');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('anatomy_atlas_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('anatomy_atlas_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [selectedFemalePart, setSelectedFemalePart] = useState<StudyPartItem | null>(null);
  const [selectedPartItem, setSelectedPartItem] = useState<StudyPartItem | null>(null);

  // 3D Controls State
  const [explodeValue, setExplodeValue] = useState(0);
  const [currentView, setCurrentView] = useState<'three-quarter' | 'front' | 'side' | 'back'>('three-quarter');
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [isIsolated, setIsIsolated] = useState(false);
  const [isTourPlaying, setIsTourPlaying] = useState(false);

  // Modals
  const [isDiseaseModalOpen, setIsDiseaseModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isStudySuiteModalOpen, setIsStudySuiteModalOpen] = useState(false);
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [isDiagnosticsModalOpen, setIsDiagnosticsModalOpen] = useState(false);
  const [isStudentZoneModalOpen, setIsStudentZoneModalOpen] = useState(false);

  // Layout & Layer Visibilities
  const [isBookReaderCollapsed, setIsBookReaderCollapsed] = useState(false);
  const [hiddenPartsCount, setHiddenPartsCount] = useState(0);
  const [visibleSystems, setVisibleSystems] = useState<Set<string>>(
    () => new Set(['cardiac', 'skeletal', 'muscular', 'arterial', 'venous', 'nervous', 'respiratory', 'digestive', 'urinary', 'reproductive', 'integumentary', 'lymphatic'])
  );

  // Handle URL Routing (Supports both HTML5 pathname and SPA hash fallback for GitHub Pages)
  const parseCurrentRoute = useCallback(() => {
    const path = window.location.pathname.replace(/\/$/, '');
    const hash = window.location.hash.replace(/^#\/?/, '');

    // Check for individual book reader route: /study/books/:bookId
    const bookMatch = path.match(/study\/books\/([^/]+)/) || hash.match(/study\/books\/([^/]+)/);
    if (bookMatch && bookMatch[1]) {
      setSelectedBookId(bookMatch[1]);
      setViewMode('reader');
      return;
    }

    // Check for library shelf route: /study or #study
    if (path.endsWith('/study') || path === '/study' || hash.startsWith('study')) {
      setViewMode('library');
      setSelectedBookId(null);
      return;
    }

    // Default to 3D book/atlas
    setViewMode((prev) => (prev === 'library' || prev === 'reader' ? 'book' : prev));
  }, []);

  useEffect(() => {
    parseCurrentRoute();
    const handlePopState = () => parseCurrentRoute();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseCurrentRoute]);

  // Navigate functions with history.pushState
  const navigateToLibrary = useCallback(() => {
    setViewMode('library');
    setSelectedBookId(null);
    try {
      window.history.pushState(null, '', '/study/');
    } catch {
      window.location.hash = '/study';
    }
  }, []);

  const navigateToBook = useCallback((bookId: string) => {
    setSelectedBookId(bookId);
    setViewMode('reader');
    try {
      window.history.pushState(null, '', `/study/books/${bookId}`);
    } catch {
      window.location.hash = `/study/books/${bookId}`;
    }
  }, []);

  const navigateToAtlas = useCallback((mode: 'book' | 'explorer' = 'book') => {
    setViewMode(mode);
    setSelectedBookId(null);
    try {
      window.history.pushState(null, '', '/');
    } catch {
      window.location.hash = '';
    }
  }, []);

  // Fetch atlas.json (Male reference metadata)
  useEffect(() => {
    const base = import.meta.env.BASE_URL || './';
    const atlasUrl = `${base.replace(/\/$/, '')}/models/atlas.json`;
    fetchJsonWithCache<AtlasData>(atlasUrl)
      .then((data: AtlasData) => {
        setAtlas(data);
      })
      .catch(err => {
        console.error('Failed to load atlas.json:', err);
      });
  }, []);

  const currentChapter = BOOK_CHAPTERS[currentChapterIndex] || BOOK_CHAPTERS[0];

  // Handle switching gender model
  const handleSwitchGender = useCallback(async (gender: 'male' | 'female') => {
    setActiveGender(gender);
    setSelectedPartId(null);
    setSelectedPartItem(null);
    setSelectedFemalePart(null);
    setIsIsolated(false);
    if (viewerRef.current) {
      await viewerRef.current.switchGender(gender);
    }
    // Auto-focus female chapter when switching to female
    if (gender === 'female') {
      const femaleChapterIdx = BOOK_CHAPTERS.findIndex(c => c.id === 'chapter-female-reproductive');
      if (femaleChapterIdx >= 0) {
        setCurrentChapterIndex(femaleChapterIdx);
        setCurrentPartIndex(0);
        const femalePart = BOOK_CHAPTERS[femaleChapterIdx].parts[0];
        if (femalePart) {
          setSelectedPartItem(femalePart);
          if (viewerRef.current) {
            viewerRef.current.selectMultipleParts(femalePart.elements);
            viewerRef.current.frameSelectedStructure(isBookReaderCollapsed ? 0 : -0.2);
          }
        }
      }
    } else {
      setCurrentChapterIndex(0);
      setCurrentPartIndex(0);
      const malePart = BOOK_CHAPTERS[0]?.parts[0];
      if (malePart) {
        setSelectedPartItem(malePart);
        if (viewerRef.current) {
          viewerRef.current.selectMultipleParts(malePart.elements);
          viewerRef.current.frameSelectedStructure(isBookReaderCollapsed ? 0 : -0.2);
        }
      }
    }
  }, [isBookReaderCollapsed]);

  // Handle selecting a part from Book Reader or Study Suite
  const handleSelectPart = useCallback((part: StudyPartItem) => {
    setSelectedPartId(part.elements[0] || part.id);
    setSelectedPartItem(part);
    setSelectedFemalePart(null);
    setIsIsolated(false);

    // Find chapter and part index
    const chIdx = BOOK_CHAPTERS.findIndex(c => c.systemId === part.system);
    if (chIdx >= 0) {
      setCurrentChapterIndex(chIdx);
      const pIdx = BOOK_CHAPTERS[chIdx].parts.findIndex(p => p.id === part.id);
      if (pIdx >= 0) setCurrentPartIndex(pIdx);
    }

    if (viewerRef.current && part.elements.length > 0) {
      viewerRef.current.selectMultipleParts(part.elements);
      viewerRef.current.frameSelectedStructure(isBookReaderCollapsed ? 0 : (viewMode === 'book' ? -0.2 : 0));
    }
  }, [viewMode, isBookReaderCollapsed]);

  // Handle isolating a part
  const handleIsolatePart = useCallback((part: StudyPartItem) => {
    setSelectedPartId(part.elements[0] || part.id);
    setSelectedPartItem(part);
    setIsIsolated(true);
    setExplodeValue(0);

    if (viewerRef.current && part.elements.length > 0) {
      viewerRef.current.selectMultipleParts(part.elements);
      viewerRef.current.setIsolated(true);
      viewerRef.current.frameSelectedStructure(isBookReaderCollapsed ? 0 : (viewMode === 'book' ? -0.2 : 0));
    }
  }, [viewMode, isBookReaderCollapsed]);

  // Handle clicking directly in 3D viewport ("jis pr click kre vo hi name side me aaye")
  const handle3DPartClick = useCallback((partId: string) => {
    setSelectedPartId(partId);
    medicalAudio.playScanBeep();

    const femaleAtlas = viewerRef.current?.getFemaleAtlas() || null;
    // Resolve organ details (Male, Female, Bones, Muscles, Vessels)
    const resolved = resolveAnatomicalPart(partId, atlas, activeGender, femaleAtlas);
    if (resolved) {
      setSelectedPartItem(resolved.part);
      if (resolved.chapterIndex !== undefined && resolved.partIndex !== undefined) {
        setCurrentChapterIndex(resolved.chapterIndex);
        setCurrentPartIndex(resolved.partIndex);
      }
    } else {
      const cleanName = partId.replace(/^FJ|^HRAF/, '');
      setSelectedPartItem({
        id: partId,
        name: `Anatomical Part ${cleanName}`,
        hindiName: `शारीरिक संरचना (${cleanName})`,
        latinName: `Pars anatomica ${cleanName}`,
        pronunciation: `part ${cleanName}`,
        system: partId.startsWith('HRAF') ? 'reproductive' : 'muscular',
        elements: [partId],
        locationHinglish: 'मानव 3D शारीरिक मॉडल का महत्वपूर्ण अंग अथवा पेशीय ऊतक',
        functionHinglish: 'शारीरिक संरचनात्मक स्थिरता, गतिशीलता और आंतरिक अंगों की सुरक्षा प्रदान करना।',
        funFactHinglish: 'शरीर का हर सूक्ष्म ऊतक लाखों विशेष कोशिकाओं से मिलकर बना है।',
        clinicalNoteHinglish: 'रेडियोलॉजिकल इमेजिंग (सीटी/एमआरआई) द्वारा इसकी सटीक शारीरिक स्थिति का अध्ययन किया जाता है।',
        relatedDiseases: ['मांसपेशीय खिंचाव (Strain)', 'सूजन (Inflammation)', 'संरचनात्मक क्षति (Structural lesion)'],
      });
    }

    if (viewerRef.current) {
      viewerRef.current.selectPart(partId);
      viewerRef.current.frameSelectedStructure(isBookReaderCollapsed ? 0 : (viewMode === 'book' ? -0.2 : 0));
    }
  }, [atlas, activeGender, viewMode, isBookReaderCollapsed]);

  // Handle Hiding specific part ("is ang ko chupaye")
  const handleHidePart = useCallback(() => {
    if (!selectedPartId || !viewerRef.current) return;
    viewerRef.current.hidePart(selectedPartId);
    setHiddenPartsCount(viewerRef.current.getHiddenPartsCount());
    setSelectedPartId(null);
    setSelectedPartItem(null);
  }, [selectedPartId]);

  // Handle Unhiding all hidden parts
  const handleUnhideAll = useCallback(() => {
    if (!viewerRef.current) return;
    viewerRef.current.unhideAllParts();
    setHiddenPartsCount(0);
  }, []);

  // Handle toggling major organ groups (Muscles, Skeleton, Viscera, Vascular, Nerves)
  const handleToggleOrganGroup = useCallback((group: 'muscles' | 'skeleton' | 'viscera' | 'vascular' | 'nerves') => {
    if (!viewerRef.current) return;
    setVisibleSystems(prev => {
      const next = new Set(prev);
      let targetSystems: string[] = [];
      if (group === 'muscles') targetSystems = ['muscular'];
      else if (group === 'skeleton') targetSystems = ['skeletal'];
      else if (group === 'viscera') targetSystems = ['cardiac', 'digestive', 'respiratory', 'urinary', 'reproductive', 'endocrine'];
      else if (group === 'vascular') targetSystems = ['arterial', 'venous'];
      else if (group === 'nerves') targetSystems = ['nervous', 'brain'];

      const isCurrentlyVisible = targetSystems.some(s => next.has(s));
      targetSystems.forEach(s => {
        if (isCurrentlyVisible) next.delete(s);
        else next.add(s);
        viewerRef.current?.setSystemVisible(s, !isCurrentlyVisible);
      });
      return next;
    });
  }, []);

  // Handle toggling Solo Focus / Isolate from quick focus pill
  const handleToggleQuickIsolate = useCallback(() => {
    const next = !isIsolated;
    setIsIsolated(next);
    if (viewerRef.current) {
      viewerRef.current.setIsolated(next);
      if (next) {
        viewerRef.current.frameSelectedStructure(isBookReaderCollapsed ? 0 : (viewMode === 'book' ? -0.2 : 0));
      }
    }
  }, [isIsolated, viewMode, isBookReaderCollapsed]);

  // Handle selecting a disease from Disease modal or tab
  const handleSelectDisease = useCallback((disease: ClinicalDisease) => {
    const chIdx = BOOK_CHAPTERS.findIndex(c => c.systemId === disease.system);
    if (chIdx >= 0) {
      setCurrentChapterIndex(chIdx);
      const matchingPart = BOOK_CHAPTERS[chIdx].parts.find(p =>
        disease.affectedPartNames.some(name => p.name.toLowerCase().includes(name.toLowerCase()))
      );
      if (matchingPart) {
        handleIsolatePart(matchingPart);
      }
    }
  }, [handleIsolatePart]);

  // Handle Layer Mode Application from StudySuiteModal
  const handleApplyLayerMode = useCallback((layer: number) => {
    if (!viewerRef.current) return;
    if (layer === 1) {
      viewerRef.current.setAllSystemsVisible(false);
      viewerRef.current.setSystemVisible('integumentary', true);
      setSkinOpacity(0.85);
    } else if (layer === 2) {
      viewerRef.current.setAllSystemsVisible(false);
      viewerRef.current.setSystemVisible('muscular', true);
      setSkinOpacity(0.0);
    } else if (layer === 3) {
      viewerRef.current.setAllSystemsVisible(false);
      ['skeletal', 'digestive', 'respiratory', 'cardiac', 'circulatory', 'urinary', 'reproductive'].forEach(s => {
        viewerRef.current?.setSystemVisible(s, true);
      });
      setSkinOpacity(0.0);
    } else if (layer === 4) {
      viewerRef.current.setAllSystemsVisible(false);
      ['circulatory', 'cardiac', 'arterial', 'venous'].forEach(s => {
        viewerRef.current?.setSystemVisible(s, true);
      });
      setSkinOpacity(0.0);
    } else if (layer === 5) {
      viewerRef.current.setAllSystemsVisible(false);
      viewerRef.current.setSystemVisible('nervous', true);
      setSkinOpacity(0.0);
    }
  }, []);

  // Handle Reset View
  const handleReset = useCallback(() => {
    setExplodeValue(0);
    setIsIsolated(false);
    setSelectedPartId(null);
    setSelectedPartItem(null);
    setSelectedFemalePart(null);
    setIsAutoRotating(false);
    setCurrentView('three-quarter');
    setIsTourPlaying(false);
    if (viewerRef.current) {
      viewerRef.current.resetView();
    }
  }, []);

  // Auto Tour Timer
  useEffect(() => {
    if (!isTourPlaying || viewMode !== 'book') return;

    const interval = setInterval(() => {
      setCurrentPartIndex(prevIdx => {
        const nextIdx = prevIdx + 1;
        if (nextIdx < currentChapter.parts.length) {
          const nextPart = currentChapter.parts[nextIdx];
          handleSelectPart(nextPart);
          return nextIdx;
        } else {
          setCurrentChapterIndex(prevCh => {
            const nextCh = (prevCh + 1) % BOOK_CHAPTERS.length;
            const newChapter = BOOK_CHAPTERS[nextCh];
            if (newChapter.parts.length > 0) {
              handleSelectPart(newChapter.parts[0]);
            }
            return nextCh;
          });
          return 0;
        }
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [isTourPlaying, viewMode, currentChapter, handleSelectPart]);

  // Currently focused / active part across male & female reference models
  const activePart: StudyPartItem | undefined =
    selectedPartItem ||
    (activeGender === 'female'
      ? selectedFemalePart || undefined
      : BOOK_CHAPTERS[currentChapterIndex]?.parts[currentPartIndex]);

  return (
    <div className={`app-root view-${viewMode}`} data-theme={theme}>
      {/* Top Application Header */}
      <Header
        viewMode={viewMode}
        onToggleViewMode={mode => {
          if (mode === 'library') {
            navigateToLibrary();
          } else {
            navigateToAtlas(mode);
          }
        }}
        activeGender={activeGender}
        onChangeGender={handleSwitchGender}
        onOpenDiseaseModal={() => setIsDiseaseModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenQuizModal={() => setIsQuizModalOpen(true)}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onOpenStudyModesModal={() => setIsStudySuiteModalOpen(true)}
        onOpenDiagnosticsModal={() => setIsDiagnosticsModalOpen(true)}
        onOpenStudentZoneModal={() => setIsStudentZoneModalOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        currentChapterTitle={
          viewMode === 'library'
            ? '📚 मानव शरीर अध्ययन पुस्तकालय (Study Library)'
            : viewMode === 'reader'
            ? '📖 व्यक्तिगत पाठ्यपुस्तक अध्ययन (PDF Reader)'
            : activeGender === 'female'
            ? '♀ महिला संपूर्ण शरीर रचना (3D Anatomy Atlas)'
            : currentChapter.hindiTitle
        }
        totalPartsCount={activeGender === 'female' ? 2285 : atlas?.parts.length || 2234}
      />

      {/* Main Workspace */}
      <main className="app-main-workspace">
        {viewMode === 'library' ? (
          /* Human Body Study Library Shelf */
          <Suspense fallback={<div className="loading-fallback glass-panel"><div className="spinning-loader text-accent" /> पुस्तकालय लोड हो रहा है...</div>}>
            <StudyLibrary
              onOpenBook={bookId => navigateToBook(bookId)}
              onBackTo3D={() => navigateToAtlas('book')}
            />
          </Suspense>
        ) : viewMode === 'reader' && selectedBookId ? (
          /* Individual Book PDF & Chapter Reader */
          <Suspense fallback={<div className="loading-fallback glass-panel"><div className="spinning-loader text-accent" /> पुस्तक लोड हो रही है...</div>}>
            <PDFBookReader
              bookId={selectedBookId}
              onBackToLibrary={navigateToLibrary}
              onOpen3DAtlas={() => navigateToAtlas('book')}
            />
          </Suspense>
        ) : (
          /* 3D Anatomy Atlas & Textbook Split View */
          <>
            {viewMode === 'book' && (
              <BookReader
                currentChapterIndex={currentChapterIndex}
                currentPartIndex={currentPartIndex}
                selectedPart={selectedPartItem}
                isCollapsed={isBookReaderCollapsed}
                onToggleCollapse={() => setIsBookReaderCollapsed(!isBookReaderCollapsed)}
                onSelectChapter={idx => {
                  setCurrentChapterIndex(idx);
                  setCurrentPartIndex(0);
                  setSelectedPartItem(null);
                  setSelectedFemalePart(null);
                  const ch = BOOK_CHAPTERS[idx];
                  if (ch.parts.length > 0) {
                    handleSelectPart(ch.parts[0]);
                  }
                }}
                onSelectPart={handleSelectPart}
                onIsolatePart={handleIsolatePart}
                onSelectDisease={handleSelectDisease}
                isTourPlaying={isTourPlaying}
                onToggleTour={() => setIsTourPlaying(!isTourPlaying)}
                onOpenAudioPlayer={() => setIsAudioPlayerOpen(true)}
                onOpenAITutor={() => setIsAITutorOpen(true)}
              />
            )}

            <section className="three-viewport-section">
              <ThreeCanvas
                atlas={atlas}
                activeGender={activeGender}
                skinOpacity={skinOpacity}
                onViewerReady={viewer => {
                  viewerRef.current = viewer;
                }}
                onSelectPart={handle3DPartClick}
                explodeValue={explodeValue}
                currentView={currentView}
                isAutoRotating={isAutoRotating}
                selectedPartId={selectedPartId}
                isIsolated={isIsolated}
                theme={theme}
              />

              {/* Floating Quick Action & Organ Focus Pill ("JISPR CLICK KRE USKI DETAILS AAYE") */}
              {selectedPartItem && (
                <QuickOrganFocusBar
                  part={selectedPartItem}
                  isIsolated={isIsolated}
                  onToggleIsolate={handleToggleQuickIsolate}
                  onHidePart={handleHidePart}
                  isPartHidden={selectedPartId ? viewerRef.current?.isPartHidden(selectedPartId) : false}
                  hiddenPartsCount={hiddenPartsCount}
                  onUnhideAll={handleUnhideAll}
                  isMusclesVisible={visibleSystems.has('muscular')}
                  onToggleMuscles={() => handleToggleOrganGroup('muscles')}
                  onOpenAudioPlayer={() => setIsAudioPlayerOpen(true)}
                  onOpenAITutor={() => setIsAITutorOpen(true)}
                  onOpenStudentZone={() => setIsStudentZoneModalOpen(true)}
                  onClose={() => {
                    setSelectedPartId(null);
                    setSelectedPartItem(null);
                    setSelectedFemalePart(null);
                    if (viewerRef.current) {
                      viewerRef.current.selectPart(null);
                      viewerRef.current.updateState();
                    }
                  }}
                />
              )}

              <ControlsOverlay
                activeGender={activeGender}
                skinOpacity={skinOpacity}
                onSkinOpacityChange={val => {
                  setSkinOpacity(val);
                  if (viewerRef.current) viewerRef.current.setSkinOpacity(val);
                }}
                explodeValue={explodeValue}
                onExplodeChange={val => setExplodeValue(val)}
                currentView={currentView}
                onSetViewPreset={preset => {
                  setCurrentView(preset);
                  if (viewerRef.current) viewerRef.current.setViewPreset(preset);
                }}
                isAutoRotating={isAutoRotating}
                onToggleAutoRotate={() => {
                  const next = !isAutoRotating;
                  setIsAutoRotating(next);
                  if (viewerRef.current) viewerRef.current.setAutoRotate(next);
                }}
                onReset={handleReset}
                visibleSystems={visibleSystems}
                onToggleOrganGroup={handleToggleOrganGroup}
                hiddenPartsCount={hiddenPartsCount}
                onUnhideAllParts={handleUnhideAll}
              />

              {/* Dedicated Side Inspector Drawer on the side ("side me aaye vo") */}
              {viewMode === 'explorer' && selectedPartItem && (
                <SideOrganInspector
                  part={selectedPartItem}
                  isIsolated={isIsolated}
                  onToggleIsolate={handleToggleQuickIsolate}
                  onOpenAudioPlayer={() => setIsAudioPlayerOpen(true)}
                  onOpenAITutor={() => setIsAITutorOpen(true)}
                  onOpenInBook={() => {
                    setViewMode('book');
                  }}
                  onClose={() => {
                    setSelectedPartId(null);
                    setSelectedPartItem(null);
                    setSelectedFemalePart(null);
                    if (viewerRef.current) {
                      viewerRef.current.selectPart(null);
                      viewerRef.current.updateState();
                    }
                  }}
                />
              )}
            </section>
          </>
        )}
      </main>

      {/* Code-Split Lazy Modals */}
      <Suspense fallback={null}>
        {/* Medical Imaging & Heart Attack Prevention Diagnostics Modal */}
        <MedicalDiagnosticsModal
          isOpen={isDiagnosticsModalOpen}
          onClose={() => setIsDiagnosticsModalOpen(false)}
        />

        {/* Student Fun Zone: 3D Stethoscope, Cadaver Dissection, Mnemonics & Spotter Challenge */}
        <StudentFunZoneModal
          isOpen={isStudentZoneModalOpen}
          onClose={() => setIsStudentZoneModalOpen(false)}
          onSelectOrgan={partId => {
            handle3DPartClick(partId);
          }}
          onSetLayerSystem={sys => {
            if (sys === 'all') {
              handleUnhideAll();
            } else if (sys === 'muscular') {
              handleToggleOrganGroup('muscles');
            } else if (sys === 'skeletal') {
              handleToggleOrganGroup('skeleton');
            }
          }}
        />

        {/* Compare Mode Modal (Male vs Female) */}
        <CompareModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          activeGender={activeGender}
          onSwitchGender={handleSwitchGender}
        />

        {/* Anatomy Study Suite Modal (Flashcards, Layer Mode, Glossary, Bookmarks) */}
        <StudySuiteModal
          isOpen={isStudySuiteModalOpen}
          onClose={() => setIsStudySuiteModalOpen(false)}
          onSelectPart={handleSelectPart}
          onApplyLayerMode={handleApplyLayerMode}
        />

        {/* Clinical Disease Encyclopedia Modal */}
        <DiseaseExplorerModal
          isOpen={isDiseaseModalOpen}
          onClose={() => setIsDiseaseModalOpen(false)}
          onSelectDisease={handleSelectDisease}
        />

        {/* Interactive Active Recall 3D Quiz Modal (1,50,000+ AI Questions) */}
        <StudentQuizModal
          isOpen={isQuizModalOpen}
          onClose={() => setIsQuizModalOpen(false)}
          onHighlightPart={handleSelectPart}
        />

        {/* Attribution & About Modal */}
        <AboutModal
          isOpen={isAboutModalOpen}
          onClose={() => setIsAboutModalOpen(false)}
        />

        {/* AI Step-by-Step Anatomy Tutor */}
        <StepByStepAITutor
          isOpen={isAITutorOpen}
          onClose={() => setIsAITutorOpen(false)}
          currentPart={activePart}
          currentChapter={BOOK_CHAPTERS[currentChapterIndex]}
          onIsolateIn3D={() => {
            if (activePart) handleIsolatePart(activePart);
          }}
        />
      </Suspense>

      {/* Google Assistant Voice Player */}
      <GoogleAssistantAudioPlayer
        isOpen={isAudioPlayerOpen}
        onClose={() => setIsAudioPlayerOpen(false)}
        currentPart={activePart}
        currentChapter={BOOK_CHAPTERS[currentChapterIndex]}
      />
    </div>
  );
};

export default App;
