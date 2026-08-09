import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount the 280×52 email field in a dark host with room above for the ejected label.',
    'Import demo.css verbatim; keep the two-stage 180ms eject and 140ms empty-blur return.',
    'Use a real label[for] sibling after the input; placeholder must be a single space.',
    'Stay ejected while focused or :not(:placeholder-shown); populated blur does not return.',
    'Honour both reduced-motion triggers with an instant ejected or rest pose, no travel.',
  ],
  acceptance: [
    'EMAIL label starts inside the field and is a real label[for] control',
    'Focus ejects in two stages: −20px / 0.82 then −34px / 0.72 over 180ms total',
    'Ejected label sits on a 90×22 #236B91 backing rotated −3deg with #E9EEF5 type',
    'Focused input border is #72D6E8; empty blur returns in 140ms',
    'Populated fields stay ejected after blur',
    'Reduced motion jumps to the final pose with no travel; keyboard focus works',
    'CSS-only; no external assets or libraries',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:240px;background:#111827;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
