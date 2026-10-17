import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Volume2,
  Sparkles,
  BookOpen,
  X,
  Crosshair,
  ShieldCheck,
  Stethoscope,
  Pill,
} from 'lucide-react';
import type { StudyPartItem } from '../types/atlas';
import { AnatomyStudyVisual } from './AnatomyStudyVisual';

interface SideOrganInspectorProps {
  part: StudyPartItem | null;
  isIsolated: boolean;
  onToggleIsolate: () => void;
  onOpenAudioPlayer: () => void;
  onOpenAITutor: () => void;
  onOpenInBook?: () => void;
  onClose: () => void;
}

export const SideOrganInspector: React.FC<SideOrganInspectorProps> = ({
  part,
  isIsolated,
  onToggleIsolate,
  onOpenAudioPlayer,
  onOpenAITutor,
  onOpenInBook,
  onClose,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!part) return null;

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${part.hindiName}, ${part.name}`);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <aside className="side-organ-inspector-drawer glass-panel slide-in-right">
      {/* Drawer Header */}
      <div className="inspector-header">
        <div className="inspector-title-col">
          <div className="inspector-badge-row">
            <span className="selected-tag">
              <Crosshair size={12} className="inline-icon text-accent" /> चयनित 3D संरचना
            </span>
            <span className="system-pill">{part.system}</span>
          </div>

          <div className="inspector-name-row">
            <h3 className="inspector-hindi-name">{part.hindiName}</h3>
            <button
              className={`inspector-speak-btn ${isSpeaking ? 'speaking' : ''}`}
              onClick={handleSpeak}
              title="उच्चारण सुनें (Listen)"
            >
              <Volume2 size={16} />
            </button>
          </div>

          <div className="inspector-sub-name">
            <span className="english-name">{part.name}</span>
            {part.latinName && <span className="latin-name">· {part.latinName}</span>}
          </div>
        </div>

        <button className="inspector-close-btn" onClick={onClose} title="पैनल बंद करें (Close)">
          <X size={18} />
        </button>
      </div>

      {/* Action Buttons Row */}
      <div className="inspector-actions-grid">
        <button
          className={`inspector-action-btn isolate-btn ${isIsolated ? 'active' : ''}`}
          onClick={onToggleIsolate}
          title={isIsolated ? 'पूरा शरीर देखें' : '3D में केवल यही अंग देखें'}
        >
          {isIsolated ? <EyeOff size={15} /> : <Eye size={15} />}
          <span>{isIsolated ? 'पूरा शरीर' : '3D Isolate'}</span>
        </button>

        <button
          className="inspector-action-btn voice-btn"
          onClick={onOpenAudioPlayer}
          title="Google Assistant से इसका विवरण सुनें"
        >
          <Volume2 size={15} />
          <span>सुनें (Audio)</span>
        </button>

        <button
          className="inspector-action-btn tutor-btn"
          onClick={onOpenAITutor}
          title="AI ट्यूटर द्वारा स्टेप्स में सीखें"
        >
          <Sparkles size={15} />
          <span>AI ट्यूटर</span>
        </button>

        {onOpenInBook && (
          <button
            className="inspector-action-btn book-btn"
            onClick={onOpenInBook}
            title="विस्तृत अध्याय अध्ययन में खोलें"
          >
            <BookOpen size={15} />
            <span>पुस्तक में</span>
          </button>
        )}
      </div>

      {/* Content Scrollable Body */}
      <div className="inspector-scroll-content">
        <AnatomyStudyVisual
          name={part.name}
          hindiName={part.hindiName}
          latinName={part.latinName}
          system={part.system}
        />

        {/* Function */}
        <div className="inspector-info-card">
          <div className="card-label">
            <ShieldCheck size={14} className="text-accent" />
            <span>कार्यप्रणाली (Physiological Function)</span>
          </div>
          <p className="card-desc">{part.functionHinglish}</p>
        </div>

        {/* Location */}
        <div className="inspector-info-card">
          <div className="card-label">
            <span>📍 शरीर में स्थिति (Location)</span>
          </div>
          <p className="card-desc">{part.locationHinglish}</p>
        </div>

        {/* Clinical Note */}
        {part.clinicalNoteHinglish && (
          <div className="inspector-info-card clinical-highlight">
            <div className="card-label">
              <Stethoscope size={14} className="text-warning" />
              <span>चिकित्सीय महत्व (Clinical Significance)</span>
            </div>
            <p className="card-desc">{part.clinicalNoteHinglish}</p>
          </div>
        )}

        {/* Treatments & Precautions */}
        {part.treatmentsHinglish && part.treatmentsHinglish.length > 0 && (
          <div className="inspector-info-card treatments-highlight">
            <div className="card-label">
              <Pill size={14} className="text-success" />
              <span>उपचार व सावधानियां (Care & Advice)</span>
            </div>
            <ul className="treatments-bullet-list">
              {part.treatmentsHinglish.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Fun Fact / Anatomy Insight */}
        {part.funFactHinglish && (
          <div className="inspector-info-card insight-card">
            <div className="card-label">
              <Sparkles size={14} className="text-accent" />
              <span>रोचक मेडिकल तथ्य (Insight)</span>
            </div>
            <p className="card-desc">{part.funFactHinglish}</p>
          </div>
        )}
      </div>
    </aside>
  );
};
