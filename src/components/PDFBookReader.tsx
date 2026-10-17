import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Bookmark,
  BookmarkCheck,
  FileText,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Upload,
  Trash2,
  X,
  BookOpen,
  Check,
} from 'lucide-react';
import type { StudyBook, BookBookmark, BookNote } from '../utils/libraryStorage';
import {
  getBook,
  getBookBlob,
  updateBookProgress,
  getBookmarks,
  addBookmark,
  deleteBookmark,
  getNotes,
  saveNote,
  deleteNote,
  saveBook,
} from '../utils/libraryStorage';
import { STARTER_BOOK_CONTENTS } from '../data/starterBookContents';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();
  } catch (err) {
    console.warn('PDF.js worker URL fallback:', err);
  }
}

interface PDFBookReaderProps {
  bookId: string;
  onBackToLibrary: () => void;
  onOpen3DAtlas?: () => void;
}

export const PDFBookReader: React.FC<PDFBookReaderProps> = ({
  bookId,
  onBackToLibrary,
  onOpen3DAtlas,
}) => {
  const [book, setBook] = useState<StudyBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [pdfLoadError, setPdfLoadError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scale, setScale] = useState(1.15);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [jumpPageInput, setJumpPageInput] = useState('1');

  // Drawers
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  // Bookmarks & Notes state
  const [bookmarks, setBookmarks] = useState<BookBookmark[]>([]);
  const [notes, setNotes] = useState<BookNote[]>([]);
  const [currentNoteText, setCurrentNoteText] = useState('');
  const [noteSaveStatus, setNoteSaveStatus] = useState<string | null>(null);

  // PDF.js Document State
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [isPdfRendering, setIsPdfRendering] = useState(false);
  const [hasPdfBlob, setHasPdfBlob] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const renderTaskRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load Book metadata & PDF blob
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setLoadError(null);
        setPdfLoadError(null);
        setBook(null);
        setPdfDoc(null);
        setHasPdfBlob(false);
        const bookData = await getBook(bookId);
        if (!bookData || !isMounted) return;

        setBook(bookData);
        const startPage = bookData.lastReadPage || 1;
        setCurrentPage(startPage);
        setJumpPageInput(String(startPage));

        // Load Bookmarks & Notes
        const [bmList, noteList, blob] = await Promise.all([
          getBookmarks(bookId),
          getNotes(bookId),
          getBookBlob(bookId),
        ]);

        if (!isMounted) return;
        setBookmarks(bmList);
        setNotes(noteList);

        if (blob) {
          setHasPdfBlob(true);
          try {
            const arrayBuffer = await blob.arrayBuffer();
            const loadedPdf = await pdfjsLib.getDocument({
              data: new Uint8Array(arrayBuffer),
            }).promise;

            if (isMounted) {
              setPdfDoc(loadedPdf);
              setTotalPages(loadedPdf.numPages);
              // Update book totalPages if different
              if (loadedPdf.numPages !== bookData.totalPages) {
                bookData.totalPages = loadedPdf.numPages;
                saveBook(bookData);
              }
            }
          } catch (pdfErr) {
            console.error('Failed to parse PDF with pdfjs-dist:', pdfErr);
            setPdfLoadError('Saved PDF file could not be opened. Attach a valid copy of the PDF to continue reading.');
            setTotalPages(bookData.totalPages || 10);
          }
        } else {
          setHasPdfBlob(false);
          const starterPages = STARTER_BOOK_CONTENTS[bookId];
          setTotalPages(starterPages ? starterPages.length : bookData.totalPages || 10);
        }
      } catch (err) {
        console.error('Error loading book reader:', err);
        if (isMounted) setLoadError('Study data could not be read from this browser. Check storage permissions and retry.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [bookId, loadAttempt]);

  // Sync current note text when page changes
  useEffect(() => {
    const pageNote = notes.find((n) => n.pageNumber === currentPage);
    setCurrentNoteText(pageNote ? pageNote.content : '');
    setJumpPageInput(String(currentPage));
  }, [currentPage, notes]);

  // Auto-save last read page to IndexedDB
  const handlePageChange = useCallback(
    async (newPage: number) => {
      if (newPage < 1 || newPage > totalPages) return;
      setCurrentPage(newPage);
      setJumpPageInput(String(newPage));
      try {
        await updateBookProgress(bookId, newPage);
        if (book) {
          setBook((prev) => (prev ? { ...prev, lastReadPage: newPage } : null));
        }
      } catch (err) {
        console.error('Failed to update book progress:', err);
      }
    },
    [bookId, totalPages, book]
  );

  // Render PDF Page on Canvas when page or scale changes
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let isCancelled = false;

    const renderPdfPage = async () => {
      try {
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        setIsPdfRendering(true);
        const page = await pdfDoc.getPage(currentPage);
        if (isCancelled || !canvasRef.current) return;

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        // Support high-DPI displays
        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        const renderContext = {
          canvasContext: context,
          transform: transform || undefined,
          viewport,
        };

        const task = page.render(renderContext as any);
        renderTaskRef.current = task;
        await task.promise;
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('PDF page render error:', err);
        }
      } finally {
        if (!isCancelled) setIsPdfRendering(false);
      }
    };

    renderPdfPage();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pdfDoc, currentPage, scale]);

  // Handle Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error('Fullscreen request failed:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Exit fullscreen failed:', err);
      });
      setIsFullscreen(false);
    }
  };

  // Toggle Bookmark for current page
  const isCurrentPageBookmarked = bookmarks.some((b) => b.pageNumber === currentPage);

  const handleToggleBookmark = async () => {
    const existing = bookmarks.find((b) => b.pageNumber === currentPage);
    if (existing) {
      await deleteBookmark(existing.id);
      setBookmarks((prev) => prev.filter((b) => b.id !== existing.id));
    } else {
      const title = `Page ${currentPage} Bookmark`;
      const created = await addBookmark({
        bookId,
        pageNumber: currentPage,
        title,
      });
      setBookmarks((prev) => [...prev, created].sort((a, b) => a.pageNumber - b.pageNumber));
    }
  };

  // Save or update note for current page
  const handleSaveCurrentNote = async () => {
    if (!currentNoteText.trim()) {
      // If empty and existing, delete note
      const existing = notes.find((n) => n.pageNumber === currentPage);
      if (existing) {
        await deleteNote(existing.id);
        setNotes((prev) => prev.filter((n) => n.id !== existing.id));
      }
      return;
    }

    const existing = notes.find((n) => n.pageNumber === currentPage);
    const saved = await saveNote({
      id: existing ? existing.id : undefined,
      bookId,
      pageNumber: currentPage,
      content: currentNoteText.trim(),
    });

    setNotes((prev) => {
      const filtered = prev.filter((n) => n.id !== saved.id);
      return [...filtered, saved].sort((a, b) => a.pageNumber - b.pageNumber);
    });

    setNoteSaveStatus('सहेजा गया (Saved)');
    setTimeout(() => setNoteSaveStatus(null), 2500);
  };

  // Attach a real PDF file to this book
  const handleAttachPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && book) {
      const file = e.target.files[0];
      try {
        setLoading(true);
        const arrayBuffer = await file.arrayBuffer();
        const loadedPdf = await pdfjsLib.getDocument({
          data: new Uint8Array(arrayBuffer),
        }).promise;

        const updatedBook: StudyBook = {
          ...book,
          totalPages: loadedPdf.numPages,
          fileSizeFormatted: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        };

        await saveBook(updatedBook, file);
        setBook(updatedBook);
        setPdfDoc(loadedPdf);
        setTotalPages(loadedPdf.numPages);
        setHasPdfBlob(true);
        setPdfLoadError(null);
      } catch (err) {
        console.error('Failed to attach PDF to book:', err);
        setPdfLoadError('Selected PDF could not be opened. Choose a valid, unencrypted PDF file and retry.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Jump to specific page
  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(jumpPageInput, 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      handlePageChange(p);
    } else {
      setJumpPageInput(String(currentPage));
    }
  };

  const starterPages = STARTER_BOOK_CONTENTS[bookId] || [];
  const currentStarterPage = starterPages.find((p) => p.pageNumber === currentPage) || starterPages[0];

  if (loading) {
    return (
      <div className="pdf-reader-loading">
        <div className="reader-loader-spinner" />
        <p>पाठ्यपुस्तक लोड हो रही है (Opening Book Reader)...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="pdf-reader-error glass-panel">
        <BookOpen size={48} className="empty-icon" />
        <h3>पुस्तक डेटा लोड नहीं हो सका</h3>
        <p>{loadError}</p>
        <button onClick={() => setLoadAttempt(attempt => attempt + 1)} className="btn-primary">
          फिर से प्रयास करें (Retry)
        </button>
        <button onClick={onBackToLibrary} className="reader-nav-btn">
          ← पुस्तकालय में वापस जाएं
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="pdf-reader-error glass-panel">
        <BookOpen size={48} className="empty-icon" />
        <h3>पुस्तक नहीं मिली (Book not found)</h3>
        <p>यह पुस्तक हटाई गई हो सकती है या लिंक पुराना है।</p>
        <button onClick={onBackToLibrary} className="btn-primary">
          ← पुस्तकालय में वापस जाएं
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`pdf-reader-wrapper ${isFullscreen ? 'is-fullscreen' : ''}`}>
      {/* Top Sticky Navigation Toolbar */}
      <header className="reader-top-bar glass-panel">
        <div className="reader-top-left">
          <button
            onClick={onBackToLibrary}
            className="reader-nav-btn back-btn"
            title="पुस्तकालय में वापस जाएं (Back to Library)"
          >
            <ArrowLeft size={16} />
            <span className="desktop-only">पुस्तकालय (Library)</span>
          </button>

          <div className="reader-book-identity">
            <span
              className="reader-category-badge"
              style={{ backgroundColor: book.coverColor + '25', color: book.coverColor }}
            >
              {book.category}
            </span>
            <h2 className="reader-book-title" title={book.title}>
              {book.title}
            </h2>
          </div>
        </div>

        {/* Right Reader Tools: Zoom, Fullscreen, Bookmarks, Notes */}
        <div className="reader-top-right">
          {/* 3D Atlas Quick Jump */}
          {onOpen3DAtlas && (
            <button
              onClick={onOpen3DAtlas}
              className="reader-tool-btn atlas-jump-btn"
              title="3D मॉडल में देखें (Open in 3D Atlas)"
            >
              <Sparkles size={15} className="text-warning" />
              <span className="desktop-only">3D मॉडल</span>
            </button>
          )}

          {/* Zoom Controls */}
          {hasPdfBlob && (
            <div className="reader-zoom-group">
              <button
                onClick={() => setScale((s) => Math.max(0.6, s - 0.15))}
                className="zoom-btn"
                title="Zoom Out (-)"
              >
                <ZoomOut size={15} />
              </button>
              <span className="zoom-label">{Math.round(scale * 100)}%</span>
              <button
                onClick={() => setScale((s) => Math.min(2.5, s + 0.15))}
                className="zoom-btn"
                title="Zoom In (+)"
              >
                <ZoomIn size={15} />
              </button>
              <button
                onClick={() => setScale(1.15)}
                className="zoom-btn reset-zoom"
                title="Reset Zoom"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          )}

          {/* Bookmarks Toggle */}
          <button
            onClick={() => {
              setIsBookmarksOpen(!isBookmarksOpen);
              if (isNotesOpen) setIsNotesOpen(false);
            }}
            className={`reader-tool-btn ${isBookmarksOpen ? 'active' : ''}`}
            title="बुकमार्क्स सूची खोलें (Bookmarks)"
          >
            <Bookmark size={16} />
            <span className="desktop-only">बुकमार्क्स</span>
            {bookmarks.length > 0 && <span className="badge-count">{bookmarks.length}</span>}
          </button>

          {/* Notes Toggle */}
          <button
            onClick={() => {
              setIsNotesOpen(!isNotesOpen);
              if (isBookmarksOpen) setIsBookmarksOpen(false);
            }}
            className={`reader-tool-btn ${isNotesOpen ? 'active' : ''}`}
            title="व्यक्तिगत अध्ययन नोट्स (Page Notes)"
          >
            <FileText size={16} />
            <span className="desktop-only">नोट्स</span>
            {notes.length > 0 && <span className="badge-count">{notes.length}</span>}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="reader-tool-btn icon-only"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </header>

      {/* Main Reading Stage & Canvas View */}
      <main className="reader-stage-container">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleAttachPdf}
          style={{ display: 'none' }}
        />
        {/* PDF Canvas or Starter Textbook Page */}
        <div className="reader-canvas-scroll-area">
          {hasPdfBlob && pdfDoc ? (
            <div className="pdf-canvas-container">
              {isPdfRendering && (
                <div className="pdf-rendering-overlay">
                  <div className="mini-spinner" />
                  <span>पेज रेंडर हो रहा है...</span>
                </div>
              )}
              <canvas ref={canvasRef} className="pdf-page-canvas" />
            </div>
          ) : pdfLoadError ? (
            <div className="empty-page-placeholder glass-panel">
              <AlertCircle size={32} className="empty-icon" />
              <p>{pdfLoadError}</p>
              <button onClick={() => fileInputRef.current?.click()} className="attach-btn">
                <Upload size={15} />
                <span>मान्य PDF चुनें (Attach PDF)</span>
              </button>
            </div>
          ) : currentStarterPage ? (
            /* Built-in Rich Reference Book Page */
            <div className="starter-textbook-page glass-panel">
              <div className="page-header-ribbon">
                <span className="page-chapter-label">{currentStarterPage.chapterTitle}</span>
                <span className="page-badge">पेज {currentPage} / {totalPages}</span>
              </div>

              <div className="page-hero-title">
                <h1 className="topic-main-title">{currentStarterPage.topicTitle}</h1>
                <h2 className="topic-hindi-title">{currentStarterPage.hindiTitle}</h2>
              </div>

              <div className="page-summary-box">
                <p className="summary-paragraph">{currentStarterPage.summary}</p>
              </div>

              {/* Key High-Yield Bullet Points */}
              <div className="study-section-card key-points-card">
                <h3 className="section-card-title">
                  <Sparkles size={17} className="text-warning" />
                  प्रमुख सैद्धांतिक बिंदु (Key Theoretical Points)
                </h3>
                <ul className="points-list">
                  {currentStarterPage.keyPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Clinical Correlations */}
              <div className="study-section-card clinical-card">
                <h3 className="section-card-title">
                  <FileText size={17} className="text-danger" />
                  चिकित्सकीय सहसंबंध (Clinical Correlations & Pathology)
                </h3>
                <ul className="points-list">
                  {currentStarterPage.clinicalCorrelations.map((cl, i) => (
                    <li key={i}>{cl}</li>
                  ))}
                </ul>
              </div>

              {/* Exam Pearls & Mnemonic */}
              <div className="study-section-card pearls-card">
                <h3 className="section-card-title">
                  <Bookmark size={17} className="text-cyan" />
                  परीक्षा में पूछे जाने वाले तथ्य (High-Yield Exam Pearls)
                </h3>
                <ul className="points-list">
                  {currentStarterPage.examPearls.map((ep, i) => (
                    <li key={i}>{ep}</li>
                  ))}
                </ul>

                {currentStarterPage.mnemonic && (
                  <div className="mnemonic-box">
                    <strong>याद रखने का सूत्र (Mnemonic):</strong>
                    <span>{currentStarterPage.mnemonic}</span>
                  </div>
                )}
              </div>

              {/* Attach Custom PDF Option Banner */}
              <div className="attach-pdf-banner">
                <div className="attach-text">
                  <strong>क्या आपके पास इस पुस्तक की मूल PDF फ़ाइल है?</strong>
                  <p>आप अपनी मूल PDF कॉपी यहाँ जोड़ सकते हैं और सीधे ओरिजिनल पेजों में पढ़ सकते हैं।</p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="attach-btn"
                >
                  <Upload size={15} />
                  <span>मूल PDF फ़ाइल जोड़ें (Attach PDF)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-page-placeholder glass-panel">
              <p>पेज {currentPage} उपलब्ध नहीं है।</p>
            </div>
          )}
        </div>

        {/* Slide-out Bookmarks Drawer */}
        {isBookmarksOpen && (
          <aside className="reader-side-drawer glass-panel">
            <div className="drawer-header">
              <div className="drawer-title-group">
                <Bookmark size={18} className="drawer-icon" />
                <h4>बुकमार्क्स ({bookmarks.length})</h4>
              </div>
              <button
                onClick={() => setIsBookmarksOpen(false)}
                className="close-drawer-btn"
                aria-label="Close Bookmarks"
              >
                <X size={16} />
              </button>
            </div>

            <div className="drawer-content">
              {bookmarks.length === 0 ? (
                <div className="drawer-empty">
                  <Bookmark size={32} className="empty-icon" />
                  <p>कोई बुकमार्क नहीं जोड़ा गया है।</p>
                  <span className="empty-hint">
                    नीचे दिए गए बुकमार्क बटन पर क्लिक करके वर्तमान पेज {currentPage} को सहेजें।
                  </span>
                </div>
              ) : (
                <ul className="bookmarks-list">
                  {bookmarks.map((bm) => (
                    <li
                      key={bm.id}
                      onClick={() => handlePageChange(bm.pageNumber)}
                      className={`bookmark-item ${bm.pageNumber === currentPage ? 'active' : ''}`}
                    >
                      <div className="bookmark-info">
                        <span className="bookmark-page-badge">पेज {bm.pageNumber}</span>
                        <span className="bookmark-title">{bm.title}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteBookmark(bm.id);
                          setBookmarks((prev) => prev.filter((b) => b.id !== bm.id));
                        }}
                        className="delete-item-btn"
                        title="हटाएं"
                      >
                        <Trash2 size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        )}

        {/* Slide-out Notes Drawer */}
        {isNotesOpen && (
          <aside className="reader-side-drawer notes-drawer glass-panel">
            <div className="drawer-header">
              <div className="drawer-title-group">
                <FileText size={18} className="drawer-icon text-cyan" />
                <h4>अध्ययन नोट्स (Page Notes)</h4>
              </div>
              <button
                onClick={() => setIsNotesOpen(false)}
                className="close-drawer-btn"
                aria-label="Close Notes"
              >
                <X size={16} />
              </button>
            </div>

            <div className="drawer-content">
              {/* Note Editor for Current Page */}
              <div className="page-note-editor">
                <div className="note-editor-header">
                  <span className="current-page-tag">पेज {currentPage} के लिए व्यक्तिगत नोट्स</span>
                  {noteSaveStatus && (
                    <span className="note-saved-pill">
                      <Check size={12} />
                      {noteSaveStatus}
                    </span>
                  )}
                </div>
                <textarea
                  value={currentNoteText}
                  onChange={(e) => setCurrentNoteText(e.target.value)}
                  placeholder={`पेज ${currentPage} के मुख्य बिंदु, परीक्षा नोट्स या रिवीजन सारांश लिखें...`}
                  rows={4}
                  className="note-textarea"
                />
                <button onClick={handleSaveCurrentNote} className="save-note-btn">
                  <span>नोट सहेजें (Save Note)</span>
                </button>
              </div>

              {/* All Saved Notes for this Book */}
              <div className="all-notes-section">
                <h5 className="notes-subtitle">इस पुस्तक के सभी नोट्स ({notes.length})</h5>
                {notes.length === 0 ? (
                  <p className="no-notes-text">अभी तक कोई नोट नहीं लिखा गया है।</p>
                ) : (
                  <ul className="notes-list">
                    {notes.map((note) => (
                      <li
                        key={note.id}
                        onClick={() => handlePageChange(note.pageNumber)}
                        className={`note-item ${note.pageNumber === currentPage ? 'active' : ''}`}
                      >
                        <div className="note-item-top">
                          <span className="note-page-pill">पेज {note.pageNumber}</span>
                          <span className="note-date">
                            {new Date(note.updatedAt).toLocaleDateString()}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNote(note.id);
                              setNotes((prev) => prev.filter((n) => n.id !== note.id));
                              if (note.pageNumber === currentPage) setCurrentNoteText('');
                            }}
                            className="delete-item-btn"
                            title="नोट हटाएं"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <p className="note-item-content">{note.content}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </aside>
        )}
      </main>

      {/* Bottom Sticky Page Navigation Controls */}
      <footer className="reader-bottom-bar glass-panel">
        <div className="reader-nav-controls">
          {/* First Page Button */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage <= 1}
            className="page-nav-btn"
            title="First Page (|◀)"
          >
            <ChevronsLeft size={18} />
          </button>

          {/* Previous Page Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="page-nav-btn prev-btn"
            title="Previous Page (◀)"
          >
            <ChevronLeft size={18} />
            <span className="desktop-only">पिछला</span>
          </button>

          {/* Jump to Page Form: [ Current ] / Total */}
          <form onSubmit={handleJumpSubmit} className="page-indicator-form">
            <input
              type="text"
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              onBlur={handleJumpSubmit}
              className="page-jump-input"
              aria-label="Current page number"
            />
            <span className="page-separator">/</span>
            <span className="total-pages-label">{totalPages}</span>
          </form>

          {/* Next Page Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="page-nav-btn next-btn"
            title="Next Page (▶)"
          >
            <span className="desktop-only">अगला</span>
            <ChevronRight size={18} />
          </button>

          {/* Last Page Button */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage >= totalPages}
            className="page-nav-btn"
            title="Last Page (▶|)"
          >
            <ChevronsRight size={18} />
          </button>
        </div>

        {/* Quick Page Action Shortcuts: Bookmark & Add Note */}
        <div className="reader-bottom-actions">
          <button
            onClick={handleToggleBookmark}
            className={`quick-action-btn ${isCurrentPageBookmarked ? 'active-bookmark' : ''}`}
            title={isCurrentPageBookmarked ? 'बुकमार्क हटाएं' : 'पेज को बुकमार्क करें'}
          >
            {isCurrentPageBookmarked ? (
              <BookmarkCheck size={16} className="text-cyan" />
            ) : (
              <Bookmark size={16} />
            )}
            <span className="desktop-only">
              {isCurrentPageBookmarked ? 'बुकमार्क किया गया' : 'बुकमार्क करें'}
            </span>
          </button>

          <button
            onClick={() => setIsNotesOpen(true)}
            className="quick-action-btn"
            title="पेज पर नोट लिखें"
          >
            <FileText size={16} />
            <span className="desktop-only">नोट लिखें</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
