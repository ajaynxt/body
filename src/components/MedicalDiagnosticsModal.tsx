import React, { useState } from 'react';
import {
  X,
  HeartPulse,
  Activity,
  Layers,
  Search,
  AlertTriangle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  FileText,
  ChevronRight,
  Flame,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectAnatomyPart?: (partName: string) => void;
}

// Diagnostic Category Filter
type Category = 'all' | 'cardiac' | 'imaging' | 'blood' | 'neuro' | 'emergency';

interface DiagnosticItem {
  id: string;
  titleHindi: string;
  titleEn: string;
  category: 'cardiac' | 'imaging' | 'blood' | 'neuro';
  tag: string;
  accuracy: string;
  turnaroundTime: string;
  radiationLevel: string;
  whyNeededHinglish: string;
  howItWorksHinglish: string;
  normalValues: string;
  abnormalWarningHinglish: string;
  heartAttackSignificance?: string;
  preparationTip: string;
  recommendedFrequency: string;
}

const DIAGNOSTIC_TESTS: DiagnosticItem[] = [
  // --- CARDIAC & HEART ATTACK PREVENTION TESTS ---
  {
    id: 'ct-calcium-score',
    titleHindi: 'सीटी कोरोनरी कैल्शियम स्कोर (CAC Test)',
    titleEn: 'CT Coronary Calcium Scoring (Agatston Score)',
    category: 'cardiac',
    tag: '⭐ 10-15 साल पहले भविष्यवाणी',
    accuracy: '95% भविष्यवाणी सटीकता',
    turnaroundTime: '15 मिनट स्कैन (उसी दिन रिपोर्ट)',
    radiationLevel: 'Low (कम - ~1 mSv)',
    whyNeededHinglish:
      'हार्ट अटैक आने से 10 से 15 साल पहले यह पता लगाने के लिए कि क्या दिल की नसों में कठोर प्लाक/कैल्शियम जमा हो रहा है। यह बिना किसी इंजेक्शन या डाई (Non-contrast) का सबसे सरल सीटी स्कैन है।',
    howItWorksHinglish:
      'सीटी स्कैनर दिल की तीनों मुख्य धमनियों (LAD, LCx, RCA) की हाई-स्पीड एक्स-रे स्लाइस लेता है और कंप्यूटर कैल्सीफाइड प्लाक का कुल घनत्व मापकर एगेटस्टन स्कोर (Agatston Score) निकालता है।',
    normalValues: 'स्कोर 0 = नसों में कोई कैल्शियम नहीं, अगले 10 साल दिल का दौरा पड़ने का जोखिम 1% से भी कम।',
    abnormalWarningHinglish:
      'स्कोर 1-99: हल्का जमाव; स्कोर 100-399: मध्यम ब्लॉकेज जोखिम; स्कोर 400+: गंभीर कोरोनरी आर्टरी डिजीज — तुरंत कार्डियोलॉजिस्ट से एंजियोग्राफी व दवा परामर्श लें!',
    heartAttackSignificance:
      'गोल्ड स्टैंडर्ड प्रिवेंशन: 40 वर्ष से अधिक उम्र के हर व्यक्ति, खासकर जिनके परिवार में हार्ट अटैक का इतिहास हो, उन्हें यह टेस्ट जरूर कराना चाहिए।',
    preparationTip: 'स्कैन से 4 घंटे पहले कैफीन (चाय/कॉफी) न लें ताकि धड़कन शांत रहे (<70 bpm)।',
    recommendedFrequency: 'स्कोर 0 होने पर हर 3-5 साल में एक बार।'
  },
  {
    id: 'hs-troponin',
    titleHindi: 'हाई-सेंसिटिविटी ट्रोपोनिन-I / T (कार्डियक बायोमार्कर)',
    titleEn: 'High-Sensitivity Cardiac Troponin (hs-cTnI / hs-cTnT)',
    category: 'cardiac',
    tag: '🚨 हार्ट अटैक का 100% गोल्ड स्टैंडर्ड',
    accuracy: '99.5% नैदानिक सटीकता',
    turnaroundTime: 'STAT इमरजेंसी ब्लड टेस्ट (30-60 मिनट)',
    radiationLevel: 'None (शून्य)',
    whyNeededHinglish:
      'जब भी छाती में दर्द, भारीपन, जबड़े या बाएं हाथ में दर्द हो — यह टेस्ट तुरंत साबित करता है कि हार्ट अटैक (Myocardial Infarction) हुआ है या नहीं। दिल की मांसपेशियों को नुकसान पहुंचते ही यह खून में आ जाता है।',
    howItWorksHinglish:
      'ट्रोपोनिन दिल की मांसपेशियों के संकुचन का मुख्य प्रोटीन है। स्वस्थ दिल में यह रक्त में नहीं निकलता। जब कोरोनरी नस बंद होने से मायोकार्डियम कोशिकाएं मरने लगती हैं, तो 2 से 3 घंटे के भीतर ट्रोपोनिन रक्तप्रवाह में रिसने लगता है।',
    normalValues: 'महिलाएं: < 10-14 ng/L (pg/mL) | पुरुष: < 20 ng/L (लैब संदर्भ अनुसार)',
    abnormalWarningHinglish:
      'यदि स्तर बेसलाइन से कई गुना अधिक है या 3 घंटे बाद के रिपीट टेस्ट में 20-50% का उछाल है, तो यह एक्टिव एक्यूट मायोकार्डियल इन्फार्क्शन (हार्ट अटैक) की पुष्टि करता है!',
    heartAttackSignificance:
      'इमरजेंसी नियम: ईसीजी नॉर्मल होने पर भी ट्रोपोनिन पॉजिटिव हो सकता है (NSTEMI - Non-ST Elevation Myocardial Infarction)। इसलिए सीने में दर्द पर ट्रोपोनिन कराना अनिवार्य है।',
    preparationTip: 'कोई उपवास जरूरी नहीं — यह इमरजेंसी ब्लड टेस्ट है जो तुरंत लिया जाता है।',
    recommendedFrequency: 'केवल सीने में दर्द या आपातकालीन हृदय लक्षणों के समय।'
  },
  {
    id: 'ct-coronary-angiography',
    titleHindi: 'सीटी कोरोनरी एंजियोग्राफी (वर्चुअल 3D एंजियोग्राफी)',
    titleEn: 'CT Coronary Angiography (CTCA - 128/256 Slice)',
    category: 'cardiac',
    tag: '🔬 बिना चीर-फाड़ नसों का 3D मैप',
    accuracy: '98% नेगेटिव प्रिडिक्टिव वैल्यू',
    turnaroundTime: '20 मिनट स्कैनिंग',
    radiationLevel: 'Moderate (मध्यम - 2-4 mSv)',
    whyNeededHinglish:
      'बिना हाथ या जांघ में कैथेटर तार डाले (Non-invasive) यह देखना कि दिल की तीनों नसों में कितने प्रतिशत (30%, 50%, 70%, 99%) ब्लॉकेज है और क्या वह प्लाक सॉफ्ट है या हार्ड।',
    howItWorksHinglish:
      'हाथ की नस में आयोडीन डाई (Contrast) इंजेक्ट की जाती है। जब डाई दिल की धमनियों में बहती है, तो मल्टी-स्लाइस सीटी स्कैनर दिल की धड़कन के साथ सिंक्रोनाइज्ड होकर 3D इमेज बनाता है।',
    normalValues: 'कोरोनरी धमनियों में 0% ल्यूमिनल स्टेनोसिस (पूर्ण रूप से खुली नसें)।',
    abnormalWarningHinglish:
      '>70% स्टेनोसिस या लेफ्ट मेन कोरोनरी आर्टरी में >50% ब्लॉकेज मिलने पर रक्त प्रवाह बाधित होता है; एंजियोप्लास्टी (स्टेंट) या बायपास (CABG) की आवश्यकता हो सकती है।',
    heartAttackSignificance:
      'यह "सॉफ्ट प्लाक" (Vulnerable Plaque) को भी पहचान लेता है, जो 40% ब्लॉकेज होने पर भी अचानक फटकर हार्ट अटैक ला सकता है।',
    preparationTip: 'स्कैन से 4 घंटे पहले खाली पेट रहें। सीरम क्रिएटिनिन (किडनी फंक्शन) टेस्ट अनिवार्य है।',
    recommendedFrequency: 'अस्पष्ट सीने के दर्द या हाई-रिस्क टीएमटी टेस्ट के बाद डॉक्टर के परामर्श पर।'
  },
  {
    id: 'hs-crp',
    titleHindi: 'हाई-सेंसिटिविटी सी-रिएक्टिव प्रोटीन (hs-CRP)',
    titleEn: 'High-Sensitivity C-Reactive Protein (hs-CRP)',
    category: 'blood',
    tag: '🔥 नसों की अंदरूनी सूजन का मार्कर',
    accuracy: '90% वैस्कुलर इन्फ्लेमेशन सूचकांक',
    turnaroundTime: 'ब्लड टेस्ट (24 घंटे)',
    radiationLevel: 'None (शून्य)',
    whyNeededHinglish:
      'कोलेस्ट्रॉल के अलावा हार्ट अटैक का दूसरा सबसे बड़ा कारण है धमनियों की दीवारों में अंदरूनी जलन/सूजन (Vascular Inflammation)। hs-CRP यह गुप्त सूजन मापता है।',
    howItWorksHinglish:
      'लिवर द्वारा बनाया जाने वाला यह प्रोटीन तब बढ़ता है जब रक्त वाहिकाओं में प्लाक के चारों ओर इन्फ्लेमेटरी कोशिकाएं सक्रिय होती हैं, जिससे प्लाक फटने का जोखिम बढ़ता है।',
    normalValues: '< 1.0 mg/L = कम जोखिम | 1.0 - 3.0 mg/L = मध्यम जोखिम',
    abnormalWarningHinglish:
      '> 3.0 mg/L = उच्च कार्डियोवैस्कुलर जोखिम! भले ही आपका कोलेस्ट्रॉल नॉर्मल हो, उच्च hs-CRP हार्ट अटैक के जोखिम को दोगुना-तिगुना कर देता है।',
    heartAttackSignificance:
      'कोलेस्ट्रॉल + hs-CRP दोनों को नियंत्रित रखना ही हार्ट अटैक की असली रोकथाम है। स्टैटिन दवाएं hs-CRP को भी घटाती हैं।',
    preparationTip: 'यदि सर्दी-जुकाम, वायरल बुखार या कोई संक्रमण हो तो टेस्ट न कराएं (गलत रिपोर्ट आ सकती है)।',
    recommendedFrequency: 'वार्षिक प्रिवेंटिव हेल्थ चेकअप में।'
  },
  {
    id: 'ecg-12-lead',
    titleHindi: '12-लीड इलेक्ट्रोकार्डियोग्राम (ECG / EKG)',
    titleEn: '12-Lead Electrocardiogram (Resting ECG)',
    category: 'cardiac',
    tag: '⚡ दिल की विद्युत तरंगों की जांच',
    accuracy: '85% एक्टिव अटैक पहचान',
    turnaroundTime: '5 मिनट (तात्कालिक ग्राफिकल रिपोर्ट)',
    radiationLevel: 'None (शून्य)',
    whyNeededHinglish:
      'हार्ट की धड़कन (Rhythm), पेसमेकर चाल, दिल के किसी हिस्से में खून की कमी (Ischemia) या एक्यूट हार्ट अटैक (STEMI) की तुरंत पुष्टि करने के लिए पहली जांच।',
    howItWorksHinglish:
      'छाती, दोनों हाथों और पैरों पर 10 इलेक्ट्रोड लगाए जाते हैं। यह दिल के SA Node से निकलने वाली विद्युत धारा (P तरंग, QRS कॉम्प्लेक्स, T तरंग) को ग्राफ पेपर पर 12 अलग-अलग कोणों से रिकॉर्ड करता है।',
    normalValues: 'सामान्य साइनस रिदम (60-100 धड़कन प्रति मिनट), सामान्य PR और QT इंटरवल।',
    abnormalWarningHinglish:
      'ST-Elevation (एसटी का उठना): तुरंत इमरजेंसी कैथ लैब और एंजियोप्लास्टी की जरूरत (STEMI)! T-wave Inversion: दिल को ऑक्सीजन की कमी।',
    heartAttackSignificance:
      'गोल्डन आवर डायग्नोसिस: सीने में दर्द के पहले 10 मिनट के अंदर ईसीजी होना चाहिए।',
    preparationTip: 'छाती पर कोई लोशन या तेल न लगाएं। टेस्ट के समय शांत रहें और बात न करें।',
    recommendedFrequency: 'वार्षिक चेकअप या सीने में किसी भी असहजता पर तत्काल।'
  },
  {
    id: '2d-echo',
    titleHindi: '2D इकोकार्डियोग्राफी व डॉपलर (हार्ट का अल्ट्रासाउंड)',
    titleEn: '2D Echocardiography with Color Doppler',
    category: 'cardiac',
    tag: '🌊 दिल की लाइव वीडियो व पंपिंग क्षमता',
    accuracy: '95% वाल्व व इजेक्शन फ्रैक्शन सटीकता',
    turnaroundTime: '20 मिनट टेस्ट',
    radiationLevel: 'None (शून्य - ध्वनि तरंगें)',
    whyNeededHinglish:
      'दिल का पंपिंग पावर (Ejection Fraction - EF%), चारों वाल्वों की कार्यप्रणाली, दिल की दीवारों की मोटाई और क्या दिल का कोई हिस्सा हार्ट अटैक के कारण मृत/कमजोर हो गया है (Regional Wall Motion Abnormality)।',
    howItWorksHinglish:
      'अल्ट्रासाउंड प्रोब छाती पर रखा जाता है। उच्च आवृत्ति वाली ध्वनि तरंगें हृदय के कक्षों और रक्त प्रवाह से टकराकर वापस आती हैं, जिससे स्क्रीन पर धड़कते हुए दिल की लाइव 2D वीडियो दिखाई देती है।',
    normalValues: 'इजेक्शन फ्रैक्शन (LVEF): 55% से 70% (स्वस्थ मजबूत पंपिंग)।',
    abnormalWarningHinglish:
      'LVEF < 40%: हार्ट फेलियर या बड़े हार्ट अटैक के बाद मांसपेशियों की कमजोरी। वाल्व का सिकुड़ना (Stenosis) या रिसाव (Regurgitation)।',
    heartAttackSignificance:
      'हार्ट अटैक के बाद दिल की कार्यक्षमता का स्थायी नुकसान मापने का सर्वश्रेष्ठ गैर-आक्रामक परीक्षण।',
    preparationTip: 'किसी विशेष तैयारी या उपवास की आवश्यकता नहीं।',
    recommendedFrequency: 'हर 1-2 वर्ष में हाई बीपी या हार्ट मरीजों के लिए।'
  },
  {
    id: 'lipid-apob-lpa',
    titleHindi: 'एडवांस्ड लिपिड प्रोफाइल + ApoB और Lp(a)',
    titleEn: 'Advanced Lipid Panel with Apolipoprotein-B & Lipoprotein(a)',
    category: 'blood',
    tag: '🩸 आनुवंशिक साइलेंट किलर कोलेस्ट्रॉल',
    accuracy: '99% एथेरोजेनिक कण मापन',
    turnaroundTime: 'ब्लड टेस्ट (12-24 घंटे)',
    radiationLevel: 'None (शून्य)',
    whyNeededHinglish:
      'साधारण कोलेस्ट्रॉल टेस्ट सिर्फ LDL दिखाता है। लेकिन **Lp(a)** और **ApoB** यह बताते हैं कि धमनियों में घुसने वाले खतरनाक छोटे चिपचिपे कण कितने हैं। भारतीयों में कम उम्र में हार्ट अटैक का सबसे बड़ा छिपा कारण Lp(a) है।',
    howItWorksHinglish:
      'खाली पेट खून का नमूना लेकर रक्त में ट्राइग्लिसराइड्स, एचडीएल (अच्छा कोलेस्ट्रॉल), एलडीएल (बुरा कोलेस्ट्रॉल), और एपोलिपोप्रोटीन-बी की आणविक सांद्रता मापी जाती है।',
    normalValues: 'LDL < 70-100 mg/dL | ApoB < 80 mg/dL | Lp(a) < 30-50 mg/dL (या <75-125 nmol/L)',
    abnormalWarningHinglish:
      'Lp(a) > 50 mg/dL होने पर व्यक्ति आनुवंशिक रूप से समय से पहले हार्ट अटैक के 3 गुना अधिक जोखिम में होता है!',
    heartAttackSignificance:
      'हर युवा को 25-30 वर्ष की आयु में जीवन में एक बार Lp(a) टेस्ट अवश्य कराना चाहिए क्योंकि यह डाइट से नहीं बल्कि जीन्स से तय होता है।',
    preparationTip: 'टेस्ट से पहले 10 से 12 घंटे का पूर्ण उपवास (केवल पानी पी सकते हैं) आवश्यक है।',
    recommendedFrequency: 'Lp(a) जीवन में एक बार; लिपिड प्रोफाइल प्रतिवर्ष।'
  },
  {
    id: 'tmt-stress-test',
    titleHindi: 'ट्रेडमिल स्ट्रेस टेस्ट (TMT / व्यायाम ईसीजी)',
    titleEn: 'Treadmill Stress Test (TMT / Exercise Tolerance Test)',
    category: 'cardiac',
    tag: '🏃 दौड़ते समय दिल की क्षमता',
    accuracy: '75-80% इस्किमिया संवेदनशीलता',
    turnaroundTime: '30 मिनट प्रोसीजर',
    radiationLevel: 'None (शून्य)',
    whyNeededHinglish:
      'आराम की स्थिति में 70% ब्लॉकेज वाली नसें भी कोई लक्षण नहीं देतीं। TMT टेस्ट में दौड़ते समय जब दिल को ज्यादा खून चाहिए होता है, तब छिपे हुए ब्लॉकेज ईसीजी में पकड़े जाते हैं।',
    howItWorksHinglish:
      'ब्रूस प्रोटोकॉल के तहत मरीज ट्रेडमिल पर चलता और दौड़ता है। हर 3 मिनट में गति और ढलान (Incline) बढ़ाई जाती है। टारगेट हार्ट रेट (220 - उम्र का 85%) तक लगातार ईसीजी और बीपी रिकॉर्ड होता है।',
    normalValues: 'नेगेटिव फॉर इंड्यूसिबल इस्किमिया (लक्ष्य धड़कन तक बिना किसी ईसीजी बदलाव या सीने के दर्द के पहुंचना)।',
    abnormalWarningHinglish:
      'पॉजिटिव TMT: दौड़ते समय ईसीजी में ST-डिप्रेशन या एनजाइना दर्द होना। यह कोरोनरी आर्टरी में महत्वपूर्ण ब्लॉकेज का पक्का संकेत है।',
    heartAttackSignificance:
      'जिम जाने वाले या 35+ उम्र के लोगों के लिए भारी वर्कआउट शुरू करने से पहले अनिवार्य टेस्ट ताकि सडन कार्डियक अरेस्ट से बचा जा सके।',
    preparationTip: 'टेस्ट से 2-3 घंटे पहले हल्का खाना खाएं। आरामदायक दौड़ने वाले जूते और ढीले कपड़े पहनें।',
    recommendedFrequency: 'हर 1-2 साल में 40+ उम्र के व्यक्तियों के लिए।'
  },

  // --- GENERAL DIAGNOSTIC IMAGING (X-RAY, CT, MRI, ULTRASOUND) ---
  {
    id: 'xray-chest-pa',
    titleHindi: 'डिजिटल चेस्ट एक्स-रे (PA व्यू)',
    titleEn: 'Digital Chest X-Ray (Postero-Anterior PA View)',
    category: 'imaging',
    tag: '🩻 सबसे तेज व बुनियादी इमेजिंग',
    accuracy: '88% फेफड़ों व कंकाल जांच',
    turnaroundTime: '5 मिनट स्कैन (तत्काल इमेज)',
    radiationLevel: 'Low (कम - ~0.1 mSv, 10 दिन की प्राकृतिक धूप बराबर)',
    whyNeededHinglish:
      'फेफड़ों में निमोनिया, टीबी (Tuberculosis), पानी भरना (Pleural Effusion), पसली टूटना, और दिल का आकार बढ़ना (Cardiomegaly) देखने के लिए पहली बुनियादी जांच।',
    howItWorksHinglish:
      'एक्स-रे किरणें पीठ से छाती की ओर गुजरती हैं। हड्डियां किरणों को रोक लेती हैं इसलिए सफेद दिखती हैं; फेफड़ों की हवा से किरणें पार हो जाती हैं इसलिए वे काले दिखते हैं।',
    normalValues: 'कार्डियोथोरैसिक रेश्यो (CTR) < 0.5 (हार्ट नॉर्मल साइज), दोनों फेफड़े स्वच्छ, कोस्टोफ्रेनिक एंगल शार्प।',
    abnormalWarningHinglish:
      'CTR > 0.5: बढ़ा हुआ दिल (Cardiomegaly / दिल की कमजोरी); सफेद धब्बे: निमोनिया या संक्रमण; छाती के निचले कोने बंद: फेफड़ों में पानी।',
    preparationTip: 'गले की चेन, ताबीज या धातु की वस्तुएं उतार लें। गहरी सांस खींचकर रोकनी होती है।',
    recommendedFrequency: 'खांसी 2 हफ्ते से ज्यादा होने पर या सीने में चोट लगने पर।'
  },
  {
    id: 'mri-brain-spine',
    titleHindi: 'एमआरआई स्कैन (मस्तिष्क व रीढ़ की हड्डी)',
    titleEn: 'Magnetic Resonance Imaging (Brain & Spine MRI 1.5T / 3T)',
    category: 'imaging',
    tag: '🧲 शून्य रेडिएशन, सुपर-क्लियर सॉफ्ट टिशू',
    accuracy: '99% न्यूरोलॉजिकल इमेजिंग सटीकता',
    turnaroundTime: '30-45 मिनट शांत लेटना',
    radiationLevel: 'None (शून्य - बिल्कुल कोई हानिकारक रेडिएशन नहीं)',
    whyNeededHinglish:
      'लकवा (Brain Stroke) का शुरुआती मिनटों में पता लगाने, ब्रेन ट्यूमर, सिरदर्द के कारण, रीढ़ की हड्डी में डिस्क खिसकना (Slip Disc/Sciatica), और नसों के दबने की सबसे सटीक जांच।',
    howItWorksHinglish:
      'शक्तिशाली सुपरकंडक्टिंग मैग्नेट (1.5 या 3 टेस्ला) और रेडियो तरंगों का उपयोग करके शरीर के पानी के अणुओं (हाइड्रोजन प्रोटॉन) को उत्तेजित किया जाता है। प्रोटॉन वापस लौटते समय कंप्यूटर को 3D एचडी तस्वीरें भेजते हैं।',
    normalValues: 'मस्तिष्क का पैरेन्काइमा सामान्य, कोई इस्केमिक घाव या ट्यूमर नहीं, डिस्क स्पेस सामान्य।',
    abnormalWarningHinglish:
      'DWI (Diffusion Weighted Imaging) पर सफेद चमक: तीव्र ब्रेन स्ट्रोक (तुरंत 4.5 घंटे के अंदर थ्रॉम्बोलिटिक दवा की जरूरत); डिस्क हर्नियेशन: नसों पर दबाव।',
    preparationTip:
      '⚠️ शरीर में कोई पेसमेकर, धातु की क्लिप या मेटल इम्प्लांट नहीं होना चाहिए (चुंबकीय खिंचाव का खतरा)।',
    recommendedFrequency: 'न्यूरोलॉजिकल लक्षण, असहनीय सिरदर्द, सुन्नपन या डॉक्टर की सलाह पर।'
  },
  {
    id: 'ct-scan-abdomen',
    titleHindi: 'सीटी स्कैन एब्डोमेन व पेल्विस (Contrast CT)',
    titleEn: 'Contrast-Enhanced CT Abdomen & Pelvis (CECT)',
    category: 'imaging',
    tag: '📐 पेट के भीतरी अंगों की 360° स्लाइस',
    accuracy: '96% पेट के रोगों की पहचान',
    turnaroundTime: '15 मिनट स्कैन',
    radiationLevel: 'Moderate (मध्यम - 5-8 mSv)',
    whyNeededHinglish:
      'अचानक पेट में तेज दर्द (Acute Abdomen), अपेंडिक्स पकना (Appendicitis), आंतों में रुकावट, किडनी में पथरी, पैंक्रियाटाइटिस, और पेट के आंतरिक ट्यूमर की सटीक पहचान के लिए।',
    howItWorksHinglish:
      'सीटी रिंग मरीज के चारों ओर 360 डिग्री घूमकर पेट के अंगों की मिलीमीटर स्तर की सैकड़ों क्रॉस-सेक्शनल स्लाइस बनाती है।',
    normalValues: 'लिवर, पित्ताशय, तिल्ली, अग्न्याशय, गुर्दे और आंतें सामान्य आकार और संरचना में।',
    abnormalWarningHinglish:
      'अपेंडिक्स की सूजन (>6 mm) और फैट स्ट्रैंडिंग: तुरंत सर्जरी की जरूरत; पैंक्रियाज के आसपास फ्लूइड: एक्यूट पैंक्रियाटाइटिस।',
    preparationTip: 'स्कैन से 6 घंटे पहले भूखे रहें। सीरम क्रिएटिनिन टेस्ट जरूरी है।',
    recommendedFrequency: 'केवल गंभीर पेट दर्द या सर्जिकल इमरजेंसी के समय।'
  },
  {
    id: 'ultrasound-usg',
    titleHindi: 'अल्ट्रासोनोग्राफी (USG एब्डोमेन व पेल्विस)',
    titleEn: 'Whole Abdomen Ultrasound (Sonography with Doppler)',
    category: 'imaging',
    tag: '👶 100% सुरक्षित ध्वनि तरंग परीक्षण',
    accuracy: '92% पित्त की पथरी व सिस्ट पहचान',
    turnaroundTime: '10-15 मिनट',
    radiationLevel: 'None (शून्य - गर्भवती महिलाओं और बच्चों के लिए पूर्ण सुरक्षित)',
    whyNeededHinglish:
      'फैटी लिवर, पित्ताशय की पथरी (Gallbladder Stones), गुर्दे की पथरी (Kidney Stones), महिलाओं में गर्भाशय में रसौली (Fibroids), और अंडाशय में सिस्ट (Ovarian Cyst / PCOS) की सबसे आसान पहली जांच।',
    howItWorksHinglish:
      'पेट पर वाटर-बेस्ड जेल लगाकर हाई-फ्रीक्वेंसी अल्ट्रासाउंड प्रोब घुमाया जाता है। अंगों से टकराकर लौटने वाली प्रतिध्वनि (Echo) से स्क्रीन पर तुरंत वास्तविक समय की तस्वीरें बनती हैं।',
    normalValues: 'नॉर्मल लिवर इकोटेक्सचर, पित्ताशय में कोई पथरी नहीं, कोई हाइड्रोनेफ्रोसिस नहीं।',
    abnormalWarningHinglish:
      'एकॉस्टिक शैडो के साथ चमकदार स्पॉट: पथरी; लिवर की अत्यधिक सफेदी: ग्रेड 1/2/3 फैटी लिवर।',
    preparationTip:
      'पित्ताशय की जांच के लिए 6 घंटे भूखा रहना जरूरी; गर्भाशय व पेशाब की थैली के लिए पेशाब रोककर रखना (फुल ब्लैडर) जरूरी।',
    recommendedFrequency: 'वार्षिक स्वास्थ्य परीक्षण या पेट दर्द पर।'
  }
];

