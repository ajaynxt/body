import React, { useState } from 'react';
import type { BookChapter, StudyPartItem, ClinicalDisease } from '../types/atlas';
import { BOOK_CHAPTERS } from '../data/chapters';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
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
}

export const BookReader: React.FC<BookReaderProps> = ({
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
}) => {
  const [activeTab, setActiveTab] = useState<'study' | 'diseases' | 'toc'>('study');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<'hinglish' | 'hindi' | 'english'>('hinglish');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Auto-switch to study tab if an organ was clicked in 3D
  React.useEffect(() => {
    if (selectedPart) {
      setActiveTab('study');
    }
  }, [selectedPart]);

  const chapter: BookChapter = BOOK_CHAPTERS[currentChapterIndex] || BOOK_CHAPTERS[0];
  const currentPart: StudyPartItem | undefined = selectedPart || chapter.parts[currentPartIndex];

  // Speech pronunciation helper
  const handleSpeak = (text: string, langCode: string = 'hi-IN') => {
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
      const prevChapter = BOOK_CHAPTERS[currentChapterIndex - 1];
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
    } else if (currentChapterIndex < BOOK_CHAPTERS.length - 1) {
      onSelectChapter(currentChapterIndex + 1);
      const nextChapter = BOOK_CHAPTERS[currentChapterIndex + 1];
      if (nextChapter.parts.length > 0) {
        onSelectPart(nextChapter.parts[0]);
      }
    }
  };

  return (
    <aside className="book-reader-container glass-panel">
      {/* Top Header / Book Tabs & Language Selector */}
      <div className="book-tabs-header-row">
        <div className="book-tabs">
          <button
            className={`book-tab ${activeTab === 'study' ? 'active' : ''}`}
            onClick={() => setActiveTab('study')}
          >
            <BookOpen size={15} />
            <span>सचित्र अध्ययन</span>
          </button>
          <button
            className={`book-tab ${activeTab === 'diseases' ? 'active' : ''}`}
            onClick={() => setActiveTab('diseases')}
          >
            <Stethoscope size={15} />
            <span>रोग व निदान ({chapter.commonDiseases.length})</span>
          </button>
          <button
            className={`book-tab ${activeTab === 'toc' ? 'active' : ''}`}
            onClick={() => setActiveTab('toc')}
          >
            <Layers size={15} />
            <span>अध्याय सूची</span>
          </button>
        </div>

        {/* 3-Way Language Toggle */}
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
            title="शुद्ध हिंदी शब्दावली"
          >
            हिंदी
          </button>
          <button
            className={`lang-chip ${language === 'english' ? 'active' : ''}`}
            onClick={() => setLanguage('english')}
            title="Standard International Medical English"
          >
            EN
          </button>
        </div>
      </div>

      {/* TAB 1: VISUAL STUDY MODE */}
      {activeTab === 'study' && (
        <div className="book-content-scroll">
          {/* Chapter Banner */}
          <div className="chapter-banner">
            <div className="chapter-badge">
              <Bookmark size={13} />
              <span>अध्याय {chapter.chapterNumber}</span>
            </div>
            <h2 className="chapter-title">{language === 'english' ? chapter.title : chapter.hindiTitle}</h2>
            <p className="chapter-subtitle">{chapter.subtitle}</p>
          </div>

          {/* Chapter Overview Box */}
          <div className="book-card overview-card">
            <h4 className="card-heading">
              <Sparkles size={16} className="text-accent" />
              <span>
                {language === 'english'
                  ? 'System Overview'
                  : language === 'hindi'
                  ? 'शारीरिक तंत्र का परिचय'
                  : 'अध्याय परिचय (System Overview)'}
              </span>
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

            {/* Standard Reference Books for this System */}
            {chapter.recommendedBooks && chapter.recommendedBooks.length > 0 && (
              <div className="standard-books-badge-row">
                <span className="books-badge-label">
                  <BookMarked size={13} /> प्रामाणिक ग्रंथ (Standard Medical Textbooks):
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

          {/* Step-by-Step Part Walkthrough */}
          {currentPart ? (
            <div className="part-study-card book-card highlight-border">
              <div className="part-study-header">
                <div>
                  <span className="part-step-badge">
                    {selectedPart && selectedPart.id !== chapter.parts[currentPartIndex]?.id ? (
                      <span className="active-3d-badge-text">🎯 3D में चयनित अंग (Selected Structure)</span>
                    ) : (
                      `भाग ${currentPartIndex + 1} / ${chapter.parts.length}`
                    )}
                  </span>
                  <div className="organ-title-row">
                    <h3 className="part-study-name">
                      {language === 'english' ? currentPart.name : currentPart.hindiName}
                    </h3>
                    {/* Audio Pronunciation Button */}
                    <button
                      className={`pronounce-btn ${isSpeaking ? 'speaking' : ''}`}
                      onClick={() =>
                        handleSpeak(
                          language === 'english'
                            ? currentPart.name
                            : `${currentPart.hindiName}, ${currentPart.name}`,
                          language === 'english' ? 'en-US' : 'hi-IN'
                        )
                      }
                      title="उच्चारण सुनें (Listen Pronunciation)"
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
                    title="3D में इस अंग को अकेला देखें (Solo Focus)"
                  >
                    <Eye size={14} />
                    <span>3D Isolate</span>
                  </button>

                  {onOpenAudioPlayer && (
                    <button
                      className="assistant-btn-action"
                      onClick={onOpenAudioPlayer}
                      title="Google Assistant से इसका विवरण व उपचार सुनें"
                    >
                      <Volume2 size={14} />
                      <span>सुनें</span>
                    </button>
                  )}

                  {onOpenAITutor && (
                    <button
                      className="tutor-btn-action"
                      onClick={onOpenAITutor}
                      title="AI द्वारा 5 स्टेप्स में सीखें"
                    >
                      <Sparkles size={14} />
                      <span>AI ट्यूटर</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Step Navigation Controls */}
              <div className="part-nav-toolbar">
                <button
                  className="nav-step-btn"
                  onClick={handlePrevPart}
                  disabled={currentChapterIndex === 0 && currentPartIndex === 0}
                >
                  <ChevronLeft size={16} />
                  <span>पिछला अंग (Prev)</span>
                </button>

                <button
                  className={`tour-play-btn ${isTourPlaying ? 'playing' : ''}`}
                  onClick={onToggleTour}
                  title="एक-एक करके अंगों का ऑटो-टूर"
                >
                  {isTourPlaying ? <Pause size={15} /> : <Play size={15} />}
                  <span>{isTourPlaying ? 'रोकें (Pause)' : 'ऑटो टूर (Auto)'}</span>
                </button>

                <button
                  className="nav-step-btn"
                  onClick={handleNextPart}
                  disabled={
                    currentChapterIndex === BOOK_CHAPTERS.length - 1 &&
                    currentPartIndex === chapter.parts.length - 1
                  }
                >
                  <span>अगला अंग (Next)</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Detailed Educational Breakdown */}
              <div className="part-details-grid">
                <div className="detail-item">
                  <span className="detail-label">📍 कहाँ स्थित है? (Location)</span>
                  <p className="detail-text">{currentPart.locationHinglish}</p>
                </div>

                <div className="detail-item">
                  <span className="detail-label">⚙️ मुख्य कार्य (Physiological Function)</span>
                  <p className="detail-text">{currentPart.functionHinglish}</p>
                </div>

                <div className="detail-item fun-fact-box">
                  <span className="detail-label">💡 रोचक तथ्य (Fun Fact)</span>
                  <p className="detail-text">{currentPart.funFactHinglish}</p>
                </div>

                <div className="detail-item clinical-box">
                  <span className="detail-label">🩺 चिकित्सीय महत्व (Clinical Significance)</span>
                  <p className="detail-text">{currentPart.clinicalNoteHinglish}</p>
                </div>
              </div>

              {/* Scientific Name Etymology & Root Word */}
              {currentPart.rootWordEtymology && (
                <div className="etymology-box highlight-border">
                  <div className="etymology-header">
                    <Brain size={16} className="text-accent" />
                    <span className="etymology-heading">🔬 वैज्ञानिक नाम एवं शब्द की उत्पत्ति (Medical Etymology):</span>
                  </div>
                  <p className="etymology-content">{currentPart.rootWordEtymology}</p>
                </div>
              )}

              {/* Memory Trick / Mnemonics */}
              {currentPart.memoryTrickHindi && (
                <div className="memory-trick-card highlight-border">
                  <div className="trick-title-row">
                    <Sparkles size={16} className="text-warning" />
                    <span className="trick-heading">💡 याद रखने की धांसू ट्रिक (Memory Shortcut):</span>
                  </div>
                  <p className="trick-content">{currentPart.memoryTrickHindi}</p>
                </div>
              )}

              {/* Comprehensive Treatments, Medications & Home Remedies */}
              {(currentPart.treatmentsHinglish || currentPart.medications || currentPart.homeRemedies || currentPart.researchHighlights) && (
                <div className="part-treatments-container highlight-border">
                  <div className="treatment-main-header">
                    <Pill size={17} className="text-success" />
                    <h4 className="treatment-main-title">💊 संपूर्ण उपचार, दवाएं एवं सावधानियां (Treatments & Care):</h4>
                  </div>

                  {currentPart.treatmentsHinglish && currentPart.treatmentsHinglish.length > 0 && (
                    <div className="treatment-block">
                      <span className="block-label">🩺 चिकित्सकीय इलाज एवं प्रक्रियाएं:</span>
                      <ul className="block-list">
                        {currentPart.treatmentsHinglish.map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentPart.medications && currentPart.medications.length > 0 && (
                    <div className="treatment-block">
                      <span className="block-label">💊 मुख्य औषधियां (Standard Medications):</span>
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
                      <span className="block-label">🌿 घरेलू उपाय एवं सावधानियां (Home Care & Habits):</span>
                      <ul className="block-list">
                        {currentPart.homeRemedies.map((hr, idx) => (
                          <li key={idx}>{hr}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentPart.researchHighlights && currentPart.researchHighlights.length > 0 && (
                    <div className="treatment-block research-block">
                      <span className="block-label">🔬 शोधकर्ता क्लिनिकल नोट्स (Clinical Research):</span>
                      <ul className="block-list">
                        {currentPart.researchHighlights.map((rh, idx) => (
                          <li key={idx}>{rh}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* NEET / MBBS High-Yield Mnemonic & Pearls */}
              {currentPart.highYieldMnemonic && (
                <div className="high-yield-mnemonic-box">
                  <div className="mnemonic-title-row">
                    <GraduationCap size={16} className="text-warning" />
                    <span className="mnemonic-heading">
                      NEET / MBBS High-Yield Mnemonic (याद रखने की ट्रिक):
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

              {/* Real Medical Textbooks Citations */}
              {currentPart.citations && currentPart.citations.length > 0 && (
                <div className="textbook-citations-box">
                  <div className="citations-header">
                    <BookMarked size={16} className="text-accent" />
                    <h5 className="citations-title">
                      प्रामाणिक संदर्भ (Standard Medical Textbook Citations):
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

              {/* Related Diseases for this specific part */}
              {currentPart.relatedDiseases.length > 0 && (
                <div className="part-related-diseases">
                  <span className="disease-tag-label">संबंधित बीमारियाँ (Associated Diseases):</span>
                  <div className="disease-tag-cloud">
                    {currentPart.relatedDiseases.map((dis, idx) => (
                      <span key={idx} className="disease-pill">
                        {dis}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="empty-part-notice">
              <p>इस अध्याय के लिए अंग लोड हो रहे हैं...</p>
            </div>
          )}

          {/* All parts in chapter quick grid */}
          <div className="chapter-parts-quick-list">
            <h4 className="quick-list-title">इस अध्याय के सभी अंग (Click to focus in 3D):</h4>
            <div className="quick-parts-grid">
              {chapter.parts.map((p, idx) => (
                <button
                  key={p.id}
                  className={`quick-part-chip ${idx === currentPartIndex ? 'active' : ''}`}
                  onClick={() => onSelectPart(p)}
                >
                  <span className="chip-num">{idx + 1}</span>
                  <span className="chip-name">{p.hindiName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DISEASES & MEDICAL DISORDERS */}
      {activeTab === 'diseases' && (
        <div className="book-content-scroll">
          <div className="disease-tab-header">
            <h3 className="disease-tab-title">
              <Stethoscope size={18} className="text-danger" />
              <span>{chapter.hindiTitle} — प्रमुख रोग एवं निदान</span>
            </h3>
            <p className="disease-tab-desc">
              इस तंत्र से संबंधित प्रमुख बीमारियां, उनके कारण, लक्षण और रोकथाम के उपाय।
            </p>
          </div>

          <div className="disease-cards-list">
            {chapter.commonDiseases.map(disease => (
              <div key={disease.id} className="disease-card book-card">
                <div className="disease-card-top">
                  <div>
                    <span className={`severity-badge ${disease.severity}`}>
                      {disease.severity === 'critical'
                        ? 'गंभीर / आपातकालीन'
                        : disease.severity === 'chronic'
                        ? 'दीर्घकालिक (Chronic)'
                        : 'मध्यम (Moderate)'}
                    </span>
                    <h4 className="disease-name">{disease.hindiName}</h4>
                    <span className="disease-medical-name">{disease.name}</span>
                  </div>

                  <button
                    className="view-organ-btn"
                    onClick={() => onSelectDisease(disease)}
                    title="इस बीमारी से प्रभावित अंग को 3D में देखें"
                  >
                    <Eye size={14} />
                    <span>3D में देखें</span>
                  </button>
                </div>

                <p className="disease-overview">{disease.overview}</p>

                <div className="disease-breakdown">
                  {/* Symptoms */}
                  <div className="breakdown-section">
                    <h5 className="breakdown-title text-danger">
                      <AlertCircle size={14} />
                      <span>प्रमुख लक्षण (Symptoms):</span>
                    </h5>
                    <ul className="symptom-list">
                      {disease.symptoms.map((symp, sIdx) => (
                        <li key={sIdx}>{symp}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Causes */}
                  <div className="breakdown-section">
                    <h5 className="breakdown-title text-warning">
                      <span>⚠️ मुख्य कारण व जोखिम (Causes & Risks):</span>
                    </h5>
                    <ul className="cause-list">
                      {disease.causes.map((cause, cIdx) => (
                        <li key={cIdx}>{cause}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Prevention */}
                  <div className="breakdown-section">
                    <h5 className="breakdown-title text-success">
                      <ShieldCheck size={14} />
                      <span>बचाव एवं स्वास्थ्य उपाय (Prevention & Care):</span>
                    </h5>
                    <ul className="prevention-list">
                      {disease.prevention.map((prev, pIdx) => (
                        <li key={pIdx}>{prev}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Comprehensive Treatments, Medical Care & Red Flags */}
                  {disease.treatment && (
                    <div className="disease-treatment-full-block">
                      <div className="treatment-heading-row">
                        <Pill size={15} className="text-accent" />
                        <span className="treatment-heading-text">💊 संपूर्ण उपचार, दवाएं एवं डॉक्टरी सलाह:</span>
                      </div>

                      {/* Medical Care */}
                      {disease.treatment.medical && disease.treatment.medical.length > 0 && (
                        <div className="treatment-inner-row">
                          <span className="inner-label">🩺 डॉक्टरी इलाज व दवाएं:</span>
                          <ul className="inner-list">
                            {disease.treatment.medical.map((m, mIdx) => (
                              <li key={mIdx}>{m}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Home Care */}
                      {disease.treatment.homeCare && disease.treatment.homeCare.length > 0 && (
                        <div className="treatment-inner-row">
                          <span className="inner-label">🌿 घरेलू देखभाल व परहेज:</span>
                          <ul className="inner-list">
                            {disease.treatment.homeCare.map((h, hIdx) => (
                              <li key={hIdx}>{h}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Emergency Care / Red Flags (डॉक्टर को कब दिखाएं) */}
                      {disease.treatment.emergencyCare && (
                        <div className="emergency-alert-callout">
                          <AlertCircle size={15} className="text-danger flex-shrink-0" />
                          <div className="emergency-text">
                            <strong>डॉक्टर को कब दिखाएं / आपातकालीन कदम:</strong>
                            <p>{disease.treatment.emergencyCare}</p>
                          </div>
                        </div>
                      )}

                      {/* Diagnostic Tests */}
                      {disease.treatment.diagnosticTests && disease.treatment.diagnosticTests.length > 0 && (
                        <div className="diagnostic-tests-chips">
                          <span className="diag-label">🔬 जरूरी जांचें:</span>
                          <div className="tests-chips-wrap">
                            {disease.treatment.diagnosticTests.map((t, tIdx) => (
                              <span key={tIdx} className="diag-chip">
                                🧪 {t}
                              </span>
                            ))}
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
              <span>मानव शरीर विज्ञान पुस्तक — विषय सूची</span>
            </h3>
            <p className="toc-subtitle">15 सम्पूर्ण अध्याय (15 Anatomical Systems):</p>
          </div>

          <div className="toc-search-bar">
            <Search size={15} />
            <input
              type="text"
              placeholder="अध्याय या अंग खोजें..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="toc-chapter-list">
            {BOOK_CHAPTERS.filter(ch =>
              ch.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
              ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              ch.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((ch, idx) => (
              <button
                key={ch.id}
                className={`toc-chapter-card ${idx === currentChapterIndex ? 'active' : ''}`}
                onClick={() => {
                  onSelectChapter(idx);
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
                  <h4 className="toc-ch-title">{ch.hindiTitle}</h4>
                  <span className="toc-ch-eng">{ch.title}</span>
                  <span className="toc-ch-meta">
                    {ch.parts.length} महत्वपूर्ण अंग · {ch.commonDiseases.length} रोग
                  </span>
                </div>
                <ChevronRight size={18} className="toc-arrow" />
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
