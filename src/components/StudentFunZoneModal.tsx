import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Heart,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sliders,
  CheckCircle2,
  XCircle,
  Flame,
  Trophy,
  Scissors,
  ArrowRight,
  RotateCcw,
  Search,
  Zap,
  Activity,
  X,
} from 'lucide-react';
import { medicalAudio } from '../utils/medicalAudio';
import { STUDENT_MNEMONICS } from '../data/studentMnemonics';

interface StudentFunZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrgan?: (partId: string) => void;
  onSetLayerSystem?: (system: 'muscular' | 'skeletal' | 'all') => void;
}

interface AuscultationPoint {
  id: string;
  nameEn: string;
  nameHi: string;
  location: string;
  soundType: 'normal' | 'murmur' | 'wheeze';
  clinicalPearl: string;
  suggestedBpm: number;
}

const AUSCULTATION_POINTS: AuscultationPoint[] = [
  {
    id: 'mitral',
    nameEn: 'Mitral / Apex Area',
    nameHi: 'मिट्रल वाल्व (हार्ट एपेक्स)',
    location: 'बायां 5वां इंटरकोस्टल स्पेस (Left 5th ICS), मिड-क्लेविकुलर लाइन',
    soundType: 'normal',
    clinicalPearl: 'S1 (LUB) ध्वनि यहां सबसे तेज सुनाई देती है। मिट्रल रीगर्जिटेशन का पैनसिस्टोलिक मर्मर एक्जिला में फैलता है।',
    suggestedBpm: 72,
  },
  {
    id: 'aortic',
    nameEn: 'Aortic Area',
    nameHi: 'महाधमनी वाल्व (Aortic Area)',
    location: 'दायां दूसरा इंटरकोस्टल स्पेस (2nd Right ICS), स्टर्नल बॉर्डर',
    soundType: 'murmur',
    clinicalPearl: 'Aortic Stenosis में तेज क्रेसेन्डो-डिक्रैसेन्डो सिस्टोलिक मर्मर सुनाई देता है जो कैरोटिड धमनी में रेडिएट करता है।',
    suggestedBpm: 84,
  },
  {
    id: 'pulmonic',
    nameEn: 'Pulmonic Area',
    nameHi: 'फुफ्फुसीय वाल्व (Pulmonic Area)',
    location: 'बायां दूसरा इंटरकोस्टल स्पेस (2nd Left ICS), स्टर्नल बॉर्डर',
    soundType: 'normal',
    clinicalPearl: 'सांस अंदर खींचने पर P2 घटक थोड़ा पीछे हटता है, जिसे सामान्य फिजियोलॉजिकल स्प्लिटिंग (Split S2) कहते हैं।',
    suggestedBpm: 76,
  },
  {
    id: 'tricuspid',
    nameEn: 'Tricuspid Area',
    nameHi: 'ट्राइकस्पिड वाल्व',
    location: 'बायां निचला स्टर्नल किनारा (Left Lower Sternal Border, 4th/5th ICS)',
    soundType: 'normal',
    clinicalPearl: 'कार्वालो संकेत (Carvallo\'s sign): सांस अंदर खींचने पर ट्राइकस्पिड मर्मर की तीव्रता बढ़ जाती है।',
    suggestedBpm: 72,
  },
  {
    id: 'lungs',
    nameEn: 'Lung Bases (Auscultation)',
    nameHi: 'फेफड़े (Vesicular Breath Sounds)',
    location: 'द्विपक्षीय निचला वक्ष (Bilateral Lower Chest)',
    soundType: 'wheeze',
    clinicalPearl: 'अस्थमा या सीओपीडी (COPD) में वायुमार्ग संकरा होने पर एक्सपायरेटरी सीटी जैसी घरघराहट (Wheezing) सुनाई देती है।',
    suggestedBpm: 18,
  },
];

// Cadaver Dissection Steps
interface DissectionLayer {
  stepNumber: number;
  title: string;
  tool: string;
  depth: string;
  structuresSeen: string[];
  anatomistTip: string;
  systemTrigger: 'muscular' | 'skeletal' | 'all';
}

