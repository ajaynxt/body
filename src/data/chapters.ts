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
        
        rootWordEtymology: "ग्रीक 'Kardia' और लैटिन 'Cor' (हृदय/कोर) से उत्पन्न। इसी से बने शब्द: Cardiology (हृदय विज्ञान), Cardiac arrest, Myocardium, Endocarditis।",
        memoryTrickHindi: "ट्रिक: \"COR = Core of Life\" — शरीर का केंद्रीय इंजन जो जीवन में 2.5 अरब बार धड़कता है। वाल्व का क्रम: \"TPMA\" (Tricuspid -> Pulmonary -> Mitral -> Aortic)।",
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
        
        rootWordEtymology: "लैटिन 'Ventriculus' (छोटा पेट/थैली) + 'Sinister' (बायां भाग)। चिकित्सा विज्ञान में Sinister का अर्थ बायां और Dexter का अर्थ दायां होता है।",
        memoryTrickHindi: "ट्रिक: \"LV = Lion's Vigor\" — यह शेर की तरह सबसे ताकतवर है, 3 गुना मोटी मायोकार्डियल दीवार के साथ पूरे शरीर में 120 mmHg के भारी दबाव से शुद्ध खून पंप करता है।",
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
        
        treatmentsHinglish: [
          "हाई ब्लड प्रेशर का कड़ा नियंत्रण (Target < 130/80 mmHg) ताकि निलय की दीवार न फूले (LVH Reversal)।",
          "ARNI थेरेपी (Sacubitril + Valsartan) पंपिंग क्षमता (Ejection Fraction) सुधारने हेतु।",
          "गंभीर मामलों में लेफ्ट वेंट्रिकुलर असिस्ट डिवाइस (LVAD) या हार्ट ट्रांसप्लांटेशन।"
],
        medications: ["Sacubitril/Valsartan 50/100mg","Carvedilol 6.25/12.5mg","Spironolactone 25mg"],
        homeRemedies: ["तरल पदार्थों की मात्रा प्रतिदिन 1.5 - 2 लीटर तक सीमित रखें यदि सूजन हो।","वजन पर कड़ा नियंत्रण और नियमित नींद।","धूम्रपान और अल्कोहल का संपूर्ण त्याग।"],
        researchHighlights: ["PARADIGM-HF ट्रायल: ARNI थेरेपी ने पारंपरिक इनालाप्रिल की तुलना में कार्डियोवैस्कुलर मृत्यु दर 20% घटाई।"],
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
        
        rootWordEtymology: "लैटिन 'Valva' (तह होने वाले दरवाजे के पल्ले)। एकतरफा कपाट जो रक्त को केवल आगे बहने देते हैं और पीछे लौटने (Backflow) से रोकते हैं।",
        memoryTrickHindi: "ट्रिक: \"LAB RAT\" — Left Atrium = Bicuspid (Mitral), Right Atrium = Tricuspid। लव (LUB - S1) = AV वाल्व बंद, डब (DUB - S2) = सेमिलूनर वाल्व बंद होने की ध्वनि है।",
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
        
        treatmentsHinglish: [
          "माइट्रल/एओर्टिक वाल्व स्टेनोसिस में ट्रांसकैथेटर एओर्टिक वाल्व रिप्लेसमेंट (TAVR) बिना ओपन-हार्ट सर्जरी।",
          "गंभीर वाल्व लीकेज में वाल्व रिपेयर या मैकेनिकल/बायोप्रोस्थेटिक वाल्व रिप्लेसमेंट।",
          "रूमेटिक वाल्व रोग में पेनिसिलिन प्रोफिलेक्सिस।"
],
        medications: ["Warfarin / Acenocoumarol (Blood Thinner for mechanical valves)","Furosemide 40mg (Diuretic)","Digoxin (if Atrial Fibrillation)"],
        homeRemedies: ["दांतों की सफाई का विशेष ध्यान रखें ताकि एंडोकार्डाइटिस (Infective Endocarditis) का संक्रमण न फैले।","अत्यधिक भारी वजन उठाने वाले व्यायाम से बचें।","बीपी और धड़कन को नियंत्रित रखें।"],
        researchHighlights: ["PARTNER 3 ट्रायल: TAVR प्रक्रिया लो-रिस्क रोगियों में भी पारंपरिक ओपन सर्जरी जितनी सुरक्षित और प्रभावी सिद्ध हुई है।"],
        relatedDiseases: ['Rheumatic Heart Disease', 'Aortic Stenosis', 'Mitral Valve Prolapse'],
      },
    ],
  },

  // CHAPTER 2: SKELETAL SYSTEM
  {
    id: 'chapter-skeletal',
    chapterNumber: 2,
    systemId: 'skeletal',
    title: 'The Skeletal & Muscular Framework (Locomotor System)',
    hindiTitle: 'अध्याय 2: कंकाल एवं मांसपेशी तंत्र (लोकोमोटर सिस्टम)',
    subtitle: '206 हड्डियां, 600+ मांसपेशियां, संधियां और गतिशीलता — शरीर का मजबूत ढांचा',
    recommendedBooks: [
      "Gray's Anatomy 42nd Ed (Sec. 2: Skeletal & Muscular System)",
      "BD Chaurasia's Human Anatomy Vol 1 & 2 (General Anatomy, Osteology & Myology)",
      "Guyton & Hall Textbook of Medical Physiology (Unit II: Nerve and Muscle)",
      "Netter's Atlas of Human Anatomy (Section 1: General Anatomy)",
      "Snell's Clinical Anatomy by Regions"
    ],
    introductionHinglish: 'मानव लोकोमोटर तंत्र शरीर का मुख्य आंतरिक ढांचा और गति इंजन है। 206 हड्डियां और 600 से अधिक कंकाल मांसपेशियां (Skeletal Muscles) आपस में टेंडन और जोड़ों द्वारा जुड़कर हमें चलने, दौड़ने और वजन उठाने में सक्षम बनाती हैं। कंकाल शरीर को सीधा खड़ा रखता है, जबकि मांसपेशियां संकुचित होकर गति उत्पन्न करती हैं।',
    howItWorksHinglish: 'मस्तिष्क से मोटर न्यूरॉन्स द्वारा Acetylcholine रिलीज होता है, जिससे मसल फाइबर में कैल्शियम आयन छूटते हैं और Actin व Myosin फिलामेंट्स आपस में फिसलते हैं (Sliding Filament Theory)। मांसपेशियों में अधिक कार्य करने या पानी/नमक की कमी से लैक्टिक एसिड जमा होता है जिससे दर्द (Muscle Pain/Soreness) और ऐंठन (Cramps) होती है।',
    commonDiseases: CLINICAL_DISEASES.filter(d => d.system === 'skeletal' || d.system === 'muscular'),
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
        
        rootWordEtymology: "लैटिन 'Femur' (जांघ)।",
        memoryTrickHindi: "ट्रिक: \"FEMUR = 1/4th of Human Height\" — शरीर की सबसे लंबी (औसत 45 cm), सबसे भारी और कंक्रीट से 4 गुना मजबूत वजन उठाने वाली मुख्य हड्डी।",
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
        
        treatmentsHinglish: [
          "फीमर फ्रैक्चर में इंट्रामेडुलरी नेलिंग (IM Nailing) या प्लेट ऑस्टियोसिंथेसिस।",
          "नेक फीमर फ्रैक्चर (बुजुर्गों में) में हेमी या टोटल हिप आर्थ्रोप्लास्टी।",
          "ऑस्टियोपोरोसिस फ्रैक्चर से बचाव हेतु बिसफॉस्फोनेट्स।"
],
        medications: ["Zoledronic Acid 5mg IV वार्षिक","Calcium 1000mg + Vitamin D3 60,000 IU","Teriparatide"],
        homeRemedies: ["बाथरूम में एंटी-स्लिप मैट लगाएं ताकि बुजुर्गों के फिसलने से बचा जा सके।","तिल, रागी, दूध और हरी सब्जियों का प्रचुर सेवन हड्डियों की मजबूती के लिए।","रोजाना सुबह की गुनगुनी धूप में 20 मिनट बैठें।"],
        researchHighlights: ["बायो-एक्टिव सिरेमिक्स और ऑस्टियोइंडक्टिव बोन ग्राफ्ट्स: फीमर के जटिल फ्रैक्चर को तेजी से जोड़ने में क्रांतिकारी परिणाम दे रहे हैं।"],
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
      {
        id: 'skeletal-muscles',
        name: 'Major Skeletal Muscles (Musculi Sceleti)',
        hindiName: 'कंकाल मांसपेशियां (मांसपेशी तंत्र एवं दर्द निवारण)',
        latinName: 'Musculi sceleti / Systema musculare',
        pronunciation: 'MOOS-koo-lee skeh-LEH-tee',
        system: 'muscular',
        elements: ['FJ1400', 'FJ1401', 'FJ1402', 'FJ1403', 'FJ1404'],
        rootWordEtymology: "लैटिन शब्द 'Musculus' (अर्थात 'छोटा चूहा') — प्राचीन काल में वैज्ञानिकों को बाइसेप्स का संकुचन त्वचा के नीचे चूहे के भागने जैसा लगा था!",
        memoryTrickHindi: "मांसपेशियों के दर्द की गोल्डन ट्रिक: \"R.I.C.E. = Rest, Ice, Compression, Elevation\" (पहले 48 घंटे बर्फ, 48 घंटे बाद गर्म सिकाई)। ऐंठन (Cramp) की ट्रिक: \"C-R-A-M-P = Calcium, Rehydration, Alkaline water, Magnesium, Potassium\"!",
        locationHinglish: 'शरीर की सभी हड्डियों पर टेंडन (Tendon) द्वारा जुड़ी हुई ऐच्छिक मांसपेशियां (जैसे बाइसेप्स, ट्राइसेप्स, डेल्टॉइड, ट्रेपेजियस, क्वाड्रिसेप्स और हैमस्ट्रिंग्स)।',
        functionHinglish: 'शरीर को गतिशीलता देना, जोड़ों को स्थिरता प्रदान करना, सही पोस्चर बनाए रखना और कंपकंपी (Shivering) द्वारा शरीर का तापमान बनाए रखना।',
        funFactHinglish: 'मानव शरीर में 600 से अधिक मांसपेशियां होती हैं। शरीर की सबसे मजबूत मांसपेशी चबाने वाली मैसेटर (Masseter / Jaw) है और सबसे सक्रिय आंख की मांसपेशियां हैं!',
        clinicalNoteHinglish: 'भारी व्यायाम या पानी-नमक की कमी से मांसपेशियों में लैक्टिक एसिड जमा होता है जिसे DOMS (Delayed Onset Muscle Soreness) कहते हैं। R.I.C.E और हाइड्रेशन से यह 48-72 घंटे में ठीक हो जाता है।',
        highYieldMnemonic: 'R.I.C.E Protocol: Rest (आराम), Ice (बर्फ 15-20 मिनट), Compression (हल्की गर्म पट्टी), Elevation (अंग को दिल के स्तर से ऊपर उठाना)।',
        examPearls: [
          'शरीर की सबसे लंबी मांसपेशी: Sartorius (दर्जी मांसपेशी - जांघ में)।',
          'शरीर की सबसे बड़ी मांसपेशी: Gluteus Maximus (कूल्हे की मांसपेशी)।',
          'मांसपेशी संकुचन की इकाई: Sarcomere (Actin + Myosin filaments)।',
          'क्रिएटिन काइनेज (CPK / CK-MM): मांसपेशी डैमेज होने पर खून में इसका स्तर अत्यधिक बढ़ जाता है।'
        ],
        citations: [
          {
            book: "Guyton & Hall Textbook of Medical Physiology (14th Ed)",
            citation: "Unit II: Membrane Physiology, Nerve, and Muscle, Chapters 6–8, pp. 75–104",
            highYieldFact: "Muscle contraction proceeds via the sliding filament mechanism initiated by acetylcholine release at the motor end plate, triggering sarcoplasmic calcium influx binding to Troponin C."
          },
          {
            book: "BD Chaurasia's Human Anatomy Vol 1",
            citation: "Section 1: Upper Limb, Chapter 2 (Pectoral Region & Arm), pp. 45–68",
            highYieldFact: "Rotator cuff muscles (SITS: Supraspinatus, Infraspinatus, Teres minor, Subscapularis) dynamically stabilize the glenohumeral joint; supraspinatus tendonitis is the most common cause of painful arc syndrome."
          }
        ],
        treatmentsHinglish: [
          "प्राथमिक चिकित्सा (पहले 48 घंटे): R.I.C.E प्रोटोकॉल (आराम, बर्फ की सिकाई, हल्की संपीड़न पट्टी, अंग को ऊपर उठाना)।",
          "48 घंटे बाद: गुनगुने पानी में सेंधा नमक (Epsom Salt - मैग्नीशियम सल्फेट) डालकर 15-20 मिनट सिकाई करें।",
          "दर्द व सूजन निवारक: पैरासिटामोल 650mg या आइबूप्रोफेन 400mg (भोजन के उपरांत चिकित्सक के परामर्श पर)।",
          "मांसपेशी शिथिलक (Muscle Relaxant): थियोकोलचिकोसाइड (Thiocolchicoside 4/8mg) या क्लोरजॉक्साजोन जब गंभीर ऐंठन या जकड़न हो।",
          "लोकल दर्द निवारक: डाइक्लोफेनेक + मेंथॉल जेल (Diclofenac Gel) से हल्के हाथ से मालिश करें (जोर से न रगड़ें)।",
          "फिजियोथेरेपी: IFT (इंटरफेरेनशियल थेरेपी), अल्ट्रासाउंड मसाज और जेंटल स्ट्रेचिंग एक्सरसाइज।"
        ],
        medications: [
          "Paracetamol 650 mg (हल्के-मध्यम दर्द हेतु)",
          "Ibuprofen 400 mg (सूजन व दर्द कम करने हेतु)",
          "Thiocolchicoside 4mg / 8mg (मसल रिलैक्सेंट)",
          "Diclofenac Sodium 1.16% w/w Gel (टॉपिकल पेन जेल)",
          "Magnesium Glycinate 250mg + Vitamin D3 60k IU (क्रोनिक ऐंठन व कमजोरी हेतु)"
        ],
        homeRemedies: [
          "सेंधा नमक (Epsom Salt) बाथ: गुनगुने पानी में 2 चम्मच एप्सम सॉल्ट डालकर सिकाई करें, मैग्नीशियम त्वचा से अवशोषित होकर मांसपेशियों को तुरंत राहत देता है।",
          "हल्दी-अदरक का काढ़ा या गुनगुना दूध: कर्क्यूमिन (Curcumin) प्राकृतिक एंटी-इंफ्लेमेटरी एजेंट है जो सूजन घटाता है।",
          "भरपूर हाइड्रेशन: दिन में 3 से 3.5 लीटर पानी, नारियल पानी (इलेक्ट्रोलाइट्स) और नींबू पानी पिएं।",
          "केला व मुनक्का/खजूर का सेवन: मांसपेशियों में पोटैशियम और कैल्शियम की भरपाई करता है जिससे बार-बार नस चढ़ना या ऐंठन रुकती है।"
        ],
        researchHighlights: [
          "🚨 डॉक्टर को तुरंत कब दिखाएं (Danger Red Flags): 1) दर्द 3 से 5 दिनों से अधिक समय तक लगातार बना रहे या बढ़ता जाए; 2) प्रभावित अंग में अत्यधिक सूजन, लालिमा या छूने पर जलन हो; 3) पेशाब का रंग गहरा भूरा, कोला या चाय जैसा हो (Rhabdomyolysis — किडनी फेलियर का बड़ा जोखिम); 4) हाथ-पैर में सुन्नपन (Numbness) हो या अंग बिल्कुल न हिला सकें; 5) सीने, बाएं कंधे या जबड़े में खिंचाव के साथ पसीना आए (हार्ट अटैक का संकेत)।"
        ],
        relatedDiseases: [
          'Muscle Pain, Strain & Cramps (Myalgia)',
          'Fibromyalgia',
          'Rotator Cuff Tendonitis',
          'Rhabdomyolysis'
        ],
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
        
        rootWordEtymology: "ग्रीक 'Pan' (पूरा) + 'Kreas' (मांस) = All flesh। क्योंकि इसमें कोई हड्डी नहीं, यह शुद्ध एंजाइम व हार्मोन बनाने वाला ग्रंथि ऊतक है।",
        memoryTrickHindi: "ट्रिक: \"Dual Dynamo\" — 99% पाचक रस (ट्रिप्सिन, एमाइलेज, लाइपेज) + 1% इंसुलिन और ग्लूकागन हार्मोन जो ब्लड शुगर को 80-120 mg/dL पर स्थिर रखते हैं।",
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
        
        treatmentsHinglish: [
          "एक्यूट पैन्क्रियाटाइटिस में अस्पताल में आक्रामक IV फ्लूइड्स, दर्द नियंत्रण और आंतों को आराम (Bowel Rest)।",
          "क्रॉनिक पैन्क्रियाटाइटिस में एंजाइम रिप्लेसमेंट थेरेपी (CREON Capsules खाने के साथ)।",
          "टाइप 1 डायबिटीज में इंसुलिन रिप्लेसमेंट और टाइप 2 में ओरल हाइपोग्लाइसेमिक दवाएं।"
],
        medications: ["Pancreatin Capsules (Creon 10000/25000)","Metformin 500/1000mg","Insulin Glargine / Lispro"],
        homeRemedies: ["शराब और सिगरेट पूरी तरह बंद करें (पैन्क्रियाटाइटिस का सबसे बड़ा कारण)।","कम वसा (Low Fat) वाला भोजन करें और एक बार में भारी भोजन न लें।","दिनभर में 5-6 छोटे सुपाच्य भोजन लें।"],
        researchHighlights: ["आर्टिफिशियल पैन्क्रियास (क्लोज्ड-लूप इंसुलिन पंप): सीजीएम सेंसर और स्वचालित इंसुलिन डिलीवरी द्वारा ग्लूकोज नियंत्रण में क्रांतिकारी सफलता।"],
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
    subtitle: 'जीवन की उत्पत्ति की जननी — गर्भाशय, अंडाशय, फैलोपियन ट्यूब व स्तन ग्रंथियां',
    recommendedBooks: [
      "Gray's Anatomy 42nd Ed (Sec. 9: Female Reproductive System)",
      "BD Chaurasia's Human Anatomy Vol 2 (Pelvis: Uterus, Ovaries & Vagina)",
      "Guyton & Hall Physiology (Unit XIV: Endocrinology & Female Reproduction)",
      "DC Dutta's Textbook of Obstetrics & Gynecology"
    ],
    introductionHinglish: 'महिला प्रजनन तंत्र (Female Reproductive System) नए मानव जीवन को उत्पन्न करने, पोषित करने और जन्म देने के लिए प्रकृति का सबसे विस्मयकारी तंत्र है। इसमें आंतरिक अंग (गर्भाशय, दो अंडाशय, दो फैलोपियन ट्यूब, योनि) और स्तन ग्रंथियां शामिल हैं। यह मासिक धर्म चक्र (Menstrual Cycle) और गर्भावस्था (Pregnancy) के लिए एस्ट्रोजन और प्रोजेस्टेरोन हार्मोन का स्राव करता है।',
    howItWorksHinglish: 'प्रत्येक माह अंडाशय से एक परिपक्व अंडाणु (Ovum) ओव्यूलेशन द्वारा बाहर निकलता है और फैलोपियन ट्यूब में आता है। यदि 24 घंटे में शुक्राणु द्वारा निषेचन (Fertilization) हो जाता है, तो बनने वाला जाइगोट गर्भाशय में आकर प्रत्यारोपित (Implant) होता है और 9 माह तक प्लेसेंटा द्वारा विकसित होकर शिशु बनता है। निषेचन न होने पर गर्भाशय की आंतरिक परत (Endometrium) टूटकर माहवारी के रूप में बाहर निकल जाती है।',
    introductionEn: 'The female reproductive system is specialized to produce maternal gametes (oocytes), synthesize gonadal steroids (estrogens and progesterone), provide an optimal environment for fertilization and gestation, and lactate to nourish the neonate.',
    howItWorksEn: 'Cyclic follicular maturation within ovaries culminates in ovulation. The ovum is guided by fimbriae into the fallopian tube for fertilization. The blastocyst implants into the secretory endometrium of the uterus. Unfertilized cycles culminate in endometrial sloughing (menstruation).',
    commonDiseases: CLINICAL_DISEASES.filter(d => d.id === 'pcos-pcod' || d.id === 'endometriosis'),
    parts: [
      {
        id: 'uterus-womb',
        name: 'Uterus (Womb / Metra)',
        hindiName: 'गर्भाशय (बच्चेदानी / यूटरस)',
        latinName: 'Uterus / Metra',
        pronunciation: 'YOO-ter-us',
        system: 'reproductive',
        elements: ['HRAF0435', 'HRAF0436', 'HRAF0439', 'HRAF0440'],
        rootWordEtymology: "ग्रीक 'Metra' और लैटिन 'Uterus' (थैली)। इसी से बने शब्द: Endometrium, Myometrium, Hysterectomy (गर्भाशय निष्कासन), Metritis।",
        memoryTrickHindi: "ट्रिक: \"AV & AF\" — सामान्य शारीरिक स्थिति: Anteverted on vagina (90° कोण), Anteflexed on cervix (120-170° कोण)। मैकरोड्ट्स लिगामेंट्स पेल्विस का मुख्य सहारा हैं।",
        locationEn: 'Located in the true pelvis between the urinary bladder anteriorly and the rectum posteriorly; typically anteverted (~90°) and anteflexed (~120-170°).',
        locationHinglish: 'महिला श्रोणि गुहा (Pelvic cavity) में मूत्राशय के पीछे और मलाशय के आगे स्थित नाशपाती के आकार का खोखला पेशीय अंग।',
        functionEn: 'Houses, nourishes, and protects the developing fetus throughout gestation; contracts powerfully under oxytocin during parturition.',
        functionHinglish: 'निषेचित भ्रूण को 9 महीने तक सुरक्षित रखना, प्लेसेंटा से पोषण देना, और प्रसव के समय शक्तिशाली संकुचन (Oxytocin द्वारा) से शिशु को जन्म देना।',
        funFactEn: 'During pregnancy, the uterine volume increases over 500-fold from ~10 mL to 5,000 mL — more than any other smooth muscle organ!',
        funFactHinglish: 'गर्भावस्था के दौरान गर्भाशय अपने सामान्य आकार से लगभग 500 गुना अधिक फैल सकता है — मानव शरीर की किसी भी अन्य मांसपेशी से अधिक!',
        clinicalNoteEn: 'Endometrial thickness dynamically varies with menstrual cycle (1-4 mm in early follicular, up to 14 mm in secretory phase). Fibroids (leiomyomas) are common benign smooth muscle tumors.',
        clinicalNoteHinglish: 'गर्भाशय की आंतरिक एंडोमेट्रियल परत की मोटाई अल्ट्रासाउंड से मापी जाती है; फाइब्रॉएड (Fibroids) गर्भाशय की मांसपेशियों में बनने वाली हानिरहित रसौली हैं।',
        highYieldMnemonic: 'Antiverted & Antiflexed (AV & AF): Angle of Anteversion ~90°, Angle of Anteflexion ~120-170°',
        examPearls: [
          'गर्भाशय की 3 परतें होती हैं: Endometrium (आंतरिक), Myometrium (मोटी पेशीय दीवार), Perimetrium (बाहरी सीरस परत)।',
          'गर्भाशय की रक्त आपूर्ति: Uterine Artery (Internal Iliac Artery की पूर्ववर्ती शाखा) द्वारा होती है।',
          'Mackrodt\'s / Cardinal ligaments गर्भाशय को पेल्विस में सहारा देने वाले सबसे मुख्य लिगामेंट्स हैं।',
          'Water runs under the bridge: Ureter गर्भाशय ग्रीवा से 1.5 सेमी दूरी पर गर्भाशयी धमनी के ठीक नीचे से गुजरता है।'
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
        treatmentsHinglish: [
          "मायोमेक्टॉमी (Myomectomy) रसौली निकालने हेतु अथवा हिस्टेरेक्टॉमी (Hysterectomy) गंभीर एंडोमेट्रियोसिस या फाइब्रॉएड में।",
          "पेल्विक फ्लोर फिजियोथेरेपी एवं कीगल व्यायाम (Kegel exercises) गर्भाशय प्रोलैप्स रोकने हेतु।",
          "हार्मोनल अंतर्गर्भाशयी उपकरण (Levonorgestrel IUD - Mirena) अत्यधिक रक्तस्राव नियंत्रण के लिए।"
        ],
        medications: ["Tranexamic acid", "Mefenamic acid", "Levonorgestrel IUD", "GnRH Agonists (Leuprolide)"],
        homeRemedies: [
          "नियमित पेल्विक फ्लोर व्यायाम (Kegels) मांसपेशियों की मजबूती के लिए।",
          "संतुलित आयरन-युक्त आहार माहवारी के रक्तस्राव से होने वाले एनीमिया से बचाव हेतु।",
          "भारी वजन उठाने से परहेज ताकि पेल्विक ऑर्गन प्रोलैप्स न हो।"
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
        elements: ['HRAF0432', 'HRAF0433'],
        rootWordEtymology: "ग्रीक 'Oophoron' (अंडे वहन करने वाली) और लैटिन 'Ovarium' (अंडाशय)। Oophorectomy = अंडाशय निकालने का ऑपरेशन, Oophoritis = अंडाशय की सूजन।",
        memoryTrickHindi: "ट्रिक: \"OVARY DOUBLE BLOOD\" — Ovarian Artery सीधे Abdominal Aorta से L2 स्तर पर आती है तथा Uterine Artery की आरोही शाखाएं दूसरा रक्त संचार देती हैं।",
        locationEn: 'Located in the ovarian fossa on the lateral pelvic wall on either side of the uterus, suspended by the infundibulopelvic and ovarian ligaments.',
        locationHinglish: 'गर्भाशय के दोनों तरफ पेल्विक दीवार में स्थित बादाम के आकार की दो प्राथमिक जनन ग्रंथियां।',
        functionEn: 'Dual endocrine and gametogenic organ: produces mature oocytes (ova) and synthesizes estrogen and progesterone in cyclical monthly rhythms.',
        functionHinglish: 'दोहरा जीवन-कार्य: 1. डिंब/अंडाणु (Ova) का उत्पादन। 2. महिला सेक्स हार्मोन एस्ट्रोजन और प्रोजेस्टेरोन का निरंतर संश्लेषण।',
        funFactEn: 'A female is born with all 1-2 million primordial follicles she will ever possess; only about 400 will ever undergo mature ovulation during her reproductive lifespan!',
        funFactHinglish: 'एक बालिका अपने दोनों अंडाशयों में लगभग 10 से 20 लाख अपरिपक्व अंडों के साथ जन्म लेती है, जिनमें से पूरे जीवनकाल में केवल लगभग 400 अंडे ही परिपक्व होकर ओव्यूलेट होते हैं!',
        clinicalNoteEn: 'PCOS affects ~10% of women, marked by hyperandrogenism, chronic anovulation, and polycystic ovarian appearance on pelvic ultrasound.',
        clinicalNoteHinglish: 'अंडाशय में हार्मोन असंतुलन से PCOS (पॉलीसिस्टिक ओवरी सिंड्रोम) होता है, जिससे चेहरे पर अनचाहे बाल, मुंहासे और अनियमित माहवारी होती है।',
        highYieldMnemonic: 'Ovary Double Blood Supply: Ovarian Artery (Abdominal Aorta से L2 स्तर पर) और Uterine Artery की शाखाएं',
        examPearls: [
          'अंडाशय का लिगामेंट (Ovarian Ligament) इसे गर्भाशय से और सस्पेंसरी लिगामेंट (Infundibulopelvic) इसे पेल्विक दीवार से जोड़ता है।',
          'कॉर्पस ल्यूटियम (Corpus Luteum): ओव्यूलेशन के बाद बनने वाली पीली ग्रंथि जो गर्भावस्था बनाए रखने के लिए प्रोजेस्टेरोन बनाती है।',
          'लिम्फैटिक ड्रेनेज: Para-aortic lymph nodes (L2 स्तर) में जाता है।'
        ],
        citations: [
          {
            book: "Gray's Anatomy (42nd Edition)",
            citation: "Section 9: Pelvis, Chapter 75 (Female Internal Genital Organs), pp. 1290–1308",
            highYieldFact: "Ovarian lymphatic drainage flows primarily upward along the ovarian vessels directly to para-aortic lymph nodes near the origin of renal arteries, distinct from cervical lymphatics."
          }
        ],
        treatmentsHinglish: [
          "PCOS प्रबंधन: वजन नियंत्रण, इंसुलिन संवेदीकरण (Metformin), और मासिक चक्र नियमितीकरण।",
          "लेप्रोस्कोपिक ओवेरियन सिस्टेक्टॉमी (Cystectomy) जटिल सिस्ट्स या एंडोमेट्रियोमा हेतु।",
          "ओव्यूलेशन इंडक्शन एवं आईवीएफ (IVF) गर्भधारण सहायता के लिए।"
        ],
        medications: ["Combined Oral Contraceptives", "Metformin", "Letrozole", "Clomiphene citrate", "Spironolactone"],
        homeRemedies: [
          "कम ग्लाइसेमिक इंडेक्स (Low GI) आहार इंसुलिन रेजिस्टेंस कम करने हेतु।",
          "नियमित 30 मिनट एरोबिक व्यायाम हार्मोन संतुलन बनाए रखने के लिए।",
          "ओमेगा-3 फैटी एसिड और विटामिन डी सप्लीमेंट।"
        ],
        relatedDiseases: ['Polycystic Ovary Syndrome (PCOS)', 'Ovarian Cyst', 'Ovarian Cancer'],
      },
      {
        id: 'fallopian-tubes',
        name: 'Fallopian Tubes (Oviducts / Salpinx)',
        hindiName: 'फैलोपियन ट्यूब (डिंबवाहिनी नलिकाएं / साल्पिंक्स)',
        latinName: 'Tubae uterinae',
        pronunciation: 'fuh-LOH-pee-uhn toobs',
        system: 'reproductive',
        elements: ['HRAF0408', 'HRAF0409', 'HRAF0410', 'HRAF0411', 'HRAF0412', 'HRAF0413', 'HRAF0414', 'HRAF0415', 'HRAF0434'],
        rootWordEtymology: "16वीं सदी के इटैलियन एनाटोमिस्ट Gabriele Falloppio के नाम पर; ग्रीक 'Salpinx' (तुरही)। Salpingectomy = ट्यूब हटाना, Salpingitis = नलिका की सूजन।",
        memoryTrickHindi: "ट्रिक: \"FAMP\" — Fimbriae (अंडे पकड़ना) -> Ampulla (सबसे चौड़ा, Fertilization स्थल!) -> Isthmus (संकरा) -> Interstitial (गर्भाशय दीवार के अंदर)।",
        locationEn: 'Pair of 10-12 cm muscular tubes extending laterally from the uterine horns to the peritoneal cavity adjacent to the ovaries within the mesosalpinx.',
        locationHinglish: 'गर्भाशय के दोनों कोनों (Cornua) से निकलकर अंडाशय तक फैली लगभग 10-12 सेमी लंबी पेशीय नलिकाएं।',
        functionEn: 'Captures the ovulated ovum with its fimbriae, provides the normal site of fertilization (Ampulla), and transports the blastocyst to the uterine cavity via ciliated peristalsis.',
        functionHinglish: 'अंडाशय से निकले डिंब को झालरदार सिरों (Fimbriae) से पकड़ना, शुक्राणु और अंडे का निषेचन (Fertilization) कराना, और भ्रूण को गर्भाशय में पहुंचाना।',
        funFactEn: 'The inner lining contains microscopic cilia beating ~1,000 times a minute in synchronized waves to escort the egg gently towards the womb!',
        funFactHinglish: 'ट्यूब के अंदर हजारों सूक्ष्म सिलिया (Cilia) प्रति मिनट 1000 बार तरंगों की तरह गति करते हैं ताकि अंडा धीरे-धीरे गर्भाशय की ओर बढ़ सके!',
        clinicalNoteEn: 'Ectopic pregnancy occurs most commonly (>95%) in the ampulla of the fallopian tube; tubal rupture is a surgical emergency with severe internal hemorrhage.',
        clinicalNoteHinglish: 'अस्थानिक गर्भावस्था (Ectopic Pregnancy): 95% मामलों में भ्रूण ट्यूब के एम्पुला में ही फंस जाता है, जिससे ट्यूब फटने और आंतरिक रक्तस्राव का गंभीर खतरा रहता है।',
        highYieldMnemonic: 'FAMP: Fimbriae -> Ampulla (Fertilization site!) -> Isthmus -> Interstitial',
        examPearls: [
          'निषेचन स्थल (Site of Fertilization): Ampulla of the uterine tube (सबसे चौड़ा और लंबा 5-7 सेमी भाग)।',
          'Fimbria ovarica: सबसे लंबा झालरदार सिरा जो सीधे अंडाशय से जुड़ा रहता है।',
          'Ciliated columnar epithelium: सिलिया की तरंगीय गति अंडे को गर्भाशय की ओर धकेलती है।'
        ],
        citations: [
          {
            book: "BD Chaurasia's Human Anatomy Vol 2",
            citation: "Pelvis: Fallopian Tubes and Ovaries, pp. 420–428",
            highYieldFact: "The ampulla is the widest and longest section (5-7 cm) of the uterine tube and represents the normal biological site of human fertilization."
          }
        ],
        treatmentsHinglish: [
          "लेप्रोस्कोपिक साल्पिंगोस्टॉमी अथवा साल्पिंगेक्टॉमी एक्टोपिक प्रेग्नेंसी में।",
          "ट्यूब ब्लॉकेज जांच: हिस्टेरोसाल्पिंगोग्राफी (HSG) या लेप्रोस्कोपिक क्रोमोट्यूबेशन।",
          "स्थायी नसबंदी: ट्यूबल लिगेशन (Tubal Ligation - महिला नलबंदी)।"
        ],
        medications: ["Methotrexate (प्रारंभिक एक्टोपिक गर्भ में)", "Ceftriaxone + Doxycycline (Salpingitis / PID में)"],
        homeRemedies: [
          "पेल्विक स्वच्छता और सुरक्षित यौन संबंध (PID संक्रमण से बचाव हेतु)।",
          "अनियमित तीव्र एकतरफा पेल्विक दर्द होने पर तत्काल इमरजेंसी जांच।"
        ],
        relatedDiseases: ['Ectopic Pregnancy', 'Pelvic Inflammatory Disease (PID)', 'Tubal Infertility'],
      },
      {
        id: 'mammary-glands',
        name: 'Mammary Glands (Breasts)',
        hindiName: 'स्तन ग्रंथियां (मेमरी ग्लैंड्स / ब्रेस्ट)',
        latinName: 'Glandulae mammariae',
        pronunciation: 'MAM-uh-ree glandz',
        system: 'reproductive',
        elements: ['HRAF0004', 'HRAF0005', 'HRAF0006', 'HRAF0007', 'HRAF0008', 'HRAF0009', 'HRAF0010', 'HRAF0011', 'HRAF0012', 'HRAF0013', 'HRAF0014', 'HRAF0015', 'HRAF0016', 'HRAF0017', 'HRAF0018', 'HRAF0019'],
        rootWordEtymology: "लैटिन 'Mamma' (स्तन/मां)। Mammography (स्तन एक्स-रे), Mastitis (स्तन में सूजन), Mastectomy (स्तन हटाने की सर्जरी)।",
        memoryTrickHindi: "ट्रिक: \"PROLACTIN Produces milk; OXYTOCIN Outflows milk\" — कूपर के लिगामेंट्स (Cooper's ligaments) स्तनों को त्वचा से जोड़कर सीधा रखते हैं।",
        locationEn: 'Subcutaneous modified sweat glands overlying the pectoralis major muscle from the 2nd to 6th ribs vertically, and sternal edge to midaxillary line horizontally.',
        locationHinglish: 'छाती के सामने पेक्टोरलिस मेजर पेशी के ऊपर दूसरी से छठी पसली (2nd to 6th rib) तक फैली रूपांतरित स्वेद ग्रंथियां।',
        functionEn: 'Lactation: synthesizes, secretes, and ejects nutrient-rich breast milk containing immunoglobulins (IgA) for infant nutrition and passive immunity.',
        functionHinglish: 'शिशु के पोषण और रोग प्रतिरोधक क्षमता (IgA एंटीबॉडीज) के लिए मां का अमृततुल्य दूध (Lactation) उत्पन्न और स्रावित करना।',
        funFactEn: 'Breast milk contains hundreds of bioactive components including maternal stem cells, oligosaccharides, and protective antibodies that adapt to the baby\'s health!',
        funFactHinglish: 'मां के दूध में सैकड़ों सुरक्षात्मक एंटीबॉडीज (विशेषकर IgA) और स्टेम सेल्स होते हैं जो बच्चे की जरूरत के अनुसार स्वतः बदल जाते हैं!',
        clinicalNoteEn: 'Breast cancer is the most common cancer in women. The Upper Outer Quadrant contains ~60% of breast glandular tissue and is the most common site of malignancy.',
        clinicalNoteHinglish: 'स्तन कैंसर महिलाओं में सबसे आम कैंसर है; 60% गांठें ऊपरी बाहरी हिस्से (Upper Outer Quadrant) में पाई जाती हैं। मासिक धर्म के बाद स्तन की सेल्फ-जांच (BSE) अनिवार्य है।',
        highYieldMnemonic: 'Axillary Quadrant: 75% Lymphatic drainage goes to Axillary lymph nodes (Pectoral group)',
        examPearls: [
          'लिम्फैटिक ड्रेनेज: 75% लिम्फ Axillary lymph nodes (विशेषकर Anterior/Pectoral group) में जाता है।',
          'Suspensory ligaments of Cooper: कैंसर में इनके सिकुड़ने से त्वचा में गड्ढे (Peau d\'orange) पड़ते हैं।',
          'Axillary tail of Spence: स्तन का वह उभार जो डीप फेशिया को भेदकर बगल (Axilla) में जाता है।'
        ],
        citations: [
          {
            book: "Gray's Anatomy (42nd Edition)",
            citation: "Section 7: Thorax, Chapter 50 (Pectoral Girdle and Breast), pp. 912–928",
            highYieldFact: "Subareolar lymphatic plexus of Sappey drains primarily into anterior (pectoral) axillary lymph nodes; sentinel lymph node biopsy guides surgical staging in breast carcinoma."
          }
        ],
        treatmentsHinglish: [
          "ट्रिपल असेसमेंट (Triple Assessment): क्लिनिकल परीक्षण + मैमोग्राफी/अल्ट्रासाउंड + कोर नीडल बायोप्सी (CNB)।",
          "ब्रेस्ट कंजर्विंग सर्जरी (Lumpectomy) अथवा मास्टेक्टॉमी + सेंटिनल लिम्फ नोड बायोप्सी।",
          "हार्मोन थेरेपी: ER/PR पॉजिटिव मामलों में Tamoxifen या Aromatase Inhibitors।"
        ],
        medications: ["Tamoxifen (SERM)", "Trastuzumab (Herceptin)", "Cabergoline", "Cloxacillin (Mastitis हेतु)"],
        homeRemedies: [
          "मासिक धर्म समाप्त होने के 7 दिन बाद नियमित ब्रेस्ट सेल्फ एग्जामिनेशन (BSE)।",
          "40 वर्ष की आयु के बाद हर 1-2 वर्ष में स्क्रीनिंग मैमोग्राफी।"
        ],
        relatedDiseases: ['Breast Cancer', 'Fibroadenoma', 'Mastitis'],
      },
      {
        id: 'cervix-vagina',
        name: 'Cervix & Vagina (Colpos)',
        hindiName: 'गर्भाशय ग्रीवा एवं योनि (सर्विक्स व वैजाइना)',
        latinName: 'Cervix uteri et Vagina',
        pronunciation: 'SUR-viks and vuh-JYE-nuh',
        system: 'reproductive',
        elements: ['HRAF0406', 'HRAF0407', 'HRAF0441'],
        rootWordEtymology: "लैटिन 'Cervix' (गर्दन) + 'Vagina' (म्यान)। ग्रीक 'Colpos' (योनि)। Colposcopy (सूक्ष्मदर्शी ग्रीवा परीक्षण), Cervicitis।",
        memoryTrickHindi: "ट्रिक: \"SCJ Transformation Zone\" — Squamocolumnar Junction वह जगह है जहां HPV वायरस कैंसर पूर्व बदलाव लाता है, पैप स्मीयर इसी जगह से लिया जाता है।",
        locationEn: 'The cervix is the lower cylindrical segment of the uterus projecting into the vaginal vault; the vagina is an 8-10 cm fibromuscular canal extending to the vulval vestibule.',
        locationHinglish: 'गर्भाशय का निचला संकरा सिरा (सर्विक्स) जो योनि मार्ग में खुलता है; योनि मूत्राशय के पीछे और मलाशय के आगे स्थित 8-10 सेमी लंबी पेशीय नलिका है।',
        functionEn: 'Passageway for menstrual flow, female copulatory organ, and the distensible birth canal through which the fetus is delivered.',
        functionHinglish: 'माहवारी रक्तस्राव का निकास मार्ग, संभोग अंग, तथा प्रसव के समय अत्यधिक फैलकर शिशु को बाहर निकालने वाली जन्म नली (Birth Canal)।',
        funFactEn: 'During natural childbirth, the cervix dilates from a closed pinhole up to a full 10 centimeters to allow the fetal head to pass through!',
        funFactHinglish: 'प्रसव के दौरान गर्भाशय ग्रीवा एक सुई के छेद जैसी बंद अवस्था से पूरी तरह 10 सेंटीमीटर तक फैल जाती है ताकि शिशु का सिर बाहर आ सके!',
        clinicalNoteEn: 'High-risk HPV types 16 and 18 cause >70% of cervical cancers globally; highly preventable through adolescent HPV vaccination and routine Pap smear screening.',
        clinicalNoteHinglish: 'ह्यूमन पैपिलोमा वायरस (HPV 16 & 18) सर्वाइकल कैंसर का मुख्य कारण है; 9 से 14 वर्ष की बालिकाओं में HPV टीका लगवाने से 90% से अधिक बचाव होता है।',
        highYieldMnemonic: 'Vaginal Acid: Doderlein\'s lactobacilli maintain acidic pH 3.8-4.5',
        examPearls: [
          'योनि का सामान्य pH: 3.8 - 4.5 (अम्लीय), Doderlein\'s lactobacilli द्वारा लैक्टिक एसिड बनने से।',
          'Vaginal fornices: Posterior fornix सबसे गहरा होता है और सीधे Douglas pouch से सटा होता है (Culdocentesis site)।',
          'पैप स्मीयर (Pap Smear): Transformation Zone से एंडोसर्विकल ब्रश और आयरे स्पैटुला से कोशिकाएं एकत्र की जाती हैं।'
        ],
        citations: [
          {
            book: "DC Dutta's Textbook of Gynecology",
            citation: "Chapter 15: Benign and Malignant Lesions of the Cervix, pp. 280–305",
            highYieldFact: "The squamocolumnar junction undergoes continuous physiological metaplasia; HPV integration into host genome at this transformation zone induces E6/E7 oncoproteins inactivating p53 and Rb tumor suppressors."
          }
        ],
        treatmentsHinglish: [
          "स्क्रीनिंग: 25-65 वर्ष की महिलाओं में हर 3-5 वर्ष पर पैप स्मीयर (Pap Smear) एवं HPV DNA टेस्ट।",
          "पूर्व-कैंसर अवस्था (CIN): LEEP (Loop Electrosurgical Excision Procedure) अथवा कोन बायोप्सी।",
          "संक्रमण नियंत्रण: कैंडिडा (यीस्ट) और बैक्टीरियल वेजिनोसिस का लक्षित रोगाणुरोधी उपचार।"
        ],
        medications: ["HPV Vaccine (Gardasil-9 / Cervavac)", "Metronidazole vaginal gel", "Fluconazole", "Clindamycin"],
        homeRemedies: [
          "कपास (Cotton) के अंतःवस्त्र का प्रयोग और योनि में हार्श साबुन या डौचिंग (Douching) से परहेज।",
          "सुरक्षित यौन संबंध और समय पर नियमित पैप स्मीयर जांच।"
        ],
        relatedDiseases: ['Cervical Cancer', 'Bacterial Vaginosis', 'Cervicitis'],
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
    introductionEn: 'The male reproductive system consists of the testes, epididymides, vasa deferentia, accessory sex glands (prostate, seminal vesicles, bulbourethral glands), and the penis. It performs spermatogenesis and androgen steroidogenesis.',
    howItWorksEn: 'Spermatogenesis occurs in the seminiferous tubules at 34-35°C, supported by Sertoli cells and driven by Leydig cell testosterone. Sperm mature in the epididymis and are propelled during emission through the vas deferens, mixing with seminal and prostatic fluids to form semen.',
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
        rootWordEtymology: "लैटिन 'Testis' (साक्षी/गवाह)। इसी से बने शब्द: Testosterone (पुरुष हार्मोन), Testicular torsion, Orchidectomy (ग्रीक 'Orchis' = वृषण)।",
        memoryTrickHindi: "ट्रिक: \"SEVEN UP\" — शुक्राणु का पूरा मार्ग: Seminiferous tubules -> Epididymis -> Vas deferens -> Ejaculatory duct -> (Nothing) -> Urethra -> Penis।",
        locationEn: 'Suspended outside the abdominopelvic cavity within the cutaneous scrotal sac, with the left testis typically hanging slightly lower than the right.',
        locationHinglish: 'शरीर के बाहर स्थित अंडकोष (Scrotum) की थैली के अंदर लटके दो अंडाकार अंग; बायां वृषण आमतौर पर दाएं से थोड़ा नीचे लटकता है।',
        functionEn: 'Produces 200-300 million spermatozoa daily and synthesizes >95% of circulating testosterone, driving virilization, muscle mass, and libido.',
        functionHinglish: 'प्रतिदिन लगभग 20 से 30 करोड़ शुक्राणु बनाना और टेस्टोस्टेरोन हार्मोन स्रावित करना जो पौरुष लक्षण, दाढ़ी-मूंछ, आवाज भारी होना और मांसपेशियों का विकास करता है।',
        funFactEn: 'If all the microscopic seminiferous tubules in both testes were uncoiled and laid end-to-end, they would stretch over 500 meters (half a kilometer)!',
        funFactHinglish: 'प्रत्येक वृषण के अंदर अगर सभी सूक्ष्म सेमिनिफेरस नलिकाओं को सीधा फैलाया जाए, तो उनकी कुल लंबाई लगभग 250 मीटर (एक चौथाई किलोमीटर) होगी!',
        clinicalNoteEn: 'Sudden severe scrotal pain suggests testicular torsion: twisting of spermatic cord resulting in ischemia. A true surgical emergency requiring detorsion within 6 hours.',
        clinicalNoteHinglish: 'अंडकोष में अचानक तेज दर्द टेस्टिकुलर टॉर्शन (Testicular Torsion) का संकेत हो सकता है — यह मेडिकल इमरजेंसी है जिसमें 6 घंटे के अंदर सर्जरी अनिवार्य होती है।',
        highYieldMnemonic: 'SEVEN UP: Seminiferous tubules -> Epididymis -> Vas deferens -> Ejaculatory duct -> (Nothing) -> Urethra -> Penis',
        examPearls: [
          'लेडिग कोशिकाएं (Leydig cells): LH हार्मोन के प्रभाव में टेस्टोस्टेरोन बनाती हैं।',
          'सर्टोली कोशिकाएं (Sertoli cells): "नर्स सेल्स" जो विकासशील शुक्राणुओं को पोषण देती हैं और ब्लड-टेस्टिस बैरियर (Blood-Testis Barrier) बनाती हैं।',
          'Pampiniform venous plexus टेस्टिकुलर आर्टरी के खून को ठंडा करने के लिए काउंटर-करेंट हीट एक्सचेंजर का काम करता है।',
          'बायां टेस्टिकुलर वेन 90° कोण पर लेफ्ट रीनल वेन में ड्रेन करता है — इसलिए 85% वैरीकोसील बाईं ओर होती हैं।'
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
        treatmentsHinglish: [
          "टेस्टिकुलर टॉर्शन: तत्काल 6 घंटे के भीतर इमरजेंसी ऑपेरशन (Orchiopexy)।",
          "वैरीकोसील (Varicocele): माइक्रोस्कोपिक सब-इंग्वाइनल वैरीकोसीलेक्टॉमी या एम्बोलाइजेशन।",
          "पुरुष बांझपन: सीमेन एनालिसिस जांच और हार्मोनल संतुलन उपचार।"
        ],
        medications: ["Testosterone replacement therapy (Hypogonadism में)", "Anastrozole", "Clomiphene (शुक्राणु गणना सुधारने हेतु)"],
        homeRemedies: [
          "अंडकोष को अत्यधिक गर्मी से बचाएं (लैपटॉप को गोद में रखकर देर तक काम न करें, टाइट सिंथेटिक अंडरवियर से बचें)।",
          "जिंक, सेलेनियम और एंटीऑक्सीडेंट से भरपूर आहार लें।"
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
        rootWordEtymology: "ग्रीक 'Prostates' (अग्रणी रक्षक / आगे खड़ा रहने वाला)। Prostatitis (प्रोस्टेट में सूजन), Prostatectomy (प्रोस्टेट की सर्जरी)।",
        memoryTrickHindi: "ट्रिक: \"BPH = Transitional Zone\" (मूत्रमार्ग को दबाता है); \"Prostate Cancer = Peripheral Zone\" (DRE डिजिटल रेक्टल परीक्षण पर गांठ महसूस होती है)।",
        locationEn: 'Inverted cone-shaped fibromuscular gland situated immediately inferior to the bladder neck, encircling the prostatic urethra.',
        locationHinglish: 'मूत्राशय (Urinary bladder) के ठीक नीचे स्थित अखरोट के आकार की ग्रंथि, जिसके बीच से मूत्रमार्ग (Urethra) गुजरता है।',
        functionEn: 'Secretes a slightly alkaline, thin milky fluid (~30% of semen) rich in citric acid, zinc, and PSA that liquefies clotted semen and neutralizes vaginal acidity.',
        functionHinglish: 'दूधिया, थोड़ा क्षारीय (Alkaline) प्रोस्टेटिक द्रव बनाना जो वीर्य का 30% हिस्सा होता है; यह योनि के अम्लीय वातावरण को निष्क्रिय कर शुक्राणुओं को जीवित रखता है।',
        funFactEn: 'The prostate gland contains the highest concentration of elemental zinc of any soft tissue in the human body, acting as a potent natural antibacterial shield!',
        funFactHinglish: 'प्रोस्टेट में सिट्रिक एसिड, जिंक और प्रोस्टेट स्पेसिफिक एंटीजन (PSA) प्रचुर मात्रा में होते हैं जो थक्के वाले वीर्य को पतला (Liquefaction) करते हैं!',
        clinicalNoteEn: 'Benign Prostatic Hyperplasia (BPH) affects >50% of men over 60, arising in the transition zone and causing lower urinary tract symptoms (hesitancy, nocturia).',
        clinicalNoteHinglish: 'उम्रदराज पुरुषों में प्रोस्टेट बढ़ने (BPH) से पेशाब की धार कमजोर हो जाती है और रात में बार-बार उठना पड़ता है।',
        highYieldMnemonic: 'BPH = Transitional Zone; Prostate Cancer = Peripheral Zone',
        examPearls: [
          'मैकनील के अनुसार प्रोस्टेट 4 ज़ोन में बंटा है: Peripheral (कैंसर 70%), Transition (BPH 95%), Central, और Anterior stroma।',
          'PSA (Prostate Specific Antigen) एक सेरीन प्रोटीज है जो वीर्य को तरल बनाता है; 4 ng/mL से अधिक स्तर कैंसर या BPH का संकेत है।',
          'Batson\'s venous plexus: प्रोस्टैटिक वीनस प्लेक्सस बिना वाल्व के रीढ़ की हड्डियों के प्लेक्सस से जुड़ा है, जिससे प्रोस्टेट कैंसर सीधे रीढ़ में फैलता है।'
        ],
        citations: [
          {
            book: "BD Chaurasia's Human Anatomy Vol 2",
            citation: "Pelvis: Prostate Gland & Seminal Vesicles, pp. 399–412",
            highYieldFact: "Prostatic venous plexus communicates freely with the internal vertebral venous plexus of Batson without valves, explaining why prostatic carcinoma metastases rapidly spread to lumbar vertebrae."
          }
        ],
        treatmentsHinglish: [
          "दवा चिकित्सा: अल्फा-1 ब्लॉकर्स (Tamsulosin) मूत्र प्रवाह सुधारने हेतु + 5-ARIs (Finasteride) प्रोस्टेट आकार घटाने हेतु।",
          "दूरबीन सर्जरी: टीयूआरपी (TURP - Transurethral Resection of Prostate) या लेजर इन्यूक्लिएशन (HoLEP)।",
          "कैंसर स्क्रीनिंग: 50 वर्ष बाद सीरम PSA टेस्ट और डिजिटल रेक्टल एग्जामिनेशन (DRE)।"
        ],
        medications: ["Tamsulosin (Flomax)", "Finasteride / Dutasteride", "Silodosin", "Bicalutamide (Anti-androgen)"],
        homeRemedies: [
          "रात को सोने से 2 घंटे पहले पानी या चाय-कॉफी का सेवन सीमित रखें।",
          "कब्ज से बचें और पेल्विक फ्लोर व्यायाम करें; टमाटर (लाइकोपीन) का सेवन प्रोस्टेट स्वास्थ्य के लिए उत्तम है।"
        ],
        relatedDiseases: ['Benign Prostatic Hyperplasia (BPH)', 'Prostatitis', 'Prostate Cancer'],
      },
      {
        id: 'epididymis-vas',
        name: 'Epididymis & Vas Deferens',
        hindiName: 'अधिवृषण एवं शुक्रवाहक नलिका (एपिडिडिमिस व वास डिफेरेन्स)',
        latinName: 'Epididymis et Ductus deferens',
        pronunciation: 'ep-i-DID-i-mis and vas DEF-uh-renz',
        system: 'reproductive',
        elements: ['FJ2782', 'FJ2783'],
        rootWordEtymology: "ग्रीक 'Epi' (ऊपर) + 'Didymos' (जुड़वां/वृषण)। Vas (नलिका) + Deferens (ले जाने वाली)। Vasectomy = पुरुष नसबंदी।",
        memoryTrickHindi: "ट्रिक: \"VAS = 45 CM LONG CORD\" — 45 सेमी लंबी मजबूत पेशीय नली; उंगलियों से छूने पर कड़े धागे (Whipcord) जैसी महसूस होती है। पुरुष नसबंदी का मुख्य लक्ष्य।",
        locationEn: 'The epididymis sits crescent-shaped along the posterolateral border of each testis; the vas deferens is a 45 cm muscular cord running through the inguinal canal to the posterior bladder.',
        locationHinglish: 'वृषण के पिछले हिस्से पर स्थित अर्धचंद्राकार अंग (एपिडिडिमिस) तथा वहां से निकलकर वंक्षण नलिका (Inguinal canal) से होते हुए मूत्राशय के पीछे तक जाने वाली 45 सेमी लंबी मजबूत पेशीय नली।',
        functionEn: 'Epididymis matures spermatozoa over 12-14 days conferring forward motility; vas deferens forcefully propels sperm into the ejaculatory duct via sympathetic peristalsis during emission.',
        functionHinglish: 'शुक्राणुओं को 2 सप्ताह तक सुरक्षित रखकर परिपक्व बनाना और तैरने की क्षमता (Motility) देना; संभोग के चरम पर तीव्र संकुचन से शुक्राणुओं को आगे बढ़ाना।',
        funFactEn: 'The microscopic epididymal duct is tightly coiled into a 5-centimeter organ, but unraveled it measures an astonishing 6 meters (20 feet) in length!',
        funFactHinglish: 'एपिडिडिमिस की सूक्ष्म नली केवल 5 सेमी के अंग में लिपटी होती है, लेकिन अगर इसे सीधा खोला जाए तो यह 6 मीटर (20 फीट) लंबी निकलती है!',
        clinicalNoteEn: 'Vasectomy is a safe, outpatient permanent male contraception wherein both vasa deferentia are severed and ligated under local anesthesia.',
        clinicalNoteHinglish: 'पुरुष नसबंदी (No-Scalpel Vasectomy - NSV): स्थानीय सुन्नता में केवल 10 मिनट में दोनों वास डिफेरेन्स को काटकर बांध दिया जाता है — बिना टांके और बिना दर्द के।',
        highYieldMnemonic: '45 CM CLUB: Vas deferens, Femur, Spinal cord, Thoracic duct are all ~45 cm!',
        examPearls: [
          'लंबाई: Vas deferens 45 cm (18 inches) लंबी होती है।',
          'त्रितंत्रीय पेशी दीवार: Outer longitudinal, middle circular, inner longitudinal — संकुचन अत्यंत तीव्र होता है।',
          'Ampulla of vas deferens सेमिनल वेसिकल की डक्ट से मिलकर Ejaculatory duct बनाती है।'
        ],
        citations: [
          {
            book: "BD Chaurasia's Human Anatomy Vol 2",
            citation: "Pelvis: Spermatic Cord & Vas Deferens, pp. 385–395",
            highYieldFact: "The vas deferens is easily palpable within the spermatic cord as a firm, whipcord-like structure due to its thick, smooth muscle coat and pinhole lumen."
          }
        ],
        treatmentsHinglish: [
          "नो-स्कैलपेल वासेक्टॉमी (NSV) स्थायी पुरुष परिवार नियोजन हेतु।",
          "रिवर्सल सर्जरी: माइक्रोस्कोपिक वासोवासोस्टॉमी (Vasovasostomy) नसबंदी खोलने हेतु।",
          "एपिडिडिमाइटिस सूजन में स्क्रोटल सपोर्ट, एंटीबायोटिक और दर्द निवारक।"
        ],
        medications: ["Ofloxacin / Levofloxacin", "Ibuprofen (सूजन रोधी)", "Doxycycline"],
        homeRemedies: [
          "टाइट स्क्रोटल सपोर्टर का उपयोग, संक्रमण से बचाव, भारी वजन उठाने से परहेज।",
          "वासेक्टॉमी के 3 महीने बाद सीमेन एनालिसिस जांच ताकि स्पर्म काउंट शून्य प्रमाणित हो सके।"
        ],
        relatedDiseases: ['Epididymitis', 'Male Infertility', 'Spermatocele'],
      },
      {
        id: 'penis-erectile',
        name: 'Penis & Erectile Bodies (Corpora Cavernosa)',
        hindiName: 'शिश्न एवं उत्थानशील ऊतक (पेनिस व कॉर्पोरा कैवरनोसा)',
        latinName: 'Penis et Corpora cavernosa',
        pronunciation: 'PEE-nis and KOR-per-uh kav-er-NOH-suh',
        system: 'reproductive',
        elements: ['FJ2792'],
        rootWordEtymology: "लैटिन 'Penis' (पूंछ) + 'Corpora' (शरीर/ऊतक) + 'Cavernosa' (गुहाओं/गुफाओं से भरा स्पंज)। Priapism = लगातार दर्दनाक इरेक्शन।",
        memoryTrickHindi: "ट्रिक: \"POINT & SHOOT\" — Parasympathetic = Point (Nitric Oxide से इरेक्शन); Sympathetic = Shoot (T11-L2 रिफ्लेक्स से वीर्यस्खलन)।",
        locationEn: 'External male copulatory and urinary organ attached to the perineal membrane and pubic bones; comprises paired dorsolateral corpora cavernosa and ventral corpus spongiosum.',
        locationHinglish: 'पेल्विस के सामने स्थित बाह्य जननांग; तीन स्पंज जैसी उत्थानशील सिलेंडरों (दो कॉर्पोरा कैवरनोसा और एक कॉर्पस स्पॉन्जियोसम) से निर्मित।',
        functionEn: 'Dual copulatory and excretory pathway: achieves high rigidity through arterial inflow and venous occlusion (erection), and conduits urine from bladder.',
        functionHinglish: 'मूत्र त्याग का अंतिम मार्ग तथा प्रजनन हेतु संभोग के समय रक्त प्रवाह भरकर कठोर होना (Erection) और वीर्य स्खलन कराना।',
        funFactEn: 'Penile erection is a pure hydraulic phenomenon: arterial inflow surges up to 8-fold while venous outflow is mechanically compressed shut by the rigid tunica albuginea!',
        funFactHinglish: 'इरेक्शन पूरी तरह से एक हाइड्रोलिक चमत्कार है: धमनियों से रक्त प्रवाह 8 गुना बढ़ जाता है जबकि नसों का निकास पूरी तरह लॉक हो जाता है!',
        clinicalNoteEn: 'Erectile Dysfunction (ED) often serves as an early vascular indicator of Coronary Artery Disease (CAD) due to penile artery diameter (1-2 mm vs 3-4 mm coronary).',
        clinicalNoteHinglish: 'इरेक्टाइल डिसफंक्शन (ED) अक्सर दिल की बीमारियों और डायबिटीज का पहला संकेत होता है, क्योंकि शिश्न की सूक्ष्म धमनियां ब्लॉक होने लगती हैं।',
        highYieldMnemonic: 'Point and Shoot: Parasympathetic (Point/Erect) & Sympathetic (Shoot/Ejaculate)',
        examPearls: [
          'Tunica albuginea: कॉर्पोरा कैवरनोसा को घेरने वाला मजबूत फाइब्रस आवरण; इरेक्शन में वेंस को दबाकर रक्त को बाहर जाने से रोकता है।',
          'Deep dorsal vein of penis: प्रोस्टैटिक वीनस प्लेक्सस में ड्रेन करती है।',
          'Helicine arteries: घुमावदार धमनी शाखाएं जो नाइट्रिक ऑक्साइड के प्रभाव में चौड़ी होकर रक्त से भर जाती हैं।'
        ],
        citations: [
          {
            book: "Campbell-Walsh Urology (12th Edition)",
            citation: "Chapter 68: Physiology of Penile Erection and Pathophysiology of ED, pp. 1502–1530",
            highYieldFact: "Nitric oxide released from non-adrenergic non-cholinergic (NANC) parasympathetic nerves stimulates guanylyl cyclase, elevating cGMP to relax cavernous vascular smooth muscle."
          }
        ],
        treatmentsHinglish: [
          "जीवनशैली सुधार: धूम्रपान व शराब बंद करना, कार्डियो व्यायाम, डायबिटीज व बीपी का कड़ा नियंत्रण।",
          "दवा चिकित्सा: PDE-5 इन्हिबिटर्स (Sildenafil, Tadalafil) जो नाइट्रिक ऑक्साइड पाथवे को सक्रिय करते हैं।",
          "गंभीर मामलों में: वैक्यूम इरेक्शन डिवाइस (VED) अथवा इन्फ्लेटेबल पेनाइल प्रोस्थेसिस सर्जरी।"
        ],
        medications: ["Sildenafil (Viagra)", "Tadalafil (Cialis)", "Avanafil", "Alprostadil (PGE1)"],
        homeRemedies: [
          "धूम्रपान का पूर्ण त्याग, नियमित एरोबिक कसरत (रक्त संचार सुधारने हेतु)।",
          "मानसिक तनाव व परफॉर्मेंस एंग्जायटी प्रबंधन।"
        ],
        relatedDiseases: ['Erectile Dysfunction', 'Peyronie Disease', 'Priapism'],
      },
      {
        id: 'seminal-vesicles',
        name: 'Seminal Vesicles & Bulbourethral Glands',
        hindiName: 'शुक्राशय एवं स्खलन नलिकाएं (सेमिनल वेसिकल्स)',
        latinName: 'Vesiculae seminales',
        pronunciation: 'SEM-uh-nuhl VES-i-kuhlz',
        system: 'reproductive',
        elements: ['FJ2791'],
        rootWordEtymology: "लैटिन 'Semen' (बीज) + 'Vesicula' (छोटी थैली)। Vesiculitis = शुक्राशय की सूजन।",
        memoryTrickHindi: "ट्रिक: \"SEMEN = 60-70% FRUCTOSE FUEL\" — सेमिनल वेसिकल्स वीर्य का 65% हिस्सा बनाती हैं और फ्रुक्टोज प्रदान करती हैं जो शुक्राणुओं की ऊर्जा का मुख्य स्रोत है।",
        locationEn: 'Pair of 5 cm convoluted saccular pouches situated between the posterior base of the bladder and the rectum, superior to the prostate gland.',
        locationHinglish: 'मूत्राशय के आधार के पीछे और मलाशय के सामने प्रोस्टेट ग्रंथि के ऊपर स्थित लगभग 5 सेमी लंबी दो घुमावदार थैलियां।',
        functionEn: 'Produces ~60-70% of semen volume: a thick, yellowish, alkaline fluid rich in fructose, prostaglandins, and semenogelin that nourishes and mobilizes sperm.',
        functionHinglish: 'वीर्य का 60 से 70% पोषक हिस्सा बनाना; इसमें फ्रुक्टोज (शुक्राणुओं का ईंधन), प्रोस्टाग्लैंडिन्स और क्षारीय द्रव होता है जो शुक्राणुओं को ऊर्जा देता है।',
        funFactEn: 'Fructose in seminal fluid is produced nowhere else in the male body — forensics uses seminal fructose tests to confirm biological evidence!',
        funFactHinglish: 'वीर्य में पाया जाने वाला फ्रुक्टोज पुरुष शरीर में अन्य किसी भी अंग में नहीं बनता — फॉरेंसिक साइंस में इसका उपयोग अपराध जांच में वीर्य की पहचान हेतु किया जाता है!',
        clinicalNoteEn: 'Absence of seminal fructose in an azoospermic male strongly indicates Congenital Bilateral Absence of the Vas Deferens (CBAVD), frequently linked to CFTR gene mutations.',
        clinicalNoteHinglish: 'वीर्य में फ्रुक्टोज केवल सेमिनल वेसिकल्स से आता है; बांझपन की जांच में यदि फ्रुक्टोज शून्य हो तो इसका अर्थ है कि नलिकाएं जन्म से गायब या अवरुद्ध हैं।',
        highYieldMnemonic: 'Seminal Fructose: 65% semen volume, exclusive source of sperm fructose',
        examPearls: [
          'फ्रुक्टोज की उपस्थिति फॉरेंसिक मेडिसिन में वीर्य के दाग (Semen identification) की पुष्टि में काम आती है।',
          'प्रोस्टाग्लैंडिन्स महिला गर्भाशय में संकुचन पैदा करते हैं जिससे शुक्राणु तेजी से फैलोपियन ट्यूब की ओर खिंचते हैं।',
          'Duct of seminal vesicle + Ampulla of vas deferens = Ejaculatory duct (जो प्रोस्टेट के अंदर खुलती है)।'
        ],
        citations: [
          {
            book: "Guyton and Hall Textbook of Medical Physiology",
            citation: "Unit XIV, Chapter 81 (Male Reproductive Functions and Seminal Fluid), pp. 1025–1032",
            highYieldFact: "Prostaglandins from seminal vesicles react with female cervical mucus to render it more receptive to sperm movement and induce backward reverse peristalsis in the uterus and fallopian tubes."
          }
        ],
        treatmentsHinglish: [
          "सेमिनल वेसिकुलाइटिस: कल्चर्ड एंटीबायोटिक थेरेपी और पेल्विक एंटी-इन्फ्लेमेटरी दवाएं।",
          "ट्रांसयूरेथ्रल रिसेक्शन ऑफ इजेकुलेटरी डक्ट (TURED): स्खलन नली में रुकावट होने पर एंडोस्कोपिक सर्जरी।",
          "टीआरयूएस (TRUS - Transrectal Ultrasound) द्वारा सटीक सोनोग्राफी।"
        ],
        medications: ["Ciprofloxacin / Levofloxacin", "Tamsulosin", "NSAIDs"],
        homeRemedies: [
          "पर्याप्त पानी पीना, लंबे समय तक एक ही जगह बैठे रहने से बचना।",
          "पेल्विक वॉर्म बाथ (Sitz bath) और नियमित वीर्यस्खलन से कंजेशन रोकना।"
        ],
        relatedDiseases: ['Seminal Vesiculitis', 'Hematospermia', 'Ejaculatory Duct Obstruction'],
      },
    ],
  },
  // CHAPTER 9: ENDOCRINE SYSTEM & HORMONAL REGULATION
  {
    id: 'chapter-endocrine',
    chapterNumber: 9,
    systemId: 'endocrine',
    title: 'The Endocrine System & Chemical Messengers',
    hindiTitle: 'अध्याय 9: अंतःस्रावी तंत्र एवं हार्मोनल नियंत्रण',
    subtitle: 'शरीर का रासायनिक सिग्नलिंग नेटवर्क — पीयूष ग्रंथि, एड्रिनल और मेटाबॉलिज्म',
    recommendedBooks: [
      "Guyton & Hall Physiology (Unit XIV: Endocrinology & Reproduction)",
      "Williams Textbook of Endocrinology (14th Edition)",
      "BD Chaurasia's Human Anatomy Vol 3 (Head & Neck: Pituitary & Thyroid)",
      "Robbins Pathologic Basis of Disease (Endocrine System)"
    ],
    introductionHinglish: 'अंतःस्रावी तंत्र (Endocrine System) नलिकाविहीन (Ductless) ग्रंथियों का वह जाल है जो रासायनिक संदेशवाहक यानी हार्मोन सीधे रक्तप्रवाह में छोड़ता है। ये हार्मोन वृद्धि, विकास, रक्तचाप, मेटाबॉलिज्म, नींद और तनाव को नियंत्रित करते हैं। मस्तिष्क का हाइपोथैलेमस और पीयूष ग्रंथि (Pituitary Gland) इस पूरे तंत्र के सर्वोच्च कमांडर हैं।',
    howItWorksHinglish: 'पीयूष ग्रंथि अन्य सभी ग्रंथियों को TSH, ACTH, LH, FSH जैसे प्रेरक हार्मोन भेजती है। जब रक्त में किसी हार्मोन का स्तर बढ़ जाता है, तो नेगेटिव फीडबैक लूप (Negative Feedback Mechanism) द्वारा हाइपोथैलेमस उसका स्राव रोक देता है। एड्रिनल ग्रंथि आपातकाल में एड्रेनालाईन छोड़ती है जिसे "फाइट या फ्लाइट" रिस्पॉन्स कहते हैं।',
    introductionHindi: 'अंतःस्रावी तंत्र डक्टलेस ग्रंथियों का समूह है जो विभिन्न जैव-रासायनिक क्रियाओं के नियमन हेतु हार्मोन्स का सीधे रुधिर में विसर्जन करता है। पीयूष ग्रंथि समस्त कायिक ग्रंथियों का मास्टर रेगुलेटर है।',
    introductionEn: 'The endocrine system comprises ductless glandular tissues synthesizing peptide and steroid hormones directly into systemic circulation, regulating homeostasis via exquisitely tuned negative feedback loops.',
    howItWorksHindi: 'हाइपोथैलेमो-पिट्यूटरी अक्ष द्वारा नियंत्रित फीडबैक पाथवे से लक्ष्य अंग सक्रिय होते हैं तथा उपापचय, खनिज संतुलन व तनाव का नियंत्रण होता है।',
    howItWorksEn: 'Hypothalamic releasing factors direct pituitary trophic hormone secretion, which stimulates target endocrine glands to release effector hormones governed by negative feedback.',
    commonDiseases: CLINICAL_DISEASES.filter(d => d.id === 'diabetes-type2' || d.id === 'hypothyroidism'),
    parts: [
      {
        id: 'pituitary-gland',
        name: 'Pituitary Gland (Hypophysis)',
        hindiName: 'पीयूष ग्रंथि (मास्टर ग्रंथि / हाइपोफिसिस)',
        latinName: 'Glandula pituitaria / Hypophysis cerebri',
        pronunciation: 'pi-TOO-i-tair-ee GLAND',
        system: 'nervous',
        elements: ['FJ1796'],
        rootWordEtymology: "ग्रीक 'Hypo' (नीचे) + 'Physis' (वृद्धि)। लैटिन 'Pituita' (कफ/म्यूकस) से उत्पन्न, प्राचीन काल में इसे मस्तिष्क का स्रावक माना जाता था।",
        memoryTrickHindi: "ट्रिक: \"FLAT PIG\" (एंटीरियर पिट्यूटरी के हार्मोन) — FSH, LH, ACTH, TSH, Prolactin, (Ignore), Growth Hormone।",
        locationHinglish: 'मस्तिष्क के आधार पर, स्फेनॉइड हड्डी के एक विशेष गड्ढे (Sella Turcica) में एक मटर के दाने के आकार की ग्रंथि।',
        functionHinglish: 'मास्टर ग्लैंड: थायरॉयड, एड्रिनल, अंडाशय और वृषण को नियंत्रित करने वाले 8 से अधिक महत्वपूर्ण हार्मोन्स का स्राव।',
        funFactHinglish: 'यह ग्रंथि केवल 0.5 ग्राम वजनी मटर के दाने जितनी होती है, लेकिन पूरे शरीर के विकास और जीवन की गति को यही तय करती है!',
        clinicalNoteHinglish: 'पिट्यूटरी ट्यूमर ऑप्टिक चियाज्म (Optic Chiasm) को दबाता है, जिससे बाइ-टेम्पोरल हेमीएनोपिया (दोनों आंखों के बाहरी तरफ का दिखना बंद होना) हो जाता है।',
        highYieldMnemonic: 'FLAT PIG: FSH, LH, ACTH, TSH, Prolactin, GH (Anterior Pituitary Hormones)',
        examPearls: [
          'पोस्टीरियर पिट्यूटरी (Neurohypophysis) दो हार्मोन छोड़ती है: Oxytocin (दूध व गर्भाशय संकुचन) और ADH/Vasopressin (जल प्रतिधारण)।',
          'एंटीरियर पिट्यूटरी राथके की थैली (Rathke\'s pouch - ओरल एक्टोडर्म) से विकसित होती है।'
        ],
        citations: [
          {
            book: "Guyton and Hall Textbook of Medical Physiology",
            citation: "Unit XIV, Chapter 76 (Pituitary Hormones and Their Control by the Hypothalamus), pp. 939–952",
            highYieldFact: "Hypothalamic-hypophyseal portal venous system delivers high concentrations of hypothalamic releasing hormones directly to the anterior pituitary without systemic dilution."
          }
        ],
        relatedDiseases: ['Pituitary Adenoma', 'Diabetes Insipidus', 'Acromegaly'],
      },
      {
        id: 'adrenal-glands',
        name: 'Adrenal Glands (Suprarenal)',
        hindiName: 'अधिवृक्क ग्रंथि (एड्रिनल ग्लैंड - जीवनरक्षक ग्रंथि)',
        latinName: 'Glandulae suprarenales',
        pronunciation: 'uh-DREE-nuhl GLAND',
        system: 'urinary',
        elements: ['FJ3129', 'FJ3130'],
        rootWordEtymology: "लैटिन 'Ad' (पास) + 'Ren' (गुर्दा)। गुर्दे के ऊपर मुकुट की तरह स्थित होने के कारण इसे Suprarenal भी कहा जाता है।",
        memoryTrickHindi: "ट्रिक: \"GFR = Salt, Sugar, Sex\" — Zona Glomerulosa (Aldosterone/Salt), Zona Fasciculata (Cortisol/Sugar), Zona Reticularis (Androgens/Sex)।",
        locationHinglish: 'दोनों गुर्दों (Kidneys) के ऊपरी सिरे पर टोपी की तरह चिपकी हुई दो त्रिकोणीय पीले रंग की ग्रंथियां।',
        functionHinglish: 'कोर्टिसोल (तनाव हार्मोन), एल्डोस्टेरोन (बीपी व नमक संतुलन) और एड्रेनालाईन (इमरजेंसी एनर्जी) बनाना।',
        funFactHinglish: 'जब आप किसी खतरे या डर का सामना करते हैं, तो एड्रिनल ग्रंथि 1 सेकंड में एड्रेनालाईन पंप कर हृदय गति 150+ कर देती है ताकि आप लड़ सकें या भाग सकें!',
        clinicalNoteHinglish: 'कोर्टिसोल की अत्यधिक अधिकता से कुशिंग सिंड्रोम (Cushing\'s syndrome - मून फेस व पेट का मोटापा) और कमी से एडिसन रोग होता है।',
        highYieldMnemonic: 'GFR: Go Find Rex = Glomerulosa, Fasciculata, Reticularis (बाहर से अंदर की 3 कॉर्टेक्स परतें)',
        examPearls: [
          'एड्रिनल मेडुला वास्तव में एक रूपांतरित पोस्ट-गैंग्लिओनिक सिम्पैथेटिक गैन्ग्लियन है जो एड्रेनालाईन (80%) और नॉर-एड्रेनालाईन (20%) छोड़ता है।',
          'दाएं एड्रिनल का आकार त्रिकोणीय (Pyramidal) और बाएं का अर्धचंद्राकार (Semilunar) होता है।'
        ],
        citations: [
          {
            book: "Gray's Anatomy (42nd Edition)",
            citation: "Section 8: Abdomen, Chapter 67 (Suprarenal Glands), pp. 1198–1205",
            highYieldFact: "Right suprarenal vein drains directly into the Inferior Vena Cava (very short, prone to surgical avulsion), whereas the left drains into the left renal vein."
          }
        ],
        relatedDiseases: ['Addison\'s Disease', 'Cushing\'s Syndrome', 'Pheochromocytoma'],
      },
    ],
  },

  // CHAPTER 10: MUSCULAR SYSTEM & DIAPHRAGM
  {
    id: 'chapter-muscular',
    chapterNumber: 10,
    systemId: 'muscular',
    title: 'The Muscular Engine & Respiratory Mechanics',
    hindiTitle: 'अध्याय 10: पेशी तंत्र, डायफ्राम एवं गतिविज्ञान',
    subtitle: '400+ कंकाल पेशियों का संकुचन, मायोफिलामेंट्स और श्वास का मुख्य पर्दा',
    recommendedBooks: [
      "BD Chaurasia's Human Anatomy Vol 1 & 2 (General Anatomy & Myology)",
      "Gray's Anatomy 42nd Ed (Section 2: Musculoskeletal System)",
      "Guyton & Hall Physiology (Unit II: Membrane & Muscle Physiology)",
      "Netter's Atlas of Human Anatomy (Muscular Plates)"
    ],
    introductionHinglish: 'मानव पेशी तंत्र (Muscular System) शरीर के कुल भार का लगभग 40% से 50% हिस्सा बनाता है। इसमें 650 से अधिक कंकाल मांसपेशियां होती हैं जो एक्टिन और मायोसिन प्रोटीन के स्लाइडिंग फिलामेंट मॉडल द्वारा सिकुड़कर हड्डियां चलाती हैं, मुद्रा (Posture) बनाए रखती हैं और शरीर का तापमान 37°C बनाए रखने के लिए गर्मी (Body Heat) पैदा करती हैं।',
    howItWorksHinglish: 'मस्तिष्क से मोटर न्यूरॉन द्वारा एसिटाइलकोलीन न्यूरोट्रांसमीटर निकलता है। यह सार्कोप्लाज्मिक रेटिकुलम से कैल्शियम आयन मुक्त कराता है। कैल्शियम ट्रोपोनिन से जुड़ता है, जिससे एक्टिन-मायोसिन क्रॉस-ब्रिज बनते हैं और एटीपी (ATP) ऊर्जा खर्च करके मांसपेशी संकुचित होती है।',
    introductionHindi: 'पेशी तंत्र संकुचनशील ऊतकों का विशाल समूह है जो एटीपी ऊर्जा को यांत्रिक ऊर्जा में बदलकर चलन, रक्त प्रवाह व श्वसन को संभव बनाता है।',
    introductionEn: 'Skeletal muscles generate contractile force via cyclic interaction of actin and myosin myofilaments powered by ATP hydrolysis under somatic motor innervation.',
    howItWorksHindi: 'मोटर एंड-प्लेट पर तंत्रिका आवेग से कैल्शियम मुक्त होकर मायोसिन क्रॉस-ब्रिज साइकिलिंग को ट्रिगर करता है, जिससे सार्कोमियर लंबाई घटती है।',
    howItWorksEn: 'Depolarization triggers sarcoplasmic calcium release, binding troponin-C to expose actin-binding sites for cyclic power strokes of myosin heads.',
    commonDiseases: CLINICAL_DISEASES.filter(d => d.id === 'myasthenia-gravis' || d.id === 'diaphragmatic-hernia'),
    parts: [
      {
        id: 'diaphragm-muscle',
        name: 'Thoracoabdominal Diaphragm',
        hindiName: 'मध्यच्छद (डायफ्राम - मुख्य श्वसन पेशी)',
        latinName: 'Diaphragma',
        pronunciation: 'DY-uh-fram',
        system: 'muscular',
        elements: ['FJ3131'],
        rootWordEtymology: "ग्रीक 'Dia' (आर-पार) + 'Phragma' (बाड़/दीवार)। छाती और पेट के बीच विभाजन रेखा बनाने वाला गुंबदनुमा पर्दा।",
        memoryTrickHindi: "ट्रिक: \"C3, 4, 5 Keeps the Diaphragm Alive\" — डायफ्राम की एकमात्र मोटर तंत्रिका Phrenic Nerve सर्वाइकल स्पाइन C3, C4, C5 से निकलती है।",
        locationHinglish: 'छाती की गुहा (Thorax) और पेट की गुहा (Abdomen) के बीच फैला गुंबद के आकार का विशाल पेशीय पर्दा।',
        functionHinglish: 'श्वास लेने की 75% शक्ति यही पेशी देती है। जब यह नीचे सिकुड़ती है, तो छाती में वैक्यूम बनता है और फेफड़ों में हवा भर जाती है।',
        funFactHinglish: 'हिचकी (Hiccups) वास्तव में डायफ्राम पेशी का अचानक अनियंत्रित संकुचन है, जिसके बाद वोकल कॉर्ड्स अचानक बंद होकर \"हिक\" की आवाज निकालते हैं!',
        clinicalNoteHinglish: 'डायफ्राम के कमजोर हिस्से से पेट के अंगों का छाती में खिसकना हायटस हर्निया (Hiatus Hernia) कहलाता है जिससे गंभीर एसिडिटी होती है।',
        highYieldMnemonic: 'I 8 10 Eggs At 12: T8 = IVC, T10 = Esophagus, T12 = Aorta (डायफ्राम के 3 प्रमुख छिद्र)',
        examPearls: [
          'T8 स्तर पर: Inferior Vena Cava और दायां फ्रेनिक नर्व गुजरती है।',
          'T10 स्तर पर: Esophagus (ग्रासनली) और दोनों Vagus nerves गुजरती हैं।',
          'T12 स्तर पर: Abdominal Aorta, Thoracic duct और Azygos vein गुजरती हैं।'
        ],
        citations: [
          {
            book: "BD Chaurasia's Human Anatomy Vol 1",
            citation: "Section II: Thorax, Chapter 16 (Thoracic Wall & Diaphragm), pp. 235–250",
            highYieldFact: "Referred pain from diaphragmatic pleura or peritoneum is felt at the tip of the shoulder (dermatome C4) because the phrenic and supraclavicular nerves share common spinal segments."
          }
        ],
        relatedDiseases: ['Hiatal Hernia', 'Diaphragmatic Rupture', 'Phrenic Nerve Palsy'],
      },
    ],
  },

  // CHAPTER 11: IMMUNE & LYMPHATIC SYSTEM
  {
    id: 'chapter-lymphatic',
    chapterNumber: 11,
    systemId: 'lymphatic',
    title: 'The Lymphatic System & Immune Defense',
    hindiTitle: 'अध्याय 11: लसिका तंत्र एवं रोग-प्रतिरोधक रक्षा प्रणाली',
    subtitle: 'शरीर की आंतरिक सुरक्षा सेना — प्लीहा (तिल्ली), थाइमस और लसिका वाहिकाएं',
    recommendedBooks: [
      "Gray's Anatomy 42nd Ed (Sec. 8: Lymphatic System & Spleen)",
      "BD Chaurasia's Human Anatomy Vol 2 (Abdomen: Spleen & Portal Circulation)",
      "Kuby Immunology (8th Edition)",
      "Guyton & Hall Physiology (Unit VI: Blood Cells, Immunity & Blood Clotting)"
    ],
    introductionHinglish: 'लसिका तंत्र (Lymphatic System) शरीर का सीवरेज और सुरक्षा नेटवर्क दोनों है। यह ऊतकों से अतिरिक्त तरल पदार्थ छानकर रक्त में वापस भेजता है और बैक्टीरिया, वायरस और कैंसर कोशिकाओं को नष्ट करने के लिए टी-लिम्फोसाइट्स व बी-लिम्फोसाइट्स की सेना तैनात करता है। प्लीहा (Spleen) शरीर का सबसे बड़ा लसिका अंग है।',
    howItWorksHinglish: 'रक्त केशिकाओं से जो 2 से 3 लीटर तरल प्रतिदिन छनकर ऊतकों में रह जाता है, लसिका वाहिकाएं उसे सोखकर लिंफ नोड्स में लाती हैं। नोड्स में मैक्रोफेज कीटाणुओं को खा जाते हैं। अंत में थोरेसिक डक्ट द्वारा यह शुद्ध तरल बाएं सबक्लेवियन वेन में छोड़ दिया जाता है।',
    introductionHindi: 'लसिका तंत्र अतिरिक्त ऊतकीय द्रव का पुनर्चक्रण करने तथा लिम्फोसाइट्स द्वारा रोगाणुओं का भक्षण कर दैहिक प्रतिरक्षा प्रदान करने वाला जटिल संवहनी तंत्र है।',
    introductionEn: 'The lymphatic system maintains fluid homeostasis by returning extravasated interstitial fluid to the vascular tree while orchestrating antigen surveillance across secondary lymphoid organs.',
    howItWorksHindi: 'लिम्फ नोड्स और प्लीहा की रेटिकुलो-एंडोथीलियल कोशिकाएं रुधिर में उपस्थित विजातीय पदार्थों व जीर्ण रक्त कणिकाओं को नष्ट करती हैं।',
    howItWorksEn: 'Afferent lymphatics deliver antigens to nodal germinal centers for clonal expansion of B and T lymphocytes, while the thoracic duct restores lymph to systemic veins.',
    commonDiseases: CLINICAL_DISEASES.filter(d => d.id === 'splenomegaly' || d.id === 'lymphoma'),
    parts: [
      {
        id: 'spleen-organ',
        name: 'Spleen (Lien / तिल्ली)',
        hindiName: 'प्लीहा (तिल्ली / आरबीसी का कब्रिस्तान)',
        latinName: 'Lien / Splen',
        pronunciation: 'SPLEEN',
        system: 'lymphatic',
        elements: ['FJ2561'],
        rootWordEtymology: "ग्रीक 'Splen' और लैटिन 'Lien' से उत्पन्न। स्प्लेनेक्टॉमी (Spleen हटाना) और स्प्लेनोमेगाली (Spleen का बढ़ना)।",
        memoryTrickHindi: "ट्रिक: \"हैरिस का नियम (1, 3, 5, 7, 9, 11)\" — मोटाई 1 इंच, चौड़ाई 3 इंच, लंबाई 5 इंच, वजन 7 औंस, पसलियां 9 से 11 के बीच स्थित।",
        locationHinglish: 'पेट के ऊपरी बाएं कोने में (Left Hypochondrium), आमाशय के पीछे और 9वीं से 11वीं पसली के नीचे सुरक्षित।',
        functionHinglish: '1. पुरानी 120 दिन की घिसी-पिटी RBCs को छानकर नष्ट करना। 2. आपातकाल के लिए लगभग 200-300 मिली खून का भंडार रखना। 3. एंटीबॉडीज बनाना।',
        funFactHinglish: 'प्लीहा इतनी नाजुक होती है कि सड़क दुर्घटना में पसली टूटने पर यह फट सकती है, जिससे पेट में भारी आंतरिक रक्तस्राव होता है!',
        clinicalNoteHinglish: 'मलेरिया, कालाजार या टाइफाइड में प्लीहा बहुत बढ़ जाती है (Splenomegaly); सामान्य स्थिति में यह पसली के नीचे नहीं छूई जा सकती।',
        highYieldMnemonic: 'Odd numbers 1 to 11: 1 x 3 x 5 inches, 7 oz weight, relations with 9th-11th ribs',
        examPearls: [
          'सफेद गूदा (White Pulp): टी और बी लिम्फोसाइट्स की प्रतिरक्षा चौकी है।',
          'लाल गूदा (Red Pulp): कॉर्ड्स ऑफ बिलरोथ (Cords of Billroth) जहां वृद्ध आरबीसी को छाना जाता है।',
          'स्प्लेनेक्टॉमी के बाद इनकैप्सुलेटेड बैक्टीरिया (Strep. pneumoniae, H. influenzae) से ओवरव्हेल्मिंग पोस्ट-स्प्लेनेक्टॉमी इन्फेक्शन (OPSI) का जोखिम रहता है।'
        ],
        citations: [
          {
            book: "BD Chaurasia's Human Anatomy Vol 2",
            citation: "Abdomen: Spleen and Coeliac Trunk, pp. 315–328",
            highYieldFact: "The gastrosplenic ligament contains the short gastric vessels and left gastroepiploic vessels; the lienorenal ligament contains the splenic vessels and tail of the pancreas."
          }
        ],
        relatedDiseases: ['Splenomegaly', 'Splenic Rupture', 'Hypersplenism'],
      },
    ],
  },

  // CHAPTER 12: SENSORY ORGANS & VISION
  {
    id: 'chapter-sensory',
    chapterNumber: 12,
    systemId: 'sensory',
    title: 'The Sensory Windows & Visual Apparatus',
    hindiTitle: 'अध्याय 12: संवेदी अंग, नेत्र एवं दृष्टि विज्ञान',
    subtitle: 'संसार को देखने की खिड़की — कॉर्निया, रेटिना और ऑप्टिक पाथवे',
    recommendedBooks: [
      "Gray's Anatomy 42nd Ed (Sec. 4: Sensory Organs - The Eye)",
      "AK Khurana's Comprehensive Ophthalmology",
      "BD Chaurasia's Human Anatomy Vol 3 (Head & Neck: Orbit & Eyeball)",
      "Guyton & Hall Physiology (Unit X: The Special Senses - Optics of Vision)"
    ],
    introductionHinglish: 'मानव नेत्र (Human Eye) प्रकृति का सबसे परिष्कृत ऑप्टिकल कैमरा है। यह 1.2 करोड़ से अधिक फोटोरिसेप्टर्स (Rods and Cones) की मदद से प्रकाश की तरंगों को विद्युत तरंगों में बदलकर मस्तिष्क के ऑक्सिपिटल लोब में भेजता है, जहां हम रंग, गहराई, गति और चेहरों की पहचान कर पाते हैं।',
    howItWorksHinglish: 'प्रकाश कॉर्निया से होकर पुतली (Pupil) से आंख में प्रवेश करता है। क्रिस्टलीय लेंस प्रकाश को रेटिना के केंद्र (Fovea Centralis) पर फोकस करता है। रेटिना में रॉड्स रात के अंधेरे में और कोन्स दिन के रंगों को पकड़ते हैं। ऑप्टिक तंत्रिका (Optic Nerve - Cranial Nerve II) यह सिग्नल मस्तिष्क तक ले जाती है।',
    introductionHindi: 'नेत्र एक जटिल द्वि-उत्तल प्रकाशिक अंग है जो प्रकाश किरणों को रेटिना पर अभिसरित कर प्रकाश-रासायनिक आवेगों में परिवर्तित करता है।',
    introductionEn: 'The human eyeball functions as an adaptable photoreceptor camera focusing optical wavefronts via cornea and crystalline lens onto the neurosensory retina.',
    howItWorksHindi: 'कॉर्निया और लेंस द्वारा अपवर्तित प्रकाश रेटिना के फोविया सेंट्रेलिस पर तीक्ष्ण छवि बनाता है, जिसे ऑप्टिक नर्व विजुअल कॉर्टेक्स में संप्रेषित करती है।',
    howItWorksEn: 'Photons isomerize 11-cis-retinal in rhodopsin, triggering a transducin-mediated cGMP cascade that hyperpolarizes photoreceptors and propagates signals down the optic nerve.',
    commonDiseases: CLINICAL_DISEASES.filter(d => d.id === 'cataract' || d.id === 'glaucoma'),
    parts: [
      {
        id: 'eyeball-organ',
        name: 'Eyeball (Bulbus Oculi)',
        hindiName: 'मानव नेत्र गोलक (आंख / रेटिना व कॉर्निया)',
        latinName: 'Bulbus oculi',
        pronunciation: 'EYE-ball',
        system: 'sensory',
        elements: ['FJ1282'],
        rootWordEtymology: "ग्रीक 'Ophthalmos' और लैटिन 'Oculus' (आंख)। ऑप्थैल्मोलॉजी (नेत्र विज्ञान), ओकुलिस्ट, इंट्रोकुलर प्रेशर।",
        memoryTrickHindi: "ट्रिक: \"LR6 SO4 All the rest 3\" — Lateral Rectus को 6th Cranial nerve (Abducens), Superior Oblique को 4th nerve (Trochlear), और बाकी सभी मांसपेशियों को 3rd nerve (Oculomotor) चलाती है।",
        locationHinglish: 'खोपड़ी के फेशियल कंकाल के ऑर्बिटल कैविटी (अक्षि गुहा) में सुरक्षित रूप से स्थित लगभग 24 मिमी व्यास का गोलक।',
        functionHinglish: 'विजुअल इनपुट: 100 लाख से अधिक रंगों को विभेदित करना और त्रि-आयामी (3D Stereoscopic) दृष्टि प्रदान करना।',
        funFactHinglish: 'आपकी आंख की मांसपेशियां शरीर की सबसे सक्रिय मांसपेशियां हैं — वे दिन में 1,00,000 से अधिक बार सूक्ष्म हलचलें (Saccades) करती हैं!',
        clinicalNoteHinglish: 'आंख के अंदर का दबाव (IOP - Intraocular Pressure) 21 mmHg से अधिक होने पर ग्लूकोमा (काला मोतिया) हो सकता है जिससे स्थायी अंधापन आ सकता है।',
        highYieldMnemonic: 'LR6(SO4)3: आंख की 6 एक्स्ट्राओकुलर पेशियों का नर्व सप्लाई फॉर्मूला',
        examPearls: [
          'फोविया सेंट्रेलिस (Fovea Centralis): रेटिना का वह बिंदु जहां केवल Cones होते हैं और दृष्टि की तीक्ष्णता (Visual Acuity) सर्वाधिक होती है।',
          'ब्लाइंड स्पॉट (Optic Disc): वह स्थान जहां से ऑप्टिक नर्व निकलती है; यहां कोई रॉड या कोन नहीं होता।'
        ],
        citations: [
          {
            book: "AK Khurana's Comprehensive Ophthalmology",
            citation: "Chapter 1: Anatomy and Development of the Eye, pp. 3–28",
            highYieldFact: "Cornea provides approximately +43 Diopters (nearly 70%) of the total +60 D refractive power of the human eye, largely at the air-tear film anterior interface."
          }
        ],
        relatedDiseases: ['Glaucoma', 'Cataract', 'Diabetic Retinopathy'],
      },
    ],
  },
];
/**
 * Gender-Specific Chapter Filter
 * Male: Chapters 1-6 (Universal), 7 (Male Reproductive), 8-11 (Universal)
 * Female: Chapters 1-6 (Universal), 7 (Female Reproductive), 8-11 (Universal)
 * Re-indexes chapter numbers cleanly 1..11
 */
export function getChaptersForGender(gender: 'male' | 'female'): BookChapter[] {
  const filtered = BOOK_CHAPTERS.filter(ch => {
    if (gender === 'male' && ch.id === 'chapter-female-reproductive') return false;
    if (gender === 'female' && ch.id === 'chapter-male-reproductive') return false;
    return true;
  });

  return filtered.map((ch, idx) => ({
    ...ch,
    chapterNumber: idx + 1,
    hindiTitle: ch.hindiTitle.replace(/अध्याय \d+:/, `अध्याय ${idx + 1}:`),
  }));
}
