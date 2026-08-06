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
    'Mount inside a relative overflow-hidden host (~390×700).',
    'Import demo.css verbatim; freeze tile 56×56, start scale 0.12, radius 18→0, duration 420ms.',
    'Wire resetAppLaunchFromIcon / replayAppLaunchFromIcon.',
    'Launch origin matches selected tile centre.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Launch origin matches the selected tile centre',
    'App internals do not appear while the container is tiny',
    'Close returns to the exact source tile',
    'Launcher remains visually intact underneath',
    'No proprietary Android or Google icons are used',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:700px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
