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
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze target 88×88, hold 900ms, rewind 720ms.',
    'Wire resetFingerprintAcquisitionField.',
    'No biometric or native APIs.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Acquisition is hold-driven, not a looping loader',
    'Progress stops immediately on early release',
    'Success only occurs after required hold',
    'Failure pulse happens once per failed attempt',
    'Reduced motion: discrete segment stages only',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#141218;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
