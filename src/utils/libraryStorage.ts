export interface StudyBook {
  id: string;
  title: string;
  author: string;
  category: 'Human Anatomy' | 'Physiology' | 'Histology' | 'Biochemistry' | 'Human Biology';
  totalPages: number;
  lastReadPage: number;
  lastReadAt: number;
  coverColor: string;
  coverImage?: string;
  description: string;
  fileSizeFormatted?: string;
  isStarter?: boolean;
}

export interface BookBookmark {
  id: string;
  bookId: string;
  pageNumber: number;
  title: string;
  createdAt: number;
}

export interface BookNote {
  id: string;
  bookId: string;
  pageNumber: number;
  content: string;
  createdAt: number;
  updatedAt: number;
}

const DB_NAME = 'HumanBodyStudyLibraryDB';
const DB_VERSION = 2;

let dbPromise: Promise<IDBDatabase> | null = null;

export const initLibraryDB = (): Promise<IDBDatabase> => {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    let request: IDBOpenDBRequest;
    try {
      request = indexedDB.open(DB_NAME, DB_VERSION);
    } catch (error) {
      dbPromise = null;
      reject(error);
      return;
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains('books')) {
        const bookStore = db.createObjectStore('books', { keyPath: 'id' });
        bookStore.createIndex('category', 'category', { unique: false });
        bookStore.createIndex('lastReadAt', 'lastReadAt', { unique: false });
      }

      if (!db.objectStoreNames.contains('pdf_blobs')) {
        db.createObjectStore('pdf_blobs', { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains('bookmarks')) {
        const bmStore = db.createObjectStore('bookmarks', { keyPath: 'id' });
        bmStore.createIndex('bookId', 'bookId', { unique: false });
      }

      if (!db.objectStoreNames.contains('notes')) {
        const noteStore = db.createObjectStore('notes', { keyPath: 'id' });
        noteStore.createIndex('bookId', 'bookId', { unique: false });
      }

      // Track one-time starter-book seeding so upgrades preserve user deletions and uploads.
      if (!db.objectStoreNames.contains('meta')) {
        db.createObjectStore('meta', { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      dbPromise = null;
      reject(request.error || new Error('Unable to open the study library database.'));
    };
  });

  return dbPromise;
};

// --- Books Operations ---

export const getAllBooks = async (): Promise<StudyBook[]> => {
  const db = await initLibraryDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('books', 'readonly');
    const store = tx.objectStore('books');
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
};

export const getBook = async (id: string): Promise<StudyBook | null> => {
  const db = await initLibraryDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('books', 'readonly');
    const store = tx.objectStore('books');
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
};

export const saveBook = async (book: StudyBook, blob?: Blob | File): Promise<void> => {
  const db = await initLibraryDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(blob ? ['books', 'pdf_blobs'] : ['books'], 'readwrite');
    const bookStore = tx.objectStore('books');
    bookStore.put(book);

    if (blob) {
      const blobStore = tx.objectStore('pdf_blobs');
      blobStore.put({ id: book.id, blob, mimeType: blob.type || 'application/pdf' });
    }

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

export const getBookBlob = async (id: string): Promise<Blob | null> => {
  const db = await initLibraryDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pdf_blobs', 'readonly');
    const store = tx.objectStore('pdf_blobs');
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result ? req.result.blob : null);
    req.onerror = () => reject(req.error);
  });
};

export const updateBookProgress = async (id: string, pageNumber: number): Promise<void> => {
  const db = await initLibraryDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('books', 'readwrite');
    const store = tx.objectStore('books');
    const getReq = store.get(id);

    getReq.onsuccess = () => {
      const book = getReq.result as StudyBook;
      if (book) {
        book.lastReadPage = Math.max(1, Math.min(pageNumber, book.totalPages || 9999));
        book.lastReadAt = Date.now();
        store.put(book);
      }
      resolve();
    };
    getReq.onerror = () => reject(getReq.error);
  });
};

