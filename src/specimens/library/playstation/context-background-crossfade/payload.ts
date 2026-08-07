import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wire tiles to setContextFocus(index); keep three stacked .cbc__bg planes.',
    'Toggle is-active by opacity only — do not unmount layers mid-crossfade.',
    'Import demo.css verbatim.',
    'Preserve RM override on .cbc__bg.',
  ],
  acceptance: [
    'Each of the three tiles activates a distinct title-keyed background plane.',
    'A→B (and B→C) crossfades opacity over 600ms without flashing ink.',
    'Context label matches the focused title.',
    'Reduced motion snaps the active plane with no opacity transition.',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
