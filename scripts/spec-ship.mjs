/**
 * Atomic specimen ship from .wip-aside/<id> into library/<franchise>/<id>.
 *
 * Usage:
 *   npm run spec:ship -- <id> --franchise <key> --export <camelName> [--nf NF-036] [--spx SPX-3145] [--title "…"] [--checklist path] [--commit]
 *
 * Registers into registry/shards/<franchise>.ts + registry/order.ts (from HEAD when possible).
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

const args = process.argv.slice(2)
function flag(name) {
  const eq = args.find((a) => a.startsWith(`--${name}=`))
  if (eq) return eq.slice(name.length + 3)
  const i = args.indexOf(`--${name}`)
  if (i >= 0) return args[i + 1]
  return undefined
}

const id = args.find((a) => !a.startsWith('--') && a !== flag('franchise'))
const franchise = flag('franchise') ?? 'original'
const exportName = flag('export')
const doCommit = args.includes('--commit')
const checklist = flag('checklist')
const nf = flag('nf')
const spx = flag('spx')
const title = flag('title')

if (!id || !exportName) {
  console.error(
    'Usage: npm run spec:ship -- <id> --franchise <key> --export <camelName> [--commit] [--checklist path] [--nf NF-…] [--spx SPX-…] [--title "…"]',
  )
  process.exit(1)
}

const ROOT = process.cwd()
const SRC = join(ROOT, '.wip-aside', id)
const DST = join(ROOT, 'src', 'specimens', 'library', franchise, id)
const SHARD = join(
  ROOT,
  'src',
  'specimens',
  'registry',
  'shards',
  `${franchise}.ts`,
)
const ORDER = join(ROOT, 'src', 'specimens', 'registry', 'order.ts')

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
}

const required = [
  'demo.html',
  'demo.css',
  'demo.js',
  'entry.ts',
  'payload.ts',
  'contract.json',
  'spec.md',
]
for (const f of required) {
  if (!existsSync(join(SRC, f))) {
    // demo.js optional for css-only
    if (f === 'demo.js') continue
    throw new Error(`missing WIP ${f}`)
  }
}

if (existsSync(DST)) throw new Error(`already exists: ${DST}`)

mkdirSync(DST, { recursive: true })
for (const f of required) {
  if (!existsSync(join(SRC, f))) continue
  copyFileSync(join(SRC, f), join(DST, f))
}
copyFileSync(join(DST, 'demo.css'), join(DST, 'demo.style.txt'))

// Ensure type import depth
for (const file of ['entry.ts', 'payload.ts']) {
  const p = join(DST, file)
  let src = readFileSync(p, 'utf8')
  src = src.replaceAll("from '../types'", "from '../../../types'")
  src = src.replaceAll('from "../types"', 'from "../../../types"')
  writeFileSync(p, src)
}

// Patch shard (prefer HEAD content as base)
let shard = existsSync(SHARD)
  ? readFileSync(SHARD, 'utf8')
  : `import type { Specimen } from '../../types'\n\nexport const shard: Specimen[] = []\n`
try {
  shard = sh(`git show HEAD:src/specimens/registry/shards/${franchise}.ts`)
} catch {
  /* new franchise shard or uncommitted */
}

if (!shard.includes(`/${id}/entry`)) {
  const importLine = `import { ${exportName} } from '../../library/${franchise}/${id}/entry'\n`
  if (shard.includes(`from '../../types'\n`)) {
    shard = shard.replace(
      `from '../../types'\n`,
      `from '../../types'\n${importLine}`,
    )
  } else {
    shard = `import type { Specimen } from '../../types'\n${importLine}` + shard
  }
  if (/export const shard: Specimen\[\] = \[\s*\]/.test(shard)) {
    shard = shard.replace(
      /export const shard: Specimen\[\] = \[\s*\]/,
      `export const shard: Specimen[] = [\n  ${exportName},\n]`,
    )
  } else {
    shard = shard.replace(
      /export const shard: Specimen\[\] = \[/,
      `export const shard: Specimen[] = [\n  ${exportName},`,
    )
  }
}
writeFileSync(SHARD, shard)

let order = readFileSync(ORDER, 'utf8')
try {
  order = sh('git show HEAD:src/specimens/registry/order.ts')
} catch {
  /* keep disk */
}
if (!order.includes(`'${id}'`)) {
  order = order.replace(
    /\]\s*$/,
    `  '${id}',\n]\n`,
  )
}
writeFileSync(ORDER, order)

if (checklist && nf && spx && title && existsSync(checklist)) {
  let cat = readFileSync(checklist, 'utf8')
  cat = cat.replaceAll(
    `- [ ] **${nf}** · \`${spx}\` · **${title}**`,
    `- [x] **${nf}** · \`${spx}\` · **${title}**`,
  )
  writeFileSync(checklist, cat)
}

console.log('shipped', id, '→', `library/${franchise}/${id}`)

if (doCommit) {
  sh('npx tsc --noEmit')
  sh('npm run test')
  sh('npm run build')
  const paths = [
    `src/specimens/library/${franchise}/${id}`,
    `src/specimens/registry/shards/${franchise}.ts`,
    'src/specimens/registry/order.ts',
  ]
  if (checklist) paths.push(checklist)
  sh(`git add ${paths.map((p) => `"${p}"`).join(' ')}`)
  const msg = spx && title ? `Add ${spx} ${title}` : `Add specimen ${id}`
  writeFileSync(join(ROOT, '.wip-aside', 'COMMITMSG-ship.txt'), `${msg}\n`)
  sh('git commit -F .wip-aside/COMMITMSG-ship.txt')
  console.log(sh('git log -1 --oneline'))
}
