import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, XCircle, ArrowRight, X, Brain, Sparkles } from 'lucide-react';
import { BOOK_CHAPTERS } from '../data/chapters';
import type { StudyPartItem } from '../types/atlas';

interface StudentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHighlightPart: (part: StudyPartItem) => void;
}

interface Question {
  targetPart: StudyPartItem;
  options: StudyPartItem[];
  hint: string;
}

export const StudentQuizModal: React.FC<StudentQuizModalProps> = ({
  isOpen,
  onClose,
  onHighlightPart,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);

  // All parts flattened
  const allParts: StudyPartItem[] = BOOK_CHAPTERS.flatMap(ch => ch.parts);

  const generateQuestion = () => {
    if (allParts.length < 4) return;

    // Pick a random target part
    const randomIndex = Math.floor(Math.random() * allParts.length);
    const target = allParts[randomIndex];

    // Pick 3 random distractor parts from other systems if possible
    const distractors = allParts
      .filter(p => p.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // Shuffle options
    const options = [target, ...distractors].sort(() => 0.5 - Math.random());

    setCurrentQuestion({
      targetPart: target,
      options,
      hint: target.functionHinglish,
    });
    setSelectedAnswer(null);
    setIsAnswered(false);

    // Highlight target organ in 3D
    onHighlightPart(target);
  };

  useEffect(() => {
    if (isOpen) {
      generateQuestion();
    }
  }, [isOpen]);

  if (!isOpen || !currentQuestion) return null;

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;

    setSelectedAnswer(optionId);
    setIsAnswered(true);
    setTotalQuestionsAnswered(prev => prev + 1);

    if (optionId === currentQuestion.targetPart.id) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    generateQuestion();
  };

  const isCorrect = selectedAnswer === currentQuestion.targetPart.id;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="quiz-modal-card glass-panel" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="header-left">
            <div className="header-icon-box" style={{ background: 'rgba(79, 70, 229, 0.12)' }}>
              <Brain size={22} style={{ color: '#4f46e5' }} />
            </div>
            <div>
              <h3 className="modal-title">3D अंग पहचानो क्विज़ (Active Recall Quiz)</h3>
              <p className="modal-subtitle">
                3D मॉडल में हाइलाइट किए गए अंग को पहचानिए और अपना स्कोर बढ़ाइए!
              </p>
            </div>
          </div>

          <div className="quiz-score-header">
            <div className="score-badge">
              <Award size={15} className="text-warning" />
              <span>स्कोर: {score}</span>
            </div>
            {streak > 1 && (
              <div className="streak-badge">
                <Sparkles size={13} />
                <span>{streak}x स्ट्रीक! 🔥</span>
              </div>
            )}
            <button className="close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Quiz Body */}
        <div className="quiz-modal-body">
          <div className="quiz-prompt-card">
            <span className="quiz-step-tag">
              प्रश्न #{totalQuestionsAnswered + 1}
            </span>
            <h4 className="quiz-question-title">
              3D मॉडल में सियान (Cyan) रंग में चमक रहे अंग का क्या नाम है?
            </h4>
            <p className="quiz-hint-text">
              <strong>💡 हिंट (Function):</strong> {currentQuestion.hint}
            </p>
          </div>

          {/* 4 Interactive Option Buttons */}
          <div className="quiz-options-grid">
            {currentQuestion.options.map(opt => {
              const isThisSelected = selectedAnswer === opt.id;
              const isThisCorrect = opt.id === currentQuestion.targetPart.id;

              let btnClass = 'quiz-option-btn';
              if (isAnswered) {
                if (isThisCorrect) btnClass += ' correct-option';
                else if (isThisSelected) btnClass += ' wrong-option';
                else btnClass += ' disabled-option';
              }

              return (
                <button
                  key={opt.id}
                  className={btnClass}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={isAnswered}
                >
                  <div className="option-title-row">
                    <span className="option-hindi-name">{opt.hindiName}</span>
                    <span className="option-eng-name">{opt.name}</span>
                  </div>
                  {isAnswered && isThisCorrect && (
                    <CheckCircle2 size={18} className="text-success" />
                  )}
                  {isAnswered && isThisSelected && !isThisCorrect && (
                    <XCircle size={18} className="text-danger" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Card */}
          {isAnswered && (
            <div
              className={`quiz-feedback-card ${
                isCorrect ? 'feedback-correct' : 'feedback-wrong'
              }`}
            >
              <div className="feedback-header">
                {isCorrect ? (
                  <div className="feedback-result-line text-success">
                    <CheckCircle2 size={18} />
                    <strong>शाबाश! बिल्कुल सही उत्तर (+10 अंक)</strong>
                  </div>
                ) : (
                  <div className="feedback-result-line text-danger">
                    <XCircle size={18} />
                    <strong>गलत जवाब! सही उत्तर था: {currentQuestion.targetPart.hindiName} ({currentQuestion.targetPart.name})</strong>
                  </div>
                )}

                <button className="next-question-btn" onClick={handleNext}>
                  <span>अगला प्रश्न (Next Question)</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="feedback-details">
                <p>
                  <strong>🩺 चिकित्सीय नोट:</strong>{' '}
                  {currentQuestion.targetPart.clinicalNoteHinglish}
                </p>
                <p>
                  <strong>💡 रोचक तथ्य:</strong>{' '}
                  {currentQuestion.targetPart.funFactHinglish}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
