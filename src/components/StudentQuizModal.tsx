import React, { useState, useEffect } from 'react';
import {
  Brain,
  CheckCircle2,
  XCircle,
  X,
  Sparkles,
  Trophy,
  Flame,
  Shuffle,
  Eye,
  Filter,
} from 'lucide-react';
import {
  generateRandomQuestion,
  type QuizQuestion,
  type QuizFilterSystem,
} from '../data/questionBankEngine';
import type { BookChapter, StudyPartItem } from '../types/atlas';
import { BOOK_CHAPTERS } from '../data/chapters';

interface StudentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHighlightPart: (part: StudyPartItem) => void;
  chapters: BookChapter[];
}

export const StudentQuizModal: React.FC<StudentQuizModalProps> = ({
  isOpen,
  onClose,
  onHighlightPart,
  chapters,
}) => {
  const studyChapters = chapters.length > 0 ? chapters : BOOK_CHAPTERS;
  const studyParts = studyChapters.flatMap(chapter => chapter.parts);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [activeFilter, setActiveFilter] = useState<QuizFilterSystem>('all');

  // Stats & Progress
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const fetchNextQuestion = (filter: QuizFilterSystem = activeFilter) => {
    const q = generateRandomQuestion(filter, studyChapters);
    setCurrentQuestion(q);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);

    // If question has relatedPartId, highlight in 3D
    if (q.relatedPartId) {
      const part = studyParts.find(p => p.id === q.relatedPartId);
      if (part) {
        onHighlightPart(part);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNextQuestion(activeFilter);
    }
  }, [isOpen]);

  const handleFilterChange = (filter: QuizFilterSystem) => {
    setActiveFilter(filter);
    fetchNextQuestion(filter);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedAnswerIndex(idx);
    setIsAnswered(true);
    setTotalQuestionsAnswered(prev => prev + 1);

    if (idx === currentQuestion.correctIndex) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      setCorrectAnswers(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  if (!isOpen || !currentQuestion) return null;

  const isCorrect = selectedAnswerIndex === currentQuestion.correctIndex;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="quiz-modal-card glass-panel master-quiz-container" onClick={e => e.stopPropagation()}>
        {/* Top Header */}
        <div className="modal-header">
          <div className="header-left">
            <div className="header-icon-box quiz-icon-gradient">
              <Brain size={24} className="text-accent" />
            </div>
            <div>
              <div className="quiz-badge-row">
                <span className="quiz-pill-total">रैंडमाइज़्ड मेडिकल प्रश्न बैंक</span>
                <span className="quiz-pill-cat">{currentQuestion.categoryHindi}</span>
              </div>
              <h3 className="modal-title">3D एनाटॉमी एवं क्लिनिकल क्विज़ (Active Recall)</h3>
            </div>
          </div>

          <div className="header-right-stats">
            <div className="quiz-stat-chip">
              <Trophy size={14} className="text-warning" />
              <span>{score} XP ({correctAnswers} सही)</span>
            </div>
            {streak > 1 && (
              <div className="quiz-stat-chip streak-chip">
                <Flame size={14} className="text-danger" />
                <span>{streak} Streak!</span>
              </div>
            )}
            <button className="close-btn" onClick={onClose} title="बंद करें">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filter Categories Bar */}
        <div className="quiz-filter-bar">
          <span className="filter-label">
            <Filter size={13} />
            विषय चुनें:
          </span>
          <div className="filter-scroll-row">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              🎲 संपूर्ण शरीर (All Systems)
            </button>
            <button
              className={`filter-btn ${activeFilter === 'cardiac' ? 'active' : ''}`}
              onClick={() => handleFilterChange('cardiac')}
            >
              ❤️ हृदय व परिसंचरण
            </button>
            <button
              className={`filter-btn ${activeFilter === 'skeletal' ? 'active' : ''}`}
              onClick={() => handleFilterChange('skeletal')}
            >
              🦴 कंकाल तंत्र
            </button>
            <button
              className={`filter-btn ${activeFilter === 'muscular' ? 'active' : ''}`}
              onClick={() => handleFilterChange('muscular')}
            >
              💪 मांसपेशियां व दर्द
            </button>
            <button
              className={`filter-btn ${activeFilter === 'nervous' ? 'active' : ''}`}
              onClick={() => handleFilterChange('nervous')}
            >
              🧠 मस्तिष्क व तंत्रिका
            </button>
            <button
              className={`filter-btn ${activeFilter === 'respiratory' ? 'active' : ''}`}
              onClick={() => handleFilterChange('respiratory')}
            >
              🫁 श्वसन तंत्र
            </button>
            <button
              className={`filter-btn ${activeFilter === 'digestive' ? 'active' : ''}`}
              onClick={() => handleFilterChange('digestive')}
            >
              पाचन तंत्र
            </button>
            <button
              className={`filter-btn ${activeFilter === 'urinary' ? 'active' : ''}`}
              onClick={() => handleFilterChange('urinary')}
            >
              💧 मूत्र एवं उत्सर्जन तंत्र
            </button>
            <button
              className={`filter-btn ${activeFilter === 'reproductive' ? 'active' : ''}`}
              onClick={() => handleFilterChange('reproductive')}
            >
              🧬 प्रजनन तंत्र
            </button>
            <button
              className={`filter-btn ${activeFilter === 'clinical' ? 'active' : ''}`}
              onClick={() => handleFilterChange('clinical')}
            >
              🚨 रोग, उपचार व Red Flags
            </button>
          </div>
        </div>

        {/* Question Area */}
        <div className="quiz-body-content">
          <div className="question-header-card">
            <div className="question-meta-row">
              <span className="question-count-badge">
                प्रश्न #{totalQuestionsAnswered + 1}
              </span>
              <span className="difficulty-tag">{currentQuestion.difficulty}</span>
              {currentQuestion.highYieldMnemonic && (
                <span className="mnemonic-tag">
                  <Sparkles size={12} />
                  Trick Available
                </span>
              )}
            </div>

            <h2 className="main-question-hindi">{currentQuestion.questionHindi}</h2>
            <p className="sub-question-en">{currentQuestion.questionText}</p>
          </div>

          {/* Interactive Click Options (Pahle click karein, fir answer dikhaye) */}
          <div className="options-grid-container">
            {currentQuestion.options.map((option, idx) => {
              const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D
              let stateClass = '';

              if (isAnswered) {
                if (idx === currentQuestion.correctIndex) {
                  stateClass = 'option-correct';
                } else if (idx === selectedAnswerIndex) {
                  stateClass = 'option-wrong';
                } else {
                  stateClass = 'option-dimmed';
                }
              }

              return (
                <button
                  key={idx}
                  className={`quiz-option-card ${stateClass}`}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                >
                  <span className="option-letter-badge">{optionLetter}</span>
                  <span className="option-text">{option}</span>
                  {isAnswered && idx === currentQuestion.correctIndex && (
                    <CheckCircle2 size={18} className="option-state-icon text-success" />
                  )}
                  {isAnswered && idx === selectedAnswerIndex && idx !== currentQuestion.correctIndex && (
                    <XCircle size={18} className="option-state-icon text-danger" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation Box (Unfolds ONLY after selection) */}
          {isAnswered && (
            <div className={`explanation-reveal-card ${isCorrect ? 'correct-glow' : 'wrong-glow'}`}>
              <div className="explanation-status-row">
                {isCorrect ? (
                  <div className="status-badge success-badge">
                    <CheckCircle2 size={16} />
                    <span>शानदार! बिल्कुल सही उत्तर (+10 XP)</span>
                  </div>
                ) : (
                  <div className="status-badge error-badge">
                    <XCircle size={16} />
                    <span>गलत उत्तर — सही उत्तर <strong>विकल्प {String.fromCharCode(65 + currentQuestion.correctIndex)}</strong> है</span>
                  </div>
                )}
              </div>

              <div className="explanation-text-block">
                <p className="exp-hindi">
                  <strong>चिकित्सीय व्याख्या (Clinical Explanation):</strong> {currentQuestion.explanationHindi}
                </p>
                {currentQuestion.highYieldMnemonic && (
                  <div className="mnemonic-box">
                    <Sparkles size={14} className="text-warning" />
                    <span>
                      <strong>याद रखने की ट्रिक (Mnemonic):</strong> {currentQuestion.highYieldMnemonic}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Actions Row */}
              <div className="explanation-actions-row">
                {currentQuestion.relatedPartId && (
                  <button
                    className="view-3d-btn"
                    onClick={() => {
                      const part = studyParts.find(p => p.id === currentQuestion.relatedPartId);
                      if (part) {
                        onHighlightPart(part);
                        onClose();
                      }
                    }}
                  >
                    <Eye size={15} />
                    <span>3D मॉडल में देखें</span>
                  </button>
                )}

                <button
                  className="next-random-btn"
                  onClick={() => fetchNextQuestion(activeFilter)}
                >
                  <Shuffle size={16} />
                  <span>अगला रैंडम प्रश्न ➜</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
