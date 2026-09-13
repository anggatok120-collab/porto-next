#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public', 'images');
// widths to generate for responsive images
const widths = [360, 768, 1200, 1682];

async function convert() {
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
      const base = path.basename(file, ext);
      const input = path.join(dir, file);

      // generate resized variants
      for (const w of widths) {
        const webpOut = path.join(dir, `${base}-${w}.webp`);
        const avifOut = path.join(dir, `${base}-${w}.avif`);
        try {
          const inStat = await fs.stat(input);
          const [webpStat, avifStat] = await Promise.all([
            fs.stat(webpOut).catch(() => null),
            fs.stat(avifOut).catch(() => null),
          ]);
          if (webpStat && webpStat.mtimeMs >= inStat.mtimeMs && avifStat && avifStat.mtimeMs >= inStat.mtimeMs) {
            console.log(`Skipping ${base}-${w} (up-to-date)`);
            continue;
          }
        } catch (e) {
          // ignore
        }
        console.log(`Converting ${file} -> ${base}-${w}.webp, ${base}-${w}.avif`);
        await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: 75 }).toFile(webpOut);
        await sharp(input).resize({ width: w, withoutEnlargement: true }).avif({ quality: 60 }).toFile(avifOut);
      }

      // also ensure a full-size webp/avif exist
      const webpFull = path.join(dir, `${base}.webp`);
      const avifFull = path.join(dir, `${base}.avif`);
      try {
        const inStat = await fs.stat(input);
        const [webpStat, avifStat] = await Promise.all([
          fs.stat(webpFull).catch(() => null),
          fs.stat(avifFull).catch(() => null),
        ]);
        if (!webpStat || webpStat.mtimeMs < inStat.mtimeMs) {
          await sharp(input).webp({ quality: 80 }).toFile(webpFull);
        }
        if (!avifStat || avifStat.mtimeMs < inStat.mtimeMs) {
          await sharp(input).avif({ quality: 60 }).toFile(avifFull);
        }
      } catch (e) {
        // ignore
      }
    }
    console.log('Image conversion completed');
  } catch (err) {
    console.error('Image conversion failed:', err);
    process.exit(1);
  }
}

convert();