export const deleteBook = async (id: string): Promise<void> => {
  const db = await initLibraryDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(['books', 'pdf_blobs', 'bookmarks', 'notes'], 'readwrite');
    tx.objectStore('books').delete(id);
    tx.objectStore('pdf_blobs').delete(id);

    // Clean up bookmarks for this book
    const bmStore = tx.objectStore('bookmarks');
    const bmIndex = bmStore.index('bookId');
    const bmReq = bmIndex.getAllKeys(id);
    bmReq.onsuccess = () => {
      bmReq.result.forEach((key) => bmStore.delete(key));
    };

    // Clean up notes for this book
    const noteStore = tx.objectStore('notes');
    const noteIndex = noteStore.index('bookId');
    const noteReq = noteIndex.getAllKeys(id);
    noteReq.onsuccess = () => {
      noteReq.result.forEach((key) => noteStore.delete(key));
    };

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

// --- Bookmarks Operations ---

export const getBookmarks = async (bookId: string): Promise<BookBookmark[]> => {
  const db = await initLibraryDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('bookmarks', 'readonly');
    const index = tx.objectStore('bookmarks').index('bookId');
    const req = index.getAll(bookId);
    req.onsuccess = () => {
      const results = (req.result || []) as BookBookmark[];
      results.sort((a, b) => a.pageNumber - b.pageNumber);
      resolve(results);
    };
    req.onerror = () => reject(req.error);
  });
};

