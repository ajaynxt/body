import React from 'react';
import { BookOpen, Box, Stethoscope, Info, Sparkles, Brain, Moon, Sun, Library } from 'lucide-react';

interface HeaderProps {
  viewMode: 'book' | 'explorer' | 'library' | 'reader';
  onToggleViewMode: (mode: 'book' | 'explorer' | 'library') => void;
  onOpenDiseaseModal: () => void;
  onOpenAboutModal: () => void;
  onOpenQuizModal: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  currentChapterTitle?: string;
  totalPartsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onToggleViewMode,
  onOpenDiseaseModal,
  onOpenAboutModal,
  onOpenQuizModal,
  theme,
  onToggleTheme,
  currentChapterTitle,
  totalPartsCount = 2234,
}) => {
  return (
    <header className="app-header glass-panel">
      {/* Brand Identity */}
      <div className="header-brand">
        <div className="brand-logo-badge">
          <Sparkles size={17} className="logo-sparkle" />
          <span className="live-status-dot" />
        </div>
        <div>
          <div className="brand-title-wrap">
            <h1 className="brand-title">सचित्र मानव शरीर विज्ञान</h1>
            <span className="edition-badge">3D Atlas & Book</span>
          </div>
          <p className="brand-meta">
            {currentChapterTitle ? (
              <span className="active-chapter-text">{currentChapterTitle}</span>
            ) : (
              <span>{totalPartsCount.toLocaleString()} अंग · 15 संपूर्ण शारीरिक तंत्र · BodyParts3D</span>
            )}
          </p>
        </div>
      </div>

      {/* Center Actions / Mode Toggle */}
      <div className="header-center-modes">
        <button
          className={`mode-toggle-btn ${viewMode === 'book' ? 'active' : ''}`}
          onClick={() => onToggleViewMode('book')}
          title="किताब और 3D मॉडल को साथ-साथ देखें"
        >
          <BookOpen size={16} />
          <span>अध्ययन पुस्तक (Book Study)</span>
        </button>
        <button
          className={`mode-toggle-btn ${viewMode === 'explorer' ? 'active' : ''}`}
          onClick={() => onToggleViewMode('explorer')}
          title="फुलस्क्रीन 3D एनाटॉमी मॉडल एक्सप्लोर करें"
        >
          <Box size={16} />
          <span>फुलस्क्रीन 3D (Full Atlas)</span>
        </button>
        <button
          className={`mode-toggle-btn ${viewMode === 'library' ? 'active' : ''}`}
          onClick={() => onToggleViewMode('library')}
          title="मानव शरीर अध्ययन पुस्तकालय खोलें (PDF Textbooks & Notes)"
        >
          <Library size={16} />
          <span>लाइब्रेरी (Study Library)</span>
        </button>
      </div>

      {/* Right Tools */}
      <div className="header-right-tools">
        {/* Active Recall Quiz Button */}
        <button
          className="tool-btn quiz-btn pulse-glow"
          onClick={onOpenQuizModal}
          title="3D अंग पहचानो क्विज़ खेलें"
        >
          <Brain size={16} className="text-warning" />
          <span>क्विज़ खेलें (Active Recall)</span>
        </button>

        {/* Disease Encyclopedia Button */}
        <button
          className="tool-btn disease-btn"
          onClick={onOpenDiseaseModal}
          title="सभी बीमारियों और उनके लक्षणों की सूची खोलें"
        >
          <Stethoscope size={16} className="text-danger" />
          <span>रोग कोश (Diseases)</span>
        </button>

        {/* Theme Toggle (Dark Cyber-Anatomy vs Clean Light Mode) */}
        <button
          className="tool-btn icon-only theme-btn"
          onClick={onToggleTheme}
          aria-label="Toggle Dark / Light Theme"
          title={theme === 'dark' ? 'दिन का अध्ययन मोड (Light Mode)' : 'डार्क मोड (Dark Mode)'}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Attribution & Info Modal */}
        <button
          className="tool-btn icon-only"
          onClick={onOpenAboutModal}
          aria-label="About and credits"
          title="स्रोत, लाइसेंस एवं डेटा विवरण"
        >
          <Info size={17} />
        </button>
      </div>
    </header>
  );
};
