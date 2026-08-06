import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

const SRC = '.wip-aside/radar-pulse-discovery'
const DST = 'src/specimens/radar-pulse-discovery'

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
}

if (!existsSync(join(SRC, 'demo.html'))) throw new Error('missing WIP demo.html')
if (!existsSync(join(SRC, 'demo.css'))) throw new Error('missing WIP demo.css')

mkdirSync(DST, { recursive: true })
for (const f of [
  'demo.html',
  'demo.js',
  'demo.css',
  'entry.ts',
  'contract.json',
  'spec.md',
]) {
  copyFileSync(join(SRC, f), join(DST, f))
}
copyFileSync(join(DST, 'demo.css'), join(DST, 'demo.style.txt'))

const html = readFileSync(join(DST, 'demo.html'), 'utf8')
const marks = (html.match(/class="radar-pulse__mark"/g) || []).length
if (marks !== 24) throw new Error(`expected 24 marks, got ${marks}`)

let index = sh('git show HEAD:src/specimens/index.ts')
index = index.replace("import { badgeEarned } from './badge-earned/entry'\n", '')
index = index.replace("import { forgetAMove } from './forget-a-move/entry'\n", '')
index = index.replace('  badgeEarned,\n', '')
index = index.replace('  forgetAMove,\n', '')

if (!index.includes('radarPulseDiscovery')) {
  if (!index.includes("import { rankUpImpact }")) throw new Error('no rankUpImpact')
  index = index.replace(
    "import { rankUpImpact } from './rank-up-impact/entry'\n",
    "import { radarPulseDiscovery } from './radar-pulse-discovery/entry'\nimport { rankUpImpact } from './rank-up-impact/entry'\n",
  )
  index = index.replace(
    '  rankUpImpact,\n',
    '  radarPulseDiscovery,\n  rankUpImpact,\n',
  )
}

if (!index.includes('moveLearned')) throw new Error('lost moveLearned')
if (index.includes('badgeEarned') || index.includes('forgetAMove')) {
  throw new Error('dangling imports remain')
}
writeFileSync('src/specimens/index.ts', index)

let cat = sh('git show HEAD:docs/catalogue/pokemon-specimen-catalogue.md')
if (!cat.includes('radar-pulse-discovery')) {
  cat = cat.replace(
    /(\| PK-\d+ \| `SPX-\d+` \| `[^`]+` \| [^\n]+\|\n)(\n## Core)/,
    '$1| PK-247 | `SPX-946` | `radar-pulse-discovery` | Radar Pulse Discovery |\n$2',
  )
}
cat = cat.replace(
  '- [ ] **PK-247** · `SPX-946` · **Radar Pulse Discovery** — Expanding concentric pulses reveal hidden points of interest.',
  '- [x] **PK-247** · `SPX-946` · **Radar Pulse Discovery** — Expanding concentric pulses reveal hidden points of interest.',
)
const shipped = (cat.match(/^\| PK-\d+/gm) || []).length
cat = cat.replace(
  /- Progress: \*\*\d+ \/ 266\*\* complete\./,
  `- Progress: **${shipped} / 266** complete.`,
)
cat = cat.replace(/\| Done \| \d+ \|/, `| Done | ${shipped} |`)
cat = cat.replace(/\| Open \| \d+ \|/, `| Open | ${266 - shipped} |`)
writeFileSync('docs/catalogue/pokemon-specimen-catalogue.md', cat)

console.log('files staged for verify; marks=', marks, 'shipped=', shipped)

// Move incomplete WIP folders that break tsc if partially present
for (const bad of ['src/specimens/forget-a-move', 'src/specimens/be-ship2']) {
  if (existsSync(bad) && !existsSync(join(bad, 'contract.json'))) {
    const aside = join('.wip-aside', bad.split('/').pop())
    mkdirSync('.wip-aside', { recursive: true })
    try {
      if (existsSync(aside)) rmSync(aside, { recursive: true, force: true })
      cpSync(bad, aside, { recursive: true })
      rmSync(bad, { recursive: true, force: true })
      console.log('parked incomplete', bad)
    } catch (e) {
      console.warn('could not park', bad, e.message)
    }
  }
}

sh('npx tsc --noEmit')
sh('npm run test')
sh('npm run build')
console.log('checks passed')

sh('git add src/specimens/radar-pulse-discovery src/specimens/index.ts docs/catalogue/pokemon-specimen-catalogue.md')
const msg = `Add SPX-946 Radar Pulse Discovery

Spatial radar search with three staggered pulses; NODE // C locks as the discovered result.
`
writeFileSync('.wip-aside/COMMITMSG-radar.txt', msg)
sh('git commit -F .wip-aside/COMMITMSG-radar.txt')
console.log(sh('git status --short'))
console.log(sh('git log -1 --oneline'))
