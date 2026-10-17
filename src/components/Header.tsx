import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Box,
  Stethoscope,
  Info,
  Brain,
  Moon,
  Sun,
  Library,
  Globe,
  GitCompare,
  Layers,
  HeartPulse,
  Zap,
} from 'lucide-react';
import { useTranslation, SUPPORTED_LANGUAGES } from '../i18n';

interface HeaderProps {
  viewMode: 'book' | 'explorer' | 'library' | 'reader';
  onToggleViewMode: (mode: 'book' | 'explorer' | 'library') => void;
  activeGender: 'male' | 'female';
  onChangeGender: (gender: 'male' | 'female') => void;
  onOpenDiseaseModal: () => void;
  onOpenAboutModal: () => void;
  onOpenQuizModal: () => void;
  onOpenCompareModal: () => void;
  onOpenStudyModesModal?: () => void;
  onOpenDiagnosticsModal?: () => void;
  onOpenStudentZoneModal?: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  currentChapterTitle?: string;
  totalPartsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onToggleViewMode,
  activeGender,
  onChangeGender,
  onOpenDiseaseModal,
  onOpenAboutModal,
  onOpenQuizModal,
  onOpenCompareModal,
  onOpenStudyModesModal,
  onOpenDiagnosticsModal,
  onOpenStudentZoneModal,
  theme,
  onToggleTheme,
  currentChapterTitle,
  totalPartsCount = 2234,
}) => {
  const { language, setLanguage, meta } = useTranslation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    if (isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangMenuOpen]);

  const isHindi = language === 'hi';

  return (
    <header className="app-header glass-panel">
      {/* Brand Identity */}
      <div className="header-brand">
        <div className="brand-logo-badge" title="AJAYNXT Official Logo">
          <img
            src="./ajaynxt-avatar.png"
            alt="AJAYNXT"
            className="brand-logo-img"
          />
          <span className="live-status-dot" />
        </div>
        <div className="brand-text-col">
          <div className="brand-title-wrap">
            <h1 className="brand-title">{isHindi ? 'सचित्र शरीर विज्ञान' : 'Human Anatomy Atlas'}</h1>
            <span className="edition-badge">3D Atlas</span>
            <span className="creator-header-pill" title="Lead Architect & Developer: Ajay Saini">by AJAYNXT</span>
          </div>
          <p className="brand-meta">
            {currentChapterTitle ? (
              <span className="active-chapter-text">{currentChapterTitle}</span>
            ) : (
              <span>
                {activeGender === 'female'
                  ? 'HuBMAP VHF 1.5 · 888 संरचनाएं'
                  : `${totalPartsCount.toLocaleString()} अंग · BodyParts3D`}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Dual Male / Female Reference Model Selector */}
      <div className="header-gender-selector-wrap">
        <div className="model-gender-selector glass-panel">
          <button
            className={`gender-btn ${activeGender === 'male' ? 'active' : ''}`}
            onClick={() => onChangeGender('male')}
            title="पुरुष 3D संदर्भ मॉडल (BodyParts3D, 2,234 अंग)"
          >
            <span className="gender-symbol">♂</span>
            <span className="gender-label">{isHindi ? 'पुरुष (Male)' : 'Male'}</span>
          </button>
          <button
            className={`gender-btn ${activeGender === 'female' ? 'active' : ''}`}
            onClick={() => onChangeGender('female')}
            title="महिला 3D संदर्भ मॉडल (HuBMAP VHF 1.5, 888 संरचनाएं)"
          >
            <span className="gender-symbol">♀</span>
            <span className="gender-label">{isHindi ? 'महिला (Female)' : 'Female'}</span>
          </button>
        </div>
      </div>

      {/* Center Actions / Mode Toggle */}
      <div className="header-center-modes">
        <button
          className={`mode-toggle-btn ${viewMode === 'book' ? 'active' : ''}`}
          onClick={() => onToggleViewMode('book')}
          title={isHindi ? 'अध्ययन पुस्तक' : 'Book Study'}
        >
          <BookOpen size={14} />
          <span>{isHindi ? 'पुस्तक' : 'Book'}</span>
        </button>
        <button
          className={`mode-toggle-btn ${viewMode === 'explorer' ? 'active' : ''}`}
          onClick={() => onToggleViewMode('explorer')}
          title={isHindi ? 'फुलस्क्रीन 3D एटलस' : 'Full 3D Atlas'}
        >
          <Box size={14} />
          <span>{isHindi ? '3D एटलस' : '3D Atlas'}</span>
        </button>
        <button
          className={`mode-toggle-btn ${viewMode === 'library' ? 'active' : ''}`}
          onClick={() => onToggleViewMode('library')}
          title={isHindi ? 'लाइब्रेरी (PDF पुस्तकें)' : 'Study Library'}
        >
          <Library size={14} />
          <span>{isHindi ? 'लाइब्रेरी' : 'Library'}</span>
        </button>
      </div>

      {/* Right Tools */}
      <div className="header-right-tools">
        {/* Study Suite Modes Modal Trigger */}
        {onOpenStudyModesModal && (
          <button
            className="tool-btn study-modes-btn"
            onClick={onOpenStudyModesModal}
            title={isHindi ? 'अध्ययन सूट (Flashcards, Layer Mode, Glossary)' : 'Study Modes'}
          >
            <Layers size={14} className="text-accent" />
            <span className="tool-btn-label">{isHindi ? 'अध्ययन मोड' : 'Modes'}</span>
          </button>
        )}

        {/* Compare Mode (Male vs Female) */}
        <button
          className="tool-btn compare-btn"
          onClick={onOpenCompareModal}
          title={isHindi ? 'पुरुष एवं महिला शरीर रचना तुलना' : 'Compare Sexes'}
        >
          <GitCompare size={14} className="text-info" />
          <span className="tool-btn-label">{isHindi ? 'तुलना' : 'Compare'}</span>
        </button>

        {/* Active Recall Quiz Button */}
        <button
          className="tool-btn quiz-btn pulse-glow"
          onClick={onOpenQuizModal}
          title={isHindi ? '3D अंग पहचानो क्विज़' : 'Active Recall Quiz'}
        >
          <Brain size={14} className="text-warning" />
          <span className="tool-btn-label">{isHindi ? 'क्विज़' : 'Quiz'}</span>
        </button>

        {/* Disease Encyclopedia Button */}
        <button
          className="tool-btn disease-btn"
          onClick={onOpenDiseaseModal}
          title={isHindi ? 'बीमारियों और लक्षणों की मार्गदर्शिका' : 'Disease Guide'}
        >
          <Stethoscope size={14} className="text-danger" />
          <span className="tool-btn-label">{isHindi ? 'रोग कोश' : 'Diseases'}</span>
        </button>

        {/* Medical Imaging & Cardiac Diagnostics Suite */}
        {onOpenDiagnosticsModal && (
          <button
            className="tool-btn diagnostics-btn pulse-glow"
            onClick={onOpenDiagnosticsModal}
            title={isHindi ? 'मेडिकल फोटोग्राफी, एक्स-रे, सीटी, एमआरआई व हार्ट अटैक जांच' : 'Medical Imaging & Heart Tests'}
          >
            <HeartPulse size={14} className="text-danger" />
            <span className="tool-btn-label">{isHindi ? 'जांच व X-Ray' : 'Diagnostics'}</span>
          </button>
        )}

        {/* Student Fun Zone (Stethoscope, Dissection, Mnemonics, Spotter) */}
        {onOpenStudentZoneModal && (
          <button
            className="tool-btn student-zone-btn pulse-glow"
            onClick={onOpenStudentZoneModal}
            title={isHindi ? 'स्टूडेंट ज़ोन ⚡ (स्टेथोस्कोप, कैडेवर डिसेक्शन, निमोनिक्स व 3D स्पॉटिंग)' : 'Student Fun Zone ⚡'}
          >
            <Zap size={14} className="text-warning" />
            <span className="tool-btn-label">{isHindi ? 'स्टूडेंट ज़ोन ⚡' : 'Student Zone ⚡'}</span>
          </button>
        )}

        {/* 24-Language Selector Dropdown */}
        <div className="language-selector-wrap" ref={langMenuRef}>
          <button
            className="tool-btn lang-toggle-btn"
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            title="भाषा चुनें / Select Language (24 Languages)"
            aria-label="Language selection"
          >
            <Globe size={14} className="text-accent" />
            <span className="lang-code-tag">{meta.nativeName}</span>
          </button>

          {isLangMenuOpen && (
            <div className="language-dropdown-menu glass-panel">
              <div className="lang-dropdown-header">
                <strong>भाषा चुनें (24 Languages)</strong>
                <span className="lang-count-badge">24</span>
              </div>
              <div className="lang-list-scroll">
                {SUPPORTED_LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    className={`lang-option-item ${language === lang.code ? 'selected' : ''}`}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                  >
                    <div className="lang-info-col">
                      <span className="lang-native-text">{lang.nativeName}</span>
                      <span className="lang-english-text">{lang.name}</span>
                    </div>
                    <span
                      className={`coverage-pill pill-${lang.coverageStatus
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                    >
                      {lang.coverageStatus}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle (Dark Cyber-Anatomy vs Clean Light Mode) */}
        <button
          className="tool-btn icon-only theme-btn"
          onClick={onToggleTheme}
          aria-label="Toggle Dark / Light Theme"
          title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Attribution & Info Modal */}
        <button
          className="tool-btn icon-only"
          onClick={onOpenAboutModal}
          aria-label="About and credits"
          title="स्रोत, डेटासेट लाइसेंस एवं श्रेय"
        >
          <Info size={15} />
        </button>
      </div>
    </header>
  );
};
