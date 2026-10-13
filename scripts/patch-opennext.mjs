import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'node_modules', '@opennextjs', 'cloudflare', 'dist', 'cli', 'build', 'patches', 'plugins', 'load-manifest.js');

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('Unexpected loadManifest')) {
    const lines = content.split('\n');
    const newLines = lines.map(line => {
      if (line.includes('Unexpected loadManifest')) {
        return '    return {};';
      }
      return line;
    });
    fs.writeFileSync(file, newLines.join('\n'), 'utf8');
    console.log('Successfully patched OpenNext load-manifest.js!');
  } else {
    console.log('Already patched or not found.');
  }
} else {
  console.log('File load-manifest.js not found.');
}
