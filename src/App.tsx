import { useEffect, useState, useRef, useCallback } from 'react';
import type { AtlasData, StudyPartItem, ClinicalDisease } from './types/atlas';
import { BOOK_CHAPTERS } from './data/chapters';
import { FEMALE_MESH_CATALOG } from './data/femaleMeshCatalog';
import { ThreeViewer } from './engine/ThreeViewer';
import { Header } from './components/Header';
import { ThreeCanvas } from './components/ThreeCanvas';
import { BookReader } from './components/BookReader';
import { ControlsOverlay } from './components/ControlsOverlay';
import { DiseaseExplorerModal } from './components/DiseaseExplorerModal';
import { AboutModal } from './components/AboutModal';
import { StudentQuizModal } from './components/StudentQuizModal';
import { StudyLibrary } from './components/StudyLibrary';
import { PDFBookReader } from './components/PDFBookReader';
import { CompareModal } from './components/CompareModal';
import { StudySuiteModal } from './components/StudySuiteModal';
import { QuickOrganFocusBar } from './components/QuickOrganFocusBar';
import { GoogleAssistantAudioPlayer } from './components/GoogleAssistantAudioPlayer';
import { StepByStepAITutor } from './components/StepByStepAITutor';

export const App: React.FC = () => {
  const [atlas, setAtlas] = useState<AtlasData | null>(null);
  const viewerRef = useRef<ThreeViewer | null>(null);

  // Active Gender Model ('male' = BodyParts3D 4.0, 'female' = HuBMAP VHF 1.5)
  const [activeGender, setActiveGender] = useState<'male' | 'female'>('male');
  const [skinOpacity, setSkinOpacity] = useState(0.2);

  // App & View State
  const [viewMode, setViewMode] = useState<'book' | 'explorer' | 'library' | 'reader'>('book');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [selectedFemalePart, setSelectedFemalePart] = useState<StudyPartItem | null>(null);

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
  const [isQuickFocusOpen, setIsQuickFocusOpen] = useState(false);

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
    fetch('/models/atlas.json')
      .then(res => {
        if (!res.ok) throw new Error('Atlas manifest not found.');
        return res.json();
      })
      .then((data: AtlasData) => {
        setAtlas(data);
      })
      .catch(err => {
        console.error('Failed to load atlas.json:', err);
      });
  }, []);

  const currentChapter = BOOK_CHAPTERS[currentChapterIndex] || BOOK_CHAPTERS[0];
  const currentPart = selectedFemalePart || currentChapter.parts[currentPartIndex];

  // Dynamic Caption Text
  const captionText = isIsolated
    ? `${currentPart ? currentPart.hindiName : 'चयनित अंग'} · अकेला दृश्य (Isolated 3D)`
    : explodeValue > 0.8
    ? 'विभाजित अंग सूची (2D Knolled Inventory Grid)'
    : explodeValue > 0.05
    ? 'विभाजित शारीरिक संरचनाएं (Separated Anatomy)'
    : currentPart
    ? `${currentPart.hindiName} (${currentPart.name})`
    : activeGender === 'female'
    ? 'महिला शारीरिक संरचना (HuBMAP Visible Human Female 1.5)'
    : `${currentChapter.hindiTitle}`;

  // Handle switching gender model
  const handleSwitchGender = useCallback(async (gender: 'male' | 'female') => {
    setActiveGender(gender);
    setSelectedPartId(null);
    setSelectedFemalePart(null);
    setIsIsolated(false);
    if (viewerRef.current) {
      await viewerRef.current.switchGender(gender);
    }
  }, []);

  // Handle selecting a part from Book Reader or Study Suite
  const handleSelectPart = useCallback((part: StudyPartItem) => {
    setSelectedPartId(part.elements[0] || part.id);
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
      viewerRef.current.frameSelectedStructure(viewMode === 'book' ? -0.2 : 0);
    }
  }, [viewMode]);

  // Handle isolating a part
  const handleIsolatePart = useCallback((part: StudyPartItem) => {
    setSelectedPartId(part.elements[0] || part.id);
    setIsIsolated(true);
    setExplodeValue(0);

    if (viewerRef.current && part.elements.length > 0) {
      viewerRef.current.selectMultipleParts(part.elements);
      viewerRef.current.setIsolated(true);
      viewerRef.current.frameSelectedStructure(viewMode === 'book' ? -0.2 : 0);
    }
  }, [viewMode]);

  // Handle clicking directly in 3D viewport
  const handle3DPartClick = useCallback((partId: string) => {
    setSelectedPartId(partId);

    // Check if clicked in female model
    if (activeGender === 'female') {
      const fItem = FEMALE_MESH_CATALOG.find(p => p.id === partId);
      if (fItem) {
        const femaleStudyItem: StudyPartItem = {
          id: fItem.id,
          name: fItem.name,
          hindiName: fItem.hindiName || fItem.name,
          latinName: fItem.fmaId || undefined,
          system: fItem.system,
          elements: [fItem.id],
          locationHinglish: `महिला शरीर रचना (${fItem.system} तंत्र) का अंग।`,
          functionHinglish: fItem.description,
          funFactHinglish: fItem.fmaId ? `FMA स्रोत ID: ${fItem.fmaId}` : 'HuBMAP VHF 1.5 3D मेश',
          clinicalNoteHinglish: 'HuBMAP Visible Human Female 1.5 संदर्भ डेटासेट से प्राप्त वैज्ञानिक 3D संरचना।',
          relatedDiseases: [],
        };
        setSelectedFemalePart(femaleStudyItem);
        if (viewerRef.current) {
          viewerRef.current.selectPart(partId);
          viewerRef.current.frameSelectedStructure(viewMode === 'book' ? -0.2 : 0);
        }
        return;
      }
    }

    setSelectedFemalePart(null);

    // Look for matching part in male curated chapters
    for (let cIdx = 0; cIdx < BOOK_CHAPTERS.length; cIdx++) {
      const ch = BOOK_CHAPTERS[cIdx];
      const foundPartIdx = ch.parts.findIndex(p => p.elements.includes(partId) || p.id === partId);
      if (foundPartIdx >= 0) {
        setCurrentChapterIndex(cIdx);
        setCurrentPartIndex(foundPartIdx);
        break;
      }
    }

    setIsQuickFocusOpen(true);
    if (viewerRef.current) {
      viewerRef.current.selectPart(partId);
      viewerRef.current.frameSelectedStructure(viewMode === 'book' ? -0.2 : 0);
    }
  }, [activeGender, viewMode]);

  // Handle toggling Solo Focus / Isolate from quick focus pill
  const handleToggleQuickIsolate = useCallback(() => {
    const next = !isIsolated;
    setIsIsolated(next);
    if (viewerRef.current) {
      viewerRef.current.setIsolated(next);
      if (next) {
        viewerRef.current.frameSelectedStructure(viewMode === 'book' ? -0.2 : 0);
      }
    }
  }, [isIsolated, viewMode]);

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
    activeGender === 'female'
      ? selectedFemalePart || undefined
      : BOOK_CHAPTERS[currentChapterIndex]?.parts[currentPartIndex];

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
        theme={theme}
        onToggleTheme={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        currentChapterTitle={
          viewMode === 'library'
            ? '📚 मानव शरीर अध्ययन पुस्तकालय (Study Library)'
            : viewMode === 'reader'
            ? '📖 व्यक्तिगत पाठ्यपुस्तक अध्ययन (PDF Reader)'
            : activeGender === 'female'
            ? '♀ महिला संदर्भ शरीर रचना (HuBMAP VHF 1.5)'
            : currentChapter.hindiTitle
        }
        totalPartsCount={activeGender === 'female' ? 888 : atlas?.parts.length || 2234}
      />

      {/* Main Workspace */}
      <main className="app-main-workspace">
        {viewMode === 'library' ? (
          /* Human Body Study Library Shelf */
          <StudyLibrary
            onOpenBook={bookId => navigateToBook(bookId)}
            onBackTo3D={() => navigateToAtlas('book')}
          />
        ) : viewMode === 'reader' && selectedBookId ? (
          /* Individual Book PDF & Chapter Reader */
          <PDFBookReader
            bookId={selectedBookId}
            onBackToLibrary={navigateToLibrary}
            onOpen3DAtlas={() => navigateToAtlas('book')}
          />
        ) : (
          /* 3D Anatomy Atlas & Textbook Split View */
          <>
            {viewMode === 'book' && (
              <BookReader
                currentChapterIndex={currentChapterIndex}
                currentPartIndex={currentPartIndex}
                onSelectChapter={idx => {
                  setCurrentChapterIndex(idx);
                  setCurrentPartIndex(0);
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
                captionText={captionText}
                isIsolated={isIsolated}
                onClearIsolate={() => {
                  setIsIsolated(false);
                  if (viewerRef.current) {
                    viewerRef.current.setIsolated(false);
                    viewerRef.current.updateState();
                  }
                }}
              />

              {/* Floating Quick Organ Focus Bar (Solo View, Audio, AI Tutor) */}
              {isQuickFocusOpen && activePart && (
                <QuickOrganFocusBar
                  part={activePart}
                  isIsolated={isIsolated}
                  onToggleIsolate={handleToggleQuickIsolate}
                  onOpenAudioPlayer={() => setIsAudioPlayerOpen(true)}
                  onOpenAITutor={() => setIsAITutorOpen(true)}
                  onClose={() => setIsQuickFocusOpen(false)}
                />
              )}
            </section>
          </>
        )}
      </main>

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

      {/* Interactive Active Recall 3D Quiz Modal */}
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

      {/* Google Assistant Voice Player */}
      <GoogleAssistantAudioPlayer
        isOpen={isAudioPlayerOpen}
        onClose={() => setIsAudioPlayerOpen(false)}
        currentPart={activePart}
        currentChapter={BOOK_CHAPTERS[currentChapterIndex]}
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
    </div>
  );
};

export default App;
