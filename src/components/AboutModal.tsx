import { X, ExternalLink, ShieldCheck, Award } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="about-modal-card glass-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-left">
            <div className="header-icon-box">
              <Award size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="modal-title">सचित्र मानव शरीर विज्ञान — स्रोत एवं आभार</h3>
              <p className="modal-subtitle">BodyParts3D Data Attribution & Project Credits</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="about-modal-body">
          <div className="about-intro-box">
            <p>
              यह एप्लिकेशन आधुनिक 3D वेब तकनीक (React 19, Three.js, GPU State Shaders) और संपूर्ण नैदानिक ज्ञानकोश (Clinical Disease Encyclopedia) को मिलाकर बनाया गया एक उन्नत एनाटॉमी अध्ययन मंच है।
            </p>
          </div>

          <div className="credit-section">
            <h4 className="credit-heading">📊 3D एनाटॉमी डेटा स्रोत (3D Geometry Source)</h4>
            <p>
              <strong>BodyParts3D</strong>, © The Database Center for Life Science (DBCLS), Japan.
              <br />
              लाइसेंस: <strong>Creative Commons Attribution 4.0 International (CC BY 4.0)</strong>.
            </p>
            <p className="text-muted-small">
              डेटा वयस्क पुरुष के TARO MRI स्कैन और अनुभवी एनाटॉमिस्टों द्वारा परिष्कृत 2,234 3D मेश और 3,432 नामकरण अवधारणाओं (FMA Concepts) पर आधारित है।
            </p>
            <div className="link-row">
              <a
                href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html"
                target="_blank"
                rel="noreferrer"
                className="ext-link"
              >
                <span>डेटासेट लाइसेंस देखें</span>
                <ExternalLink size={13} />
              </a>
              <a
                href="https://academic.oup.com/nar/article/37/suppl_1/D782/1000752"
                target="_blank"
                rel="noreferrer"
                className="ext-link"
              >
                <span>मूल शोध पत्र (Oxford NAR)</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          <div className="credit-section">
            <h4 className="credit-heading">💻 मूल सॉफ्टवेयर आर्किटेक्चर (Software Architecture)</h4>
            <p>
              Human Atlas Web Viewer by <strong>Ashe Magalhaes</strong> (<code>ashemag/human-atlas</code>), <strong>MIT License</strong> (Copyright 2026).
            </p>
            <p className="text-muted-small">
              GPU DataTexture शेडर पाइपलाइन, नॉर्मल क्वांटाइजेशन (signed 16-bit) और 2D नॉलिंग इनवेंटरी एल्गोरिदम पर आधारित अनुकूलन।
            </p>
          </div>

          <div className="credit-section disclaimer-box">
            <h4 className="credit-heading text-warning">
              <ShieldCheck size={16} className="inline-icon" />
              <span>शैक्षणिक अस्वीकरण (Educational Disclaimer)</span>
            </h4>
            <p className="text-muted-small">
              यह सॉफ्टवेयर केवल शिक्षा, आत्म-अध्ययन और दृश्य समझ के लिए है। यह किसी भी प्रकार का नैदानिक (Diagnostic) या शल्य चिकित्सा (Surgical) उपकरण नहीं है। किसी भी स्वास्थ्य समस्या के लिए कृपया योग्य चिकित्सक (Doctor) से परामर्श लें।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
