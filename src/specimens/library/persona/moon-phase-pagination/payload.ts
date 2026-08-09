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
    'Mount in a 620×300 dark host; keep marker moons circular via equal width/height.',
    'Import demo.css verbatim; keep active 32px / inactive 24px and the 2px orbit ring.',
    'Wire goToMoonPhasePage; markers are real buttons with ArrowLeft / ArrowRight / Home / End.',
    'Set aria-current=page on the active marker inside role=navigation; do not animate all eight moons.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate marker snap.',
  ],
  acceptance: [
    'Eight real button markers map pages 01–08 to NEW through WANING CRESCENT',
    'Active moon is 32px with a 2px orbit; inactive moons are 24px',
    'Changing pages shrinks the old moon, grows the new one, reveals the orbit, and updates PHASE 0N',
    'Only the departing and arriving markers animate; the other six stay still',
    'Keyboard supports ArrowLeft, ArrowRight, Home, and End; click selects a marker',
    'role=navigation with aria-current=page on the active page',
    'Reduced motion changes the active marker immediately with no scale or orbit tween',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#09111d;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
