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
    'Mount inside a relative overflow-hidden host so the 120%-wide diagonal strip clips at the edges.',
    'Import demo.css verbatim; keep frozen hex colours, 2px slit, 110px strip height, -3deg rotation, and timings.',
    'Call fireMangaCutIn / replayMangaCutIn without duplicating nodes.',
    'Announce via the polite status node only; keep the decorative strip aria-hidden.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with a static strip path.',
  ],
  acceptance: [
    'Effect begins as a ~2px slit that expands into a diagonal strip (not an opacity fade)',
    'Red/black layers are visibly misregistered (~7px); strip ~110px tall at -3deg',
    'SYSTEM and BUILD COMPLETE! enter from different directions/times; headline overshoots ~8px',
    'Strip remains still during ~900ms hold; exit collapses then retracts (non-mirrored)',
    'Host splits no more than ±3px; no character imagery',
    'One polite status announcement; reduced motion is static; sandbox-safe; 320–768px',
    'Exact dimensions/timing frozen in contract.json',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#1c1c1c;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
