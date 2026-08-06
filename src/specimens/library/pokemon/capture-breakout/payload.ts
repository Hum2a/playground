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
    'Mount in a relative overflow-hidden host tall enough for the ~95px escape.',
    'Keep visual family consistent with Capture Shake; do not share runtime modules unless extracting a shared primitive later.',
    'Import demo.css verbatim; preserve two complete shakes, 280ms long pause, 40% third interrupt, and six rays.',
    'Call runCaptureBreakout / runCaptureBreakoutRetry; allow retry after ESCAPED.',
    'Honour both reduced-motion triggers with an immediate escaped state.',
  ],
  acceptance: [
    'Capture initially appears valid; exactly two complete checks then an interrupted third',
    'Container compresses then opens structurally; exactly six breakout lines',
    'Entity returns outside; RESOLVING → ESCAPED; retry remains possible',
    'Final failure is non-destructive; no continuous shake; no official Poké Ball art',
    'Reduced motion shows open container + ESCAPED immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#12161a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
