import React from 'react';
import { X, ExternalLink, ShieldCheck, Award, BookOpen } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="about-modal-card glass-panel" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-left">
            <div className="header-icon-box">
              <Award size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="modal-title">सचित्र मानव शरीर विज्ञान — स्रोत, लाइसेंस एवं आभार</h3>
              <p className="modal-subtitle">
                Multilingual Human Anatomy Atlas · Open Scientific Data & Textbooks
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="about-modal-body">
          <div className="about-intro-box">
            <p>
              यह एप्लिकेशन आधुनिक 3D वेब तकनीक (React 19, Three.js, GPU Shaders), वास्तविक पुरुष एवं महिला शारीरिक स्कैन (BodyParts3D एवं HuBMAP VHF 1.5), 24 भाषाओं के बहुभाषी समर्थन और प्रामाणिक चिकित्सा संदर्भों को मिलाकर तैयार किया गया एक व्यापक शैक्षणिक एनाटॉमी एटलस है।
            </p>
          </div>

          {/* CREATOR & ARCHITECT SHOWCASE */}
          <div className="credit-section creator-highlight-section">
            <div className="credit-badge creator-tag">🚀 प्रमुख निर्माता एवं आर्किटेक्ट (Lead Developer)</div>
            <h4 className="credit-heading font-extrabold text-accent">Ajay Saini (AJAYNXT)</h4>
            <p>
              <strong>AJAYNXT Interactive Technologies</strong> · <code>body.ajaynxt.com</code>
            </p>
            <p className="text-muted-small">
              भारत के मेडिकल, नर्सिंग, नीट (NEET) और जीवविज्ञान के विद्यार्थियों के लिए विश्वस्तरीय 3D संवादात्मक सचित्र शरीर विज्ञान, क्लिनिकल फोटोग्राफी, एक्स-रे, सीटी, एमआरआई और प्रिवेंटिव कार्डियोलॉजी मार्गदर्शिका की संकल्पना और विकास।
            </p>
            <div className="link-row">
              <a
                href="https://github.com/ajaynxt"
                target="_blank"
                rel="noreferrer"
                className="ext-link highlight-link"
              >
                <span>GitHub @ajaynxt</span>
                <ExternalLink size={13} />
              </a>
              <a
                href="https://body.ajaynxt.com"
                target="_blank"
                rel="noreferrer"
                className="ext-link"
              >
                <span>body.ajaynxt.com</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* 1. MALE DATASET ATTRIBUTION */}
          <div className="credit-section">
            <div className="credit-badge male-tag">♂ पुरुष 3D संदर्भ मॉडल (Male Dataset)</div>
            <h4 className="credit-heading">BodyParts3D 4.0</h4>
            <p>
              <strong>The Database Center for Life Science (DBCLS)</strong>, Japan.
              <br />
              लाइसेंस: <strong>Creative Commons Attribution 4.0 International (CC BY 4.0)</strong>.
            </p>
            <p className="text-muted-small">
              वयस्क पुरुष के TARO MRI स्कैन और अनुभवी एनाटॉमिस्टों द्वारा परिष्कृत 2,234 3D मेश और 3,432 नामकरण अवधारणाओं (Foundational Model of Anatomy - FMA) पर आधारित।
            </p>
            <div className="link-row">
              <a
                href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html"
                target="_blank"
                rel="noreferrer"
                className="ext-link"
              >
                <span>DBCLS BodyParts3D लाइसेंस</span>
                <ExternalLink size={13} />
              </a>
              <a
                href="https://academic.oup.com/nar/article/37/suppl_1/D782/1000752"
                target="_blank"
                rel="noreferrer"
                className="ext-link"
              >
                <span>शोध पत्र (Oxford NAR 2009)</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* 2. FEMALE DATASET ATTRIBUTION */}
          <div className="credit-section">
            <div className="credit-badge female-tag">♀ महिला 3D संदर्भ मॉडल (Female Dataset)</div>
            <h4 className="credit-heading">HuBMAP 3D Reference Organ Set for Female v1.5</h4>
            <p>
              <strong>NIH Human BioMolecular Atlas Program (HuBMAP)</strong> & <strong>Human Reference Atlas (HRA)</strong>.
              <br />
              लाइसेंस: <strong>Creative Commons Attribution 4.0 International (CC BY 4.0)</strong>.
              <br />
              स्थायी वैज्ञानिक पहचानकर्ता (DOI): <code>10.48539/HBM352.BTSQ.586</code>
            </p>
            <p className="text-muted-small">
              नेशनल लाइब्रेरी ऑफ मेडिसिन (NLM) विजिबल ह्यूमन फीमेल (VHF) के उच्च-रिज़ॉल्यूशन शारीरिक विच्छेदन स्कैन पर आधारित 888 3D मेश। इसमें संपूर्ण महिला प्रजनन तंत्र (गर्भाशय, डिंबग्रंथि, फैलोपियन ट्यूब, स्तन ऊतक) एवं त्वचा का पारदर्शी मॉडल शामिल है।
            </p>
            <div className="link-row">
              <a
                href="https://doi.org/10.48539/HBM352.BTSQ.586"
                target="_blank"
                rel="noreferrer"
                className="ext-link"
              >
                <span>HuBMAP DOI संदर्भ</span>
                <ExternalLink size={13} />
              </a>
              <a
                href="https://humanatlas.io/3d-reference-library"
                target="_blank"
                rel="noreferrer"
                className="ext-link"
              >
                <span>Human Reference Atlas 3D Library</span>
                <ExternalLink size={13} />
              </a>
              <a
                href="https://3d.nih.gov/entries/3DPX-020992"
                target="_blank"
                rel="noreferrer"
                className="ext-link"
              >
                <span>NIH 3D Entry 3DPX-020992</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* 3. MEDICAL TEXTBOOKS ATTRIBUTION */}
          <div className="credit-section">
            <h4 className="credit-heading">
              <BookOpen size={16} className="inline-icon text-accent" />
              <span>प्रमाणिक चिकित्सा पाठ्यपुस्तकें (Medical Textbooks Citations)</span>
            </h4>
            <p className="text-muted-small">
              एप्लिकेशन में प्रस्तुत सभी शारीरिक रचना विवरण, हाई-यील्ड निमोनिक्स, परीक्षा मुख्य बिंदु और शारीरिक क्रियाएं निम्नलिखित मानक चिकित्सा पाठ्यपुस्तकों से उद्धृत हैं:
            </p>
            <ul className="textbook-list">
              <li>
                <strong>Gray's Anatomy: The Anatomical Basis of Clinical Practice</strong> (42nd Edition) — Standring, Susan (Elsevier).
              </li>
              <li>
                <strong>BD Chaurasia's Human Anatomy</strong> (Vol 1: Thorax & Upper Limb; Vol 2: Abdomen & Lower Limb; Vol 3: Head & Neck) — CBS Publishers.
              </li>
              <li>
                <strong>Guyton and Hall Textbook of Medical Physiology</strong> (14th Edition) — Hall, John E. (Elsevier).
              </li>
              <li>
                <strong>Netter's Atlas of Human Anatomy</strong> (8th Edition) — Netter, Frank H. (Elsevier).
              </li>
            </ul>
          </div>

          {/* 4. SOFTWARE CODEBASE ATTRIBUTION */}
          <div className="credit-section">
            <h4 className="credit-heading">💻 सॉफ्टवेयर एवं वेब आर्किटेक्चर (Open Source Architecture)</h4>
            <p>
              Human Atlas Web Viewer by <strong>Ashe Magalhaes</strong> (<code>ashemag/human-atlas</code>), <strong>MIT License</strong>.
            </p>
            <p className="text-muted-small">
              React 19, Three.js, Meshopt Decompression (Meshoptimizer), BufferGeometryUtils, Lucide Icons.
            </p>
          </div>

          {/* 5. EDUCATIONAL DISCLAIMER */}
          <div className="credit-section disclaimer-box">
            <h4 className="credit-heading text-warning">
              <ShieldCheck size={16} className="inline-icon" />
              <span>शैक्षणिक अस्वीकरण (Educational Disclaimer)</span>
            </h4>
            <p className="text-muted-small">
              यह सॉफ्टवेयर विशुद्ध रूप से चिकित्सा शिक्षा, छात्रों के आत्म-अध्ययन और दृश्य शारीरिक समझ के लिए बनाया गया है। यह किसी भी प्रकार का आपातकालीन, नैदानिक (Diagnostic) या शल्य चिकित्सा (Surgical) निर्णय लेने वाला उपकरण नहीं है। किसी भी स्वास्थ्य समस्या के लिए कृपया योग्य एवं पंजीकृत चिकित्सक (Medical Doctor) से परामर्श लें।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
