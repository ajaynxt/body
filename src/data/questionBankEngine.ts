/**
 * Randomized medical and anatomy question engine.
 * Questions are generated locally from the bundled anatomy and disease reference data.
 * Includes six implemented question templates plus a system-classification fallback.
 */

import { BOOK_CHAPTERS } from './chapters';
import { CLINICAL_DISEASES } from './diseases';
import type { BookChapter, StudyPartItem, ClinicalDisease } from '../types/atlas';

export interface QuizQuestion {
  id: string;
  category: string;
  categoryHindi: string;
  questionText: string;
  questionHindi: string;
  options: string[];
  correctIndex: number;
  explanationHindi: string;
  explanationEn: string;
  relatedPartId?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'High-Yield NEET/USMLE';
  highYieldMnemonic?: string;
}

export type QuizFilterSystem =
  | 'all'
  | 'cardiac'
  | 'skeletal'
  | 'muscular'
  | 'nervous'
  | 'respiratory'
  | 'digestive'
  | 'urinary'
  | 'reproductive'
  | 'clinical';

// Diseases are shared reference data; study parts must follow the active gender edition.
const ALL_DISEASES: ClinicalDisease[] = CLINICAL_DISEASES;

/**
 * Shuffles an array with Fisher-Yates algorithm
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Picks N random elements from array excluding target
 */
function pickDistractors<T>(array: T[], count: number, excludePredicate: (item: T) => boolean): T[] {
  const filtered = array.filter(item => !excludePredicate(item));
  const shuffled = shuffle(filtered);
  return shuffled.slice(0, count);
}

/**
 * Generates a randomized question on the fly from the 1 Lakh+ pool.
 */