export const addBookmark = async (
  bookmark: Omit<BookBookmark, 'id' | 'createdAt'>
): Promise<BookBookmark> => {
  const db = await initLibraryDB();
  const newBookmark: BookBookmark = {
    ...bookmark,
    id: `bm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction('bookmarks', 'readwrite');
    const req = tx.objectStore('bookmarks').add(newBookmark);
    req.onsuccess = () => resolve(newBookmark);
    req.onerror = () => reject(req.error);
  });
};

export const deleteBookmark = async (id: string): Promise<void> => {
  const db = await initLibraryDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('bookmarks', 'readwrite');
    const req = tx.objectStore('bookmarks').delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
};

// --- Notes Operations ---

export const getNotes = async (bookId: string): Promise<BookNote[]> => {
  const db = await initLibraryDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('notes', 'readonly');
    const index = tx.objectStore('notes').index('bookId');
    const req = index.getAll(bookId);
    req.onsuccess = () => {
      const results = (req.result || []) as BookNote[];
      results.sort((a, b) => a.pageNumber - b.pageNumber);
      resolve(results);
    };
    req.onerror = () => reject(req.error);
  });
};

export const saveNote = async (
  note: Omit<BookNote, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
): Promise<BookNote> => {
  const db = await initLibraryDB();
  const now = Date.now();
  const noteToSave: BookNote = {
    id: note.id || `note_${now}_${Math.random().toString(36).substring(2, 7)}`,
    bookId: note.bookId,
    pageNumber: note.pageNumber,
    content: note.content,
    createdAt: now,
    updatedAt: now,
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction('notes', 'readwrite');
    const req = tx.objectStore('notes').put(noteToSave);
    req.onsuccess = () => resolve(noteToSave);
    req.onerror = () => reject(req.error);
  });
};

export const deleteNote = async (id: string): Promise<void> => {
  const db = await initLibraryDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('notes', 'readwrite');
    const req = tx.objectStore('notes').delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
};

// --- Starter Books Seeding ---

export const STARTER_BOOKS: StudyBook[] = [
  {
    id: 'starter_grays_clinical_anatomy',
    title: "Gray's Anatomy: Clinical & Surgical High-Yield Pearls",
    author: 'Henry Gray, Susan Standring et al.',
    category: 'Human Anatomy',
    totalPages: 32,
    lastReadPage: 1,
    lastReadAt: Date.now() - 3600000 * 2,
    coverColor: '#0ea5e9',
    description:
      'Essential regional and systemic anatomy high-yield exam takeaways: Brachial Plexus branches, Cranial Nerve exits, Coronary Artery supply zones, and Inguinal Canal anatomy.',
    fileSizeFormatted: '1.2 MB (Reference)',
    isStarter: true,
  },
  {
    id: 'starter_guyton_hall_physiology',
    title: 'Guyton & Hall: Medical Physiology Core Concepts',
    author: 'John E. Hall, Michael E. Hall',
    category: 'Physiology',
    totalPages: 28,
    lastReadPage: 1,
    lastReadAt: Date.now() - 3600000 * 5,
    coverColor: '#ef4444',
    description:
      'Cardiovascular dynamics, Cardiac output regulation, Wiggers Diagram, Nephron countercurrent mechanism, and Respiratory ventilation-perfusion matching.',
    fileSizeFormatted: '980 KB (Reference)',
    isStarter: true,
  },
  {
    id: 'starter_wheaters_histology',
    title: "Wheater's Functional Histology: Microscopic Anatomy",
    author: 'Barbara Young, Geraldine O’Dowd',
    category: 'Histology',
    totalPages: 24,
    lastReadPage: 1,
    lastReadAt: Date.now() - 3600000 * 12,
    coverColor: '#8b5cf6',
    description:
      'Cellular structures, epithelial classification, bone osteon organization, intercalated discs of cardiac muscle, and renal glomerulus filtration barrier.',
    fileSizeFormatted: '850 KB (Reference)',
    isStarter: true,
  },
  {
    id: 'starter_harpers_biochemistry',
    title: "Harper's Illustrated Biochemistry: Clinical Pathways",
    author: 'Victor W. Rodwell, David A. Bender',
    category: 'Biochemistry',
    totalPages: 20,
    lastReadPage: 1,
    lastReadAt: Date.now() - 3600000 * 24,
    coverColor: '#10b981',
    description:
      'Glycolysis, Krebs cycle energetics, Electron Transport Chain proton gradient, Urea cycle enzymopathies, and Michaelis-Menten kinetics.',
    fileSizeFormatted: '790 KB (Reference)',
    isStarter: true,
  },
  {
    id: 'starter_campbell_human_biology',
    title: 'Campbell Human Biology: Organ Systems & Integration',
    author: 'Jane B. Reece, Lisa A. Urry',
    category: 'Human Biology',
    totalPages: 26,
    lastReadPage: 1,
    lastReadAt: Date.now() - 3600000 * 48,
    coverColor: '#f59e0b',
    description:
      'Homeostasis negative feedback loops, Endocrine HPA axis, Innate and Adaptive immune defenses, and Neurotransmitter synaptic transmission.',
    fileSizeFormatted: '920 KB (Reference)',
    isStarter: true,
  },
];

export const ensureStarterBooksSeeded = async (): Promise<StudyBook[]> => {
  const db = await initLibraryDB();
  return new Promise<StudyBook[]>((resolve, reject) => {
    const tx = db.transaction(['books', 'meta'], 'readwrite');
    const booksStore = tx.objectStore('books');
    const metaStore = tx.objectStore('meta');
    let resultBooks: StudyBook[] = [];

    const markerRequest = metaStore.get('starter-books-v1');
    markerRequest.onsuccess = () => {
      const booksRequest = booksStore.getAll();
      booksRequest.onsuccess = () => {
        const existing = (booksRequest.result || []) as StudyBook[];
        resultBooks = existing;

        // Run once for both fresh installs and users upgrading from older library versions.
        if (markerRequest.result?.value !== true) {
          const existingIds = new Set(existing.map(book => book.id));
          const missingStarterBooks = STARTER_BOOKS.filter(book => !existingIds.has(book.id));
          missingStarterBooks.forEach(book => booksStore.put(book));
          metaStore.put({ key: 'starter-books-v1', value: true, updatedAt: Date.now() });
          resultBooks = [...existing, ...missingStarterBooks];
        }
      };
    };

    tx.oncomplete = () => resolve(resultBooks);
    tx.onerror = () => reject(tx.error || new Error('Unable to seed study reference books.'));
    tx.onabort = () => reject(tx.error || new Error('Study reference-book seeding was cancelled.'));
  });
};
