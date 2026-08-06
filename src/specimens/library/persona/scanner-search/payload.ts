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
    'Keep the static six-row dataset local — no network.',
    'Import demo.css verbatim; preserve 650ms scan, 80ms hold, 180ms collapse.',
    'Call runScannerSearch / runScannerClear; lock the query for the scan duration.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate filtered state.',
  ],
  acceptance: [
    'Search classifies the local dataset with case-insensitive substring match; no network',
    'Scanline moves through rows; each row classifies only when the line reaches it',
    'Matches gain left rule, brackets, and MATCH; non-matches subdue then collapse after scan',
    'Result count appears last; zero matches show NO MATCH with broken blue line',
    'CLEAR restores all rows; reduced motion filters immediately',
    'Exact scan duration and row timing documented',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#020b15;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
