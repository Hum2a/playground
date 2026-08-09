import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Keep the trigger a real focusable <button> and the bubble role="tooltip" linked via aria-describedby.',
    'Import demo.css verbatim; keep the frozen clip-path, show/hide timings, and rest transform.',
    'Do not add JavaScript positioning — the bubble is anchored via position: relative on the wrapper and position: absolute on the bubble.',
    'Give the wrapper enough clearance above the trigger (at least the bubble height + 14px) so the bubble is not clipped by an overflow: hidden ancestor.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion by collapsing show/hide to a plain opacity transition.',
  ],
  acceptance: [
    'Hovering or focusing the trigger reveals a bubble shaped as an irregular polygon with a tail, not a rounded rectangle',
    'The show transition contains a small overshoot; the hide transition is quicker and does not overshoot',
    'The bubble is reachable and dismissible via keyboard alone (Tab to focus, Tab away to dismiss)',
    'The bubble is exposed to assistive technology via role="tooltip" and aria-describedby, independent of the animation',
    'No JavaScript is required for any part of the effect',
    'Reduced motion still shows/hides the bubble, just as a plain opacity cross-fade',
    'Works from roughly 200-768px with no external assets or libraries',
  ],
  scaffold: `
<div class="info-row" style="width:100%;min-height:180px;padding:2.5rem 1.5rem 1.5rem;border:1px solid #2c313c;border-radius:2px;background:#12141a;display:flex;align-items:flex-start;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
