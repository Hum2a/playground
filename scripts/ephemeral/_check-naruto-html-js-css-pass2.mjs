import fs from 'fs';
import path from 'path';

const root = 'e:/Humza/Programming/Personal/playground/src/specimens/library/naruto';
const known = new Set([
  'explosive-tag-countdown',
  'error-substitution-recovery',
  'network-scan-360',
]);
const dirs = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

function htmlClasses(html) {
  const set = new Set();
  for (const m of html.matchAll(/\bclass\s*=\s*["']([^"']+)["']/gi)) {
    for (const c of m[1].trim().split(/\s+/)) if (c) set.add(c);
  }
  return set;
}
function htmlData(html) {
  const set = new Set();
  for (const m of html.matchAll(/\b(data-[a-z0-9-]+)/gi)) set.add(m[1].toLowerCase());
  return set;
}
function classesIn(s) {
  const set = new Set();
  for (const m of s.matchAll(/\.([a-zA-Z_][\w-]*)/g)) set.add(m[1]);
  return set;
}
function blocksFrom(classes) {
  const counts = new Map();
  for (const c of classes) {
    const b = c.includes('__') ? c.split('__')[0] : c.includes('--') ? c.split('--')[0] : c;
    counts.set(b, (counts.get(b) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}
function jsQuerySelectors(js) {
  const sels = [];
  for (const m of js.matchAll(
    /\.(?:querySelector(?:All)?|closest|matches)\(\s*(["'`])([\s\S]*?)\1\s*\)/g,
  )) {
    sels.push(m[2]);
  }
  for (const m of js.matchAll(/\.getElementById\(\s*(["'`])([^"'`]+)\1\s*\)/g)) {
    sels.push('#' + m[2]);
  }
  for (const m of js.matchAll(/\.getElementsByClassName\(\s*(["'`])([^"'`]+)\1\s*\)/g)) {
    sels.push('.' + m[2]);
  }
  return sels;
}

const issues = [];
const inventory = [];

for (const id of dirs) {
  const dir = path.join(root, id);
  const html = fs.readFileSync(path.join(dir, 'demo.html'), 'utf8');
  const js = fs.readFileSync(path.join(dir, 'demo.js'), 'utf8');
  const css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8');

  const hCls = htmlClasses(html);
  const hData = htmlData(html);
  const cCls = classesIn(css);
  const jCls = classesIn(js);
  const sels = jsQuerySelectors(js);

  const jSelClasses = new Set();
  const jSelData = new Set();
  const jSelIds = new Set();
  for (const sel of sels) {
    for (const m of sel.matchAll(/\.([a-zA-Z_][\w-]*)/g)) jSelClasses.add(m[1]);
    for (const m of sel.matchAll(/\[(data-[a-z0-9-]+)/g)) jSelData.add(m[1]);
    for (const m of sel.matchAll(/#([a-zA-Z_][\w-]*)/g)) jSelIds.add(m[1]);
  }

  const cssTop = blocksFrom(cCls)[0]?.[0] || null;
  const htmlTop = blocksFrom(hCls)[0]?.[0] || null;
  const jsSelTop = blocksFrom(jSelClasses)[0]?.[0] || null;

  const cssBlockMissing =
    cssTop &&
    !hCls.has(cssTop) &&
    ![...hCls].some((c) => c.startsWith(cssTop + '__') || c.startsWith(cssTop + '--'));

  // non-modifier classes from JS selectors missing in HTML
  const jsMissClass = [...jSelClasses].filter((c) => !c.includes('--') && !hCls.has(c));
  const jsMissData = [...jSelData].filter((d) => !hData.has(d));
  const jsMissId = [...jSelIds].filter((i) => {
    // ids in html
    return !new RegExp(`\\bid\\s*=\\s*["']${i}["']`, 'i').test(html);
  });

  // CSS structural data on root: [data-X] where X is the specimen hook appearing in first rules
  // and also in JS selectors — already covered by jsMissData

  // Reverse: HTML root block not appearing in CSS at all (orphan stub naming)
  const htmlBlockMissingInCss =
    htmlTop &&
    !cCls.has(htmlTop) &&
    ![...cCls].some((c) => c.startsWith(htmlTop + '__') || c.startsWith(htmlTop + '--'));

  // JS/CSS primary block disagreement with HTML
  const flags = [];
  if (cssBlockMissing) flags.push(`css-block-absent-from-html:${cssTop}`);
  if (htmlBlockMissingInCss) flags.push(`html-block-absent-from-css:${htmlTop}`);
  if (jsMissClass.length) flags.push(`js-class-miss:${jsMissClass.join('|')}`);
  if (jsMissData.length) flags.push(`js-data-miss:${jsMissData.join('|')}`);
  if (jsMissId.length) flags.push(`js-id-miss:${jsMissId.join('|')}`);

  // soft: html/css top differ but both present
  const soft =
    htmlTop &&
    cssTop &&
    htmlTop !== cssTop &&
    !cssBlockMissing &&
    !htmlBlockMissingInCss
      ? `html/css tops differ but both present (${htmlTop} vs ${cssTop})`
      : null;

  inventory.push({
    id,
    htmlTop,
    cssTop,
    jsSelTop,
    htmlClassCount: hCls.size,
    selCount: sels.length,
    stub: /NR\s*\/\/\s*NR-/.test(html) || /__mark--a/.test(html),
  });

  if (flags.length) {
    issues.push({
      id,
      known: known.has(id),
      htmlTop,
      cssTop,
      jsSelTop,
      flags,
      soft,
      jsMissClass,
      jsMissData,
      sampleSels: sels.slice(0, 8),
    });
  } else if (soft) {
    // note soft only
    issues.push({
      id,
      known: known.has(id),
      htmlTop,
      cssTop,
      jsSelTop,
      flags: ['soft-top-differ'],
      soft,
      jsMissClass: [],
      jsMissData: [],
      sampleSels: sels.slice(0, 8),
    });
  }
}

console.log('=== HARD ISSUES ===');
const hard = issues.filter((i) => !i.flags.includes('soft-top-differ') || i.flags.length > 1);
const hardNovel = hard.filter((i) => !i.known && !i.flags.every((f) => f === 'soft-top-differ'));
const hardAll = issues.filter((i) => i.flags.some((f) => f !== 'soft-top-differ'));

for (const i of hardAll) {
  console.log(
    `${i.known ? '[KNOWN]' : '[NOVEL]'} ${i.id}\n  html=${i.htmlTop} css=${i.cssTop} js=${i.jsSelTop}\n  flags=${i.flags.join(' ;; ')}\n  sels=${JSON.stringify(i.sampleSels)}`,
  );
}

console.log('\n=== SOFT (tops differ, both present) ===');
for (const i of issues.filter((x) => x.flags.includes('soft-top-differ'))) {
  console.log(`  ${i.id}: ${i.soft}`);
}

console.log('\n=== INVENTORY (htmlTop / cssTop / jsSelTop) ===');
for (const row of inventory) {
  const mark =
    row.htmlTop !== row.cssTop || (row.jsSelTop && row.jsSelTop !== row.htmlTop)
      ? ' *'
      : '';
  console.log(
    `${row.id.padEnd(32)} html=${String(row.htmlTop).padEnd(10)} css=${String(row.cssTop).padEnd(10)} js=${String(row.jsSelTop).padEnd(10)} stub=${row.stub}${mark}`,
  );
}

console.log('\nnovel hard:', hardAll.filter((i) => !i.known).map((i) => i.id));
console.log(
  'known hard:',
  hardAll.filter((i) => i.known).map((i) => i.id),
);