const DISSECTION_LAYERS: DissectionLayer[] = [
  {
    stepNumber: 1,
    title: 'त्वचा और सतही प्रावरणी (Skin & Superficial Fascia)',
    tool: 'No. 10 Scalpel Blade + Toothed Forceps',
    depth: '1-3 mm',
    structuresSeen: ['एपिडर्मिस और डर्मिस', 'सबक्यूटेनियस येलो फैट', 'सतही नसें और त्वचा की तंत्रिकाएं'],
    anatomistTip: 'कट लगाते समय स्कैलपेल को 45 डिग्री के कोण पर रखें ताकि नीचे की पेशियों के फाइबर्स न कटें।',
    systemTrigger: 'all',
  },
  {
    stepNumber: 2,
    title: 'वक्षीय पेशी परत (Pectoralis Major & Muscle Wall)',
    tool: 'Mayo Scissors & Blunt Dissector',
    depth: '10-25 mm',
    structuresSeen: ['पेक्टोरेलिस मेजर', 'पेक्टोरेलिस माइनर', 'डेल्टोपैक्टोरल ग्रूव व सेफेलिक वेन'],
    anatomistTip: 'पेक्टोरेलिस मेजर के क्लेविकुलर और स्टर्नोकोस्टल हेड के बीच की प्राकृतिक दरार को पहले अलग करें।',
    systemTrigger: 'muscular',
  },
  {
    stepNumber: 3,
    title: 'पसलियां और स्टर्नम (Ribcage & Sternochondral Joint)',
    tool: 'Rib Shears / Bone Cutter',
    depth: '30-40 mm',
    structuresSeen: ['स्टर्नम (मैन्यूब्रियम व बॉडी)', 'कोस्टल कार्टिलेज', 'इंटरकोस्टल पेशियां, नर्व व वेसल्स'],
    anatomistTip: 'वैन (VAN) नियम: इंटरकोस्टल ग्रूव में नसें ऊपर से नीचे "Vein, Artery, Nerve" के क्रम में स्थित होती हैं।',
    systemTrigger: 'skeletal',
  },
  {
    stepNumber: 4,
    title: 'हृदय और फेफड़ों का अनावरण (Visceral Mediastinum)',
    tool: 'Fine Metzenbaum Scissors',
    depth: 'Deep Thoracic Cavity',
    structuresSeen: ['पेरीकार्डियल झिल्ली', 'हृदय के चारों कक्ष', 'बायां व दायां फेफड़ा', 'एओर्टिक आर्च'],
    anatomistTip: 'फ्रेनिक नर्व (C3, C4, C5) पेरीकार्डियम के दोनों तरफ से गुजरती है; इसे कभी क्षति न पहुंचाएं!',
    systemTrigger: 'all',
  },
];

// Spotter Exam Questions
interface SpotterQuestion {
  id: string;
  questionHinglish: string;
  clueHinglish: string;
  options: string[];
  correctIndex: number;
  explanationHinglish: string;
  organTargetId?: string;
}

