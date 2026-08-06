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
    'Mount the restricted control inside a relative overflow-hidden host so the barrier and denied stamp clip cleanly.',
    'Keep the primary action logically unavailable (disabled / aria-disabled); never treat the rejection animation as authorization.',
    'Import demo.css verbatim; freeze attempt 8px/80ms, barrier 14px @ 12deg, collide scaleX 0.96/60ms, recoil −10px, and denied timings.',
    'Call runPermissionRejection() on attempt; announce “Access denied. Admin Archive is restricted.” via aria-live.',
    'Honour both reduced-motion triggers with an immediate static denied treatment.',
  ],
  acceptance: [
    'Target visibly attempts forward movement (~translateX 8px / 80ms)',
    'Diagonal barrier appears before activation completes',
    'Target collides and compresses (scaleX 0.96 ~60ms) with three angular impact marks',
    'One recoil only (translateX −10px then settle to 0) — no repeated shake',
    'ACCESS DENIED attacks above the target (~180ms) and holds ~800ms',
    'OPEN ARCHIVE remains logically unavailable',
    'Reduced motion shows static ACCESS DENIED with no collision travel',
    'No external assets, fonts, libraries, or network',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
