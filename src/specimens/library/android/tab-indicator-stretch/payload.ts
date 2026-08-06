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
    'Mount inside relative overflow-clipped host.',
    'Import demo.css verbatim; single indicator element only.',
    'Stretch capped at 104px total width (34 + 70).',
    'Real tab semantics with arrow key navigation.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Only one indicator exists',
    'Width returns exactly to 34px after every transition',
    'Longer moves stretch more capped at 104px',
    'Rapid tab changes settle correctly',
    'Selected tab has semantic aria state',
    'Reduced motion: jump to centre at 34px',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:220px;background:#12141a;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
