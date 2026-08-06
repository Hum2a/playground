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
    'Mount inline; import demo.css verbatim.',
    'Keep the 5-tick, 700ms countdown frozen; clear all timers on cancel/hand-off/replay to avoid duplicate transitions.',
    'Guard hand-off and cancel with a single settled boolean so only one terminal state can ever apply.',
    'Honour both reduced-motion triggers by removing the dismiss transition, not the countdown timing.',
  ],
  acceptance: [
    'Idle/start: END OF EPISODE scene, next-up card visible, count at 5',
    'Count decrements every 700ms and the ring fills proportionally',
    'At 0, automatic hand-off dismisses the next-up card and switches the scene to playing',
    'CANCEL stops the countdown, dismisses the next-up card, and keeps the END OF EPISODE scene',
    'PLAY NOW hands off immediately, identical to reaching 0',
    'REPLAY restarts the full sequence from count 5',
    'Reduced motion keeps the same states with the dismiss transition disabled',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0c0c0f;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
