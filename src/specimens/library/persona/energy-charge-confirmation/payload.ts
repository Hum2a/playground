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
    'Mount in a relative host with room for the outer frame; import demo.css verbatim.',
    'Drive confirmation from elapsed hold time (900ms) via --ecc-p — do not trust CSS animationend alone.',
    'Wire pointer + Space hold; cancel on release/blur; ignore keydown repeat.',
    'Call resetEnergyCharge after confirm (or harness restart) to return to idle.',
    'Honour both reduced-motion triggers with stepped progress and no flash/snap animation.',
  ],
  acceptance: [
    'Actual hold interaction; confirmation only after 900ms full charge',
    'Four frame segments fill bottom → left → top → right tracking elapsed hold',
    'Button compresses 1 → 0.97 during hold; completion flashes pale (<80ms) then snaps 0.97 → 1.025 → 1',
    'Label becomes CONFIRMED only at full charge',
    'Early release drains backwards ≤250ms and does not fire the action',
    'Pointer and keyboard accessible; reduced motion keeps hold semantics with stepped progress',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#020912;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
