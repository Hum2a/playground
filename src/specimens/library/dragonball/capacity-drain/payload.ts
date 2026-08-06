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
    'Mount inside a relative host (~520×360+).',
    'Import demo.css verbatim; keep 230px gap, 6×10 capacity packets, and SAFE MIN 30.',
    'Wire START DRAIN via runCapacityDrain; RESET / harness restart via resetCapacityDrain.',
    'Total capacity must remain 100; metrics update only after packet arrival.',
    'B initiates the connection; drain stops automatically at source safe minimum.',
  ],
  acceptance: [
    'A 90 / B 10 initially; B initiates connection; four brackets lock on A',
    'Exactly six packets of 10; metrics 80/20…30/70 only after arrivals; total 100',
    'A loses structural bars; B gains bars; stops at SAFE MIN 30',
    'Disconnect: line breaks into five segments retracting toward B',
    'Reduced motion immediately shows final 30/70; final state static',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0b0e12;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
