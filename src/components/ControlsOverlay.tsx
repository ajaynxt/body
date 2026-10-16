import React from 'react';
import { RotateCcw, Play, Pause, Layers, Eye } from 'lucide-react';
import { useTranslation } from '../i18n';

interface ControlsOverlayProps {
  activeGender?: 'male' | 'female';
  skinOpacity?: number;
  onSkinOpacityChange?: (val: number) => void;
  explodeValue: number;
  onExplodeChange: (val: number) => void;
  currentView: 'three-quarter' | 'front' | 'side' | 'back';
  onSetViewPreset: (preset: 'three-quarter' | 'front' | 'side' | 'back') => void;
  isAutoRotating: boolean;
  onToggleAutoRotate: () => void;
  onReset: () => void;
}

export const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  activeGender = 'male',
  skinOpacity = 0.2,
  onSkinOpacityChange,
  explodeValue,
  onExplodeChange,
  currentView,
  onSetViewPreset,
  isAutoRotating,
  onToggleAutoRotate,
  onReset,
}) => {
  const { t } = useTranslation();

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
          title="Side View (पार्श्व से)"
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

        <button className="preset-btn" onClick={onReset} title={t.resetView}>
          <RotateCcw size={15} />
        </button>
      </div>


      {/* Bottom Explode Slider Dock & Skin Transparency */}
      <div className="bottom-dock-wrap pointer-events-auto">
        <div className="bottom-dock-card glass-panel">
          {/* Female Skin Opacity Slider (When Female active) */}
          {activeGender === 'female' && onSkinOpacityChange && (
            <div className="skin-slider-subrow">
              <div className="explode-header-row">
                <span className="explode-title">
                  <Eye size={14} className="inline-icon text-accent" />
                  <span>{t.skinOpacity}:</span>
                </span>
                <span className="explode-pct-badge">{Math.round(skinOpacity * 100)}%</span>
              </div>
              <div className="slider-row">
                <span className="slider-endpoint-label">पारदर्शी (Clear)</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={skinOpacity}
                  onChange={e => onSkinOpacityChange(parseFloat(e.target.value))}
                  className="custom-range-slider"
                  aria-label="Female skin opacity"
                />
                <span className="slider-endpoint-label">अस्पष्ट (Opaque)</span>
              </div>
            </div>
          )}

          {/* Explode Slider */}
          <div className="explode-header-row">
            <span className="explode-title">
              <Layers size={14} className="inline-icon" />
              <span>{t.explodeView}:</span>
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
              aria-label="Explode anatomy slider"
            />
            <span className="slider-endpoint-label">विभाजित (Separated)</span>
          </div>

          <div className="dock-hint-text">
            <span>
              💡{' '}
              {activeGender === 'female'
                ? 'महिला 3D मॉडल: अंगों को अक्ष से बाहर की ओर फैलाकर आंतरिक संरचनाओं का निरीक्षण करें'
                : '0-45%: अंग बाहर की ओर खुलते हैं · 45-100%: 2D नॉलिंग ग्रिड में व्यवस्थित होते हैं'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
