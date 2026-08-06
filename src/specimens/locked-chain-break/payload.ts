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
    'Mount underlay content and the locked-chain overlay inside a relative overflow-hidden host.',
    'Keep chapter content in the DOM throughout — never inject it after the break.',
    'Import demo.css verbatim; keep frozen link clip-paths, rotations, and timing.',
    'Disable the primary action while locked; enable after unlock. Announce lock state via aria-live.',
    'Wire breakLockedChain / resetLockedChain; honour both reduced-motion triggers with immediate reveal.',
  ],
  acceptance: [
    'At least seven angular links form a visible chain crossing ~52% of the host',
    'Tension (±3px, centre scaleX 1.08) occurs before the break',
    'Centre link visibly fractures into two pieces with exactly three small fragments',
    'Left/right segments recoil oppositely (~−125% / +125%) while links stay grouped',
    'LOCKED label slashes then exits downward separately',
    'Underlying content exists throughout; OPEN CHAPTER stays disabled until unlock',
    'ACCESS GRANTED remains after completion; reset restores the chain',
    'Reduced motion unlocks immediately with no tension/fracture/recoil',
    'No realistic/external chain assets, dependencies, or network; geometry frozen in contract',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#1a1a1a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
