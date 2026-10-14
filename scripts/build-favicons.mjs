import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#181818"/>
      <stop offset="100%" stop-color="#090909"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.15"/>
    </linearGradient>
    <linearGradient id="textGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f5f5f5"/>
      <stop offset="100%" stop-color="#b8b8b8"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#ffffff" flood-opacity="0.25"/>
    </filter>
  </defs>
  
  <!-- Sleek container matching website card and navbar theme -->
  <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#bg)" stroke="url(#borderGrad)" stroke-width="2"/>
  
  <!-- Live network status dot (NOC / Network monitoring signature) -->
  <circle cx="51" cy="13" r="5" fill="#22c55e" fill-opacity="0.25"/>
  <circle cx="51" cy="13" r="2.8" fill="#22c55e"/>
  
  <!-- Brand monogram AG matching navbar -->
  <text x="31" y="42" text-anchor="middle" font-family="'JetBrains Mono', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="28" letter-spacing="-1.5" fill="url(#textGrad)" filter="url(#glow)">AG</text>
</svg>
`;

function createIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(count, 4); // count

  let offset = 6 + count * 16;
  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...images.map(img => img.buffer)]);
}

async function main() {
  const svgBuffer = Buffer.from(svgContent);

  // Write SVG favicon
  fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.svg'), svgContent, 'utf8');
  console.log('Written public/favicon.svg');

  // Render PNGs at various resolutions
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();

  // Create multi-resolution ICO
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);

  fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(process.cwd(), 'app', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'apple-touch-icon.png'), png180);

  console.log('Successfully generated public/favicon.ico, app/favicon.ico, and apple-touch-icon.png!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
