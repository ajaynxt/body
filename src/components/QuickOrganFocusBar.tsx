import React from 'react';
import {
  Eye,
  EyeOff,
  Volume2,
  Sparkles,
  X,
  Crosshair,
  EyeClosed,
  RotateCcw,
  Layers,
  Zap,
} from 'lucide-react';
import type { StudyPartItem } from '../types/atlas';

interface Props {
  part: StudyPartItem | null;
  isIsolated: boolean;
  onToggleIsolate: () => void;
  onHidePart: () => void;
  isPartHidden?: boolean;
  hiddenPartsCount?: number;
  onUnhideAll?: () => void;
  isMusclesVisible?: boolean;
  onToggleMuscles?: () => void;
  onOpenAudioPlayer: () => void;
  onOpenAITutor: () => void;
  onOpenStudentZone?: () => void;
  onClose: () => void;
}

export const QuickOrganFocusBar: React.FC<Props> = ({
  part,
  isIsolated,
  onToggleIsolate,
  onHidePart,
  isPartHidden = false,
  hiddenPartsCount = 0,
  onUnhideAll,
  isMusclesVisible = true,
  onToggleMuscles,
  onOpenAudioPlayer,
  onOpenAITutor,
  onOpenStudentZone,
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
            <span className="focus-latin-name">{part.latinName || part.name}</span>
          </div>
          <div className="focus-sub-tags">
            <span className="system-chip">{part.system}</span>
            {part.functionHinglish && (
              <span className="function-chip-snip">
                {part.functionHinglish.slice(0, 48)}...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="focus-pill-actions">
        {/* Solo Focus / Isolate Toggle (केवल यही अंग 3D में देखें) */}
        <button
          className={`focus-action-btn solo-btn ${isIsolated ? 'active' : ''}`}
          onClick={onToggleIsolate}
          title={isIsolated ? 'पूरा शरीर देखें (Show Full Body)' : 'केवल यही अंग 3D में देखें (Solo Isolate)'}
        >
          {isIsolated ? <EyeOff size={15} /> : <Eye size={15} />}
          <span>{isIsolated ? 'पूरा शरीर' : 'केवल यही अंग (Solo)'}</span>
        </button>

        {/* Hide This Specific Organ / Muscle (इस अंग को छुपाएं) */}
        <button
          className="focus-action-btn hide-part-btn"
          onClick={onHidePart}
          title="इस अंग को छुपाएं ताकि इसके पीछे का अंग देख सकें (Hide Part)"
        >
          <EyeClosed size={15} className="text-warning" />
          <span>{isPartHidden ? 'छुपा हुआ है' : 'यह अंग छुपाएं'}</span>
        </button>

        {/* Quick Muscle Layer Toggle (मांसपेशियां छुपाएं / दिखाएं) */}
        {onToggleMuscles && (
          <button
            className={`focus-action-btn muscle-toggle-btn ${!isMusclesVisible ? 'active-warning' : ''}`}
            onClick={onToggleMuscles}
            title={isMusclesVisible ? 'सभी मांसपेशियां छुपाएं (Hide All Muscles)' : 'मांसपेशियां दिखाएं (Show Muscles)'}
          >
            <Layers size={15} />
            <span>{isMusclesVisible ? 'मांसपेशी छुपाएं' : 'मांसपेशी दिखाएं'}</span>
          </button>
        )}

        {/* Unhide All Parts (अगर कोई अंग छुपाया गया हो) */}
        {hiddenPartsCount > 0 && onUnhideAll && (
          <button
            className="focus-action-btn unhide-all-btn"
            onClick={onUnhideAll}
            title={`सभी ${hiddenPartsCount} छुपे हुए अंग वापस लाएं`}
          >
            <RotateCcw size={14} className="text-accent" />
            <span>सब वापस लाएं ({hiddenPartsCount})</span>
          </button>
        )}

        {/* Google Assistant Voice Reader */}
        <button
          className="focus-action-btn audio-btn"
          onClick={onOpenAudioPlayer}
          title="Google Assistant से इसका विवरण व चिकित्सा तथ्य सुनें"
        >
          <Volume2 size={15} />
          <span>सुनें</span>
        </button>

        {/* Step-by-Step AI Tutor */}
        <button
          className="focus-action-btn tutor-btn"
          onClick={onOpenAITutor}
          title="AI से 5 स्टेप्स में सीखें"
        >
          <Sparkles size={15} />
          <span>AI गाइड</span>
        </button>

        {/* Student Fun Zone (Stethoscope, Cadaver Dissection, Mnemonics) */}
        {onOpenStudentZone && (
          <button
            className="focus-action-btn student-pill-btn"
            onClick={onOpenStudentZone}
            title="स्टूडेंट ज़ोन: स्टेथोस्कोप, डिसेक्शन व टॉपर ट्रिक्स"
          >
            <Zap size={14} className="text-warning" />
            <span>स्टूडेंट ज़ोन ⚡</span>
          </button>
        )}

        {/* Dismiss focus button */}
        <button className="focus-close-btn" onClick={onClose} title="फोकस हटाएं">
          <X size={15} />
        </button>
      </div>
    </div>
  );
};
