import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×380+).',
    'Import demo.css verbatim; freeze arm (220ms) → count 3/2/1 (480ms each, pulse speeds up) → burst (240ms) → clear from contract.json.',
    'Wire runExplosiveTagCountdown / resetExplosiveTagCountdown / replayExplosiveTagCountdown.',
    'Honour both reduced-motion triggers — resolve straight to CLEAR.',
  ],
  acceptance: [
    'Idle, armed, counting (3/2/1), burst, and cleared phases are visually distinct',
    'Pulse speed visibly increases as the count drops from 3 to 1',
    'Replay resets the tag before rerunning',
    'Reduced motion shows CLEAR immediately with no countdown',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
