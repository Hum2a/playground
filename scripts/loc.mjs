/**
 * Count lines of code across the repo and write a full markdown report.
 * Usage: npm run loc
 */
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { extname, join, relative, sep } from 'node:path'

const ROOT = process.cwd()
const REPORT_DIR = join(ROOT, 'reports')
const REPORT_PATH = join(REPORT_DIR, 'loc.md')

const SKIP_DIRS = new Set([
  '.git',
  '.wrangler',
  '.vite',
  '.lighthouseci',
  '.wip-aside',
  'node_modules',
  'dist',
  'dist-ssr',
  'coverage',
  'test-results',
  'playwright-report',
  'blob-report',
  'reports',
])

const SKIP_FILES = new Set(['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock'])

const BINARY_EXTS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.mp3',
  '.mp4',
  '.webm',
  '.pdf',
  '.zip',
  '.gz',
  '.7z',
  '.exe',
  '.dll',
  '.so',
  '.dylib',
  '.bin',
  '.wasm',
  '.map',
])

/** @type {Record<string, { label: string; kind: 'code' | 'markup' | 'style' | 'data' | 'docs' | 'config' | 'other' }>} */
const EXT_META = {
  '.ts': { label: 'TypeScript', kind: 'code' },
  '.tsx': { label: 'TSX', kind: 'code' },
  '.js': { label: 'JavaScript', kind: 'code' },
  '.jsx': { label: 'JSX', kind: 'code' },
  '.mjs': { label: 'JavaScript (mjs)', kind: 'code' },
  '.cjs': { label: 'JavaScript (cjs)', kind: 'code' },
  '.css': { label: 'CSS', kind: 'style' },
  '.html': { label: 'HTML', kind: 'markup' },
  '.md': { label: 'Markdown', kind: 'docs' },
  '.mdc': { label: 'Cursor rules', kind: 'docs' },
  '.json': { label: 'JSON', kind: 'data' },
  '.txt': { label: 'Text / style twin', kind: 'style' },
  '.toml': { label: 'TOML', kind: 'config' },
  '.yml': { label: 'YAML', kind: 'config' },
  '.yaml': { label: 'YAML', kind: 'config' },
  '.svg': { label: 'SVG', kind: 'markup' },
}

/**
 * @param {string} dir
 * @param {(abs: string, rel: string) => void} visit
 */
function walk(dir, visit) {
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.name !== '.cursor') {
      if (SKIP_DIRS.has(entry.name)) continue
      // keep .cursor rules; skip other dotted dirs like .github handled below
    }
    if (SKIP_DIRS.has(entry.name)) continue
    const abs = join(dir, entry.name)
    const rel = relative(ROOT, abs).split(sep).join('/')
    if (entry.isDirectory()) {
      walk(abs, visit)
      continue
    }
    if (!entry.isFile()) continue
    if (SKIP_FILES.has(entry.name)) continue
    visit(abs, rel)
  }
}

/**
 * @param {string} source
 * @param {string} ext
 */
function classifyLines(source, ext) {
  const lines = source.split(/\r?\n/)
  // Drop final empty split from trailing newline so file ending with \n
  // doesn't invent an extra blank — but keep intentional blank lines.
  if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop()

  let code = 0
  let blank = 0
  let comment = 0
  let inBlock = false
  const styleLike = ext === '.css' || ext === '.txt'
  const hashComments = ext === '.toml' || ext === '.yml' || ext === '.yaml' || ext === '.mdc'
  const htmlComments = ext === '.html' || ext === '.svg' || ext === '.md'

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) {
      blank++
      continue
    }

    if (inBlock) {
      comment++
      if (line.includes('*/') || (htmlComments && line.includes('-->'))) {
        inBlock = false
      }
      continue
    }

    if (styleLike || ext === '.ts' || ext === '.tsx' || ext === '.js' || ext === '.jsx' || ext === '.mjs' || ext === '.cjs') {
      if (line.startsWith('/*')) {
        comment++
        if (!line.includes('*/')) inBlock = true
        continue
      }
      if (line.startsWith('//')) {
        comment++
        continue
      }
    }

    if (hashComments && line.startsWith('#')) {
      comment++
      continue
    }

    if (htmlComments && line.startsWith('<!--')) {
      comment++
      if (!line.includes('-->')) inBlock = true
      continue
    }

    code++
  }

  return { total: lines.length, code, blank, comment }
}

/**
 * @param {string} rel
 */
function topBucket(rel) {
  const parts = rel.split('/')
  if (parts[0] === 'src' && parts[1] === 'specimens') {
    if (parts.length >= 3 && parts[2] && !parts[2].includes('.')) {
      return 'src/specimens/<id>'
    }
    return 'src/specimens (shared)'
  }
  if (parts[0] === 'src') return `src/${parts[1] ?? '(root)'}`
  if (parts[0] === '.cursor') return '.cursor'
  return parts[0] || '(root)'
}

/** @typedef {{ files: number, total: number, code: number, blank: number, comment: number }} Counts */

/** @returns {Counts} */
function emptyCounts() {
  return { files: 0, total: 0, code: 0, blank: 0, comment: 0 }
}

/**
 * @param {Counts} target
 * @param {Counts} add
 */
function addCounts(target, add) {
  target.files += add.files
  target.total += add.total
  target.code += add.code
  target.blank += add.blank
  target.comment += add.comment
}

/**
 * @param {number} n
 */
