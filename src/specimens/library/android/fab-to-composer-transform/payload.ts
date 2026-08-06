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
    'Mount inside a relative overflow-hidden host (~390×640).',
    'Import demo.css verbatim; freeze FAB 56×56, composer 342×210, radius 28→24px, duration 360ms.',
    'Wire resetFabToComposer / replayFabToComposer.',
    'Focus textarea only after expansion completes.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'There is never a visible duplicate FAB and composer container',
    'The composer clearly grows from the FAB location',
    'Cancel reconstructs the original FAB',
    'Keyboard focus is sensible and Escape closes it',
    'No framework or external asset dependency',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:640px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
