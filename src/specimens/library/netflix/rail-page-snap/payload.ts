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
    'Mount inline; import demo.css verbatim.',
    'Keep the 132px step (120px card + 12px gap) frozen — NEXT/PREV and the manual-scroll re-snap must agree on the same boundary.',
    'Use native scroll-snap for the rail; JS only computes the nearest index and calls scrollTo, never a manual animation loop.',
    'Honour both reduced-motion triggers by using behavior: "auto" instead of "smooth" for all scrollTo calls.',
  ],
  acceptance: [
    'Idle: card 1 of 6, PREV disabled',
    'NEXT/PREV scroll by exactly one step and land exactly on a card boundary',
    'Manually dragging the rail settles on the nearest card boundary after release',
    'Live status reports the current card index after every change',
    'Reduced motion uses instant scrollTo instead of smooth scrolling',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:220px;background:#0c0c0f;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
