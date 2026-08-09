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
    'Mount the three-row radiogroup inside a relative overflow-clipped host (~620×400).',
    'Import demo.css verbatim; freeze 3 irregular rings, 2px stroke, scale .1→2.4, 520ms / 45ms stagger.',
    'Call window.rippleSelection.select(root, index); clip ripples to the selected row.',
    'Keep decorative rings aria-hidden; announce via the polite status region.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with immediate lock + static cyan ring.',
  ],
  acceptance: [
    'Clicking a row selects exactly that row',
    'ArrowUp / ArrowDown / Enter change or confirm selection',
    'Each selection creates one deterministic three-ring ripple from the row centre',
    'Rings are 2px, scale .1→2.4 over 520ms with 45ms stagger; no loop',
    'Unselected rows stay visible at opacity .55; selected locks at 1 with marker + stronger border',
    'Reduced motion: no expanding animation; static cyan ring/border remains',
    'No external dependencies; sandbox allow-scripts only',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#041018;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
