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
    'Mount inside a relative overflow-hidden host (~440×240 stage).',
    'Import demo.css verbatim; freeze left/line72 coordinates, 62% error Y, 28px connector, and phase timings.',
    'Wire runContextualVanish / resetContextualVanish / replayContextualVanish.',
    'Do not animate a travelling object across the document — gap must be empty.',
    'Announce tool context via polite status; honour both reduced-motion triggers with immediate LINE 72 placement.',
  ],
  acceptance: [
    'INSPECT begins on left; error exists before relocation',
    'FOCUS ERROR pulses marker then drives contextual relocation',
    'Tool fully disappears; exactly two departure residues then clear',
    'No travel across the document during the 55ms gap',
    'Exactly two arrival residues; reconstruct .3→1.08→1 at LINE 72',
    '28px connector forms; metadata ANCHOR LEFT → LINE 72',
    'Final state static; reduced motion immediate contextual placement',
    'Coordinates and timings frozen in contract.json',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#10141a;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
