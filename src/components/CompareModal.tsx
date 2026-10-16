import React from 'react';
import { X, GitCompare, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeGender: 'male' | 'female';
  onSwitchGender: (gender: 'male' | 'female') => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  activeGender,
  onSwitchGender,
}) => {
  if (!isOpen) return null;

  const systemComparison = [
    {
      system: 'reproductive',
      name: 'प्रजनन तंत्र (Reproductive System)',
      maleDetails: 'वृषण (Testes), अधिवृषण, शुक्रवाहिनी, प्रोस्टेट ग्रंथि, शिश्न (18 भाग)',
      femaleDetails: 'गर्भाशय (Uterus), डिंबग्रंथि (Ovaries), फैलोपियन ट्यूब, योनि, स्तन एवं मैमरी लोब्स (62 मेश)',
      maleStatus: 'पूर्ण पुरुष एनाटॉमी (Full)',
      femaleStatus: 'पूर्ण महिला एनाटॉमी (Full)',
    },
    {
      system: 'integumentary',
      name: 'त्वचा तंत्र (Integumentary System)',
      maleDetails: 'पारदर्शी बाह्य संदर्भ त्वचा (BodyParts3D FMA7163)',
      femaleDetails: 'संपूर्ण 3D देह त्वचा (VH_F_skin) समायोज्य पारदर्शिता के साथ (1 मेश)',
      maleStatus: 'पूर्ण (Full)',
      femaleStatus: 'पूर्ण (Full + Adjustable Opacity)',
    },
    {
      system: 'circulatory',
      name: 'परिसंचरण तंत्र (Circulatory / Heart)',
      maleDetails: 'हृदय के 4 कक्ष, कोरोनरी वाहिकाएं, महाधमनी, संपूर्ण दैहिक धमनियां व शिराएं (412 भाग)',
      femaleDetails: 'हृदय, प्रमुख धमनियां, फुफ्फुसीय वाहिकाएं एवं आंतरिक संवहनी शाखाएं (114 मेश)',
      maleStatus: 'अत्यधिक विस्तृत (412 भाग)',
      femaleStatus: 'प्रमुख आंतरिक वाहिकाएं (114 मेश)',
    },
    {
      system: 'respiratory',
      name: 'श्वसन तंत्र (Respiratory System)',
      maleDetails: 'नासिका, श्वासनली (Trachea), ब्रांकाई, दोनों फेफड़ों के लोब्स (68 भाग)',
      femaleDetails: 'श्वासनली, श्वसनी वृक्ष, दोनों फेफड़े एवं फुफ्फुसीय सतहें (63 मेश)',
      maleStatus: 'पूर्ण (68 भाग)',
      femaleStatus: 'पूर्ण (63 मेश)',
    },
    {
      system: 'digestive',
      name: 'पाचन तंत्र (Digestive System)',
      maleDetails: 'मुख गुहा, ग्रासनली, आमाशय, यकृत, पित्ताशय, अग्न्याशय, छोटी व बड़ी आंत (112 भाग)',
      femaleDetails: 'ग्रासनली, आमाशय, यकृत (Liver), प्लीहा (Spleen), अग्न्याशय, आंतें (61 मेश)',
      maleStatus: 'पूर्ण (112 भाग)',
      femaleStatus: 'पूर्ण (61 मेश)',
    },
    {
      system: 'urinary',
      name: 'मूत्र तंत्र (Urinary System)',
      maleDetails: 'दायां/बायां गुर्दा, मूत्रवाहिनी, मूत्राशय (32 भाग)',
      femaleDetails: 'गुर्दे, नेफ्रॉन संवहनी क्षेत्र, मूत्रवाहिनी, मूत्राशय एवं पेल्विक संरचनाएं (86 मेश)',
      maleStatus: 'पूर्ण (32 भाग)',
      femaleStatus: 'उच्च-रिज़ॉल्यूशन विस्तृत (86 मेश)',
    },
    {
      system: 'nervous',
      name: 'तंत्रिका तंत्र (Nervous System)',
      maleDetails: 'मस्तिष्क (Cerebrum, Cerebellum), कपाल तंत्रिकाएं, मेरुरज्जु (Spinal Cord) (284 भाग)',
      femaleDetails: 'मस्तिष्क क्षेत्र, स्पाइनल कॉर्ड एवं ऑटोनोमिक नर्वस ट्रैक्स (368 मेश)',
      maleStatus: 'पूर्ण (284 भाग)',
      femaleStatus: 'अत्यधिक विस्तृत (368 मेश)',
    },
    {
      system: 'muscular',
      name: 'पेशी तंत्र (Muscular System)',
      maleDetails: 'संपूर्ण शरीर की मांसपेशियां: चेहरे, गर्दन, वक्ष, पेट, हाथ, पैर और जांघ (720 भाग)',
      femaleDetails: '⚠️ केवल ट्रंक एवं डायाफ्राम पेशियां उपलब्ध हैं; अंगों की मांसपेशियां सीमित हैं (22 मेश)',
      maleStatus: 'पूर्ण शरीर (720 भाग)',
      femaleStatus: '⚠️ आंशिक कवरेज (22 मेश - Partial)',
    },
    {
      system: 'skeletal',
      name: 'कंकाल तंत्र (Skeletal System)',
      maleDetails: 'कपाल, रीढ़ की हड्डी, पसलियां, पेल्विस, हाथ व पैर की 206 हड्डियां (520 भाग)',
      femaleDetails: 'रीढ़ की हड्डियां (Vertebrae), पसलियां, स्टर्नम, पेल्विक गर्डल (98 मेश)',
      maleStatus: 'पूर्ण कंकाल (520 भाग)',
      femaleStatus: 'अक्षीय एवं पेल्विक कंकाल (98 मेश)',
    },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="compare-modal-card glass-panel" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="header-left">
            <div className="header-icon-box" style={{ background: 'rgba(56, 189, 248, 0.15)' }}>
              <GitCompare size={22} className="text-info" />
            </div>
            <div>
              <h3 className="modal-title">पुरुष एवं महिला संदर्भ मॉडल तुलना</h3>
              <p className="modal-subtitle">
                Scientific Comparison: Male (BodyParts3D) vs. Female (HuBMAP VHF 1.5)
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="compare-modal-body">
          {/* Top Quick-Switch Cards */}
          <div className="compare-top-cards-grid">
            {/* Male Card */}
            <div className={`compare-model-card ${activeGender === 'male' ? 'active-ring' : ''}`}>
              <div className="card-badge male-badge">♂ पुरुष संदर्भ (Male)</div>
              <h4 className="model-name">BodyParts3D 4.0</h4>
              <p className="model-institution">Database Center for Life Science (DBCLS), Japan</p>
              <div className="model-stats-row">
                <span className="stat-pill">2,234 शारीरिक अंग</span>
                <span className="stat-pill">15 संपूर्ण तंत्र</span>
                <span className="stat-pill">CC BY 4.0</span>
              </div>
              <p className="model-desc">
                वयस्क जापानी पुरुष के उच्च-रिज़ॉल्यूशन एमआरआई एवं सीटी स्कैन पर आधारित। सभी अंगों एवं हाथ-पैरों की मांसपेशियों का संपूर्ण वैज्ञानिक दस्तावेज़ीकरण।
              </p>
              <button
                className={`switch-now-btn ${activeGender === 'male' ? 'current' : ''}`}
                onClick={() => {
                  onSwitchGender('male');
                  onClose();
                }}
              >
                {activeGender === 'male' ? '✓ सक्रिय मॉडल (Active)' : 'पुरुष मॉडल देखें'}
              </button>
            </div>

            {/* Female Card */}
            <div className={`compare-model-card ${activeGender === 'female' ? 'active-ring' : ''}`}>
              <div className="card-badge female-badge">♀ महिला संदर्भ (Female)</div>
              <h4 className="model-name">HuBMAP VHF 1.5</h4>
              <p className="model-institution">National Institutes of Health (NIH) & Human Reference Atlas</p>
              <div className="model-stats-row">
                <span className="stat-pill">888 3D मेश</span>
                <span className="stat-pill">10 शारीरिक तंत्र</span>
                <span className="stat-pill">CC BY 4.0 (DOI: 10.48539/HBM352.BTSQ.586)</span>
              </div>
              <p className="model-desc">
                विजिबल ह्यूमन फीमेल (VHF) वास्तविक शारीरिक स्कैन। संपूर्ण महिला प्रजनन तंत्र (गर्भाशय, डिंबग्रंथि, स्तन ऊतक) एवं संपूर्ण देह त्वचा।
              </p>
              <button
                className={`switch-now-btn ${activeGender === 'female' ? 'current' : ''}`}
                onClick={() => {
                  onSwitchGender('female');
                  onClose();
                }}
              >
                {activeGender === 'female' ? '✓ सक्रिय मॉडल (Active)' : 'महिला मॉडल देखें'}
              </button>
            </div>
          </div>

          {/* Scientific Transparency Notice */}
          <div className="compare-notice-banner glass-panel">
            <ShieldCheck size={20} className="text-accent flex-shrink-0" />
            <div>
              <strong>पारदर्शी वैज्ञानिक विवरण (Scientific Integrity Notice):</strong>
              <p>
                दोनों मॉडल अलग-अलग स्वतंत्र वैज्ञानिक अनुसंधानों से प्राप्त किए गए हैं। पुरुष मॉडल (BodyParts3D) में संपूर्ण अंगों की पेशियां उपलब्ध हैं, जबकि महिला मॉडल (HuBMAP) में मुख्य रूप से आंतरिक विसरल अंग, महिला प्रजनन अंग और संपूर्ण त्वचा का उच्च-रिज़ॉल्यूशन चित्रण है। हमने किसी भी लापता क्षेत्र में कृत्रिम या काल्पनिक अंग नहीं जोड़े हैं।
              </p>
            </div>
          </div>

          {/* System by System Comparison Table */}
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>शारीरिक तंत्र (System)</th>
                  <th>♂ पुरुष मॉडल (BodyParts3D)</th>
                  <th>♀ महिला मॉडल (HuBMAP VHF)</th>
                  <th>कवरेज स्थिति</th>
                </tr>
              </thead>
              <tbody>
                {systemComparison.map(row => (
                  <tr key={row.system}>
                    <td className="sys-name-cell">
                      <strong>{row.name}</strong>
                    </td>
                    <td className="male-cell">{row.maleDetails}</td>
                    <td className="female-cell">{row.femaleDetails}</td>
                    <td className="status-cell">
                      {row.femaleStatus.includes('Partial') ? (
                        <span className="status-badge warning">
                          <AlertTriangle size={12} />
                          <span>आंशिक (Partial)</span>
                        </span>
                      ) : (
                        <span className="status-badge success">
                          <CheckCircle2 size={12} />
                          <span>सत्यापित (Verified)</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
