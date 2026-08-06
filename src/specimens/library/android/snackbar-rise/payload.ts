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
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze snackbar 344×52 and timing.',
    'Wire resetSnackbarRise on replay.',
    'Repeated deletes reuse same snackbar container.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Snackbar never changes host layout',
    'UNDO genuinely restores the deleted row',
    'Repeated deletes reuse one surface',
    'Focus/hover pauses dismissal',
    'Escape can dismiss temporary feedback',
    'Reduced motion: opacity-only appearance',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:480px;background:#0c1018;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
