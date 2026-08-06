import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

const SRC = '.wip-aside/adaptive-recovery'
const DST = 'src/specimens/adaptive-recovery'

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
if (contract.health.sequence.join(',') !== '18,36,57,78,100') {
  throw new Error('bad health sequence')
}
if (contract.adaptation.structuralElements !== 3) throw new Error('need 3 struts')

let index = sh('git show HEAD:src/specimens/index.ts')
if (!index.includes('adaptiveRecovery')) {
  const impAnchor = /import \{ afterimageNavigation \} from '\.\/afterimage-navigation\/entry'\r?\n/
  const arrAnchor = /  afterimageNavigation,\r?\n/
  if (!impAnchor.test(index) || !arrAnchor.test(index)) {
    throw new Error('no afterimageNavigation anchor')
  }
  index = index.replace(
    impAnchor,
    "import { adaptiveRecovery } from './adaptive-recovery/entry'\nimport { afterimageNavigation } from './afterimage-navigation/entry'\n",
  )
  index = index.replace(arrAnchor, '  adaptiveRecovery,\n  afterimageNavigation,\n')
}
if (!index.includes('adaptiveRecovery,')) {
  throw new Error('adaptiveRecovery not registered')
}
writeFileSync('src/specimens/index.ts', index)

console.log('prepared')
sh('npx tsc --noEmit')
sh('npm run test')
sh('npm run build')
console.log('checks passed')

sh('git add src/specimens/adaptive-recovery src/specimens/index.ts')
writeFileSync(
  '.wip-aside/COMMITMSG-ar.txt',
  `Add SPX-1211 Adaptive Recovery

Failed worker recovers through a health ladder, then adapts three metrics above its previous baseline.
`,
)
sh('git commit -F .wip-aside/COMMITMSG-ar.txt')
console.log(sh('git log -1 --oneline'))
console.log(sh('git show --stat --oneline HEAD'))
