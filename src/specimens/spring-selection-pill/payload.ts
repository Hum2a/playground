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
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze container 336×44 and spring timings.',
    'Wire resetSpringSelectionPill.',
    'Exactly one backing; rapid retarget from current position.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly four options',
    'Exactly one selection backing',
    'Long jump and adjacent jump have different spring responses',
    'Rapid retargeting does not duplicate markers',
    'Reduced motion: direct jump',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:100px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
