import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL(path, import.meta.url), 'utf8');
const [femaleAtlasText, chaptersSource, questionBankSource, quizSource, appSource, bookReaderSource, anatomyVisualSource, librarySource, starterContentSource] =
  await Promise.all([
    read('../public/models/atlas-female.json'),
    read('../src/data/chapters.ts'),
    read('../src/data/questionBankEngine.ts'),
    read('../src/components/StudentQuizModal.tsx'),
    read('../src/App.tsx'),
    read('../src/components/BookReader.tsx'),
    read('../src/components/AnatomyStudyVisual.tsx'),
    read('../src/utils/libraryStorage.ts'),
    read('../src/data/starterBookContents.ts'),
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
assert.match(anatomyVisualSource, /mammary\|breast\|nipple\|areola/, 'Female breast structures must resolve to the mammary diagram.');

const starterStart = librarySource.indexOf('export const STARTER_BOOKS: StudyBook[] = [');
const starterEnd = librarySource.indexOf('\n];', starterStart);
assert.ok(starterStart >= 0 && starterEnd > starterStart, 'Starter study books must be defined.');
const starterBookIds = [...librarySource.slice(starterStart, starterEnd).matchAll(/id:\s*'([^']+)'/g)].map(match => match[1]);
const starterContentIds = [...starterContentSource.matchAll(/^\s*['"]?(starter_[\w-]+)['"]?\s*:/gm)].map(match => match[1]);
assert.deepEqual([...new Set(starterContentIds)].sort(), [...new Set(starterBookIds)].sort(), 'Every starter Study book must have matching built-in reader content.');

console.log(`Study data validation passed: ${femaleAtlas.parts.length} female atlas parts, ${mappedElementCount} mapped female study elements, ${starterBookIds.length} starter books.`);
