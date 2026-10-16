import React, { useState, useEffect } from 'react';
import {
  X,
  Layers,
  GraduationCap,
  BookMarked,
  Search,
  Bookmark,
  RotateCw,
  Sliders,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { BOOK_CHAPTERS } from '../data/chapters';
import type { StudyPartItem } from '../types/atlas';

interface StudySuiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPart: (part: StudyPartItem) => void;
  onApplyLayerMode?: (layer: number) => void;
}

export const StudySuiteModal: React.FC<StudySuiteModalProps> = ({
  isOpen,
  onClose,
  onSelectPart,
  onApplyLayerMode,
}) => {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'layers' | 'glossary' | 'bookmarks'>('flashcards');

  // Flatten all parts for flashcards and glossary
  const allParts: StudyPartItem[] = BOOK_CHAPTERS.flatMap(ch => ch.parts);

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledParts, setShuffledParts] = useState<StudyPartItem[]>(allParts);

  // Glossary state
  const [searchTerm, setSearchTerm] = useState('');

  // Bookmarks state
  const [savedPartIds, setSavedPartIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('anatomy_saved_parts') || '[]');
    } catch {
      return [];
    }
  });

  // Layer mode state
  const [currentLayer, setCurrentLayer] = useState(3); // 1 to 5

  useEffect(() => {
    if (isOpen) {
      setShuffledParts([...allParts].sort(() => 0.5 - Math.random()));
      setCardIndex(0);
      setIsFlipped(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentCard = shuffledParts[cardIndex] || allParts[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex(prev => (prev + 1) % shuffledParts.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex(prev => (prev - 1 + shuffledParts.length) % shuffledParts.length);
  };

  const toggleBookmark = (partId: string) => {
    const updated = savedPartIds.includes(partId)
      ? savedPartIds.filter(id => id !== partId)
      : [...savedPartIds, partId];
    setSavedPartIds(updated);
    localStorage.setItem('anatomy_saved_parts', JSON.stringify(updated));
  };

  const handleLayerChange = (layer: number) => {
    setCurrentLayer(layer);
    if (onApplyLayerMode) {
      onApplyLayerMode(layer);
    }
  };

  const filteredGlossary = allParts.filter(
    p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.hindiName.includes(searchTerm) ||
      (p.latinName && p.latinName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.functionHinglish.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bookmarkedParts = allParts.filter(p => savedPartIds.includes(p.id));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="study-suite-modal-card glass-panel" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-left">
            <div className="header-icon-box" style={{ background: 'rgba(99, 102, 241, 0.15)' }}>
              <GraduationCap size={22} className="text-accent" />
            </div>
            <div>
              <h3 className="modal-title">एनाटॉमी अध्ययन सूट (Anatomy Study Suite)</h3>
              <p className="modal-subtitle">Flashcards · Layer Mode · Medical Glossary · Saved Study List</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="study-suite-tab-nav">
          <button
            className={`suite-tab-btn ${activeTab === 'flashcards' ? 'active' : ''}`}
            onClick={() => setActiveTab('flashcards')}
          >
            <Sparkles size={16} />
            <span>फ्लैशकार्ड्स (Flashcards)</span>
          </button>
          <button
            className={`suite-tab-btn ${activeTab === 'layers' ? 'active' : ''}`}
            onClick={() => setActiveTab('layers')}
          >
            <Layers size={16} />
            <span>लेयर मोड (Layer Mode)</span>
          </button>
          <button
            className={`suite-tab-btn ${activeTab === 'glossary' ? 'active' : ''}`}
            onClick={() => setActiveTab('glossary')}
          >
            <BookMarked size={16} />
            <span>शब्दावली (Glossary)</span>
          </button>
          <button
            className={`suite-tab-btn ${activeTab === 'bookmarks' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookmarks')}
          >
            <Bookmark size={16} />
            <span>सहेजी गई सूची ({savedPartIds.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="study-suite-body">
          {/* TAB 1: FLASHCARDS */}
          {activeTab === 'flashcards' && currentCard && (
            <div className="flashcards-container">
              <div className="flashcard-meta-bar">
                <span className="card-counter">
                  कार्ड {cardIndex + 1} / {shuffledParts.length}
                </span>
                <span className="card-system-tag">{currentCard.system.toUpperCase()}</span>
                <button
                  className="card-bookmark-btn"
                  onClick={() => toggleBookmark(currentCard.id)}
                  title="सहेजें (Save)"
                >
                  <Bookmark
                    size={16}
                    fill={savedPartIds.includes(currentCard.id) ? '#38bdf8' : 'none'}
                    className={savedPartIds.includes(currentCard.id) ? 'text-accent' : ''}
                  />
                </button>
              </div>

              {/* The Flip Card */}
              <div
                className={`flashcard-card-box ${isFlipped ? 'flipped' : ''}`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {!isFlipped ? (
                  /* Front Side */
                  <div className="card-face front-face">
                    <span className="card-face-tag">प्रश्न / संरचना पहचान</span>
                    <h2 className="card-organ-title">{currentCard.hindiName}</h2>
                    <h3 className="card-english-sub">{currentCard.name}</h3>
                    {currentCard.latinName && (
                      <p className="card-latin-term">लैटिन: {currentCard.latinName}</p>
                    )}
                    <div className="card-hint-box">
                      <p className="hint-label">💡 मुख्य कार्य एवं स्थान संकेत:</p>
                      <p>{currentCard.functionHinglish}</p>
                    </div>
                    <span className="flip-instruction-pill">
                      <RotateCw size={14} />
                      <span>उत्तर एवं चिकित्सीय बिंदु देखने के लिए क्लिक करें</span>
                    </span>
                  </div>
                ) : (
                  /* Back Side */
                  <div className="card-face back-face">
                    <span className="card-face-tag success">चिकित्सीय व परीक्षा उत्तर</span>
                    <h3 className="card-organ-title">{currentCard.name} ({currentCard.hindiName})</h3>
                    {currentCard.highYieldMnemonic && (
                      <div className="card-mnemonic-box">
                        <strong>🎯 हाई-यील्ड निमोनिक (Mnemonic):</strong>
                        <p>{currentCard.highYieldMnemonic}</p>
                      </div>
                    )}
                    {currentCard.examPearls && currentCard.examPearls.length > 0 && (
                      <div className="card-pearls-box">
                        <strong>⭐ मेडिकल परीक्षा मुख्य बिंदु (Exam Pearls):</strong>
                        <ul>
                          {currentCard.examPearls.map((pearl, i) => (
                            <li key={i}>{pearl}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p className="card-clinical-note">
                      <strong>🩺 क्लिनिकल नोट:</strong> {currentCard.clinicalNoteHinglish}
                    </p>
                    <button
                      className="inspect-3d-btn"
                      onClick={e => {
                        e.stopPropagation();
                        onSelectPart(currentCard);
                        onClose();
                      }}
                    >
                      <span>3D मॉडल में देखें व अकेला करें (Inspect 3D)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flashcard-nav-row">
                <button className="card-nav-btn" onClick={handlePrevCard}>
                  ← पिछला कार्ड
                </button>
                <button className="card-flip-action-btn" onClick={() => setIsFlipped(!isFlipped)}>
                  <RotateCw size={15} />
                  <span>{isFlipped ? 'सामने देखें (Flip to Front)' : 'उत्तर देखें (Flip to Back)'}</span>
                </button>
                <button className="card-nav-btn primary" onClick={handleNextCard}>
                  अगला कार्ड →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LAYER MODE */}
          {activeTab === 'layers' && (
            <div className="layer-mode-container">
              <div className="layer-intro-card glass-panel">
                <h4>
                  <Sliders size={18} className="inline-icon text-accent" />
                  <span>शारीरिक स्तर अन्वेषण (Anatomical Depth Stripping)</span>
                </h4>
                <p>
                  सतही परतों से लेकर सबसे गहरे विसरल अंगों तक मानव शरीर की गहराई को क्रमिक रूप से खोलें।
                </p>
              </div>

              <div className="layer-slider-box glass-panel">
                <div className="layer-slider-header">
                  <span className="layer-number-badge">स्तर {currentLayer} / 5</span>
                  <strong className="layer-title-text">
                    {currentLayer === 1 && 'स्तर 1: बाह्य आवरण (Integumentary Surface)'}
                    {currentLayer === 2 && 'स्तर 2: सतही पेशी विन्यास (Superficial Musculature)'}
                    {currentLayer === 3 && 'स्तर 3: कंकाल एवं विसरल अंग (Skeletal & Core Organs)'}
                    {currentLayer === 4 && 'स्तर 4: गहन कार्डियो-पल्मोनरी व संवहनी तंत्र (Deep Cardiovascular)'}
                    {currentLayer === 5 && 'स्तर 5: केंद्रीय एवं स्वायत्त तंत्रिका तंत्र (Pure Neural Core)'}
                  </strong>
                </div>

                <div className="layer-range-wrap">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={currentLayer}
                    onChange={e => handleLayerChange(parseInt(e.target.value))}
                    className="custom-range-slider"
                  />
                  <div className="layer-range-ticks">
                    <span>1. त्वचा</span>
                    <span>2. मांसपेशियां</span>
                    <span>3. कंकाल व अंग</span>
                    <span>4. वाहिकाएं</span>
                    <span>5. तंत्रिकाएं</span>
                  </div>
                </div>

                <div className="layer-description-card">
                  {currentLayer === 1 && (
                    <p>
                      <strong>दिखाई देने वाले अंग:</strong> त्वचा (Skin), बाह्य सतही लैंडमार्क्स। संपूर्ण आंतरिक अंगों को ढक कर शरीर की बाह्य रूपरेखा प्रदर्शित करता है।
                    </p>
                  )}
                  {currentLayer === 2 && (
                    <p>
                      <strong>दिखाई देने वाले अंग:</strong> वक्ष, उदर, हाथ और पैरों की मुख्य सतही मांसपेशियां। त्वचा हटा दी गई है ताकि मस्कुलोस्केलेटल सतह का अध्ययन हो सके।
                    </p>
                  )}
                  {currentLayer === 3 && (
                    <p>
                      <strong>दिखाई देने वाले अंग:</strong> कंकाल फ्रेम (हड्डियां, पसलियां, रीढ़) के साथ हृदय, फेफड़े, यकृत, आमाशय और आंतें अपने स्वाभाविक शरीर-रचनात्मक स्थान पर।
                    </p>
                  )}
                  {currentLayer === 4 && (
                    <p>
                      <strong>दिखाई देने वाले अंग:</strong> हृदय के चार कक्ष, महाधमनी, फुफ्फुसीय शाखाएं एवं वृक्कीय संवहनी जाल।
                    </p>
                  )}
                  {currentLayer === 5 && (
                    <p>
                      <strong>दिखाई देने वाले अंग:</strong> मस्तिष्क, कपाल तंत्रिकाएं, स्पाइनल कॉर्ड एवं गहन न्यूरल ट्रैक्स।
                    </p>
                  )}
                </div>

                <button
                  className="apply-layer-3d-btn"
                  onClick={() => {
                    handleLayerChange(currentLayer);
                    onClose();
                  }}
                >
                  <span>इस स्तर को 3D व्यूपोर्ट पर लागू करें</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: GLOSSARY */}
          {activeTab === 'glossary' && (
            <div className="glossary-container">
              <div className="glossary-search-bar">
                <Search size={18} className="text-muted" />
                <input
                  type="text"
                  placeholder="अंग का नाम, लैटिन शब्द या चिकित्सीय शब्द खोजें..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="glossary-search-input"
                />
                {searchTerm && (
                  <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="glossary-list-scroll">
                {filteredGlossary.length === 0 ? (
                  <div className="empty-state-box">
                    <HelpCircle size={32} className="text-muted" />
                    <p>"{searchTerm}" से मेल खाता कोई शब्द नहीं मिला।</p>
                  </div>
                ) : (
                  filteredGlossary.map(part => (
                    <div key={part.id} className="glossary-item-card glass-panel">
                      <div className="glossary-card-header">
                        <div>
                          <h4 className="glossary-term-title">
                            {part.name} ({part.hindiName})
                          </h4>
                          {part.latinName && (
                            <span className="glossary-latin-pill">लैटिन: {part.latinName}</span>
                          )}
                        </div>
                        <div className="glossary-actions">
                          <button
                            className="bookmark-icon-btn"
                            onClick={() => toggleBookmark(part.id)}
                            title="सहेजें"
                          >
                            <Bookmark
                              size={16}
                              fill={savedPartIds.includes(part.id) ? '#38bdf8' : 'none'}
                              className={savedPartIds.includes(part.id) ? 'text-accent' : ''}
                            />
                          </button>
                          <button
                            className="inspect-mini-btn"
                            onClick={() => {
                              onSelectPart(part);
                              onClose();
                            }}
                          >
                            <span>3D में देखें</span>
                          </button>
                        </div>
                      </div>
                      <p className="glossary-func-text">{part.functionHinglish}</p>
                      {part.examPearls && part.examPearls[0] && (
                        <p className="glossary-pearl-text">
                          <strong>परीक्षोपयोगी तथ्य:</strong> {part.examPearls[0]}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SAVED STUDY LIST */}
          {activeTab === 'bookmarks' && (
            <div className="bookmarks-container">
              {bookmarkedParts.length === 0 ? (
                <div className="empty-state-box">
                  <Bookmark size={36} className="text-muted" />
                  <h4>कोई अंग सहेजा नहीं गया है</h4>
                  <p>अध्ययन के दौरान किसी भी अंग या फ्लैशकार्ड पर बुकमार्क आइकन पर क्लिक करके उसे यहां सहेजें।</p>
                </div>
              ) : (
                <div className="bookmarks-grid">
                  {bookmarkedParts.map(part => (
                    <div key={part.id} className="bookmark-card glass-panel">
                      <div className="bookmark-card-top">
                        <span className="bookmark-sys-tag">{part.system}</span>
                        <button
                          className="remove-bookmark-btn"
                          onClick={() => toggleBookmark(part.id)}
                          title="हटाएं"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <h4 className="bookmark-title">{part.hindiName}</h4>
                      <p className="bookmark-eng-sub">{part.name}</p>
                      <p className="bookmark-desc">{part.functionHinglish}</p>
                      <button
                        className="bookmark-open-3d-btn"
                        onClick={() => {
                          onSelectPart(part);
                          onClose();
                        }}
                      >
                        <span>3D में खोलें</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
