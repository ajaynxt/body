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
  ChevronDown,
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
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const langTriggerRef = useRef<HTMLButtonElement>(null);
  const toolsTriggerRef = useRef<HTMLButtonElement>(null);

  // Close dropdowns on outside click or Escape, returning keyboard focus to the trigger.
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(e.target as Node)) {
        setIsToolsMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (isToolsMenuOpen) {
        setIsToolsMenuOpen(false);
        toolsTriggerRef.current?.focus();
      } else if (isLangMenuOpen) {
        setIsLangMenuOpen(false);
        langTriggerRef.current?.focus();
      }
    };
    if (isLangMenuOpen || isToolsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLangMenuOpen, isToolsMenuOpen]);

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
                  ? (isHindi ? 'HRA v1.10 · महिला संदर्भ मॉडल' : 'HRA v1.10 · Female reference model')
                  : (isHindi ? `${totalPartsCount.toLocaleString()} अंग · BodyParts3D` : `${totalPartsCount.toLocaleString()} Organs · BodyParts3D`)}
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
            title="महिला 3D संदर्भ मॉडल (Human Reference Atlas v1.10)"
          >
            <span className="gender-symbol">♀</span>
            <span className="gender-label">{isHindi ? 'महिला (Female)' : 'Female'}</span>
          </button>
        </div>
      </div>

      {/* Center Actions / Main Views */}
      <div className="header-center-modes">
        <button
          className={`mode-toggle-btn ${viewMode === 'book' ? 'active' : ''}`}
          onClick={() => onToggleViewMode('book')}
          title={isHindi ? 'सचित्र अध्ययन पुस्तक' : 'Book Study'}
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
        {onOpenStudentZoneModal && (
          <button
            className="mode-toggle-btn student-zone-nav-btn"
            onClick={onOpenStudentZoneModal}
            title={isHindi ? 'स्टूडेंट ज़ोन ⚡ (स्टेथोस्कोप, डिसेक्शन, निमोनिक्स)' : 'Student Zone ⚡'}
          >
            <Zap size={14} className="text-warning" />
            <span>{isHindi ? 'स्टूडेंट ज़ोन ⚡' : 'Student Zone ⚡'}</span>
          </button>
        )}
      </div>

      {/* Right Tools & Dropdowns */}
      <div className="header-right-tools">
        {/* Consolidated Medical Tools Dropdown */}
        <div className="tools-selector-wrap" ref={toolsMenuRef}>
          <button
            ref={toolsTriggerRef}
            className={`tool-btn tools-dropdown-btn ${isToolsMenuOpen ? 'active' : ''}`}
            onClick={() => {
              setIsLangMenuOpen(false);
              setIsToolsMenuOpen(open => !open);
            }}
            aria-expanded={isToolsMenuOpen}
            aria-controls="medical-tools-menu"
            aria-haspopup="true"
            title={isHindi ? 'चिकित्सीय टूल्स व जांच सूची' : 'Medical Tools & Tests'}
          >
            <Stethoscope size={14} className="text-accent" />
            <span className="tool-btn-label">{isHindi ? 'टूल्स' : 'Tools'}</span>
            <ChevronDown size={12} className={`tools-chevron ${isToolsMenuOpen ? 'open' : ''}`} />
          </button>

          {isToolsMenuOpen && (
            <div id="medical-tools-menu" className="tools-dropdown-menu glass-panel" role="region" aria-label={isHindi ? 'चिकित्सीय टूल्स' : 'Clinical and learning tools'}>
              <div className="tools-dropdown-header">
                <strong>{isHindi ? '🔬 चिकित्सीय टूल्स (Medical Tools)' : '🔬 Clinical & Learning Tools'}</strong>
              </div>
              <div className="tools-list-scroll">
                {onOpenDiagnosticsModal && (
                  <button
                    className="tool-menu-item"
                    onClick={() => {
                      onOpenDiagnosticsModal();
                      setIsToolsMenuOpen(false);
                    }}
                  >
                    <div className="tool-menu-icon-wrap icon-danger">
                      <HeartPulse size={16} />
                    </div>
                    <div className="tool-menu-text-col">
                      <span className="tool-menu-title">{isHindi ? 'जांच, X-Ray व ECG' : 'Diagnostics & Imaging'}</span>
                      <span className="tool-menu-desc">{isHindi ? 'हार्ट अटैक टेस्ट, MRI, CT स्कैन व एक्स-रे' : 'Cardiac biomarkers, MRI, CT & X-Ray'}</span>
                    </div>
                  </button>
                )}

                <button
                  className="tool-menu-item"
                  onClick={() => {
                    onOpenDiseaseModal();
                    setIsToolsMenuOpen(false);
                  }}
                >
                  <div className="tool-menu-icon-wrap icon-danger">
                    <Stethoscope size={16} />
                  </div>
                  <div className="tool-menu-text-col">
                    <span className="tool-menu-title">{isHindi ? 'रोग व निदान कोश' : 'Disease Encyclopedia'}</span>
                    <span className="tool-menu-desc">{isHindi ? '100+ बीमारियां, लक्षण व मानक इलाज' : '100+ clinical diseases & treatments'}</span>
                  </div>
                </button>

                <button
                  className="tool-menu-item"
                  onClick={() => {
                    onOpenQuizModal();
                    setIsToolsMenuOpen(false);
                  }}
                >
                  <div className="tool-menu-icon-wrap icon-warning">
                    <Brain size={16} />
                  </div>
                  <div className="tool-menu-text-col">
                    <span className="tool-menu-title">{isHindi ? 'अंग पहचान क्विज़' : 'Active Recall Quiz'}</span>
                    <span className="tool-menu-desc">{isHindi ? '3D इंटरएक्टिव परीक्षा अभ्यास' : '3D anatomical structure test'}</span>
                  </div>
                </button>

                <button
                  className="tool-menu-item"
                  onClick={() => {
                    onOpenCompareModal();
                    setIsToolsMenuOpen(false);
                  }}
                >
                  <div className="tool-menu-icon-wrap icon-info">
                    <GitCompare size={16} />
                  </div>
                  <div className="tool-menu-text-col">
                    <span className="tool-menu-title">{isHindi ? 'स्त्री-पुरुष रचना तुलना' : 'Sex Differences Comparison'}</span>
                    <span className="tool-menu-desc">{isHindi ? 'शारीरिक व हार्मोनल अंतर' : 'Anatomical & physiological differences'}</span>
                  </div>
                </button>

                <button
                  className="tool-menu-item"
                  onClick={() => {
                    onToggleViewMode('library');
                    setIsToolsMenuOpen(false);
                  }}
                >
                  <div className="tool-menu-icon-wrap icon-accent">
                    <Library size={16} />
                  </div>
                  <div className="tool-menu-text-col">
                    <span className="tool-menu-title">{isHindi ? 'ई-पुस्तकालय (PDFs)' : 'Medical PDF Library'}</span>
                    <span className="tool-menu-desc">{isHindi ? 'मानक संदर्भ पुस्तकें व पाठ्यसामग्री' : 'Classic textbooks & reference guides'}</span>
                  </div>
                </button>

                {onOpenStudyModesModal && (
                  <button
                    className="tool-menu-item"
                    onClick={() => {
                      onOpenStudyModesModal();
                      setIsToolsMenuOpen(false);
                    }}
                  >
                    <div className="tool-menu-icon-wrap icon-accent">
                      <Layers size={16} />
                    </div>
                    <div className="tool-menu-text-col">
                      <span className="tool-menu-title">{isHindi ? 'अध्ययन सूट' : 'Study Modes'}</span>
                      <span className="tool-menu-desc">{isHindi ? 'फ्लैशकार्ड्स, लेयर्स व शब्दावली' : 'Flashcards, layers & anatomical glossary'}</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 24-Language Selector Dropdown */}
        <div className="language-selector-wrap" ref={langMenuRef}>
          <button
            ref={langTriggerRef}
            className="tool-btn lang-toggle-btn"
            onClick={() => {
              setIsToolsMenuOpen(false);
              setIsLangMenuOpen(open => !open);
            }}
            aria-expanded={isLangMenuOpen}
            aria-controls="language-selection-menu"
            aria-haspopup="true"
            title="भाषा चुनें / Select Language (24 Languages)"
            aria-label="Language selection"
          >
            <Globe size={14} className="text-accent" />
            <span className="lang-code-tag">{meta.nativeName}</span>
          </button>

          {isLangMenuOpen && (
            <div id="language-selection-menu" className="language-dropdown-menu glass-panel" role="region" aria-label="Language selection">
              <div className="lang-dropdown-header">
                <strong>{isHindi ? 'भाषा चुनें (24 Languages)' : 'Select Language (24 Languages)'}</strong>
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

        {/* Theme Toggle (Clinical Green & White vs Surgical Night Mode) */}
        <button
          className="tool-btn icon-only theme-btn"
          onClick={onToggleTheme}
          aria-label="Toggle Dark / Light Theme"
          title={theme === 'dark' ? 'Clinical Green & White Mode' : 'Surgical Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Attribution & Info Modal */}
        <button
          className="tool-btn icon-only"
          onClick={onOpenAboutModal}
          aria-label="About and credits"
          title={isHindi ? 'स्रोत, डेटासेट लाइसेंस एवं श्रेय' : 'Sources, Dataset Licenses & Credits'}
        >
          <Info size={15} />
        </button>
      </div>
    </header>
  );
};
