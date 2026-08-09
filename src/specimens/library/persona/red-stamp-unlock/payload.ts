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
    'Mount inside a container with position: relative and overflow: hidden so the slam and ink-lift exit clip to the host.',
    'Dim or replace the "locked" affordance on the host once the stamp is settled.',
    'Import demo.css verbatim; keep the frozen hex colours, ring radii, and timing values.',
    'Wire slamStamp / liftStamp / replayStamp (or equivalent class toggles) without appending duplicate particle nodes.',
    'Expose a screen-reader status such as "Content unlocked" on the host outside the decorative mark.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the static settled stamp.',
  ],
  acceptance: [
    'Stamp enters from outside the host at a steep angle and visibly smashes into position',
    'Entrance contains at least one overshoot and recoil',
    'Final stamp rests at approximately -8deg with an irregular hand-struck ring, not a perfect circle',
    'Ink halo and particle burst appear only around impact (~280ms) and clear within ~380ms',
    'No soft badge fade is used for enter or exit',
    'Effect can be triggered repeatedly without accumulating DOM',
    'Reduced motion immediately shows a readable static stamp',
    'Works from roughly 320-768px with no external assets or libraries',
  ],
  scaffold: `
<div class="module-card" style="position:relative;overflow:hidden;width:100%;height:240px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  <div class="module-card__content" style="opacity:0.55;padding:1rem;">
    <div style="font:700 0.7rem/1.2 system-ui,sans-serif;letter-spacing:0.16em;text-transform:uppercase;color:#767e8c;">Module 04</div>
    <div style="margin-top:0.4rem;font:600 0.95rem/1.25 system-ui,sans-serif;color:#e6e8ec;">Restricted archive</div>
    <span class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">Content unlocked</span>
  </div>
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
