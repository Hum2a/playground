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
    'Mount inside a relative overflow-hidden frame.',
    'Keep exactly one resolution lock — do not expand into a three-shake capture.',
    'Import demo.css verbatim; preserve 220/100/170/160ms timing and four 18px rays.',
    'Call runCriticalCapture / runCriticalCaptureReset; busy-guard re-entrancy.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate VERIFIED state.',
  ],
  acceptance: [
    'Capture begins with enter/close like a normal capture path',
    'Only one sharp resolution movement (0→14→-5→0 / 1→.94→1.03→1); no three-shake sequence',
    'Exactly four critical indicator lines extend ~18px at peak compression then retract',
    'VERIFYING → VERIFIED immediately after the single lock; confirm ring 100%→128% then gone',
    'Final state static; reduced motion immediate; no official Poké Ball artwork; no looping',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0c1014;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
