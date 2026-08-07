import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wire tile clicks to settleFocusHalo(index).',
    'Keep a single shared .fhs__halo; drive position via data-index.',
    'Import demo.css verbatim.',
    'Preserve RM override on .fhs__halo.',
  ],
  acceptance: [
    'Halo travels to the clicked tile over 420ms with spring overshoot then settles.',
    'Halo shows soft outer bloom and inset glow on the focused tile.',
    'Three tiles cycle focus on click.',
    'Reduced motion snaps the halo with no overshoot transition.',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
