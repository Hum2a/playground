import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const specimensDir = join(process.cwd(), 'src', 'specimens')
const indexPath = join(specimensDir, 'index.ts')
const indexSrc = readFileSync(indexPath, 'utf8')

const KINDS = new Set(['overlay', 'transition', 'loop', 'interaction'])
const TECHS = new Set(['css-only', 'tiny-js'])
const SCOPES = new Set(['card', 'fullscreen', 'inline'])
const INTENSITIES = new Set(['subtle', 'graphic', 'maximal'])
const ALL_FACET_VALUES = new Set([...KINDS, ...TECHS, ...SCOPES, ...INTENSITIES])

const folders = readdirSync(specimensDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

const ids = new Set()
const refs = new Set()
let failed = false

function fail(msg) {
  console.error(`✗ ${msg}`)
  failed = true
}

function readFacet(folder, entry, key, allowed) {
  const re = new RegExp(`${key}:\\s*['"]([^'"]+)['"]`)
  const m = entry.match(re)
  if (!m) {
    fail(`${folder}: missing facets.${key}`)
    return null
  }
  if (!allowed.has(m[1])) {
    fail(`${folder}: facets.${key}="${m[1]}" is not in the taxonomy`)
    return null
  }
  return m[1]
}

function readTags(entry) {
  const m = entry.match(/tags:\s*\[([\s\S]*?)\]/)
  if (!m) return []
  return [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1])
}

for (const folder of folders) {
  const dir = join(specimensDir, folder)
  const htmlPath = join(dir, 'demo.html')
  const cssPath = join(dir, 'demo.css')
  const styleTxt = join(dir, 'demo.style.txt')
  const specPath = join(dir, 'spec.md')
  const contractPath = join(dir, 'contract.json')
  const entryPath = join(dir, 'entry.ts')
  const jsPath = join(dir, 'demo.js')

  for (const [label, path] of [
    ['demo.html', htmlPath],
    ['demo.css', cssPath],
    ['spec.md', specPath],
    ['contract.json', contractPath],
    ['entry.ts', entryPath],
  ]) {
    if (!existsSync(path)) {
      fail(`${folder}: missing ${label}`)
      continue
    }
    const text = readFileSync(path, 'utf8').trim()
    if (!text) fail(`${folder}: ${label} is empty`)
  }

  if (existsSync(styleTxt) && existsSync(cssPath)) {
    const a = readFileSync(cssPath, 'utf8')
    const b = readFileSync(styleTxt, 'utf8')
    if (a !== b) fail(`${folder}: demo.css and demo.style.txt diverge`)
  }

  if (!existsSync(entryPath)) continue
  const entry = readFileSync(entryPath, 'utf8')
  const idMatch = entry.match(/id:\s*['"]([^'"]+)['"]/)
  const refMatch = entry.match(/ref:\s*['"]([^'"]+)['"]/)
  if (!idMatch) fail(`${folder}: could not read id from entry.ts`)
  else {
    const id = idMatch[1]
    if (ids.has(id)) fail(`duplicate id: ${id}`)
    ids.add(id)
    if (!indexSrc.includes(id) && !indexSrc.includes(folder)) {
      fail(`${folder}: not referenced from index.ts`)
    }
  }
  if (!refMatch) fail(`${folder}: could not read ref from entry.ts`)
  else {
    const ref = refMatch[1]
    if (ref !== 'SPX-TODO') {
      if (refs.has(ref)) fail(`duplicate ref: ${ref}`)
      refs.add(ref)
    }
  }

  if (!/\bfacets\s*:/.test(entry)) {
    fail(`${folder}: entry.ts missing facets block`)
  } else {
    const kind = readFacet(folder, entry, 'kind', KINDS)
    const tech = readFacet(folder, entry, 'tech', TECHS)
    readFacet(folder, entry, 'scope', SCOPES)
    readFacet(folder, entry, 'intensity', INTENSITIES)

    const hasJs = existsSync(jsPath) && readFileSync(jsPath, 'utf8').trim().length > 0
    const jsInFiles = /files:\s*\{[^}]*\bjs\b/.test(entry)
    if (tech === 'css-only' && (hasJs || jsInFiles)) {
      fail(`${folder}: tech is css-only but demo.js / files.js is present`)
    }
    if (tech === 'tiny-js' && !hasJs && !jsInFiles) {
      fail(`${folder}: tech is tiny-js but no demo.js / files.js found`)
    }
    void kind
  }

  for (const tag of readTags(entry)) {
    if (ALL_FACET_VALUES.has(tag)) {
      fail(`${folder}: free tag "${tag}" duplicates a facet value — remove it from tags`)
    }
  }

  try {
    JSON.parse(readFileSync(contractPath, 'utf8'))
  } catch {
    fail(`${folder}: contract.json is not valid JSON`)
  }
}

if (failed) {
  process.exit(1)
}
console.log(`spec:check passed (${folders.length} specimen folder(s))`)
