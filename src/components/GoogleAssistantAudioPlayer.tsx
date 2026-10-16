import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Square, Sparkles, X, FastForward, RotateCcw } from 'lucide-react';
import type { StudyPartItem, BookChapter } from '../types/atlas';

interface Props {
  currentPart?: StudyPartItem;
  currentChapter?: BookChapter;
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleAssistantAudioPlayer: React.FC<Props> = ({
  currentPart,
  currentChapter,
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(1.0);
  const [voiceLang, setVoiceLang] = useState<'hi' | 'en'>('hi');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available voices
  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const avail = window.speechSynthesis.getVoices();
        setVoices(avail);
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Construct text script to be read out
  const buildNarrationScript = useCallback((): string => {
    if (!currentPart) {
      if (currentChapter) {
        return `नमस्ते, मैं आपकी गूगल असिस्टेंट एनाटॉमी रीडर हूँ। आज हम अध्ययन कर रहे हैं ${currentChapter.hindiTitle}। ${currentChapter.subtitle}। ${currentChapter.introductionHinglish}। ${currentChapter.howItWorksHinglish}`;
      }
      return 'नमस्ते, मैं आपकी गूगल असिस्टेंट एनाटॉमी रीडर हूँ। कृपया अध्ययन करने के लिए किसी भी अंग को चुनें।';
    }

    const treatmentsText = currentPart.treatmentsHinglish && currentPart.treatmentsHinglish.length > 0
      ? `उपचार और रोकथाम के उपाय: ${currentPart.treatmentsHinglish.join('. ')}।`
      : '';

    const medicationsText = currentPart.medications && currentPart.medications.length > 0
      ? `मुख्य औषधियां और दवाएं: ${currentPart.medications.join(', ')}।`
      : '';

    const homeCareText = currentPart.homeRemedies && currentPart.homeRemedies.length > 0
      ? `घरेलू देखभाल और सावधानियां: ${currentPart.homeRemedies.join('. ')}।`
      : '';

    const researchText = currentPart.researchHighlights && currentPart.researchHighlights.length > 0
      ? `रिसर्च और वैज्ञानिक तथ्य: ${currentPart.researchHighlights.join('. ')}।`
      : '';

    if (voiceLang === 'en') {
      return `Hello, I am your Google Assistant Anatomy Reader. Today we are exploring the ${currentPart.name}. Latin name: ${currentPart.latinName || currentPart.name}. Location: ${currentPart.locationHinglish}. Function: ${currentPart.functionHinglish}. Clinical note: ${currentPart.clinicalNoteHinglish}. ${treatmentsText} ${researchText}`;
    }

    return `नमस्ते, मैं आपकी गूगल असिस्टेंट एनाटॉमी रीडर हूँ। आज हम विस्तार से समझ रहे हैं ${currentPart.hindiName}, जिसे अंग्रेजी में ${currentPart.name} कहते हैं। 
यह शरीर में ${currentPart.locationHinglish}। 
इसका मुख्य कार्य है: ${currentPart.functionHinglish}। 
रोचक तथ्य: ${currentPart.funFactHinglish}। 
चिकित्सीय महत्व: ${currentPart.clinicalNoteHinglish}। 
${treatmentsText} 
${medicationsText} 
${homeCareText} 
${researchText} 
धन्यवाद, स्वस्थ रहें और सीखते रहें।`;
  }, [currentPart, currentChapter, voiceLang]);

  // Handle Play
  const handlePlay = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      alert('आपके ब्राउज़र में Speech Synthesis समर्थित नहीं है।');
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const script = buildNarrationScript();
    const utterance = new SpeechSynthesisUtterance(script);
    utteranceRef.current = utterance;

    // Pick best natural voice (prefer Google हिन्दी or hi-IN)
    if (voiceLang === 'hi') {
      const hiVoice = voices.find(
        v => v.lang.includes('hi') || v.name.includes('Hindi') || v.name.includes('Google हिन्दी')
      );
      if (hiVoice) utterance.voice = hiVoice;
      utterance.lang = 'hi-IN';
    } else {
      const enVoice = voices.find(
        v => (v.lang.includes('en-IN') || v.lang.includes('en-US')) && v.name.includes('Google')
      );
      if (enVoice) utterance.voice = enVoice;
      utterance.lang = 'en-US';
    }

    utterance.rate = rate;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [buildNarrationScript, isPaused, rate, voiceLang, voices]);

  // Handle Pause
  const handlePause = () => {
    if ('speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  // Handle Stop
  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  // Change speed rate
  const toggleRate = () => {
    const nextRate = rate === 1.0 ? 1.25 : rate === 1.25 ? 1.5 : rate === 1.5 ? 0.85 : 1.0;
    setRate(nextRate);
    if (isPlaying) {
      handleStop();
      setTimeout(() => handlePlay(), 150);
    }
  };

  // Stop when closed or part changes
  useEffect(() => {
    if (!isOpen && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const partName = currentPart?.hindiName || currentChapter?.hindiTitle || 'मानव शरीर विज्ञान';

  return (
    <div className="google-assistant-player-dock glass-panel">
      {/* Wave animation and assistant badge */}
      <div className="player-brand-row">
        <div className="assistant-badge">
          <span className="assistant-dot pulse"></span>
          <Sparkles size={14} className="text-accent" />
          <span className="assistant-name">Google Assistant Voice Reader</span>
        </div>

        <div className="player-right-controls">
          <button
            className={`lang-toggle-btn ${voiceLang === 'hi' ? 'active' : ''}`}
            onClick={() => {
              setVoiceLang(prev => (prev === 'hi' ? 'en' : 'hi'));
              if (isPlaying) handleStop();
            }}
            title="भाषा बदलें"
          >
            {voiceLang === 'hi' ? '🇮🇳 हिन्दी' : '🌐 English'}
          </button>
          <button className="close-player-btn" onClick={onClose} title="बंद करें">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Title & Playing Status */}
      <div className="player-info-row">
        <div className="player-text">
          <h4 className="player-target-title">{partName}</h4>
          <p className="player-target-subtitle">
            {isPlaying
              ? 'आवाज़ में संपूर्ण विवरण व उपचार पढ़ा जा रहा है...'
              : isPaused
              ? 'ऑडियो रुका हुआ है (Paused)'
              : 'सुनने के लिए प्ले बटन दबाएं'}
          </p>
        </div>

        {/* Audio Waveform Equalizer */}
        <div className={`audio-equalizer ${isPlaying ? 'active' : ''}`}>
          <span className="eq-bar bar-1"></span>
          <span className="eq-bar bar-2"></span>
          <span className="eq-bar bar-3"></span>
          <span className="eq-bar bar-4"></span>
          <span className="eq-bar bar-5"></span>
        </div>
      </div>

      {/* Player Controls Bar */}
      <div className="player-controls-bar">
        <button
          className="rate-btn"
          onClick={toggleRate}
          title="आवाज़ की गति बदलें"
        >
          <FastForward size={13} />
          <span>{rate}x</span>
        </button>

        <button
          className="stop-btn"
          onClick={handleStop}
          disabled={!isPlaying && !isPaused}
          title="रोकें"
        >
          <Square size={14} />
        </button>

        <button
          className="primary-play-btn"
          onClick={isPlaying ? handlePause : handlePlay}
          title={isPlaying ? 'पॉज करें' : 'शुरू करें'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
          <span>{isPlaying ? 'पॉज (Pause)' : 'बोलकर सुनाएं (Play)'}</span>
        </button>

        <button
          className="restart-btn"
          onClick={() => {
            handleStop();
            setTimeout(handlePlay, 100);
          }}
          title="शुरू से सुनें"
        >
          <RotateCcw size={14} />
          <span>पुनः</span>
        </button>
      </div>
    </div>
  );
};
