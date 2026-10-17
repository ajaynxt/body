import React, { useState } from 'react';
import {
  RotateCcw,
  Play,
  Pause,
  Layers,
  Eye,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
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
  visibleSystems?: Set<string>;
  onToggleSystem?: (systemId: string) => void;
  onToggleOrganGroup?: (group: 'muscles' | 'skeleton' | 'viscera' | 'vascular' | 'nerves') => void;
  hiddenPartsCount?: number;
  onUnhideAllParts?: () => void;
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
  visibleSystems = new Set(['cardiac', 'skeletal', 'muscular', 'arterial', 'venous', 'nervous', 'respiratory', 'digestive', 'urinary', 'reproductive']),
  onToggleOrganGroup,
  hiddenPartsCount = 0,
  onUnhideAllParts,
}) => {
  const { t } = useTranslation();
  const [isDockExpanded, setIsDockExpanded] = useState(false);

  // Group helpers
  const isMusclesOn = visibleSystems.has('muscular');
  const isSkeletonOn = visibleSystems.has('skeletal');
  const isVisceraOn =
    visibleSystems.has('cardiac') ||
    visibleSystems.has('digestive') ||
    visibleSystems.has('respiratory');
  const isVascularOn = visibleSystems.has('arterial') || visibleSystems.has('venous');
  const isNervesOn = visibleSystems.has('nervous');

  return (
    <div className="controls-overlay-container pointer-events-none">
      {/* Top Floating View Angle Presets & Layer Strip */}
      <div className="top-floating-bar-col pointer-events-auto">
        <div className="view-presets-pill glass-panel">
          <button
            className={`preset-btn ${currentView === 'three-quarter' ? 'active' : ''}`}
            onClick={() => onSetViewPreset('three-quarter')}
            title="¾ Three-Quarter Perspective (त्रिकोणीय दृश्य)"
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
            {isAutoRotating ? <Pause size={14} /> : <Play size={14} />}
          </button>

          <button className="preset-btn" onClick={onReset} title={t.resetView}>
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Floating Quick Layer Toggles Strip ("mussels vgera alg kr ske hide show kr ke") */}
        {onToggleOrganGroup && (
          <div className="floating-layer-strip glass-panel">
            <span className="layer-strip-label">परतें (Layers):</span>

            {/* Muscles Toggle */}
            <button
              className={`layer-chip-btn ${isMusclesOn ? 'active' : 'muted'}`}
              onClick={() => onToggleOrganGroup('muscles')}
              title={isMusclesOn ? 'मांसपेशियां छुपाएं (Hide Muscles)' : 'मांसपेशियां दिखाएं (Show Muscles)'}
            >
              <span className="chip-indicator" />
              <span>🥩 मांसपेशियां</span>
            </button>

            {/* Skeleton / Bones Toggle */}
            <button
              className={`layer-chip-btn ${isSkeletonOn ? 'active' : 'muted'}`}
              onClick={() => onToggleOrganGroup('skeleton')}
              title={isSkeletonOn ? 'कंकाल/हड्डियां छुपाएं (Hide Bones)' : 'हड्डियां दिखाएं (Show Bones)'}
            >
              <span className="chip-indicator" />
              <span>🦴 कंकाल</span>
            </button>

            {/* Viscera / Organs Toggle */}
            <button
              className={`layer-chip-btn ${isVisceraOn ? 'active' : 'muted'}`}
              onClick={() => onToggleOrganGroup('viscera')}
              title={isVisceraOn ? 'आंतरिक अंग छुपाएं (Hide Organs)' : 'आंतरिक अंग दिखाएं (Show Organs)'}
            >
              <span className="chip-indicator" />
              <span>🫀 आंतरिक अंग</span>
            </button>

            {/* Vascular / Blood Vessels Toggle */}
            <button
              className={`layer-chip-btn ${isVascularOn ? 'active' : 'muted'}`}
              onClick={() => onToggleOrganGroup('vascular')}
              title={isVascularOn ? 'रक्त वाहिकाएं छुपाएं' : 'धमनियां व शिराएं दिखाएं'}
            >
              <span className="chip-indicator" />
              <span>🩸 नसें (Vessels)</span>
            </button>

            {/* Nervous System Toggle */}
            <button
              className={`layer-chip-btn ${isNervesOn ? 'active' : 'muted'}`}
              onClick={() => onToggleOrganGroup('nerves')}
              title={isNervesOn ? 'तंत्रिका तंत्र छुपाएं' : 'दिमाग व नसें दिखाएं'}
            >
              <span className="chip-indicator" />
              <span>🧠 तंत्रिकाएं</span>
            </button>

            {/* Hidden Parts Counter & Restore */}
            {hiddenPartsCount > 0 && onUnhideAllParts && (
              <button
                className="layer-chip-btn unhide-alert-chip pulse-glow"
                onClick={onUnhideAllParts}
                title={`सभी ${hiddenPartsCount} छुपे अंग वापस लाएं`}
              >
                <Eye size={12} className="inline-icon" />
                <span>सब दिखाएं ({hiddenPartsCount})</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Explode Slider Dock & Skin Transparency */}
      <div className="bottom-dock-wrap pointer-events-auto">
        <div className={`bottom-dock-card glass-panel ${isDockExpanded ? 'expanded' : 'compact'}`}>
          {/* Compact Mini Dock Toggle Header */}
          <div
            className="dock-compact-bar"
            onClick={() => setIsDockExpanded(!isDockExpanded)}
            title="विस्फोट व्यू व त्वचा पारदर्शिता स्लाइडर खोलें/बंद करें"
          >
            <div className="dock-bar-left">
              <Layers size={14} className="text-accent" />
              <span className="dock-bar-title">3D विच्छेदन व फैलाव (Explode Slider)</span>
              {explodeValue > 0 && (
                <span className="explode-pct-badge">{Math.round(explodeValue * 100)}%</span>
              )}
            </div>

            <div className="dock-bar-right">
              {activeGender === 'female' && (
                <span className="skin-pill-tag">
                  <Eye size={12} /> {Math.round(skinOpacity * 100)}%
                </span>
              )}
              <button className="dock-toggle-arrow-btn">
                {isDockExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </button>
            </div>
          </div>

          {/* Expanded Sliders Section */}
          {isDockExpanded && (
            <div className="dock-expanded-content fade-in">
              {/* Female Skin Opacity Slider (When Female active) */}
              {activeGender === 'female' && onSkinOpacityChange && (
                <div className="skin-slider-subrow">
                  <div className="explode-header-row">
                    <span className="explode-title">
                      <Eye size={14} className="inline-icon text-accent" />
                      <span>महिला त्वचा पारदर्शिता (Skin Silhouette):</span>
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
                    ? 'अंगों को अक्ष से बाहर की ओर फैलाकर आंतरिक गर्भाशय, डिंबग्रंथि व स्तन ऊतक देखें'
                    : 'स्लाइडर खिसकाएं: 0-45% अंग बाहर की ओर खुलते हैं · 45-100% 2D नॉलिंग इन्वेंटरी ग्रिड'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
