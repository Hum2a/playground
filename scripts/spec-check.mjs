import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const specimensDir = join(process.cwd(), 'src', 'specimens')
const libraryDir = join(specimensDir, 'library')
const orderPath = join(specimensDir, 'registry', 'order.ts')
const shardsDir = join(specimensDir, 'registry', 'shards')
const orderSrc = readFileSync(orderPath, 'utf8')
const inspirationSrc = readFileSync(join(specimensDir, 'inspiration.ts'), 'utf8')

/** Concatenate all shard sources for "is registered" checks. */
const registrySrc =
  orderSrc +
  readdirSync(shardsDir)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => readFileSync(join(shardsDir, f), 'utf8'))
    .join('\n')

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

/** Specimen folders: library/<franchise>/<id> */
const folders = []
for (const franchise of readdirSync(libraryDir, { withFileTypes: true })) {
  if (!franchise.isDirectory()) continue
  const franchiseDir = join(libraryDir, franchise.name)
  for (const spec of readdirSync(franchiseDir, { withFileTypes: true })) {
    if (!spec.isDirectory()) continue
    folders.push({
      folder: spec.name,
      franchise: franchise.name,
      dir: join(franchiseDir, spec.name),
      rel: `library/${franchise.name}/${spec.name}`,
    })
  }
}

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

for (const { folder, franchise: bucket, dir, rel } of folders) {
  const htmlPath = join(dir, 'demo.html')
  const cssPath = join(dir, 'demo.css')
  const styleTxt = join(dir, 'demo.style.txt')
  const specPath = join(dir, 'spec.md')
  const contractPath = join(dir, 'contract.json')
  const entryPath = join(dir, 'entry.ts')
  const jsPath = join(dir, 'demo.js')
  const label = rel

  if (!existsSync(entryPath)) {
    console.warn(`⚠ ${label}: no entry.ts yet — skipped`)
    continue
  }

  for (const [name, path] of [
    ['demo.html', htmlPath],
    ['demo.css', cssPath],
    ['spec.md', specPath],
    ['contract.json', contractPath],
    ['entry.ts', entryPath],
  ]) {
    if (!existsSync(path)) {
      fail(`${label}: missing ${name}`)
      continue
    }
    const text = readFileSync(path, 'utf8').trim()
    if (!text) fail(`${label}: ${name} is empty`)
  }

  const payloadPath = join(dir, 'payload.ts')
  if (existsSync(styleTxt) && existsSync(cssPath)) {
    const a = readFileSync(cssPath, 'utf8')
    const b = readFileSync(styleTxt, 'utf8')
    const isTodo =
      existsSync(entryPath) &&
      /ref:\s*['"]SPX-TODO['"]/.test(readFileSync(entryPath, 'utf8'))
    if (a !== b && !isTodo) {
      fail(`${label}: demo.css and demo.style.txt diverge`)
    }
  }

  const entry = readFileSync(entryPath, 'utf8')
  const idMatch = entry.match(/id:\s*['"]([^'"]+)['"]/)
  const refMatch = entry.match(/ref:\s*['"]([^'"]+)['"]/)
  const isTodo = refMatch?.[1] === 'SPX-TODO'

  if (!isTodo) {
    if (!existsSync(payloadPath)) {
      fail(`${label}: missing payload.ts (lazy specimen body)`)
    } else {
      const payload = readFileSync(payloadPath, 'utf8')
      if (!payload.trim()) fail(`${label}: payload.ts is empty`)
      if (!/export\s+default/.test(payload)) {
        fail(`${label}: payload.ts must default-export SpecimenPayload`)
      }
    }
    if (!/\bloadPayload\s*:/.test(entry)) {
      fail(`${label}: entry.ts missing loadPayload`)
    }
  }

  if (!idMatch) fail(`${label}: could not read id from entry.ts`)
  else {
    const id = idMatch[1]
    if (id !== folder) {
      fail(`${label}: folder name "${folder}" must match id "${id}"`)
    }
    if (ids.has(id)) fail(`duplicate id: ${id}`)
    ids.add(id)
  }
  if (!refMatch) fail(`${label}: could not read ref from entry.ts`)
  else {
    const ref = refMatch[1]
    if (ref !== 'SPX-TODO') {
      if (refs.has(ref)) fail(`duplicate ref: ${ref}`)
      refs.add(ref)
      if (
        idMatch &&
        !registrySrc.includes(`'${idMatch[1]}'`) &&
        !registrySrc.includes(`/${folder}/entry`)
      ) {
        console.warn(`⚠ ${label}: not referenced from registry shards/order`)
      }
    }
  }

  const inspired = readInspiredBy(label, entry)
  if (inspired && inspired.franchise !== bucket) {
    fail(
      `${label}: library bucket "${bucket}" does not match inspiredBy.franchise "${inspired.franchise}"`,
    )
  }
  if (!inspired && bucket !== 'original') {
    fail(
      `${label}: no inspiredBy but library bucket is "${bucket}" (expected original)`,
    )
  }

  if (!/\bfacets\s*:/.test(entry)) {
    fail(`${label}: entry.ts missing facets block`)
  } else {
    const kind = readFacet(label, entry, 'kind', KINDS)
    const tech = readFacet(label, entry, 'tech', TECHS)
    readFacet(label, entry, 'scope', SCOPES)
    readFacet(label, entry, 'intensity', INTENSITIES)

    const hasJs =
      existsSync(jsPath) && readFileSync(jsPath, 'utf8').trim().length > 0
    const payloadSrc = existsSync(payloadPath)
      ? readFileSync(payloadPath, 'utf8')
      : ''
    const jsInPayload =
      /\bjs\b/.test(payloadSrc) && /files:\s*\{[^}]*\bjs\b/.test(payloadSrc)
    if (!isTodo) {
      if (tech === 'css-only' && (hasJs || jsInPayload)) {
        fail(`${label}: tech is css-only but demo.js / payload files.js is present`)
      }
      if (tech === 'tiny-js' && !hasJs && !jsInPayload) {
        fail(`${label}: tech is tiny-js but no demo.js / payload files.js found`)
      }
    }
    void kind
  }

  for (const tag of readTags(entry)) {
    if (ALL_FACET_VALUES.has(tag)) {
      fail(`${label}: free tag "${tag}" duplicates a facet value — remove it from tags`)
    }
    if (ALL_INSPIRATION_IDS.has(tag)) {
      fail(
        `${label}: free tag "${tag}" is an inspiration id — use inspiredBy instead`,
      )
    }
    if (tag === 'persona-inspired' || /-inspired$/.test(tag)) {
      fail(
        `${label}: free tag "${tag}" looks like lineage — use inspiredBy.franchise / works`,
      )
    }
  }

  try {
    JSON.parse(readFileSync(contractPath, 'utf8'))
  } catch {
    fail(`${label}: contract.json is not valid JSON`)
  }
}

if (failed) {
  process.exit(1)
}
console.log(
  `spec:check passed (${folders.length} specimen folder(s), ${inspirationDir.size} inspiration franchise(s))`,
)