export const MedicalDiagnosticsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTest, setSelectedTest] = useState<DiagnosticItem>(DIAGNOSTIC_TESTS[0]);

  if (!isOpen) return null;

  const filteredTests = DIAGNOSTIC_TESTS.filter(test => {
    const matchesCat =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'cardiac'
        ? test.category === 'cardiac'
        : selectedCategory === 'imaging'
        ? test.category === 'imaging'
        : selectedCategory === 'blood'
        ? test.category === 'blood'
        : true;

    const matchesSearch =
      test.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.whyNeededHinglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.tag.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="medical-diagnostics-modal glass-panel"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="modal-header">
          <div className="header-left">
            <div className="header-icon-box diagnostics-pulse-box">
              <HeartPulse size={22} className="text-danger" />
            </div>
            <div>
              <div className="diagnostics-badge-row">
                <span className="badge-pill bg-danger-subtle text-danger font-bold">
                  <Activity size={12} className="inline-icon" /> क्लिनिकल डायग्नोस्टिक्स
                </span>
                <span className="badge-pill bg-accent-subtle text-accent">
                  🔬 एक्स-रे, सीटी, एमआरआई व हार्ट टेस्ट
                </span>
                <span className="creator-credit-pill">by AJAYNXT</span>
              </div>
              <h3 className="modal-title">
                मेडिकल इमेजिंग व हार्ट अटैक प्रिवेंशन जांच मार्गदर्शिका
              </h3>
              <p className="modal-subtitle">
                Comprehensive Diagnostic Radiology, Cardiac Biomarkers & Early Warning Guide
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Emergency Alert Ribbon: Heart Attack Early Warning Golden Hour */}
        <div className="heart-attack-alert-banner">
          <div className="alert-banner-icon">
            <AlertTriangle size={20} className="text-amber animate-pulse" />
          </div>
          <div className="alert-banner-text">
            <strong>हार्ट अटैक का 1 घंटा (Golden Hour) क्यों जीवन बचाता है?</strong>
            <span>
              सीने में भारीपन, पसीना और बाएं हाथ/जबड़े में दर्द होने पर बिना देर किए तुरंत{' '}
              <strong>12-Lead ECG</strong> और <strong>hs-Troponin</strong> कराएं। लक्षण शुरू होते ही
              एस्पिरिन (Disprin 300mg) चबाना और नजदीकी कैथ लैब अस्पताल पहुंचना जान बचा सकता है।
            </span>
          </div>
        </div>

        {/* Category Filter Pills & Search */}
        <div className="diagnostics-filter-bar">
          <div className="category-pills-row">
            <button
              className={`diag-tab-pill ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              सभी टेस्ट ({DIAGNOSTIC_TESTS.length})
            </button>
            <button
              className={`diag-tab-pill cardiac-pill ${selectedCategory === 'cardiac' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('cardiac')}
            >
              ❤️ हार्ट अटैक प्रिवेंशन पैनल (8)
            </button>
            <button
              className={`diag-tab-pill ${selectedCategory === 'imaging' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('imaging')}
            >
              🩻 इमेजिंग (X-Ray, CT, MRI, USG)
            </button>
            <button
              className={`diag-tab-pill ${selectedCategory === 'blood' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('blood')}
            >
              🩸 एडवांस्ड ब्लड बायोमार्कर्स
            </button>
          </div>

          <div className="diag-search-input-wrap">
            <Search size={15} className="text-muted" />
            <input
              type="text"
              placeholder="जांच खोजें (उदा. Troponin, Calcium score, MRI, X-Ray, ECG)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Master-Detail Split Workspace */}
        <div className="diagnostics-split-workspace">
          {/* Left Master List */}
          <div className="diagnostics-list-pane">
            <div className="list-count-header">
              <span>उपलब्ध परीक्षण ({filteredTests.length})</span>
              <span className="text-muted-xs">क्लिक करके पूरी मेडिकल रिपोर्ट समझें</span>
            </div>

            <div className="diagnostics-cards-scroll">
              {filteredTests.map(test => {
                const isSelected = selectedTest.id === test.id;
                return (
                  <div
                    key={test.id}
                    className={`diagnostic-card-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedTest(test)}
                  >
                    <div className="card-top-tag-row">
                      <span className="item-tag-badge">{test.tag}</span>
                      <span className="item-rad-badge">{test.radiationLevel}</span>
                    </div>
                    <h4 className="item-hindi-name">{test.titleHindi}</h4>
                    <span className="item-english-name">{test.titleEn}</span>
                    <p className="item-snip-desc">{test.whyNeededHinglish.slice(0, 95)}...</p>

                    <div className="item-footer-meta">
                      <span className="turnaround-meta">
                        <Clock size={12} className="inline-icon" /> {test.turnaroundTime}
                      </span>
                      <ChevronRight size={14} className="chevron-icon" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Detail Pane */}
          <div className="diagnostics-detail-pane">
            <div className="detail-scrollable-content">
              {/* Header Box */}
              <div className="detail-header-card glass-panel">
                <div className="detail-title-row">
                  <div>
                    <span className="detail-highlight-tag">{selectedTest.tag}</span>
                    <h2 className="detail-main-title">{selectedTest.titleHindi}</h2>
                    <p className="detail-latin-title">{selectedTest.titleEn}</p>
                  </div>
                  <div className="detail-accuracy-box">
                    <span className="accuracy-label">डायग्नोस्टिक सटीकता</span>
                    <span className="accuracy-val">{selectedTest.accuracy}</span>
                  </div>
                </div>

                <div className="quick-spec-grid">
                  <div className="spec-stat-card">
                    <span className="spec-label">रिपोर्ट मिलने का समय</span>
                    <span className="spec-val">
                      <Clock size={13} className="text-accent" /> {selectedTest.turnaroundTime}
                    </span>
                  </div>
                  <div className="spec-stat-card">
                    <span className="spec-label">रेडिएशन स्तर</span>
                    <span className="spec-val">
                      <ShieldCheck size={13} className="text-success" /> {selectedTest.radiationLevel}
                    </span>
                  </div>
                  <div className="spec-stat-card">
                    <span className="spec-label">कितनी बार कराएं?</span>
                    <span className="spec-val">{selectedTest.recommendedFrequency}</span>
                  </div>
                </div>
              </div>

              {/* Heart Attack Significance Banner (If applicable) */}
              {selectedTest.heartAttackSignificance && (
                <div className="cardiac-crucial-box">
                  <div className="cardiac-box-icon">
                    <Flame size={20} className="text-danger" />
                  </div>
                  <div>
                    <h4 className="cardiac-box-title">हार्ट अटैक से बचाव में इसका क्या महत्व है?</h4>
                    <p className="cardiac-box-text">{selectedTest.heartAttackSignificance}</p>
                  </div>
                </div>
              )}

              {/* Section 1: Why Needed (यह जांच क्यों जरूरी है?) */}
              <div className="detail-content-block">
                <h4 className="block-title">
                  <HelpCircle size={16} className="text-accent" />
                  <span>यह जांच क्यों और कब करवानी चाहिए? (Indications)</span>
                </h4>
                <p className="block-body-text">{selectedTest.whyNeededHinglish}</p>
              </div>

              {/* Section 2: How It Works (यह जांच कैसे होती है?) */}
              <div className="detail-content-block">
                <h4 className="block-title">
                  <Layers size={16} className="text-info" />
                  <span>यह जांच शरीर के अंदर कैसे काम करती है? (Mechanism)</span>
                </h4>
                <p className="block-body-text">{selectedTest.howItWorksHinglish}</p>
              </div>

              {/* Section 3: Normal Values & Abnormal Alert */}
              <div className="results-compare-grid">
                <div className="result-card normal-card">
                  <div className="result-header text-success">
                    <CheckCircle2 size={16} />
                    <strong>सामान्य रिपोर्ट (Normal Reference Values)</strong>
                  </div>
                  <p className="result-text">{selectedTest.normalValues}</p>
                </div>

                <div className="result-card abnormal-card">
                  <div className="result-header text-danger">
                    <AlertTriangle size={16} />
                    <strong>असामान्य / खतरनाक रिपोर्ट (Red Flag Warnings)</strong>
                  </div>
                  <p className="result-text">{selectedTest.abnormalWarningHinglish}</p>
                </div>
              </div>

              {/* Section 4: Preparation Tips */}
              <div className="preparation-tip-box">
                <FileText size={16} className="text-warning flex-shrink-0" />
                <div>
                  <strong>जांच से पहले की आवश्यक सावधानियां (Preparation Tip):</strong>
                  <p>{selectedTest.preparationTip}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
