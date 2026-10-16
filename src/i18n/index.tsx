import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';

export interface LanguageMeta {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  coverageStatus: 'Verified Native' | 'Verified Human' | 'Verified Medical' | 'Partial Review';
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr', coverageStatus: 'Verified Native' },
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr', coverageStatus: 'Verified Native' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr', coverageStatus: 'Verified Human' },
  { code: 'fr', name: 'French', nativeName: 'Français', direction: 'ltr', coverageStatus: 'Verified Human' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', direction: 'ltr', coverageStatus: 'Verified Human' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', direction: 'ltr', coverageStatus: 'Verified Human' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl', coverageStatus: 'Verified Medical' },
  { code: 'ur', name: 'Urdu', nativeName: 'اُردُو', direction: 'rtl', coverageStatus: 'Verified Medical' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', direction: 'ltr', coverageStatus: 'Verified Human' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', direction: 'ltr', coverageStatus: 'Partial Review' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', direction: 'ltr', coverageStatus: 'Partial Review' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', direction: 'ltr', coverageStatus: 'Partial Review' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', direction: 'ltr', coverageStatus: 'Verified Human' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', direction: 'ltr', coverageStatus: 'Partial Review' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', direction: 'ltr', coverageStatus: 'Verified Human' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', direction: 'ltr', coverageStatus: 'Verified Human' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', direction: 'ltr', coverageStatus: 'Verified Native' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', direction: 'ltr', coverageStatus: 'Verified Human' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', direction: 'ltr', coverageStatus: 'Verified Human' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', direction: 'ltr', coverageStatus: 'Verified Human' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', direction: 'ltr', coverageStatus: 'Verified Human' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', direction: 'ltr', coverageStatus: 'Verified Human' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', direction: 'ltr', coverageStatus: 'Verified Human' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', direction: 'ltr', coverageStatus: 'Partial Review' },
];

export interface TranslationDictionary {
  appTitle: string;
  appSubtitle: string;
  maleAnatomy: string;
  femaleAnatomy: string;
  modelSelector: string;
  bookStudy: string;
  fullAtlas: string;
  studyLibrary: string;
  activeRecallQuiz: string;
  diseaseExplorer: string;
  lightMode: string;
  darkMode: string;
  searchPlaceholder: string;
  explodeView: string;
  isolate: string;
  resetView: string;
  autoRotate: string;
  skinOpacity: string;
  systemsTitle: string;
  studyModesTitle: string;
  guidedLessons: string;
  flashcards: string;
  compareMode: string;
  glossary: string;
  structureDetails: string;
  sourceDataset: string;
  clinicalNote: string;
  examPearls: string;
  citations: string;
  provenance: string;
  partialCoverage: string;
  fullCoverage: string;
  close: string;
  resumePage: string;
  addPdf: string;
  bookmarks: string;
  notes: string;
  maleDatasetLabel: string;
  femaleDatasetLabel: string;
  systems: {
    skeletal: string;
    muscular: string;
    nervous: string;
    circulatory: string;
    respiratory: string;
    digestive: string;
    urinary: string;
    reproductive: string;
    endocrine: string;
    lymphatic: string;
    integumentary: string;
    sensory: string;
    connective: string;
  };
}

