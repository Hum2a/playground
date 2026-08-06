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
    'Mount inline as a row of cards; import demo.css verbatim.',
    'Bind mouseenter/focus per card and mouseleave/focusout on the row — do not rely on CSS-only sibling selectors so keyboard focus behaves identically to hover.',
    'Keep the 18px neighbour push and 1.18 expand scale frozen; never scale the pushed neighbours.',
    'Honour both reduced-motion triggers by removing the transition, not the state change.',
  ],
  acceptance: [
    'Idle: no card expanded, all three flush',
    'Hover or focus any card: that card scales to 1.18 and its label appears',
    'Cards before the active one shift left 18px; cards after it shift right 18px',
    'Leaving the row or moving focus outside it collapses back to idle',
    'Reduced motion keeps the same states with transitions disabled',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#0c0c0f;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
