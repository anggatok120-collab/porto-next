import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('vendor/threeui/source-manifest.json', root), 'utf8'));

for (const file of manifest.files) {
  const bytes = await readFile(new URL(file.path, root));
  assert.equal(bytes.length, file.bytes, `Byte count changed: ${file.path}`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), file.sha256, `SHA-256 changed: ${file.path}`);
}

const original = await readFile(new URL('vendor/threeui/src/shaders/landing-pages/LandingPages.tsx', root), 'utf8');
const entry = await readFile(new URL('vendor/threeui/index.tsx', root), 'utf8');
const exportPattern = /export function MengToSketchbookLandingPage\([^]*?\n}/;
assert.ok(original.match(exportPattern), 'Registered component export missing');
assert.equal(entry.match(exportPattern)?.[0], original.match(exportPattern)[0], 'Component differs from the registered source');

const frame = await readFile(new URL('vendor/threeui/src/shaders/landing-pages/LandingPageFrame.tsx', root), 'utf8');
const compatibleFrame = await readFile(new URL('vendor/threeui/compat/LandingPageFrame.tsx', root), 'utf8');
assert.equal(compatibleFrame, frame
  .replace('from "./pageTypography"', 'from "../src/shaders/landing-pages/pageTypography"')
  .replace('if (!document) return;', 'if (!document?.documentElement) return;'),
  'Compatibility frame differs beyond the documented loading-document guard');

console.log(`ThreeUI ${manifest.revision}: ${manifest.files.length} files and the component export verified.`);
