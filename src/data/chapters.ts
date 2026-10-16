import type { BookChapter } from '../types/atlas';
import { CLINICAL_DISEASES } from './diseases';

export const BOOK_CHAPTERS: BookChapter[] = [
  // CHAPTER 1: CARDIAC & CARDIOVASCULAR
  {
    id: 'chapter-cardiac',
    chapterNumber: 1,
    systemId: 'cardiac',
    title: 'The Heart & Circulatory Engine',
    hindiTitle: 'अध्याय 1: हृदय एवं रक्त परिसंचरण तंत्र',
    subtitle: 'जीवन का केंद्रीय पंप — चार कक्ष, वाल्व और अथक धड़कन',
    recommendedBooks: [
      "Gray's Anatomy 42nd Ed (Sec. 7: Thorax)",
      "BD Chaurasia's Human Anatomy Vol 1 (Thorax)",
      "Guyton & Hall Textbook of Medical Physiology (Unit III: Circulation)",
      "Netter's Atlas of Human Anatomy (Section 3: Thorax)"
    ],
    introductionHinglish: 'मानव हृदय (Heart) मुट्ठी के आकार का एक शक्तिशाली पेशीय पंप (Muscular Pump) है जो छाती के केंद्र में, फेफड़ों के बीच और थोड़ा बाईं ओर स्थित होता है। यह दिन में लगभग 1,00,000 बार धड़कता है और हर मिनट लगभग 5 लीटर खून पूरे शरीर में पंप करता है। इसमें चार कक्ष (Chambers) होते हैं: दो आलिंद (Atria) और दो निलय (Ventricles)।',
    howItWorksHinglish: 'शरीर का अशुद्ध रक्त सुपीरियर और इन्फीरियर वेना कावा के जरिए दाएं आलिंद (Right Atrium) में आता है। वहां से ट्राइकसपिड वाल्व से होकर दाएं निलय (Right Ventricle) में जाता है, जो इसे पल्मोनरी धमनी के जरिए फेफड़ों में ऑक्सीजन लेने भेजता है। फेफड़ों से ताजा शुद्ध खून बाएं आलिंद (Left Atrium) में आता है और फिर बाएं निलय (Left Ventricle) द्वारा महाधमनी (Aorta) से पूरे शरीर में भेजा जाता है।',
    introductionHindi: 'मानव हृदय वक्ष गुहा के मध्य में स्थित एक त्रिकोणाकार पेशीय अंग है। यह प्रति मिनट 72 बार संकुचित होकर रुधिर को फेफड़ों एवं संपूर्ण कायिक परिसंचरण में प्रवाहित करता है। हृदय पेरिकार्डियम नामक द्वि-स्तरीय झिल्ली से सुरक्षित रहता है।',
    introductionEn: 'The human heart is a hollow, muscular organ situated in the middle mediastinum. Functioning as a dual-action suction-and-pressure pump, it delivers oxygenated blood to systemic tissues while propelling deoxygenated blood to the pulmonary bed.',
    howItWorksHindi: 'महाशिराओं द्वारा अशुद्ध रक्त दाएं आलिंद में एकत्र होता है, जहां से त्रिवलनी कपाट द्वारा दाएं निलय में पहुंचता है। फुफ्फुसीय धमनी इसे फेफड़ों में ले जाती है। शुद्ध रक्त फुफ्फुसीय शिराओं द्वारा बाएं आलिंद और अंततः महाधमनी द्वारा संपूर्ण शरीर में पंप किया जाता है।',
    howItWorksEn: 'Systemic venous blood drains into the right atrium, passes through the tricuspid valve into the right ventricle, and is ejected into the pulmonary trunk. Oxygenated pulmonary venous blood enters the left atrium and left ventricle, ejecting through the aorta at high systemic pressures.',
    commonDiseases: CLINICAL_DISEASES.filter(d => d.system === 'cardiac' || d.system === 'arterial'),
    parts: [
      {
        id: 'heart-organ',
        name: 'Heart (Cor)',
        hindiName: 'मानव हृदय (दिल)',
        latinName: 'Cor humanum',
        pronunciation: 'kôr hyoo-muh-nuhm',
        system: 'cardiac',
        elements: ['FJ1890', 'FJ1891', 'FJ1892', 'FJ1893', 'FJ1894', 'FJ1895', 'FJ1896', 'FJ1897', 'FJ1898'],
        locationHinglish: 'छाती के बीच में (Mediastinum), स्टर्नम हड्डी के पीछे और दोनों फेफड़ों के बीच, 2/3 हिस्सा बाईं ओर झुका हुआ।',
        functionHinglish: 'पूरे शरीर और मस्तिष्क को चौबीसों घंटे ऑक्सीजन, ग्लूकोज और पोषक तत्वों से भरपूर रक्त पहुंचाना।',
        funFactHinglish: 'औसत मानव जीवनकाल में दिल लगभग 2.5 अरब (2.5 billion) बार धड़कता है — बिना 1 सेकंड भी रुके!',
        clinicalNoteHinglish: 'ईसीजी (ECG) और इकोकार्डियोग्राफी (ECHO) से दिल की धड़कन और वाल्व की सेहत की जांच की जाती है।',
        highYieldMnemonic: 'TPMA ("Toilet Paper My Ass"): रक्त प्रवाह का वाल्व क्रम — Tricuspid -> Pulmonary -> Mitral -> Aortic',
        examPearls: [
          'हार्ट का पेसमेकर: SA Node (Sinoatrial node) दाएं आलिंद की दीवार में होता है (60-100 bpm)।',
          'कोरोनरी साइनस दाएं आलिंद में खुलता है (Thebesian valve द्वारा संरक्षित)।',
          'Apex of Heart: 5वें इंटरकोस्टल स्पेस में, मिड-क्लैविकल लाइन से 9 सेमी बाईं ओर स्थित होता है।'
        ],
        citations: [
          {
            book: "Gray's Anatomy (42nd Edition)",
            citation: "Section 7: Thorax, Chapter 53 (Heart and Pericardium), pp. 984–1012",
            highYieldFact: "The fibrous skeleton of the heart electrically insulates the atria from the ventricles, ensuring sequential contraction coordinated solely via the Atrioventricular (AV) bundle of His."
          },
          {
            book: "BD Chaurasia's Human Anatomy Vol 1",
            citation: "Section II: Thorax, Chapter 18 (Pericardium & Heart), pp. 265–290",
            highYieldFact: "Crux of the heart is the intersection of the posterior interatrial and interventricular grooves with the posterior atrioventricular groove, determining coronary dominance (Right in ~85-90%)."
          },
          {
            book: "Guyton and Hall Textbook of Medical Physiology",
            citation: "Unit III: Heart, Chapter 9 (Cardiac Muscle; The Heart as a Pump), pp. 109–122",
            highYieldFact: "Frank-Starling Law: The intrinsic ability of the heart to adapt to increasing volumes of inflowing blood; within physiological limits, greater stretch produces greater force of contraction."
          }
        ],
        relatedDiseases: ['Coronary Artery Disease', 'Heart Failure', 'Arrhythmia'],
      },
      {
        id: 'left-ventricle',
        name: 'Left Ventricle',
        hindiName: 'बायां निलय (मुख्य पंपिंग कक्ष)',
        latinName: 'Ventriculus sinister cordis',
        pronunciation: 'ven-TRIK-yoo-lus SIN-is-ter',
        system: 'cardiac',
        elements: ['FJ1890', 'FJ1894'],
        locationHinglish: 'हृदय के निचले बाएं हिस्से में; इसकी पेशीय दीवार (Myocardium) सबसे मोटी (लगभग 12-15 मिमी) होती है।',
        functionHinglish: 'यह दिल का सबसे शक्तिशाली कक्ष है जो शुद्ध खून को 120 mmHg के भारी दबाव के साथ महाधमनी (Aorta) में धकेलता है।',
        funFactHinglish: 'बाएं निलय का दबाव इतना अधिक होता है कि यह रक्त को 30 फीट की ऊंचाई तक उछाल सकता है!',
        clinicalNoteHinglish: 'हाई बीपी के मरीजों में काम का बोझ बढ़ने से यह दीवार फूल जाती है, जिसे Left Ventricular Hypertrophy (LVH) कहते हैं।',
        highYieldMnemonic: 'LV = Life Vital: 3 गुना मोटा मायोकार्डियम दाएं निलय की तुलना में क्योंकि इसे पूरे शरीर में खून भेजना होता है।',
        examPearls: [
          'दीवार की मोटाई: 8-12 mm (दाएं निलय से 3x मोटी)।',
          'माइट्रल वाल्व में केवल 2 कस्प (Bicuspid) होते हैं: Anterior और Posterior।',
          'पैपिलरी मसल्स (Papillary muscles) कॉर्डे टेंडीनी (Chordae Tendineae) के जरिए वाल्व को खींचकर रखते हैं ताकि उल्टी दिशा में न खुलें।'
        ],
        citations: [
          {
            book: "Robbins & Cotran Pathologic Basis of Disease (10th Ed)",
            citation: "Chapter 12: Diseases of the Cardiovascular System, pp. 531–545",
            highYieldFact: "Left-sided heart failure is the most common cause of pulmonary edema; chronic hypertension leads to concentric left ventricular hypertrophy with diminished compliance."
          }
        ],
        relatedDiseases: ['Left Ventricular Failure', 'Hypertensive Heart Disease'],
      },
      {
        id: 'cardiac-valves',
        name: 'Cardiac Valves (Aortic & Mitral)',
        hindiName: 'हृदय के वाल्व (माइट्रल एवं एओर्टिक वाल्व)',
        latinName: 'Valvae cordis',
        pronunciation: 'VAL-vee KOR-dis',
        system: 'cardiac',
        elements: ['FJ1892', 'FJ1893', 'FJ1895'],
        locationHinglish: 'आलिंद और निलय के बीच और महाधमनी के मुहाने पर लगे एकतरफा कपाट (One-way doors)।',
        functionHinglish: 'रक्त को केवल एक ही दिशा में आगे बहने देना और पीछे लौटने (Backflow) से पूरी तरह रोकना।',
        funFactHinglish: 'स्टेथोस्कोप से सुनाई देने वाली "लब-डब" (Lub-Dub) आवाज वास्तव में दिल की मांसपेशियों की नहीं, बल्कि इन वाल्वों के बंद होने की ध्वनि है!',
        clinicalNoteHinglish: 'वाल्व में खराबी आने पर रक्त रिसने लगता है (Regurgitation या Stenosis), जिससे हार्ट मर्मर (Murmur) सुनाई देती है।',
        highYieldMnemonic: 'LUB = AV Valves बंद (S1), DUB = Semilunar Valves बंद (S2)',
        examPearls: [
          'S1 ध्वनी (Lub): Mitral और Tricuspid वाल्व बंद होने से।',
          'S2 ध्वनी (Dub): Aortic और Pulmonary वाल्व बंद होने से।',
          'माइट्रल स्टेनोसिस (Mitral Stenosis) रूमेटिक हार्ट डिजीज (RHD) का सबसे आम परिणाम है।'
        ],
        citations: [
          {
            book: "Netter's Atlas of Human Anatomy (7th Edition)",
            citation: "Section 3: Thorax, Plate 218 (Valves and Fibrous Skeleton of Heart)",
            highYieldFact: "Aortic valve contains three semilunar cusps (right, left, posterior/non-coronary). The ostia of right and left coronary arteries arise from aortic sinuses of Valsalva."
          }
        ],
        relatedDiseases: ['Rheumatic Heart Disease', 'Aortic Stenosis', 'Mitral Valve Prolapse'],
      },
    ],
  },

  // CHAPTER 2: SKELETAL SYSTEM
  {
    id: 'chapter-skeletal',
    chapterNumber: 2,
    systemId: 'skeletal',
    title: 'The Skeletal System & Framework',
    hindiTitle: 'अध्याय 2: कंकाल तंत्र (मानव अस्थि ढांचा)',
    subtitle: '206 हड्डियां, संधियां और सुरक्षा कवच — शरीर का आधारभूत ढांचा',
    recommendedBooks: [
      "Gray's Anatomy 42nd Ed (Sec. 2: Skeletal System)",
      "BD Chaurasia's Human Anatomy Vol 1 & 2 (General Anatomy & Osteology)",
      "Netter's Atlas of Human Anatomy (Section 1: General Anatomy)",
      "Snell's Clinical Anatomy by Regions"
    ],
    introductionHinglish: 'मानव कंकाल शरीर का मुख्य आंतरिक ढांचा (Endoskeleton) है। जन्म के समय एक शिशु में लगभग 300 हड्डियां होती हैं, जो बड़े होने पर आपस में जुड़कर 206 रह जाती हैं। कंकाल शरीर को सीधा खड़ा रखता है, नाजुक अंगों (जैसे दिमाग, दिल, फेफड़े) की रक्षा करता है, और मांसपेशियों को गति के लिए लीवर प्रदान करता है।',
    howItWorksHinglish: 'हड्डियां केवल मृत कैल्शियम का खंभा नहीं हैं, बल्कि सजीव ऊतक (Living tissue) हैं। इनमें लगातार पुरानी हड्डी टूटती है (Osteoclasts) और नई हड्डी बनती है (Osteoblasts)। लंबी हड्डियों के अंदर स्थित लाल अस्थिमज्जा (Red Bone Marrow) में हर सेकंड 20 लाख नई लाल रक्त कोशिकाएं (RBCs) बनती हैं।',
    commonDiseases: CLINICAL_DISEASES.filter(d => d.system === 'skeletal'),
    parts: [
      {
        id: 'cranium-skull',
        name: 'Cranium & Facial Skeleton',
        hindiName: 'खोपड़ी (कपाल एवं मुख अस्थियां)',
        latinName: 'Cranium humanum',
        pronunciation: 'KRAY-nee-um',
        system: 'skeletal',
        elements: ['FJ1252', 'FJ1253', 'FJ1254', 'FJ1255'],
        locationHinglish: 'सिर के शीर्ष और चेहरे का भाग, जो 22 हड्डियों से मिलकर बना एक सुरक्षात्मक बक्सा है।',
        functionHinglish: 'मस्तिष्क (Brain), आंखों और आंतरिक कान को बाहरी चोट और झटकों से पूरी तरह सुरक्षित रखना।',
        funFactHinglish: 'खोपड़ी की केवल एक ही हड्डी हिल-डुल सकती है — निचला जबड़ा (Mandible), जिससे हम बोलते और चबाते हैं!',
        clinicalNoteHinglish: 'खोपड़ी की हड्डियों के बीच की सिलाई जैसी रेखाओं को सूचर्स (Sutures) कहते हैं, जो शैशवावस्था के बाद आपस में जुड़ जाती हैं।',
        highYieldMnemonic: 'PEST OF 6 (Neurocranium bones): Parietal, Ethmoid, Sphenoid, Temporal, Occipital, Frontal',
        examPearls: [
          'टेरियन (Pterion): खोपड़ी का सबसे नाजुक बिंदु जहां 4 हड्डियां (Frontal, Parietal, Temporal, Sphenoid) मिलती हैं। इसके ठीक नीचे Middle Meningeal Artery होती है — चोट लगने पर Extradural Hematoma (EDH) होता है!',
          'फोरमैन मैग्नम (Foramen magnum): ओसीसीपिटल हड्डी में स्थित सबसे बड़ा छिद्र जहां से स्पाइनल कॉर्ड निकलती है।'
        ],
        citations: [
          {
            book: "BD Chaurasia's Human Anatomy Vol 3",
            citation: "Section III: Head and Neck, Chapter 14 (The Skull), pp. 12–42",
            highYieldFact: "Pterion fracture is a high-yield emergency: blunt trauma to the temple lacerates the anterior division of the middle meningeal artery, producing an extradural biconvex lentiform hematoma on CT."
          }
        ],
        relatedDiseases: ['Skull Fracture', 'Craniosynostosis'],
      },
      {
        id: 'femur-bone',
        name: 'Femur (Thigh Bone)',
        hindiName: 'फीमर (जांघ की हड्डी / उरु-अस्थि)',
        latinName: 'Os femoris',
        pronunciation: 'FEE-mer',
        system: 'skeletal',
        elements: ['FJ1500', 'FJ1501', 'FJ1502'],
        locationHinglish: 'कूल्हे के जोड़ (Pelvis) से लेकर घुटने के जोड़ तक फैली जांघ की हड्डी।',
        functionHinglish: 'शरीर का सारा भार संभालना और चलने, दौड़ने और कूदने के लिए सबसे शक्तिशाली उत्तोलक (Lever) का काम करना।',
        funFactHinglish: 'फीमर मानव शरीर की सबसे लंबी, सबसे भारी और सबसे मजबूत हड्डी है। यह कंक्रीट से भी अधिक दबाव सह सकती है!',
        clinicalNoteHinglish: 'बुजुर्गों में ऑस्टियोपोरोसिस के कारण फीमर की गर्दन (Neck of femur) का फ्रैक्चर बहुत आम और गंभीर होता है।',
        highYieldMnemonic: 'Angle of Inclination: वयस्कों में लगभग 125° होता है। कम होने पर Coxa Vara, अधिक होने पर Coxa Valga कहलाता है।',
        examPearls: [
          'Neck of femur की रक्त आपूर्ति: Medial circumflex femoral artery से आती है। फ्रैक्चर होने पर Avascular Necrosis (AVN) का भारी खतरा होता है!',
          'फीमर की लंबाई व्यक्ति की कुल लंबाई का लगभग 1/4 (26%) होती है।'
        ],
        citations: [
          {
            book: "Gray's Anatomy (42nd Edition)",
            citation: "Section 10: Pelvis and Lower Limb, Chapter 79 (Femur & Hip Joint), pp. 1350–1368",
            highYieldFact: "The retinacular vessels arising from the trochanteric anastomosis (primarily the medial circumflex femoral artery) supply the femoral head; subcapital fractures sever these, risking avascular necrosis."
          }
        ],
        relatedDiseases: ['Femoral Neck Fracture', 'Osteoporosis'],
      },
      {
        id: 'vertebral-column',
        name: 'Vertebral Column (Spine)',
        hindiName: 'रीढ़ की हड्डी (कशेरुक दंड)',
        latinName: 'Columna vertebralis',
        pronunciation: 'ko-LUM-nuh ver-te-BRAH-lis',
        system: 'skeletal',
        elements: ['FJ1310', 'FJ1311', 'FJ1312', 'FJ1313'],
        locationHinglish: 'गर्दन से लेकर कमर के निचले हिस्से (कमर-कूल्हा) तक पीठ के बीच में स्थित 33 कशेरुकाओं (Vertebrae) की श्रृंखला।',
        functionHinglish: 'शरीर को लचीलापन और संतुलन देना और सबसे महत्वपूर्ण — नाजुक स्पाइनल कॉर्ड (Spinal Cord) को चारों तरफ से सुरक्षा देना।',
        funFactHinglish: 'दिनभर गुरुत्वाकर्षण के दबाव के कारण रीढ़ की हड्डियों के बीच की डिस्क दब जाती हैं, इसलिए शाम को हमारी लंबाई सुबह से 1 सेमी कम हो जाती है!',
        clinicalNoteHinglish: 'डिस्क के खिसक जाने (Slipped / Herniated Disc) से साइटिका नस दब जाती है और पैर में तेज दर्द होता है।',
        highYieldMnemonic: 'Breakfast at 7, Lunch at 12, Dinner at 5: Cervical (7), Thoracic (12), Lumbar (5) vertebrae!',
        examPearls: [
          'C1 कशेरुका को Atlas (यस बोन) और C2 को Axis (नो बोन) कहते हैं।',
          'Spinal Cord L1-L2 कशेरुका के स्तर पर समाप्त (Conus Medullaris) हो जाती है।',
          'Lumbar Puncture (LP) हमेशा L3-L4 या L4-L5 के बीच किया जाता है ताकि स्पाइनल कॉर्ड सुरक्षित रहे।'
        ],
        citations: [
          {
            book: "BD Chaurasia's Human Anatomy Vol 2",
            citation: "Section IV: Back & Vertebral Column, Chapter 22, pp. 310–332",
            highYieldFact: "Lumbar puncture safely enters the subarachnoid cistern between L3/L4 or L4/L5 spines, identified by the supracristal plane (Tuffier's line) intersecting the highest points of iliac crests."
          }
        ],
        relatedDiseases: ['Slip Disc / Sciatica', 'Spondylosis', 'Scoliosis'],
      },
    ],
  },

  // CHAPTER 3: NERVOUS SYSTEM & BRAIN
  {
    id: 'chapter-nervous',
    chapterNumber: 3,
    systemId: 'nervous',
    title: 'The Brain & Neural Network',
    hindiTitle: 'अध्याय 3: तंत्रिका तंत्र एवं मस्तिष्क',
    subtitle: 'शरीर का सुपरकंप्यूटर — 86 अरब न्यूरॉन्स, चेतना और नियंत्रण',
    recommendedBooks: [
      "Gray's Anatomy 42nd Ed (Sec. 3: Neuroanatomy)",
      "BD Chaurasia's Human Anatomy Vol 4 (Brain & Neuroanatomy)",
      "Guyton & Hall Textbook of Medical Physiology (Unit IX: Nervous System)",
      "Snell's Clinical Neuroanatomy (8th Edition)"
    ],
    introductionHinglish: 'मानव मस्तिष्क (Human Brain) ब्रह्मांड की सबसे जटिल ज्ञात संरचना है। लगभग 1.4 किलोग्राम वजन का यह अंग लगभग 86 अरब न्यूरॉन्स (Neurons) और खरबों सिनेप्स (Synaptic connections) से बना है। शरीर के कुल वजन का केवल 2% होने के बावजूद, यह हमारे शरीर की 20% ऑक्सीजन और ग्लूकोज ऊर्जा अकेले खर्च करता है।',
    howItWorksHinglish: 'मस्तिष्क के मुख्य तीन हिस्से हैं: सेरेब्रम (सोच, याददाश्त, भाषा), सेरेबेलम (संतुलन और चलना-फिरना), और ब्रेनस्टेम (धड़कन, सांस और बीपी का नियंत्रण)। मस्तिष्क से निकलकर रीढ़ की हड्डी (Spinal cord) पूरे शरीर में बिजली के तारों की तरह तंत्रिकाओं (Nerves) का जाल बिछाती है, जो 400 किमी/घंटा की गति से संकेत भेजते हैं।',
    commonDiseases: CLINICAL_DISEASES.filter(d => d.system === 'nervous'),
    parts: [
      {
        id: 'cerebrum-cortex',
        name: 'Cerebrum (Cerebral Cortex)',
        hindiName: 'प्रमस्तिष्क (सेरेब्रम / मुख्य मस्तिष्क)',
        latinName: 'Telencephalon / Cerebrum',
        pronunciation: 'seh-REE-brum',
        system: 'nervous',
        elements: ['FJ2200', 'FJ2201', 'FJ2202', 'FJ2203'],
        locationHinglish: 'खोपड़ी के अंदर मस्तिष्क का सबसे बड़ा ऊपरी हिस्सा, जो दो गोलार्धों (Hemispheres) में बंटा होता है।',
        functionHinglish: 'सचेत सोच, बुद्धि, भाषा, भावनाएं, दृश्य-श्रव्य विश्लेषण और स्वैच्छिक मांसपेशियों का नियंत्रण।',
        funFactHinglish: 'मस्तिष्क की सतह पर मौजूद सिलवटों (Gyri and Sulci) को अगर सपाट फैलाया जाए, तो यह एक तकिए के कवर के बराबर क्षेत्रफल घेरेगी!',
        clinicalNoteHinglish: 'बाएं सेरेब्रल हेमिस्फेयर का स्ट्रोक शरीर के दाएं हिस्से में लकवा (Hemiplegia) और बोलने में असमर्थता (Aphasia) पैदा करता है।',
        highYieldMnemonic: 'Broca\'s Area = Broken speech (बोलने में दिक्कत), Wernicke\'s Area = Word salad (समझने में दिक्कत)',
        examPearls: [
          'ब्रोका का क्षेत्र (Brodmann Area 44, 45) इन्फीरियर फ्रंटल गाइरस में स्थित होता है।',
          'वर्निके का क्षेत्र (Brodmann Area 22) सुपीरियर टेम्पोरल गाइरस में स्थित होता है।',
          'सर्किल ऑफ विलिस (Circle of Willis): मस्तिष्क के आधार पर इंटरनल कैरोटिड और वर्टिब्रल धमनियों का एनास्टोमोसिस चक्र है।'
        ],
        citations: [
          {
            book: "Snell's Clinical Neuroanatomy (8th Edition)",
            citation: "Chapter 7: The Cerebral Hemispheres, pp. 260–292",
            highYieldFact: "The primary motor cortex (Brodmann area 4) in the precentral gyrus maps the contralateral human body as an inverted motor homunculus, with oversized representations for the face and hands."
          }
        ],
        relatedDiseases: ['Ischemic Stroke', 'Brain Tumor', 'Epilepsy'],
      },
      {
        id: 'cerebellum',
        name: 'Cerebellum (Little Brain)',
        hindiName: 'अनुमस्तिष्क (सेरेबेलम / छोटा दिमाग)',
        latinName: 'Cerebellum',
        pronunciation: 'ser-uh-BEL-um',
        system: 'nervous',
        elements: ['FJ2250', 'FJ2251'],
        locationHinglish: 'सिर के पिछले और निचले हिस्से में, सेरेब्रम के नीचे और ब्रेनस्टेम के पीछे स्थित।',
        functionHinglish: 'शरीर का शारीरिक संतुलन, मुद्रा (Posture) और सूक्ष्म मांसपेशियों की गति (जैसे लिखना, पियानो बजाना) का समन्वय।',
        funFactHinglish: 'मस्तिष्क के कुल आकार का मात्र 10% होने पर भी सेरेबेलम में पूरे दिमाग के 50% से अधिक न्यूरॉन्स मौजूद होते हैं!',
        clinicalNoteHinglish: 'अल्कोहल सबसे पहले सेरेबेलम को सुन्न करता है, इसीलिए शराब पीने के बाद व्यक्ति डगमगाने लगता है और उसकी आवाज लड़खड़ाती है।',
        highYieldMnemonic: 'VANISHED (Cerebellar signs): Vertigo, Ataxia, Nystagmus, Intention tremor, Slurred speech, Hypotonia, Exaggerated rebound, Dysdiadochokinesia',
        examPearls: [
          'Purkinje Cells: सेरेबेलर कॉर्टेक्स की विशालकाय न्यूरॉन्स जो एकमात्र आउटपुट (GABA-ergic inhibitory) देती हैं।',
          'Archicerebellum (Flocculonodular lobe) संतुलन और Vestibular सिस्टम को संभालता है।'
        ],
        citations: [
          {
            book: "Guyton and Hall Textbook of Medical Physiology",
            citation: "Unit IX: Nervous System, Chapter 57 (Cerebellar Contributions to Motor Control), pp. 707–720",
            highYieldFact: "The cerebellum functions as a real-time predictive error-comparator: comparing intentions from the motor cortex with sensory feedback from muscle spindles, dampening overshoot via Purkinje inhibition."
          }
        ],
        relatedDiseases: ['Cerebellar Ataxia', 'Vertigo'],
      },
    ],
  },

  // CHAPTER 4: RESPIRATORY SYSTEM
  {
    id: 'chapter-respiratory',
    chapterNumber: 4,
    systemId: 'respiratory',
    title: 'The Respiratory System & Lungs',
    hindiTitle: 'अध्याय 4: श्वसन तंत्र (फेफड़े एवं प्राणवायु)',
    subtitle: 'हर सांस में जीवन — 30 करोड़ वायु कोष और गैसों का जादुई आदान-प्रदान',
    recommendedBooks: [
      "Gray's Anatomy 42nd Ed (Sec. 7: Respiratory System)",
      "BD Chaurasia's Human Anatomy Vol 1 (Thorax)",
      "Guyton & Hall Physiology (Unit VII: Respiration)",
      "West's Respiratory Physiology: The Essentials"
    ],
    introductionHinglish: 'श्वसन तंत्र का काम हमारे शरीर की प्रत्येक कोशिका को निरंतर ऑक्सीजन (O2) देना और कोशिकीय दहन से पैदा होने वाली हानिकारक कार्बन डाइऑक्साइड (CO2) को बाहर फेंकना है। एक वयस्क व्यक्ति दिन में लगभग 20,000 बार सांस लेता है और करीब 11,000 लीटर हवा फेफड़ों में खींचता है।',
    howItWorksHinglish: 'नाक से अंदर खींची गई हवा श्वास नली (Trachea) से होकर ब्रोंकाई और ब्रोंकिओल्स की अनगिनत शाखाओं में बंटती है। अंत में यह हवा अंगूर के गुच्छों जैसे सूक्ष्म वायु कोष्ठकों (Alveoli) में पहुंचती है। यहां हवा की ऑक्सीजन रक्त की लाल कोशिकाओं में मौजूद हीमोग्लोबिन से जुड़ जाती है और रक्त की CO2 बाहर निकल जाती है।',
    commonDiseases: CLINICAL_DISEASES.filter(d => d.system === 'respiratory'),
    parts: [
      {
        id: 'lungs-paired',
        name: 'Lungs (Pulmones)',
        hindiName: 'फेफड़े (दायां एवं बायां फेफड़ा)',
        latinName: 'Pulmones',
        pronunciation: 'pool-MO-nays',
        system: 'respiratory',
        elements: ['FJ2400', 'FJ2401', 'FJ2402', 'FJ2403'],
        locationHinglish: 'छाती के दोनों तरफ, दिल के अगल-बगल प्लूरल कैविटी (Pleural cavity) के अंदर।',
        functionHinglish: 'हवा से ऑक्सीजन खींचकर रक्त में मिलाना और शरीर के विषैले एसिड गैस (CO2) को सांस द्वारा बाहर निकालना।',
        funFactHinglish: 'दायां फेफड़ा 3 भागों (Lobes) में बंटा होता है, जबकि बायां फेफड़ा दिल को जगह देने के लिए थोड़ा छोटा और केवल 2 भागों में बंटा होता है!',
        clinicalNoteHinglish: 'यदि दोनों फेफड़ों के सभी एल्वियोली को खोलकर बिछाया जाए, तो उनका क्षेत्रफल एक टेनिस कोर्ट (Tennis Court) जितना बड़ा होगा!',
        highYieldMnemonic: 'RALS: Pulmonary Artery की स्थिति ब्रोंकस के संदर्भ में — Right Anterior, Left Superior (RALS at Hilum)',
        examPearls: [
          'दाएं फेफड़े में 3 लोब और 10 ब्रोंको-पल्मोनरी सेगमेंट्स होते हैं।',
          'बाएं फेफड़े में कार्डियक नॉच (Cardiac notch) और लिंगुला (Lingula) होता है।',
          'सर्फेक्टेंट (Surfactant): टाइप II न्यूमोसाइट्स बनाते हैं (Dipalmitoylphosphatidylcholine), जो एल्वियोली को पिचकने से रोकता है।'
        ],
        citations: [
          {
            book: "West's Respiratory Physiology (11th Ed)",
            citation: "Chapter 2: Ventilation and Blood-Gas Barrier, pp. 11–26",
            highYieldFact: "The human blood-gas barrier has an average thickness of merely 0.2 to 0.3 micrometers across an immense surface area of 50 to 100 square meters, perfectly optimizing Fick's Law of diffusion."
          }
        ],
        relatedDiseases: ['Pneumonia', 'COPD', 'Asthma', 'Tuberculosis'],
      },
      {
        id: 'diaphragm-muscle',
        name: 'Diaphragm',
        hindiName: 'डायफ्राम (मध्यच्छद पेशी)',
        latinName: 'Diaphragma',
        pronunciation: 'DIE-uh-fram',
        system: 'muscular',
        elements: ['FJ2100'],
        locationHinglish: 'छाती (Thorax) और पेट (Abdomen) के बीच गुंबद के आकार की एक बड़ी पेशीय चादर।',
        functionHinglish: 'सांस लेने की मुख्य मांसपेशी। जब यह नीचे सिकुड़ती है, तो छाती में निर्वात (Vacuum) बनता है और हवा अपने आप फेफड़ों में खिंच आती है।',
        funFactHinglish: 'जब डायफ्राम की नस (Phrenic nerve) में अकारण ऐंठन या झटका लगता है, तो अचानक वोकल कॉर्ड्स बंद होते हैं और "हिचकी" (Hiccup) आती है!',
        clinicalNoteHinglish: 'गंभीर कोविड या पक्षाघात में डायफ्राम कमजोर पड़ने पर मरीज को मैकेनिकल वेंटिलेटर पर रखना पड़ता है।',
        highYieldMnemonic: 'Voice of America: T8 = Vena cava, T10 = Oesophagus, T12 = Aortic hiatus',
        examPearls: [
          'T8 छिद्र: IVC और दाएं फ्रेनिक नर्व की शाखाएं।',
          'T10 छिद्र: इसोफेगस और दोनों वेगस नर्व्स।',
          'T12 छिद्र: एओर्टा, थोरेसिक डक्ट और एज़ाइगस वेन।'
        ],
        citations: [
          {
            book: "BD Chaurasia's Human Anatomy Vol 1",
            citation: "Thorax: Diaphragm and Its Openings, pp. 240–248",
            highYieldFact: "Motor innervation to the entire diaphragm is supplied exclusively by the phrenic nerves (roots C3, C4, C5: 'C3, 4, 5 keeps the diaphragm alive')."
          }
        ],
        relatedDiseases: ['Diaphragmatic Hernia', 'Hiccups'],
      },
    ],
  },

  // CHAPTER 5: DIGESTIVE SYSTEM
  {
    id: 'chapter-digestive',
    chapterNumber: 5,
    systemId: 'digestive',
    title: 'The Digestive System & Metabolism',
    hindiTitle: 'अध्याय 5: पाचन तंत्र एवं यकृत (मेटाबॉलिज्म)',
    subtitle: 'शरीर की रासायनिक प्रयोगशाला — भोजन से ऊर्जा, रस और डिटॉक्सिफिकेशन',
    recommendedBooks: [
      "Gray's Anatomy 42nd Ed (Sec. 8: Alimentary System)",
      "BD Chaurasia's Human Anatomy Vol 2 (Abdomen)",
      "Guyton & Hall Physiology (Unit XII: Gastrointestinal Physiology)",
      "Robbins Pathology (Chapter 17 & 18: Liver and Gastrointestinal Tract)"
    ],
    introductionHinglish: 'पाचन तंत्र लगभग 9 मीटर (30 फीट) लंबी एक निरंतर भोजन नली (Alimentary canal) और उससे जुड़ी सहायक ग्रंथियों (लिवर, पित्ताशय, पैंक्रियाज) का समूह है। इसका काम खाए गए भोजन को सूक्ष्म रासायनिक इकाइयों (ग्लूकोज, अमीनो एसिड, फैटी एसिड) में तोड़ना है, ताकि शरीर उन्हें अवशोषित कर ऊर्जा बना सके।',
    howItWorksHinglish: 'पेट (Stomach) में भोजन हाइड्रोक्लोरिक एसिड और पेप्सिन एंजाइम के साथ मंथन होता है। फिर छोटी आंत (Small intestine) में लिवर का पित्त (Bile) और पैंक्रियाटिक जूस मिलकर वसा और प्रोटीन को पूरी तरह पचाते हैं। छोटी आंत की उंगलियों जैसी संरचनाएं (Villi) पोषक तत्वों को सीधे खून में सोख लेती हैं।',
    commonDiseases: CLINICAL_DISEASES.filter(d => d.system === 'digestive'),
    parts: [
      {
        id: 'liver-hepar',
        name: 'Liver (Hepar)',
        hindiName: 'यकृत (लिवर / जिगर)',
        latinName: 'Hepar',
        pronunciation: 'HEE-par',
        system: 'digestive',
        elements: ['FJ2600', 'FJ2601', 'FJ2602'],
        locationHinglish: 'पेट के ऊपरी दाहिने हिस्से में, पसलियों के ठीक नीचे और डायफ्राम से सटा हुआ (लगभग 1.5 किलो का सबसे बड़ा आंतरिक अंग)।',
        functionHinglish: 'शरीर का डिटॉक्स प्लांट — 500 से अधिक कार्य! पित्त (Bile) बनाना, विषैले रसायनों को नष्ट करना, ग्लूकोज को ग्लाइकोजन के रूप में संचित करना।',
        funFactHinglish: 'लिवर मानव शरीर का एकमात्र ऐसा अंग है जो 75% कट जाने पर भी दोबारा पूरा नया उग सकता है (Regeneration)!',
        clinicalNoteHinglish: 'लिवर के काम न करने पर पित्त का रंगद्रव्य (Bilirubin) खून में बढ़ जाता है, जिससे आंखें व त्वचा पीली पड़ जाती हैं (Jaundice)।',
        highYieldMnemonic: 'PORTA HEPATIS (Anterior to posterior): Duct (Bile duct), Artery (Hepatic artery), Vein (Portal vein) - D-A-V',
        examPearls: [
          'लिवर को 75-80% रक्त सप्लाई पोर्टल वेन (न्यूट्रिएंट युक्त) से और 20-25% हेपेटिक आर्टरी (ऑक्सीजन युक्त) से मिलती है।',
          'कुफ़्फ़र कोशिकाएं (Kupffer cells): लिवर के सिनुसॉइड्स में स्थित विशेष मैक्रोफेज हैं जो बैक्टीरिया और पुरानी RBCs को खाते हैं।',
          'Couinaud के अनुसार लिवर 8 कार्यात्मक सेगमेंट्स (I to VIII) में विभाजित है।'
        ],
        citations: [
          {
            book: "Robbins & Cotran Pathologic Basis of Disease (10th Ed)",
            citation: "Chapter 18: Liver and Gallbladder, pp. 825–870",
            highYieldFact: "Cirrhosis represents diffuse parenchymal destruction with bridging fibrous septa and regenerative parenchymal nodules, causing portal hypertension and caput medusae."
          }
        ],
        relatedDiseases: ['Liver Cirrhosis', 'Fatty Liver (NAFLD)', 'Hepatitis B & C'],
      },
      {
        id: 'stomach-gaster',
        name: 'Stomach (Gaster)',
        hindiName: 'आमाशय (पेट / स्टमक)',
        latinName: 'Gaster / Ventriculus',
        pronunciation: 'GAS-ter',
        system: 'digestive',
        elements: ['FJ2630'],
        locationHinglish: 'पेट के ऊपरी बाएं भाग में, ग्रासनली (Esophagus) और छोटी आंत के बीच अंग्रेजी के "J" अक्षर के आकार की थैली।',
        functionHinglish: 'भोजन को 2 से 4 घंटे तक मथना और अत्यंत शक्तिशाली हाइड्रोक्लोरिक एसिड (pH 1.5 - 2) से कीटाणुओं को मारकर प्रोटीन पचाना।',
        funFactHinglish: 'पेट का एसिड इतना शक्तिशाली होता है कि वह रेजर ब्लेड को भी गला सकता है! पेट खुद इसलिए नहीं जलता क्योंकि इसकी भीतरी दीवार मोटी म्यूकस से ढकी होती है।',
        clinicalNoteHinglish: 'पेट की सुरक्षात्मक म्यूकस परत कमजोर होने पर एसिड पेट को ही जला देता है, जिसे पेप्टिक अल्सर (Peptic Ulcer) कहते हैं।',
        highYieldMnemonic: 'Parietal cells = Proton (HCl) + Intrinsic Factor (Vitamin B12 अवशोषण के लिए अनिवार्य)',
        examPearls: [
          'चीफ सेल्स (Chief cells) पेप्सिनोजेन (Pepsinogen) स्रावित करती हैं।',
          'G-cells एंट्रम में गैस्ट्रिन (Gastrin) हार्मोन बनाती हैं।',
          'इंट्रिन्सिक फैक्टर की कमी से पर्निशियस एनीमिया (Pernicious Anemia) होता है।'
        ],
        citations: [
          {
            book: "Guyton and Hall Textbook of Medical Physiology",
            citation: "Unit XII: Gastrointestinal Physiology, Chapter 65 (Secretory Functions of the Alimentary Tract), pp. 799–812",
            highYieldFact: "Parietal (oxyntic) cells utilize a specialized H+/K+ ATPase proton pump to pump hydrogen ions against a concentration gradient exceeding 1 million-to-1, acidifying gastric juice to pH 0.8."
          }
        ],
        relatedDiseases: ['Peptic Ulcer', 'Gastritis', 'GERD (Acid Reflux)'],
      },
      {
        id: 'pancreas-organ',
        name: 'Pancreas',
        hindiName: 'अग्न्याशय (पैंक्रियाज)',
        latinName: 'Pancreas',
        pronunciation: 'PAN-kree-us',
        system: 'digestive',
        elements: ['FJ2650'],
        locationHinglish: 'पेट के पीछे, रीढ़ की हड्डी के ठीक आगे स्थित चपटी पत्ती जैसी ग्रंथि।',
        functionHinglish: 'दोहरा कार्य: 1. पाचन एंजाइम बनाना जो छोटी आंत में भोजन पचाते हैं। 2. इंसुलिन हार्मोन बनाना जो रक्त में शुगर को नियंत्रित करता है।',
        funFactHinglish: 'पैंक्रियाज के बिना हम मीठे का एक दाना भी नहीं पचा सकते! इसके आइलेट्स ऑफ लैंगरहेंस (Islets of Langerhans) सीधे खून में इंसुलिन छोड़ते हैं।',
        clinicalNoteHinglish: 'जब पैंक्रियाज इंसुलिन बनाना कम या बंद कर देता है, तो खून में ग्लूकोज बढ़ जाता है, जिसे डायबिटीज मेलिटस (मधुमेह) कहते हैं।',
        highYieldMnemonic: 'Alpha = Glucagon (बढ़ाए), Beta = Insulin (घटाए), Delta = Somatostatin (रोके)',
        examPearls: [
          'पैंक्रियाज का सिर (Head) ड्यूओडेनम (C-loop of duodenum) के आगोश में रहता है।',
          'मेन पैंक्रियाटिक डक्ट (Duct of Wirsung) बाइल डक्ट के साथ मिलकर एम्पुला ऑफ वाटेर (Ampulla of Vater) में खुलती है।'
        ],
        citations: [
          {
            book: "BD Chaurasia's Human Anatomy Vol 2",
            citation: "Abdomen: Pancreas and Duodenum, pp. 268–281",
            highYieldFact: "Carcinoma of the head of pancreas compresses the common bile duct, presenting classically as painless progressive jaundice with a palpable enlarged gallbladder (Courvoisier's law)."
          }
        ],
        relatedDiseases: ['Diabetes Mellitus', 'Pancreatitis', 'Pancreatic Cancer'],
      },
    ],
  },

  // CHAPTER 6: URINARY SYSTEM
  {
    id: 'chapter-urinary',
    chapterNumber: 6,
    systemId: 'urinary',
    title: 'The Renal & Urinary System',
    hindiTitle: 'अध्याय 6: गुर्दे एवं मूत्र विसर्जन तंत्र',
    subtitle: 'शरीर का वॉटर प्यूरीफायर — 180 लीटर रक्त की दैनिक छनाई और संतुलन',
    recommendedBooks: [
      "Gray's Anatomy 42nd Ed (Sec. 9: Urogenital System)",
      "BD Chaurasia's Human Anatomy Vol 2 (Kidneys & Ureters)",
      "Guyton & Hall Physiology (Unit V: The Body Fluids and Kidneys)",
      "Robbins Pathology (Chapter 14: The Kidney)"
    ],
    introductionHinglish: 'मूत्र तंत्र में दो किडनियां (गुर्दे), दो मूत्रवाहिनी (Ureters), एक मूत्राशय (Urinary Bladder) और एक मूत्रमार्ग (Urethra) होते हैं। यह तंत्र शरीर के आंतरिक वातावरण को बिल्कुल संतुलित (Homeostasis) रखता है। यह रक्त से यूरिया, यूरिक एसिड और अतिरिक्त लवणों को छानकर पेशाब के रूप में बाहर निकालता है।',
    howItWorksHinglish: 'प्रत्येक किडनी के अंदर 10 लाख से अधिक सूक्ष्म फिल्टर होते हैं जिन्हें नेफ्रॉन (Nephrons) कहते हैं। रीनल धमनी से आया खून ग्लोमेरुलस में भारी दबाव से छनता है। शरीर के लिए जरूरी पानी, ग्लूकोज और इलेक्ट्रोलाइट्स वापस सोख लिए जाते हैं, और केवल 1 से 2 लीटर अपशिष्ट मूत्र बनकर मूत्राशय में जमा होता है।',
    commonDiseases: CLINICAL_DISEASES.filter(d => d.system === 'urinary'),
    parts: [
      {
        id: 'kidneys-renes',
        name: 'Kidneys (Renes)',
        hindiName: 'गुर्दे (किडनी - दायां व बायां गुर्दा)',
        latinName: 'Renes',
        pronunciation: 'REE-neez',
        system: 'urinary',
        elements: ['FJ2700', 'FJ2701'],
        locationHinglish: 'पीठ के निचले हिस्से में, पसलियों के नीचे दोनों तरफ रीढ़ की हड्डी के अगल-बगल (राजमा के बीज जैसे आकार के)।',
        functionHinglish: 'दिन भर में 180 लीटर रक्त छानना, इलेक्ट्रोलाइट्स (सोडियम, पोटेशियम) संतुलित करना, और रेनिन हार्मोन से ब्लड प्रेशर नियंत्रित करना।',
        funFactHinglish: 'दाहिनी किडनी बाईं किडनी से 1-2 सेमी नीचे होती है, क्योंकि उसके ठीक ऊपर विशालकाय लिवर स्थित होता है!',
        clinicalNoteHinglish: 'यदि दोनों किडनियां 90% से अधिक खराब हो जाएं, तो जीवन बचाने के लिए कृत्रिम मशीन से रक्त छानना पड़ता है, जिसे डायलिसिस (Dialysis) कहते हैं।',
        highYieldMnemonic: 'V-A-U (Renal Hilum from front to back): Vein anterior, Artery middle, Ureter posterior',
        examPearls: [
          'नेफ्रॉन (Nephron): किडनी की संरचनात्मक एवं कार्यात्मक इकाई (~1-1.2 मिलियन प्रति किडनी)।',
          'जुक्स्टाग्लोमेरुलर उपकरण (JGA) रेनिन (Renin) हार्मोन छोड़ता है जो RAAS पाथवे से बीपी बढ़ाता है।',
          'एरिथ्रोपोइटिन (EPO) हार्मोन किडनी से निकलता है जो अस्थिमज्जा में RBCs बनवाता है।'
        ],
        citations: [
          {
            book: "Guyton and Hall Textbook of Medical Physiology",
            citation: "Unit V: The Body Fluids and Kidneys, Chapter 26 (Glomerular Filtration and Renal Blood Flow), pp. 323–342",
            highYieldFact: "Normal Glomerular Filtration Rate (GFR) is approximately 125 mL/min (~180 L/day). Over 99% of filtered water and sodium is reabsorbed by the tubular system."
          }
        ],
        relatedDiseases: ['Kidney Stones', 'Chronic Kidney Disease (CKD)', 'Glomerulonephritis'],
      },
      {
        id: 'urinary-bladder',
        name: 'Urinary Bladder',
        hindiName: 'मूत्राशय (यूरिनरी ब्लैडर)',
        latinName: 'Vesica urinaria',
        pronunciation: 'VES-ih-kuh yoo-rih-NAIR-ee-uh',
        system: 'urinary',
        elements: ['FJ2720'],
        locationHinglish: 'पेल्विस (पेड़ू) की हड्डी के ठीक पीछे स्थित एक लचीली पेशीय थैली।',
        functionHinglish: 'किडनी से बूंद-बूंद करके आने वाले मूत्र को 400 से 600 मिलीलीटर तक सुरक्षित रूप से जमा रखना और जरूरत पड़ने पर बाहर निकालना।',
        funFactHinglish: 'मूत्राशय जब खाली होता है तो यह सिकुड़कर सपाट हो जाता है, लेकिन भरने पर यह फूलकर एक बड़ी नाशपाती जितना ऊंचा उठ जाता है!',
        clinicalNoteHinglish: 'महिलाओं में मूत्रमार्ग छोटा होने के कारण यूरिनरी ट्रैक्ट इन्फेक्शन (UTI) बहुत आम होता है, जिससे पेशाब में तेज जलन होती है।',
        highYieldMnemonic: 'Detrusor Contracts, Internal Sphincter Relaxes = Micturition (Parasympathetic control S2, 3, 4)',
        examPearls: [
          'ट्रांजिशनल एपिथीलियम (Urothelium): मूत्राशय की दीवार में पाया जाने वाला विशेष खिंचावदार ऊतक।',
          'ट्राइगोन (Trigone of bladder): मूत्राशय के आधार पर स्थित चिकना त्रिकोण जो भ्रूणीय रूप से मेसोडर्म से बनता है।'
        ],
        citations: [
          {
            book: "BD Chaurasia's Human Anatomy Vol 2",
            citation: "Pelvis: Urinary Bladder and Prostate, pp. 385–398",
            highYieldFact: "Trigone of the urinary bladder is bounded by two ureteric orifices superiorly and the internal urethral orifice inferiorly; its mucosa remains smooth even when empty."
          }
        ],
        relatedDiseases: ['Urinary Tract Infection (UTI)', 'Cystitis', 'Bladder Stones'],
      },
    ],
  },

  // CHAPTER 7: FEMALE REPRODUCTIVE SYSTEM
  {
    id: 'chapter-female-reproductive',
    chapterNumber: 7,
    systemId: 'reproductive',
    title: 'The Female Reproductive System & Embryology',
    hindiTitle: 'अध्याय 7: महिला प्रजनन एवं भ्रूण विकास तंत्र',
    subtitle: 'जीवन की उत्पत्ति की जननी — गर्भाशय, अंडाशय और मासिक धर्म चक्र',
    recommendedBooks: [
      "Gray's Anatomy 42nd Ed (Sec. 9: Female Reproductive System)",
      "BD Chaurasia's Human Anatomy Vol 2 (Pelvis: Uterus, Ovaries & Vagina)",
      "Guyton & Hall Physiology (Unit XIV: Endocrinology & Female Reproduction)",
      "DC Dutta's Textbook of Obstetrics & Gynecology"
    ],
    introductionHinglish: 'महिला प्रजनन तंत्र (Female Reproductive System) नए मानव जीवन को उत्पन्न करने, पोषित करने और जन्म देने के लिए प्रकृति का सबसे विस्मयकारी तंत्र है। इसमें आंतरिक अंग (गर्भाशय, दो अंडाशय, दो फैलोपियन ट्यूब, योनि) और स्तन ग्रंथियां शामिल हैं। यह मासिक धर्म चक्र (Menstrual Cycle) और गर्भावस्था (Pregnancy) के लिए एस्ट्रोजन और प्रोजेस्टेरोन हार्मोन का स्राव करता है।',
    howItWorksHinglish: 'प्रत्येक माह अंडाशय से एक परिपक्व अंडाणु (Ovum) ओव्यूलेशन द्वारा बाहर निकलता है और फैलोपियन ट्यूब में आता है। यदि 24 घंटे में शुक्राणु द्वारा निषेचन (Fertilization) हो जाता है, तो बनने वाला जाइगोट गर्भाशय में आकर प्रत्यारोपित (Implant) होता है और 9 माह तक प्लेसेंटा द्वारा विकसित होकर शिशु बनता है। निषेचन न होने पर गर्भाशय की आंतरिक परत (Endometrium) टूटकर माहवारी के रूप में बाहर निकल जाती है।',
    commonDiseases: CLINICAL_DISEASES.filter(d => d.id === 'pcos-pcod' || d.id === 'endometriosis'),
    parts: [
      {
        id: 'uterus-womb',
        name: 'Uterus (Womb / Metra)',
        hindiName: 'गर्भाशय (बच्चेदानी / यूटरस)',
        latinName: 'Uterus / Metra',
        pronunciation: 'YOO-ter-us',
        system: 'reproductive',
        elements: ['FJ2750', 'FJ2751'],
        locationHinglish: 'महिला श्रोणि गुहा (Pelvic cavity) में मूत्राशय के पीछे और मलाशय के आगे स्थित नाशपाती के आकार का खोखला पेशीय अंग।',
        functionHinglish: 'निषेचित भ्रूण को 9 महीने तक सुरक्षित रखना, प्लेसेंटा से पोषण देना, और प्रसव के समय शक्तिशाली संकुचन (Oxytocin द्वारा) से शिशु को जन्म देना।',
        funFactHinglish: 'गर्भावस्था के दौरान गर्भाशय अपने सामान्य आकार से लगभग 500 गुना अधिक फैल सकता है — मानव शरीर की किसी भी अन्य मांसपेशी से अधिक!',
        clinicalNoteHinglish: 'गर्भाशय की आंतरिक एंडोमेट्रियल परत की मोटाई अल्ट्रासाउंड से मापी जाती है; फाइब्रॉएड (Fibroids) गर्भाशय की मांसपेशियों में बनने वाली हानिरहित रसौली हैं।',
        highYieldMnemonic: 'Antiverted & Antiflexed (AV & AF): गर्भाशय की सामान्य शारीरिक स्थिति (Angle of Anteversion ~90°, Angle of Anteflexion ~120-170°)',
        examPearls: [
          'गर्भाशय की 3 परतें होती हैं: Endometrium (आंतरिक), Myometrium (मोटी पेशीय दीवार), Perimetrium (बाहरी सीरस परत)।',
          'गर्भाशय की रक्त आपूर्ति: Uterine Artery (Internal Iliac Artery की पूर्ववर्ती शाखा) द्वारा होती है।',
          'Mackrodt\'s / Cardinal ligaments गर्भाशय को पेल्विस में सहारा देने वाले सबसे मुख्य लिगामेंट्स हैं।'
        ],
        citations: [
          {
            book: "BD Chaurasia's Human Anatomy Vol 2",
            citation: "Pelvis: Uterus and Fallopian Tubes, pp. 415–432",
            highYieldFact: "The relation of the ureter to the uterine artery is crucial in hysterectomy: 'Water runs under the bridge' — the ureter passes approximately 1.5 cm lateral to the cervix beneath the uterine artery."
          },
          {
            book: "Guyton and Hall Textbook of Medical Physiology",
            citation: "Unit XIV, Chapter 82 (Female Physiology and Hormones), pp. 1037–1054",
            highYieldFact: "The LH Surge (Luteinizing Hormone peak) triggers rupture of the mature Graafian follicle and ovulation precisely 24 to 36 hours later, initiating the luteal secretory phase."
          }
        ],
        relatedDiseases: ['Endometriosis', 'Uterine Fibroids', 'Cervical Cancer'],
      },
      {
        id: 'ovaries-paired',
        name: 'Ovaries (Oophoron)',
        hindiName: 'अंडाशय (ओवरी - दायां व बायां अंडाशय)',
        latinName: 'Ovaria',
        pronunciation: 'oh-VAIR-ee-uh',
        system: 'reproductive',
        elements: ['FJ2760', 'FJ2761'],
        locationHinglish: 'गर्भाशय के दोनों तरफ पेल्विक दीवार में स्थित बादाम के आकार की दो प्राथमिक जनन ग्रंथियां।',
        functionHinglish: 'दोहरा जीवन-कार्य: 1. डिंब/अंडाणु (Ova) का उत्पादन। 2. महिला सेक्स हार्मोन एस्ट्रोजन और प्रोजेस्टेरोन का निरंतर संश्लेषण।',
        funFactHinglish: 'एक बालिका अपने दोनों अंडाशयों में लगभग 10 से 20 लाख अपरिपक्व अंडों के साथ जन्म लेती है, जिनमें से पूरे जीवनकाल में केवल लगभग 400 अंडे ही परिपक्व होकर ओव्यूलेट होते हैं!',
        clinicalNoteHinglish: 'अंडाशय में हार्मोन असंतुलन से PCOS (पॉलीसिस्टिक ओवरी सिंड्रोम) होता है, जिससे चेहरे पर अनचाहे बाल, मुंहासे और अनियमित माहवारी होती है।',
        highYieldMnemonic: 'Ovary Double Blood Supply: Ovarian Artery (Abdominal Aorta से L2 स्तर पर) और Uterine Artery की शाखाएं',
        examPearls: [
          'अंडाशय का लिगामेंट (Ovarian Ligament) इसे गर्भाशय से और सस्पेंसरी लिगामेंट (Infundibulopelvic) इसे पेल्विक दीवार से जोड़ता है।',
          'कॉर्पस ल्यूटियम (Corpus Luteum): ओव्यूलेशन के बाद बनने वाली पीली ग्रंथि जो गर्भावस्था बनाए रखने के लिए प्रोजेस्टेरोन बनाती है।'
        ],
        citations: [
          {
            book: "Gray's Anatomy (42nd Edition)",
            citation: "Section 9: Pelvis, Chapter 75 (Female Internal Genital Organs), pp. 1290–1308",
            highYieldFact: "Ovarian lymphatic drainage flows primarily upward along the ovarian vessels directly to para-aortic lymph nodes near the origin of renal arteries, distinct from cervical lymphatics."
          }
        ],
        relatedDiseases: ['Polycystic Ovary Syndrome (PCOS)', 'Ovarian Cyst', 'Ovarian Cancer'],
      },
    ],
  },

  // CHAPTER 8: MALE REPRODUCTIVE SYSTEM
  {
    id: 'chapter-male-reproductive',
    chapterNumber: 8,
    systemId: 'reproductive',
    title: 'The Male Reproductive System & Endocrinology',
    hindiTitle: 'अध्याय 8: पुरुष प्रजनन तंत्र एवं एंड्रोजन प्रणाली',
    subtitle: 'शुक्राणु जनन, टेस्टोस्टेरोन और पौरुष ग्रंथि की कार्यप्रणाली',
    recommendedBooks: [
      "Gray's Anatomy 42nd Ed (Sec. 9: Male Reproductive System)",
      "BD Chaurasia's Human Anatomy Vol 2 (Pelvis: Prostate, Scrotum & Testes)",
      "Guyton & Hall Physiology (Unit XIV: Male Reproductive Functions)",
      "Campbell-Walsh Urology (12th Edition)"
    ],
    introductionHinglish: 'पुरुष प्रजनन तंत्र (Male Reproductive System) शुक्राणुओं (Spermatozoa) के उत्पादन, पोषण और स्थानांतरण के लिए उत्तरदायी है। इसमें दो वृषण (Testes), अधिवृषण (Epididymis), शुक्रवाहक नलिका (Vas Deferens), प्रोस्टेट ग्रंथि, सेमिनल वेसिकल्स और शिश्न (Penis) शामिल हैं। यह मुख्य पुरुष सेक्स हार्मोन टेस्टोस्टेरोन (Testosterone) का उत्पादन करता है।',
    howItWorksHinglish: 'वृषण शरीर के बाहर अंडकोष (Scrotum) में स्थित होते हैं क्योंकि शुक्राणु बनने (Spermatogenesis) के लिए शरीर के आंतरिक तापमान (37°C) से 2 से 3 डिग्री सेल्सियस कम तापमान जरूरी होता है। शुक्राणु सेमिनिफेरस नलिकाओं में बनते हैं और एपिडिडीमिस में परिपक्व होते हैं। वीर्यस्खलन के समय प्रोस्टेट और सेमिनल वेसिकल्स का पोषक द्रव मिलकर वीर्य (Semen) बनाता है जो मूत्रमार्ग द्वारा उत्सर्जित होता है।',
    commonDiseases: CLINICAL_DISEASES.filter(d => d.id === 'bph-prostate' || d.id === 'varicocele'),
    parts: [
      {
        id: 'testes-paired',
        name: 'Testes (Testicles)',
        hindiName: 'वृषण (टेस्टिस / अंडकोषीय ग्रंथि)',
        latinName: 'Testes',
        pronunciation: 'TES-teez',
        system: 'reproductive',
        elements: ['FJ2780', 'FJ2781'],
        locationHinglish: 'शरीर के बाहर स्थित अंडकोष (Scrotum) की थैली के अंदर लटके दो अंडाकार अंग।',
        functionHinglish: 'प्रतिदिन लगभग 20 से 30 करोड़ शुक्राणु बनाना और टेस्टोस्टेरोन हार्मोन स्रावित करना जो पौरुष लक्षण, दाढ़ी-मूंछ, आवाज भारी होना और मांसपेशियों का विकास करता है।',
        funFactHinglish: 'प्रत्येक वृषण के अंदर अगर सभी सूक्ष्म सेमिनिफेरस नलिकाओं को सीधा फैलाया जाए, तो उनकी कुल लंबाई लगभग 250 मीटर (एक चौथाई किलोमीटर) होगी!',
        clinicalNoteHinglish: 'अंडकोष में अचानक तेज दर्द टेस्टिकुलर टॉर्शन (Testicular Torsion) का संकेत हो सकता है — यह मेडिकल इमरजेंसी है जिसमें 6 घंटे के अंदर सर्जरी अनिवार्य होती है।',
        highYieldMnemonic: 'SEVEN UP: शुक्राणु का मार्ग — Seminiferous tubules -> Epididymis -> Vas deferens -> Ejaculatory duct -> (Nothing) -> Urethra -> Penis',
        examPearls: [
          'लेडिग कोशिकाएं (Leydig cells): LH हार्मोन के प्रभाव में टेस्टोस्टेरोन बनाती हैं।',
          'सर्टोली कोशिकाएं (Sertoli cells): "नर्स सेल्स" जो विकासशील शुक्राणुओं को पोषण देती हैं और ब्लड-टेस्टिस बैरियर (Blood-Testis Barrier) बनाती हैं।',
          'Pampiniform venous plexus टेस्टिकुलर आर्टरी के खून को ठंडा करने के लिए काउंटर-करेंट हीट एक्सचेंजर का काम करता है।'
        ],
        citations: [
          {
            book: "Guyton and Hall Textbook of Medical Physiology",
            citation: "Unit XIV, Chapter 81 (Male Reproductive Functions and Testosterone), pp. 1021–1036",
            highYieldFact: "Spermatogenesis requires an optimal temperature approximately 2°C to 3°C below core body temperature, maintained dynamically by contraction and relaxation of the cremaster and dartos muscles."
          },
          {
            book: "Campbell-Walsh Urology (12th Edition)",
            citation: "Chapter 64: Male Infertility & Testicular Anatomy, pp. 1420–1445",
            highYieldFact: "Left testicular vein drains vertically at a right angle into the left renal vein, causing higher hydrostatic retrograde pressure and explaining why >85% of varicoceles occur on the left side."
          }
        ],
        relatedDiseases: ['Varicocele', 'Testicular Torsion', 'Testicular Cancer'],
      },
      {
        id: 'prostate-gland',
        name: 'Prostate Gland',
        hindiName: 'पौरुष ग्रंथि (प्रोस्टेट ग्रंथि)',
        latinName: 'Prostata',
        pronunciation: 'PROS-tayt',
        system: 'reproductive',
        elements: ['FJ2790'],
        locationHinglish: 'मूत्राशय (Urinary bladder) के ठीक नीचे स्थित अखरोट के आकार की ग्रंथि, जिसके बीच से मूत्रमार्ग (Urethra) गुजरता है।',
        functionHinglish: 'दूधिया, थोड़ा क्षारीय (Alkaline) प्रोस्टेटिक द्रव बनाना जो वीर्य का 30% हिस्सा होता है; यह योनि के अम्लीय वातावरण को निष्क्रिय कर शुक्राणुओं को जीवित रखता है।',
        funFactHinglish: 'प्रोस्टेट में सिट्रिक एसिड, जिंक और प्रोस्टेट स्पेसिफिक एंटीजन (PSA) प्रचुर मात्रा में होते हैं जो थक्के वाले वीर्य को पतला (Liquefaction) करते हैं!',
        clinicalNoteHinglish: 'उम्रदराज पुरुषों में प्रोस्टेट बढ़ने (BPH) से पेशाब की धार कमजोर हो जाती है और रात में बार-बार उठना पड़ता है।',
        highYieldMnemonic: 'BPH = Transitional Zone (मूत्रमार्ग को दबाता है); Prostate Cancer = Peripheral Zone (DRE पर गांठ महसूस होती है)',
        examPearls: [
          'मैकनील के अनुसार प्रोस्टेट 4 ज़ोन में बंटा है: Peripheral, Central, Transition, और Anterior fibromuscular stroma।',
          'PSA (Prostate Specific Antigen) एक सेरीन प्रोटीज है जो वीर्य को तरल बनाता है; 4 ng/mL से अधिक स्तर कैंसर या BPH का संकेत है।'
        ],
        citations: [
          {
            book: "BD Chaurasia's Human Anatomy Vol 2",
            citation: "Pelvis: Prostate Gland & Seminal Vesicles, pp. 399–412",
            highYieldFact: "Prostatic venous plexus communicates freely with the internal vertebral venous plexus of Batson without valves, explaining why prostatic carcinoma metastases rapidly spread to lumbar vertebrae."
          }
        ],
        relatedDiseases: ['Benign Prostatic Hyperplasia (BPH)', 'Prostatitis', 'Prostate Cancer'],
      },
    ],
  },
];
