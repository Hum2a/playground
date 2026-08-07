import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wire Advance to complete→pulse→focus handoff across three objectives.',
    'Import demo.css verbatim; freeze complete 160ms / pulse 280ms / focus 200ms.',
    'Keep exactly one is-current focus ring until the chain finishes.',
    'Preserve both reduced-motion overrides on focus, dot, pulse, and rail fill.',
  ],
  acceptance: [
    'Exactly one step shows the focus ring at a time.',
    'Advancing completes the current step, pulses the connector (280ms), then focuses the next.',
    'Connector rails stay filled after each handoff.',
    'Reduced motion snaps each handoff with no pulse travel.',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
