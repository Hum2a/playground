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
    'Mount inside a relative host (~420×360+).',
    'Import demo.css verbatim; keep compress / break / vacancy / install / sweep timings.',
    'Wire REPLACE via runForgetMove; RESET / harness restart via resetForgetMove.',
    'Default selection is CACHE; selected slot shows exactly four corner brackets without permanent text resize.',
    'Announce “Replace {label} with SYNC.” once on REPLACE; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle shows SCAN FILTER EXPORT CACHE with incoming SYNC',
    'Radiogroup selects one slot; selected has exactly four angular corner brackets',
    'REPLACE compresses, breaks outline into four segments, holds vacant 100ms, then installs SYNC',
    'Final set is SCAN FILTER EXPORT SYNC after a 160ms horizontal sweep',
    'Reduced motion: selection usable; REPLACE instantly swaps label to SYNC',
    'Status announces Replace CACHE with SYNC. (canonical)',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#141a1e;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
