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
    'Import demo.css verbatim; freeze banner 340×74 and timing sequence.',
    'Wire runNotificationBannerDrop, resetNotificationBannerDrop, and REPLAY.',
    'Hover/focus on banner pauses dwell timeout.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Banner originates above viewport at -96px',
    'Overshoot max 6px then settle 80ms',
    'Dwell 2200ms',
    'Hover/focus pauses auto retreat',
    'Banner exits completely upward',
    'Exactly one leading status marker',
    'Reduced motion: no travel',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:240px;background:#0e1116;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
