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
    'Mount inside a container with position: relative and overflow: hidden so the streak and exit clip to the host.',
    'Import demo.css verbatim; keep the frozen hex colours, timings, and clip-path values.',
    'Wire fireTruthShot / dismissTruthShot / replayTruthShot (or equivalent class toggles) without appending duplicate nodes.',
    'Keep role="alert" on the card for high-priority announcement; leave streak, rings, bullet, and TRUTH index aria-hidden.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the static settled card.',
  ],
  acceptance: [
    'Notification visibly travels (streak + projectile) before becoming a card',
    'Impact rings are clearly readable at impact (~80ms, scale 0.4→1.6)',
    'Card expansion follows impact (~280ms vertical snap-open)',
    'No continuous looping; exit only on manual dismiss',
    'Reduced motion shows the final card immediately with no projectile/rings',
    'No external assets or libraries',
    'Replay works indefinitely without accumulating DOM',
    'Exact palette and timings are frozen in contract.json',
  ],
  scaffold: `
<div class="evidence-feed" style="position:relative;overflow:hidden;width:100%;height:240px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  <div class="evidence-feed__content" style="opacity:0.5;padding:1rem;">
    <div style="font:700 0.65rem/1.2 system-ui,sans-serif;letter-spacing:0.16em;text-transform:uppercase;color:#767e8c;">Case file</div>
    <div style="margin-top:0.55rem;font:500 0.8rem/1.35 system-ui,sans-serif;color:#e6e8ec;">Witness statement · 02</div>
    <div style="margin-top:0.35rem;font:500 0.8rem/1.35 system-ui,sans-serif;color:#767e8c;">Security footage · 03</div>
  </div>
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
