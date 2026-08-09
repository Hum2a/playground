import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Keep the native checkbox focusable and operable; custom 34×34 chrome is visual only.',
    'Import demo.css verbatim; freeze 2px border, 5px #236B91 backing, 90/220/100/160ms timings.',
    'Drive states with :checked — no extra JS. Space must toggle the native control.',
    'Inline SVG checkmark only; colour is not the only checked signal.',
    'Honour both reduced-motion triggers with an instant checked/unchecked snap.',
  ],
  acceptance: [
    'Native checkbox remains clickable, focusable, and Space-togglable',
    'Custom box is 34×34 with a 2px border and always-visible 5px #236B91 backing',
    'Check: backing impact 90ms, checkmark draw 220ms, slight expand then 100ms settle',
    'Uncheck reverses in 160ms',
    'Label reads ACCEPT TERMS; checkmark is a drawn stroke, not an icon font',
    'Reduced motion snaps checked/unchecked with no draw or scale',
    'CSS-only; no external assets or libraries',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:240px;background:#111827;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
