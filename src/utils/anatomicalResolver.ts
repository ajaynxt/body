import type { StudyPartItem, AtlasData } from '../types/atlas';
import { BOOK_CHAPTERS } from '../data/chapters';
import { FEMALE_MESH_CATALOG } from '../data/femaleMeshCatalog';

// Hindi translation map for anatomical keywords and common structures
const HINDI_ANATOMICAL_DICTIONARY: Record<string, { hindi: string; functionDesc?: string; clinical?: string }> = {
  // Major Organs
  heart: {
    hindi: 'मानव हृदय (दिल)',
    functionDesc: 'चौबीसों घंटे रक्त परिसंचरण और पूरे शरीर में ऑक्सीजन-पोषक तत्व पहुंचाना।',
    clinical: 'ईसीजी (ECG), एंजियोग्राफी और इकोकार्डियोग्राफी द्वारा परीक्षण।',
  },
  brain: {
    hindi: 'मस्तिष्क (दिमाग)',
    functionDesc: 'शरीर का मुख्य नियंत्रण केंद्र, विचार, स्मृति और सभी क्रियाओं का संचालन।',
    clinical: 'एमआरआई (MRI) और ईईजी (EEG) द्वारा न्यूरोलॉजिकल मूल्यांकन।',
  },
  lung: {
    hindi: 'फेफड़ा (फुफ्फुस)',
    functionDesc: 'श्वसन प्रक्रिया द्वारा ऑक्सीजन ग्रहण करना और कार्बन डाइऑक्साइड बाहर निकालना।',
    clinical: 'स्पाइरोमेट्री, चेस्ट एक्स-रे और सीटी स्कैन से फेफड़ों की जांच।',
  },
  liver: {
    hindi: 'यकृत (जिगर)',
    functionDesc: 'शरीर की सबसे बड़ी ग्रंथि, 500 से अधिक रासायनिक कार्य, डिटॉक्सिफिकेशन और पित्त रस निर्माण।',
    clinical: 'लिवर फंक्शन टेस्ट (LFT) और अल्ट्रासाउंड से हेपेटाइटिस व फैटी लिवर की जांच।',
  },
  kidney: {
    hindi: 'वृक्क (गुर्दा)',
    functionDesc: 'रक्त का निस्पंदन, यूरिया और अपशिष्ट बाहर निकालना, जल व इलेक्ट्रोलाइट संतुलन।',
    clinical: 'किडनी फंक्शन टेस्ट (KFT) और सीरम क्रिएटिनिन जांच।',
  },
  stomach: {
    hindi: 'आमाशय (पेट)',
    functionDesc: 'भोजन का पाचन, हाइड्रोक्लोरिक एसिड (HCl) और पेप्सिन द्वारा प्रोटीन विखंडन।',
    clinical: 'एंडोस्कोपी द्वारा अल्सर और एसिडिटी की जांच।',
  },
  pancreas: {
    hindi: 'अग्न्याशय',
    functionDesc: 'इंसुलिन और ग्लूकागन हार्मोन स्राव (रक्त शर्करा नियमन) तथा पाचक एंजाइम।',
    clinical: 'HbA1c और सीरम एमाइलेज/लाइपेस टेस्ट।',
  },
  spleen: {
    hindi: 'प्लीहा (तिल्ली)',
    functionDesc: 'रक्त की पुरानी RBCs का पुनर्चक्रण और प्रतिरक्षा तंत्र का महत्वपूर्ण अंग।',
    clinical: 'स्प्लेनोमेगाली (तिल्ली बढ़ना) की अल्ट्रासाउंड से पहचान।',
  },
  gallbladder: {
    hindi: 'पित्ताशय',
    functionDesc: 'यकृत द्वारा बनाए गए पित्त (Bile) का भंडारण और वसा पाचन में स्राव।',
    clinical: 'पित्त की पथरी (Gallstones) की सोनोग्राफी।',
  },

  // Female Reproductive Anatomy
  uterus: {
    hindi: 'गर्भाशय (बच्चेदानी)',
    functionDesc: 'भ्रूण और शिशु के विकास एवं पोषण का मुख्य प्रजनन अंग।',
    clinical: 'पेल्विक अल्ट्रासाउंड और पैप स्मीयर परीक्षण।',
  },
  ovary: {
    hindi: 'अंडाशय',
    functionDesc: 'अंडाणु (Egg) उत्पादन और एस्ट्रोजेन व प्रोजेस्टेरोन हार्मोन स्राव।',
    clinical: 'PCOS/PCOD और फॉलिक्युलर स्कैन।',
  },
  cervix: {
    hindi: 'गर्भाशय ग्रीवा (सर्विक्स)',
    functionDesc: 'गर्भाशय का निचला संकरा भाग जो योनि से जुड़ता है।',
    clinical: 'पैप स्मीयर और HPV डीएनए परीक्षण।',
  },
  vagina: {
    hindi: 'योनि मार्ग',
    functionDesc: 'मासिक धर्म स्राव, संभोग और प्राकृतिक प्रसव का मार्ग।',
    clinical: 'संक्रमण और नियमित स्त्री रोग परीक्षण।',
  },
  fallopian: {
    hindi: 'डिम्बवाहिनी (फैलोपियन ट्यूब)',
    functionDesc: 'अंडाशय से अंडाणु को गर्भाशय तक ले जाना और निषेचन (Fertilization) का मुख्य स्थल।',
    clinical: 'HSG (हिस्टेरोसाल्पिंगोग्राफी) द्वारा ट्यूबल ब्लॉकेज की जांच।',
  },
  uterine_tube: {
    hindi: 'डिम्बवाहिनी (फैलोपियन ट्यूब)',
    functionDesc: 'निषेचन का मुख्य स्थल (Ampulla भाग)।',
    clinical: 'एक्टोपिक प्रेग्नेंसी का जोखिम क्षेत्र।',
  },
  mammary: {
    hindi: 'स्तन ग्रंथि (मेमरी लोब्स)',
    functionDesc: 'दुग्ध उत्पादन और प्रोलैक्टिन व ऑक्सीटोसिन द्वारा पोषण।',
    clinical: 'मैमोग्राफी और स्तन स्व-परीक्षण (BSE)।',
  },
  nipple: {
    hindi: 'चूचुक (Nipple)',
    functionDesc: 'दुग्ध निष्कासन का संवेदी केंद्र।',
    clinical: 'नियमित क्लिनिकल परीक्षण।',
  },
  areola: {
    hindi: 'स्तन परिवेश (Areola)',
    functionDesc: 'मोंटगोमेरी ग्रंथियों द्वारा चिकनाई प्रदान करने वाला रंजित क्षेत्र।',
    clinical: 'त्वचा स्वास्थ्य मूल्यांकन।',
  },
  skin: {
    hindi: 'बाह्य त्वचा एवं शारीरिक रूपरेखा (Integumentary Skin)',
    functionDesc: 'शरीर का सबसे बड़ा सुरक्षा कवच, तापमान नियमन और स्पर्श संवेदन।',
    clinical: 'डर्मेटोलॉजिकल परीक्षण।',
  },

  // Bones & Skeleton
  femur: {
    hindi: 'उर्वस्थि / जांघ की हड्डी (Femur)',
    functionDesc: 'मानव शरीर की सबसे लंबी, भारी और सबसे मजबूत हड्डी जो शरीर का वजन वहन करती है।',
    clinical: 'हिप फ्रैक्चर और ऑस्टियोपोरोसिस डेक्सा स्कैन।',
  },
  humerus: {
    hindi: 'प्रगंडिका / ऊपरी बांह की हड्डी (Humerus)',
    functionDesc: 'कंधे से कोहनी तक की मुख्य हड्डी जो हाथ के संचालन में सहायता करती है।',
    clinical: 'फ्रैक्चर और रोटेटर कफ इंजरी।',
  },
  clavicle: {
    hindi: 'हंसली / कॉलर बोन (Clavicle)',
    functionDesc: 'छाती और कंधे को जोड़ने वाली एकमात्र क्षैतिज लंबी हड्डी।',
    clinical: 'शरीर में सबसे आम फ्रैक्चर होने वाली हड्डियों में से एक।',
  },
  scapula: {
    hindi: 'अंसफलक / कंधे की हड्डी (Scapula)',
    functionDesc: 'कंधे के जोड़ को गतिशीलता और मांसपेशियों को आधार प्रदान करती है।',
    clinical: 'शोल्डर इम्पिंजमेंट और मस्कुलोस्केलेटल दर्द।',
  },
  patella: {
    hindi: 'जानुफलक / घुटने की कटोरी (Patella)',
    functionDesc: 'घुटने के जोड़ की रक्षा करती है और क्वाड्रिसेप्स टेंडन की शक्ति बढ़ाती है।',
    clinical: 'पटेला डिसलोकेशन और गठिया (Arthritis)।',
  },
  tibia: {
    hindi: 'अंतर्जंघिका / पिंडली की मुख्य हड्डी (Tibia)',
    functionDesc: 'निचले पैर की मुख्य वजन वहन करने वाली हड्डी।',
    clinical: 'शिन स्प्लिंट्स और स्ट्रेस फ्रैक्चर।',
  },
  fibula: {
    hindi: 'बहिर्जंघिका (Fibula)',
    functionDesc: 'टखने के जोड़ को स्थिरता प्रदान करना और मांसपेशियों का जुड़ाव।',
    clinical: 'टखने के मुड़ने पर फ्रैक्चर की संभावना।',
  },
  mandible: {
    hindi: 'अधोहन्वस्थि / निचला जबड़ा (Mandible)',
    functionDesc: 'खोपड़ी की एकमात्र चलायमान हड्डी, चबाने और बोलने में सहायक।',
    clinical: 'टीएमजे (TMJ) विकार और डेंटल ऑर्थोडॉन्टिक्स।',
  },
  maxilla: {
    hindi: 'ऊर्ध्वहन्वस्थि / ऊपरी जबड़ा (Maxilla)',
    functionDesc: 'चेहरे के मध्य भाग, तालू और ऊपरी दांतों का आधार।',
    clinical: 'साइनस संक्रमण (मैक्सिलरी साइनसाइटिस)।',
  },
  sternum: {
    hindi: 'उरोस्थि / छाती की मध्य हड्डी (Sternum)',
    functionDesc: 'हृदय और फेफड़ों की रक्षा करने वाला वक्षीय कवच।',
    clinical: 'ओपन हार्ट सर्जरी के लिए स्टर्नोटॉमी की जाती है।',
  },
  rib: {
    hindi: 'पसली (Rib)',
    functionDesc: '12 जोड़ी पसलियां मिलकर वक्षीय पिंजरा (Rib Cage) बनाती हैं।',
    clinical: 'पसली में चोट या कोस्टोकॉन्ड्राइटिस (छाती का दर्द)।',
  },
  pelvis: {
    hindi: 'श्रोणिमेखला / कूल्हे की हड्डी (Pelvis)',
    functionDesc: 'रीढ़ की हड्डी और पैरों के बीच शरीर का भार स्थानांतरित करती है।',
    clinical: 'पेल्विक फ्रैक्चर और डिलीवरी कैनाल की संरचना।',
  },
  vertebra: {
    hindi: 'कशेरुका / रीढ़ की हड्डी (Vertebra)',
    functionDesc: 'मेरुदंड (Spinal Cord) की सुरक्षा और शरीर को सीधा रखने का मुख्य आधार।',
    clinical: 'स्लिप डिस्क (Herniated Disc) और स्पोंडिलाइटिस।',
  },
  spine: {
    hindi: 'मेरुदंड (Spine / Vertebral Column)',
    functionDesc: 'शरीर का केंद्रीय अक्षीय सहारा और तंत्रिका मार्ग।',
    clinical: 'स्कोलियोसिस और सर्वाइकल स्पोंडिलोसिस।',
  },
  skull: {
    hindi: 'कपाल / खोपड़ी (Skull / Cranium)',
    functionDesc: 'मस्तिष्क की बाहरी चोटों से अचूक सुरक्षा।',
    clinical: 'सिर की चोट और सीटी स्कैन द्वारा जांच।',
  },

  // Muscles
  biceps: {
    hindi: 'द्विशिर पेशी (Biceps Brachii)',
    functionDesc: 'कोहनी को मोड़ना और हथेली को ऊपर की ओर घुमाना (Supination)।',
    clinical: 'बाइसेप्स टेंडिनाइटिस और वजन उठाने से होने वाला खिंचाव।',
  },
  triceps: {
    hindi: 'त्रिशिर पेशी (Triceps Brachii)',
    functionDesc: 'कोहनी को सीधा फैलाना (Arm Extension)।',
    clinical: 'ओवरयूज इंजरी और ट्राइसेप्स स्ट्रेन।',
  },
  deltoid: {
    hindi: 'त्रिकोणाकार स्कंध पेशी (Deltoid Muscle)',
    functionDesc: 'हाथ को ऊपर और बाजू में उठाना (Arm Abduction)।',
    clinical: 'इंट्रामस्क्युलर इंजेक्शन (IM) का सबसे पसंदीदा स्थल।',
  },
  pectoralis: {
    hindi: 'वक्ष पेशी (Pectoralis Major / Chest)',
    functionDesc: 'हाथ को छाती के करीब लाना और अंदर की ओर घुमाना।',
    clinical: 'जिम में बेंच प्रेस के दौरान पेक्टोरल खिंचाव।',
  },
  trapezius: {
    hindi: 'समलंब पेशी (Trapezius)',
    functionDesc: 'कंधे को उचकाना, गर्दन और सिर को सहारा देना।',
    clinical: 'तनाव और गलत पोस्चर से गर्दन-कंधे में जकड़न।',
  },
  rectus_abdominis: {
    hindi: 'उदर ऋजु पेशी (Abdominal Muscles / Abs)',
    functionDesc: 'रीढ़ की हड्डी को आगे झुकाना और आंतरिक अंगों को सहारा देना।',
    clinical: 'कोर वीकनेस और हर्निया की जांच।',
  },
  gluteus: {
    hindi: 'वृहद् नितंब पेशी (Gluteus Maximus)',
    functionDesc: 'शरीर की सबसे बड़ी और शक्तिशाली पेशी जो सीधे खड़े होने और दौड़ने में सहायक है।',
    clinical: 'सायटिका और लो बैक पेन का कारण।',
  },
  quadriceps: {
    hindi: 'चतुःशिर जंघा पेशी (Quadriceps Femoris)',
    functionDesc: 'घुटने को सीधा करना और चलने, कूदने, दौड़ने में मुख्य शक्ति प्रदान करना।',
    clinical: 'घुटने का दर्द और स्पोर्ट्स इंजरी।',
  },
  gastrocnemius: {
    hindi: 'पिंडली की पेशी (Calf Muscle)',
    functionDesc: 'पंजे को नीचे दबाना और दौड़ने में छलांग लगाना।',
    clinical: 'अकिलीज टेंडन इंजरी और पिंडली में ऐंठन (Cramps)।',
  },
};

