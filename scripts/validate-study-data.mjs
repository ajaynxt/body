import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL(path, import.meta.url), 'utf8');
const [
  femaleAtlasText, chaptersSource, questionBankSource, quizSource, appSource,
  bookReaderSource, controlsOverlaySource, anatomyVisualSource, librarySource, starterContentSource,
  threeViewerSource, threeCanvasSource, cacheSource, studyLibrarySource, pdfReaderSource, indexCssSource, headerSource,
] = await Promise.all([
  read('../public/models/atlas-female.json'),
  read('../src/data/chapters.ts'),
  read('../src/data/questionBankEngine.ts'),
  read('../src/components/StudentQuizModal.tsx'),
  read('../src/App.tsx'),
  read('../src/components/BookReader.tsx'),
  read('../src/components/ControlsOverlay.tsx'),
  read('../src/components/AnatomyStudyVisual.tsx'),
  read('../src/utils/libraryStorage.ts'),
  read('../src/data/starterBookContents.ts'),
  read('../src/engine/ThreeViewer.ts'),
  read('../src/components/ThreeCanvas.tsx'),
  read('../src/utils/cacheStorage.ts'),
  read('../src/components/StudyLibrary.tsx'),
  read('../src/components/PDFBookReader.tsx'),
  read('../src/index.css'),
  read('../src/components/Header.tsx'),
]);

const femaleAtlas = JSON.parse(femaleAtlasText);
assert.equal(femaleAtlas.sex, 'female', 'The female anatomy model must identify its reference sex.');
assert.ok(Array.isArray(femaleAtlas.parts) && femaleAtlas.parts.length > 0, 'Female atlas must contain model parts.');

const atlasPartIds = new Set();
for (const part of femaleAtlas.parts) {
  assert.ok(part.id?.trim(), 'Every female atlas part must have an ID.');
  assert.ok(part.name?.trim(), `Female atlas part ${part.id} must have a name.`);
  assert.ok(!atlasPartIds.has(part.id), `Duplicate female atlas ID: ${part.id}`);
  assert.ok(Number.isInteger(part.chunk) && femaleAtlas.chunks[part.chunk], `Invalid geometry chunk for ${part.id}`);
  atlasPartIds.add(part.id);
}

const femaleStart = chaptersSource.indexOf("id: 'chapter-female-reproductive'");
const maleStart = chaptersSource.indexOf("id: 'chapter-male-reproductive'", femaleStart + 1);
assert.ok(femaleStart >= 0 && maleStart > femaleStart, 'Female and male reproductive chapters must both exist.');
const femaleSection = chaptersSource.slice(femaleStart, maleStart);
const expectedTopics = {
  'uterus-womb': ['HRAF0435', 'HRAF0436', 'HRAF0439', 'HRAF0440'],
  'ovaries-paired': ['HRAF0432', 'HRAF0433'],
  'fallopian-tubes': ['HRAF0408', 'HRAF0409', 'HRAF0410', 'HRAF0411', 'HRAF0412', 'HRAF0413', 'HRAF0414', 'HRAF0415', 'HRAF0434'],
  'mammary-glands': ['HRAF0004', 'HRAF0005', 'HRAF0006', 'HRAF0007', 'HRAF0008', 'HRAF0009', 'HRAF0010', 'HRAF0011', 'HRAF0012', 'HRAF0013', 'HRAF0014', 'HRAF0015', 'HRAF0016', 'HRAF0017', 'HRAF0018', 'HRAF0019'],
  'cervix-vagina': ['HRAF0406', 'HRAF0407', 'HRAF0441'],
};
let mappedElementCount = 0;
for (const [topicId, expectedIds] of Object.entries(expectedTopics)) {
  const topicStart = femaleSection.indexOf(`id: '${topicId}'`);
  assert.ok(topicStart >= 0, `Missing female study topic: ${topicId}`);
  const nextTopic = femaleSection.indexOf("\n        id: '", topicStart + 1);
  const elementsStart = femaleSection.indexOf('elements:', topicStart);
  assert.ok(elementsStart >= 0 && (nextTopic < 0 || elementsStart < nextTopic), `Missing elements mapping for ${topicId}`);
  const openBracket = femaleSection.indexOf('[', elementsStart);
  const closeBracket = femaleSection.indexOf(']', openBracket);
  assert.ok(openBracket >= 0 && closeBracket > openBracket, `Invalid elements array for ${topicId}`);
  const actualIds = [...femaleSection.slice(openBracket + 1, closeBracket).matchAll(/'([^']+)'/g)].map(match => match[1]);
  assert.deepEqual(actualIds, expectedIds, `Unexpected female atlas mapping for ${topicId}`);
  for (const id of actualIds) {
    assert.ok(atlasPartIds.has(id), `Female study topic ${topicId} refers to missing model part ${id}`);
    mappedElementCount++;
  }
}
assert.ok(mappedElementCount >= 20, 'Female study mappings are incomplete.');

