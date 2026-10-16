import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen,
  Upload,
  Search,
  Trash2,
  Clock,
  Lock,
  ArrowRight,
  FileText,
  AlertCircle,
  X,
} from 'lucide-react';
import type { StudyBook } from '../utils/libraryStorage';
import {
  ensureStarterBooksSeeded,
  saveBook,
  deleteBook,
} from '../utils/libraryStorage';

interface StudyLibraryProps {
  onOpenBook: (bookId: string) => void;
  onBackTo3D: () => void;
}

type CategoryType = 'All' | 'Human Anatomy' | 'Physiology' | 'Histology' | 'Biochemistry' | 'Human Biology';

const CATEGORIES: CategoryType[] = [
  'All',
  'Human Anatomy',
  'Physiology',
  'Histology',
  'Biochemistry',
  'Human Biology',
];

const PRESET_COLORS = ['#0ea5e9', '#ef4444', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#6366f1'];

export const StudyLibrary: React.FC<StudyLibraryProps> = ({ onOpenBook, onBackTo3D }) => {
  const [books, setBooks] = useState<StudyBook[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Upload Form State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookCategory, setBookCategory] = useState<StudyBook['category']>('Human Anatomy');
  const [bookDescription, setBookDescription] = useState('');
  const [coverColor, setCoverColor] = useState(PRESET_COLORS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load books from IndexedDB
  const loadBooks = async () => {
    try {
      setLoading(true);
      const list = await ensureStarterBooksSeeded();
      setBooks(list);
    } catch (err) {
      console.error('Failed to load books from IndexedDB:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // Most recent book for Continue Reading card
  const mostRecentBook = useMemo(() => {
    if (books.length === 0) return null;
    return [...books].sort((a, b) => (b.lastReadAt || 0) - (a.lastReadAt || 0))[0];
  }, [books]);

  // Filtered books
  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [books, selectedCategory, searchQuery]);

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        setUploadError('कृपया एक वैध PDF फ़ाइल चुनें (Only valid .pdf files are supported).');
        return;
      }
      setUploadError(null);
      setUploadFile(file);

      // Auto-populate title from filename if empty
      if (!bookTitle) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setBookTitle(cleanName);
      }
    }
  };

  // Handle Book Creation
  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadError('कृपया एक PDF फ़ाइल अपलोड करें (Please choose a PDF file).');
      return;
    }
    if (!bookTitle.trim()) {
      setUploadError('कृपया किताब का शीर्षक दर्ज करें (Please enter a book title).');
      return;
    }

    try {
      setIsSubmitting(true);
      setUploadError(null);

      // Read total pages if possible using PDF.js or fallback to estimated
      let detectedPages = 10;
      try {
        const pdfjsLib = await import('pdfjs-dist');
        const arrayBuffer = await uploadFile.arrayBuffer();
        const doc = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
        detectedPages = doc.numPages;
      } catch (err) {
        console.warn('Could not pre-read page count with PDF.js, using default:', err);
      }

      const formattedSize =
        uploadFile.size > 1024 * 1024
          ? `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(uploadFile.size / 1024)} KB`;

      const newBook: StudyBook = {
        id: `book_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        title: bookTitle.trim(),
        author: bookAuthor.trim() || 'Medical Author',
        category: bookCategory,
        totalPages: detectedPages,
        lastReadPage: 1,
        lastReadAt: Date.now(),
        coverColor,
        description:
          bookDescription.trim() ||
          `Personal study textbook for ${bookCategory}. Uploaded locally to browser storage.`,
        fileSizeFormatted: formattedSize,
        isStarter: false,
      };

      await saveBook(newBook, uploadFile);
      await loadBooks();

      // Reset Form & Close Modal
      setIsUploadModalOpen(false);
      setUploadFile(null);
      setBookTitle('');
      setBookAuthor('');
      setBookDescription('');
      setIsSubmitting(false);

      // Open new book immediately
      onOpenBook(newBook.id);
    } catch (err) {
      console.error('Failed to save book to IndexedDB:', err);
      setUploadError('पुस्तक सहेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
      setIsSubmitting(false);
    }
  };

  // Handle Book Deletion
  const handleDeleteBook = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('क्या आप वाकई इस पुस्तक को हटाना चाहते हैं? (Remove this book from library?)')) {
      await deleteBook(id);
      await loadBooks();
    }
  };

  return (
    <div className="study-library-container">
      {/* Top Banner Navigation */}
      <div className="library-top-nav glass-panel">
        <div className="library-top-nav-left">
          <button onClick={onBackTo3D} className="back-to-3d-btn" title="Back to 3D Anatomy Atlas">
            ← 3D एनाटॉमी एटलस (Back to 3D)
          </button>
          <div className="library-title-group">
            <h1 className="library-main-heading">
              <BookOpen size={22} className="inline-icon" />
              मानव शरीर अध्ययन पुस्तकालय (Human Body Study Library)
            </h1>
            <p className="library-sub-heading">
              प्रमाणित मेडिकल संदर्भ पुस्तकें, व्यक्तिगत PDF अध्ययन, और पेज-वार नोट्स
            </p>
          </div>
        </div>

        <div className="library-top-nav-right">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="library-upload-btn primary-action"
          >
            <Upload size={18} />
            <span>अपनी PDF पुस्तक जोड़ें (Add PDF)</span>
          </button>
        </div>
      </div>

      <div className="library-content-scroll">
        {/* Continue Reading Hero Card */}
        {mostRecentBook && (
          <section className="continue-reading-section glass-panel">
            <div className="continue-reading-badge">
              <Clock size={15} />
              <span>पठन जारी रखें (Continue Reading)</span>
            </div>
            <div className="continue-reading-grid">
              <div
                className="continue-reading-cover"
                style={{ backgroundColor: mostRecentBook.coverColor }}
              >
                <BookOpen size={48} className="cover-icon" />
                <span className="cover-tag">{mostRecentBook.category}</span>
              </div>
              <div className="continue-reading-info">
                <span className="book-category-pill">{mostRecentBook.category}</span>
                <h2 className="continue-reading-title">{mostRecentBook.title}</h2>
                <p className="continue-reading-author">{mostRecentBook.author}</p>
                <p className="continue-reading-desc">{mostRecentBook.description}</p>

                <div className="reading-progress-bar-wrap">
                  <div className="progress-label">
                    <span>
                      पेज {mostRecentBook.lastReadPage} / {mostRecentBook.totalPages}
                    </span>
                    <span>
                      {Math.round(
                        (mostRecentBook.lastReadPage / (mostRecentBook.totalPages || 1)) * 100
                      )}
                      % पूर्ण
                    </span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.round(
                            (mostRecentBook.lastReadPage / (mostRecentBook.totalPages || 1)) * 100
                          )
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="continue-actions">
                  <button
                    onClick={() => onOpenBook(mostRecentBook.id)}
                    className="continue-btn-primary"
                  >
                    <span>आगे पढ़ें (Resume Page {mostRecentBook.lastReadPage})</span>
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filters and Search Toolbar */}
        <div className="library-toolbar glass-panel">
          {/* Category Tabs */}
          <div className="category-tabs-scroll">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat === 'All' ? 'सभी विषय (All)' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="library-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="शीर्षक, लेखक या विषय खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="library-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="clear-search-btn"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Books Shelf Grid */}
        <div className="library-shelf-section">
          <div className="shelf-header">
            <h3 className="shelf-title">
              {selectedCategory === 'All' ? 'उपलब्ध अध्ययन पुस्तकें' : `${selectedCategory} संदर्भ संग्रह`}
              <span className="shelf-count">({filteredBooks.length})</span>
            </h3>
            <span className="privacy-badge">
              <Lock size={13} />
              <span>सुरक्षित स्थानीय स्टोरेज (Browser IndexedDB)</span>
            </span>
          </div>

          {loading ? (
            <div className="shelf-loading">पुस्तकालय लोड हो रहा है...</div>
          ) : filteredBooks.length === 0 ? (
            <div className="shelf-empty glass-panel">
              <BookOpen size={40} className="empty-icon" />
              <h4>कोई पुस्तक नहीं मिली</h4>
              <p>खोज शब्द बदलें या अपनी व्यक्तिगत PDF मेडिकल पुस्तक जोड़ें।</p>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="library-upload-btn primary-action"
              >
                <Upload size={16} />
                <span>नई पुस्तक जोड़ें</span>
              </button>
            </div>
          ) : (
            <div className="books-grid">
              {filteredBooks.map((book) => {
                const progressPercent = Math.min(
                  100,
                  Math.round(((book.lastReadPage || 1) / (book.totalPages || 1)) * 100)
                );

                return (
                  <article
                    key={book.id}
                    onClick={() => onOpenBook(book.id)}
                    className="book-card glass-panel"
                  >
                    {/* Cover Header */}
                    <div className="book-card-cover" style={{ backgroundColor: book.coverColor }}>
                      <div className="cover-spine" />
                      <div className="cover-content">
                        <span className="cover-badge">{book.category}</span>
                        <h4 className="cover-title">{book.title}</h4>
                        <span className="cover-author">{book.author}</span>
                      </div>
                      <div className="cover-footer">
                        <span className="cover-pages">{book.totalPages} पेजेस</span>
                        {book.isStarter ? (
                          <span className="starter-pill">मूल संदर्भ (Reference)</span>
                        ) : (
                          <span className="user-upload-pill">व्यक्तिगत (Uploaded)</span>
                        )}
                      </div>
                    </div>

                    {/* Book Metadata */}
                    <div className="book-card-body">
                      <h4 className="book-card-title" title={book.title}>
                        {book.title}
                      </h4>
                      <p className="book-card-author">{book.author}</p>
                      <p className="book-card-desc">{book.description}</p>

                      {/* Mini Progress */}
                      <div className="book-card-progress">
                        <div className="progress-info">
                          <span>
                            पेज {book.lastReadPage} / {book.totalPages}
                          </span>
                          <span>{progressPercent}%</span>
                        </div>
                        <div className="mini-track">
                          <div className="mini-fill" style={{ width: `${progressPercent}%` }} />
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="book-card-actions">
                        <button className="read-card-btn">
                          <span>पढ़ें (Open Reader)</span>
                          <ArrowRight size={14} />
                        </button>
                        {!book.isStarter && (
                          <button
                            onClick={(e) => handleDeleteBook(book.id, e)}
                            className="delete-card-btn"
                            title="पुस्तक हटाएं"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Local Storage & Indexing Privacy Notice */}
        <div className="library-privacy-banner glass-panel">
          <Lock size={18} className="lock-icon" />
          <div className="privacy-text">
            <strong>गोपनीयता एवं स्थानीय संग्रहण सूचना (Privacy & Local Storage Notice):</strong>
            <p>
              आपकी व्यक्तिगत रूप से अपलोड की गई PDF फाइलें केवल आपके ब्राउज़र के IndexedDB में स्थानीय रूप से सुरक्षित रखी जाती हैं। वे किसी भी बाहरी सर्वर पर अपलोड नहीं होती हैं और सर्च इंजन (Google / Bing) द्वारा इंडेक्स नहीं की जाती हैं।
            </p>
          </div>
        </div>
      </div>

      {/* Upload PDF Modal */}
      {isUploadModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsUploadModalOpen(false)}>
          <div className="library-upload-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Upload size={20} className="modal-icon" />
                <h3>व्यक्तिगत PDF पाठ्यपुस्तक जोड़ें (Add PDF Textbook)</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="close-modal-btn"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateBook} className="upload-form">
              {uploadError && (
                <div className="form-error-banner">
                  <AlertCircle size={16} />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* PDF File Picker */}
              <div className="form-group">
                <label className="form-label">PDF फ़ाइल चुनें *</label>
                <div
                  className="file-drop-zone"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  {uploadFile ? (
                    <div className="selected-file-info">
                      <FileText size={32} className="text-cyan" />
                      <div className="file-details">
                        <span className="file-name">{uploadFile.name}</span>
                        <span className="file-size">
                          {(uploadFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="drop-prompt">
                      <Upload size={32} className="upload-icon-pulse" />
                      <span className="drop-title">यहाँ क्लिक करके PDF फ़ाइल चुनें</span>
                      <span className="drop-hint">एनाटॉमी, फिजियोलॉजी, बायोकेमिस्ट्री आदि (Max 150 MB)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Author */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">पुस्तक का नाम (Title) *</label>
                  <input
                    type="text"
                    required
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    placeholder="उदा. BD Chaurasia Human Anatomy"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">लेखक (Author)</label>
                  <input
                    type="text"
                    value={bookAuthor}
                    onChange={(e) => setBookAuthor(e.target.value)}
                    placeholder="उदा. BD Chaurasia / Guyton"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="form-group">
                <label className="form-label">श्रेणी (Category) *</label>
                <select
                  value={bookCategory}
                  onChange={(e) => setBookCategory(e.target.value as StudyBook['category'])}
                  className="form-select"
                >
                  <option value="Human Anatomy">Human Anatomy (मानव शरीर रचना)</option>
                  <option value="Physiology">Physiology (शरीर क्रिया विज्ञान)</option>
                  <option value="Histology">Histology (ऊतक विज्ञान)</option>
                  <option value="Biochemistry">Biochemistry (जैव रसायन)</option>
                  <option value="Human Biology">Human Biology (मानव जीवविज्ञान)</option>
                </select>
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">संक्षिप्त विवरण या अध्ययन नोट्स (Description)</label>
                <textarea
                  value={bookDescription}
                  onChange={(e) => setBookDescription(e.target.value)}
                  placeholder="अध्ययन सामग्री, सेमेस्टर, या प्रमुख अध्यायों का विवरण..."
                  rows={2}
                  className="form-textarea"
                />
              </div>

              {/* Cover Color Swatches */}
              <div className="form-group">
                <label className="form-label">कवर का रंग (Cover Theme)</label>
                <div className="color-swatches">
                  {PRESET_COLORS.map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setCoverColor(color)}
                      className={`color-swatch-btn ${coverColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Privacy Notice */}
              <p className="modal-privacy-note">
                <Lock size={12} className="inline-icon" />
                यह पुस्तक केवल आपके ब्राउज़र के IndexedDB में स्थानीय रूप से सहेजी जाती है।
              </p>

              {/* Submit Buttons */}
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="btn-secondary"
                  disabled={isSubmitting}
                >
                  रद्द करें (Cancel)
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !uploadFile || !bookTitle.trim()}
                  className="btn-primary"
                >
                  {isSubmitting ? 'पुस्तक जोड़ी जा रही है...' : 'पुस्तकालय में जोड़ें (Save to Library)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