const SPOTTER_QUESTIONS: SpotterQuestion[] = [
  {
    id: 'spot-1',
    questionHinglish: 'इस अंग को पहचानें: शरीर का मुख्य पंपिंग स्टेशन जो बायीं ओर झुका होता है और प्रतिदिन 7,000 लीटर रक्त पंप करता है:',
    clueHinglish: 'वक्ष के मध्य में स्थित, पेरीकार्डियम से ढका हुआ अंग',
    options: ['हृदय (Heart)', 'यकृत (Liver)', 'प्लीहा (Spleen)', 'फेफड़ा (Lung)'],
    correctIndex: 0,
    explanationHinglish: 'हृदय (Heart) का बायां वेंट्रिकल पूरे शरीर में ऑक्सीजन युक्त रक्त पंप करता है।',
    organTargetId: 'FJ1804',
  },
  {
    id: 'spot-2',
    questionHinglish: 'शरीर का सबसे बड़ा आंतरिक अंग और रासायनिक कारखाना (Chemical Factory) कौन सा है?',
    clueHinglish: 'दाएं हाइपोकॉन्ड्रियम में स्थित, पित्त (Bile) का निर्माण करता है',
    options: ['किडनी (Kidney)', 'यकृत (Liver)', 'अग्न्याशय (Pancreas)', 'आमाशय (Stomach)'],
    correctIndex: 1,
    explanationHinglish: 'यकृत (Liver) का वजन लगभग 1.5 किग्रा होता है और यह 500 से अधिक मेटाबॉलिक कार्य करता है।',
    organTargetId: 'FJ1804',
  },
  {
    id: 'spot-3',
    questionHinglish: 'कलाई की उस हड्डी को क्या कहते हैं जो हाथ के बल गिरने पर सबसे अधिक फ्रैक्चर होती है?',
    clueHinglish: 'एनाटॉमिकल स्नफबॉक्स के आधार पर स्थित नाव के आकार की हड्डी',
    options: ['लूनेट (Lunate)', 'स्कैफॉयड (Scaphoid)', 'कैपिटेट (Capitate)', 'पिसीफॉर्म (Pisiform)'],
    correctIndex: 1,
    explanationHinglish: 'Scaphoid में रेट्रोग्रेड ब्लड सप्लाई होती है, फ्रैक्चर होने पर एवास्कुलर नेक्रोसिस (AVN) का खतरा रहता है।',
    organTargetId: 'FJ1316',
  },
  {
    id: 'spot-4',
    questionHinglish: 'मानव शरीर की सबसे लंबी और सबसे मजबूत हड्डी कौन सी है?',
    clueHinglish: 'जांघ की हड्डी जो शरीर के भार का कई गुना सहन कर सकती है',
    options: ['टिबिया (Tibia)', 'ह्यूमरस (Humerus)', 'फीमर (Femur)', 'फाइबुला (Fibula)'],
    correctIndex: 2,
    explanationHinglish: 'फीमर (Femur) शरीर की सबसे मजबूत हड्डी है।',
    organTargetId: 'FJ1316',
  },
  {
    id: 'spot-5',
    questionHinglish: 'दसवीं क्रेनियल नर्व (CN X) कौन सी है जो हृदय गति कम करने और आंतों की गतिशीलता का नियमन करती है?',
    clueHinglish: 'पैरासिम्पैथेटिक तंत्रिका तंत्र की सबसे लंबी "भटकने वाली" तंत्रिका',
    options: ['ट्राइजेमिनल नर्व', 'वेगस नर्व (Vagus Nerve)', 'फेशियल नर्व', 'एब्ड्यूसेंस नर्व'],
    correctIndex: 1,
    explanationHinglish: 'वेगस नर्व (CN X) हृदय, फेफड़े और आमाशय को पैरासिम्पैथेटिक सप्लाई देती है।',
    organTargetId: 'FJ1824',
  },
  {
    id: 'spot-6',
    questionHinglish: 'इंसुलिन और ग्लूकागन हार्मोन स्रावित करने वाले लैंगरहेंस के द्वीप (Islets of Langerhans) किस अंग में होते हैं?',
    clueHinglish: 'सी-आकार के डुओडेनम के घेरे में स्थित मिश्रित ग्रंथि',
    options: ['थायरॉयड (Thyroid)', 'अग्न्याशय (Pancreas)', 'एड्रीनल (Adrenal)', 'पित्ताशय (Gallbladder)'],
    correctIndex: 1,
    explanationHinglish: 'अग्न्याशय (Pancreas) एक एंडोक्राइन और एक्सोक्राइन दोनों प्रकार की ग्रंथि है।',
    organTargetId: 'FJ1804',
  },
];

