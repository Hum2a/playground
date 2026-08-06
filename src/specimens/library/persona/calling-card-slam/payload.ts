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
    'Mount inside a container with position: relative and overflow: hidden so the slam and rip-exit clip to the host.',
    'Dim the host interactive content (about opacity 0.55) while the notice is active.',
    'Import demo.css verbatim; keep the frozen hex colours, clip-paths, and timing values.',
    'Wire slamCallingCard / dismissCallingCard / replayCallingCard (or equivalent class toggles) without appending duplicate card nodes.',
    'Expose a screen-reader status such as “New material available” on the host outside decorative backing/shards.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the static settled pose.',
  ],
  acceptance: [
    'Card enters from outside the host and visibly slams into position',
    'Entrance contains at least one overshoot and recoil',
    'Final card rests at approximately -5deg',
    'Paper and backing shapes are visibly misregistered (~8px 10px)',
    'Impact accents appear only around impact (~380ms) and clear within ~180ms',
    'No soft modal fade is used for enter or exit',
    'Effect can be triggered repeatedly without accumulating DOM',
    'Reduced motion immediately shows a readable static card',
    'Works from roughly 320–768px with no external assets or libraries',
  ],
  scaffold: `
<div class="lesson-card" style="position:relative;overflow:hidden;width:100%;height:240px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  <div class="lesson-card__content" style="opacity:0.55;padding:1rem;">
    <div style="font:700 0.7rem/1.2 system-ui,sans-serif;letter-spacing:0.16em;text-transform:uppercase;color:#767e8c;">Lesson 07</div>
    <div style="margin-top:0.4rem;font:600 0.95rem/1.25 system-ui,sans-serif;color:#e6e8ec;">Advanced material</div>
    <span class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">New material available</span>
  </div>
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
