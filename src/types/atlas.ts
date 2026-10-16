export interface AtlasChunk {
  url: string;
  bytes: number;
  gzip: string;
  gzipBytes: number;
}

export interface AtlasPart {
  id: string; // e.g. FJ1252
  name: string; // e.g. Gingiva of upper jaw
  conceptId: string; // e.g. FMA59763
  system: string; // e.g. skeletal
  chunk: number;
  positions: number; // byte offset in chunk
  normals: number;
  indices: number;
  vertexCount: number;
  indexCount: number;
  bounds: [[number, number, number], [number, number, number]]; // [min, max]
}

export interface AtlasConcept {
  id: string; // e.g. FMA3710
  name: string; // e.g. vascular tree
  elements: string[]; // array of part IDs
}

export interface AtlasData {
  version: string;
  sex: string;
  source: string;
  scope: string;
  triangles: number;
  sourceTriangles: number;
  chunks: AtlasChunk[];
  parts: AtlasPart[];
  concepts: AtlasConcept[];
}

export interface AnatomicalSystem {
  id: string;
  name: string;
  hindiName: string;
  color: string;
  description: string;
  hindiDescription: string;
  keyOrgans: string[];
  totalParts?: number;
}

export interface ClinicalDisease {
  id: string;
  name: string;
  hindiName: string;
  system: string;
  affectedPartNames: string[];
  affectedElements?: string[]; // Part IDs or Concept IDs to isolate in 3D
  overview: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  severity: 'mild' | 'moderate' | 'critical' | 'chronic';
}

export interface MedicalCitation {
  book: string; // e.g. "Gray's Anatomy (42nd Ed)", "BD Chaurasia Vol 1", "Guyton & Hall Physiology"
  citation: string; // e.g. "Ch. 53: Thorax & Heart, pp. 980-994"
  highYieldFact: string; // Golden takeaway for exams
}

export interface StudyPartItem {
  id: string; // Concept ID or Part ID
  name: string;
  hindiName: string;
  latinName?: string;
  system: string;
  elements: string[]; // part IDs
  locationHinglish: string;
  functionHinglish: string;
  funFactHinglish: string;
  clinicalNoteHinglish: string;
  relatedDiseases: string[];
  
  // Multilingual & Textbook Extensions
  locationHindi?: string;
  locationEn?: string;
  functionHindi?: string;
  functionEn?: string;
  funFactHindi?: string;
  funFactEn?: string;
  clinicalNoteHindi?: string;
  clinicalNoteEn?: string;
  
  pronunciation?: string;
  highYieldMnemonic?: string;
  examPearls?: string[];
  citations?: MedicalCitation[];
}

export interface BookChapter {
  id: string;
  chapterNumber: number;
  systemId: string;
  title: string;
  hindiTitle: string;
  subtitle: string;
  introductionHinglish: string;
  howItWorksHinglish: string;
  
  introductionHindi?: string;
  introductionEn?: string;
  howItWorksHindi?: string;
  howItWorksEn?: string;
  
  recommendedBooks?: string[];
  parts: StudyPartItem[];
  commonDiseases: ClinicalDisease[];
}
