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
    'Mount inside a relative host (~460×340+; scales down near 320px).',
    'Import demo.css verbatim; keep frozen ±10px path offsets, endpoint route causality (A→B VECTOR, B→A PRISM), and phase timings.',
    'Call trade/reset via window.linkTradeTransfer or the controls.',
    'Do not update ownership labels until entities arrive at opposite endpoints.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate swap.',
  ],
  acceptance: [
    'Two endpoints NODE // A and NODE // B: VECTOR departs A for B while PRISM departs B for A',
    'Link segments join (~160ms); both entities shrink and depart together',
    'Paths offset ±10px; entities cross at centre with one diamond flash',
    'Ownership text swaps only after arrival; link tears down (~180ms)',
    'Final state static with exchanged ownership; reduced motion immediate',
    'No external assets; works under sandbox="allow-scripts"',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0e1218;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
