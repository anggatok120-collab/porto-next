import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';

const source=await readFile(new URL('../app/page.js',import.meta.url),'utf8');
const baseline=JSON.parse(await readFile(new URL('./portfolio-baseline.json',import.meta.url),'utf8'));
const hash=value=>createHash('sha256').update(value.replaceAll('\r\n','\n')).digest('hex');
for(const [id,expected] of Object.entries(baseline.sections)){
  const at=source.indexOf(`id="${id}"`);
  assert.notEqual(at,-1,`Missing section: ${id}`);
  assert.equal(hash(source.slice(at,source.indexOf('</section>',at))),expected,`Original content changed: ${id}`);
}
const links=[...source.matchAll(/href="([^"]*)"/g)].map(m=>m[1]).sort();
const translations=[...source.matchAll(/data-(?:id|en)(?:-ph)?="[^"]*"/g)].map(m=>m[0]).sort();
assert.deepEqual(links,baseline.links,'Original navigation, contact, CV, or project links changed');
assert.equal(translations.length,baseline.translationCount);
assert.equal(hash(JSON.stringify(translations)),baseline.translationsHash,'Original bilingual copy changed');
const sketchbook=await readFile(new URL('../public/landing-pages/angga-sketchbook.html',import.meta.url),'utf8');
assert.doesNotMatch(sketchbook,/Meng To|hello@mengto|Singapore|Design\+Code/);
assert.match(sketchbook,/Angga/);
assert.match(sketchbook,/\/portfolio-sketchbook\//);
console.log(`Original portfolio preserved: ${Object.keys(baseline.sections).length} complete sections, ${links.length} links, ${translations.length} bilingual text attributes. No demo identity in the active sketchbook.`);
