import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'out');
const publicDir = path.join(__dirname, 'public');
const staticDir = path.join(__dirname, '.next', 'static');
const serverAppDir = path.join(__dirname, '.next', 'server', 'app');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function collectAppOutputs(dir, relDir = '') {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const relPath = relDir ? path.join(relDir, entry) : entry;
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      collectAppOutputs(fullPath, relPath);
    } else if (entry.endsWith('.html') || entry.endsWith('.rsc')) {
      const destPath = path.join(outDir, relPath);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(fullPath, destPath);
      if (relPath === '_not-found.html') {
        fs.copyFileSync(fullPath, path.join(outDir, '404.html'));
      }
    } else if (entry.endsWith('.body')) {
      const strippedRel = relPath.slice(0, -'.body'.length);
      const destPath = path.join(outDir, strippedRel);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(fullPath, destPath);
    }
  }
}

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

copyRecursive(publicDir, outDir);
copyRecursive(staticDir, path.join(outDir, '_next', 'static'));
collectAppOutputs(serverAppDir);

// Ensure .assetsignore exists so Wrangler knows not to upload worker files or internal artifacts
const assetsIgnoreContent = `_worker.js
_worker.js.map
.assetsignore
`;
fs.writeFileSync(path.join(outDir, '.assetsignore'), assetsIgnoreContent, 'utf-8');
console.log('✓ Created .assetsignore in artifacts/demo-clean/out');

console.log('✓ Prepared Cloudflare static assets in artifacts/demo-clean/out');

