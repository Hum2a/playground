/**
 * Phase 1: Generate sharded registry from flat src/specimens/index.ts
 * Usage: node scripts/migrate-registry-shards.mjs
 */
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
  existsSync,
} from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const SPEC = join(ROOT, 'src', 'specimens')
const REG = join(SPEC, 'registry')
const SHARDS = join(REG, 'shards')

const VALID = new Set(
  Object.keys(
    // parsed lightly from inspiration — hardcode keys matching inspiration.ts
    {
      persona: 1,
      'final-fantasy': 1,
      zelda: 1,
      'metal-gear': 1,
      'ace-attorney': 1,
      celeste: 1,
      danganronpa: 1,
      nier: 1,
      cyberpunk: 1,
      splatoon: 1,
      pokemon: 1,
      dragonball: 1,
      apple: 1,
      android: 1,
      'my-hero-academia': 1,
      naruto: 1,
      netflix: 1,
      playstation: 1,
      editorial: 1,
      original: 1,
    },
  ),
)

const indexSrc = readFileSync(join(SPEC, 'index.ts'), 'utf8')

/** @type {{ exportName: string, folder: string }[]} */
const imports = []
for (const m of indexSrc.matchAll(
  /import \{ (\w+) \} from '\.\/([^'/]+)\/entry'/g,
)) {
  imports.push({ exportName: m[1], folder: m[2] })
}

const arrMatch = indexSrc.match(
  /export const specimens: Specimen\[\] = \[([\s\S]*?)\]\n/,
)
if (!arrMatch) throw new Error('could not parse specimens array')
const orderExportNames = [...arrMatch[1].matchAll(/^\s*(\w+),?\s*$/gm)].map(
  (m) => m[1],
)

const byExport = new Map(imports.map((i) => [i.exportName, i]))
for (const name of orderExportNames) {
  if (!byExport.has(name)) throw new Error(`array entry missing import: ${name}`)
}

function franchiseOf(folder) {
  const entryPath = join(SPEC, folder, 'entry.ts')
  if (!existsSync(entryPath)) throw new Error(`missing entry ${folder}`)
  const src = readFileSync(entryPath, 'utf8')
  const m = src.match(/franchise:\s*'([^']+)'/)
  if (!m) return 'original'
  const f = m[1]
  if (!VALID.has(f)) {
    console.warn(`unknown franchise '${f}' in ${folder} → original`)
    return 'original'
  }
  return f
}

function idOf(folder) {
  const src = readFileSync(join(SPEC, folder, 'entry.ts'), 'utf8')
  const m = src.match(/id:\s*'([^']+)'/)
  if (!m) throw new Error(`no id in ${folder}`)
  return m[1]
}

/** @type {Map<string, { exportName: string, folder: string, id: string }[]>} */
const byFranchise = new Map()
for (const f of VALID) byFranchise.set(f, [])

/** @type {{ exportName: string, folder: string, id: string, franchise: string }[]} */
const ordered = []
for (const exportName of orderExportNames) {
  const { folder } = byExport.get(exportName)
  const id = idOf(folder)
  const franchise = franchiseOf(folder)
  const row = { exportName, folder, id, franchise }
  ordered.push(row)
  byFranchise.get(franchise).push(row)
}

mkdirSync(SHARDS, { recursive: true })

// order.ts
const orderBody = `/**
 * Canonical catalogue display order (specimen ids).
 * Append new ids here when registering; do not reorder casually.
 */
export const specimenOrder: string[] = [
${ordered.map((r) => `  '${r.id}',`).join('\n')}
]
`
writeFileSync(join(REG, 'order.ts'), orderBody)

// shards — Phase 1: flat paths ./../../folder/entry
for (const [franchise, rows] of byFranchise) {
  if (rows.length === 0) {
    // still emit empty shard so assemble can import every franchise key
    writeFileSync(
      join(SHARDS, `${franchise}.ts`),
      `import type { Specimen } from '../../types'\n\nexport const shard: Specimen[] = []\n`,
    )
    continue
  }
  // Sort shard imports alphabetically by folder for stable diffs; assemble reorders via order.ts
  const sorted = [...rows].sort((a, b) => a.folder.localeCompare(b.folder))
  const lines = [
    `import type { Specimen } from '../../types'`,
    ...sorted.map(
      (r) =>
        `import { ${r.exportName} } from '../../${r.folder}/entry'`,
    ),
    '',
    `export const shard: Specimen[] = [`,
    ...sorted.map((r) => `  ${r.exportName},`),
    `]`,
    '',
  ]
  writeFileSync(join(SHARDS, `${franchise}.ts`), lines.join('\n'))
}

