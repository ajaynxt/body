import React, { useState } from 'react';
import {
  X,
  Volume2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Activity,
  AlertTriangle,
  Pill,
  Award,
  Sparkles,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import type { StudyPartItem, BookChapter } from '../types/atlas';

interface Props {
  currentPart?: StudyPartItem;
  currentChapter?: BookChapter;
  isOpen: boolean;
  onClose: () => void;
  onIsolateIn3D?: () => void;
}

export const StepByStepAITutor: React.FC<Props> = ({
  currentPart,
  currentChapter,
  isOpen,
  onClose,
  onIsolateIn3D,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [isSpeakingStep, setIsSpeakingStep] = useState(false);

  if (!isOpen) return null;

  const organName = currentPart?.hindiName || currentChapter?.hindiTitle || 'अंग';
  const englishName = currentPart?.name || currentChapter?.title || 'Organ';

  // Speak only current step text
  const speakCurrentStepText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeakingStep(true);
    utterance.onend = () => setIsSpeakingStep(false);
    utterance.onerror = () => setIsSpeakingStep(false);
    window.speechSynthesis.speak(utterance);
  };

  const stepsMeta = [
    { num: 1, title: 'परिचय व संरचना', icon: BookOpen },
    { num: 2, title: 'कार्यप्रणाली', icon: Activity },
    { num: 3, title: 'प्रमुख रोग व लक्षण', icon: AlertTriangle },
    { num: 4, title: 'संपूर्ण उपचार व उपाय', icon: Pill },
    { num: 5, title: 'रिसर्च व क्लिनिकल टिप्स', icon: Award },
  ];

  return (
    <div className="ai-tutor-overlay">
      <div className="ai-tutor-modal glass-panel">
        {/* Header */}
        <div className="ai-tutor-header">
          <div className="ai-tutor-brand">
            <span className="tutor-ai-badge">
              <Sparkles size={14} />
              <span>AI Step-by-Step Anatomy Tutor</span>
            </span>
            <h2 className="tutor-organ-title">
              {organName} <span className="eng-sub">({englishName})</span>
            </h2>
          </div>

          <div className="ai-tutor-header-actions">
            {onIsolateIn3D && (
              <button
                className="isolate-chip-btn"
                onClick={onIsolateIn3D}
                title="3D में इस अंग को अकेला देखें"
              >
                <span>3D Solo Focus</span>
              </button>
            )}
            <button className="close-tutor-btn" onClick={onClose} title="बंद करें">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 5-Step Stepper Progress Bar */}
        <div className="ai-tutor-stepper-bar">
          {stepsMeta.map(s => {
            const Icon = s.icon;
            const isDone = currentStep > s.num;
            const isActive = currentStep === s.num;
            return (
              <button
                key={s.num}
                className={`step-bubble-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                onClick={() => {
                  setCurrentStep(s.num);
                  setQuizAnswer(null);
                }}
              >
                <div className="bubble-circle">
                  {isDone ? <CheckCircle2 size={15} /> : <Icon size={14} />}
                </div>
                <div className="bubble-labels">
                  <span className="bubble-step-num">स्टेप {s.num}</span>
                  <span className="bubble-step-title">{s.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Step Content */}
        <div className="ai-tutor-body-scroll">
          {/* STEP 1: Anatomy & Structure */}
          {currentStep === 1 && (
            <div className="step-card fade-in">
              <div className="step-card-header">
                <div className="step-tag">चरण 1 / 5: शारीरिक परिचय एवं त्रि-आयामी संरचना</div>
                <button
                  className={`speak-step-btn ${isSpeakingStep ? 'speaking' : ''}`}
                  onClick={() =>
                    speakCurrentStepText(
                      `${organName} का शारीरिक परिचय। स्थान: ${currentPart?.locationHinglish || 'शरीर का महत्वपूर्ण अंग'}। मुख्य विवरण: ${currentPart?.funFactHinglish || ''}`
                    )
                  }
                >
                  <Volume2 size={15} />
                  <span>{isSpeakingStep ? 'बोल रहा है...' : 'स्टेप 1 सुनें'}</span>
                </button>
              </div>

              <div className="step-section-box highlight">
                <h4 className="box-title">📍 शरीर में यह कहाँ स्थित है? (Anatomical Location)</h4>
                <p className="box-text">
                  {currentPart?.locationHinglish ||
                    `${currentChapter?.hindiTitle || 'इस तंत्र'} के प्रमुख हिस्से के रूप में स्थित है।`}
                </p>
                {currentPart?.latinName && (
                  <div className="latin-badge-row">
                    <span className="badge-label">लैटिन चिकित्सकीय नाम:</span>
                    <code>{currentPart.latinName}</code>
                  </div>
                )}
              </div>

              <div className="step-grid-2">
                <div className="step-info-card">
                  <h5>💡 रोचक एनाटॉमी तथ्य (Did You Know?)</h5>
                  <p>{currentPart?.funFactHinglish || 'मानव शरीर का अत्यंत विशिष्ट अंग।'}</p>
                </div>
                <div className="step-info-card">
                  <h5>🏛️ संबंधित तंत्र (Organ System)</h5>
                  <p>
                    {currentPart?.system?.toUpperCase() || currentChapter?.systemId?.toUpperCase()} —{' '}
                    {currentChapter?.subtitle || 'मानव शरीर विज्ञान का आधार'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Physiology & Bio-Mechanism */}
          {currentStep === 2 && (
            <div className="step-card fade-in">
              <div className="step-card-header">
                <div className="step-tag">चरण 2 / 5: कार्यप्रणाली एवं फिजियोलॉजी (How It Works)</div>
                <button
                  className={`speak-step-btn ${isSpeakingStep ? 'speaking' : ''}`}
                  onClick={() =>
                    speakCurrentStepText(
                      `${organName} की कार्यप्रणाली। यह कैसे कार्य करता है: ${currentPart?.functionHinglish || currentChapter?.howItWorksHinglish || ''}`
                    )
                  }
                >
                  <Volume2 size={15} />
                  <span>{isSpeakingStep ? 'बोल रहा है...' : 'स्टेप 2 सुनें'}</span>
                </button>
              </div>

              <div className="step-section-box function-box">
                <h4 className="box-title">⚙️ इसका मुख्य कार्य क्या है? (Primary Physiological Function)</h4>
                <p className="box-text">
                  {currentPart?.functionHinglish ||
                    currentChapter?.howItWorksHinglish ||
                    'जीवन की जैव-रासायनिक क्रियाओं और स्थिरता (Homeostasis) को निरंतर बनाए रखना।'}
                </p>
              </div>

              <div className="step-section-box">
                <h4 className="box-title">🩺 चिकित्सीय महत्व (Clinical Significance)</h4>
                <p className="box-text">{currentPart?.clinicalNoteHinglish || 'डॉक्टरी जांच व निदान का प्रमुख केंद्र।'}</p>
              </div>
            </div>
          )}

          {/* STEP 3: Common Diseases & Symptoms */}
          {currentStep === 3 && (
            <div className="step-card fade-in">
              <div className="step-card-header">
                <div className="step-tag">चरण 3 / 5: प्रमुख रोग, लक्षण एवं सावधानियां (Pathology)</div>
                <button
                  className={`speak-step-btn ${isSpeakingStep ? 'speaking' : ''}`}
                  onClick={() =>
                    speakCurrentStepText(
                      `${organName} से संबंधित प्रमुख रोग: ${currentPart?.relatedDiseases.join(', ') || 'सामान्य विकार'}। चेतावनी के लक्षण पहचानना जरूरी है।`
                    )
                  }
                >
                  <Volume2 size={15} />
                  <span>{isSpeakingStep ? 'बोल रहा है...' : 'स्टेप 3 सुनें'}</span>
                </button>
              </div>

              <div className="step-section-box alert-box">
                <h4 className="box-title">⚠️ इससे संबंधित प्रमुख बीमारियां (Associated Diseases)</h4>
                {currentPart?.relatedDiseases && currentPart.relatedDiseases.length > 0 ? (
                  <div className="disease-chips-row">
                    {currentPart.relatedDiseases.map((d, i) => (
                      <span key={i} className="disease-chip red">
                        🚨 {d}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="box-text">संक्रमण, इन्फ्लेमेशन और उम्र के साथ घिसाव इसके मुख्य रोग कारण हैं।</p>
                )}
              </div>

              {currentChapter?.commonDiseases && currentChapter.commonDiseases.length > 0 && (
                <div className="sample-disease-brief">
                  <h5>प्रमुख उदाहरण: {currentChapter.commonDiseases[0].hindiName}</h5>
                  <p>{currentChapter.commonDiseases[0].overview}</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Comprehensive Treatments & Home Care */}
          {currentStep === 4 && (
            <div className="step-card fade-in">
              <div className="step-card-header">
                <div className="step-tag">चरण 4 / 5: संपूर्ण उपचार, दवाएं एवं घरेलू उपाय (Treatments & Cures)</div>
                <button
                  className={`speak-step-btn ${isSpeakingStep ? 'speaking' : ''}`}
                  onClick={() => {
                    const treats = currentPart?.treatmentsHinglish?.join('. ') || '';
                    const meds = currentPart?.medications?.join(', ') || '';
                    speakCurrentStepText(`${organName} का संपूर्ण उपचार। डॉक्टरी इलाज: ${treats}। मुख्य औषधियां: ${meds}`);
                  }}
                >
                  <Volume2 size={15} />
                  <span>{isSpeakingStep ? 'बोल रहा है...' : 'स्टेप 4 सुनें'}</span>
                </button>
              </div>

              {/* Medical Treatments */}
              <div className="step-section-box treatment-box">
                <h4 className="box-title">💉 डॉक्टरी इलाज एवं प्रक्रियाएं (Medical Treatments)</h4>
                {currentPart?.treatmentsHinglish && currentPart.treatmentsHinglish.length > 0 ? (
                  <ul className="tutor-bullets">
                    {currentPart.treatmentsHinglish.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="box-text">
                    लक्षणों के आधार पर चिकित्सकीय निदान, आधुनिक दवाएं एवं आवश्यकता पड़ने पर मिनिमली इनवेसिव प्रक्रियाएं।
                  </p>
                )}
              </div>

              {/* Medications */}
              {currentPart?.medications && currentPart.medications.length > 0 && (
                <div className="step-section-box med-box">
                  <h4 className="box-title">💊 प्रमुख दवाएं (Key Standard Medications)</h4>
                  <div className="med-pills-row">
                    {currentPart.medications.map((m, idx) => (
                      <span key={idx} className="med-pill-tag">
                        💊 {m}
                      </span>
                    ))}
                  </div>
                  <span className="prescription-note">* दवाएं केवल पंजीकृत चिकित्सक के परामर्श पर ही लें।</span>
                </div>
              )}

              {/* Home Remedies & Lifestyle */}
              <div className="step-section-box home-box">
                <h4 className="box-title">🌿 घरेलू उपाय एवं सावधानियां (Home Care & Preventive Habits)</h4>
                {currentPart?.homeRemedies && currentPart.homeRemedies.length > 0 ? (
                  <ul className="tutor-bullets">
                    {currentPart.homeRemedies.map((hr, idx) => (
                      <li key={idx}>{hr}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="box-text">
                    संतुलित पौष्टिक आहार, पर्याप्त जल सेवन, रोजाना 30 मिनट हल्का व्यायाम और तनावमुक्त जीवनशैली।
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: Researcher Highlights & Quick Quiz */}
          {currentStep === 5 && (
            <div className="step-card fade-in">
              <div className="step-card-header">
                <div className="step-tag">चरण 5 / 5: शोधकर्ता नोट्स एवं ज्ञान परीक्षण (Research & Quiz)</div>
                <button
                  className={`speak-step-btn ${isSpeakingStep ? 'speaking' : ''}`}
                  onClick={() =>
                    speakCurrentStepText(
                      `${organName} के रिसर्च नोट्स। ${currentPart?.researchHighlights?.[0] || currentPart?.highYieldMnemonic || ''}`
                    )
                  }
                >
                  <Volume2 size={15} />
                  <span>{isSpeakingStep ? 'बोल रहा है...' : 'स्टेप 5 सुनें'}</span>
                </button>
              </div>

              {/* Research Pearls */}
              {currentPart?.researchHighlights && currentPart.researchHighlights.length > 0 && (
                <div className="step-section-box research-box">
                  <h4 className="box-title">🔬 नवीनतम क्लिनिकल रिसर्च (Clinical Research Highlights)</h4>
                  <ul className="tutor-bullets">
                    {currentPart.researchHighlights.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* NEET / MBBS Mnemonic */}
              {currentPart?.highYieldMnemonic && (
                <div className="step-section-box mnemonic-box">
                  <h4 className="box-title">⚡ याद रखने की गोल्डन ट्रिक (High-Yield Mnemonic)</h4>
                  <p className="box-text"><strong>{currentPart.highYieldMnemonic}</strong></p>
                </div>
              )}

              {/* Self-Check Mini Quiz */}
              <div className="step-quiz-card">
                <div className="quiz-head">
                  <HelpCircle size={16} className="text-accent" />
                  <h4>स्वयं परखें (Quick Self-Test):</h4>
                </div>
                <p className="quiz-question">
                  <strong>प्रश्न:</strong> {organName} का मुख्य कार्य क्या है?
                </p>
                <div className="quiz-options-grid">
                  <button
                    className={`quiz-opt-btn ${quizAnswer === 1 ? 'correct' : ''}`}
                    onClick={() => setQuizAnswer(1)}
                  >
                    <span>A) {currentPart?.functionHinglish.slice(0, 60) || 'जैव-रासायनिक नियंत्रण'}...</span>
                    {quizAnswer === 1 && <span className="ans-tag correct">✅ सही उत्तर!</span>}
                  </button>
                  <button
                    className={`quiz-opt-btn ${quizAnswer === 2 ? 'wrong' : ''}`}
                    onClick={() => setQuizAnswer(2)}
                  >
                    <span>B) केवल शरीर का वजन बढ़ाना</span>
                    {quizAnswer === 2 && <span className="ans-tag wrong">❌ गलत, पुनः प्रयास करें</span>}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="ai-tutor-footer">
          <button
            className="tutor-nav-btn"
            onClick={() => {
              setCurrentStep(prev => Math.max(1, prev - 1));
              setQuizAnswer(null);
            }}
            disabled={currentStep === 1}
          >
            <ChevronLeft size={16} />
            <span>पिछला स्टेप (Prev)</span>
          </button>

          <span className="step-counter-text">
            स्टेप <strong>{currentStep}</strong> of 5
          </span>

          {currentStep < 5 ? (
            <button
              className="tutor-nav-btn primary"
              onClick={() => {
                setCurrentStep(prev => Math.min(5, prev + 1));
                setQuizAnswer(null);
              }}
            >
              <span>अगला स्टेप (Next)</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button className="tutor-nav-btn success" onClick={onClose}>
              <CheckCircle2 size={16} />
              <span>अध्ययन संपन्न (Complete)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
