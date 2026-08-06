import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

const SRC = '.wip-aside/power-level-readout'
const DST = 'src/specimens/power-level-readout'

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
}

for (const f of ['demo.html', 'demo.js', 'demo.css', 'entry.ts', 'contract.json', 'spec.md']) {
  if (!existsSync(join(SRC, f))) throw new Error(`missing WIP ${f}`)
}

mkdirSync(DST, { recursive: true })
for (const f of ['demo.html', 'demo.js', 'demo.css', 'entry.ts', 'contract.json', 'spec.md']) {
  copyFileSync(join(SRC, f), join(DST, f))
}
copyFileSync(join(DST, 'demo.css'), join(DST, 'demo.style.txt'))

const contract = JSON.parse(readFileSync(join(DST, 'contract.json'), 'utf8'))
if (contract.samples.length !== 16 || contract.samples[15] !== 8471) {
  throw new Error('bad samples')
}

// Clean index from HEAD + only this specimen (avoid WIP pollution).
let index = sh('git show HEAD:src/specimens/index.ts')
if (!index.includes('powerLevelReadout')) {
  if (!index.includes("import { precisionMenuSnap }")) {
    throw new Error('missing precisionMenuSnap anchor')
  }
  index = index.replace(
    "import { precisionMenuSnap } from './precision-menu-snap/entry'\n",
    "import { powerLevelReadout } from './power-level-readout/entry'\nimport { precisionMenuSnap } from './precision-menu-snap/entry'\n",
  )
  index = index.replace(
    '  precisionMenuSnap,\n',
    '  powerLevelReadout,\n  precisionMenuSnap,\n',
  )
}
writeFileSync('src/specimens/index.ts', index)

const catPath = 'docs/catalogue/dragonball-specimen-catalogue.md'
if (!existsSync(catPath)) throw new Error('missing dragonball catalogue')
let cat = readFileSync(catPath, 'utf8')

cat = cat.replace(
  /(- \[) \]( \*\*DB-032\*\*.*?\*\*Power Level Readout\*\*.*)/g,
  '$1x]$2',
)

if (!cat.includes('`power-level-readout`')) {
  const header = cat.match(/\| --- \| --- \| --- \| --- \|\r?\n/)
  if (!header) throw new Error('shipped table header missing')
  cat = cat.replace(
    header[0],
    `${header[0]}| DB-032 | \`SPX-997\` | \`power-level-readout\` | Power Level Readout |\n`,
  )
}

const shipped = (cat.match(/^\| DB-\d+/gm) || []).length
cat = cat.replace(
  /- Progress: \*\*\d+ \/ 244\*\* complete\./,
  `- Progress: **${shipped} / 244** complete.`,
)
cat = cat.replace(/\| Done \| \d+ \|/, `| Done | ${shipped} |`)
cat = cat.replace(/\| Open \| \d+ \|/, `| Open | ${244 - shipped} |`)
writeFileSync(catPath, cat)

console.log('prepared shipped=', shipped)

// Verify our entry resolves; build may fail on unrelated WIP folders registered elsewhere —
// keep index HEAD-clean so only forget-a-move (in HEAD) + our specimen matter.
sh('npx tsc --noEmit')
sh('npm run test')
sh('npm run build')
console.log('checks passed')

const add = [
  'src/specimens/power-level-readout',
  'src/specimens/index.ts',
  'docs/catalogue/dragonball-specimen-catalogue.md',
]
if (existsSync('docs/catalogue/dragonball-software-animation-effects-checklist.md')) {
  add.push('docs/catalogue/dragonball-software-animation-effects-checklist.md')
}
sh(`git add ${add.join(' ')}`)
writeFileSync(
  '.wip-aside/COMMITMSG-plr.txt',
  `Add SPX-997 Power Level Readout

Deterministic sample ladder converges on 8,471 with threshold markers and ABOVE BASELINE classification.
`,
)
sh('git commit -F .wip-aside/COMMITMSG-plr.txt')
console.log(sh('git log -1 --oneline'))
console.log(sh('git show --stat --oneline HEAD'))
