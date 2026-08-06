/**
 * Phase 2: Move flat specimen folders into library/<franchise>/<id>
 * and rewrite shard + entry/payload type imports.
 *
 * Usage: node scripts/migrate-library-buckets.mjs
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

const ROOT = process.cwd()
const SPEC = join(ROOT, 'src', 'specimens')
const LIB = join(SPEC, 'library')
const SHARDS = join(SPEC, 'registry', 'shards')

const SKIP = new Set(['registry', 'library'])

const VALID = new Set([
  'persona',
  'final-fantasy',
  'zelda',
  'metal-gear',
  'ace-attorney',
  'celeste',
  'danganronpa',
  'nier',
  'cyberpunk',
  'splatoon',
  'pokemon',
  'dragonball',
  'apple',
  'android',
  'my-hero-academia',
  'naruto',
  'netflix',
  'playstation',
  'editorial',
  'original',
])

function franchiseOf(folder) {
  const src = readFileSync(join(SPEC, folder, 'entry.ts'), 'utf8')
  const m = src.match(/franchise:\s*'([^']+)'/)
  if (!m) return 'original'
  return VALID.has(m[1]) ? m[1] : 'original'
}

function exportNameOf(folder) {
  const src = readFileSync(join(SPEC, folder, 'entry.ts'), 'utf8')
  const m = src.match(/export const (\w+):\s*Specimen/)
  if (!m) throw new Error(`no export const in ${folder}`)
  return m[1]
}

const folders = readdirSync(SPEC, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !SKIP.has(d.name))
  .map((d) => d.name)
  .filter((name) => existsSync(join(SPEC, name, 'entry.ts')))

/** @type {Map<string, { folder: string, exportName: string }[]>} */
const byFranchise = new Map()
for (const f of VALID) byFranchise.set(f, [])

let moved = 0
for (const folder of folders) {
  const franchise = franchiseOf(folder)
  const exportName = exportNameOf(folder)
  const destParent = join(LIB, franchise)
  const dest = join(destParent, folder)
  if (existsSync(dest)) {
    console.warn('skip exists', dest)
    byFranchise.get(franchise).push({ folder, exportName })
    continue
  }
  mkdirSync(destParent, { recursive: true })
  execSync(`git mv "${join('src/specimens', folder)}" "${join('src/specimens/library', franchise, folder)}"`, {
    cwd: ROOT,
    stdio: 'pipe',
  })
  // Fix type import depth in entry + payload
  for (const file of ['entry.ts', 'payload.ts']) {
    const p = join(dest, file)
    if (!existsSync(p)) continue
    let src = readFileSync(p, 'utf8')
    src = src.replaceAll("from '../types'", "from '../../../types'")
    src = src.replaceAll('from "../types"', 'from "../../../types"')
    writeFileSync(p, src)
  }
  byFranchise.get(franchise).push({ folder, exportName })
  moved++
  if (moved % 50 === 0) console.log('moved', moved)
}

console.log('moved total', moved)

// Rewrite shards to library paths
for (const [franchise, rows] of byFranchise) {
  const sorted = [...rows].sort((a, b) => a.folder.localeCompare(b.folder))
  if (sorted.length === 0) {
    writeFileSync(
      join(SHARDS, `${franchise}.ts`),
      `import type { Specimen } from '../../types'\n\nexport const shard: Specimen[] = []\n`,
    )
    continue
  }
  const lines = [
    `import type { Specimen } from '../../types'`,
    ...sorted.map(
      (r) =>
        `import { ${r.exportName} } from '../../library/${franchise}/${r.folder}/entry'`,
    ),
    '',
    `export const shard: Specimen[] = [`,
    ...sorted.map((r) => `  ${r.exportName},`),
    `]`,
    '',
  ]
  writeFileSync(join(SHARDS, `${franchise}.ts`), lines.join('\n'))
}

console.log('shards rewritten')
