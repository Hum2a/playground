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
    'Mount inside a container with position: relative and overflow: hidden so the slam and crush-exit clip to the host.',
    'Keep the foreground callout as real visible text — it carries the message, the giant word behind it is decorative.',
    'Import demo.css verbatim; keep the frozen hex colours, ghost offset, and timing values.',
    'Wire slamImpact / crushImpact / replayImpact (or equivalent class toggles) without appending duplicate nodes.',
    'Swap the giant word and callout copy per use case; keep the slam timing and ghost offset frozen.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the static settled composition.',
  ],
  acceptance: [
    'Giant word enters from off-screen left and visibly slams into position',
    'Entrance contains at least one overshoot before settling',
    'A red ghost duplicate of the giant word remains visibly offset (~6px, 4px) from the black main word once settled',
    'Foreground callout with eyebrow + message rises in only after the giant word has landed',
    'Final giant word rests at approximately -2deg',
    'No soft opacity-only fade is used for enter or exit',
    'Effect can be triggered repeatedly without accumulating DOM',
    'Reduced motion immediately shows a readable static composition',
    'Works from roughly 320-768px with no external assets or libraries',
  ],
  scaffold: `
<div class="metric-card" style="position:relative;overflow:hidden;width:100%;height:220px;border:1px solid #2c313c;border-radius:2px;background:#12141a;display:flex;align-items:flex-end;">
  <div class="metric-card__content" style="opacity:0.5;padding:1rem;">
    <div style="font:700 0.7rem/1.2 system-ui,sans-serif;letter-spacing:0.16em;text-transform:uppercase;color:#767e8c;">Threat level</div>
    <div style="margin-top:0.4rem;font:600 0.95rem/1.25 system-ui,sans-serif;color:#e6e8ec;">Rising</div>
  </div>
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
