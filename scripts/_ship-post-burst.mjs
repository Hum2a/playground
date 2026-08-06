import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

const SRC = '.wip-aside/post-burst-recovery'
const DST = 'src/specimens/post-burst-recovery'

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
if (contract.stages.length !== 6) throw new Error('need 6 stages')
if (contract.stages[4].recovery !== 88 || contract.ready.at88Status !== 'RECOVERING') {
  throw new Error('88 must stay RECOVERING')
}
if (contract.ready.ticks !== 2) throw new Error('need 2 ticks')

let index = sh('git show HEAD:src/specimens/index.ts')
if (!index.includes('postBurstRecovery')) {
  const impPower = /import \{ powerLevelReadout \} from '\.\/power-level-readout\/entry'\r?\n/
  const arrPower = /  powerLevelReadout,\r?\n/
  if (impPower.test(index) && arrPower.test(index)) {
    index = index.replace(
      impPower,
      "import { postBurstRecovery } from './post-burst-recovery/entry'\nimport { powerLevelReadout } from './power-level-readout/entry'\n",
    )
    index = index.replace(arrPower, '  postBurstRecovery,\n  powerLevelReadout,\n')
  } else {
    const impPixel = /import \{ pixelHpDrain \} from '\.\/pixel-hp-drain\/entry'\r?\n/
    const arrPixel = /  pixelHpDrain,\r?\n/
    if (!impPixel.test(index) || !arrPixel.test(index)) {
      throw new Error('no import anchor for postBurstRecovery')
    }
    index = index.replace(
      impPixel,
      "import { pixelHpDrain } from './pixel-hp-drain/entry'\nimport { postBurstRecovery } from './post-burst-recovery/entry'\n",
    )
    index = index.replace(arrPixel, '  pixelHpDrain,\n  postBurstRecovery,\n')
  }
}
if (!index.includes('postBurstRecovery,')) {
  throw new Error('postBurstRecovery not registered')
}
writeFileSync('src/specimens/index.ts', index)

console.log('prepared')
sh('npx tsc --noEmit')
sh('npm run test')
sh('npm run build')
console.log('checks passed')

sh('git add src/specimens/post-burst-recovery src/specimens/index.ts')
writeFileSync(
  '.wip-aside/COMMITMSG-pbr.txt',
  `Add SPX-1212 Post-Burst Recovery

Cooldown after successful boost: capacity recovers through a frozen ladder while TASK COMPLETE stays visible.
`,
)
sh('git commit -F .wip-aside/COMMITMSG-pbr.txt')
console.log(sh('git log -1 --oneline'))
console.log(sh('git show --stat --oneline HEAD'))
