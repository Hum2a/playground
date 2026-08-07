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

function extractHtml(html) {
  const classes = new Set();
  const ids = new Set();
  const dataAttrs = new Set();
  const dataValues = {};
  const elements = [];

  for (const m of html.matchAll(/\bclass\s*=\s*["']([^"']+)["']/gi)) {
    for (const c of m[1].trim().split(/\s+/)) if (c) classes.add(c);
  }
  for (const m of html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)) ids.add(m[1]);
  for (const m of html.matchAll(/\b(data-[a-z0-9-]+)\s*=\s*["']([^"']*)["']/gi)) {
    dataAttrs.add(m[1]);
    dataValues[m[1]] = m[2];
  }
  for (const m of html.matchAll(/\s(data-[a-z0-9-]+)(?=[\s/>])/gi)) dataAttrs.add(m[1]);

  for (const m of html.matchAll(
    /<(div|section|main|article|aside|figure|ul|ol|form|header|nav|button|canvas|span|p|a|li|label|input|svg)([^>]*)>/gi,
  )) {
    const attrs = m[2];
    const cls = (attrs.match(/class\s*=\s*["']([^"']+)["']/i) || [])[1] || '';
    const id = (attrs.match(/id\s*=\s*["']([^"']+)["']/i) || [])[1] || '';
    const datas = {};
    for (const dm of attrs.matchAll(/\b(data-[a-z0-9-]+)(?:\s*=\s*["']([^"']*)["'])?/gi)) {
      datas[dm[1]] = dm[2] ?? '';
    }
    elements.push({ tag: m[1].toLowerCase(), class: cls, id, datas });
  }

  return { classes, ids, dataAttrs, dataValues, elements };
}

