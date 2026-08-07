import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wire card click to focusActivityCard(index).',
    'Preserve is-focused / aria-pressed and --pct on the focused card bar.',
    'Import demo.css verbatim; keep progress chip + RESUME/INFO chips.',
    'Preserve both reduced-motion overrides on .acf__card, .acf__meta, .acf__actions.',
  ],
  acceptance: [
    'Exactly one activity card is focused at a time.',
    'Focused card grows to scale 1.06 / flex 1.35 and shows its progress percent chip + fill bar.',
    'Focused card reveals RESUME and INFO secondary chips.',
    'Reduced motion applies focus, progress, and chips instantly with no transition.',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
