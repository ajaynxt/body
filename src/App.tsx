import { useEffect, useState, useRef, useCallback } from 'react';
import type { AtlasData, StudyPartItem, ClinicalDisease } from './types/atlas';
import { BOOK_CHAPTERS } from './data/chapters';
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

export const App: React.FC = () => {
  const [atlas, setAtlas] = useState<AtlasData | null>(null);
  const viewerRef = useRef<ThreeViewer | null>(null);

  // App & View State
  const [viewMode, setViewMode] = useState<'book' | 'explorer' | 'library' | 'reader'>('book');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);

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

  // Fetch atlas.json
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
  const currentPart = currentChapter.parts[currentPartIndex];

  // Dynamic Caption Text
  const captionText = isIsolated
    ? `${currentPart ? currentPart.hindiName : 'चयनित अंग'} · अकेला दृश्य (Isolated 3D)`
    : explodeValue > 0.8
    ? 'विभाजित अंग सूची (2D Knolled Inventory Grid)'
    : explodeValue > 0.05
    ? 'विभाजित शारीरिक संरचनाएं (Separated Anatomy)'
    : currentPart
    ? `${currentPart.hindiName} (${currentPart.name})`
    : `${currentChapter.hindiTitle}`;

  // Handle selecting a part from Book Reader
  const handleSelectPart = useCallback((part: StudyPartItem) => {
    setSelectedPartId(part.elements[0] || part.id);
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

    // Look for matching part in our curated chapters
    for (let cIdx = 0; cIdx < BOOK_CHAPTERS.length; cIdx++) {
      const ch = BOOK_CHAPTERS[cIdx];
      const foundPartIdx = ch.parts.findIndex(p => p.elements.includes(partId) || p.id === partId);
      if (foundPartIdx >= 0) {
        setCurrentChapterIndex(cIdx);
        setCurrentPartIndex(foundPartIdx);
        break;
      }
    }
  }, []);

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

  // Handle Reset View
  const handleReset = useCallback(() => {
    setExplodeValue(0);
    setIsIsolated(false);
    setSelectedPartId(null);
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
        onOpenDiseaseModal={() => setIsDiseaseModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenQuizModal={() => setIsQuizModalOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        currentChapterTitle={
          viewMode === 'library'
            ? '📚 मानव शरीर अध्ययन पुस्तकालय (Study Library)'
            : viewMode === 'reader'
            ? '📖 व्यक्तिगत पाठ्यपुस्तक अध्ययन (PDF Reader)'
            : currentChapter.hindiTitle
        }
        totalPartsCount={atlas?.parts.length || 2234}
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
              />
            )}

            <section className="three-viewport-section">
              <ThreeCanvas
                atlas={atlas}
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
                    viewerRef.current.updateStateTextures();
                  }
                }}
              />
            </section>
          </>
        )}
      </main>

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
    </div>
  );
};

export default App;
