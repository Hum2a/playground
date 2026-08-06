import type { SpecimenPayload } from '../types'
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
    'Import demo.css verbatim; freeze alert 350×88 and timing.',
    'Wire showHeadsUpNotification and resetHeadsUpNotificationDrop.',
    'Only one heads-up alert at a time.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Alert overlays rather than pushes host content',
    'Timeout pauses while actively interacted with',
    'Expansion keeps the same outer container',
    'Upward swipe dismiss works',
    'Only one heads-up alert exists at once',
    'Reduced motion: no travel, dwell retained',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:760px;background:#0c1018;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
