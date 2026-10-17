import React, { useEffect, useState } from 'react';
import { ExternalLink, ImageOff, Maximize2, ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react';

interface AnatomyStudyVisualProps {
  name: string;
  hindiName: string;
  system: string;
  latinName?: string;
  variant?: 'default' | 'compact';
}

interface VisualReference {
  file: string;
  sourcePage: string;
  label: string;
  credit: string;
}

const reference = (file: string, sourcePage: string, label: string, credit: string): VisualReference => ({
  file,
  sourcePage,
  label,
  credit,
});

const VISUALS = {
  heart: reference(
    'Diagram_of_the_human_heart_(cropped).svg',
    'https://commons.wikimedia.org/wiki/File:Diagram_of_the_human_heart_(cropped).svg',
    'Heart anatomy',
    'Wapcaplet and contributors · Wikimedia Commons'
  ),
  muscles: reference(
    '1105_Anterior_and_Posterior_Views_of_Muscles.jpg',
    'https://commons.wikimedia.org/wiki/File:1105_Anterior_and_Posterior_Views_of_Muscles.jpg',
    'Muscular system',
    'OpenStax Anatomy & Physiology · Wikimedia Commons'
  ),
  skeleton: reference(
    'Human_skeleton_diagram_trace.svg',
    'https://commons.wikimedia.org/wiki/File:Human_skeleton_diagram_trace.svg',
    'Human skeleton',
    'Wikimedia Commons · public-domain source diagram'
  ),
  organs: reference(
    'Human_body_and_internal_organs_with_labels.png',
    'https://commons.wikimedia.org/wiki/File:Human_body_and_internal_organs_with_labels.png',
    'Internal organs',
    'Baresh25 · Wikimedia Commons (CC BY-SA 4.0)'
  ),
  vessels: reference(
    'Circulatory_System_en.svg',
    'https://commons.wikimedia.org/wiki/File:Circulatory_System_en.svg',
    'Blood vessels',
    'Wikimedia Commons · circulatory system diagram'
  ),
  nervous: reference(
    'Human_Nervous_System_diagram.svg',
    'https://commons.wikimedia.org/wiki/File:Human_Nervous_System_diagram.svg',
    'Nervous system',
    'Benevolent · Wikimedia Commons (CC BY-SA)'
  ),
  skin: reference(
    'Skin_Cross-Section_(NIH_BioArt_942_-_802298).svg',
    'https://commons.wikimedia.org/wiki/File:Skin_Cross-Section_(NIH_BioArt_942_-_802298).svg',
    'Skin cross-section',
    'NIH / NIAID · public domain'
  ),
  kidney: reference(
    'Human_Kidney_(NIH_BioArt_229).svg',
    'https://commons.wikimedia.org/wiki/File:Human_Kidney_(NIH_BioArt_229).svg',
    'Human kidney',
    'NIH / NIAID · public domain'
  ),
  femaleReproductive: reference(
    'Scheme_female_reproductive_system-en.svg',
    'https://commons.wikimedia.org/wiki/File:Scheme_female_reproductive_system-en.svg',
    'Female reproductive system',
    'Cancer Research UK · Wikimedia Commons'
  ),
  mammaryGland: reference(
    '201405 mammary gland.png',
    'https://commons.wikimedia.org/wiki/File:201405_mammary_gland.png',
    'Mammary gland cross-section',
    'DataBase Center for Life Science (DBCLS) · CC BY 4.0'
  ),
};

function chooseVisual(name: string, hindiName: string, latinName: string | undefined, system: string): VisualReference {
  const subject = `${name} ${hindiName} ${latinName || ''} ${system}`.toLowerCase();

  if (/mammary|breast|nipple|areola|स्तन ग्रंथि|स्तन|दुग्ध ग्रंथि/.test(subject)) {
    return VISUALS.mammaryGland;
  }
  if (/uterus|ovary|ovarian|fallopian|cervix|vagina|vulva|female reproductive|अंडाशय|गर्भाशय|योनि/.test(subject)) {
    return VISUALS.femaleReproductive;
  }
  if (/heart|cardiac|cor humanum|ventricle|atrium|myocard|cardiovascular|हृदय|दिल/.test(subject)) {
    return VISUALS.heart;
  }
  if (/kidney|renal|nephro|ureter|urinary|bladder|गुर्दा|गुर्दे|मूत्राशय|किडनी/.test(subject)) {
    return VISUALS.kidney;
  }
  if (/skin|epiderm|derm|cutaneous|integumentary|त्वचा|बाह्य आवरण/.test(subject)) {
    return VISUALS.skin;
  }
  if (/skeletal|skeleton|bone|femur|tibia|fibula|skull|vertebra|humerus|pelvis|rib cage|अस्थि|हड्डी|कंकाल/.test(subject)) {
    return VISUALS.skeleton;
  }
  if (/muscle|muscular|biceps|triceps|quadriceps|pectoralis|deltoid|gastrocnemius|rectus abdominis|पेशी|मांसपेशी/.test(subject)) {
    return VISUALS.muscles;
  }
  if (/artery|arterial|vein|venous|vascular|circulatory|blood vessel|धमनी|शिरा|रक्त वाहिका/.test(subject)) {
    return VISUALS.vessels;
  }
  if (/nerve|nervous|neuron|neural|brain|cerebr|cerebell|spinal cord|तंत्रिका|मस्तिष्क|दिमाग/.test(subject)) {
    return VISUALS.nervous;
  }
  return VISUALS.organs;
}

export const AnatomyStudyVisual: React.FC<AnatomyStudyVisualProps> = ({
  name,
  hindiName,
  system,
  latinName,
  variant = 'default',
}) => {
  const visual = chooseVisual(name, hindiName, latinName, system);
  const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(visual.file)}?width=1800`;
  const [imageFailed, setImageFailed] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  useEffect(() => {
    setImageFailed(false);
    setIsZoomOpen(false);
    setZoomScale(1);
  }, [imageUrl]);

  useEffect(() => {
    if (!isZoomOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsZoomOpen(false);
      } else if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        setZoomScale(scale => Math.min(4, Number((scale + 0.1).toFixed(2))));
      } else if (event.key === '-') {
        event.preventDefault();
        setZoomScale(scale => Math.max(0.5, Number((scale - 0.1).toFixed(2))));
      } else if (event.key === '0') {
        setZoomScale(1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen]);

  return (
    <figure className={`anatomy-study-visual ${variant === 'compact' ? 'anatomy-study-visual--compact' : ''}`}>
      <div className="anatomy-study-visual__heading">
        <span>अध्ययन चित्र (Study image)</span>
        <span className="anatomy-study-visual__subject">{visual.label}</span>
        {!imageFailed && (
          <button
            type="button"
            className="anatomy-study-visual__zoom-trigger"
            onClick={() => { setZoomScale(1); setIsZoomOpen(true); }}
            aria-label={`Open a larger view of ${visual.label}`}
            title="चित्र बड़ा करके देखें (Zoom diagram)"
          >
            <Maximize2 size={15} />
            <span>बड़ा करें</span>
          </button>
        )}
      </div>
      <div className="anatomy-study-visual__media">
        {!imageFailed ? (
          <button
            type="button"
            className="anatomy-study-visual__open-image"
            onClick={() => { setZoomScale(1); setIsZoomOpen(true); }}
            aria-label={`Enlarge ${hindiName} anatomy diagram`}
            title="Click to enlarge diagram"
          >
            <img
              src={imageUrl}
              alt={`${hindiName} — ${visual.label} anatomical reference illustration`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
            />
          </button>
        ) : (
          <div className="anatomy-study-visual__fallback">
            <ImageOff size={26} />
            <span>चित्र लोड नहीं हुआ</span>
            <a href={visual.sourcePage} target="_blank" rel="noreferrer">चित्र खोलें</a>
          </div>
        )}
      </div>
      <figcaption className="anatomy-study-visual__credit">
        <span>{visual.credit}</span>
        <a href={visual.sourcePage} target="_blank" rel="noreferrer" aria-label="Open image source and licence details" title="चित्र का स्रोत और लाइसेंस देखें">
          स्रोत <ExternalLink size={12} />
        </a>
      </figcaption>

      {isZoomOpen && !imageFailed && (
        <div
          className="anatomy-image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Zoomed study diagram: ${visual.label}`}
          onClick={() => setIsZoomOpen(false)}
        >
          <section className="anatomy-image-lightbox__panel" onClick={event => event.stopPropagation()}>
            <header className="anatomy-image-lightbox__toolbar">
              <div className="anatomy-image-lightbox__title">
                <strong>{visual.label}</strong>
                <span>{Math.round(zoomScale * 100)}% zoom</span>
              </div>
              <div className="anatomy-image-lightbox__controls" role="group" aria-label="Diagram zoom controls">
                <button
                  type="button"
                  onClick={() => setZoomScale(scale => Math.max(0.5, Number((scale - 0.1).toFixed(2))))}
                  aria-label="Zoom diagram out"
                  title="Zoom out"
                  disabled={zoomScale <= 0.5}
                >
                  <ZoomOut size={18} />
                </button>
                <input
                  type="range"
                  min={50}
                  max={400}
                  step={10}
                  value={Math.round(zoomScale * 100)}
                  onChange={event => setZoomScale(Number(event.target.value) / 100)}
                  aria-label="Diagram zoom level"
                />
                <button
                  type="button"
                  onClick={() => setZoomScale(scale => Math.min(4, Number((scale + 0.1).toFixed(2))))}
                  aria-label="Zoom diagram in"
                  title="Zoom in"
                  disabled={zoomScale >= 4}
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale(1)}
                  aria-label="Reset diagram zoom"
                  title="Reset zoom"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(false)}
                  aria-label="Close enlarged diagram"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </header>
            <div className="anatomy-image-lightbox__viewport">
              <img
                className="anatomy-image-lightbox__image"
                src={imageUrl}
                alt={`${hindiName} — enlarged ${visual.label} study diagram`}
                style={{ width: `${zoomScale * 100}%` }}
                draggable={false}
              />
            </div>
            <p className="anatomy-image-lightbox__hint">चित्र को बड़ा/छोटा करने के लिए slider या +/− दबाएँ · Esc से बंद करें · ज़ूम होने पर स्क्रॉल करें</p>
          </section>
        </div>
      )}
    </figure>
  );
};

export default AnatomyStudyVisual;
