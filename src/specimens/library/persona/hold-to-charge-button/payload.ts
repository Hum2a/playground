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
    'Mount the hold-charge button in a relative host; import demo.css verbatim.',
    'Drive confirmation from elapsed hold time (1400ms), keeping --hold-p in sync — do not trust CSS animationend alone.',
    'Wire pointer and Space-key hold with cancel on release/blur; ignore keydown repeat.',
    'Call resetHoldCharge() (or harness restart) to return to idle after confirm.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with stepped progress labels.',
  ],
  acceptance: [
    'User must hold approximately 1400ms; releasing early never confirms',
    'Fill is visibly irregular (jagged leading edge), not a rectangular bar; progress tracks elapsed hold',
    'Labels change through KEEP HOLDING / ALMOST THERE / CONFIRMED!',
    'Successful confirm has one short scale pulse and black shockwave (~8px)',
    'Pointer cancel/leave and keyboard hold work without stuck state; rapid press/release cancels cleanly',
    'Reduced motion preserves progress semantics via stepped fills and HOLDING N% text',
    'No dependencies, assets, or network; reset/replay works; geometry and timing frozen in contract',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:240px;background:#090909;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
