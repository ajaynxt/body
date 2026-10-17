import React, { useEffect, useState } from 'react';
import { ExternalLink, ImageOff } from 'lucide-react';

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
  const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(visual.file)}?width=900`;
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  return (
    <figure className={`anatomy-study-visual ${variant === 'compact' ? 'anatomy-study-visual--compact' : ''}`}>
      <div className="anatomy-study-visual__heading">
        <span>अध्ययन चित्र (Study image)</span>
        <span className="anatomy-study-visual__subject">{visual.label}</span>
      </div>
      <div className="anatomy-study-visual__media">
        {!imageFailed ? (
          <img
            src={imageUrl}
            alt={`${hindiName} — ${visual.label} anatomical reference illustration`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
          />
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
    </figure>
  );
};

export default AnatomyStudyVisual;
