import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~320×300+).',
    'Import demo.css verbatim; freeze the 520ms rotation / -42° offset from contract.json.',
    'Wire runCircularSealLock / resetCircularSealLock / replayCircularSealLock.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Unlocked (misaligned) and locked (aligned) states are visually distinct',
    'Ring rotates to align exactly with the fixed index marks',
    'Replay resets the ring before rerunning',
    'Reduced motion shows the ring already aligned and locked',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
