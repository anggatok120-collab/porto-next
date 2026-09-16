// Build content plates from the real portfolio, using the original ThreeUI
// page geometry and engine. No biography, employment, or contact data is invented.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const source = await readFile('app/page.js','utf8');
const canonical = await readFile('public/landing-pages/meng-to-sketchbook.html','utf8');
const portrait = (await sharp('public/images/foto_HD.png').resize({width:620}).jpeg({quality:90}).toBuffer()).toString('base64');
const decode = value => value.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'");
const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function section(id) {
  const start = source.indexOf(`id="${id}"`);
  if(start<0) throw new Error(`Missing portfolio section ${id}`);
  return source.slice(start,source.indexOf('</section>',start));
}
function texts(fragment,lang) {
  return [...new Set([...fragment.matchAll(new RegExp(`data-${lang}="([^"]*)"`,'g'))].map(match=>decode(match[1])))];
}
function classTexts(fragment,cls) {
  return [...fragment.matchAll(new RegExp(`className="${cls}"[^>]*>([^<]+)<`,'g'))].map(match=>decode(match[1]));
}
function wrap(text,max=34) {
  const lines=[];
  let line='';
  for(const word of text.split(/\s+/)) {
    if((line+' '+word).trim().length>max&&line){lines.push(line);line='';}
    line+=(line?' ':'')+word;
  }
  if(line)lines.push(line);
  return lines;
}
function block(lines,x,y,size=36,lineHeight=51) {
  return `<text x="${x}" y="${y}" font-family="Georgia, serif" font-size="${size}" fill="#39352c">${lines.map((line,i)=>`<tspan x="${x}" dy="${i?lineHeight:0}">${escape(line)}</tspan>`).join('')}</text>`;
}
const chapters=[
  {id:'about',title:{id:'Tentang Saya',en:'About Me'}},
  {id:'services',title:{id:'Layanan',en:'Services'}},
  {id:'skills',title:{id:'Kemampuan & Tools',en:'Skills & Tools'}},
  {id:'experience',title:{id:'Pengalaman Kerja',en:'Work Experience'}},
  {id:'education',title:{id:'Pendidikan',en:'Education'}},
  {id:'projects',title:{id:'Proyek',en:'Projects'}},
  {id:'hero',title:{id:'Angga',en:'Angga'}},
  {id:'tools',title:{id:'Tools & Platform',en:'Tools & Platform'}},
  {id:'contact',title:{id:'Hubungi Saya',en:'Contact Me'}},
];
await mkdir('public/portfolio-sketchbook',{recursive:true});
const pages={id:[],en:[]};
for(const lang of ['id','en']) {
  for(const [index,chapter] of chapters.entries()) {
    const fragment=section(chapter.id==='tools'?'skills':chapter.id);
    const strings=texts(fragment,lang);
    let items=strings.filter(text=>text!==chapter.title[lang]&&text.length>34);
    if(chapter.id==='experience') items=classTexts(fragment,'timeline__company');
    if(chapter.id==='services') items=classTexts(fragment,'service-card__title');
    if(chapter.id==='tools') items=[...fragment.matchAll(/data-tool="([^"]+)"/g)].map(match=>match[1]);
    if(chapter.id==='skills') items=strings.filter(text=>text.length<34).slice(2);
    if(chapter.id==='contact') items=['anggatok120@gmail.com','085147470379','Malang, Jawa Timur, Indonesia'];
    const paragraphs=items.flatMap(text=>[...wrap(text), '']);
    const heading=block(wrap(chapter.title[lang],22), 170,400,66,75);
    const content = chapter.id==='hero'
      ? `<image href="data:image/jpeg;base64,${portrait}" x="160" y="315" width="650" height="600" preserveAspectRatio="xMidYMin slice" clip-path="url(#photo)"/>${block(['Angga'],970,444,110)}${block(['Network Engineer','Customer Support'],974,530,37,60)}<path d="M974 655h500" stroke="#aea38e"/>${block(['Malang, Indonesia','2.5+ '+(lang==='id'?'Tahun':'Years'),'24/7 NOC'],974,735,34,59)}`
      : `${heading}${block(paragraphs.slice(0,8),170,580,35,43)}${block(paragraphs.slice(8,21),970,402,35,42)}`;
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1760" height="1240" viewBox="0 0 1760 1240" role="img" aria-label="${escape(chapter.title[lang])}">
<defs><linearGradient id="left"><stop stop-color="#fbf7ed"/><stop offset=".88" stop-color="#f5efdf"/><stop offset="1" stop-color="#d7cbb4"/></linearGradient><linearGradient id="right"><stop stop-color="#c6b99d"/><stop offset=".035" stop-color="#ede4d1"/><stop offset=".18" stop-color="#f8f2e5"/><stop offset="1" stop-color="#faf6eb"/></linearGradient><filter id="grain"><feTurbulence baseFrequency=".65" numOctaves="3" seed="7" type="fractalNoise"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".06"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter><clipPath id="paper"><rect x="90" y="270" width="1580" height="700" rx="20"/></clipPath><clipPath id="photo"><rect x="160" y="315" width="650" height="600" rx="8"/></clipPath></defs>
<g clip-path="url(#paper)"><rect x="90" y="270" width="790" height="700" fill="url(#left)"/><rect x="880" y="270" width="790" height="700" fill="url(#right)"/><rect x="90" y="270" width="1580" height="700" fill="transparent" filter="url(#grain)"/>${content}<path d="M880 278v684" stroke="#bbae96" stroke-width="1"/><text x="1580" y="928" text-anchor="end" font-family="Georgia,serif" font-size="24" fill="#827967">${String(index+1).padStart(2,'0')}</text></g></svg>`;
    const file=`${chapter.id}-${lang}.svg`;
    await writeFile(`public/portfolio-sketchbook/${file}`,svg);
    pages[lang].push({file,title:chapter.title[lang],place:'',section:chapter.id==='tools'?'skills':chapter.id});
  }
}
let html=canonical
  .replace('Meng To — sketchbook hero.','Angga — portfolio sketchbook hero.')
  .replace('<title>Meng To</title>','<title>Angga | Portfolio Sketchbook</title>')
  .replace('content="designer, creator, AI educator — Singapore"','content="Angga — Network Engineer, NOC, dan IT Support"')
  .replace(/<header class="top">[\s\S]*?<\/header>/,'')
  .replace(/<section id="about"[\s\S]*?<\/section>/,'<div id="about" hidden></div>')
  .replace(/<p class="foot"[^]*?<\/p>/,'')
  .replace(/<div class="wash"[^]*?<\/div>/,'')
  .replace(/<p class="hero-kicker">[^]*?<\/p>/,'')
  .replace(/<img class="botany [^>]+>/g,'')
  .replace("const DIR='meng-to-sketchbook/';","const DIR='/portfolio-sketchbook/';")
  .replace(/const PAGES=\[[\s\S]*?\];/,`const PAGES=Q.get('lang')==='en'?${JSON.stringify(pages.en)}:${JSON.stringify(pages.id)};`)
  .replace('Drag the page to turn · Drag the glass across it','Geser halaman · Geser kaca pembesar')
  .replace('</style>',`/* Portfolio-only scene. The full accessible content lives in the parent page. */
html,body{background:transparent;overflow:hidden}
.hero{min-height:0;padding:0;display:block}
.sb-wrap{gap:12px;padding-top:4px}
.sb-stage{margin-top:-13%;margin-bottom:-12%}
.sb-caption{font-size:13px;letter-spacing:.12em;color:#5e574c}
.sb-hint{font-size:10px;color:#6c6456}
.sb-arrow{color:#6c6456}
.sb-tools{background:#f7f1e5}
.hero-down,.rule,.plates{display:none}
.sb-3d{max-width:900px}
@media(max-width:640px){.sb-wrap{width:100%;margin:0}.sb-stage{margin-top:-13%;margin-bottom:-12%}.sb-hint{font-size:9px}}
</style>`)
  .replace("const Q=new URLSearchParams(location.search);",`const Q=new URLSearchParams(location.search);
document.documentElement.lang=Q.get('lang')==='en'?'en':'id';
if(Q.get('lang')==='en') document.getElementById('sbHint').textContent='Drag the page to turn · Drag the glass across it';`);
if(/Meng To|hello@mengto|Designer \/ Creator|Singapore/.test(html)) throw new Error('Demo identity remains in derived document');
await writeFile('public/landing-pages/angga-sketchbook.html',html.replace(/[\t ]+$/gm,'').trimEnd()+'\n');
console.log('Built 18 bilingual portfolio plates and a derived sketchbook using the original page-turn engine.');
