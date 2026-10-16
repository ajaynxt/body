import type { ClinicalDisease } from '../types/atlas';

export const CLINICAL_DISEASES: ClinicalDisease[] = [
  // --- CARDIAC & ARTERIAL ---
  {
    id: 'coronary-artery-disease',
    name: 'Coronary Artery Disease & Heart Attack (Myocardial Infarction)',
    hindiName: 'हार्ट अटैक एवं कोरोनरी धमनी रोग (दिल का दौरा)',
    system: 'cardiac',
    affectedPartNames: ['Heart', 'Coronary Arteries', 'Left Ventricle', 'Right Ventricle'],
    overview: 'जब दिल की मांसपेशियों को खून पहुंचाने वाली कोरोनरी धमनियों में कोलेस्ट्रॉल या प्लॉक (plaque) जम जाता है, तो खून का बहाव रुक जाता है। ऑक्सीजन न मिलने से दिल की मांसपेशियां मरने लगती हैं, जिसे मायोकार्डियल इन्फार्क्शन या हार्ट अटैक कहते हैं।',
    symptoms: [
      'सीने में भारीपन, तेज दबाव, निचोड़ने जैसा दर्द या जलन (Angina)',
      'दर्द का बाएं कंधे, हाथ, गर्दन, जबड़े या पीठ तक फैलना',
      'बिना वजह ठंडा पसीना आना और सांस फूलना (Dyspnea)',
      'चक्कर आना, जी मिचलाना और अत्यधिक घबराहट महसूस होना',
    ],
    causes: [
      'हाई ब्लड प्रेशर (Hypertension) और बढ़ा हुआ LDL कोलेस्ट्रॉल',
      'धूम्रपान (Smoking) और तंबाकू का सेवन',
      'मधुमेह (Diabetes Mellitus) और अनियंत्रित मोटापा',
      'शारीरिक निष्क्रियता, प्रोसेस्ड जंक फूड और क्रॉनिक तनाव',
    ],
    prevention: [
      'कम तेल-चिकनाई और फाइबर युक्त संतुलित आहार (Mediterranean Diet) लें',
      'प्रतिदिन 30-45 मिनट तेज गति से टहलें या योग करें',
      'धूम्रपान और अल्कोहल से पूरी तरह दूरी बनाएं',
      'वर्ष में एक बार लिपिड प्रोफाइल और टीएमटी (TMT) जांच करवाएं',
    ],
    treatment: {
      medical: [
        'एंटीप्लेटलेट दवाएं (Dispirin/Aspirin 300mg + Clopidogrel 300mg)',
        'कोलेस्ट्रॉल कम करने हेतु हाई-डोज स्टैटिन्स (Atorvastatin 40/80mg)',
        'दिल का कार्यभार घटाने के लिए बीटा-ब्लॉकर्स (Metoprolol Succinate)',
        'कोरोनरी एंजियोप्लास्टी (PTCA with Drug-Eluting Stent) या CABG बाईपास सर्जरी'
      ],
      homeCare: [
        'ओमेगा-3 फैटी एसिड और अलसी के बीज, अखरोट, लहसुन का सेवन',
        'तनाव दूर करने हेतु अनुलोम-विलोम व शवासन प्राणायाम',
        'भोजन में नमक 3-4 ग्राम प्रतिदिन तक सीमित रखना',
        'वजन को 18.5 - 24.9 BMI के बीच नियंत्रित रखना'
      ],
      emergencyCare: 'सीने में दर्द उठते ही मरीज को शांत बैठाएं, तुरंत Dispirin 300mg पानी में घोलकर पिलाएं या Sorbitrate 5mg जीभ के नीचे रखें, और 108/एम्बुलेंस द्वारा नजदीकी कैथ-लैब युक्त अस्पताल पहुंचें।',
      diagnosticTests: ['12-Lead ECG', 'High-Sensitivity Troponin-I/T', '2D Echocardiography', 'Coronary Angiography']
    },
    severity: 'critical',
  },
  {
    id: 'hypertension',
    name: 'Hypertension (High Blood Pressure)',
    hindiName: 'उच्च रक्तचाप (हाई ब्लड प्रेशर / हाइपरटेंशन)',
    system: 'arterial',
    affectedPartNames: ['Aorta', 'Carotid Artery', 'Arteries', 'Heart'],
    overview: 'रक्त वाहिकाओं की दीवारों पर खून का दबाव सामान्य सीमा (120/80 mmHg) से लगातार अधिक रहना। इसे "साइलेंट किलर" कहा जाता है क्योंकि यह बिना किसी पूर्व चेतावनी के दिल, दिमाग और किडनी को क्षतिग्रस्त कर सकता है।',
    symptoms: [
      'सिर के पिछले हिस्से में सुबह भारीपन या तेज सिरदर्द',
      'आंखों के आगे धुंधलापन या जल्दी थकान महसूस होना',
      'सीने में धड़कन तेज होना या फड़फड़ाहट (Palpitations)',
      'गंभीर मामलों में अचानक नाक से खून बहना (Epistaxis)',
    ],
    causes: [
      'अत्यधिक नमक (Sodium Chloride) का सेवन और कम पोटैशियम',
      'धमनियों का सख्त होना (Arteriosclerosis)',
      'गुर्दे की बीमारी या रीनल आर्टरी स्टेनोसिस',
      'नींद की कमी (Sleep Apnea) और अत्यधिक मानसिक तनाव',
    ],
    prevention: [
      'भोजन में नमक की मात्रा प्रतिदिन 1 छोटी चम्मच से कम रखें (DASH Diet)',
      'पोटैशियम युक्त ताजे फल (केला, संतरा, नारियल पानी) का नियमित सेवन करें',
      'नियमित रूप से डिजिटल मॉनिटर द्वारा बीपी रिकॉर्ड रखें',
    ],
    treatment: {
      medical: [
        'Angiotensin Receptor Blockers - ARB (Telmisartan 40mg / Losartan)',
        'Calcium Channel Blockers - CCB (Amlodipine 5mg)',
        'ACE Inhibitors (Ramipril / Enalapril)',
        'Thiazide Diuretics (Chlorthalidone 12.5mg)'
      ],
      homeCare: [
        'सेंधा नमक या लो-सोडियम सॉल्ट का सीमित उपयोग',
        'अर्जुन की छाल का काढ़ा और खाली पेट लहसुन की कली का सेवन',
        'रोजाना 45 मिनट ब्रिस्क वॉक और 8 घंटे की गहरी शांत नींद',
        'शराब और कैफीनयुक्त एनर्जी ड्रिंक्स से परहेज'
      ],
      emergencyCare: 'यदि बीपी 180/120 mmHg से अधिक हो और सांस फूले या सीने में दर्द हो (Hypertensive Crisis), तो तुरंत इमरजेंसी रूम जाएं।',
      diagnosticTests: ['24-Hour Ambulatory BP Monitoring', 'Serum Creatinine & Electrolytes', 'Lipid Profile', 'Urine Albumin']
    },
    severity: 'chronic',
  },

  // --- RESPIRATORY ---
  {
    id: 'asthma',
    name: 'Bronchial Asthma',
    hindiName: 'दमा (ब्रोंकियल अस्थमा)',
    system: 'respiratory',
    affectedPartNames: ['Lungs', 'Bronchi', 'Trachea'],
    overview: 'फेफड़ों की श्वसन नलिकाओं (Bronchial tubes) में क्रॉनिक सूजन और संकुचन। धूल, पराग या ठंडी हवा के संपर्क में आने पर नलियां सिकुड़ जाती हैं और गाढ़ा बलगम बनता है, जिससे सांस अंदर-बाहर करना कठिन हो जाता है।',
    symptoms: [
      'सांस छोड़ते समय सीटी जैसी तीखी आवाज (Wheezing)',
      'रात को या भोर में तेज सूखी या बलगम वाली खांसी का दौरा',
      'सीने में भारी जकड़न और दम घुटने जैसा अहसास',
      'दौरे के समय सांस लेने के लिए आगे की ओर झुककर बैठना',
    ],
    causes: [
      'धूल-मिट्टी के कण (Dust mites), परागकण (Pollen) और पालतू जानवरों के रोएं',
      'धुआं, वायु प्रदूषण और मौसम का अचानक ठंडा होना',
      'एलर्जी की पारिवारिक हिस्ट्री (Atopic tendency)',
    ],
    prevention: [
      'प्रदूषण व धूल भरे क्षेत्रों में N95 मास्क का अनिवार्य उपयोग करें',
      'घर में सीलन और कालीन से बचें; बिस्तर की चादरें गर्म पानी से धोएं',
      'ठंडी चीजें, आइसक्रीम और बासी भोजन से परहेज करें',
    ],
    treatment: {
      medical: [
        'रिलीवर इनहेलर: Salbutamol / Levosalbutamol Inhaler (तुरंत सांस खोलने हेतु)',
        'कंट्रोलर इनहेलर: Inhaled Corticosteroid + LABA (Budesonide + Formoterol)',
        'एंटी-ल्यूकोट्रिएन गोलियां (Montelukast 10mg + Levocetirizine)',
        'नेबुलाइजर थेरेपी गंभीर दौरे के समय'
      ],
      homeCare: [
        'अजवायन व यूकेलिप्टस तेल की भाप (Steam Inhalation) दिन में दो बार',
        'अदरक, तुलसी और शहद की गुनगुनी चाय का सेवन',
        'प्राणायाम: अनुलोम-विलोम व भस्त्रिका (हल्की गति से)',
        'पीक फ्लो मीटर (Peak Flow Meter) से रोजाना फेफड़ों की क्षमता नापें'
      ],
      emergencyCare: 'यदि इनहेलर के 4-6 पफ लेने के बाद भी सांस न आए या होंठ नीले पड़ने लगें, तो तुरंत ऑक्सीजन सपोर्ट हेतु अस्पताल जाएं।',
      diagnosticTests: ['Spirometry with Bronchodilator Reversibility', 'Chest X-Ray PA View', 'Absolute Eosinophil Count (AEC)', 'Total Serum IgE']
    },
    severity: 'moderate',
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia (Lung Infection)',
    hindiName: 'निमोनिया (फेफड़ों का गंभीर संक्रमण)',
    system: 'respiratory',
    affectedPartNames: ['Lungs', 'Bronchi'],
    overview: 'फेफड़ों की छोटी वायु थैलियों (Alveoli) में बैक्टीरिया, वायरस या फंगस का गंभीर संक्रमण, जिससे थैलियों में मवाद और कफ भर जाता है। इससे शरीर में ऑक्सीजन का स्तर तेजी से गिरने लगता है।',
    symptoms: [
      'कंपकंपी के साथ तेज बुखार (102°F - 104°F) और पसीना',
      'पीले, हरे या जंग जैसे रंग का गाढ़ा बलगम आना',
      'खांसने या गहरी सांस लेने पर सीने में कांटे चुभने जैसा दर्द (Pleuritic Pain)',
      'ऑक्सीजन स्तर (SpO2) का 94% से नीचे गिरना और तेज सांस चलना',
    ],
    causes: [
      'बैक्टीरिया: Streptococcus pneumoniae, Haemophilus influenzae',
      'वायरस: इन्फ्लूएंजा, कोविड-19, रेस्पिरेटरी सिंसिटियल वायरस (RSV)',
      'कमजोर रोग प्रतिरोधक क्षमता (बुजुर्ग, बच्चे, डायबिटिक मरीज)',
    ],
    prevention: [
      'न्यूमोकोकल (PCV13 / PPSV23) और वार्षिक इन्फ्लूएंजा का टीका लगवाएं',
      'भीड़भाड़ में मास्क लगाएं और साबुन से हाथ धोएं',
      'धूम्रपान से बचें ताकि फेफड़ों के सीलिया सुरक्षित रहें',
    ],
    treatment: {
      medical: [
        'एंटीबायोटिक्स: Amoxicillin-Clavulanate, Azithromycin या Ceftriaxone IV',
        'एंटीपायरेटिक (Paracetamol 650mg) बुखार और बदन दर्द के लिए',
        'कफ एक्सपैक्टोरेंट और ब्रोंकोडायलेटर',
        'कम SpO2 होने पर अस्पताल में ऑक्सीजन थेरेपी'
      ],
      homeCare: [
        'प्रचुर मात्रा में गुनगुना पानी, सूप और नारियल पानी पिएं',
        'सलाइन नेजल ड्रॉप्स और स्टीम इनहेलेशन',
        'पर्याप्त पूर्ण बेड रेस्ट और पौष्टिक सुपाच्य प्रोटीन युक्त आहार',
        'पल्स ऑक्सीमीटर से हर 4 घंटे पर ऑक्सीजन स्तर की निगरानी'
      ],
      emergencyCare: 'SpO2 90% से कम होने, भ्रम/बेहोशी या सांस लेने में पसली चलने पर तुरंत इमरजेंसी वार्ड में भर्ती हों।',
      diagnosticTests: ['Chest X-Ray / High-Resolution CT Thorax', 'Sputum Gram Stain & Culture', 'Complete Blood Count (High TLC/Neutrophils)', 'Blood CRP & Procalcitonin']
    },
    severity: 'critical',
  },

  // --- NERVOUS & BRAIN ---
  {
    id: 'stroke',
    name: 'Stroke / Cerebrovascular Accident (CVA)',
    hindiName: 'लकवा / ब्रेन स्ट्रोक (मस्तिष्क आघात)',
    system: 'nervous',
    affectedPartNames: ['Brain', 'Cerebrum', 'Carotid Artery'],
    overview: 'मस्तिष्क की किसी रक्त धमनी में रुकावट (Ischemic Stroke) या धमनी के फटने (Hemorrhagic Stroke) के कारण मस्तिष्क के ऊतकों को खून व ऑक्सीजन मिलना बंद हो जाता है। मस्तिष्क कोशिकाएं मिनटों में नष्ट होने लगती हैं।',
    symptoms: [
      'F (Face): चेहरे का एक तरफ ढलक जाना या होंठ टेढ़े होना',
      'A (Arms): एक हाथ या पैर में अचानक सुन्नपन, कमजोरी या उठ न पाना',
      'S (Speech): बोलने में लड़खड़ाहट, आवाज न निकलना या बात न समझ पाना',
      'T (Time): समय सबसे कीमती है — यह मेडिकल इमरजेंसी है',
      'अचानक सिर में भयंकर तीव्र दर्द और संतुलन खो जाना',
    ],
    causes: [
      'अनियंत्रित उच्च रक्तचाप (Hypertension)',
      'कैरोटिड धमनी में एथेरोस्क्लेरोसिस या हार्ट से निकला ब्लड क्लॉट (Embolism)',
      'डायबिटीज, हाई कोलेस्ट्रॉल और एट्रियल फिब्रिलेशन (Atrial Fibrillation)',
    ],
    prevention: [
      'रक्तचाप (BP) को 130/80 के भीतर सख्ती से नियंत्रित रखें',
      'दिल की धड़कन की अनियमितता की नियमित ECG जांच करवाएं',
      'धूम्रपान और शराब से पूरी तरह दूर रहें',
    ],
    treatment: {
      medical: [
        'गोल्डन ऑवर (4.5 घंटे के भीतर): IV Thrombolysis (r-tPA / Tenecteplase क्लॉट घोलने हेतु)',
        'मैकेनिकल थ्रोम्बेक्टोमी (Endovascular Mechanical Thrombectomy - क्लॉट खींचना)',
        'एंटीप्लेटलेट्स व न्यूरोप्रोटेक्टिव दवाएं (Aspirin, Citicoline, Edaravone)',
        'हेमोरेजिक स्ट्रोक में बीपी नियंत्रित करना व सर्जिकल डीकंप्रेशन'
      ],
      homeCare: [
        'फिजियोथेरेपी (Physiotherapy) व ऑक्यूपेशनल थेरेपी रोजाना शुरू करना',
        'स्पीच थेरेपी (Speech Therapy) यदि बोलने में समस्या हो',
        'बेडसोर (Bedsores) से बचाने के लिए एयर-मैट्रेस और हर 2 घंटे में करवट बदलना',
        'संतुलित नरम सुपाच्य भोजन (Ryles Tube द्वारा यदि निगलने में असमर्थ हों)'
      ],
      emergencyCare: 'स्ट्रोक के लक्षण दिखते ही तुरंत मरीज को लिटाएं, पानी या दवा मुंह से बिल्कुल न दें, और बिना 1 मिनट गंवाए "Stroke-Ready Hospital" के इमरजेंसी रूम पहुंचे।',
      diagnosticTests: ['Non-Contrast CT Brain (NCCT)', 'MRI Brain with DWI / MRA', 'Carotid Doppler Ultrasound', 'ECG & Echocardiography']
    },
    severity: 'critical',
  },
  {
    id: 'alzheimers-disease',
    name: "Alzheimer's Disease & Dementia",
    hindiName: "अल्जाइमर रोग एवं मनोभ्रंश (भूलने की बीमारी)",
    system: 'nervous',
    affectedPartNames: ['Brain', 'Cerebrum', 'Cerebellum'],
    overview: 'मस्तिष्क का एक प्रोग्रेसिव न्यूरोडीजेनेरेटिव विकार, जिसमें मस्तिष्क में बीटा-एमाइलॉयड प्लेक और ताऊ न्यूरोफाइब्रिलरी टेंगल्स जमा हो जाते हैं। इससे याददाश्त, तर्क क्षमता और दैनिक क्रियाकलाप धीरे-धीरे नष्ट हो जाते हैं।',
    symptoms: [
      'हाल ही में हुई घटनाओं या बातचीत को भूलना और बार-बार एक ही सवाल पूछना',
      'परिचित रास्तों, तारीखों और समय को पहचानने में असमर्थता',
      'सही शब्द खोजने में कठिनाई और बातचीत की कड़ी खोना',
      'व्यवहार में बदलाव: चिड़चिड़ापन, शक करना और सामाजिक अलगाव',
    ],
    causes: [
      'मस्तिष्क में Beta-Amyloid प्लॉक और Tau प्रोटीन का संचय',
      'न्यूरोट्रांसमीटर एसिटिलकोलीन (Acetylcholine) की भारी कमी',
      'उम्र बढ़ना (65+ वर्ष) और आनुवंशिक कारक (APOE-e4 जीन)',
    ],
    prevention: [
      'मानसिक रूप से सक्रिय रहें: किताबें पढ़ें, पहेलियां सुलझाएं, नई भाषाएं सीखें',
      'नियमित कार्डियोवैस्कुलर व्यायाम करें जिससे मस्तिष्क में रक्त प्रवाह अच्छा रहे',
      'एंटीऑक्सीडेंट्स, बेरीज, हरी पत्तेदार सब्जियां और अखरोट का सेवन करें',
    ],
    treatment: {
      medical: [
        'Cholinesterase Inhibitors: Donepezil (5-10mg), Rivastigmine, Galantamine',
        'NMDA Receptor Antagonist: Memantine (10-20mg) गंभीर अवस्था में',
        'नींद और चिड़चिड़ेपन के लिए माइल्ड एंटीडिप्रेसेंट्स (SSRI)',
        'नवीनतम मोनोक्लोनल एंटीबॉडीज (Lecanemab / Donanemab)'
      ],
      homeCare: [
        'घर में सुरक्षित और शांत वातावरण: गिरने की संभावना वाली चीजें हटाएं',
        'दैनिक दिनचर्या (Daily Routine) को एक निश्चित समय सारणी पर रखें',
        'मरीज के नाम, पते और फोन नंबर का ब्रेसलेट पहनाएं',
        'धैर्यपूर्वक बात करें, बहस न करें और संगीत व पुरानी यादों से मन बहलाएं'
      ],
      emergencyCare: 'अचानक मरीज के घर से गायब होने, अत्यधिक आक्रामक होने या दवाई की ओवरडोज लेने पर तुरंत हेल्पलाइन और न्यूरोलॉजिस्ट से संपर्क करें।',
      diagnosticTests: ['Mini-Mental State Examination (MMSE / MoCA)', 'MRI Brain (Medial Temporal Lobe / Hippocampal Atrophy)', 'Amyloid PET Scan', 'CSF Biomarkers (Beta-amyloid & p-tau)']
    },
    severity: 'chronic',
  },

  // --- DIGESTIVE & HEPATIC ---
  {
    id: 'liver-cirrhosis',
    name: 'Liver Cirrhosis & Fatty Liver (NAFLD / NASH)',
    hindiName: 'लिवर सिरोसिस एवं फैटी लिवर (यकृत क्षय रोग)',
    system: 'digestive',
    affectedPartNames: ['Liver', 'Gallbladder', 'Stomach'],
    overview: 'लिवर में लंबे समय तक सूजन या चर्बी जमा होने से स्वस्थ लिवर कोशिकाओं का फाइब्रोटिक स्कार टिशू (Fibrotic scar tissue) में बदल जाना। इससे लिवर की खून फिल्टर करने, प्रोटीन बनाने और विषैले तत्व निकालने की क्षमता समाप्त हो जाती है।',
    symptoms: [
      'त्वचा और आंखों का पीला पड़ना (Jaundice / पीलिया)',
      'पेट में पानी भरना और फूल जाना (Ascites)',
      'पैरों और टखनों में सूजन (Edema)',
      'हथेलियों का लाल होना (Palmar Erythema) और त्वचा पर लाल मकड़ी जैसे निशान (Spider Angioma)',
      'उल्टी में खून आना (Esophageal Varices bleeding)',
    ],
    causes: [
      'नॉन-अल्कोहलिक फैटी लिवर डिजीज (NAFLD / NASH) - मोटापा व डायबिटीज से',
      'अत्यधिक शराब का सेवन (Alcoholic Liver Disease)',
      'क्रॉनिक हेपेटाइटिस B या C वायरस का संक्रमण',
    ],
    prevention: [
      'शराब का संपूर्ण त्याग करें',
      'वजन कम करें, रिफाइंड चीनी और ट्रांस फैट वाले भोजन से पूरी तरह बचें',
      'हेपेटाइटिस B का टीका लगवाएं',
    ],
    treatment: {
      medical: [
        'एंटीवायरल दवाएं (Tenofovir हेपेटाइटिस B के लिए, Sofosbuvir हेपेटाइटिस C के लिए)',
        'पेट में पानी कम करने हेतु मूत्रवर्धक (Spironolactone + Furosemide)',
        'अमोनिया स्तर घटाने हेतु Lactulose सिरप और Rifaximin टैबलेट',
        'एडवांस्ड स्टेज में एकमात्र स्थायी उपचार: लिवर ट्रांसप्लांट (Liver Transplantation)'
      ],
      homeCare: [
        'कम नमक वाला आहार (प्रतिदिन 2 ग्राम से कम) ताकि पेट में पानी न भरे',
        'उच्च गुणवत्ता वाला प्रोटीन (दालें, पनीर, सोया, अंडा) उचित मात्रा में',
        'बिना डॉक्टर की सलाह के पैरासिटामोल या दर्द निवारक दवाएं न लें',
        'पर्याप्त ताजे मौसमी फल और पपीते का सेवन'
      ],
      emergencyCare: 'उल्टी में खून आने, काले रंग का मल (Melena) आने या अत्यधिक सुस्ती/बेहोशी (Hepatic Encephalopathy) पर तुरंत ICU में भर्ती हों।',
      diagnosticTests: ['Liver Function Test (LFT: Bilirubin, SGOT, SGPT, Albumin)', 'Liver FibroScan (Elastography)', 'Ultrasound Abdomen with Portal Vein Doppler', 'Upper GI Endoscopy (for Varices)']
    },
    severity: 'critical',
  },
  {
    id: 'gastritis-peptic-ulcer',
    name: 'Peptic Ulcer Disease & Gastritis',
    hindiName: 'पेट का अल्सर एवं गैस्ट्राइटिस (आमाशय का छाला)',
    system: 'digestive',
    affectedPartNames: ['Stomach', 'Duodenum', 'Esophagus'],
    overview: 'आमाशय (Stomach) या छोटी आंत के शुरुआती हिस्से (Duodenum) की अंदरूनी सुरक्षात्मक म्यूकोसा परत में अम्ल (Hydrochloric Acid) के कारण गहरा छाला या घाव बन जाना।',
    symptoms: [
      'पेट के ऊपरी हिस्से में तेज जलन, मरोड़ या चुभने वाला दर्द',
      'खाली पेट दर्द बढ़ना या खाना खाने के बाद दर्द में आराम/बढ़ोतरी',
      'खट्टी डकारें, सीने में जलन (Heartburn) और पेट फूला हुआ लगना',
      'जी मिचलाना, उल्टी आना और भूख में कमी',
    ],
    causes: [
      'हेलिकोबैक्टर पाइलोरी (Helicobacter pylori) बैक्टीरिया का संक्रमण',
      'लंबे समय तक दर्द निवारक दवाओं (NSAIDs: Ibuprofen, Diclofenac, Aspirin) का सेवन',
      'अत्यधिक मिर्च-मसालेदार भोजन, खाली पेट चाय-कॉफी और स्मोकिंग',
    ],
    prevention: [
      'खाली पेट लंबे समय तक न रहें; समय पर संतुलित भोजन करें',
      'बिना डॉक्टर की सलाह के पेनकिलर गोलियों का सेवन न करें',
      'तनाव मुक्त रहें और धूम्रपान व शराब का त्याग करें',
    ],
    treatment: {
      medical: [
        'H. Pylori इरेडिकेशन किट: PPI + Clarithromycin + Amoxicillin (14 दिन)',
        'प्रोटॉन पंप इनहिबिटर्स: Pantoprazole 40mg / Rabeprazole खाली पेट',
        'म्यूकोसल प्रोटेक्टेंट सिरप: Sucralfate Suspension खाने से पहले',
        'H2 Receptor Blockers: Famotidine 40mg'
      ],
      homeCare: [
        'ठंडा दूध, नारियल पानी और एलोवेरा जूस पेट की जलन शांत करने हेतु',
        'केला, दलिया, साबूदाना और उबली हुई सुपाच्य सब्जियां खाएं',
        'रात को सोने से 2-3 घंटे पहले भोजन कर लें',
        'अत्यधिक गर्म या अत्यधिक खट्टे पदार्थों से परहेज करें'
      ],
      emergencyCare: 'उल्टी में कॉफी-ग्राउंड जैसा खून आने, काला मल होने या पेट में अचानक असहनीय तीखा दर्द (Perforation) होने पर तुरंत सर्जिकल इमरजेंसी जाएं।',
      diagnosticTests: ['Upper Gastrointestinal Endoscopy (UGIE)', 'H. Pylori Stool Antigen Test / Urea Breath Test', 'Complete Hemogram (Hb for Anemia)']
    },
    severity: 'moderate',
  },

  // --- SKELETAL & MUSCULOSKELETAL ---
  {
    id: 'osteoporosis',
    name: 'Osteoporosis (Bone Density Loss)',
    hindiName: 'ऑस्टियोपोरोसिस (हड्डियों की कमजोरी व भुरभुरापन)',
    system: 'skeletal',
    affectedPartNames: ['Femur', 'Spine', 'Pelvis', 'Radius'],
    overview: 'हड्डियों के खनिज घनत्व (Bone Mineral Density) में गंभीर कमी आना, जिससे हड्डियां अंदर से खोखली और इतनी कमजोर हो जाती हैं कि हल्के से झटके या छींकने पर भी फ्रैक्चर हो सकती हैं।',
    symptoms: [
      'शुरुआत में कोई लक्षण नहीं ("साइलेंट डिजीज")',
      'हल्की सी चोट या फिसलने पर कूल्हे (Hip), कलाई या रीढ़ की हड्डी का फ्रैक्चर',
      'कमर और पीठ में लगातार हल्का या तेज दर्द',
      'उम्र के साथ लंबाई का धीरे-धीरे कम होना और आगे की ओर झुक जाना (Kyphosis)',
    ],
    causes: [
      'मेनोपॉज के बाद एस्ट्रोजन हार्मोन की कमी (Postmenopausal Osteoporosis)',
      'कैल्शियम और विटामिन D3 की लंबे समय से कमी',
      'शारीरिक व्यायाम न करना और गतिहीन जीवनशैली',
      'लंबे समय तक स्टेरॉयड दवाओं का सेवन',
    ],
    prevention: [
      'कैल्शियम युक्त आहार (दूध, दही, पनीर, तिल, रागी, हरी पत्तेदार सब्जियां) लें',
      'प्रतिदिन सुबह 15-20 मिनट गुनगुनी धूप में बैठें (विटामिन डी निर्माण हेतु)',
      'हड्डियों को मजबूत करने के लिए वेट-बेयरिंग एक्सरसाइज (पैदल चलना, सीढ़ियां चढ़ना) करें',
    ],
    treatment: {
      medical: [
        'Bisphosphonates: Alendronate 70mg साप्ताहिक या Zoledronic Acid IV वार्षिक',
        'Calcium Carbonate (1000-1200mg) + Vitamin D3 (60,000 IU साप्ताहिक)',
        'Anabolic Bone-Building Agent: Teriparatide (PTH Analog Subcutaneous)',
        'RANKL Inhibitor: Denosumab 60mg हर 6 महीने में'
      ],
      homeCare: [
        'घर में फिसलने से बचाव: बाथरूम में एंटी-स्किड मैट और ग्रैब बार लगवाएं',
        'तिल के बीज, मखाने और रागी की रोटी का नियमित सेवन',
        'धूम्रपान और अधिक चाय-कॉफी से बचें क्योंकि ये कैल्शियम अवशोषण रोकते हैं',
        'संतुलन सुधारने हेतु ताई-ची या हल्का योगाभ्यास'
      ],
      emergencyCare: 'गिरने के बाद कूल्हे या पैर में असहनीय दर्द और चलने में असमर्थता होने पर तुरंत ऑर्थोपेडिक सर्जन से संपर्क करें।',
      diagnosticTests: ['DEXA Scan (Dual-Energy X-Ray Absorptiometry - T-Score < -2.5)', 'Serum 25-Hydroxy Vitamin D', 'Serum Calcium & Phosphorus', 'Serum Alkaline Phosphatase']
    },
    severity: 'chronic',
  },
  {
    id: 'osteoarthritis',
    name: 'Osteoarthritis (Degenerative Joint Disease)',
    hindiName: 'गठिया / ऑस्टियोआर्थराइटिस (जोड़ों का घिसाव)',
    system: 'skeletal',
    affectedPartNames: ['Knee Joint', 'Hip Joint', 'Spine', 'Femur'],
    overview: 'जोड़ों के बीच स्थित सुरक्षात्मक कार्टिलेज (Cartilage) का धीरे-धीरे घिस जाना। कार्टिलेज घिसने से हड्डियां आपस में रगड़ खाने लगती हैं, जिससे जोड़ों में दर्द, सूजन और अकड़न आ जाती है।',
    symptoms: [
      'घुटनों या जोड़ों में चलने, सीढ़ी चढ़ने या उठने-बैठने पर तेज दर्द',
      'सुबह उठने पर जोड़ों में 15-30 मिनट की अकड़न (Stiffness)',
      'जोड़ हिलाने पर चटकने या पिसने जैसी आवाज आना (Crepitus)',
      'जोड़ों का आकार टेढ़ा होना और सूजन आना',
    ],
    causes: [
      'बढ़ती उम्र और जोड़ों का स्वाभाविक घिसाव',
      'अत्यधिक वजन और मोटापा (घुटनों पर 4 गुना अतिरिक्त दबाव)',
      'पुरानी जोड़ों की चोट या खेलकूद में लगी चोट',
    ],
    prevention: [
      'वजन को आदर्श सीमा में रखें (5 किलो वजन घटने से घुटनों का 20 किलो लोड घटता है)',
      'जमीन पर पालथी मारकर बैठने या उकड़ू बैठने से बचें',
      'कम प्रभाव वाले व्यायाम (तैराकी, साइकिल चलाना) करें',
    ],
    treatment: {
      medical: [
        'दर्द निवारक: Paracetamol 1g या Topical NSAID जेल (Diclofenac)',
        'सूजन घटाने हेतु अल्पकालिक Cox-2 Inhibitors (Etoricoxib 60/90mg)',
        'इंट्रा-आर्टिकुलर इंजेक्शन: Hyaluronic Acid (Viscosupplementation) या PRP थेरेपी',
        'अंतिम स्टेज में पूर्ण राहत: टोटल नी रिप्लेसमेंट (Total Knee Replacement - TKR)'
      ],
      homeCare: [
        'क्वाड्रिसेप्स मजबूती के व्यायाम (Isometric Knee Exercises) दिन में 3 बार',
        'जोड़ों पर गर्म पानी की सिकाई और सरसों के तेल में लहसुन-मेथी पकाकर मालिश',
        'नी-कैप (Knee Cap) या वॉकिंग स्टिक का सहारा लेना',
        'हल्दी वाला दूध और अखरोट का सेवन'
      ],
      emergencyCare: 'जोड़ में अचानक अत्यधिक तेज सूजन, लालिमा और बुखार आने पर (Septic Arthritis का खतरा) तुरंत अस्पताल जाएं।',
      diagnosticTests: ['Weight-Bearing X-Ray Knee AP & Lateral Views', 'Joint Fluid Analysis (Arthrocentesis)', 'Serum Uric Acid (to rule out Gout)', 'Rheumatoid Factor (to rule out RA)']
    },
    severity: 'chronic',
  },
  {
    id: 'muscle-pain-myalgia',
    name: 'Muscle Pain, Strain & Cramps (Myalgia & Muscle Spasm)',
    hindiName: 'मांसपेशियों का दर्द, खिंचाव एवं ऐंठन (मायल्जिया व मसल क्रैम्प्स)',
    system: 'muscular',
    affectedPartNames: ['Biceps', 'Deltoid', 'Trapezius', 'Hamstrings', 'Quadriceps', 'Muscles'],
    overview: 'अत्यधिक शारीरिक मेहनत, गलत पोस्चर, डिहाइड्रेशन या मांसपेशियों के तंतुओं में खिंचाव के कारण लैक्टिक एसिड का जमाव व दर्द। हल्का दर्द घरेलू उपायों और R.I.C.E प्रोटोकॉल से ठीक हो जाता है। यदि दर्द बहुत तेज हो, 3-5 दिन से ज्यादा रहे या सूजन/कमजोरी हो, तो तुरंत डॉक्टर को दिखाना अनिवार्य है।',
    symptoms: [
      'मांसपेशियों में लगातार भारी दर्द, चुभन, खिंचाव या अचानक तेज ऐंठन (Cramps)',
      'अंग को हिलाने या दबाने पर असहनीय दर्द (Local Tenderness)',
      'मांसपेशियों में कड़ापन (Stiffness) और गांठ जैसी जकड़न (Trigger Points)',
      'हाथ-पैर उठाने या चलने-फिरने में अत्यधिक कमजोरी व थकावट',
    ],
    causes: [
      'जिम या खेलकूद में वार्म-अप के बिना भारी वजन उठाना (Overexertion / Muscle Fiber Tear)',
      'पानी और इलेक्ट्रोलाइट्स (मैग्नीशियम, पोटैशियम, सोडियम) की भारी कमी (Dehydration)',
      'लगातार गलत पोस्चर में बैठकर काम करना (कंधे व गर्दन का दर्द)',
      'विटामिन D और विटामिन B12 की क्रॉनिक कमी',
      'वायरल बुखार (डेंगू, चिकनगुनिया, फ्लू) या फाइब्रोमायल्जिया',
    ],
    prevention: [
      'कसरत से पहले 10 मिनट वार्म-अप और अंत में कूल-डाउन स्ट्रेचिंग अनिवार्य करें',
      'प्रतिदिन 3 से 3.5 लीटर पानी पिएं और ओआरएस/नारियल पानी लें',
      'विटामिन डी के लिए सुबह की गुनगुनी धूप लें और प्रोटीन युक्त संतुलित आहार खाएं',
      'कंप्यूटर पर काम करते समय हर 45 मिनट में ब्रेक लेकर गर्दन व पीठ की स्ट्रेचिंग करें',
    ],
    treatment: {
      medical: [
        'दर्द निवारक: Paracetamol 650mg या Ibuprofen 400mg (डॉक्टर की सलाह पर भोजन के बाद)',
        'मांसपेशी रिलैक्सेंट: Thiocolchicoside 4/8mg या Chlorzoxazone गोलियां',
        'टॉपिकल स्प्रे/जेल: Diclofenac + Menthol + Linseed Oil जेल दिन में 3-4 बार हल्के हाथ से लगाएं',
        'फिजियोथेरेपी: आईएफटी (IFT), अल्ट्रासाउंड थेरेपी, और सुधारात्मक स्ट्रेचिंग व्यायाम'
      ],
      homeCare: [
        'R.I.C.E प्रोटोकॉल: Rest (आराम दें), Ice (पहले 48 घंटे बर्फ की सिकाई 15 मिनट), Compression (हल्की गर्म पट्टी), Elevation (अंग ऊपर रखें)',
        '48 घंटे बाद: गुनगुने पानी में सेंधा नमक (Epsom Salt) डालकर सिकाई (मैग्नीशियम मांसपेशियों को आराम देता है)',
        'हल्दी वाला दूध (कर्क्यूमिन प्राकृतिक सूजनरोधी है) रात को पिएं',
        'केला, संतरा, नारियल पानी और भीगे हुए बादाम खाएं (पोटैशियम व मैग्नीशियम हेतु)'
      ],
      emergencyCare: '🚨 डॉक्टर को तुरंत कब दिखाएं (Red Flags): 1) यदि दर्द 3-5 दिन से ज्यादा बना रहे या लगातार बढ़ता जाए; 2) गंभीर सूजन, लाली या छूने पर अत्यधिक गर्मी महसूस हो; 3) पेशाब का रंग गहरा भूरा या चाय जैसा हो (Rhabdomyolysis - किडनी डैमेज का खतरा); 4) हाथ या पैर में सुन्नपन आ जाए या हिला न सकें; 5) सांस फूलने या सीने/कंधे में जकड़न के साथ दर्द हो (हार्ट अटैक का लक्षण हो सकता है)।',
      diagnosticTests: ['Serum Creatine Phosphokinase (CPK / CK-MM)', 'Serum Vitamin D3 & Vitamin B12', 'Serum Electrolytes (Sodium, Potassium, Calcium)', 'Musculoskeletal Ultrasound (MSK-USG) / MRI']
    },
    severity: 'mild',
  },

  // --- URINARY & EXCRETORY ---
  {
    id: 'kidney-stones',
    name: 'Kidney Stones (Nephrolithiasis / Renal Calculi)',
    hindiName: 'गुर्दे की पथरी (किडनी स्टोन / रीनल कैलकुलस)',
    system: 'urinary',
    affectedPartNames: ['Kidneys', 'Ureter', 'Bladder'],
    overview: 'पेशाब में कैल्शियम, ऑक्सालेट, यूरिक एसिड या फॉस्फेट जैसे खनिजों के सांद्रित होकर ठोस क्रिस्टल पत्थर बन जाना। जब पथरी मूत्रवाहिनी (Ureter) में फंस जाती है, तो भयानक दर्द होता है।',
    symptoms: [
      'पीठ के निचले हिस्से या पसली के नीचे अचानक उठने वाला असहनीय दर्द (Renal Colic)',
      'दर्द का पेट के निचले हिस्से और जांघ के अंदरूनी भाग (Groin) तक फैलना',
      'पेशाब में खून आना (Hematuria) - गुलाबी या लाल पेशाब',
      'पेशाब में तेज जलन, बार-बार पेशाब की इच्छा और उल्टी-जी मिचलाना',
    ],
    causes: [
      'कम पानी पीना और अत्यधिक डिहाइड्रेशन',
      'हाई ऑक्सालेट फूड (पालक, चॉकलेट, टमाटर, ड्राई फ्रूट्स) का अत्यधिक सेवन',
      'अत्यधिक नमक, रेड मीट और जानवरों का प्रोटीन खाना',
      'यूरिक एसिड का बढ़ा होना या हाइपरपैराथायरॉइडिज्म',
    ],
    prevention: [
      'प्रतिदिन 3 से 4 लीटर साफ पानी पिएं (पेशाब का रंग पानी जैसा पारदर्शी होना चाहिए)',
      'नींबू पानी पिएं (सिट्रेट पथरी बनने से रोकता है)',
      'नमक की मात्रा घटाएं और अत्यधिक ऑक्सालेट युक्त खाद्य पदार्थों को सीमित करें',
    ],
    treatment: {
      medical: [
        'दर्द निवारक: Drotaverine / Tramadol + Diclofenac इंजेक्शन',
        'Alpha-Blockers (Tamsulosin 0.4mg) यूरेटर को शिथिल कर पथरी निकालने हेतु',
        'Potassium Magnesium Citrate सिरप पेशाब का pH सामान्य करने के लिए',
        'सर्जिकल विधियां (>6-7mm पथरी हेतु): ESWL (शॉकवेव), URSL (लेजर) या PCNL'
      ],
      homeCare: [
        'खूब सारा गुनगुना पानी और नारियल पानी पिएं',
        'कुलथी की दाल का पानी और जौ का पानी पीना पथरी निकालने में सहायक है',
        'हल्की जंपिंग या सीढ़ियां चढ़ना जब Tamsulosin चल रही हो',
        'टमाटर के बीज, बैंगन और पालक का सेवन कम करें'
      ],
      emergencyCare: 'असहनीय दर्द, पेशाब का पूरी तरह बंद हो जाना या पथरी के साथ तेज कंपकंपी वाला बुखार (Urosepsis) होने पर तुरंत इमरजेंसी में पहुंचे।',
      diagnosticTests: ['Non-Contrast CT KUB (Gold Standard)', 'Ultrasound KUB (Kidney, Ureter, Bladder)', 'Urine Routine & Microscopic Examination', 'Serum Creatinine & Uric Acid']
    },
    severity: 'moderate',
  },
  {
    id: 'chronic-kidney-disease',
    name: 'Chronic Kidney Disease (CKD)',
    hindiName: 'क्रॉनिक किडनी रोग (गुर्दे की कार्यक्षमता में गिरावट)',
    system: 'urinary',
    affectedPartNames: ['Kidneys', 'Renal Cortex', 'Glomerulus'],
    overview: 'महीनों या वर्षों की अवधि में गुर्दों की रक्त छानने की क्षमता का धीरे-धीरे और स्थायी रूप से कम हो जाना। इससे शरीर में यूरिया, क्रिएटिनिन और हानिकारक विषैले पदार्थ जमा होने लगते हैं।',
    symptoms: [
      'चेहरे और आंखों के नीचे सुबह सूजन (Puffy Eyes) और पैरों में सूजन',
      'पेशाब में झाग आना (Proteinuria / Albuminuria)',
      'भूख में भारी कमी, मुंह का स्वाद कड़वा होना और हर समय उल्टी जैसी लगना',
      'अत्यधिक कमजोरी, त्वचा में तेज खुजली और खून की भारी कमी (Anemia)',
    ],
    causes: [
      'अनियंत्रित लंबे समय का मधुमेह (Diabetic Nephropathy)',
      'अनियंत्रित उच्च रक्तचाप (Hypertensive Nephrosclerosis)',
      'ग्लोमेरुलोनेफ्राइटिस या पेनकिलर दवाओं का अत्यधिक दुरुपयोग',
    ],
    prevention: [
      'ब्लड शुगर (HbA1c < 7%) और ब्लड प्रेशर (130/80) को कड़ाई से नियंत्रित रखें',
      'बिना डॉक्टर की सलाह के कोई भी दर्द निवारक गोली (NSAID) न खाएं',
      'हर 6 महीने पर सीरम क्रिएटिनिन और यूरिन माइक्रोएल्ब्यूमिन जांच करवाएं',
    ],
    treatment: {
      medical: [
        'SGLT2 Inhibitors (Dapagliflozin 10mg) किडनी की सुरक्षा हेतु',
        'ARBs/ACE Inhibitors प्रोटीन रिसाव रोकने के लिए',
        'Erythropoietin (EPO) इंजेक्शन और IV Iron हीमोग्लोबिन बढ़ाने हेतु',
        'अंतिम स्टेज (Stage 5 CKD / ESRD): हेमोडायलिसिस (Hemodialysis) या किडनी ट्रांसप्लांट'
      ],
      homeCare: [
        'कम पोटैशियम, कम फॉस्फोरस और नियंत्रित प्रोटीन वाला विशेष डाइट चार्ट',
        'डॉक्टर द्वारा निर्धारित मात्रा में ही पानी और तरल पदार्थ पिएं (Fluid restriction)',
        'केला, संतरा, नारियल पानी और टमाटर से परहेज (पोटैशियम स्पाइक से बचने हेतु)',
        'सेंधा नमक भी डॉक्टर से पूछकर ही सीमित मात्रा में लें'
      ],
      emergencyCare: 'सांस फूलना, सीने में दर्द, पेशाब पूरी तरह बंद होना या पोटैशियम 6.5 से ऊपर जाने पर तुरंत इमरजेंसी डायलिसिस हेतु पहुंचे।',
      diagnosticTests: ['Serum Creatinine & Estimated GFR (eGFR)', 'Urine Albumin-to-Creatinine Ratio (UACR)', 'Ultrasound KUB (Kidney Size & Cortical Echogenicity)', 'Serum Electrolytes (K+, Na+, Ca++, PO4--)']
    },
    severity: 'critical',
  },

  // --- ENDOCRINE & METABOLIC ---
  {
    id: 'diabetes-mellitus',
    name: 'Type 2 Diabetes Mellitus',
    hindiName: 'टाइप 2 मधुमेह (शुगर की बीमारी / डायबिटीज)',
    system: 'digestive',
    affectedPartNames: ['Pancreas', 'Liver', 'Kidneys', 'Heart'],
    overview: 'अग्न्याशय (Pancreas) की बीटा कोशिकाओं द्वारा पर्याप्त इंसुलिन न बना पाना या शरीर की कोशिकाओं द्वारा इंसुलिन का सही उपयोग न कर पाना (Insulin Resistance)। इससे रक्त में ग्लूकोज का स्तर लगातार बढ़ा रहता है।',
    symptoms: [
      'बार-बार पेशाब लगना, विशेषकर रात में (Polyuria)',
      'बहुत अधिक प्यास लगना (Polydipsia) और बार-बार भूख लगना (Polyphagia)',
      'बिना किसी कारण के वजन का तेजी से घटना या अत्यधिक थकान',
      'चोट या घाव का बहुत देर से भरना और हाथ-पैरों में झनझनाहट/सुन्नपन',
    ],
    causes: [
      'मोटापा और पेट के आसपास अत्यधिक चर्बी (Visceral Adiposity)',
      'शारीरिक व्यायाम का अभाव और सुस्त जीवनशैली',
      'आनुवंशिक कारण (परिवार में माता-पिता को डायबिटीज होना)',
    ],
    prevention: [
      'रिफाइंड शुगर, मीठे पेय, मैदा और सफेद चावल का सेवन बहुत कम करें',
      'प्रतिदिन 45 मिनट का नियमित व्यायाम या योग करें',
      'वजन को नियंत्रित रखें और तनाव मुक्त जीवन जिएं',
    ],
    treatment: {
      medical: [
        'प्रथम पंक्ति दवा: Metformin 500/1000mg खाने के साथ',
        'DPP-4 Inhibitors (Sitagliptin / Teneligliptin)',
        'SGLT-2 Inhibitors (Empagliflozin / Dapagliflozin) हार्ट व किडनी सुरक्षा हेतु',
        'एडवांस्ड स्टेज में: सबक्यूटेनियस इंसुलिन इंजेक्शन (Basal-Bolus Insulin)'
      ],
      homeCare: [
        'मेथी दाना पानी, करेले का जूस और जामुन के बीज का पाउडर',
        'लो-ग्लाइसेमिक इंडेक्स फूड (चना, जौ, ओट्स, सलाद, स्प्राउट्स)',
        'नियमित ग्लूकोमीटर से खाली पेट (Fasting) और खाने के बाद (PP) शुगर की जांच',
        'पैरों की विशेष देखभाल (Diabetic Foot Care) - घाव से बचाव'
      ],
      emergencyCare: 'शुगर 70 mg/dL से नीचे जाने (Hypoglycemia: पसीना, कंपकंपी, बेहोशी) पर तुरंत 3-4 चम्मच चीनी, ग्लूकोज या मीठा जूस पिलाएं।',
      diagnosticTests: ['HbA1c (3 महीने का औसत - Target < 6.5% - 7%)', 'Fasting & Postprandial Blood Sugar', 'Lipid Profile & Serum Creatinine', 'Annual Diabetic Retinopathy Eye Exam']
    },
    severity: 'chronic',
  },
  {
    id: 'thyroid-disorders',
    name: 'Hypothyroidism & Hyperthyroidism',
    hindiName: 'थायराइड विकार (हाइपोथायरायडिज्म एवं हाइपरथायरायडिज्म)',
    system: 'digestive',
    affectedPartNames: ['Thyroid Gland', 'Pituitary Gland', 'Heart'],
    overview: 'गले में स्थित तितली के आकार की थायराइड ग्रंथि द्वारा थायरोक्सिन (T3/T4) हार्मोन का आवश्यकता से कम (Hypo) या अधिक (Hyper) बनना। यह पूरे शरीर के मेटाबॉलिज्म, ऊर्जा और वजन को नियंत्रित करती है।',
    symptoms: [
      'हाइपोथायराइड: वजन बढ़ना, अत्यधिक थकान, ठंड लगना, कब्ज, बाल झड़ना और चेहरे पर सूजन',
      'हाइपरथायराइड: तेजी से वजन घटना, दिल की धड़कन तेज होना (Palpitations), गर्मी न सह पाना, हाथ कांपना',
      'महिलाओं में मासिक धर्म की अनियमितता और मूड स्विंग्स',
      'गले में सूजन या गांठ दिखना (Goiter / घेंघा)',
    ],
    causes: [
      'हाशिमोटो थायराइडाइटिस (ऑटोइम्यून बीमारी - Hypothyroidism)',
      'ग्रेव्स डिजीज (Graves Disease - Hyperthyroidism)',
      'आयोडीन की कमी या अधिकता और हार्मोनल असंतुलन',
    ],
    prevention: [
      'आयोडीन युक्त शुद्ध नमक का संतुलित उपयोग करें',
      'अत्यधिक तनाव से बचें जो ऑटोइम्यून प्रक्रियाओं को ट्रिगर करता है',
      'कच्ची गोभी, पत्तागोभी और ब्रोकली का अत्यधिक सेवन न करें (Goitrogens)',
    ],
    treatment: {
      medical: [
        'हाइपोथायराइड हेतु: Levothyroxine (Eltroxin / Thyronorm 25-100 mcg) सुबह खाली पेट',
        'हाइपरथायराइड हेतु: Antithyroid Drugs (Carbimazole / Methimazole)',
        'धड़कन नियंत्रण हेतु: Propranolol (Beta-blocker)',
        'गंभीर मामलों में: रेडियोधर्मी आयोडीन थेरेपी (RAI) या थायराइडेक्टॉमी सर्जरी'
      ],
      homeCare: [
        'दवा सुबह उठते ही पानी के साथ लें और अगले 45 मिनट तक चाय, कॉफी या नाश्ता न करें',
        'धनिया के बीज का पानी पीना थायराइड फंक्शन में सहायक माना जाता है',
        'नारियल तेल, कद्दू के बीज और अखरोट (सेलेनियम युक्त) का सेवन',
        'तनाव प्रबंधन हेतु भ्रामरी और उज्जायी प्राणायाम'
      ],
      emergencyCare: 'हाइपोथायराइड कोमा या थायराइड स्टॉर्म (अत्यधिक बुखार, प्रलाप, बहुत तेज धड़कन) में तत्काल आईसीयू केयर आवश्यक है।',
      diagnosticTests: ['Thyroid Function Test (TSH, Free T3, Free T4)', 'Anti-TPO Antibodies (for Hashimoto)', 'Ultrasound Neck / Thyroid', 'Radioiodine Thyroid Uptake Scan']
    },
    severity: 'chronic',
  },

  // --- REPRODUCTIVE ---
  {
    id: 'pcos-pcod',
    name: 'Polycystic Ovary Syndrome (PCOS / PCOD)',
    hindiName: 'पीसीओएस / पीसीओडी (पॉलीसिस्टिक ओवरी सिंड्रोम)',
    system: 'female-reproductive',
    affectedPartNames: ['Ovaries', 'Uterus', 'Pituitary Gland'],
    overview: 'प्रजनन आयु की महिलाओं में होने वाला एक सामान्य हार्मोनल विकार, जिसमें अंडाशय में पुरुष हार्मोन (Androgens) का स्तर बढ़ जाता है और अंडाशय में छोटे-छोटे अपरिपक्व फॉलिकल्स (Cysts) बन जाते हैं, जिससे ओव्यूलेशन रुक जाता है।',
    symptoms: [
      'मासिक धर्म की भारी अनियमितता या कई महीनों तक पीरियड्स न आना',
      'चेहरे, ठोड़ी और शरीर पर अनचाहे घने बाल आना (Hirsutism)',
      'अत्यधिक जिद्दी मुहांसे (Acne) और सिर के बालों का पतला होकर झड़ना',
      'अचानक तेजी से वजन बढ़ना और वजन घटाने में भारी कठिनाई',
      'गर्भधारण में समस्या (Infertility)',
    ],
    causes: [
      'इंसुलिन रेजिस्टेंस (शरीर में इंसुलिन का उच्च स्तर)',
      'हार्मोनल असंतुलन (LH/FSH अनुपात बिगड़ना और हाई एण्ड्रोजन)',
      'क्रॉनिक लो-ग्रेड इन्फ्लेमेशन और तनावपूर्ण गतिहीन जीवनशैली',
    ],
    prevention: [
      'रिफाइंड कार्ब्स, शुगर और अल्ट्रा-प्रोसेस्ड पैकेज्ड फूड बंद करें',
      'प्रतिदिन 40-50 मिनट का स्ट्रेंथ ट्रेनिंग व कार्डियो वर्कआउट करें',
      'वजन में मात्र 5-10% की कमी से मासिक चक्र स्वतः नियमित हो सकता है',
    ],
    treatment: {
      medical: [
        'इंसुलिन संवेदनशीलता बढ़ाने हेतु: Metformin 500mg',
        'मासिक धर्म चक्र नियमित करने हेतु: Combined Oral Contraceptive Pills (COCPs)',
        'बाल झड़ने व मुहांसों हेतु: Anti-androgens (Spironolactone / Finasteride)',
        'गर्भधारण चाहने वाली महिलाओं हेतु: Ovulation Induction (Letrozole / Clomiphene)'
      ],
      homeCare: [
        'दालचीनी (Cinnamon) की चाय और मेथी दाने का पानी पिएं',
        'सीड साइकिलिंग (Seed Cycling): अलसी, कद्दू, तिल और सूरजमुखी के बीज',
        'पर्याप्त 8 घंटे की नींद और तनाव घटाने हेतु मेडिटेशन',
        'साबुत अनाज, हरी सब्जियां, नट्स और उच्च फाइबर युक्त डाइट'
      ],
      emergencyCare: 'अंडाशय में सिस्ट के फटने या मुड़ने (Ovarian Torsion) से पेट के निचले हिस्से में असहनीय दर्द होने पर तत्काल अस्पताल जाएं।',
      diagnosticTests: ['Pelvic Ultrasound (Transabdominal / Transvaginal)', 'Hormone Profile: Serum LH, FSH, Total Testosterone, DHEAS', 'Fasting Blood Glucose & Insulin Ratio', 'Lipid Profile']
    },
    severity: 'chronic',
  },
  {
    id: 'endometriosis',
    name: 'Endometriosis',
    hindiName: 'एंडोमेट्रियोसिस (गर्भाशय की परत का असामान्य फैलाव)',
    system: 'female-reproductive',
    affectedPartNames: ['Uterus', 'Ovaries', 'Fallopian Tubes'],
    overview: 'गर्भाशय की अंदरूनी परत (Endometrium) जैसे ऊतकों का गर्भाशय से बाहर अंडाशय, फैलोपियन ट्यूब, आंतों या पेल्विक दीवार पर उगना। हर माह मासिक चक्र में यह ऊतक फूलता और खून बहाता है, जिससे गंभीर सूजन और फाइब्रोसिस हो जाती है।',
    symptoms: [
      'मासिक धर्म के दौरान असहनीय तीखा पेल्विक दर्द और ऐंठन (Severe Dysmenorrhea)',
      'संभोग के दौरान या बाद में तेज दर्द (Dyspareunia)',
      'पीरियड्स के दौरान पेशाब या शौच करते समय दर्द',
      'अत्यधिक रक्तस्राव (Menorrhagia) और गर्भधारण में कठिनाई',
    ],
    causes: [
      'रेट्रोग्रेड मेंस्ट्रुएशन (माहवारी के खून का फैलोपियन ट्यूब से उल्टे पेल्विस में जाना)',
      'इम्यून सिस्टम की कमजोरी जो बाहर उगे ऊतकों को नष्ट नहीं कर पाती',
      'आनुवंशिक और पर्यावरणीय एस्ट्रोजन असंतुलन कारक',
    ],
    prevention: [
      'नियमित योग और पेल्विक स्ट्रेचिंग करें',
      'शरीर में एस्ट्रोजन का स्तर संतुलित रखने हेतु हाई-फाइबर हरी पत्तेदार सब्जियां खाएं',
      'शराब और कैफीन का सेवन सीमित रखें',
    ],
    treatment: {
      medical: [
        'दर्द निवारक: NSAIDs (Mefenamic Acid, Naproxen)',
        'हार्मोनल थेरेपी: Progestins (Dienogest 2mg दैनिक - प्रथम पसंद)',
        'GnRH Agonists / Antagonists (Leuprolide Depot) एस्ट्रोजन घटाने हेतु',
        'सर्जिकल उपचार: लेप्रोस्कोपिक एक्सीजन सर्जरी (Laparoscopic Excision of Endometriotic Lesions)'
      ],
      homeCare: [
        'पेट के निचले हिस्से पर गर्म पानी की बोतल (Heating Pad) से सिकाई',
        'एंटी-इन्फ्लेमेटरी आहार: हल्दी, अदरक, ओमेगा-3 और एंटीऑक्सीडेंट्स',
        'कैफीन, रेड मीट और ट्रांस फैट से पूरी तरह परहेज',
        'पेल्विक फ्लोर फिजियोथेरेपी और एक्यूप्रेशर'
      ],
      emergencyCare: 'चॉकलेट सिस्ट के अचानक फटने से पेट में भयानक तीव्र दर्द और चक्कर आने पर तुरंत इमरजेंसी सर्जरी हेतु भर्ती हों।',
      diagnosticTests: ['Laparoscopy (Gold Standard for Definitive Diagnosis)', 'Pelvic MRI with Endometriosis Protocol', 'High-Resolution Transvaginal Ultrasound (TVS)', 'Serum CA-125 (Elevated)']
    },
    severity: 'moderate',
  },
  {
    id: 'bph-prostate',
    name: 'Benign Prostatic Hyperplasia (BPH)',
    hindiName: 'प्रोस्टेट ग्रंथि का बढ़ना (बीपीएच / गदूद का बढ़ना)',
    system: 'male-reproductive',
    affectedPartNames: ['Prostate', 'Bladder', 'Urethra'],
    overview: 'उम्र बढ़ने (50+ वर्ष) के साथ पुरुषों में मूत्राशय के नीचे स्थित प्रोस्टेट ग्रंथि का गैर-कैंसरयुक्त आकार बढ़ जाना। बढ़ी हुई ग्रंथि मूत्रमार्ग (Urethra) को दबाती है, जिससे पेशाब करने में बाधा उत्पन्न होती है।',
    symptoms: [
      'पेशाब की धार कमजोर या पतली होना और रुक-रुक कर आना (Hesitancy)',
      'रात को बार-बार पेशाब के लिए उठना (Nocturia: 3-5 बार)',
      'पेशाब करने के बाद भी मूत्राशय खाली न होने का अहसास होना',
      'अचानक तेज पेशाब लगना जिसे रोक पाना मुश्किल हो (Urgency)',
    ],
    causes: [
      'उम्र बढ़ने पर टेस्टोस्टेरोन का डाइहाइड्रोटेस्टोस्टेरोन (DHT) में बदलना',
      'प्रोस्टेट कोशिकाओं का अनियंत्रित विकास',
      'मेटाबॉलिक सिंड्रोम और पारिवारिक इतिहास',
    ],
    prevention: [
      'शाम के समय चाय, कॉफी और शराब का सेवन न करें',
      'पेशाब को कभी भी लंबे समय तक न रोकें',
      'कद्दू के बीज (Pumpkin Seeds - जिंक युक्त) का नियमित सेवन करें',
    ],
    treatment: {
      medical: [
        'Alpha-1 Blockers: Tamsulosin 0.4mg या Silodosin 8mg (मूत्रमार्ग खोलने हेतु)',
        '5-Alpha Reductase Inhibitors: Dutasteride / Finasteride (प्रोस्टेट आकार घटाने हेतु)',
        'कॉम्बिनेशन थेरेपी (Tamsulosin + Dutasteride)',
        'सर्जिकल उपचार: TURP (Transurethral Resection of Prostate) या लेजर प्रोस्टेटेक्टॉमी (HoLEP)'
      ],
      homeCare: [
        'रात को सोने से 2 घंटे पहले पानी पीना सीमित करें',
        'दिन में डबल वोइडिंग तकनीक (एक बार पेशाब करने के 2 मिनट बाद दोबारा प्रयास करना)',
        'टमाटर (लाइकोपीन युक्त) और तरबूज का सेवन',
        'पेल्विक फ्लोर (केगेल) एक्सरसाइज दिन में 2 बार करें'
      ],
      emergencyCare: 'पेशाब का पूरी तरह रुक जाना और मूत्राशय का भयानक दर्द के साथ फूल जाना (Acute Urinary Retention) - तुरंत कैथेटर डलवाने अस्पताल जाएं।',
      diagnosticTests: ['Serum PSA (Prostate-Specific Antigen to rule out Cancer)', 'Ultrasound KUB with Post-Void Residual (PVR) Urine', 'Uroflowmetry (पेशाब की गति मापना)', 'Digital Rectal Examination (DRE)']
    },
    severity: 'moderate',
  },
  {
    id: 'varicocele',
    name: 'Varicocele (Scrotal Vein Enlargement)',
    hindiName: 'वेरिकोसेल (अंडकोष की नसों का फूलना)',
    system: 'male-reproductive',
    affectedPartNames: ['Testes', 'Scrotum', 'Spermatic Cord'],
    overview: 'अंडकोष (Scrotum) के भीतर रक्त ले जाने वाली नसों (Pampiniform plexus) के वाल्व खराब होने से नसों का असामान्य रूप से फूल जाना और मुड़ जाना (पैरों के वेरिकोज वेन्स जैसा)। इससे अंडकोष का तापमान बढ़ जाता है जिससे शुक्राणुओं की गुणवत्ता घटती है।',
    symptoms: [
      'अंडकोष में भारीपन, हल्का धीमा दर्द या खिंचाव, विशेषकर खड़े रहने पर',
      'अंडकोष को छूने पर "केंचुओं की थैली" (Bag of worms) जैसा अहसास होना',
      'एक अंडकोष (आमतौर पर बायां) का आकार दूसरे से छोटा होना (Testicular Atrophy)',
      'पुरुष बांझपन (Male Subfertility / Low Sperm Count)',
    ],
    causes: [
      'अंडकोष की नसों में स्थित एकतरफा वाल्व (Valves) का खराब होना',
      'बाईं टेस्टिकुलर नस का 90 डिग्री कोण पर रीनल नस में मिलना (Nutcracker Effect)',
      'भारी वजन उठाना या लंबे समय तक खड़े रहना',
    ],
    prevention: [
      'सपोर्टिव अंडरवियर या एथलेटिक सपोर्टर (Jockstrap) पहनें',
      'बहुत लंबे समय तक लगातार एक जगह खड़े रहने से बचें',
      'कब्ज से बचें ताकि पेट पर अतिरिक्त दबाव न पड़े',
    ],
    treatment: {
      medical: [
        'हल्के दर्द हेतु: Paracetamol या NSAIDs',
        'एंटीऑक्सीडेंट्स व विटामिन्स (CoQ10, L-Carnitine, Vitamin E) स्पर्म क्वालिटी सुधारने हेतु',
        'माइक्रोसर्जिकल वेरिकोसेलेक्टॉमी (Microsurgical Subinguinal Varicocelectomy - गोल्ड स्टैंडर्ड)',
        'वेरिकोसेल एम्बोलाइजेशन (Radiological Embolization)'
      ],
      homeCare: [
        'दर्द होने पर अंडकोष पर बर्फ की ठंडी सिकाई (Cold Compress)',
        'ढीले सूती अंतर्वस्त्र पहनें ताकि अंडकोष का तापमान सामान्य रहे',
        'गर्म पानी के टब (Hot Tub) और सौना बाथ से बचें',
        'भारी वजन उठाते समय सावधानी बरतें'
      ],
      emergencyCare: 'अंडकोष में अचानक असहनीय तीखा दर्द, सूजन और उल्टी होने पर (Testicular Torsion का खतरा) 4-6 घंटे के भीतर इमरजेंसी सर्जरी आवश्यक है।',
      diagnosticTests: ['Scrotal Color Doppler Ultrasound (Gold Standard)', 'Semen Analysis (Count, Motility, Morphology)', 'Serum Testosterone, LH, FSH']
    },
    severity: 'moderate',
  },
];
