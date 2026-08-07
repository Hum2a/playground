import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wire tile clicks to focusGameTile(index).',
    'Keep three title-keyed .hgfs__plane layers; toggle is-active with focus index.',
    'Import demo.css verbatim.',
    'Preserve RM overrides on .hgfs__ambient, .hgfs__plane, and .hgfs__tile.',
  ],
  acceptance: [
    'Each tile activates a distinct title-keyed ambient art plane (not hue-only).',
    'Focused tile lifts 6px and scales to 1.04 with a primary border.',
    'Ambient opacity travel is 520ms; tile travel is 280ms.',
    'Reduced motion disables plane and tile transitions so both snap instantly.',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
