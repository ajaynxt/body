import React from 'react';
import { Eye, EyeOff, Volume2, Sparkles, X, Crosshair } from 'lucide-react';
import type { StudyPartItem } from '../types/atlas';

interface Props {
  part: StudyPartItem | null;
  isIsolated: boolean;
  onToggleIsolate: () => void;
  onOpenAudioPlayer: () => void;
  onOpenAITutor: () => void;
  onClose: () => void;
}

export const QuickOrganFocusBar: React.FC<Props> = ({
  part,
  isIsolated,
  onToggleIsolate,
  onOpenAudioPlayer,
  onOpenAITutor,
  onClose,
}) => {
  if (!part) return null;

  return (
    <div className="quick-organ-focus-pill glass-panel fade-in">
      {/* Organ Title & System Icon */}
      <div className="focus-pill-meta">
        <div className="focus-icon-wrap">
          <Crosshair size={16} className="text-accent" />
        </div>
        <div className="focus-text-wrap">
          <div className="focus-title-row">
            <h4 className="focus-organ-name">{part.hindiName}</h4>
            <span className="focus-latin-name">{part.name}</span>
          </div>
          <div className="focus-sub-tags">
            <span className="system-chip">{part.system}</span>
            {part.latinName && <span className="latin-chip">{part.latinName}</span>}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="focus-pill-actions">
        {/* Solo Focus / Isolate Toggle (click kre to ek ek cheez dikhe) */}
        <button
          className={`focus-action-btn solo-btn ${isIsolated ? 'active' : ''}`}
          onClick={onToggleIsolate}
          title={isIsolated ? 'पूरा शरीर देखें (Show Full Body)' : 'केवल यही अंग 3D में देखें (Solo Focus)'}
        >
          {isIsolated ? <EyeOff size={15} /> : <Eye size={15} />}
          <span>{isIsolated ? 'पूरा शरीर (Show All)' : 'केवल यही अंग देखें (Solo)'}</span>
        </button>

        {/* Google Assistant Audio Reader */}
        <button
          className="focus-action-btn audio-btn"
          onClick={onOpenAudioPlayer}
          title="Google Assistant से इसका विवरण व उपचार सुनें"
        >
          <Volume2 size={15} />
          <span>सुनें (Listen)</span>
        </button>

        {/* Step-by-Step AI Tutor */}
        <button
          className="focus-action-btn tutor-btn"
          onClick={onOpenAITutor}
          title="AI से इसके बारे में 5 स्टेप्स में सीखें"
        >
          <Sparkles size={15} />
          <span>AI स्टेप गाइड</span>
        </button>

        {/* Dismiss focus button */}
        <button className="focus-close-btn" onClick={onClose} title="फोकस हटाएं">
          <X size={15} />
        </button>
      </div>
    </div>
  );
};
