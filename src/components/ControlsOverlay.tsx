import { RotateCcw, Play, Pause, Layers } from 'lucide-react';

interface ControlsOverlayProps {
  explodeValue: number;
  onExplodeChange: (val: number) => void;
  currentView: 'three-quarter' | 'front' | 'side' | 'back';
  onSetViewPreset: (preset: 'three-quarter' | 'front' | 'side' | 'back') => void;
  isAutoRotating: boolean;
  onToggleAutoRotate: () => void;
  onReset: () => void;
  captionText: string;
  isIsolated: boolean;
  onClearIsolate: () => void;
}

export const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  explodeValue,
  onExplodeChange,
  currentView,
  onSetViewPreset,
  isAutoRotating,
  onToggleAutoRotate,
  onReset,
  captionText,
  isIsolated,
  onClearIsolate,
}) => {
  return (
    <div className="controls-overlay-container pointer-events-none">
      {/* Top Floating View Angle Presets */}
      <div className="view-presets-pill glass-panel pointer-events-auto">
        <button
          className={`preset-btn ${currentView === 'three-quarter' ? 'active' : ''}`}
          onClick={() => onSetViewPreset('three-quarter')}
          title="¾ Three-Quarter Perspective"
        >
          <span>¾</span>
        </button>
        <button
          className={`preset-btn ${currentView === 'front' ? 'active' : ''}`}
          onClick={() => onSetViewPreset('front')}
          title="Front View (सामने से)"
        >
          <span>F</span>
        </button>
        <button
          className={`preset-btn ${currentView === 'side' ? 'active' : ''}`}
          onClick={() => onSetViewPreset('side')}
          title="Side View (दाएं/बाएं से)"
        >
          <span>S</span>
        </button>
        <button
          className={`preset-btn ${currentView === 'back' ? 'active' : ''}`}
          onClick={() => onSetViewPreset('back')}
          title="Back View (पीछे से)"
        >
          <span>B</span>
        </button>

        <span className="pill-divider" />

        <button
          className={`preset-btn ${isAutoRotating ? 'active' : ''}`}
          onClick={onToggleAutoRotate}
          title={isAutoRotating ? 'रोटेशन रोकें' : '360° ऑटो रोटेट चालू करें'}
        >
          {isAutoRotating ? <Pause size={15} /> : <Play size={15} />}
        </button>

        <button className="preset-btn" onClick={onReset} title="कैमरा और दृश्य रीसेट करें">
          <RotateCcw size={15} />
        </button>
      </div>

      {/* Floating Dynamic Caption Line */}
      <div className="caption-banner-wrap">
        <div className="caption-badge glass-panel">
          <span className="caption-line-flair" />
          <span className="caption-title-text">{captionText}</span>
          {isIsolated && (
            <button className="clear-isolate-chip pointer-events-auto" onClick={onClearIsolate}>
              पूरा शरीर दिखाएं (Show All)
            </button>
          )}
          <span className="caption-line-flair" />
        </div>
      </div>

      {/* Bottom Explode Slider Dock */}
      <div className="bottom-dock-wrap pointer-events-auto">
        <div className="bottom-dock-card glass-panel">
          <div className="explode-header-row">
            <span className="explode-title">
              <Layers size={14} className="inline-icon" />
              <span>शरीर के अंग अलग करें (Explode Anatomy):</span>
            </span>
            <span className="explode-pct-badge">{Math.round(explodeValue * 100)}%</span>
          </div>

          <div className="slider-row">
            <span className="slider-endpoint-label">जुड़ा हुआ (Assembled)</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodeValue}
              onChange={e => onExplodeChange(parseFloat(e.target.value))}
              className="custom-range-slider"
            />
            <span className="slider-endpoint-label">अलग-अलग (Every piece)</span>
          </div>

          <div className="dock-hint-text">
            <span>💡 0-45%: अंग बाहर की ओर खुलते हैं · 45-100%: फ्लैट इन्वेंट्री ग्रिड में सजते हैं</span>
          </div>
        </div>
      </div>
    </div>
  );
};