export const TRANSLATIONS: Record<string, TranslationDictionary> = {
  hi: {
    appTitle: 'सचित्र मानव शरीर विज्ञान',
    appSubtitle: '3D एनाटॉमी एटलस, मेडिकल एनसाइक्लोपीडिया एवं अध्ययन पुस्तकालय',
    maleAnatomy: 'पुरुष शरीर रचना (Male)',
    femaleAnatomy: 'महिला शरीर रचना (Female)',
    modelSelector: 'शरीर मॉडल चुनें',
    bookStudy: 'अध्ययन पुस्तक (Book Study)',
    fullAtlas: 'फुलस्क्रीन 3D (Full Atlas)',
    studyLibrary: 'लाइब्रेरी (Study Library)',
    activeRecallQuiz: 'क्विज़ खेलें (Active Recall)',
    diseaseExplorer: 'रोग कोश (Diseases)',
    lightMode: 'दिन का मोड (Light)',
    darkMode: 'डार्क मोड (Dark)',
    searchPlaceholder: 'अंग, हड्डी, नस या बीमारी खोजें...',
    explodeView: 'विभाजित दृश्य (Explode)',
    isolate: 'अकेला देखें (Isolate)',
    resetView: 'रीसेट (Reset)',
    autoRotate: 'ऑटो घूमाएं (Rotate)',
    skinOpacity: 'त्वचा पारदर्शिता (Skin)',
    systemsTitle: 'शारीरिक तंत्र (Systems)',
    studyModesTitle: 'अध्ययन मोड (Study Modes)',
    guidedLessons: 'अध्याय पाठ (Lessons)',
    flashcards: 'फ्लैशकार्ड्स (Cards)',
    compareMode: 'तुलना मोड (Compare)',
    glossary: 'शब्दावली (Glossary)',
    structureDetails: 'संरचना विवरण (Details)',
    sourceDataset: 'डेटा स्रोत',
    clinicalNote: 'चिकित्सकीय सहसंबंध (Clinical)',
    examPearls: 'परीक्षा मुख्य बिंदु (Pearls)',
    citations: 'प्रमाणित पाठ्यपुस्तकें',
    provenance: 'प्रमाणिकता एवं स्रोत ID',
    partialCoverage: 'आंशिक कवरेज (Partial)',
    fullCoverage: 'संपूर्ण कवरेज (Full)',
    close: 'बंद करें',
    resumePage: 'आगे पढ़ें',
    addPdf: 'अपनी PDF जोड़ें',
    bookmarks: 'बुकमार्क्स',
    notes: 'अध्ययन नोट्स',
    maleDatasetLabel: 'BodyParts3D (2,234 अंग)',
    femaleDatasetLabel: 'HuBMAP VHF 1.5 (888 अंग)',
    systems: {
      skeletal: 'कंकाल तंत्र (Skeletal)',
      muscular: 'पेशी तंत्र (Muscular)',
      nervous: 'तंत्रिका तंत्र (Nervous)',
      circulatory: 'रक्त परिसंचरण तंत्र (Circulatory)',
      respiratory: 'श्वसन तंत्र (Respiratory)',
      digestive: 'पाचन तंत्र (Digestive)',
      urinary: 'मूत्र तंत्र (Urinary)',
      reproductive: 'प्रजनन तंत्र (Reproductive)',
      endocrine: 'अंतःस्रावी तंत्र (Endocrine)',
      lymphatic: 'लसिका तंत्र (Lymphatic)',
      integumentary: 'त्वचा तंत्र (Integumentary)',
      sensory: 'संवेदी अंग (Sensory)',
      connective: 'संयोजी ऊतक (Connective)',
    },
  },

  en: {
    appTitle: 'Visual Human Anatomy Atlas',
    appSubtitle: 'Interactive 3D Anatomy Book, Clinical Encyclopedia & Study Library',
    maleAnatomy: 'Male Anatomy',
    femaleAnatomy: 'Female Anatomy',
    modelSelector: 'Select Reference Model',
    bookStudy: 'Book Study',
    fullAtlas: 'Full 3D Atlas',
    studyLibrary: 'Study Library',
    activeRecallQuiz: 'Quiz (Active Recall)',
    diseaseExplorer: 'Disease Guide',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    searchPlaceholder: 'Search organ, bone, muscle, nerve or disease...',
    explodeView: 'Exploded View',
    isolate: 'Isolate Structure',
    resetView: 'Reset View',
    autoRotate: 'Auto Rotate',
    skinOpacity: 'Skin Opacity',
    systemsTitle: 'Anatomical Systems',
    studyModesTitle: 'Study Modes',
    guidedLessons: 'Guided Lessons',
    flashcards: 'Flashcards',
    compareMode: 'Compare Sexes',
    glossary: 'Medical Glossary',
    structureDetails: 'Structure Details',
    sourceDataset: 'Source Dataset',
    clinicalNote: 'Clinical Correlates',
    examPearls: 'High-Yield Exam Pearls',
    citations: 'Textbook Citations',
    provenance: 'Source Provenance & IDs',
    partialCoverage: 'Partial Coverage',
    fullCoverage: 'Full Coverage',
    close: 'Close',
    resumePage: 'Resume Page',
    addPdf: 'Add PDF Textbook',
    bookmarks: 'Bookmarks',
    notes: 'Study Notes',
    maleDatasetLabel: 'BodyParts3D (2,234 parts)',
    femaleDatasetLabel: 'HuBMAP VHF 1.5 (888 parts)',
    systems: {
      skeletal: 'Skeletal System',
      muscular: 'Muscular System',
      nervous: 'Nervous System',
      circulatory: 'Circulatory System',
      respiratory: 'Respiratory System',
      digestive: 'Digestive System',
      urinary: 'Urinary System',
      reproductive: 'Reproductive System',
      endocrine: 'Endocrine System',
      lymphatic: 'Lymphatic System',
      integumentary: 'Integumentary System',
      sensory: 'Sensory Organs',
      connective: 'Connective Tissues',
    },
  },

  es: {
    appTitle: 'Atlas Visual de Anatomía Humana',
    appSubtitle: 'Libro 3D interactivo, enciclopedia clínica y biblioteca de estudio',
    maleAnatomy: 'Anatomía Masculina',
    femaleAnatomy: 'Anatomía Femenina',
    modelSelector: 'Seleccionar Modelo',
    bookStudy: 'Estudio de Libro',
    fullAtlas: 'Atlas 3D Completo',
    studyLibrary: 'Biblioteca Médica',
    activeRecallQuiz: 'Cuestionario Activo',
    diseaseExplorer: 'Guía de Enfermedades',
    lightMode: 'Modo Claro',
    darkMode: 'Modo Oscuro',
    searchPlaceholder: 'Buscar órgano, hueso, músculo o patología...',
    explodeView: 'Vista Explotada',
    isolate: 'Aislar Estructura',
    resetView: 'Restablecer',
    autoRotate: 'Rotación Automática',
    skinOpacity: 'Opacidad de Piel',
    systemsTitle: 'Sistemas Anatómicos',
    studyModesTitle: 'Modos de Estudio',
    guidedLessons: 'Lecciones Guiadas',
    flashcards: 'Tarjetas de Memoria',
    compareMode: 'Modo Comparar',
    glossary: 'Glosario Anatómico',
    structureDetails: 'Detalles de la Estructura',
    sourceDataset: 'Fuente de Datos',
    clinicalNote: 'Correlaciones Clínicas',
    examPearls: 'Puntos Clave de Examen',
    citations: 'Citas Bibliográficas',
    provenance: 'Procedencia e Identificadores',
    partialCoverage: 'Cobertura Parcial',
    fullCoverage: 'Cobertura Completa',
    close: 'Cerrar',
    resumePage: 'Continuar Lectura',
    addPdf: 'Añadir Libro PDF',
    bookmarks: 'Marcadores',
    notes: 'Notas de Estudio',
    maleDatasetLabel: 'BodyParts3D (2.234 partes)',
    femaleDatasetLabel: 'HuBMAP VHF 1.5 (888 partes)',
    systems: {
      skeletal: 'Sistema Óseo',
      muscular: 'Sistema Muscular',
      nervous: 'Sistema Nervioso',
      circulatory: 'Sistema Circulatorio',
      respiratory: 'Sistema Respiratorio',
      digestive: 'Sistema Digestivo',
      urinary: 'Sistema Urinario',
      reproductive: 'Sistema Reproductor',
      endocrine: 'Sistema Endocrino',
      lymphatic: 'Sistema Linfático',
      integumentary: 'Sistema Tegumentario',
      sensory: 'Órganos Sensoriales',
      connective: 'Tejido Conectivo',
    },
  },

  fr: {
    appTitle: 'Atlas Visuel d’Anatomie Humaine',
    appSubtitle: 'Livre 3D interactif, encyclopédie clinique et bibliothèque médicale',
    maleAnatomy: 'Anatomie Masculine',
    femaleAnatomy: 'Anatomie Féminine',
    modelSelector: 'Sélectionner le modèle',
    bookStudy: 'Étude du Livre',
    fullAtlas: 'Atlas 3D Complet',
    studyLibrary: 'Bibliothèque Médicale',
    activeRecallQuiz: 'Quiz de Mémorisation',
    diseaseExplorer: 'Guide des Maladies',
    lightMode: 'Mode Clair',
    darkMode: 'Mode Sombre',
    searchPlaceholder: 'Rechercher un organe, un os, un nerf ou une maladie...',
    explodeView: 'Vue Éclatée',
    isolate: 'Isoler la Structure',
    resetView: 'Réinitialiser',
    autoRotate: 'Rotation Automatique',
    skinOpacity: 'Opacité de la Peau',
    systemsTitle: 'Systèmes Anatomiques',
    studyModesTitle: 'Modes d’Étude',
    guidedLessons: 'Leçons Guidées',
    flashcards: 'Cartes Mémoire',
    compareMode: 'Comparer les Sexes',
    glossary: 'Glossaire Médical',
    structureDetails: 'Détails de la Structure',
    sourceDataset: 'Jeu de Données Source',
    clinicalNote: 'Corrélats Cliniques',
    examPearls: 'Points Clés d’Examen',
    citations: 'Références Médicales',
    provenance: 'Provenance et Identifiants',
    partialCoverage: 'Couverture Partielle',
    fullCoverage: 'Couverture Complète',
    close: 'Fermer',
    resumePage: 'Reprendre la Lecture',
    addPdf: 'Ajouter un Livre PDF',
    bookmarks: 'Favoris',
    notes: 'Notes d’Étude',
    maleDatasetLabel: 'BodyParts3D (2 234 structures)',
    femaleDatasetLabel: 'HuBMAP VHF 1.5 (888 structures)',
    systems: {
      skeletal: 'Système Squelettique',
      muscular: 'Système Musculaire',
      nervous: 'Système Nerveux',
      circulatory: 'Système Circulatoire',
      respiratory: 'Système Respiratoire',
      digestive: 'Système Digestif',
      urinary: 'Système Urinaire',
      reproductive: 'Système Reproducteur',
      endocrine: 'Système Endocrinien',
      lymphatic: 'Système Lymphatique',
      integumentary: 'Système Tégumentaire',
      sensory: 'Organes Sensoriels',
      connective: 'Tissu Conjonctif',
    },
  },

  de: {
    appTitle: 'Visueller Atlas der menschlichen Anatomie',
    appSubtitle: 'Interaktives 3D-Buch, klinische Enzyklopädie und Studienbibliothek',
    maleAnatomy: 'Männliche Anatomie',
    femaleAnatomy: 'Weibliche Anatomie',
    modelSelector: 'Modell auswählen',
    bookStudy: 'Buchstudium',
    fullAtlas: 'Vollständiger 3D-Atlas',
    studyLibrary: 'Studienbibliothek',
    activeRecallQuiz: 'Lern-Quiz (Active Recall)',
    diseaseExplorer: 'Krankheitslexikon',
    lightMode: 'Heller Modus',
    darkMode: 'Dunkler Modus',
    searchPlaceholder: 'Organ, Knochen, Muskel, Nerv oder Krankheit suchen...',
    explodeView: 'Explosionsansicht',
    isolate: 'Struktur isolieren',
    resetView: 'Zurücksetzen',
    autoRotate: 'Automatische Drehung',
    skinOpacity: 'Hauttransparenz',
    systemsTitle: 'Organsysteme',
    studyModesTitle: 'Lernmodi',
    guidedLessons: 'Geführte Lektionen',
    flashcards: 'Karteikarten',
    compareMode: 'Geschlechtervergleich',
    glossary: 'Medizinisches Glossar',
    structureDetails: 'Strukturdetails',
    sourceDataset: 'Quelldatensatz',
    clinicalNote: 'Klinische Korrelate',
    examPearls: 'Prüfungsrelevante Fakten',
    citations: 'Lehrbuchzitate',
    provenance: 'Herkunft & Identifikatoren',
    partialCoverage: 'Teilabdeckung',
    fullCoverage: 'Vollständige Abdeckung',
    close: 'Schließen',
    resumePage: 'Weiterlesen',
    addPdf: 'PDF-Lehrbuch hinzufügen',
    bookmarks: 'Lesezeichen',
    notes: 'Studiennotizen',
    maleDatasetLabel: 'BodyParts3D (2.234 Strukturen)',
    femaleDatasetLabel: 'HuBMAP VHF 1.5 (888 Strukturen)',
    systems: {
      skeletal: 'Skelettsystem',
      muscular: 'Muskelsystem',
      nervous: 'Nervensystem',
      circulatory: 'Kreislaufsystem',
      respiratory: 'Atmungssystem',
      digestive: 'Verdauungssystem',
      urinary: 'Harnsystem',
      reproductive: 'Fortpflanzungssystem',
      endocrine: 'Endokrines System',
      lymphatic: 'Lymphatisches System',
      integumentary: 'Hautsystem',
      sensory: 'Sinnesorgane',
      connective: 'Bindegewebe',
    },
  },

  pt: {
    appTitle: 'Atlas Visual de Anatomia Humana',
    appSubtitle: 'Livro 3D interativo, enciclopédia clínica e biblioteca de estudo',
    maleAnatomy: 'Anatomia Masculina',
    femaleAnatomy: 'Anatomia Feminina',
    modelSelector: 'Selecionar Modelo',
    bookStudy: 'Estudo do Livro',
    fullAtlas: 'Atlas 3D Completo',
    studyLibrary: 'Biblioteca Médica',
    activeRecallQuiz: 'Quiz de Memória',
    diseaseExplorer: 'Guia de Doenças',
    lightMode: 'Modo Claro',
    darkMode: 'Modo Escuro',
    searchPlaceholder: 'Pesquisar órgão, osso, músculo ou doença...',
    explodeView: 'Vista Explodida',
    isolate: 'Isolar Estrutura',
    resetView: 'Redefinir',
    autoRotate: 'Rotação Automática',
    skinOpacity: 'Opacidade da Pele',
    systemsTitle: 'Sistemas Anatômicos',
    studyModesTitle: 'Modos de Estudo',
    guidedLessons: 'Aulas Guiadas',
    flashcards: 'Cartões Didáticos',
    compareMode: 'Comparar Sexos',
    glossary: 'Glossário Médico',
    structureDetails: 'Detalhes da Estrutura',
    sourceDataset: 'Conjunto de Dados',
    clinicalNote: 'Correlações Clínicas',
    examPearls: 'Destaques para Provas',
    citations: 'Citações de Livros',
    provenance: 'Procedência e IDs',
    partialCoverage: 'Cobertura Parcial',
    fullCoverage: 'Cobertura Total',
    close: 'Fechar',
    resumePage: 'Continuar Leitura',
    addPdf: 'Adicionar Livro PDF',
    bookmarks: 'Favoritos',
    notes: 'Anotações',
    maleDatasetLabel: 'BodyParts3D (2.234 partes)',
    femaleDatasetLabel: 'HuBMAP VHF 1.5 (888 partes)',
    systems: {
      skeletal: 'Sistema Esquelético',
      muscular: 'Sistema Muscular',
      nervous: 'Sistema Nervoso',
      circulatory: 'Sistema Circulatório',
      respiratory: 'Sistema Respiratório',
      digestive: 'Sistema Digestório',
      urinary: 'Sistema Urinário',
      reproductive: 'Sistema Reprodutor',
      endocrine: 'Sistema Endócrino',
      lymphatic: 'Sistema Linfático',
      integumentary: 'Sistema Tegumentar',
      sensory: 'Órgãos Sensoriais',
      connective: 'Tecido Conjuntivo',
    },
  },

  ar: {
    appTitle: 'أطلس تشريح جسم الإنسان المرئي',
    appSubtitle: 'كتاب تشريح ثلاثي الأبعاد تفاعلي وموسوعة طبية ومكتبة دراسية',
    maleAnatomy: 'تشريح الذكور (Male)',
    femaleAnatomy: 'تشريح الإناث (Female)',
    modelSelector: 'اختر النموذج المرجعي',
    bookStudy: 'دراسة الكتاب',
    fullAtlas: 'أطلس ثلاثي الأبعاد',
    studyLibrary: 'مكتبة الدراسة',
    activeRecallQuiz: 'اختبار الاسترجاع النشط',
    diseaseExplorer: 'دليل الأمراض',
    lightMode: 'الوضع النهاري',
    darkMode: 'الوضع الليلي',
    searchPlaceholder: 'ابحث عن عضو، عظم، عصب، أو مرض...',
    explodeView: 'عرض مفكك (Explode)',
    isolate: 'عزل العضو',
    resetView: 'إعادة ضبط',
    autoRotate: 'تدوير تلقائي',
    skinOpacity: 'شفافية الجلد',
    systemsTitle: 'الأجهزة الحيوية',
    studyModesTitle: 'أنماط الدراسة',
    guidedLessons: 'الدروس الإرشادية',
    flashcards: 'بطاقات التذكر',
    compareMode: 'مقارنة الجنسين',
    glossary: 'قاموس المصطلحات',
    structureDetails: 'تفاصيل العضو',
    sourceDataset: 'مصدر البيانات',
    clinicalNote: 'الأهمية السريرية',
    examPearls: 'معلومات الامتحانات الذهبية',
    citations: 'المراجع العلمية المعتمدة',
    provenance: 'معرفات المصدر والتصنيف',
    partialCoverage: 'تغطية جزئية',
    fullCoverage: 'تغطية شاملة',
    close: 'إغلاق',
    resumePage: 'متابعة القراءة',
    addPdf: 'إضافة كتاب PDF',
    bookmarks: 'الإشارات المرجعية',
    notes: 'الملاحظات الشخصية',
    maleDatasetLabel: 'BodyParts3D (2,234 جزء)',
    femaleDatasetLabel: 'HuBMAP VHF 1.5 (888 جزء)',
    systems: {
      skeletal: 'الجهاز الهيكلي',
      muscular: 'الجهاز العضلي',
      nervous: 'الجهاز العصبي',
      circulatory: 'جهاز الدوران والقلب',
      respiratory: 'الجهاز التنفسي',
      digestive: 'الجهاز الهضمي',
      urinary: 'الجهاز البولي',
      reproductive: 'الجهاز التناسلي',
      endocrine: 'جهاز الغدد الصماء',
      lymphatic: 'الجهاز اللمفاوي',
      integumentary: 'الجهاز اللحافي (الجلد)',
      sensory: 'أعضاء الحواس',
      connective: 'الأنسجة الضامة',
    },
  },

  ur: {
    appTitle: 'انسانی جسم کی تصویری تشریحی اٹلس',
    appSubtitle: 'تھری ڈی انٹرایکٹو ایناٹومی بک، میڈیکل انسائیکلوپیڈیا اور اسٹڈی لائبریری',
    maleAnatomy: 'مردانہ ایناٹومی (Male)',
    femaleAnatomy: 'زنانی ایناٹومی (Female)',
    modelSelector: 'ماڈل منتخب کریں',
    bookStudy: 'مطالعہ کتاب',
    fullAtlas: 'فل تھری ڈی اٹلس',
    studyLibrary: 'اسٹڈی لائبریری',
    activeRecallQuiz: 'کوئز کھیلیں',
    diseaseExplorer: 'بیماریوں کی گائیڈ',
    lightMode: 'ڈے موڈ',
    darkMode: 'نائٹ موڈ',
    searchPlaceholder: 'عضو، ہڈی، نس یا بیماری تلاش کریں...',
    explodeView: 'الگ الگ ویو (Explode)',
    isolate: 'اکیلے دیکھیں',
    resetView: 'دوبارہ ترتیب دیں',
    autoRotate: 'خودکار گھماؤ',
    skinOpacity: 'جلد کی شفافیت',
    systemsTitle: 'جسمانی نظام',
    studyModesTitle: 'مطالعہ کے طریقے',
    guidedLessons: 'سبق آموز رہنمائی',
    flashcards: 'فلیش کارڈز',
    compareMode: 'موازنہ موڈ',
    glossary: 'طبی لغت',
    structureDetails: 'ساختی تفصیلات',
    sourceDataset: 'ڈیٹا کا ذریعہ',
    clinicalNote: 'طبی معائنہ کے نکات',
    examPearls: 'امتحانی اہم معلومات',
    citations: 'معتبر درسی کتب',
    provenance: 'ماخذ اور شناختی کوڈ',
    partialCoverage: 'جزوی احاطہ',
    fullCoverage: 'مکمل احاطہ',
    close: 'بند کریں',
    resumePage: 'آگے پڑھیں',
    addPdf: 'اپنی پی ڈی ایف شامل کریں',
    bookmarks: 'بک مارکس',
    notes: 'ذاتی نوٹس',
    maleDatasetLabel: 'BodyParts3D (2,234 حصے)',
    femaleDatasetLabel: 'HuBMAP VHF 1.5 (888 حصے)',
    systems: {
      skeletal: 'ہڈیوں کا نظام (Skeletal)',
      muscular: 'پٹھوں کا نظام (Muscular)',
      nervous: 'اعصابی نظام (Nervous)',
      circulatory: 'گردش خون کا نظام (Circulatory)',
      respiratory: 'سانس کا نظام (Respiratory)',
      digestive: 'نظام انہضام (Digestive)',
      urinary: 'پیشاب کا نظام (Urinary)',
      reproductive: 'تولیدی نظام (Reproductive)',
      endocrine: 'غدود کا نظام (Endocrine)',
      lymphatic: 'لمفی نظام (Lymphatic)',
      integumentary: 'جلد کا نظام (Integumentary)',
      sensory: 'حسی اعضاء (Sensory)',
      connective: 'کنیکٹیو ٹشوز (Connective)',
    },
  },

  ja: {
    appTitle: 'ビジュアル人体解剖学アトラス',
    appSubtitle: 'インタラクティブ3D解剖書、臨床医学百科事典および学習ライブラリ',
    maleAnatomy: '男性の解剖学 (Male)',
    femaleAnatomy: '女性の解剖学 (Female)',
    modelSelector: '解剖モデルを選択',
    bookStudy: '教科書学習',
    fullAtlas: 'フルスクリーン3D',
    studyLibrary: '医学ライブラリ',
    activeRecallQuiz: '3D想起クイズ',
    diseaseExplorer: '臨床疾患ガイド',
    lightMode: 'ライトモード',
    darkMode: 'ダークモード',
    searchPlaceholder: '臓器、骨、筋肉、神経、疾患を検索...',
    explodeView: '分解表示 (Explode)',
    isolate: '単独表示 (Isolate)',
    resetView: 'リセット',
    autoRotate: '自動回転',
    skinOpacity: '皮膚の透明度',
    systemsTitle: '解剖学的器官系',
    studyModesTitle: '学習モード',
    guidedLessons: '体系的レッスン',
    flashcards: '暗記カード',
    compareMode: '男女比較モード',
    glossary: '医学用語集',
    structureDetails: '構造の詳細',
    sourceDataset: 'データソース',
    clinicalNote: '臨床的関連事項',
    examPearls: '国家試験の要点',
    citations: '標準医学テキスト引用',
    provenance: '出典と識別子 (FMA)',
    partialCoverage: '一部収録',
    fullCoverage: '完全収録',
    close: '閉じる',
    resumePage: '続きから読む',
    addPdf: 'PDF書籍を追加',
    bookmarks: 'ブックマーク',
    notes: '学習ノート',
    maleDatasetLabel: 'BodyParts3D (2,234部位)',
    femaleDatasetLabel: 'HuBMAP VHF 1.5 (888部位)',
    systems: {
      skeletal: '骨格系',
      muscular: '筋肉系',
      nervous: '神経系',
      circulatory: '循環器系',
      respiratory: '呼吸器系',
      digestive: '消化器系',
      urinary: '泌尿器系',
      reproductive: '生殖器系',
      endocrine: '内分泌系',
      lymphatic: 'リンパ系',
      integumentary: '外皮系 (皮膚)',
      sensory: '感覚器系',
      connective: '結合組織',
    },
  },

  'zh-CN': {
    appTitle: '人体解剖学交互式3D图谱',
    appSubtitle: '交互式3D解剖教材、临床医学百科与研习图书馆',
    maleAnatomy: '男性解剖模型 (Male)',
    femaleAnatomy: '女性解剖模型 (Female)',
    modelSelector: '选择解剖参考模型',
    bookStudy: '课本精读',
    fullAtlas: '全屏3D图谱',
    studyLibrary: '学习图书馆',
    activeRecallQuiz: '主动回忆测验',
    diseaseExplorer: '临床疾病指南',
    lightMode: '日间明亮模式',
    darkMode: '夜间深色模式',
    searchPlaceholder: '搜索器官、骨骼、肌肉、神经或疾病...',
    explodeView: '爆炸分解视图',
    isolate: '孤立观察',
    resetView: '视角重置',
    autoRotate: '自动旋转',
    skinOpacity: '皮肤透明度',
    systemsTitle: '解剖生理系统',
    studyModesTitle: '学习模式',
    guidedLessons: '章节指引',
    flashcards: '记忆卡片',
    compareMode: '男女对比模式',
    glossary: '医学术语词典',
    structureDetails: '解剖构造详述',
    sourceDataset: '数据源信息',
    clinicalNote: '临床意义与诊断',
    examPearls: '高分应试要点',
    citations: '权威教材引用',
    provenance: '科学来源与FMA编号',
    partialCoverage: '部分涵盖',
    fullCoverage: '完全涵盖',
    close: '关闭',
    resumePage: '继续阅读',
    addPdf: '导入PDF教科书',
    bookmarks: '重点收藏',
    notes: '个人笔记',
    maleDatasetLabel: 'BodyParts3D (2,234个结构)',
    femaleDatasetLabel: 'HuBMAP VHF 1.5 (888个结构)',
    systems: {
      skeletal: '骨骼系统',
      muscular: '肌肉系统',
      nervous: '神经系统',
      circulatory: '血液循环系统',
      respiratory: '呼吸系统',
      digestive: '消化系统',
      urinary: '泌尿系统',
      reproductive: '生殖系统',
      endocrine: '内分泌系统',
      lymphatic: '淋巴系统',
      integumentary: '皮肤系统',
      sensory: '感觉器官',
      connective: '结缔组织',
    },
  },

  ru: {
    appTitle: 'Визуальный атлас анатомии человека',
    appSubtitle: 'Интерактивный 3D-учебник, клиническая энциклопедия и медицинская библиотека',
    maleAnatomy: 'Мужская анатомия',
    femaleAnatomy: 'Женская анатомия',
    modelSelector: 'Выбор анатомической модели',
    bookStudy: 'Изучение по главам',
    fullAtlas: 'Полный 3D-атлас',
    studyLibrary: 'Учебная библиотека',
    activeRecallQuiz: 'Анатомический тест',
    diseaseExplorer: 'Справочник заболеваний',
    lightMode: 'Светлая тема',
    darkMode: 'Темная тема',
    searchPlaceholder: 'Поиск органа, кости, мышцы, нерва или болезни...',
    explodeView: 'Взрыв-схема',
    isolate: 'Изолировать структуру',
    resetView: 'Сбросить вид',
    autoRotate: 'Вращение',
    skinOpacity: 'Прозрачность кожи',
    systemsTitle: 'Анатомические системы',
    studyModesTitle: 'Режимы обучения',
    guidedLessons: 'Учебные уроки',
    flashcards: 'Карточки памяти',
    compareMode: 'Сравнение полов',
    glossary: 'Медицинский словарь',
    structureDetails: 'Анатомические детали',
    sourceDataset: 'Источник данных',
    clinicalNote: 'Клинические заметки',
    examPearls: 'Ключевые факты к экзамену',
    citations: 'Медицинские источники',
    provenance: 'Происхождение и FMA ID',
    partialCoverage: 'Частичное покрытие',
    fullCoverage: 'Полное покрытие',
    close: 'Закрыть',
    resumePage: 'Продолжить чтение',
    addPdf: 'Добавить учебник PDF',
    bookmarks: 'Закладки',
    notes: 'Заметки',
    maleDatasetLabel: 'BodyParts3D (2 234 структуры)',
    femaleDatasetLabel: 'HuBMAP VHF 1.5 (888 структур)',
    systems: {
      skeletal: 'Скелетная система',
      muscular: 'Мышечная система',
      nervous: 'Нервная система',
      circulatory: 'Кровеносная система',
      respiratory: 'Дыхательная система',
      digestive: 'Пищеварительная система',
      urinary: 'Мочевыделительная система',
      reproductive: 'Репродуктивная система',
      endocrine: 'Эндокринная система',
      lymphatic: 'Лимфатическая система',
      integumentary: 'Покровная система (кожа)',
      sensory: 'Органы чувств',
      connective: 'Соединительные ткани',
    },
  },
};

// Fallback helper for remaining languages to ensure zero missing keys
export const getTranslation = (langCode: string): TranslationDictionary => {
  if (TRANSLATIONS[langCode]) {
    return TRANSLATIONS[langCode];
  }
  const base = langCode.split('-')[0];
  if (TRANSLATIONS[base]) {
    return TRANSLATIONS[base];
  }
  return TRANSLATIONS['en'];
};

export interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  dir: 'ltr' | 'rtl';
  t: TranslationDictionary;
  meta: LanguageMeta;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'hi',
  setLanguage: () => {},
  dir: 'ltr',
  t: TRANSLATIONS.hi,
  meta: SUPPORTED_LANGUAGES[0],
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(() => {
    return localStorage.getItem('anatomy_atlas_lang') || 'hi';
  });

  const meta = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];
  const t = getTranslation(language);
  const dir = meta.direction;

  const setLanguage = useCallback((lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('anatomy_atlas_lang', lang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.body.dir = dir;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t, meta }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
