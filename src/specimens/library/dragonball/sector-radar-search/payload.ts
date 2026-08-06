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
    'Preserve all four coordinates, strengths, and the two 1200ms sweep maximum.',
    'Keep four D brackets and three triangulation lines; no continuing radar loop.',
    'Expose target Node D and distance 2.4 in text; reduced motion is immediate final state.',
  ],
  acceptance: [
    'Exactly four fixed candidates and two sweep rotations maximum',
    'First rotation reaches exactly four signals with deterministic strengths',
    'D (.92) locks in the second rotation with four brackets and three lines',
    'Final state is static with target and distance text',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#e7e4dc;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