function fmt(n) {
  return n.toLocaleString('en-GB')
}

/**
 * @param {Counts} c
 */
function row(c) {
  return `| ${fmt(c.files)} | ${fmt(c.total)} | ${fmt(c.code)} | ${fmt(c.blank)} | ${fmt(c.comment)} |`
}

const byExt = new Map()
const byBucket = new Map()
const byKind = new Map()
/** @type {{ rel: string, total: number, code: number }[]} */
const fileRows = []
let specimenFolders = 0

walk(ROOT, (abs, rel) => {
  const ext = extname(abs).toLowerCase()
  if (BINARY_EXTS.has(ext)) return

  let source
  try {
    source = readFileSync(abs, 'utf8')
  } catch {
    return
  }
  // Skip files that look binary despite extension
  if (source.includes('\u0000')) return

  const counts = classifyLines(source, ext)
  const meta = EXT_META[ext] ?? {
    label: ext ? ext.slice(1).toUpperCase() : '(no ext)',
    kind: 'other',
  }

  const perFile = {
    files: 1,
    total: counts.total,
    code: counts.code,
    blank: counts.blank,
    comment: counts.comment,
  }

  const extKey = meta.label
  if (!byExt.has(extKey)) byExt.set(extKey, emptyCounts())
  addCounts(byExt.get(extKey), perFile)

  const bucket = topBucket(rel)
  if (!byBucket.has(bucket)) byBucket.set(bucket, emptyCounts())
  addCounts(byBucket.get(bucket), perFile)

  if (!byKind.has(meta.kind)) byKind.set(meta.kind, emptyCounts())
  addCounts(byKind.get(meta.kind), perFile)

  fileRows.push({ rel, total: counts.total, code: counts.code })
})

// Count specimen folders
try {
  specimenFolders = readdirSync(join(ROOT, 'src', 'specimens'), {
    withFileTypes: true,
  }).filter((d) => d.isDirectory()).length
} catch {
  specimenFolders = 0
}

const totals = emptyCounts()
for (const c of byExt.values()) addCounts(totals, c)

/**
 * @param {Map<string, Counts>} map
 */
function sortedEntries(map) {
  return [...map.entries()].sort((a, b) => b[1].total - a[1].total)
}

const largest = [...fileRows].sort((a, b) => b.total - a.total).slice(0, 25)
const generatedAt = new Date().toISOString()

const md = `# Lines of code report

Generated: \`${generatedAt}\`

## Summary

| Metric | Value |
| --- | ---: |
| Files | ${fmt(totals.files)} |
| Total lines | ${fmt(totals.total)} |
| Code lines | ${fmt(totals.code)} |
| Blank lines | ${fmt(totals.blank)} |
| Comment lines | ${fmt(totals.comment)} |
| Specimen folders | ${fmt(specimenFolders)} |

## By kind

| Kind | Files | Total | Code | Blank | Comment |
| --- | ---: | ---: | ---: | ---: | ---: |
${sortedEntries(byKind)
  .map(([k, c]) => `| ${k} ${row(c)}`)
  .join('\n')}

## By language / extension

| Language | Files | Total | Code | Blank | Comment |
| --- | ---: | ---: | ---: | ---: | ---: |
${sortedEntries(byExt)
  .map(([k, c]) => `| ${k} ${row(c)}`)
  .join('\n')}

## By area

| Area | Files | Total | Code | Blank | Comment |
| --- | ---: | ---: | ---: | ---: | ---: |
${sortedEntries(byBucket)
  .map(([k, c]) => `| \`${k}\` ${row(c)}`)
  .join('\n')}

## Largest files (by total lines)

| Lines | Code | Path |
| ---: | ---: | --- |
${largest.map((f) => `| ${fmt(f.total)} | ${fmt(f.code)} | \`${f.rel}\` |`).join('\n')}

## Notes

- Excludes \`node_modules\`, \`dist\`, coverage, Playwright/Lighthouse/Wrangler output, lockfiles, and binary assets.
- Comment detection is heuristic (\`//\`, \`/* */\`, \`#\`, \`<!-- -->\`) and may under/over-count mixed lines.
- \`demo.style.txt\` twins are counted as style text (same bytes as \`demo.css\` by convention).
`

mkdirSync(REPORT_DIR, { recursive: true })
writeFileSync(REPORT_PATH, md)

// Console summary
console.log('Lines of code\n')
console.log(`  Files:     ${fmt(totals.files)}`)
console.log(`  Total:     ${fmt(totals.total)}`)
console.log(`  Code:      ${fmt(totals.code)}`)
console.log(`  Blank:     ${fmt(totals.blank)}`)
console.log(`  Comment:   ${fmt(totals.comment)}`)
console.log(`  Specimens: ${fmt(specimenFolders)} folders`)
console.log('\nBy language (top 12):\n')
for (const [label, c] of sortedEntries(byExt).slice(0, 12)) {
  console.log(
    `  ${label.padEnd(22)} ${fmt(c.total).padStart(8)} lines  (${fmt(c.files)} files)`,
  )
}
console.log('\nBy area (top 12):\n')
for (const [label, c] of sortedEntries(byBucket).slice(0, 12)) {
  console.log(
    `  ${label.padEnd(28)} ${fmt(c.total).padStart(8)} lines  (${fmt(c.files)} files)`,
  )
}
console.log(`\nFull report: ${relative(ROOT, REPORT_PATH).split(sep).join('/')}`)