// assemble.ts — explicit shard imports (no glob)
const franchiseKeys = [...VALID]
const assemble = `import type { Specimen } from '../types'
import { specimenOrder } from './order'
${franchiseKeys
  .map((f) => {
    const ident = f.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/-/g, '')
    // kebab to camel: final-fantasy -> finalFantasy
    const camel = f.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    return { f, camel }
  })
  .map(({ f, camel }) => `import { shard as ${camel}Shard } from './shards/${f}'`)
  .join('\n')}

const SHARDS: Specimen[][] = [
${franchiseKeys
  .map((f) => {
    const camel = f.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    return `  ${camel}Shard,`
  })
  .join('\n')}
]

const byIdBuild = new Map<string, Specimen>()
for (const shard of SHARDS) {
  for (const s of shard) {
    if (byIdBuild.has(s.id)) {
      throw new Error(\`Duplicate specimen id: \${s.id}\`)
    }
    byIdBuild.set(s.id, s)
  }
}

const missing = specimenOrder.filter((id) => !byIdBuild.has(id))
if (missing.length) {
  throw new Error(\`specimenOrder ids missing from shards: \${missing.slice(0, 5).join(', ')}\`)
}

const orderSet = new Set(specimenOrder)
const extras = [...byIdBuild.keys()].filter((id) => !orderSet.has(id))
if (extras.length) {
  throw new Error(\`Shard specimens not in specimenOrder: \${extras.slice(0, 5).join(', ')}\`)
}

/** Catalogue list in canonical order. */
export const specimens: Specimen[] = specimenOrder.map((id) => {
  const s = byIdBuild.get(id)
  if (!s) throw new Error(\`Missing specimen \${id}\`)
  return s
})

export const specimensById: ReadonlyMap<string, Specimen> = byIdBuild

const byRef = new Map<string, Specimen>()
for (const s of specimens) {
  byRef.set(s.ref, s)
  byRef.set(s.ref.toLowerCase(), s)
}
export const specimensByRef: ReadonlyMap<string, Specimen> = byRef

export function getSpecimen(idOrRef: string): Specimen | undefined {
  const needle = idOrRef.trim()
  return specimensById.get(needle) ?? specimensByRef.get(needle) ?? specimensByRef.get(needle.toLowerCase())
}

export function getSpecimenNeighbors(id: string): {
  prev: Specimen | undefined
  next: Specimen | undefined
} {
  const i = specimenOrder.indexOf(id)
  if (i < 0) return { prev: undefined, next: undefined }
  return {
    prev: i > 0 ? specimensById.get(specimenOrder[i - 1]) : undefined,
    next: i < specimenOrder.length - 1 ? specimensById.get(specimenOrder[i + 1]) : undefined,
  }
}
`

writeFileSync(join(REG, 'assemble.ts'), assemble)

// thin barrel — preserve public re-exports from the former monolith
const barrel = `/**
 * Specimen registry barrel — metadata catalogue + lookups.
 * Bodies live in per-specimen payload.ts via loadPayload.
 * Registration: library/<franchise>/<id> + registry/shards/<franchise>.ts + registry/order.ts
 */
export type { Specimen } from './types'
export type { SpecimenPayload, SpecimenResolved } from './types'
export { resolvePayload, resolveSpecimen } from './resolvePayload'
export type {
  FacetKey,
  SpecimenFacets,
  SpecimenIntensity,
  SpecimenKind,
  SpecimenScope,
  SpecimenTech,
} from './taxonomy'
export type {
  InspirationFranchiseId,
  InspirationWorkId,
  SpecimenInspiration,
  SuggestedFreeTag,
} from './inspiration'
export {
  ALL_FACET_VALUES,
  FACET_KEYS,
  FACET_LABELS,
  FACET_VALUES,
  SPECIMEN_INTENSITIES,
  SPECIMEN_KINDS,
  SPECIMEN_SCOPES,
  SPECIMEN_TECHS,
  formatFacets,
} from './taxonomy'
export {
  ALL_INSPIRATION_IDS,
  INSPIRATION_DIRECTORY,
  INSPIRATION_FRANCHISE_IDS,
  SUGGESTED_FREE_TAGS,
  formatInspiredBy,
  franchiseLabel,
  isWorkInFranchise,
  workLabel,
} from './inspiration'

export {
  specimens,
  specimensById,
  specimensByRef,
  getSpecimen,
  getSpecimenNeighbors,
} from './registry/assemble'
export { specimenOrder } from './registry/order'
`

writeFileSync(join(SPEC, 'index.ts'), barrel)

// Backup of old index already in git — done
console.log('shards written:', franchiseKeys.length)
console.log('specimens:', ordered.length)
for (const [f, rows] of [...byFranchise.entries()].sort()) {
  if (rows.length) console.log(`  ${f}: ${rows.length}`)
}
