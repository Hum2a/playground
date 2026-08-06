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
    'Mount the card in a relative overflow-hidden host; keep --esr-scan-x driven by the scan loop.',
    'Import demo.css verbatim; thresholds 0.22 / 0.40 / 0.58 / 0.76 and 720ms scan are the contract.',
    'Call runEnemyScan from ANALYSE; reveal with vertical translate only — no opacity fade.',
    'Keep scan beam, grid, and outline aria-hidden; announce completion once via the status region.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate full reveal.',
  ],
  acceptance: [
    'Four unknown fields begin as ???',
    'Values reveal progressively when the scanner crosses each field threshold',
    'Outline completes during the 720ms left-to-right scan; trailing grid stays within ~40px of the beam',
    'No generic loading spinner; ANALYSIS COMPLETE locks beneath the card; final state is static',
    'Reduced motion reveals all fields immediately; no external deps',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#020912;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
