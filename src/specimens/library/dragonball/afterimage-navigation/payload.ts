import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden host (~460×180 stage).',
    'Import demo.css verbatim; freeze destination percentages, segment 90/70/65/80ms, and afterimage lifetimes 420/330/240/150.',
    'Wire runAfterimageNav / resetAfterimageNav / replayAfterimageNav.',
    'Afterimages must be outline-only (no ACTIVE copy); ticks may remain after cleanup.',
    'Announce only current destination; honour both reduced-motion triggers with immediate SHIP.',
  ],
  acceptance: [
    'Exactly five destinations on frozen irregular coordinates',
    'Marker traverses all intermediate stops HOME→SHIP',
    'Exactly four afterimages at previous positions; outline/detail loss',
    'Afterimage lifetimes HOME 420 / SEARCH 330 / BUILD 240 / REVIEW 150',
    'Each traversed destination receives one tick',
    'Final locked marker only at SHIP; afterimages fully clear; ticks may remain',
    'Final state static; reduced motion immediate SHIP with ticks',
    'Coordinates and lifetimes frozen in contract.json',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0e1218;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
