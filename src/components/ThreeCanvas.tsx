import React, { useEffect, useRef, useState } from 'react';
import { ThreeViewer } from '../engine/ThreeViewer';
import type { AtlasData } from '../types/atlas';
import { Loader2, AlertTriangle, RefreshCw } from 'lucide-react';

interface ThreeCanvasProps {
  atlas: AtlasData | null;
  activeGender?: 'male' | 'female';
  skinOpacity?: number;
  onViewerReady?: (viewer: ThreeViewer) => void;
  onSelectPart: (partId: string) => void;
  explodeValue: number;
  currentView: 'three-quarter' | 'front' | 'side' | 'back';
  isAutoRotating: boolean;
  selectedPartId: string | null;
  isIsolated: boolean;
  theme?: 'dark' | 'light';
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  atlas,
  activeGender = 'male',
  skinOpacity = 0.2,
  onViewerReady,
  onSelectPart,
  explodeValue,
  currentView,
  isAutoRotating,
  selectedPartId,
  isIsolated,
  theme = 'light',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<ThreeViewer | null>(null);
  const previousGenderRef = useRef<'male' | 'female'>(activeGender);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !atlas) return;

    const viewer = new ThreeViewer({
      container: containerRef.current,
      atlas,
      onSelectPart,
      onProgress: pct => setLoadingProgress(pct),
      onError: err => {
        const isFemaleLoadError = err.startsWith('महिला 3D मॉडल लोड करने में त्रुटि:');
        // Ignore a late female-load failure after the user has already returned to male mode.
        if (isFemaleLoadError && viewerRef.current?.getActiveGender() === 'male') return;
        setErrorMessage(err);
      },
    });

    viewer.setTheme(theme);
    viewerRef.current = viewer;
    if (onViewerReady) {
      onViewerReady(viewer);
    }

    return () => {
      viewer.destroy();
      viewerRef.current = null;
    };
  }, [atlas]);

  // Sync gender when either the selection changes or atlas loading finishes.
  useEffect(() => {
    if (!viewerRef.current) return;
    const previousGender = previousGenderRef.current;
    previousGenderRef.current = activeGender;
    if (activeGender === 'male' && previousGender === 'female') {
      setErrorMessage(null);
      // The female loader may have stopped before 100%; don't leave its spinner over the male model.
      setLoadingProgress(100);
    }
    void viewerRef.current.switchGender(activeGender);
  }, [activeGender, atlas]);

  // Sync skin opacity
  useEffect(() => {
    if (!viewerRef.current) return;
    viewerRef.current.setSkinOpacity(skinOpacity);
  }, [skinOpacity]);

  // Sync state changes with ThreeViewer
  useEffect(() => {
    if (!viewerRef.current) return;
    viewerRef.current.setExplode(explodeValue);
  }, [explodeValue]);

  useEffect(() => {
    if (!viewerRef.current) return;
    viewerRef.current.setViewPreset(currentView);
  }, [currentView]);

  useEffect(() => {
    if (!viewerRef.current) return;
    viewerRef.current.setAutoRotate(isAutoRotating);
  }, [isAutoRotating]);

  useEffect(() => {
    if (!viewerRef.current) return;
    viewerRef.current.selectPart(selectedPartId);
  }, [selectedPartId]);

  useEffect(() => {
    if (!viewerRef.current) return;
    viewerRef.current.setIsolated(isIsolated);
  }, [isIsolated]);

  useEffect(() => {
    if (!viewerRef.current) return;
    viewerRef.current.setTheme(theme);
  }, [theme]);

  return (
    <div className="three-canvas-root">
      <div ref={containerRef} className="three-canvas-mount" />

      {/* Loading Bar Overlay */}
      {loadingProgress < 100 && !errorMessage && (
        <div className="loading-glass-overlay">
          <div className="loading-card glass-panel">
            <Loader2 size={24} className="spinning-loader text-accent" />
            <div className="loading-text-col">
              <strong className="loading-heading">
                {activeGender === 'female'
                  ? 'महिला 3D संदर्भ मॉडल तैयार हो रहा है...'
                  : 'पुरुष 3D एनाटॉमी मॉडल (BodyParts3D) तैयार हो रहा है...'}
              </strong>
              <span className="loading-sub">
                {loadingProgress}% ·{' '}
                {activeGender === 'female'
                  ? 'महिला सतह, प्रजनन अंग, फिटेड हड्डियां और मांसपेशियां लोड हो रही हैं'
                  : '2,234 शारीरिक अंग लोड हो रहे हैं'}
              </span>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* A failed female reference load falls back to shared anatomy instead of blocking the canvas. */}
      {errorMessage && (
        <div className={`error-glass-overlay ${activeGender === 'female' ? 'female-fallback-error' : ''}`}>
          <div className="error-card glass-panel">
            <AlertTriangle size={26} className="text-danger" />
            <p className="error-msg">
              {activeGender === 'female'
                ? 'Female reference model load nahi hua. Available shared anatomy fallback dikh rahi hai.'
                : errorMessage}
            </p>
            {activeGender === 'female' ? (
              <>
                <details className="female-load-error-details">
                  <summary>Error details</summary>
                  <span>{errorMessage}</span>
                </details>
                <button
                  className="reload-btn"
                  onClick={async () => {
                    setErrorMessage(null);
                    setLoadingProgress(0);
                    await viewerRef.current?.retryFemaleModel();
                  }}
                >
                  <RefreshCw size={15} />
                  <span>Retry female model</span>
                </button>
              </>
            ) : (
              <button className="reload-btn" onClick={() => window.location.reload()}>
                <RefreshCw size={15} />
                <span>दोबारा लोड करें (Reload)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
