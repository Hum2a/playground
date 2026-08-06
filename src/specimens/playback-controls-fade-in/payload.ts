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
    'Mount inline as a player surface; import demo.css verbatim.',
    'Keep the 900ms idle delay frozen; every reveal trigger must reset it, not just start it once.',
    'Provide the SHOW CONTROLS button as a reliable non-hover path alongside pointer/focus/keydown triggers.',
    'Honour both reduced-motion triggers by removing the transition, not the show/hide timing.',
  ],
  acceptance: [
    'Idle: controls hidden and non-interactive',
    'Pointer movement, focus, keydown, or SHOW CONTROLS reveal the control bar',
    'Controls stay visible while activity continues, resetting the idle timer each time',
    'After 900ms of no further activity, controls dissolve back out',
    'Reduced motion keeps the same show/hide states with transitions disabled',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0c0c0f;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
