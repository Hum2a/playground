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
    'Mount inside a container with position: relative and overflow: hidden sized for a full takeover — this is the fullscreen-scope member of the set, not a small card overlay.',
    'Import demo.css verbatim; keep the frozen stage ordering and timing values (panels -> backdrop/flash -> word -> rings/shards -> subline).',
    'Wire playFinisher / dismissFinisher / replayFinisher (or equivalent class toggles) without appending duplicate ring/shard/panel nodes.',
    'Expose the actual completion status as real text or a live region on the host — the whole overlay is aria-hidden and purely decorative punctuation.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the static settled composition and an instant-opacity exit.',
  ],
  acceptance: [
    'Three diagonal panels sweep across in rapid staggered succession before anything else happens',
    'A full-bleed flash and a darkening backdrop mark the transition into the payoff',
    'The giant word slams in exactly once with a visible overshoot and recoil',
    'Concentric rings and shard particles burst outward only after the word has landed',
    'The caption is the last element to appear, after the rings/shards have started fading',
    'The composition can be dismissed and replayed without accumulating DOM',
    'Reduced motion immediately shows the settled dark backdrop, word, and caption with no panels/flash/rings/shards',
    'Works from roughly 320-768px with no external assets or libraries',
  ],
  scaffold: `
<div class="arc-stage" style="position:relative;overflow:hidden;width:100%;height:320px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  <div style="opacity:0.5;padding:1rem;">
    <div style="font:700 0.7rem/1.2 system-ui,sans-serif;letter-spacing:0.16em;text-transform:uppercase;color:#767e8c;">Arc 04</div>
    <div style="margin-top:0.4rem;font:600 0.95rem/1.25 system-ui,sans-serif;color:#e6e8ec;">Final confrontation</div>
  </div>
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