assert.match(questionBankSource, /generateRandomQuestion\([^)]*chapters:\s*BookChapter\[\]/, 'Question engine must accept the active chapter edition.');
assert.doesNotMatch(questionBankSource, /FEMALE_MESH_CATALOG/, 'Quiz generation must not use the legacy, partially unnamed female catalog.');
assert.match(questionBankSource, /const femaleParts = chapters\.find/, 'Female quiz questions must come from the female Study chapter.');
assert.match(quizSource, /generateRandomQuestion\(filter, studyChapters\)/, 'Quiz generation must receive active chapters.');
assert.match(quizSource, /const part = studyParts\.find/, 'Quiz 3D links must look up active-edition study parts.');
assert.match(appSource, /<StudentQuizModal[\s\S]*?chapters=\{activeChapters\}/, 'App must pass active gender chapters to the quiz.');
assert.match(bookReaderSource, /AnatomyStudyVisual/, 'Each individual Study page must include its anatomy visual.');
assert.match(anatomyVisualSource, /mammaryGland/, 'Mammary study topics must use a dedicated mammary anatomy diagram.');
assert.match(anatomyVisualSource, /mammary|breast|nipple|areola/, 'Female breast structures must resolve to the mammary diagram.');
assert.match(appSource, /try\s*\{\s*const saved = window\.localStorage\.getItem\('anatomy_atlas_theme'\)/, 'Theme initialization must survive disabled browser storage.');
assert.match(appSource, /atlasLoadError/, 'Atlas load failures must be tracked instead of leaving a spinner forever.');
assert.match(appSource, /onRetryAtlas=\{\(\) => setAtlasLoadAttempt/, 'Atlas loading must offer a retry action.');
assert.match(threeViewerSource, /public isReady\(\): boolean/, 'ThreeViewer must expose initialization state.');
assert.match(threeViewerSource, /if \(!this\.renderer \|\| !this\.scene \|\| !this\.camera \|\| !this\.controls\) return/, 'ThreeViewer must stop safely when WebGL initialization fails.');
assert.match(threeCanvasSource, /if \(!viewer\.isReady\(\)\)/, 'Canvas must not register a partially initialized viewer.');
assert.match(cacheSource, /anatomy-models-v2/, 'Model-cache version must change when stale model assets could be reused.');
assert.match(librarySource, /const DB_VERSION = 2/, 'Study library schema must migrate existing users safely.');
assert.match(librarySource, /starter-books-v1/, 'Starter-book migration must be tracked in IndexedDB.');
assert.match(librarySource, /missingStarterBooks = STARTER_BOOKS\.filter/, 'Migration must add only missing starter books and preserve user books.');
assert.match(studyLibrarySource, /MAX_PDF_SIZE_BYTES = 150 \* 1024 \* 1024/, 'PDF upload must enforce its advertised 150 MB limit.');
assert.match(studyLibrarySource, /valid, non-password-protected PDF/, 'Invalid PDFs must be rejected before saving instead of being recorded as readable.');
assert.doesNotMatch(studyLibrarySource, /doc\.destroy\(\)/, 'PDF.js preflight must use only supported PDFDocumentProxy APIs.');
assert.match(studyLibrarySource, /loadingTask\.destroy\(\)/, 'PDF upload validation must release its temporary PDF.js worker.');
assert.match(pdfReaderSource, /aria-label="PDF zoom level"/, 'PDF pages need an accessible fine-grained zoom slider.');
assert.match(pdfReaderSource, /document\.addEventListener\('fullscreenchange'/, 'Fullscreen state must follow browser controls such as Escape.'); 
assert.match(pdfReaderSource, /MAX_PDF_SIZE_BYTES = 150 \* 1024 \* 1024/, 'Attaching a PDF in the reader must use the library size limit.');
assert.match(pdfReaderSource, /Math\.min\(startPage, loadedPdf\.numPages\)/, 'Restored PDF progress must be clamped to the actual page count.');
assert.match(pdfReaderSource, /pdfLoadingTasksRef\.current\.delete\(pdfDoc\)/, 'PDF.js loading tasks must be released when a reader closes or changes documents.');
assert.match(pdfReaderSource, /loadingTask\.destroy\(\)\.catch\(cleanupErr/, 'Unreadable saved PDFs must release temporary PDF.js workers.');
assert.match(pdfReaderSource, /Math\.min\(currentPage, loadedPdf\.numPages\)/, 'Replacing a PDF must clamp the current page to the new document.');
assert.match(pdfReaderSource, /AnatomyStudyVisual/, 'Built-in study pages must include visual anatomy references.');
assert.match(anatomyVisualSource, /anatomy-image-lightbox/, 'Study diagrams must open into an enlarged lightbox.');
assert.match(anatomyVisualSource, /aria-label="Diagram zoom level"/, 'Enlarged diagrams need an accessible zoom slider.');
assert.match(anatomyVisualSource, /setZoomScale\(scale => Math\.min\(4/, 'Diagram zoom should support detailed close-up inspection.');
assert.match(indexCssSource, /\.anatomy-image-lightbox__viewport/, 'Image zoom view must scroll when an image exceeds the viewport.');
assert.match(indexCssSource, /@media \(max-width: 680px\)/, 'Diagram and PDF zoom controls need mobile layout rules.');
assert.match(indexCssSource, /RESPONSIVE REPAIR — Phone, tablet, laptop and desktop/, 'Responsive regression rules must be present in the global stylesheet.');
assert.match(indexCssSource, /grid-template-areas:[\s\S]*"brand gender"[\s\S]*"modes tools"/, 'Compact headers must use predictable responsive rows.');
assert.match(indexCssSource, /@media screen and \(min-width: 769px\) and \(max-width: 1280px\)/, 'Compact laptop widths need a dedicated header and viewer layout.');
assert.match(indexCssSource, /@media screen and \(max-width: 768px\) and \(orientation: landscape\)/, 'Small landscape screens need a side-by-side atlas layout.');
assert.match(indexCssSource, /\.pdf-page-canvas[\s\S]*?max-width: none !important/, 'Mobile PDF zoom must not be CSS-shrunk to fit the phone width.');
assert.match(indexCssSource, /prefers-reduced-motion: reduce/, 'Reduced-motion preferences must be respected.');
assert.match(controlsOverlaySource, /aria-expanded=\{isDockExpanded\}/, 'The 3D dock toggle must announce its expanded state.');
assert.match(controlsOverlaySource, /aria-controls="anatomy-explode-controls"/, 'The 3D dock toggle must reference its expandable control panel.');
assert.match(anatomyVisualSource, /getFocusableElements/, 'The diagram lightbox must keep keyboard focus inside the dialog.');
assert.match(anatomyVisualSource, /document\.body\.style\.overflow = 'hidden'/, 'Opening a zoomed diagram must prevent background page scrolling.');
assert.match(headerSource, /aria-expanded=\{isToolsMenuOpen\}/, 'Medical tools menu must expose its expanded state.');
assert.match(headerSource, /aria-expanded=\{isLangMenuOpen\}/, 'Language menu must expose its expanded state.');
assert.match(indexCssSource, /diagnostics-list-pane[\s\S]*?flex: 0 0 clamp\(176px, 30dvh, 260px\)/, 'Stacked diagnostics view must bound the list pane so the details remain reachable.');
assert.match(indexCssSource, /input,[\s\S]*?font-size: 16px/, 'Mobile form controls must avoid browser focus zoom.');
assert.match(questionBankSource, /hasLatinParts = eligibleParts\.some/, 'Latin-name questions must only be selected when data exists.');
assert.match(questionBankSource, /hasMnemonicParts = eligibleParts\.some/, 'Mnemonic questions must only be selected when data exists.');
assert.match(questionBankSource, /new Set\([\s\S]*treatment !== correctTreatment/, 'Treatment answer choices must not duplicate the correct answer.');
for (const filter of ['respiratory', 'digestive', 'urinary', 'reproductive']) {
  assert.ok(quizSource.includes(`handleFilterChange('${filter}')`), `Missing quiz filter button: ${filter}`);
}

const starterStart = librarySource.indexOf('export const STARTER_BOOKS: StudyBook[] = [');
const starterEnd = librarySource.indexOf('\n];', starterStart);
assert.ok(starterStart >= 0 && starterEnd > starterStart, 'Starter study books must be defined.');
const starterBookIds = [...librarySource.slice(starterStart, starterEnd).matchAll(/id:\s*'([^']+)'/g)].map(match => match[1]);
const starterContentIds = [...starterContentSource.matchAll(/^\s*['"]?(starter_[\w-]+)['"]?\s*:/gm)].map(match => match[1]);
assert.deepEqual([...new Set(starterContentIds)].sort(), [...new Set(starterBookIds)].sort(), 'Every starter Study book must have matching built-in reader content.');

console.log(`Study data validation passed: ${femaleAtlas.parts.length} female atlas parts, ${mappedElementCount} mapped female study elements, ${starterBookIds.length} starter books.`);
