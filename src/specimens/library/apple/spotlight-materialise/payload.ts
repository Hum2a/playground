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
    'Mount inside a relative overflow-hidden host (520×400 preview).',
    'Import demo.css verbatim; freeze seed 44×44, panel 520×286, bar 58px.',
    'Wire openSpotlightMaterialise / closeSpotlightMaterialise on trigger / ESC.',
    'Background scales .985; bar expands 180ms then results 160ms at 30ms stagger.',
    'Input receives focus on open; ESC restores focus to trigger.',
  ],
  acceptance: [
    'Search begins as compact 44×44 central seed',
    'Background panels scale .985 and reduce contrast on open',
    'Input bar establishes at 520×58 before results region expands',
    'Exactly four results with 30ms stagger reveal',
    'Keyboard focus enters search input on open',
    'ESC closes and restores focus to trigger button',
    'Background panels remain visible throughout',
    'Reduced motion: open final panel immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#101218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