/**
 * Translates an anatomical English name into an informative Hindi title and description
 */
export function getLocalizedAnatomicalName(name: string, system?: string): { hindiName: string; description: string; clinical: string } {
  const lower = name.toLowerCase().replace(/[\s\-_]+/g, '_');

  for (const [key, val] of Object.entries(HINDI_ANATOMICAL_DICTIONARY)) {
    if (lower.includes(key)) {
      return {
        hindiName: val.hindi,
        description: val.functionDesc || `${name} (${system || 'शारीरिक'} तंत्र) का आवश्यक अंग है।`,
        clinical: val.clinical || 'नियमित स्वास्थ्य जांच और क्लिनिकल परीक्षण द्वारा स्वस्थ रखा जाता है।',
      };
    }
  }

  // Generic intelligent translation fallback
  let hindiTerm = name;
  if (lower.includes('bone') || lower.includes('skeleton')) {
    hindiTerm = `${name} (अस्थि संरचना)`;
  } else if (lower.includes('muscle')) {
    hindiTerm = `${name} (पेशीय संरचना)`;
  } else if (lower.includes('artery')) {
    hindiTerm = `${name} (धमनी)`;
  } else if (lower.includes('vein')) {
    hindiTerm = `${name} (शिरा)`;
  } else if (lower.includes('nerve')) {
    hindiTerm = `${name} (तंत्रिका)`;
  } else if (lower.includes('cartilage')) {
    hindiTerm = `${name} (उपास्थि)`;
  } else if (lower.includes('ligament')) {
    hindiTerm = `${name} (स्नायुबंध)`;
  }

  return {
    hindiName: hindiTerm,
    description: `${name} मानव शरीर के ${system || 'शारीरिक'} तंत्र की एक महत्वपूर्ण संरचना है।`,
    clinical: `${name} की संरचना और कार्यप्रणाली का अध्ययन मेडिकल साइंस में महत्वपूर्ण स्थान रखता है।`,
  };
}