function extractJsSelectors(js) {
  const sels = [];
  const seen = new Set();
  const add = (s) => {
    if (!seen.has(s)) {
      seen.add(s);
      sels.push(s);
    }
  };
  for (const m of js.matchAll(
    /\.(?:querySelector(?:All)?|closest|matches)\(\s*(["'`])([\s\S]*?)\1\s*\)/g,
  )) {
    add(m[2]);
  }
  for (const m of js.matchAll(/\.getElementById\(\s*(["'`])([^"'`]+)\1\s*\)/g)) {
    add('#' + m[2]);
  }
  for (const m of js.matchAll(/\.getElementsByClassName\(\s*(["'`])([^"'`]+)\1\s*\)/g)) {
    add('.' + m[2]);
  }
  return sels;
}

function extractCssClassesAndData(css) {
  const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const classes = new Set();
  const ids = new Set();
  const dataAttrs = new Set();
  const dataEq = [];
  for (const m of cleaned.matchAll(/\.([a-zA-Z_][\w-]*)/g)) classes.add(m[1]);
  for (const m of cleaned.matchAll(/#([a-zA-Z_][\w-]*)/g)) ids.add(m[1]);
  for (const m of cleaned.matchAll(
    /\[(data-[a-z0-9-]+)(\s*[~|^$*]?=\s*["']([^"']*)["'])?\]/g,
  )) {
    dataAttrs.add(m[1]);
    if (m[2]) dataEq.push({ attr: m[1], raw: m[0], val: m[3] });
  }
  const firstRule = cleaned.match(/([^{}@]+)\{/);
  const firstSel = firstRule ? firstRule[1].trim().split(',')[0].trim() : '';
  const firstCssClass = (firstSel.match(/\.([a-zA-Z_][\w-]*)/) || [])[1] || null;
  return { classes, ids, dataAttrs, dataEq, firstSel, firstCssClass, cleaned };
}

function parseNeed(sel) {
  const classes = [];
  const ids = [];
  const dataAttrs = [];
  const dataEq = [];
  for (const m of sel.matchAll(/\.([a-zA-Z_][\w-]*)/g)) classes.push(m[1]);
  for (const m of sel.matchAll(/#([a-zA-Z_][\w-]*)/g)) ids.push(m[1]);
  for (const m of sel.matchAll(
    /\[(data-[a-z0-9-]+)(?:\s*([~|^$*]?=)\s*["']([^"']*)["'])?\]/g,
  )) {
    dataAttrs.push(m[1]);
    if (m[2]) dataEq.push({ attr: m[1], op: m[2], val: m[3] });
  }
  return { classes, ids, dataAttrs, dataEq, raw: sel };
}

/** Does HTML contain something matching a simple selector fragment? */
function htmlSatisfies(htmlInfo, need) {
  const missingClasses = need.classes.filter((c) => !htmlInfo.classes.has(c));
  const missingIds = need.ids.filter((i) => !htmlInfo.ids.has(i));
  const missingData = need.dataAttrs.filter((d) => !htmlInfo.dataAttrs.has(d));
  const badEq = [];
  for (const eq of need.dataEq) {
    if (!htmlInfo.dataAttrs.has(eq.attr)) continue;
    // Presence-only checks in JS often use [data-x="y"] as initial state —
    // flag only if attr exists with a *different* static value AND no empty
    // (JS may set it). Still report static conflicts.
    const actual = htmlInfo.dataValues[eq.attr];
    if (eq.op === '=' && actual !== undefined && actual !== eq.val) {
      // Common pattern: HTML has data-state="idle" and JS queries [data-state="active"]
      // — not a mismatch of root identity. Only flag if the ATTR itself is wrong name.
      // Skip value mismatches for state/phase/mode toggles.
      const toggleish = /state|phase|mode|status|active|open|step|stage|busy|pressed|expanded|playing|running|done|ready|locked|armed/.test(
        eq.attr,
      );
      if (!toggleish) badEq.push(`${eq.attr}="${actual}" vs selector "${eq.val}"`);
    }
  }
  return { missingClasses, missingIds, missingData, badEq };
}

const stubHits = [];
const mismatchReports = [];

for (const id of dirs) {
  const dir = path.join(root, id);
  const htmlPath = path.join(dir, 'demo.html');
  const jsPath = path.join(dir, 'demo.js');
  const cssPath = path.join(dir, 'demo.css');
  const html = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, 'utf8') : '';
  const js = fs.existsSync(jsPath) ? fs.readFileSync(jsPath, 'utf8') : '';
  const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';

  const stubReasons = [];
  if (html.includes('NR // NR-')) stubReasons.push('NR // NR-');
  if (html.includes('__mark--a')) stubReasons.push('__mark--a');
  // broader stub mark variants
  if (/__mark--/.test(html) && !stubReasons.includes('__mark--a')) {
    const marks = [...html.matchAll(/__mark--[\w-]+/g)].map((m) => m[0]);
    stubReasons.push(`other marks: ${[...new Set(marks)].join(',')}`);
  }
  if (/NR\s*\/\/\s*NR-/.test(html) && !html.includes('NR // NR-')) {
    stubReasons.push('NR // NR- (whitespace variant)');
  }
  if (stubReasons.length) stubHits.push({ id, reasons: stubReasons });

  const htmlInfo = extractHtml(html);
  const jsSels = extractJsSelectors(js);
  const cssInfo = extractCssClassesAndData(css);

  const problems = [];
  for (const sel of jsSels) {
    if (/^(html|body|\*|:root)$/i.test(sel.trim())) continue;
    const need = parseNeed(sel);
    if (!need.classes.length && !need.ids.length && !need.dataAttrs.length) continue;
    // Skip pure modifier queries that JS toggles onto existing roots
    const { missingClasses, missingIds, missingData, badEq } = htmlSatisfies(htmlInfo, need);
    // Filter modifier-only missing classes (BEM --) when base exists
    const realMissingClasses = missingClasses.filter((c) => {
      if (c.includes('--')) {
        const base = c.split('--')[0];
        // if base or element exists, modifier may be JS-added
        if ([...htmlInfo.classes].some((h) => h === base || h.startsWith(base + '__') || base.startsWith(h))) {
          return false;
        }
      }
      return true;
    });
    if (realMissingClasses.length || missingIds.length || missingData.length || badEq.length) {
      problems.push({
        sel,
        missingClasses: realMissingClasses,
        missingIds,
        missingData,
        badEq,
      });
    }
  }

  // Strong signal: classes in BOTH js selectors and css, missing from html (non-modifier)
  const jsClasses = new Set();
  const jsData = new Set();
  for (const sel of jsSels) {
    for (const m of sel.matchAll(/\.([a-zA-Z_][\w-]*)/g)) jsClasses.add(m[1]);
    for (const m of sel.matchAll(/\[(data-[a-z0-9-]+)/g)) jsData.add(m[1]);
  }
  const missingJsCssClasses = [...jsClasses].filter(
    (c) => cssInfo.classes.has(c) && !htmlInfo.classes.has(c) && !c.includes('--'),
  );
  const missingJsData = [...jsData].filter((d) => !htmlInfo.dataAttrs.has(d));

  // Root identity: first HTML element with a class vs CSS first class / JS root
  const firstHtmlWithClass = htmlInfo.elements.find((e) => e.class);
  const htmlRootClasses = firstHtmlWithClass ? firstHtmlWithClass.class.split(/\s+/) : [];
  const jsRootSel =
    jsSels.find((s) => s.startsWith('.') || s.startsWith('#') || s.startsWith('[')) || null;

  // Block name from CSS: most frequent block (class without __ or --)
  const blockCounts = new Map();
  for (const c of cssInfo.classes) {
    const block = c.includes('__') ? c.split('__')[0] : c.includes('--') ? c.split('--')[0] : c;
    if (!block) continue;
    blockCounts.set(block, (blockCounts.get(block) || 0) + 1);
  }
  const cssPrimaryBlock = [...blockCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  // JS primary block from first class selector
  let jsPrimaryBlock = null;
  if (jsRootSel) {
    const m = jsRootSel.match(/\.([a-zA-Z_][\w-]*)/);
    if (m) {
      const c = m[1];
      jsPrimaryBlock = c.includes('__') ? c.split('__')[0] : c.includes('--') ? c.split('--')[0] : c;
    }
  }

  const htmlPrimaryBlock = htmlRootClasses[0]
    ? htmlRootClasses[0].includes('__')
      ? htmlRootClasses[0].split('__')[0]
      : htmlRootClasses[0].includes('--')
        ? htmlRootClasses[0].split('--')[0]
        : htmlRootClasses[0]
    : null;

  const rootIssues = [];
  if (htmlPrimaryBlock && cssPrimaryBlock && htmlPrimaryBlock !== cssPrimaryBlock) {
    // allow if html block appears anywhere in css
    if (!cssInfo.classes.has(htmlPrimaryBlock) && ![...cssInfo.classes].some((c) => c.startsWith(htmlPrimaryBlock + '__'))) {
      rootIssues.push(`html root block "${htmlPrimaryBlock}" not in css; css primary "${cssPrimaryBlock}"`);
    } else if (
      cssPrimaryBlock &&
      htmlPrimaryBlock !== cssPrimaryBlock &&
      !htmlInfo.classes.has(cssPrimaryBlock) &&
      ![...htmlInfo.classes].some((c) => c.startsWith(cssPrimaryBlock + '__'))
    ) {
      rootIssues.push(`css primary block "${cssPrimaryBlock}" absent from html (html root "${htmlPrimaryBlock}")`);
    }
  }
  if (htmlPrimaryBlock && jsPrimaryBlock && htmlPrimaryBlock !== jsPrimaryBlock) {
    if (!htmlInfo.classes.has(jsPrimaryBlock) && ![...htmlInfo.classes].some((c) => c.startsWith(jsPrimaryBlock + '__'))) {
      rootIssues.push(`js root block "${jsPrimaryBlock}" absent from html (html root "${htmlPrimaryBlock}")`);
    }
  }
  if (jsPrimaryBlock && cssPrimaryBlock && jsPrimaryBlock !== cssPrimaryBlock) {
    // js/css disagree on naming — only if neither shares
    const jsInCss =
      cssInfo.classes.has(jsPrimaryBlock) ||
      [...cssInfo.classes].some((c) => c.startsWith(jsPrimaryBlock + '__'));
    const cssInJs =
      jsClasses.has(cssPrimaryBlock) ||
      [...jsClasses].some((c) => c.startsWith(cssPrimaryBlock + '__'));
    if (!jsInCss || !cssInJs) {
      // weaker — only note if html matches one side
    }
  }

  // data-attr root: if JS/CSS use a data-* on root that HTML lacks entirely
  const cssMissingDataOnRoot = [...cssInfo.dataAttrs].filter((d) => !htmlInfo.dataAttrs.has(d));
  // Many data attrs are JS-set; only flag if JS ALSO queries them as existing OR css uses them as structural (not state)
  const structuralData = [...cssInfo.dataAttrs].filter((d) => {
    if (/state|phase|mode|status|active|open|step|stage|busy|pressed|expanded|playing|running|done|ready|locked|armed|reduced|force/.test(d)) {
      return false;
    }
    return !htmlInfo.dataAttrs.has(d) && jsData.has(d);
  });

  const isMismatch =
    problems.some(
      (p) =>
        p.missingClasses.length ||
        p.missingIds.length ||
        p.missingData.length ||
        p.badEq.length,
    ) ||
    missingJsCssClasses.length > 0 ||
    missingJsData.length > 0 ||
    rootIssues.length > 0 ||
    structuralData.length > 0;

  if (isMismatch) {
    mismatchReports.push({
      id,
      known: known.has(id),
      htmlRootClasses,
      htmlPrimaryBlock,
      cssPrimaryBlock,
      jsPrimaryBlock,
      jsRootSel,
      cssFirst: cssInfo.firstCssClass,
      rootIssues,
      missingJsCssClasses,
      missingJsData,
      structuralData,
      problems: problems.filter(
        (p) =>
          p.missingClasses.length ||
          p.missingIds.length ||
          p.missingData.length ||
          p.badEq.length,
      ),
      htmlClassesSample: [...htmlInfo.classes].sort(),
      stub: stubReasons.length > 0,
    });
  }
}

console.log('=== STUB demo.html (NR // NR- or __mark--a / __mark--) ===');
for (const s of stubHits) {
  console.log(`- ${s.id}: ${s.reasons.join('; ')}`);
}
console.log(`Stub count: ${stubHits.length}`);

console.log('\n=== KNOWN MISMATCHES ===');
for (const m of mismatchReports.filter((x) => x.known)) {
  console.log(`\n# ${m.id}`);
  console.log(`  htmlRoot=${JSON.stringify(m.htmlRootClasses)} htmlBlock=${m.htmlPrimaryBlock}`);
  console.log(`  cssBlock=${m.cssPrimaryBlock} jsBlock=${m.jsPrimaryBlock} jsRoot=${m.jsRootSel}`);
  console.log(`  rootIssues=${JSON.stringify(m.rootIssues)}`);
  console.log(`  missingJsCssClasses=${JSON.stringify(m.missingJsCssClasses)}`);
  console.log(`  missingJsData=${JSON.stringify(m.missingJsData)}`);
  for (const p of m.problems.slice(0, 6)) console.log(`  sel-miss: ${JSON.stringify(p)}`);
}

console.log('\n=== NOVEL MISMATCHES (beyond known 3) ===');
const novel = mismatchReports.filter((x) => !x.known);
console.log(`Novel count: ${novel.length}`);
for (const m of novel) {
  console.log(`\n# ${m.id}${m.stub ? ' [STUB]' : ''}`);
  console.log(`  htmlRoot=${JSON.stringify(m.htmlRootClasses)} htmlBlock=${m.htmlPrimaryBlock}`);
  console.log(`  cssBlock=${m.cssPrimaryBlock} jsBlock=${m.jsPrimaryBlock} jsRoot=${m.jsRootSel}`);
  if (m.rootIssues.length) console.log(`  rootIssues=${JSON.stringify(m.rootIssues)}`);
  if (m.missingJsCssClasses.length)
    console.log(`  missingJsCssClasses=${JSON.stringify(m.missingJsCssClasses)}`);
  if (m.missingJsData.length) console.log(`  missingJsData=${JSON.stringify(m.missingJsData)}`);
  if (m.structuralData.length) console.log(`  structuralData=${JSON.stringify(m.structuralData)}`);
  for (const p of m.problems.slice(0, 10)) console.log(`  sel-miss: ${JSON.stringify(p)}`);
}

console.log('\n=== SUMMARY ===');
console.log(`dirs=${dirs.length}`);
console.log(`stubs=${stubHits.length}`);
console.log(`mismatches_total=${mismatchReports.length}`);
console.log(`mismatches_novel=${novel.length}`);
console.log(`mismatches_known_detected=${mismatchReports.filter((x) => x.known).map((x) => x.id).join(',')}`);
console.log('novel_ids=' + novel.map((x) => x.id).join(', '));
