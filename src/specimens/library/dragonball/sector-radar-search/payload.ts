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
    'Preserve circular field, 8 sectors, 4 bands, 42° conic sweep wedge, and two 1200ms passes maximum.',
    'Keep four fixed candidate coordinates/strengths; D (.92) is the only lock target.',
    'Four brackets and exactly three triangulation lines; no continuing radar loop.',
  ],
  acceptance: [
    'Instrument reads as circular radar with sweep wedge — not a list search',
    'Exactly four fixed blips discovered in pass one (B/D/C/A order)',
    'Pass two rejects B/C/A; D locks with four brackets and three triangulation lines',
    'Final state is static: TARGET LOCKED, NODE D, distance 2.4',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#e7e4dc;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