/**
 * Resolves ANY 3D clicked part (male/female/universal bones, muscles, organs)
 * into a rich StudyPartItem ready to display in the side reader or inspector.
 */
export function resolveAnatomicalPart(
  partId: string,
  atlas: AtlasData | null,
  activeGender: 'male' | 'female'
): { part: StudyPartItem; chapterIndex?: number; partIndex?: number } | null {
  // 1. First, search if part matches curated BOOK_CHAPTERS
  for (let cIdx = 0; cIdx < BOOK_CHAPTERS.length; cIdx++) {
    const ch = BOOK_CHAPTERS[cIdx];
    const pIdx = ch.parts.findIndex(p => p.id === partId || p.elements.includes(partId));
    if (pIdx >= 0) {
      return {
        part: ch.parts[pIdx],
        chapterIndex: cIdx,
        partIndex: pIdx,
      };
    }
  }

  // 2. If female model is active, search FEMALE_MESH_CATALOG
  if (activeGender === 'female') {
    const fItem = FEMALE_MESH_CATALOG.find(p => p.id === partId);
    if (fItem) {
      const loc = getLocalizedAnatomicalName(fItem.name, fItem.system);
      const studyItem: StudyPartItem = {
        id: fItem.id,
        name: fItem.name,
        hindiName: fItem.hindiName || loc.hindiName,
        latinName: fItem.fmaId || fItem.name,
        system: fItem.system,
        elements: [fItem.id],
        locationHinglish: `महिला शरीर रचना (${fItem.system} तंत्र) की संरचना।`,
        functionHinglish: fItem.description || loc.description,
        funFactHinglish: fItem.fmaId ? `HuBMAP VHF 1.5 संदर्भ कोड: ${fItem.fmaId}` : 'HuBMAP वैज्ञानिक 3D मेश',
        clinicalNoteHinglish: loc.clinical,
        relatedDiseases: [],
        treatmentsHinglish: [
          'नियमित स्त्री रोग (Gynecological) स्वास्थ्य परीक्षण और सोनोग्राफी।',
          'संतुलित पोषण, हाइड्रेशन एवं नियमित व्यायाम द्वारा स्वस्थ जीवनशैली।',
        ],
        homeRemedies: [
          'पर्याप्त जलपान और पौष्टिक संतुलित आहार लें।',
          'शारीरिक तनाव और अत्यधिक थकान से बचें।',
        ],
      };
      return { part: studyItem };
    }
  }

  // 3. Search in atlas.parts (BodyParts3D 2,234 parts)
  if (atlas && atlas.parts) {
    const atlasPart = atlas.parts.find(p => p.id === partId);
    if (atlasPart) {
      const loc = getLocalizedAnatomicalName(atlasPart.name, atlasPart.system);
      const studyItem: StudyPartItem = {
        id: atlasPart.id,
        name: atlasPart.name,
        hindiName: loc.hindiName,
        latinName: atlasPart.conceptId || atlasPart.name,
        system: atlasPart.system,
        elements: [atlasPart.id],
        locationHinglish: `मानव शरीर के ${atlasPart.system} तंत्र में स्थित।`,
        functionHinglish: loc.description,
        funFactHinglish: `FMA स्रोत कोड: ${atlasPart.conceptId} · BodyParts3D संदर्भ संरचना।`,
        clinicalNoteHinglish: loc.clinical,
        relatedDiseases: [],
        treatmentsHinglish: [
          'लक्षण या गंभीर दर्द होने पर योग्य चिकित्सक / विशेषज्ञ से परामर्श लें।',
          'आवश्यकतानुसार एक्स-रे, एमआरआई या अल्ट्रासाउंड जांच कराएं।',
        ],
        homeRemedies: [
          'प्रभावित हिस्से को आराम दें और भारी वजन उठाने से बचें।',
          'हल्की गर्म या ठंडी सिकाई से आराम मिल सकता है।',
        ],
      };
      return { part: studyItem };
    }
  }

  return null;
}
