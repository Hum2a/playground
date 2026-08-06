import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const specimensDir = join(process.cwd(), 'src', 'specimens')
const indexPath = join(specimensDir, 'index.ts')
const indexSrc = readFileSync(indexPath, 'utf8')
const inspirationSrc = readFileSync(join(specimensDir, 'inspiration.ts'), 'utf8')

const KINDS = new Set(['overlay', 'transition', 'loop', 'interaction'])
const TECHS = new Set(['css-only', 'tiny-js'])
const SCOPES = new Set(['card', 'fullscreen', 'inline'])
const INTENSITIES = new Set(['subtle', 'graphic', 'maximal'])
const ALL_FACET_VALUES = new Set([...KINDS, ...TECHS, ...SCOPES, ...INTENSITIES])

/** @type {Map<string, Set<string>>} */
const inspirationDir = parseInspirationDirectory(inspirationSrc)
const ALL_INSPIRATION_IDS = new Set(
  [...inspirationDir.entries()].flatMap(([franchise, works]) => [
    franchise,
    ...works,
  ]),
)

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

function parseInspirationDirectory(src) {
  const map = new Map()
  const body = src.match(
    /export const INSPIRATION_DIRECTORY = \{([\s\S]*?)\n\} as const/,
  )
  if (!body) {
    fail('inspiration.ts: could not parse INSPIRATION_DIRECTORY')
    return map
  }

  let current = null
  let inWorks = false
  for (const raw of body[1].split('\n')) {
    const line = raw.trim()
    if (current && /^works:\s*\{\s*$/.test(line)) {
      inWorks = true
      continue
    }
    if (current && /^works:\s*\{\s*\}\s*,?\s*$/.test(line)) {
      inWorks = false
      continue
    }
    if (inWorks) {
      if (line === '},' || line === '}') {
        inWorks = false
        continue
      }
      const work = line.match(/^(?:'([^']+)'|([a-z0-9-]+))\s*:\s*\{/)
      if (work) map.get(current).add(work[1] || work[2])
      continue
    }
    const franchiseOpen = line.match(/^(?:'([^']+)'|([a-z0-9-]+))\s*:\s*\{\s*$/)
    if (franchiseOpen) {
      current = franchiseOpen[1] || franchiseOpen[2]
      map.set(current, new Set())
    }
  }

  if (map.size === 0) {
    fail('inspiration.ts: INSPIRATION_DIRECTORY parsed empty')
  }
  return map
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

function readInspiredBy(folder, entry) {
  if (!/\binspiredBy\s*:/.test(entry)) return null
  const block = entry.match(/inspiredBy:\s*\{([\s\S]*?)\n\s*\}/)
  if (!block) {
    fail(`${folder}: could not parse inspiredBy block`)
    return null
  }
  const body = block[1]
  const franchiseMatch = body.match(/franchise:\s*['"]([^'"]+)['"]/)
  if (!franchiseMatch) {
    fail(`${folder}: inspiredBy missing franchise`)
    return null
  }
  const franchise = franchiseMatch[1]
  if (!inspirationDir.has(franchise)) {
    fail(
      `${folder}: inspiredBy.franchise="${franchise}" is not in the inspiration directory`,
    )
    return null
  }
  const works = []
  const worksMatch = body.match(/works:\s*\[([^\]]*)\]/)
  if (worksMatch) {
    for (const wm of worksMatch[1].matchAll(/['"]([^'"]+)['"]/g)) {
      works.push(wm[1])
    }
  }
  const allowedWorks = inspirationDir.get(franchise)
  for (const work of works) {
    if (!allowedWorks.has(work)) {
      fail(
        `${folder}: inspiredBy.works includes "${work}" which is not under franchise "${franchise}"`,
      )
    }
  }
  return { franchise, works }
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

  if (!existsSync(entryPath)) {
    console.warn(`⚠ ${folder}: no entry.ts yet — skipped`)
    continue
  }

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
    const isTodo =
      existsSync(entryPath) &&
      /ref:\s*['"]SPX-TODO['"]/.test(readFileSync(entryPath, 'utf8'))
    if (a !== b && !isTodo) {
      fail(`${folder}: demo.css and demo.style.txt diverge`)
    }
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
  }
  if (!refMatch) fail(`${folder}: could not read ref from entry.ts`)
  else {
    const ref = refMatch[1]
    if (ref !== 'SPX-TODO') {
      if (refs.has(ref)) fail(`duplicate ref: ${ref}`)
      refs.add(ref)
      if (
        idMatch &&
        !indexSrc.includes(idMatch[1]) &&
        !indexSrc.includes(folder)
      ) {
        fail(`${folder}: not referenced from index.ts`)
      }
    }
  }

  if (!/\bfacets\s*:/.test(entry)) {
    fail(`${folder}: entry.ts missing facets block`)
  } else {
    const kind = readFacet(folder, entry, 'kind', KINDS)
    const tech = readFacet(folder, entry, 'tech', TECHS)
    readFacet(folder, entry, 'scope', SCOPES)
    readFacet(folder, entry, 'intensity', INTENSITIES)

    const isTodo = refMatch?.[1] === 'SPX-TODO'
    const hasJs = existsSync(jsPath) && readFileSync(jsPath, 'utf8').trim().length > 0
    const jsInFiles = /files:\s*\{[^}]*\bjs\b/.test(entry)
    if (!isTodo) {
      if (tech === 'css-only' && (hasJs || jsInFiles)) {
        fail(`${folder}: tech is css-only but demo.js / files.js is present`)
      }
      if (tech === 'tiny-js' && !hasJs && !jsInFiles) {
        fail(`${folder}: tech is tiny-js but no demo.js / files.js found`)
      }
    }
    void kind
  }

  readInspiredBy(folder, entry)

  for (const tag of readTags(entry)) {
    if (ALL_FACET_VALUES.has(tag)) {
      fail(`${folder}: free tag "${tag}" duplicates a facet value — remove it from tags`)
    }
    if (ALL_INSPIRATION_IDS.has(tag)) {
      fail(
        `${folder}: free tag "${tag}" is an inspiration id — use inspiredBy instead`,
      )
    }
    if (tag === 'persona-inspired' || /-inspired$/.test(tag)) {
      fail(
        `${folder}: free tag "${tag}" looks like lineage — use inspiredBy.franchise / works`,
      )
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
console.log(
  `spec:check passed (${folders.length} specimen folder(s), ${inspirationDir.size} inspiration franchise(s))`,
)
