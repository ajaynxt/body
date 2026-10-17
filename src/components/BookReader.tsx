import React, { useState } from 'react';
import type { BookChapter, StudyPartItem, ClinicalDisease } from '../types/atlas';
import { BOOK_CHAPTERS } from '../data/chapters';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  AlertCircle,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  Search,
  Bookmark,
  Layers,
  Eye,
  Volume2,
  GraduationCap,
  BookMarked,
  Languages,
  Pill,
  Brain,
} from 'lucide-react';

interface BookReaderProps {
  chapters?: BookChapter[];
  activeGender?: 'male' | 'female';
  currentChapterIndex: number;
  currentPartIndex: number;
  selectedPart?: StudyPartItem | null;
  onSelectChapter: (index: number) => void;
  onSelectPart: (part: StudyPartItem) => void;
  onIsolatePart: (part: StudyPartItem) => void;
  onSelectDisease: (disease: ClinicalDisease) => void;
  isTourPlaying: boolean;
  onToggleTour: () => void;
  onOpenAudioPlayer?: () => void;
  onOpenAITutor?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const BookReader: React.FC<BookReaderProps> = ({
  chapters,
  activeGender,
  currentChapterIndex,
  currentPartIndex,
  selectedPart,
  onSelectChapter,
  onSelectPart,
  onIsolatePart,
  onSelectDisease,
  isTourPlaying,
  onToggleTour,
  onOpenAudioPlayer,
  onOpenAITutor,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const [activeTab, setActiveTab] = useState<'study' | 'diseases' | 'toc'>('study');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<'hinglish' | 'hindi' | 'english'>('english');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);

  const bookChapters = chapters && chapters.length > 0 ? chapters : BOOK_CHAPTERS;
  const chapter: BookChapter = bookChapters[currentChapterIndex] || bookChapters[0];
  const currentPart: StudyPartItem | undefined = selectedPart || chapter.parts[currentPartIndex];

  // Auto-switch to study tab if an organ was clicked in 3D
  React.useEffect(() => {
    if (selectedPart) {
      setActiveTab('study');
    }
  }, [selectedPart]);

  // Speech pronunciation helper
  const handleSpeak = (text: string, langCode: string = 'en-US') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handlePrevPart = () => {
    if (currentPartIndex > 0) {
      const prevPart = chapter.parts[currentPartIndex - 1];
      onSelectPart(prevPart);
    } else if (currentChapterIndex > 0) {
      const prevChapter = bookChapters[currentChapterIndex - 1];
      onSelectChapter(currentChapterIndex - 1);
      if (prevChapter.parts.length > 0) {
        onSelectPart(prevChapter.parts[prevChapter.parts.length - 1]);
      }
    }
  };

  const handleNextPart = () => {
    if (currentPartIndex < chapter.parts.length - 1) {
      const nextPart = chapter.parts[currentPartIndex + 1];
      onSelectPart(nextPart);
    } else if (currentChapterIndex < bookChapters.length - 1) {
      onSelectChapter(currentChapterIndex + 1);
      const nextChapter = bookChapters[currentChapterIndex + 1];
      if (nextChapter.parts.length > 0) {
        onSelectPart(nextChapter.parts[0]);
      }
    }
  };

  if (isCollapsed) {
    return (
      <aside
        className="book-reader-collapsed-spine glass-panel pointer-events-auto"
        onClick={onToggleCollapse}
        title={language === 'english' ? '📖 Open Textbook (Expand Reader)' : '📖 पाठ्यपुस्तक खोलें'}
      >
        <button className="spine-expand-btn" aria-label="Expand textbook">
          <ChevronRight size={18} />
        </button>
        <div className="spine-vertical-label">
          <BookOpen size={14} className="spine-icon text-accent" />
          <span>{language === 'english' ? chapter.title : chapter.hindiTitle}</span>
        </div>
      </aside>
    );
  }

  return (
    <aside className="book-reader-container glass-panel">
      {/* HEADER ROW 1: PRIMARY NAVIGATION TABS (Spacious, Clean, Zero Cramping) */}
      <nav className="book-tabs-nav-row" aria-label="Book sections">
        <button
          className={`book-nav-tab ${activeTab === 'study' ? 'active' : ''}`}
          onClick={() => setActiveTab('study')}
        >
          <BookOpen size={15} />
          <span>{language === 'english' ? 'Illustrated Study' : 'सचित्र अध्ययन'}</span>
        </button>

        <button
          className={`book-nav-tab ${activeTab === 'diseases' ? 'active' : ''}`}
          onClick={() => setActiveTab('diseases')}
        >
          <Stethoscope size={15} />
          <span>
            {language === 'english'
              ? `Pathologies (${chapter.commonDiseases.length})`
              : `रोग व निदान (${chapter.commonDiseases.length})`}
          </span>
        </button>

        <button
          className={`book-nav-tab ${activeTab === 'toc' ? 'active' : ''}`}
          onClick={() => setActiveTab('toc')}
        >
          <Layers size={15} />
          <span>{language === 'english' ? `Chapters (${bookChapters.length})` : `अध्याय (${bookChapters.length})`}</span>
        </button>
      </nav>

      {/* HEADER ROW 2: SECONDARY TOOLBAR (Languages, Gender Edition Pill & Collapse) */}
      <div className="book-sub-toolbar-row">
        <div className="book-lang-picker">
          <Languages size={13} className="lang-icon" />
          <button
            className={`lang-chip ${language === 'hinglish' ? 'active' : ''}`}
            onClick={() => setLanguage('hinglish')}
            title="NEET और मेडिकल छात्रों के लिए सरल भाषा"
          >
            Hinglish
          </button>
          <button
            className={`lang-chip ${language === 'hindi' ? 'active' : ''}`}
            onClick={() => setLanguage('hindi')}
            title="शुद्ध हिंदी चिकित्सा शब्दावली"
          >
            हिन्दी
          </button>
          <button
            className={`lang-chip ${language === 'english' ? 'active' : ''}`}
            onClick={() => setLanguage('english')}
            title="Standard English Medical Terminology"
          >
            English
          </button>
        </div>

        {activeGender && (
          <span className="reader-gender-pill" title="Active anatomical model">
            {activeGender === 'female' ? '👩 Female VHF' : '👨 Male 3D'}
          </span>
        )}

        {onToggleCollapse && (
          <button
            className="sidebar-collapse-btn"
            onClick={onToggleCollapse}
            title={language === 'english' ? 'Collapse reader to 3D' : 'पाठ्यपुस्तक समेटें (Fullscreen 3D)'}
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* TAB 1: VISUAL STUDY MODE */}
      {activeTab === 'study' && (
        <div className="book-content-scroll">
          {/* Chapter Banner & Overview Header */}
          <section className="chapter-banner-card glass-panel">
            <div className="chapter-banner-top">
              <div className="chapter-badge">
                <Bookmark size={13} />
                <span>{language === 'english' ? `Chapter ${chapter.chapterNumber}` : `अध्याय ${chapter.chapterNumber}`}</span>
              </div>

              <button
                className={`chapter-overview-toggle-btn ${isOverviewExpanded ? 'expanded' : ''}`}
                onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
                type="button"
                title={isOverviewExpanded ? 'Collapse Overview' : 'View System Overview & Textbooks'}
              >
                <BookMarked size={14} />
                <span>{isOverviewExpanded ? (language === 'english' ? 'Hide Overview' : 'परिचय समेटें') : (language === 'english' ? 'Chapter Overview' : 'अध्याय परिचय')}</span>
                {isOverviewExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            <h2 className="chapter-title">{language === 'english' ? chapter.title : chapter.hindiTitle}</h2>
            <p className="chapter-subtitle">{chapter.subtitle}</p>

            {/* Collapsible Chapter Overview (Does not push organ off screen unless expanded!) */}
            {isOverviewExpanded && (
              <div className="chapter-expanded-overview animate-fade-in">
                <div className="overview-prose-block">
                  <h4 className="overview-heading">
                    <Sparkles size={15} className="text-accent" />
                    <span>{language === 'english' ? 'System Overview & Physiology' : 'शारीरिक तंत्र का परिचय व कार्यप्रणाली'}</span>
                  </h4>
                  <p className="book-prose">
                    {language === 'english'
                      ? chapter.introductionEn || chapter.introductionHinglish
                      : language === 'hindi'
                      ? chapter.introductionHindi || chapter.introductionHinglish
                      : chapter.introductionHinglish}
                  </p>
                  <div className="divider-h" />
                  <p className="book-prose text-secondary-contrast">
                    {language === 'english'
                      ? chapter.howItWorksEn || chapter.howItWorksHinglish
                      : language === 'hindi'
                      ? chapter.howItWorksHindi || chapter.howItWorksHinglish
                      : chapter.howItWorksHinglish}
                  </p>
                </div>

                {chapter.recommendedBooks && chapter.recommendedBooks.length > 0 && (
                  <div className="standard-books-badge-row">
                    <span className="books-badge-label">
                      <BookMarked size={13} /> {language === 'english' ? 'Standard Medical Textbooks:' : 'प्रामाणिक संदर्भ ग्रंथ:'}
                    </span>
                    <div className="books-tags-wrap">
                      {chapter.recommendedBooks.map((book, bIdx) => (
                        <span key={bIdx} className="book-ref-pill">
                          {book}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Clean Dedicated Part Study Page */}
          {currentPart ? (
            <article className="part-study-card glass-panel highlight-border">
              {/* Part Header & Action Buttons */}
              <div className="part-study-header">
                <div className="part-title-meta-wrap">
                  <span className="part-step-badge">
                    {selectedPart && selectedPart.id !== chapter.parts[currentPartIndex]?.id ? (
                      <span className="active-3d-badge-text">
                        {language === 'english' ? '🎯 3D Selected Structure' : '🎯 3D में चयनित अंग'}
                      </span>
                    ) : (
                      language === 'english'
                        ? `Structure ${currentPartIndex + 1} of ${chapter.parts.length}`
                        : `भाग ${currentPartIndex + 1} / ${chapter.parts.length}`
                    )}
                  </span>

                  <div className="organ-title-row">
                    <h3 className="part-study-name">
                      {language === 'english' ? currentPart.name : currentPart.hindiName}
                    </h3>

                    <button
                      className={`pronounce-btn ${isSpeaking ? 'speaking' : ''}`}
                      onClick={() =>
                        handleSpeak(
                          language === 'english' ? currentPart.name : `${currentPart.hindiName}, ${currentPart.name}`,
                          language === 'english' ? 'en-US' : 'hi-IN'
                        )
                      }
                      title={language === 'english' ? 'Listen Pronunciation' : 'उच्चारण सुनें'}
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>

                  <div className="part-medical-id">
                    <span className="latin-name-tag">
                      {currentPart.latinName ? `🏛️ ${currentPart.latinName}` : currentPart.name}
                    </span>
                    <span className="dot-sep">·</span>
                    <code>{currentPart.id}</code>
                  </div>
                </div>

                <div className="header-action-buttons-group">
                  <button
                    className="isolate-btn-action"
                    onClick={() => onIsolatePart(currentPart)}
                    title={language === 'english' ? 'Isolate this structure in 3D' : '3D में अकेला देखें'}
                  >
                    <Eye size={14} />
                    <span>3D Focus</span>
                  </button>

                  {onOpenAudioPlayer && (
                    <button
                      className="assistant-btn-action"
                      onClick={onOpenAudioPlayer}
                      title={language === 'english' ? 'Listen with Voice Assistant' : 'ऑडियो सुनें'}
                    >
                      <Volume2 size={14} />
                      <span>{language === 'english' ? 'Audio' : 'ऑडियो'}</span>
                    </button>
                  )}

                  {onOpenAITutor && (
                    <button
                      className="tutor-btn-action"
                      onClick={onOpenAITutor}
                      title={language === 'english' ? '5-Step AI Clinical Tutor' : 'AI ट्यूटर'}
                    >
                      <Sparkles size={14} />
                      <span>AI Tutor</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Step Navigation Controls (Prev / Auto Tour / Next) */}
              <div className="part-nav-toolbar">
                <button
                  className="nav-step-btn"
                  onClick={handlePrevPart}
                  disabled={currentChapterIndex === 0 && currentPartIndex === 0}
                >
                  <ChevronLeft size={16} />
                  <span>{language === 'english' ? 'Previous' : 'पिछला'}</span>
                </button>

                <button
                  className={`tour-play-btn ${isTourPlaying ? 'playing' : ''}`}
                  onClick={onToggleTour}
                  title={language === 'english' ? 'Automated walkthrough' : 'ऑटो टूर'}
                >
                  {isTourPlaying ? <Pause size={15} /> : <Play size={15} />}
                  <span>{isTourPlaying ? (language === 'english' ? 'Pause Tour' : 'रोकें') : (language === 'english' ? 'Auto Tour' : 'ऑटो टूर')}</span>
                </button>

                <button
                  className="nav-step-btn"
                  onClick={handleNextPart}
                  disabled={
                    currentChapterIndex === bookChapters.length - 1 &&
                    currentPartIndex === chapter.parts.length - 1
                  }
                >
                  <span>{language === 'english' ? 'Next' : 'अगला'}</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* 1. Location & Function Cards (Crisp Separation) */}
              <div className="part-details-grid">
                <div className="detail-item location-item">
                  <span className="detail-label">
                    {language === 'english' ? '📍 Anatomical Location' : '📍 कहाँ स्थित है? (Location)'}
                  </span>
                  <p className="detail-text">
                    {language === 'english'
                      ? currentPart.locationEn || currentPart.locationHinglish
                      : currentPart.locationHinglish}
                  </p>
                </div>

                <div className="detail-item function-item">
                  <span className="detail-label">
                    {language === 'english' ? '⚙️ Physiological Function' : '⚙️ मुख्य कार्य (Physiological Function)'}
                  </span>
                  <p className="detail-text">
                    {language === 'english'
                      ? currentPart.functionEn || currentPart.functionHinglish
                      : currentPart.functionHinglish}
                  </p>
                </div>
              </div>

              {/* 2. High-Yield Memory Trick & Wonder Fact */}
              {(currentPart.funFactHinglish || currentPart.funFactEn || currentPart.memoryTrickHindi) && (
                <div className="quick-tip-card highlight-border">
                  <span className="tip-badge">
                    💡 {language === 'english' ? 'High-Yield Clinical Fact & Pearl:' : (currentPart.memoryTrickHindi ? 'याद रखने की ट्रिक (Memory Trick):' : 'रोचक तथ्य (Fun Fact):')}
                  </span>
                  <p className="tip-text">
                    {language === 'english'
                      ? currentPart.funFactEn || currentPart.funFactHinglish || currentPart.memoryTrickHindi
                      : currentPart.memoryTrickHindi || currentPart.funFactHinglish}
                  </p>
                </div>
              )}

              {/* 3. Scientific Etymology & Derivation */}
              {currentPart.rootWordEtymology && (
                <div className="etymology-box highlight-border">
                  <div className="etymology-header">
                    <Brain size={16} className="text-accent" />
                    <span className="etymology-heading">
                      {language === 'english' ? '🔬 Medical Etymology & Root Word:' : '🔬 वैज्ञानिक नाम एवं शब्द की उत्पत्ति (Medical Etymology):'}
                    </span>
                  </div>
                  <p className="etymology-content">{currentPart.rootWordEtymology}</p>
                </div>
              )}

              {/* 4. Clinical Significance & Pathophysiology */}
              {(currentPart.clinicalNoteHinglish || currentPart.clinicalNoteEn) && (
                <div className="detail-item clinical-box">
                  <span className="detail-label">
                    {language === 'english' ? '🩺 Clinical Significance & Pathophysiology' : '🩺 चिकित्सीय महत्व व विकृति (Clinical Significance):'}
                  </span>
                  <p className="detail-text">
                    {language === 'english'
                      ? currentPart.clinicalNoteEn || currentPart.clinicalNoteHinglish
                      : currentPart.clinicalNoteHinglish}
                  </p>
                </div>
              )}

              {/* 5. Standard Clinical Treatments, Medications & Patient Care */}
              {(currentPart.treatmentsHinglish || currentPart.medications || currentPart.homeRemedies) && (
                <div className="part-treatments-container highlight-border">
                  <div className="treatment-main-header">
                    <Pill size={17} className="text-success" />
                    <h4 className="treatment-main-title">
                      {language === 'english' ? '💊 Standard Clinical Treatments & Patient Care:' : '💊 संपूर्ण उपचार, दवाएं एवं सावधानियां (Treatments & Care):'}
                    </h4>
                  </div>

                  {currentPart.treatmentsHinglish && currentPart.treatmentsHinglish.length > 0 && (
                    <div className="treatment-block">
                      <span className="block-label">
                        {language === 'english' ? '🩺 Clinical Procedures & Interventions:' : '🩺 चिकित्सकीय इलाज एवं प्रक्रियाएं:'}
                      </span>
                      <ul className="block-list">
                        {currentPart.treatmentsHinglish.map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentPart.medications && currentPart.medications.length > 0 && (
                    <div className="treatment-block">
                      <span className="block-label">
                        {language === 'english' ? '💊 Primary Standard Medications:' : '💊 मुख्य औषधियां (Standard Medications):'}
                      </span>
                      <div className="med-pills-wrap">
                        {currentPart.medications.map((m, idx) => (
                          <span key={idx} className="med-pill-tag">
                            💊 {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentPart.homeRemedies && currentPart.homeRemedies.length > 0 && (
                    <div className="treatment-block">
                      <span className="block-label">
                        {language === 'english' ? '🌿 Lifestyle & Preventative Home Measures:' : '🌿 घरेलू देखभाल एवं जीवनशैली उपाय:'}
                      </span>
                      <ul className="block-list">
                        {currentPart.homeRemedies.map((hr, idx) => (
                          <li key={idx}>{hr}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* 6. NEET / MBBS High-Yield Mnemonics & Pearls */}
              {currentPart.highYieldMnemonic && (
                <div className="high-yield-mnemonic-box">
                  <div className="mnemonic-title-row">
                    <GraduationCap size={16} className="text-warning" />
                    <span className="mnemonic-heading">
                      {language === 'english' ? '⚡ NEET / MBBS High-Yield Mnemonic & Pearls:' : '⚡ NEET / MBBS हाई-यील्ड ट्रिक व परीक्षा बिंदु:'}
                    </span>
                  </div>
                  <p className="mnemonic-content">{currentPart.highYieldMnemonic}</p>
                  {currentPart.examPearls && currentPart.examPearls.length > 0 && (
                    <ul className="exam-pearls-list">
                      {currentPart.examPearls.map((pearl, pIdx) => (
                        <li key={pIdx}>
                          <span className="pearl-bullet">⚡</span>
                          <span>{pearl}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* 7. Real Medical Textbook Citations */}
              {currentPart.citations && currentPart.citations.length > 0 && (
                <div className="textbook-citations-box">
                  <div className="citations-header">
                    <BookMarked size={16} className="text-accent" />
                    <h5 className="citations-title">
                      {language === 'english' ? '📚 Authoritative Textbook Citations:' : '📚 प्रामाणिक संदर्भ (Standard Medical Textbook Citations):'}
                    </h5>
                  </div>
                  <div className="citations-cards-stack">
                    {currentPart.citations.map((cite, cIdx) => (
                      <div key={cIdx} className="single-citation-card">
                        <div className="cite-book-title-row">
                          <span className="cite-book-name">{cite.book}</span>
                          <span className="cite-chapter-tag">{cite.citation}</span>
                        </div>
                        <p className="cite-takeaway">
                          <strong>Takeaway:</strong> {cite.highYieldFact}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. Associated Pathologies */}
              {currentPart.relatedDiseases && currentPart.relatedDiseases.length > 0 && (
                <div className="part-related-diseases">
                  <span className="disease-tag-label">
                    {language === 'english' ? '🏥 Associated Pathologies:' : 'संबंधित बीमारियाँ (Associated Diseases):'}
                  </span>
                  <div className="disease-tag-cloud">
                    {currentPart.relatedDiseases.map((dis, idx) => (
                      <span key={idx} className="disease-pill">
                        {dis}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ) : (
            <div className="empty-part-notice glass-panel">
              <p>{language === 'english' ? 'Loading anatomical structure details...' : 'इस अध्याय के लिए अंग लोड हो रहे हैं...'}</p>
            </div>
          )}

          {/* Clean Quick Organ Switcher at the bottom */}
          <section className="chapter-parts-quick-list glass-panel">
            <h4 className="quick-list-title">
              {language === 'english'
                ? `All ${chapter.parts.length} Structures in this System (Click to focus in 3D):`
                : `इस अध्याय के सभी ${chapter.parts.length} अंग (3D में देखने के लिए क्लिक करें):`}
            </h4>
            <div className="quick-parts-grid">
              {chapter.parts.map((p, idx) => (
                <button
                  key={p.id}
                  className={`quick-part-chip ${idx === currentPartIndex && (!selectedPart || selectedPart.id === p.id) ? 'active' : ''}`}
                  onClick={() => onSelectPart(p)}
                >
                  <span className="chip-num">{idx + 1}</span>
                  <span className="chip-name">{language === 'english' ? p.name : p.hindiName}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: PATHOLOGIES & CLINICAL DISORDERS */}
      {activeTab === 'diseases' && (
        <div className="book-content-scroll">
          <div className="disease-tab-header">
            <h3 className="disease-tab-title">
              <Stethoscope size={18} className="text-danger" />
              <span>{language === 'english' ? `${chapter.title} — Key Pathologies` : `${chapter.hindiTitle} — प्रमुख रोग एवं निदान`}</span>
            </h3>
            <p className="disease-tab-desc">
              {language === 'english'
                ? 'Common clinical diseases associated with this anatomical system, including manifestations and interventions.'
                : 'इस तंत्र से संबंधित प्रमुख बीमारियां, उनके कारण, लक्षण और रोकथाम के उपाय।'}
            </p>
          </div>

          <div className="disease-cards-list">
            {chapter.commonDiseases.map(disease => (
              <div key={disease.id} className="disease-card book-card">
                <div className="disease-card-top">
                  <div>
                    <span className={`severity-badge ${disease.severity}`}>
                      {disease.severity === 'critical'
                        ? (language === 'english' ? 'Critical / Emergency' : 'गंभीर / आपातकालीन')
                        : disease.severity === 'chronic'
                        ? (language === 'english' ? 'Chronic Condition' : 'दीर्घकालिक (Chronic)')
                        : (language === 'english' ? 'Moderate' : 'मध्यम (Moderate)')}
                    </span>
                    <h4 className="disease-name">{language === 'english' ? disease.name : disease.hindiName}</h4>
                    <span className="disease-medical-name">{language === 'english' ? disease.hindiName : disease.name}</span>
                  </div>

                  <button
                    className="view-organ-btn"
                    onClick={() => onSelectDisease(disease)}
                    title={language === 'english' ? 'View affected structure in 3D' : 'इस बीमारी से प्रभावित अंग को 3D में देखें'}
                  >
                    <Eye size={14} />
                    <span>{language === 'english' ? 'View in 3D' : '3D में देखें'}</span>
                  </button>
                </div>

                <p className="disease-overview">{disease.overview}</p>

                <div className="disease-breakdown">
                  <div className="breakdown-section">
                    <h5 className="breakdown-title text-danger">
                      <AlertCircle size={14} />
                      <span>{language === 'english' ? 'Symptoms:' : 'प्रमुख लक्षण (Symptoms):'}</span>
                    </h5>
                    <ul className="symptom-list">
                      {disease.symptoms.map((symp, sIdx) => (
                        <li key={sIdx}>{symp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="breakdown-section">
                    <h5 className="breakdown-title text-warning">
                      <span>⚠️ {language === 'english' ? 'Causes & Risk Factors:' : 'मुख्य कारण व जोखिम:'}</span>
                    </h5>
                    <ul className="cause-list">
                      {disease.causes.map((cause, cIdx) => (
                        <li key={cIdx}>{cause}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="breakdown-section">
                    <h5 className="breakdown-title text-success">
                      <ShieldCheck size={14} />
                      <span>{language === 'english' ? 'Prevention & Care:' : 'बचाव एवं स्वास्थ्य उपाय:'}</span>
                    </h5>
                    <ul className="prevention-list">
                      {disease.prevention.map((prev, pIdx) => (
                        <li key={pIdx}>{prev}</li>
                      ))}
                    </ul>
                  </div>

                  {disease.treatment && (
                    <div className="disease-treatment-full-block">
                      <div className="treatment-heading-row">
                        <Pill size={15} className="text-accent" />
                        <span className="treatment-heading-text">
                          {language === 'english' ? '💊 Standard Medical Treatments & Clinical Care:' : '💊 संपूर्ण उपचार, दवाएं एवं डॉक्टरी सलाह:'}
                        </span>
                      </div>

                      {disease.treatment.medical && disease.treatment.medical.length > 0 && (
                        <div className="treatment-inner-row">
                          <span className="inner-label">{language === 'english' ? '🩺 Medical Interventions:' : '🩺 डॉक्टरी इलाज व दवाएं:'}</span>
                          <ul className="inner-list">
                            {disease.treatment.medical.map((m, mIdx) => (
                              <li key={mIdx}>{m}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {disease.treatment.homeCare && disease.treatment.homeCare.length > 0 && (
                        <div className="treatment-inner-row">
                          <span className="inner-label">{language === 'english' ? '🌿 Lifestyle Care:' : '🌿 घरेलू देखभाल व परहेज:'}</span>
                          <ul className="inner-list">
                            {disease.treatment.homeCare.map((h, hIdx) => (
                              <li key={hIdx}>{h}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {disease.treatment.emergencyCare && (
                        <div className="emergency-alert-callout">
                          <AlertCircle size={15} className="text-danger flex-shrink-0" />
                          <div className="emergency-text">
                            <strong>{language === 'english' ? 'When to seek immediate emergency care:' : 'डॉक्टर को कब दिखाएं / आपातकालीन कदम:'}</strong>
                            <p>{disease.treatment.emergencyCare}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TABLE OF CONTENTS (ALL CHAPTERS) */}
      {activeTab === 'toc' && (
        <div className="book-content-scroll">
          <div className="toc-header">
            <h3 className="toc-title">
              <BookOpen size={18} />
              <span>{language === 'english' ? 'Human Anatomy & Physiology — Table of Chapters' : 'मानव शरीर विज्ञान पुस्तक — विषय सूची'}</span>
            </h3>
            <p className="toc-subtitle">
              {language === 'english'
                ? `${bookChapters.length} Comprehensive Anatomical Systems:`
                : `${bookChapters.length} सम्पूर्ण अध्याय (${bookChapters.length} Anatomical Systems):`}
            </p>
          </div>

          <div className="toc-search-bar">
            <Search size={15} />
            <input
              type="text"
              placeholder={language === 'english' ? 'Search chapters or structures...' : 'अध्याय या अंग खोजें...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="toc-chapter-list">
            {bookChapters
              .filter(ch =>
                ch.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ch.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((ch, idx) => {
                const realIndex = bookChapters.findIndex(c => c.id === ch.id);
                const actualIndex = realIndex >= 0 ? realIndex : idx;
                return (
                  <button
                    key={ch.id}
                    className={`toc-chapter-card ${actualIndex === currentChapterIndex ? 'active' : ''}`}
                    onClick={() => {
                      onSelectChapter(actualIndex);
                      if (ch.parts.length > 0) {
                        onSelectPart(ch.parts[0]);
                      }
                      setActiveTab('study');
                    }}
                  >
                    <div className="toc-num-box">
                      <span>{ch.chapterNumber}</span>
                    </div>
                    <div className="toc-info-box">
                      <h4 className="toc-ch-title">{language === 'english' ? ch.title : ch.hindiTitle}</h4>
                      <span className="toc-ch-eng">{language === 'english' ? ch.hindiTitle : ch.title}</span>
                      <span className="toc-ch-meta">
                        {language === 'english'
                          ? `${ch.parts.length} key structures · ${ch.commonDiseases.length} pathologies`
                          : `${ch.parts.length} महत्वपूर्ण अंग · ${ch.commonDiseases.length} रोग`}
                      </span>
                    </div>
                    <ChevronRight size={18} className="toc-arrow" />
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </aside>
  );
};
