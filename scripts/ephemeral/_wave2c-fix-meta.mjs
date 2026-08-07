import fs from 'node:fs'
import path from 'node:path'

const ROOT = 'src/specimens/library/naruto'

{
  const p = path.join(ROOT, 'explosive-tag-countdown/demo.js')
  let s = fs.readFileSync(p, 'utf8')
  s = s.replace(
    'showResolved()\n                busy = false',
    'showResolved(true)\n                busy = false',
  )
  fs.writeFileSync(p, s)
  console.log('etc js fixed')
}

{
  const p = path.join(ROOT, 'barrier-breach-alert/demo.css')
  let s = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n')
  s = s.replace(
    'animation: bba-alarm 700ms ease-in-out 1;',
    'animation: bba-alarm var(--bba-alarm-ms) ease-out 1;',
  )
  fs.writeFileSync(p, s)
  fs.writeFileSync(p.replace('demo.css', 'demo.style.txt'), s)
  console.log('bba css fixed')
}

const patches = {
  'objective-chain-advance': {
    blurb:
      'Four mission checkpoints latch in order (200ms each) with a 220ms pulse to the next, then settle on CLEAR.',
    reduced:
      'Under prefers-reduced-motion or data-force-reduced-motion, all checkpoints appear latched as CLEAR immediately.',
    acceptance: [
      'Four checkpoints latch in order with completeMs 200 then pulseMs 220 to the next',
      'Final latch settles to CLEAR after settleMs 100',
      'Pulse travels along the link by left position (not opacity-only)',
      'Replay restores pending chain before rerunning',
      'Reduced motion shows CLEAR with all checkpoints complete immediately',
    ],
  },
  'technique-mastery-tree': {
    blurb:
      'A sealed technique scroll unlocks ROOT→FORM→FLOW→PEAK with edge-draw cascade (140ms / 160ms) into MASTERED.',
    reduced:
      'Under prefers-reduced-motion or data-force-reduced-motion, all four named nodes and edges appear MASTERED immediately.',
    acceptance: [
      'Nodes unlock in frozen order ROOT→FORM→FLOW→PEAK (data-id)',
      'Each unlock snaps with nodeMs 140; edges draw with edgeMs 160 via scaleX',
      'Resolved shows MASTERED with all edges filled',
      'Keys 1–4 unlock only in order; replay clears before rerun',
      'Reduced motion shows MASTERED immediately with no snap/draw',
    ],
  },
}

for (const [id, p] of Object.entries(patches)) {
  let src = fs.readFileSync(path.join(ROOT, id, 'entry.ts'), 'utf8')
  src = src.replace(/blurb:\s*\n\s*'[^']*',/, `blurb:\n    '${p.blurb}',`)
  src = src.replace(
    /reducedMotionNote:\s*\n\s*'[^']*',/,
    `reducedMotionNote:\n      '${p.reduced}',`,
  )
  const ablock = `  acceptance: [\n${p.acceptance.map((a) => `    '${a}',`).join('\n')}\n  ],`
  src = src.replace(/acceptance:\s*\[[\s\S]*?\],\n/, `${ablock}\n`)
  fs.writeFileSync(path.join(ROOT, id, 'entry.ts'), src)

  let pay = fs.readFileSync(path.join(ROOT, id, 'payload.ts'), 'utf8')
  pay = pay.replace(/acceptance:\s*\[[\s\S]*?\],/, ablock)
  fs.writeFileSync(path.join(ROOT, id, 'payload.ts'), pay)
  console.log('patched meta', id)
}
