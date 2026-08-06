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
    'Mount inside a relative overflow-clipped host (~280×320).',
    'Import demo.css verbatim; freeze field 180×180, 16 nodes, passes 420ms.',
    'Wire startBiometricScan on START SCAN; openVault after VERIFIED.',
    'Four brackets move inward 6px at validation; hold 120ms.',
    'Honour both reduced-motion triggers with instant verified state.',
  ],
  acceptance: [
    'Exactly 16 nodes in asymmetric geometry',
    'Exactly two scan passes at 420ms each',
    'First pass activates 10 nodes; second activates 6',
    'OPEN VAULT locked before verification',
    'Four acquisition brackets move inward 6px',
    'Action unlocks only after VERIFIED',
    'Reduced motion: instant all nodes acquired',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0c1018;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
