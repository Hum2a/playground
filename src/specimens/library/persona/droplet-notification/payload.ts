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
    'Mount the 320×180 surface in a relative overflow-clipped host; keep TRIGGER outside the plate.',
    'Import demo.css verbatim; freeze 18×24 droplet, 80/260/40/320/180ms, exactly two 2px rings.',
    'Call window.dropletNotification.trigger(root); ignore re-entry while busy; never auto-loop.',
    'Keep the droplet aria-hidden; announce the new event via the polite status region.',
    'Honour both reduced-motion triggers with immediate active badge + static cyan ring.',
  ],
  acceptance: [
    'TRIGGER runs exactly one droplet sequence; busy-guard prevents stacking',
    'Droplet appears, falls vertically, contacts near the badge, then two 2px rings expand from impact',
    'Badge activates after impact (cyan border, marker, NEW label); not a toast',
    'Effect never loops; restart only via TRIGGER after settle',
    'Reduced motion: immediate active state, no fall, static ring',
    'No external dependencies; sandbox allow-scripts only',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0b1220;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