export const StudentFunZoneModal: React.FC<StudentFunZoneModalProps> = ({
  isOpen,
  onClose,
  onSelectOrgan,
  onSetLayerSystem,
}) => {
  const [activeTab, setActiveTab] = useState<'stethoscope' | 'dissection' | 'mnemonics' | 'spotter'>('stethoscope');
  const [isMuted, setIsMuted] = useState<boolean>(medicalAudio.getIsMuted());

  // Stethoscope Lab State
  const [selectedAuscultation, setSelectedAuscultation] = useState<AuscultationPoint>(AUSCULTATION_POINTS[0]);
  const [isHeartPlaying, setIsHeartPlaying] = useState<boolean>(false);
  const [currentBpm, setCurrentBpm] = useState<number>(72);
  const ecgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const ecgAnimRef = useRef<number | null>(null);

  // Dissection Lab State
  const [currentDissectionStep, setCurrentDissectionStep] = useState<number>(1);

  // Mnemonics State
  const [mnemonicSearch, setMnemonicSearch] = useState<string>('');
  const [selectedMnemonicCategory, setSelectedMnemonicCategory] = useState<string>('all');
  const [expandedMnemonicId, setExpandedMnemonicId] = useState<string>('cranial-nerves-names');

  // Spotter Exam State
  const [spotterQuestionIndex, setSpotterQuestionIndex] = useState<number>(0);
  const [selectedSpotterOption, setSelectedSpotterOption] = useState<number | null>(null);
  const [isSpotterAnswered, setIsSpotterAnswered] = useState<boolean>(false);
  const [spotterScore, setSpotterScore] = useState<number>(0);
  const [spotterStreak, setSpotterStreak] = useState<number>(0);
  const [spotterTimer, setSpotterTimer] = useState<number>(30);
  const [isSpotterFinished, setIsSpotterFinished] = useState<boolean>(false);

  // ECG Animation Canvas
  useEffect(() => {
    if (!isOpen || activeTab !== 'stethoscope') return;

    const canvas = ecgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let x = 0;
    const width = canvas.width;
    const height = canvas.height;
    const midY = height / 2;

    // Clear background
    ctx.fillStyle = '#061019';
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(0, 240, 180, 0.1)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < width; gx += 20) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, height);
      ctx.stroke();
    }
    for (let gy = 0; gy < height; gy += 20) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(width, gy);
      ctx.stroke();
    }

    let cycleProgress = 0;

    const render = () => {
      // Speed factor derived from currentBpm
      const cycleSpeed = (currentBpm / 60) * 0.035;
      cycleProgress = (cycleProgress + cycleSpeed) % 1;

      let waveOffset = 0;
      if (cycleProgress > 0.15 && cycleProgress <= 0.22) {
        // P-wave
        waveOffset = -12 * Math.sin(((cycleProgress - 0.15) / 0.07) * Math.PI);
      } else if (cycleProgress > 0.26 && cycleProgress <= 0.29) {
        // Q-dip
        waveOffset = 8;
      } else if (cycleProgress > 0.29 && cycleProgress <= 0.35) {
        // R-peak (Sharp high spike)
        const rNorm = (cycleProgress - 0.29) / 0.06;
        waveOffset = -55 * Math.sin(rNorm * Math.PI);
      } else if (cycleProgress > 0.35 && cycleProgress <= 0.38) {
        // S-drop
        waveOffset = 18;
      } else if (cycleProgress > 0.48 && cycleProgress <= 0.62) {
        // T-wave
        waveOffset = -18 * Math.sin(((cycleProgress - 0.48) / 0.14) * Math.PI);
      }

      const nextY = midY + waveOffset;

      // Erase trail bar ahead of scan beam
      ctx.fillStyle = '#061019';
      ctx.fillRect((x + 2) % width, 0, 14, height);

      // Re-draw grid under trail
      ctx.strokeStyle = 'rgba(0, 240, 180, 0.12)';
      ctx.strokeRect((x + 2) % width, 0, 14, height);

      // Draw glowing ECG line segment
      ctx.beginPath();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;
      ctx.moveTo(x, midY);
      ctx.lineTo((x + 3) % width, nextY);
      ctx.stroke();

      x = (x + 3) % width;
      ecgAnimRef.current = requestAnimationFrame(render);
    };

    ecgAnimRef.current = requestAnimationFrame(render);

    return () => {
      if (ecgAnimRef.current) {
        cancelAnimationFrame(ecgAnimRef.current);
      }
    };
  }, [isOpen, activeTab, currentBpm]);

  // Clean up heartbeat audio when modal closes or unmounts
  useEffect(() => {
    return () => {
      medicalAudio.stopHeartbeat();
    };
  }, []);

  // Spotter Timer Countdown
  useEffect(() => {
    if (!isOpen || activeTab !== 'spotter' || isSpotterFinished || isSpotterAnswered) return;

    const timer = setInterval(() => {
      setSpotterTimer(prev => {
        if (prev <= 1) {
          // Time up! Auto-reveal
          setIsSpotterAnswered(true);
          medicalAudio.playIncorrectBuzzer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, activeTab, spotterQuestionIndex, isSpotterAnswered, isSpotterFinished]);

  if (!isOpen) return null;

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    medicalAudio.setMuted(nextMuted);
    if (nextMuted && isHeartPlaying) {
      setIsHeartPlaying(false);
      medicalAudio.stopHeartbeat();
    }
  };

  const handleSelectAuscultationPoint = (pt: AuscultationPoint) => {
    setSelectedAuscultation(pt);
    setCurrentBpm(pt.suggestedBpm);
    medicalAudio.playScanBeep();
    if (isHeartPlaying) {
      medicalAudio.startHeartbeat(pt.suggestedBpm, pt.soundType);
    }
  };

  const handleToggleHeartbeatAudio = () => {
    if (isHeartPlaying) {
      medicalAudio.stopHeartbeat();
      setIsHeartPlaying(false);
    } else {
      medicalAudio.startHeartbeat(currentBpm, selectedAuscultation.soundType);
      setIsHeartPlaying(true);
    }
  };

  const handleBpmChange = (bpm: number) => {
    setCurrentBpm(bpm);
    if (isHeartPlaying) {
      medicalAudio.updateHeartbeatBpm(bpm, selectedAuscultation.soundType);
    }
  };

  const handleDissectionStepClick = (step: DissectionLayer) => {
    setCurrentDissectionStep(step.stepNumber);
    medicalAudio.playScalpelCut();
    if (onSetLayerSystem) {
      onSetLayerSystem(step.systemTrigger);
    }
  };

  const handleSpotterAnswer = (idx: number) => {
    if (isSpotterAnswered) return;
    setSelectedSpotterOption(idx);
    setIsSpotterAnswered(true);

    const currentQ = SPOTTER_QUESTIONS[spotterQuestionIndex];
    if (idx === currentQ.correctIndex) {
      const points = 100 + spotterStreak * 25 + spotterTimer * 2;
      setSpotterScore(prev => prev + points);
      setSpotterStreak(prev => prev + 1);
      medicalAudio.playCorrectPing();
    } else {
      setSpotterStreak(0);
      medicalAudio.playIncorrectBuzzer();
    }
  };

  const handleNextSpotterQuestion = () => {
    if (spotterQuestionIndex + 1 < SPOTTER_QUESTIONS.length) {
      setSpotterQuestionIndex(prev => prev + 1);
      setSelectedSpotterOption(null);
      setIsSpotterAnswered(false);
      setSpotterTimer(30);
      medicalAudio.playScanBeep();
    } else {
      setIsSpotterFinished(true);
      medicalAudio.playTrophyFanfare();
    }
  };

  const restartSpotterExam = () => {
    setSpotterQuestionIndex(0);
    setSelectedSpotterOption(null);
    setIsSpotterAnswered(false);
    setSpotterScore(0);
    setSpotterStreak(0);
    setSpotterTimer(30);
    setIsSpotterFinished(false);
  };

  const filteredMnemonics = STUDENT_MNEMONICS.filter(m => {
    const matchesCat = selectedMnemonicCategory === 'all' || m.category === selectedMnemonicCategory;
    const matchesSearch =
      mnemonicSearch.trim() === '' ||
      m.title.toLowerCase().includes(mnemonicSearch.toLowerCase()) ||
      m.mnemonicHinglish.toLowerCase().includes(mnemonicSearch.toLowerCase()) ||
      m.examPearl.toLowerCase().includes(mnemonicSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="student-modal-overlay">
      <div className="student-modal-container glass-panel animate-fade-in">
        {/* Top Header */}
        <div className="student-modal-header">
          <div className="student-header-title-wrap">
            <div className="student-mascot-badge">
              <Sparkles size={20} className="pulse-glow" />
            </div>
            <div>
              <div className="student-header-title-row">
                <h2>स्टूडेंट ज़ोन · मज़ा आ गया! ⚡</h2>
                <span className="badge-high-yield">NEET / MBBS स्पेशल</span>
                <span className="creator-header-pill" title="Lead Architect & Developer: Ajay Saini">by AJAYNXT</span>
              </div>
              <p className="student-header-subtitle">
                लाइव स्टेथोस्कोप, 3D स्पॉटिंग चैलेंज, कैडेवर डिसेक्शन व टॉपर निमोनिक्स
              </p>
            </div>
          </div>

          <div className="student-header-actions">
            <button
              className={`student-sound-toggle-btn ${isMuted ? 'muted' : 'active'}`}
              onClick={toggleSound}
              title={isMuted ? 'ध्वनि चालू करें (Sound On)' : 'ध्वनि बंद करें (Mute)'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isMuted ? 'म्यूट' : 'ऑडियो सक्रिय'}</span>
            </button>
            <button className="student-close-btn" onClick={onClose} title="बंद करें (Esc)">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="student-nav-tabs">
          <button
            className={`student-nav-tab ${activeTab === 'stethoscope' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('stethoscope');
              medicalAudio.playScanBeep();
            }}
          >
            <Heart size={16} className="text-danger" />
            <span>🩺 3D स्टेथोस्कोप व ECG</span>
          </button>
          <button
            className={`student-nav-tab ${activeTab === 'dissection' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('dissection');
              medicalAudio.playScanBeep();
            }}
          >
            <Scissors size={16} className="text-warning" />
            <span>🔪 कैडेवर डिसेक्शन लैब</span>
          </button>
          <button
            className={`student-nav-tab ${activeTab === 'mnemonics' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('mnemonics');
              medicalAudio.playScanBeep();
            }}
          >
            <Zap size={16} className="text-accent" />
            <span>💡 टॉपर निमोनिक्स वॉल्ट</span>
          </button>
          <button
            className={`student-nav-tab ${activeTab === 'spotter' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('spotter');
              medicalAudio.playScanBeep();
            }}
          >
            <Trophy size={16} className="text-success" />
            <span>🏆 3D स्पॉटिंग चैलेंज</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="student-modal-body">
          {/* TAB 1: 3D STETHOSCOPE & ECG MONITOR */}
          {activeTab === 'stethoscope' && (
            <div className="student-stethoscope-tab">
              <div className="stethoscope-grid">
                {/* Left: ECG Monitor & Sound Controls */}
                <div className="ecg-monitor-card glass-panel">
                  <div className="ecg-monitor-header">
                    <div className="ecg-live-indicator">
                      <span className="live-blink-dot" />
                      <strong>लाइव कार्डियक मॉनिटर (ECG LEAD II)</strong>
                    </div>
                    <div className="ecg-bpm-display">
                      <Activity size={18} className="text-accent" />
                      <span className="bpm-number">{currentBpm}</span>
                      <span className="bpm-unit">BPM</span>
                    </div>
                  </div>

                  <div className="ecg-canvas-wrap">
                    <canvas ref={ecgCanvasRef} width={520} height={160} className="ecg-canvas" />
                  </div>

                  {/* Audio Controls */}
                  <div className="stethoscope-audio-controls">
                    <button
                      className={`btn-heartbeat-toggle ${isHeartPlaying ? 'playing' : ''}`}
                      onClick={handleToggleHeartbeatAudio}
                    >
                      {isHeartPlaying ? <Pause size={18} /> : <Play size={18} />}
                      <span>
                        {isHeartPlaying ? 'स्टेथोस्कोप रोकें (Pause Sound)' : 'हार्टबीट सुनें (Listen Heartbeat)'}
                      </span>
                    </button>

                    <div className="bpm-slider-row">
                      <Sliders size={16} />
                      <span className="slider-label">हृदय गति (BPM):</span>
                      <input
                        type="range"
                        min={45}
                        max={160}
                        value={currentBpm}
                        onChange={e => handleBpmChange(Number(e.target.value))}
                        className="bpm-range-slider"
                      />
                      <span className="slider-val">{currentBpm} BPM</span>
                    </div>
                  </div>

                  {/* Clinical Auscultation Pearl Box */}
                  <div className="auscultation-pearl-box">
                    <div className="pearl-title-row">
                      <strong>🩺 क्लिनिकल ऑस्कल्टेशन गाइड: {selectedAuscultation.nameHi}</strong>
                    </div>
                    <p className="pearl-desc">{selectedAuscultation.clinicalPearl}</p>
                    <div className="pearl-meta-tag">
                      <strong>स्थान:</strong> {selectedAuscultation.location}
                    </div>
                  </div>
                </div>

                {/* Right: Chest Auscultation Points Selection */}
                <div className="auscultation-points-card glass-panel">
                  <h3>स्टेथोस्कोप के 5 प्रमुख बिंदु (Auscultation Sites)</h3>
                  <p className="card-subtitle">
                    नीचे दिए गए किसी भी वाल्व या फेफड़े पर क्लिक करें और उसकी विशिष्ट ध्वनि सुनें:
                  </p>

                  <div className="points-list">
                    {AUSCULTATION_POINTS.map(pt => {
                      const isSelected = selectedAuscultation.id === pt.id;
                      return (
                        <div
                          key={pt.id}
                          className={`point-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSelectAuscultationPoint(pt)}
                        >
                          <div className="point-card-top">
                            <span className="point-icon">🩺</span>
                            <div className="point-title-col">
                              <strong>{pt.nameHi}</strong>
                              <span className="point-en-sub">{pt.nameEn}</span>
                            </div>
                            <span className={`point-sound-badge sound-${pt.soundType}`}>
                              {pt.soundType === 'normal'
                                ? 'Normal S1/S2'
                                : pt.soundType === 'murmur'
                                ? 'Systolic Murmur'
                                : 'Wheeze (घरघराहट)'}
                            </span>
                          </div>
                          <p className="point-loc">{pt.location}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VIRTUAL CADAVER DISSECTION LAB */}
          {activeTab === 'dissection' && (
            <div className="student-dissection-tab">
              <div className="dissection-banner glass-panel">
                <div className="banner-left">
                  <Scissors size={24} className="text-warning" />
                  <div>
                    <h3>वर्चुअल कैडेवर डिसेक्शन टेबल (Virtual Slicing Lab)</h3>
                    <p>
                      मेडिकल कॉलेज के एनाटॉमी डिसेक्शन हॉल का जीवंत अनुभव — त्वचा से लेकर गहरे आंतरिक अंगों तक परत-दर-परत अध्ययन करें।
                    </p>
                  </div>
                </div>
                <div className="banner-progress">
                  <span>चरण {currentDissectionStep} / 4</span>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${(currentDissectionStep / 4) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="dissection-steps-grid">
                {DISSECTION_LAYERS.map(layer => {
                  const isActive = currentDissectionStep === layer.stepNumber;
                  const isDone = currentDissectionStep > layer.stepNumber;
                  return (
                    <div
                      key={layer.stepNumber}
                      className={`dissection-step-card glass-panel ${isActive ? 'active' : ''} ${
                        isDone ? 'done' : ''
                      }`}
                      onClick={() => handleDissectionStepClick(layer)}
                    >
                      <div className="step-card-header">
                        <span className="step-number-badge">Step {layer.stepNumber}</span>
                        <span className="depth-badge">गहराई: {layer.depth}</span>
                      </div>

                      <h4 className="step-title">{layer.title}</h4>

                      <div className="step-tool-row">
                        <Scissors size={14} className="text-accent" />
                        <span>उपकरण: {layer.tool}</span>
                      </div>

                      <div className="step-structures">
                        <strong>दृश्यमान संरचनाएं:</strong>
                        <ul>
                          {layer.structuresSeen.map((struct, i) => (
                            <li key={i}>{struct}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="step-tip-box">
                        <strong>💡 डिसेक्शन सूत्र:</strong> {layer.anatomistTip}
                      </div>

                      <button className="btn-layer-dissect">
                        {isActive ? 'वर्तमान सक्रिय परत 🔪' : 'इस परत को काटें (Dissect)'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: TOPPER MNEMONICS VAULT */}
          {activeTab === 'mnemonics' && (
            <div className="student-mnemonics-tab">
              {/* Search & Filter Bar */}
              <div className="mnemonics-controls-row">
                <div className="mnemonics-search-box">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="निमोनिक या अंग खोजें (जैसे: Cranial nerves, Carpal, Spleen, GFR)..."
                    value={mnemonicSearch}
                    onChange={e => setMnemonicSearch(e.target.value)}
                  />
                  {mnemonicSearch && (
                    <button className="clear-search-btn" onClick={() => setMnemonicSearch('')}>
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="mnemonics-filter-pills">
                  {[
                    { id: 'all', label: 'सभी (All)' },
                    { id: 'neuro', label: '🧠 न्यूरो' },
                    { id: 'cardio', label: '🫀 हृदय' },
                    { id: 'ortho', label: '🦴 ऑर्थो' },
                    { id: 'abdomen', label: '🥩 पेट/उदर' },
                  ].map(f => (
                    <button
                      key={f.id}
                      className={`filter-pill-btn ${selectedMnemonicCategory === f.id ? 'active' : ''}`}
                      onClick={() => setSelectedMnemonicCategory(f.id)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mnemonics Cards Grid */}
              <div className="mnemonics-cards-grid">
                {filteredMnemonics.map(m => {
                  const isExpanded = expandedMnemonicId === m.id;
                  return (
                    <div
                      key={m.id}
                      className={`mnemonic-card glass-panel ${isExpanded ? 'expanded' : ''}`}
                    >
                      <div
                        className="mnemonic-card-header"
                        onClick={() => {
                          setExpandedMnemonicId(isExpanded ? '' : m.id);
                          medicalAudio.playScanBeep();
                        }}
                      >
                        <div className="mnemonic-title-col">
                          <span className="mnemonic-badge">{m.badge}</span>
                          <h4>{m.title}</h4>
                        </div>
                        <div className="mnemonic-hook-pill">
                          <code>{m.mnemonicHinglish}</code>
                        </div>
                      </div>

                      {/* Expansion Breakdown */}
                      <div className="mnemonic-expansion-list">
                        {m.expansion.map((item, idx) => (
                          <div key={idx} className="expansion-row">
                            <span className="mnemonic-letter">{item.letter}</span>
                            <div className="expansion-text-col">
                              <strong>{item.meaning}</strong>
                              <p>{item.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Clinical Pearl Box */}
                      <div className="mnemonic-clinical-pearl">
                        <div className="pearl-head">
                          <Sparkles size={14} className="text-warning" />
                          <strong>NEET-PG / USMLE हाई-यील्ड पर्ल:</strong>
                        </div>
                        <p>{m.examPearl}</p>
                      </div>

                      {/* Jump to 3D Button */}
                      {m.targetOrganId && onSelectOrgan && (
                        <button
                          className="btn-jump-3d"
                          onClick={() => {
                            onSelectOrgan(m.targetOrganId!);
                            onClose();
                          }}
                        >
                          <ArrowRight size={14} />
                          <span>इसे 3D मॉडल में देखें</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: 3D SPOTTER SPEED CHALLENGE */}
          {activeTab === 'spotter' && (
            <div className="student-spotter-tab">
              {!isSpotterFinished ? (
                <div className="spotter-game-card glass-panel">
                  {/* Top Score & Timer Ribbon */}
                  <div className="spotter-ribbon">
                    <div className="spotter-score-box">
                      <Trophy size={18} className="text-warning" />
                      <span className="score-val">{spotterScore} अंक</span>
                      {spotterStreak > 1 && (
                        <span className="streak-badge">
                          <Flame size={14} className="text-danger" /> {spotterStreak}x स्ट्रीक!
                        </span>
                      )}
                    </div>

                    <div className="spotter-q-indicator">
                      सवाल {spotterQuestionIndex + 1} / {SPOTTER_QUESTIONS.length}
                    </div>

                    <div className={`spotter-timer-box ${spotterTimer <= 10 ? 'urgent' : ''}`}>
                      <Zap size={16} />
                      <span>{spotterTimer}s</span>
                    </div>
                  </div>

                  {/* Question & Clue */}
                  <div className="spotter-question-body">
                    <span className="spotter-pin-tag">📍 3D स्पॉटिंग क्लिनिकल प्रश्न</span>
                    <h3 className="spotter-question-text">
                      {SPOTTER_QUESTIONS[spotterQuestionIndex].questionHinglish}
                    </h3>

                    <div className="spotter-clue-box">
                      <strong>🔍 कैडेवरिक संकेत:</strong>{' '}
                      {SPOTTER_QUESTIONS[spotterQuestionIndex].clueHinglish}
                    </div>
                  </div>

                  {/* 4 MCQ Options */}
                  <div className="spotter-options-grid">
                    {SPOTTER_QUESTIONS[spotterQuestionIndex].options.map((opt, idx) => {
                      const isSelected = selectedSpotterOption === idx;
                      const isCorrect = idx === SPOTTER_QUESTIONS[spotterQuestionIndex].correctIndex;
                      let btnStateClass = '';
                      if (isSpotterAnswered) {
                        if (isCorrect) btnStateClass = 'correct';
                        else if (isSelected) btnStateClass = 'incorrect';
                      }

                      return (
                        <button
                          key={idx}
                          className={`spotter-option-btn ${btnStateClass}`}
                          onClick={() => handleSpotterAnswer(idx)}
                          disabled={isSpotterAnswered}
                        >
                          <span className="opt-letter">{['A', 'B', 'C', 'D'][idx]}</span>
                          <span className="opt-text">{opt}</span>
                          {isSpotterAnswered && isCorrect && <CheckCircle2 size={18} className="text-success" />}
                          {isSpotterAnswered && isSelected && !isCorrect && (
                            <XCircle size={18} className="text-danger" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Answer Explanation Box */}
                  {isSpotterAnswered && (
                    <div className="spotter-explanation-box animate-fade-in">
                      <div className="expl-title">
                        {selectedSpotterOption === SPOTTER_QUESTIONS[spotterQuestionIndex].correctIndex ? (
                          <span className="text-success">✅ शाबाश! सही उत्तर!</span>
                        ) : (
                          <span className="text-danger">❌ ओहो! गलत उत्तर!</span>
                        )}
                      </div>
                      <p>{SPOTTER_QUESTIONS[spotterQuestionIndex].explanationHinglish}</p>

                      <div className="spotter-footer-actions">
                        <button className="btn-next-question" onClick={handleNextSpotterQuestion}>
                          <span>अगला सवाल</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Victory Screen */
                <div className="spotter-victory-card glass-panel animate-fade-in">
                  <div className="trophy-mascot">🏆</div>
                  <h2>शानदार! 3D स्पॉटिंग राउंड पूर्ण!</h2>
                  <p className="victory-subtitle">
                    आपने मेडिकल एनाटॉमी स्पॉटिंग टेस्ट सफलतापूर्वक पूरा कर लिया है।
                  </p>

                  <div className="victory-stats-row">
                    <div className="v-stat-card">
                      <span className="v-val">{spotterScore}</span>
                      <span className="v-label">कुल प्राप्तांक</span>
                    </div>
                    <div className="v-stat-card">
                      <span className="v-val">
                        {spotterScore >= 400
                          ? '👑 चीफ सर्जन (Chief Surgeon)'
                          : spotterScore >= 200
                          ? '🏥 सीनियर रेजिडेंट (Senior Resident)'
                          : '🩺 क्लिनिकल इंटर्न (Clinical Intern)'}
                      </span>
                      <span className="v-label">आपकी मेडिकल उपाधि</span>
                    </div>
                  </div>

                  <div className="victory-actions">
                    <button className="btn-restart-spotter" onClick={restartSpotterExam}>
                      <RotateCcw size={16} />
                      <span>दोबारा टेस्ट दें (Play Again)</span>
                    </button>
                    <button className="btn-close-spotter" onClick={onClose}>
                      <span>3D मॉडल पर वापस जाएं</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
