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
    'Mount in a host at least 620×420 so the 260px orbit and outer labels are not clipped.',
    'Keep the five options as role="radio" buttons inside a role="radiogroup"; do not rotate the menu.',
    'Import demo.css verbatim; keep orbit diameter 260px, moon 34px, and 420ms travel.',
    'Drive selection through selectOrbit(index); unwrap the shortest ±180° route on a continuous angle.',
    'Support ArrowUp/Down/Left/Right and Enter; clockwise is Right/Down, counterclockwise is Left/Up.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion by dropping the transform transition.',
  ],
  acceptance: [
    'Exactly five fixed options: HOME, STATUS, MAP, ARCHIVE, SETTINGS',
    'A 260px orbit with a 1px #236B91 stroke stays still; the menu does not rotate',
    'A 34px crescent moon sits on the orbit beside the active option',
    'Selection moves the moon along the shortest angular route in 420ms',
    'Active option uses brighter text, a small cyan underline, subtle glow, and the moon marker',
    'Keyboard: ArrowUp ArrowDown ArrowLeft ArrowRight Enter in deterministic clockwise/counterclockwise order',
    'Reduced motion jumps the moon to the target with no travel',
    'No external assets, parent access, or storage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#09111D;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
