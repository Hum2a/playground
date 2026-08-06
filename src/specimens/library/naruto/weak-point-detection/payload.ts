import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; scan line sweeps top-to-bottom at fixed marker checkpoints from contract.json.',
    'Wire runWeakPointDetection / resetWeakPointDetection / replayWeakPointDetection.',
    'Honour both reduced-motion triggers; listen for `{ type: "restart" }` postMessage.',
  ],
  acceptance: [
    'Exactly four weak-point markers on the diagram; each brackets as the scan line crosses it',
    'Idle, scanning, and resolved states are visually distinct',
    'Replay resets the scan line and all markers before rerunning',
    'Reduced motion shows all four markers bracketed immediately',
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
