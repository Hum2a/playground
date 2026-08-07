import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wire Unlock to idle→enter→shine→settled using frozen timings.',
    'Import demo.css verbatim; freeze enter 320ms / shine 480ms / settle 200ms.',
    'Keep a single shine sweep — do not loop.',
    'Preserve both reduced-motion overrides on toast and shine.',
  ],
  acceptance: [
    'Unlock plays phases enter (320ms) → shine (480ms) → settled (200ms).',
    'Shine sweeps exactly once, then the toast holds with a settled border.',
    'Status announces the active toast phase.',
    'Reduced motion jumps to the settled toast with no enter/shine animation.',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