export function generateRandomQuestion(filter: QuizFilterSystem = 'all', chapters: BookChapter[] = BOOK_CHAPTERS): QuizQuestion {
  const chapterParts = chapters.flatMap(ch => ch.parts);
  const uniquePartMap = new Map<string, StudyPartItem>();
  chapterParts.forEach(part => {
    if (part.id?.trim() && part.name?.trim()) uniquePartMap.set(part.id, part);
  });
  const activeParts = uniquePartMap.size > 0
    ? Array.from(uniquePartMap.values())
    : BOOK_CHAPTERS.flatMap(ch => ch.parts).filter(part => part.id?.trim() && part.name?.trim());
  const femaleParts = chapters.find(ch => ch.id === 'chapter-female-reproductive')?.parts
    .filter(part => part.id?.trim() && part.name?.trim() && part.elements.some(Boolean)) ?? [];

  // Respect selected system even when it contains fewer than three study topics.
  let eligibleParts = activeParts;
  if (filter !== 'all' && filter !== 'clinical') {
    const filteredParts = activeParts.filter(part => part.system === filter);
    if (filteredParts.length > 0) eligibleParts = filteredParts;
  }
  const hasFemaleStudyContent = femaleParts.length > 0;
  const hasLatinParts = eligibleParts.some(part => !!part.latinName);
  const hasMnemonicParts = eligibleParts.some(part => !!part.memoryTrickHindi || !!part.highYieldMnemonic);

  // Keep each filter limited to the supported question types for that system.
  const archetypes: string[] = filter === 'clinical'
    ? ['emergency_red_flag', 'treatment_protocol']
    : filter === 'all'
      ? [
          'organ_function',
          ...(hasLatinParts ? ['latin_name'] : []),
          'emergency_red_flag',
          'treatment_protocol',
          ...(hasMnemonicParts ? ['memory_mnemonic'] : []),
          ...(hasFemaleStudyContent ? ['female_anatomy'] : []),
          'system_classification',
        ]
      : [
          'organ_function',
          ...(hasLatinParts ? ['latin_name'] : []),
          ...(hasMnemonicParts ? ['memory_mnemonic'] : []),
          ...(filter === 'reproductive' && hasFemaleStudyContent ? ['female_anatomy'] : []),
          'system_classification',
        ];

  const pickedType = archetypes[Math.floor(Math.random() * archetypes.length)] || 'organ_function';
  const randomSeed = Math.floor(Math.random() * 1000000);

  let eligibleDiseases = ALL_DISEASES;
  if (filter !== 'all' && filter !== 'clinical') {
    const filteredDiseases = ALL_DISEASES.filter(disease => disease.system === filter);
    if (filteredDiseases.length > 0) eligibleDiseases = filteredDiseases;
  }

  // --- ARCHETYPE 1: ORGAN FUNCTION (शरीर क्रिया) ---
  if (pickedType === 'organ_function') {
    const targetPart = eligibleParts[Math.floor(Math.random() * eligibleParts.length)];
    const distractors = pickDistractors(activeParts, 3, p => p.id === targetPart.id);

    const optionsRaw = [targetPart, ...distractors];
    const shuffledOptions = shuffle(optionsRaw);
    const correctIdx = shuffledOptions.findIndex(p => p.id === targetPart.id);

    return {
      id: `q-func-${targetPart.id}-${randomSeed}`,
      category: `${targetPart.system.toUpperCase()} SYSTEM`,
      categoryHindi: 'शारीरिक क्रिया एवं अंग पहचान',
      questionText: `Which organ or structure is primarily responsible for: "${targetPart.functionHinglish.slice(0, 110)}..."?`,
      questionHindi: `शरीर का कौन सा अंग यह मुख्य कार्य करता है: "${targetPart.functionHinglish}"?`,
      options: shuffledOptions.map(p => `${p.hindiName} (${p.name})`),
      correctIndex: correctIdx,
      explanationHindi: `${targetPart.hindiName} (${targetPart.name}): ${targetPart.functionHinglish} यह ${targetPart.locationHinglish}`,
      explanationEn: `${targetPart.name} performs this vital action in the ${targetPart.system} system.`,
      relatedPartId: targetPart.id,
      difficulty: 'Medium',
      highYieldMnemonic: targetPart.highYieldMnemonic,
    };
  }

  // --- ARCHETYPE 2: SCIENTIFIC / LATIN NAME (लैटिन वैज्ञानिक नाम) ---
  if (pickedType === 'latin_name') {
    const partsWithLatin = eligibleParts.filter(p => !!p.latinName);
    const targetPart = partsWithLatin[Math.floor(Math.random() * partsWithLatin.length)] || eligibleParts[0];
    const distractors = pickDistractors(partsWithLatin, 3, p => p.id === targetPart.id);

    const shuffled = shuffle([targetPart, ...distractors]);
    const correctIdx = shuffled.findIndex(p => p.id === targetPart.id);

    return {
      id: `q-latin-${targetPart.id}-${randomSeed}`,
      category: 'MEDICAL TERMINOLOGY & LATIN',
      categoryHindi: 'वैज्ञानिक एवं लैटिन शब्दावली',
      questionText: `What is the correct scientific/Latin anatomical nomenclature for "${targetPart.name}"?`,
      questionHindi: `"${targetPart.hindiName}" का सही वैज्ञानिक / लैटिन चिकित्सीय नाम क्या है?`,
      options: shuffled.map(p => p.latinName || p.name),
      correctIndex: correctIdx,
      explanationHindi: `${targetPart.hindiName} का प्रमाणिक लैटिन नाम "${targetPart.latinName}" है। ${targetPart.rootWordEtymology || ''}`,
      explanationEn: `The official Terminologia Anatomica designation for ${targetPart.name} is ${targetPart.latinName}.`,
      relatedPartId: targetPart.id,
      difficulty: 'High-Yield NEET/USMLE',
      highYieldMnemonic: targetPart.highYieldMnemonic,
    };
  }

  // --- ARCHETYPE 3: EMERGENCY RED FLAGS (खतरे के संकेत - डॉक्टर को कब दिखाएं) ---
  if (pickedType === 'emergency_red_flag') {
    const targetDisease = eligibleDiseases[Math.floor(Math.random() * eligibleDiseases.length)];
    const otherDiseases = pickDistractors(ALL_DISEASES, 3, d => d.id === targetDisease.id);

    const shuffled = shuffle([targetDisease, ...otherDiseases]);
    const correctIdx = shuffled.findIndex(d => d.id === targetDisease.id);

    const emergencyAdvice = targetDisease.treatment?.emergencyCare || 'गंभीर स्थिति में तुरंत डॉक्टर या आपातकालीन चिकित्सा सहायता लें।';
    const diagTests = targetDisease.treatment?.diagnosticTests?.join(', ') || 'Clinical Evaluation & Imaging';

    return {
      id: `q-redflag-${targetDisease.id}-${randomSeed}`,
      category: 'CLINICAL EMERGENCY & RED FLAGS',
      categoryHindi: 'आपातकालीन खतरे के लक्षण (Danger Signs)',
      questionText: `A patient exhibits: "${targetDisease.symptoms[0] || targetDisease.overview}". Which clinical emergency or diagnosis must be evaluated by a physician?`,
      questionHindi: `यदि किसी मरीज में यह गंभीर लक्षण दिखाई दें: "${targetDisease.symptoms[0] || targetDisease.overview}", तो तुरंत किस रोग की जांच करानी चाहिए?`,
      options: shuffled.map(d => `${d.hindiName} (${d.name})`),
      correctIndex: correctIdx,
      explanationHindi: `🚨 ${emergencyAdvice}`,
      explanationEn: `Immediate diagnostic evaluation is mandatory: ${diagTests}.`,
      difficulty: 'High-Yield NEET/USMLE',
    };
  }

  // --- ARCHETYPE 4: TREATMENT & MEDICATIONS (उपचार एवं दवाइयां) ---
  if (pickedType === 'treatment_protocol') {
    const targetDisease = eligibleDiseases[Math.floor(Math.random() * eligibleDiseases.length)];
    const correctTreatment = targetDisease.treatment?.medical[0] || 'R.I.C.E Protocol & Rest';
    
    // Pick distinct distractors so the correct treatment cannot appear twice.
    const otherTreatments = shuffle(Array.from(new Set(
      ALL_DISEASES
        .filter(d => d.id !== targetDisease.id && !!d.treatment?.medical)
        .flatMap(d => d.treatment?.medical || [])
        .filter(treatment => !!treatment && treatment !== correctTreatment)
    ))).slice(0, 3);

    const shuffled = shuffle([correctTreatment, ...otherTreatments]);
    const correctIdx = shuffled.findIndex(t => t === correctTreatment);

    const txMed = targetDisease.treatment?.medical?.join(' | ') || 'चिकित्सकीय परामर्श';
    const txHome = targetDisease.treatment?.homeCare?.join(' ') || 'पर्याप्त आराम';

    return {
      id: `q-tx-${targetDisease.id}-${randomSeed}`,
      category: 'PHARMACOLOGY & TREATMENT',
      categoryHindi: 'चिकित्सीय उपचार एवं औषधि विज्ञान',
      questionText: `What is the standard first-line medical intervention for "${targetDisease.name}"?`,
      questionHindi: `"${targetDisease.hindiName}" के लिए प्राथमिक चिकित्सकीय उपचार कौन सा है?`,
      options: shuffled,
      correctIndex: correctIdx,
      explanationHindi: `उपचार दिशानिर्देश: ${txMed}. घरेलू देखभाल: ${txHome}`,
      explanationEn: `Standard protocol includes: ${correctTreatment} with appropriate diagnostic monitoring.`,
      difficulty: 'High-Yield NEET/USMLE',
    };
  }

  // --- ARCHETYPE 5: MEMORY MNEMONIC (याद रखने की ट्रिक्स) ---
  if (pickedType === 'memory_mnemonic') {
    const partsWithMnemonics = eligibleParts.filter(p => !!p.memoryTrickHindi || !!p.highYieldMnemonic);
    const targetPart = partsWithMnemonics[Math.floor(Math.random() * partsWithMnemonics.length)] || eligibleParts[0];
    const distractors = pickDistractors(activeParts, 3, p => p.id === targetPart.id);

    const shuffled = shuffle([targetPart, ...distractors]);
    const correctIdx = shuffled.findIndex(p => p.id === targetPart.id);

    return {
      id: `q-mnem-${targetPart.id}-${randomSeed}`,
      category: 'HIGH-YIELD MNEMONIC',
      categoryHindi: 'याद रखने की शॉर्टकट ट्रिक (Memory Trick)',
      questionText: `Which structure is associated with the clinical mnemonic: "${targetPart.highYieldMnemonic || targetPart.memoryTrickHindi}"?`,
      questionHindi: `यह मेडिकल शॉर्टकट ट्रिक किस अंग या संरचना से संबंधित है: "${targetPart.memoryTrickHindi || targetPart.highYieldMnemonic}"?`,
      options: shuffled.map(p => `${p.hindiName} (${p.name})`),
      correctIndex: correctIdx,
      explanationHindi: `गोल्डन ट्रिक: ${targetPart.memoryTrickHindi || targetPart.highYieldMnemonic} — ${targetPart.clinicalNoteHinglish}`,
      explanationEn: `High-yield exam mnemonic for rapid recall of ${targetPart.name}.`,
      relatedPartId: targetPart.id,
      difficulty: 'Easy',
      highYieldMnemonic: targetPart.highYieldMnemonic || targetPart.memoryTrickHindi,
    };
  }

  // --- ARCHETYPE 6: FEMALE ANATOMY ---
  // Use the same female chapter parts as the Study reader so answers map to selectable HRA meshes.
  if (pickedType === 'female_anatomy' && femaleParts.length > 0) {
    const targetF = femaleParts[Math.floor(Math.random() * femaleParts.length)];
    const distractors = pickDistractors(femaleParts, 3, part => part.id === targetF.id);
    const shuffled = shuffle([targetF, ...distractors]);
    const correctIdx = shuffled.findIndex(part => part.id === targetF.id);
    const description = targetF.functionHinglish || targetF.locationHinglish || targetF.name;

    return {
      id: `q-female-${targetF.id}-${randomSeed}`,
      category: 'FEMALE ANATOMY',
      categoryHindi: 'महिला शरीर रचना विज्ञान',
      questionText: `Which female anatomical structure is described by this function or location: "${description}"?`,
      questionHindi: `इस कार्य या स्थान के विवरण से महिला शरीर का कौन-सा अंग मेल खाता है: "${description}"?`,
      options: shuffled.map(part => `${part.hindiName} (${part.name})`),
      correctIndex: correctIdx,
      explanationHindi: `${targetF.hindiName} (${targetF.name}): ${targetF.functionHinglish} स्थान: ${targetF.locationHinglish}`,
      explanationEn: `${targetF.name}: ${targetF.functionEn || targetF.functionHinglish} Location: ${targetF.locationEn || targetF.locationHinglish}`,
      relatedPartId: targetF.id,
      difficulty: 'Medium',
      highYieldMnemonic: targetF.highYieldMnemonic,
    };
  }

  // --- DEFAULT FALLBACK: SYSTEM CLASSIFICATION ---
  const fallbackPart = eligibleParts[Math.floor(Math.random() * eligibleParts.length)];
  const systemNames = [
    'cardiac', 'skeletal', 'muscular', 'nervous', 'respiratory', 'digestive', 'urinary',
    'reproductive', 'endocrine', 'lymphatic', 'sensory', 'arterial', 'venous',
    'integumentary', 'connective',
  ];
  const correctSys = fallbackPart.system;
  const distractorSystems = systemNames.filter(s => s !== correctSys).slice(0, 3);
  const shuffledSystems = shuffle([correctSys, ...distractorSystems]);
  const correctIdx = shuffledSystems.findIndex(s => s === correctSys);

  const sysHindiMap: Record<string, string> = {
    cardiac: 'हृदय एवं रक्त परिसंचरण तंत्र (Cardiovascular)',
    skeletal: 'कंकाल तंत्र (Skeletal System)',
    muscular: 'मांसपेशी तंत्र (Muscular System)',
    nervous: 'तंत्रिका तंत्र (Nervous System)',
    respiratory: 'श्वसन तंत्र (Respiratory System)',
    digestive: 'पाचन तंत्र (Digestive System)',
    urinary: 'उत्सर्जन तंत्र (Urinary System)',
    reproductive: 'प्रजनन तंत्र (Reproductive System)',
    endocrine: 'अंतःस्रावी तंत्र (Endocrine System)',
    lymphatic: 'लसिका एवं प्रतिरक्षा तंत्र (Lymphatic System)',
    sensory: 'संवेदी तंत्र (Sensory System)',
    arterial: 'धमनी परिसंचरण (Arterial System)',
    venous: 'शिरापरक परिसंचरण (Venous System)',
    integumentary: 'त्वचा एवं बाह्य आवरण (Integumentary System)',
    connective: 'संयोजी ऊतक तंत्र (Connective Tissue System)',
  };

  return {
    id: `q-sys-${fallbackPart.id}-${randomSeed}`,
    category: 'SYSTEM CLASSIFICATION',
    categoryHindi: 'शारीरिक तंत्र वर्गीकरण',
    questionText: `"${fallbackPart.name}" belongs to which fundamental physiological system?`,
    questionHindi: `"${fallbackPart.hindiName} (${fallbackPart.name})" शरीर के किस प्राथमिक तंत्र का हिस्सा है?`,
    options: shuffledSystems.map(s => sysHindiMap[s] || s),
    correctIndex: correctIdx,
    explanationHindi: `${fallbackPart.hindiName} ${sysHindiMap[correctSys]} का अभिन्न अंग है। स्थान: ${fallbackPart.locationHinglish}`,
    explanationEn: `${fallbackPart.name} functions within the ${correctSys} organ network.`,
    relatedPartId: fallbackPart.id,
    difficulty: 'Easy',
  };
}
