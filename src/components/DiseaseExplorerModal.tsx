import React, { useState } from 'react';
import type { ClinicalDisease } from '../types/atlas';
import { CLINICAL_DISEASES } from '../data/diseases';
import { Search, X, Stethoscope, AlertCircle, ShieldCheck, Eye, Activity } from 'lucide-react';

interface DiseaseExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDisease: (disease: ClinicalDisease) => void;
}

export const DiseaseExplorerModal: React.FC<DiseaseExplorerModalProps> = ({
  isOpen,
  onClose,
  onSelectDisease,
}) => {
  const [search, setSearch] = useState('');
  const [selectedSystemFilter, setSelectedSystemFilter] = useState<string>('all');

  if (!isOpen) return null;

  const filteredDiseases = CLINICAL_DISEASES.filter(d => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.hindiName.toLowerCase().includes(search.toLowerCase()) ||
      d.overview.toLowerCase().includes(search.toLowerCase()) ||
      d.affectedPartNames.some(p => p.toLowerCase().includes(search.toLowerCase()));

    const matchesSystem =
      selectedSystemFilter === 'all' || d.system === selectedSystemFilter;

    return matchesSearch && matchesSystem;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="disease-modal-content glass-panel" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-left">
            <div className="header-icon-box">
              <Stethoscope size={20} className="text-danger" />
            </div>
            <div>
              <h3 className="modal-title">संपूर्ण रोग एवं चिकित्सा कोश (Clinical Disease Encyclopedia)</h3>
              <p className="modal-subtitle">
                मानव शरीर के प्रमुख अंग, उनसे जुड़ी बीमारियां, लक्षण, कारण एवं 3D विज़ुअलाइज़ेशन
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="modal-search-row">
          <div className="modal-search-input-wrap">
            <Search size={18} />
            <input
              type="text"
              autoFocus
              placeholder="बीमारी का नाम या अंग खोजें (उदा: Heart Attack, Asthma, Stones, Liver, Brain)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="clear-search-btn" onClick={() => setSearch('')}>
                <X size={15} />
              </button>
            )}
          </div>

          <div className="system-pill-filters">
            <button
              className={`filter-pill ${selectedSystemFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedSystemFilter('all')}
            >
              सभी रोग ({CLINICAL_DISEASES.length})
            </button>
            <button
              className={`filter-pill ${selectedSystemFilter === 'cardiac' ? 'active' : ''}`}
              onClick={() => setSelectedSystemFilter('cardiac')}
            >
              हृदय (Cardio)
            </button>
            <button
              className={`filter-pill ${selectedSystemFilter === 'respiratory' ? 'active' : ''}`}
              onClick={() => setSelectedSystemFilter('respiratory')}
            >
              फेफड़े (Respiratory)
            </button>
            <button
              className={`filter-pill ${selectedSystemFilter === 'nervous' ? 'active' : ''}`}
              onClick={() => setSelectedSystemFilter('nervous')}
            >
              मस्तिष्क (Brain)
            </button>
            <button
              className={`filter-pill ${selectedSystemFilter === 'digestive' ? 'active' : ''}`}
              onClick={() => setSelectedSystemFilter('digestive')}
            >
              पाचन / लिवर (Digestive)
            </button>
            <button
              className={`filter-pill ${selectedSystemFilter === 'skeletal' ? 'active' : ''}`}
              onClick={() => setSelectedSystemFilter('skeletal')}
            >
              कंकाल / जोड़ (Skeletal)
            </button>
            <button
              className={`filter-pill ${selectedSystemFilter === 'urinary' ? 'active' : ''}`}
              onClick={() => setSelectedSystemFilter('urinary')}
            >
              किडनी (Renal)
            </button>
          </div>
        </div>

        {/* Diseases List */}
        <div className="modal-scroll-body">
          {filteredDiseases.length === 0 ? (
            <div className="no-disease-found">
              <Activity size={36} className="text-muted" />
              <p>"{search}" से संबंधित कोई बीमारी नहीं मिली।</p>
              <span>कृपया कोई अन्य अंग या बीमारी का नाम लिखकर खोजें।</span>
            </div>
          ) : (
            <div className="disease-grid">
              {filteredDiseases.map(disease => (
                <div key={disease.id} className="disease-encyclopedia-card">
                  <div className="card-top-bar">
                    <span className={`severity-tag ${disease.severity}`}>
                      {disease.severity === 'critical'
                        ? 'गंभीर (Critical)'
                        : disease.severity === 'chronic'
                        ? 'क्रोनिक (दीर्घकालिक)'
                        : 'मध्यम'}
                    </span>
                    <button
                      className="isolate-3d-button"
                      onClick={() => {
                        onSelectDisease(disease);
                        onClose();
                      }}
                    >
                      <Eye size={14} />
                      <span>3D अंग देखें (Inspect in 3D)</span>
                    </button>
                  </div>

                  <h4 className="disease-hindi-heading">{disease.hindiName}</h4>
                  <span className="disease-eng-sub">{disease.name}</span>

                  <p className="disease-brief">{disease.overview}</p>

                  <div className="disease-organs-affected">
                    <strong>प्रभावित अंग:</strong>
                    {disease.affectedPartNames.map((organ, oIdx) => (
                      <span key={oIdx} className="organ-tag">
                        {organ}
                      </span>
                    ))}
                  </div>

                  <div className="symptoms-preview">
                    <strong>
                      <AlertCircle size={13} className="text-danger inline-icon" />
                      लक्षण:
                    </strong>
                    <span>{disease.symptoms.slice(0, 2).join('; ')}...</span>
                  </div>

                  <div className="prevention-preview">
                    <strong>
                      <ShieldCheck size={13} className="text-success inline-icon" />
                      बचाव:
                    </strong>
                    <span>{disease.prevention[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
