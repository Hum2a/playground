import fs from 'node:fs'

function fixBoard() {
  const jp = 'src/specimens/library/naruto/mission-board-dispatch/demo.js'
  let js = fs.readFileSync(jp, 'utf8').replace(/\r\n/g, '\n')
  js = js.replace(/const TRAVEL_MS = \d+/, 'const TRAVEL_MS = 280')
  js = js.replace(/const SETTLE_MS = \d+/, 'const SETTLE_MS = 160')
  if (!js.includes('TRAVEL_DX_PX')) {
    js = js.replace(
      'const SETTLE_MS = 160',
      'const SETTLE_MS = 160\nconst TRAVEL_DX_PX = 148\nconst TRAVEL_DY_PX = 0',
    )
  }
  js = js.replace(
    /function applyOffset\(\) \{[\s\S]*?\n\}/,
    `function applyOffset() {
  const card = cardEl()
  const measured = measureOffset()
  const dx = Number.isFinite(measured.dx) && measured.dx !== 0 ? measured.dx : TRAVEL_DX_PX
  const dy = Number.isFinite(measured.dy) ? measured.dy : TRAVEL_DY_PX
  card?.style.setProperty('--mbd-dx', \`\${dx}px\`)
  card?.style.setProperty('--mbd-dy', \`\${dy}px\`)
}`,
  )
  if (!js.includes('void TRAVEL_DX_PX')) {
    js = js.replace('void TOTAL_MS', 'void TOTAL_MS\nvoid TRAVEL_DX_PX\nvoid TRAVEL_DY_PX')
  }
  fs.writeFileSync(jp, js)

  const cp = 'src/specimens/library/naruto/mission-board-dispatch/demo.css'
  let css = fs.readFileSync(cp, 'utf8').replace(/\r\n/g, '\n')
  css = css.replaceAll('rgb(58 155 217', 'rgb(184 50 40')
  if (!css.includes('--mbd-travel-ms')) {
    css = css.replace(
      '--mbd-dy: 0px;',
      '--mbd-dy: 0px;\n  --mbd-travel-ms: 280ms;\n  --mbd-settle-ms: 160ms;',
    )
  }
  css = css.replace(
    /transition: transform \d+ms cubic-bezier\([^)]+\);/,
    'transition: transform var(--mbd-travel-ms) cubic-bezier(0.22, 0.8, 0.25, 1);',
  )
  css = css.replace(
    /animation: mbd-settle \d+ms ease-out;/,
    'animation: mbd-settle var(--mbd-settle-ms) ease-out;',
  )
  fs.writeFileSync(cp, css)
  fs.writeFileSync(cp.replace('demo.css', 'demo.style.txt'), css)
  console.log('board ok')
}

function fixStamp() {
  const cp = 'src/specimens/library/naruto/mission-complete-stamp/demo.css'
  let css = fs.readFileSync(cp, 'utf8').replace(/\r\n/g, '\n')
  css = css.replaceAll('rgb(58 155 217', 'rgb(184 50 40')
  css = css.replaceAll('rgb(217 74 56 / 0.55)', 'rgb(184 50 40 / 0.55)')
  css = css.replaceAll('rgb(217 74 56 / 0)', 'rgb(184 50 40 / 0)')
  css = css.replaceAll('rgb(217 74 56 / 0.14)', 'rgb(184 50 40 / 0.14)')
  // active overshoot
  css = css.replace(
    `.mcs[data-phase='active'] .mcs__stamp {
  opacity: 1;
  transition:
    transform 220ms cubic-bezier(0.32, 0.1, 0.2, 1.35),
    opacity 80ms linear;
  transform: translate(-50%, -50%) rotate(-14deg) scale(1);
}

.mcs[data-phase='done'] .mcs__stamp {
  opacity: 1;
  transform: translate(-50%, -50%) rotate(-14deg) scale(1);
}`,
    `.mcs[data-phase='active'] .mcs__stamp {
  opacity: 1;
  transition:
    transform 220ms cubic-bezier(0.32, 0.1, 0.2, 1.45),
    opacity 80ms linear;
  transform: translate(-50%, -50%) rotate(-18deg) scale(1.06);
}

.mcs[data-phase='done'] .mcs__stamp {
  opacity: 1;
  transition: transform 100ms cubic-bezier(0.34, 1.2, 0.4, 1);
  transform: translate(-50%, -50%) rotate(-14deg) scale(1);
}`,
  )
  css = css.replace(
    'transform: translate(-50%, -240%) rotate(-14deg) scale(1.5);',
    'transform: translate(-50%, -240%) rotate(-18deg) scale(1.55);',
  )
  fs.writeFileSync(cp, css)
  fs.writeFileSync(cp.replace('demo.css', 'demo.style.txt'), css)
  console.log('stamp css overshoot', css.includes('rotate(-18deg) scale(1.06)'))
}

fixBoard()
fixStamp()
