import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount in a relative overflow-hidden host tall enough for the 90px drop and stars.',
    'Import demo.css verbatim; freeze device Ø120px, shake rotations, pauses, and star stagger.',
    'Wire runCaptureShake / resetCaptureShake; success only after the third check.',
    'Keep device/target/stars aria-hidden; announce via the polite CAPTURED status text.',
    'Honour both reduced-motion triggers with an immediate captured state and no shakes.',
  ],
  acceptance: [
    'Target visibly enters the container then disappears only once enclosed',
    'Container closes after entry; settles ~10px; waits 180ms',
    'Exactly three discrete shakes with alternating directions and visible pauses',
    'Success only after third check: diamond flash, three stars, status clips to CAPTURED',
    'Final state stays closed; nothing loops',
    'Reduced motion: closed device, three static stars, CAPTURED — no shaking',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#12161a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
