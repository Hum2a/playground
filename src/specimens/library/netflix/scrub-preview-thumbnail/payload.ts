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
    'Mount inline as a timeline scrubber; import demo.css verbatim.',
    'Keep the thumbnail anchored to the handle position via the range input value, not raw pointer coordinates.',
    'Hide the thumbnail on pointerup/pointercancel/blur so it never lingers after the drag ends.',
    'Honour both reduced-motion triggers by removing the transition, not the show/hide timing.',
  ],
  acceptance: [
    'Idle: thumbnail hidden, readout shows idle time',
    'pointerdown or keydown on the range begins scrubbing and shows the thumbnail',
    'Thumbnail tracks the handle position and time label live during input events',
    'pointerup, pointercancel, or blur ends scrubbing and hides the thumbnail',
    'Reduced motion keeps the same show/hide states with the opacity transition disabled',
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
