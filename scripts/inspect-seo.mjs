import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'artifacts', 'demo-clean', 'out');

const htmlFiles = [];
function findHtml(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) findHtml(full);
    else if (f.endsWith('.html')) htmlFiles.push(full);
  }
}
findHtml(outDir);

console.log(`\n=== 1. ANALYZING ${htmlFiles.length} HTML FILES IN OUT ===`);

// Track existing routes
const existingRoutes = new Set();
for (const file of htmlFiles) {
  let rel = path.relative(outDir, file).replace(/\\/g, '/');
  if (rel === 'index.html') {
    existingRoutes.add('/');
  } else if (rel.endsWith('/index.html')) {
    existingRoutes.add('/' + rel.slice(0, -'/index.html'.length));
  } else if (rel.endsWith('.html')) {
    existingRoutes.add('/' + rel.slice(0, -'.html'.length));
  }
}

// 1. Broken links analysis
const brokenLinks = [];
const allHrefs = new Map();

// 2. Titles & Meta Descriptions
const longTitles = [];
const longDescriptions = [];

// 3. Social Tags (OG)
const incompleteOg = [];
const ogMismatchCanonical = [];

// 4. Schema.org errors
const schemaErrors = [];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(outDir, file).replace(/\\/g, '/');
  const route = relPath === 'index.html' ? '/' : ('/' + relPath.replace(/\/index\.html$/, '').replace(/\.html$/, ''));

  // Extract Title
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (title.length > 60) {
    longTitles.push({ route, title, len: title.length });
  }

  // Extract Meta Description
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)
    || content.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
  const desc = descMatch ? descMatch[1].trim() : '';
  if (desc.length > 160) {
    longDescriptions.push({ route, len: desc.length, desc });
  }

  // Extract Canonical
  const canonicalMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i)
    || content.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

  // Extract OG tags
  const ogTitle = (content.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i) || [])[1];
  const ogDesc = (content.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i) || [])[1];
  const ogUrl = (content.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["'][^>]*>/i) || [])[1];
  const ogImage = (content.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i) || [])[1];

  const missingOg = [];
  if (!ogTitle) missingOg.push('og:title');
  if (!ogDesc) missingOg.push('og:description');
  if (!ogUrl) missingOg.push('og:url');
  if (!ogImage) missingOg.push('og:image');

  if (missingOg.length > 0 && route !== '/404' && route !== '/_not-found') {
    incompleteOg.push({ route, missing: missingOg });
  }

  if (ogUrl && canonical && ogUrl !== canonical && route !== '/404' && route !== '/_not-found') {
    ogMismatchCanonical.push({ route, ogUrl, canonical });
  }

  // Extract Hrefs
  const hrefMatches = content.matchAll(/href=["']([^"'#?]+)(?:[#?][^"']*)?["']/gi);
  for (const match of hrefMatches) {
    let href = match[1];
    if (href.startsWith('https://democleankw.com')) {
      href = href.replace('https://democleankw.com', '') || '/';
    }
    if (href.startsWith('https://democlean-kuwait.com')) {
      href = href.replace('https://democlean-kuwait.com', '') || '/';
    }
    if (href.startsWith('/')) {
      // Normalize
      const norm = href.replace(/\/$/, '') || '/';
      if (!allHrefs.has(norm)) allHrefs.set(norm, []);
      allHrefs.get(norm).push(route);

      // Check if exists
      if (!existingRoutes.has(norm) && !existingRoutes.has(norm + '/index') && !norm.startsWith('/_next') && !norm.startsWith('/api') && !norm.startsWith('/favicon') && !norm.endsWith('.png') && !norm.endsWith('.jpg') && !norm.endsWith('.svg') && !norm.endsWith('.webp') && !norm.endsWith('.xml') && !norm.endsWith('.txt') && !norm.endsWith('.webmanifest')) {
        brokenLinks.push({ from: route, to: href });
      }
    }
  }

  // Extract JSON-LD Schemas
  const jsonLdMatches = content.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  for (const match of jsonLdMatches) {
    try {
      const parsed = JSON.parse(match[1]);
      // Check validation
      if (!parsed['@context']) schemaErrors.push({ route, error: 'Missing @context' });
      if (!parsed['@type']) schemaErrors.push({ route, error: 'Missing @type' });
      
      // Check Google Rich Results specific validation
      if (parsed['@type'] === 'FAQPage') {
        if (!Array.isArray(parsed.mainEntity)) {
          schemaErrors.push({ route, type: 'FAQPage', error: 'mainEntity must be array' });
        } else {
          for (const item of parsed.mainEntity) {
            if (item['@type'] !== 'Question' || !item.name || !item.acceptedAnswer || item.acceptedAnswer['@type'] !== 'Answer' || !item.acceptedAnswer.text) {
              schemaErrors.push({ route, type: 'FAQPage', error: 'Invalid Question/Answer structure', item });
            }
          }
        }
      }

      if (parsed['@type'] === 'Article' || parsed['@type'] === 'BlogPosting') {
        if (!parsed.headline) schemaErrors.push({ route, type: parsed['@type'], error: 'Missing headline' });
        if (!parsed.image) schemaErrors.push({ route, type: parsed['@type'], error: 'Missing image' });
        if (!parsed.datePublished) schemaErrors.push({ route, type: parsed['@type'], error: 'Missing datePublished' });
        if (!parsed.author) schemaErrors.push({ route, type: parsed['@type'], error: 'Missing author' });
      }

      if (parsed['@type'] === 'BreadcrumbList') {
        if (!Array.isArray(parsed.itemListElement)) {
          schemaErrors.push({ route, type: 'BreadcrumbList', error: 'itemListElement must be array' });
        }
      }

      if (parsed['@type'] === 'LocalBusiness' || parsed['@type'] === 'PestControl') {
        if (!parsed.name) schemaErrors.push({ route, type: parsed['@type'], error: 'Missing name' });
        if (!parsed.address) schemaErrors.push({ route, type: parsed['@type'], error: 'Missing address' });
      }
    } catch (e) {
      schemaErrors.push({ route, error: 'Invalid JSON syntax: ' + e.message });
    }
  }
}

// 5. Sitemap check
const sitemapPath = path.join(outDir, 'sitemap.xml');
let sitemapUrls = [];
if (fs.existsSync(sitemapPath)) {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
  const locMatches = sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g);
  for (const m of locMatches) {
    let u = m[1].replace('https://democleankw.com', '').replace('https://democlean-kuwait.com', '') || '/';
    sitemapUrls.push(u);
  }
}
const sitemapSet = new Set(sitemapUrls);
const missingFromSitemap = [];
for (const r of existingRoutes) {
  if (r !== '/404' && r !== '/_not-found' && !r.startsWith('/dashboard') && !sitemapSet.has(r)) {
    missingFromSitemap.push(r);
  }
}

console.log(`\n--- BROKEN LINKS FOUND (${brokenLinks.length}) ---`);
console.log(brokenLinks.slice(0, 10));

console.log(`\n--- TITLES TOO LONG (>60 chars) (${longTitles.length}) ---`);
console.log(longTitles.slice(0, 5));

console.log(`\n--- META DESCRIPTIONS TOO LONG (>160 chars) (${longDescriptions.length}) ---`);
console.log(longDescriptions.slice(0, 5));

console.log(`\n--- INCOMPLETE OPEN GRAPH TAGS (${incompleteOg.length}) ---`);
console.log(incompleteOg.slice(0, 5));

console.log(`\n--- OG URL NOT MATCHING CANONICAL (${ogMismatchCanonical.length}) ---`);
console.log(ogMismatchCanonical.slice(0, 5));

console.log(`\n--- SCHEMA.ORG / GOOGLE RICH RESULTS VALIDATION ERRORS (${schemaErrors.length}) ---`);
console.log(schemaErrors.slice(0, 10));

console.log(`\n--- INDEXABLE PAGES NOT IN SITEMAP (${missingFromSitemap.length}) ---`);
console.log(missingFromSitemap);
