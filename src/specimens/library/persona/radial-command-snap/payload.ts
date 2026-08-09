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
    'Mount inside a container sized at least 240x240 so the 224px ring and its 92px orbit radius fit without clipping.',
    'Keep options as real role="radio" buttons inside a role="radiogroup" — this is a functioning control, not a decorative loop.',
    'Import demo.css verbatim; keep the frozen ring diameter, orbit radius, and slot angles.',
    'Wire selectCommand(index) to your real command list; recompute all five transforms whenever selection changes.',
    'Support ArrowLeft/ArrowRight for keyboard selection in addition to click.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion by dropping transform from the transition list.',
  ],
  acceptance: [
    'Five options sit evenly spaced (72°) around a circular field',
    'Selecting an option rotates the whole arrangement so that option reaches the fixed top pointer',
    'Every option label stays upright throughout the rotation, never appearing sideways or inverted',
    'The centre hub label updates to match the newly active option with a punch animation',
    'The snap transition contains a small overshoot, not a linear ease',
    'The control is operable via click and ArrowLeft/ArrowRight keyboard input',
    'Reduced motion removes the orbit animation and hub punch while keeping selection fully functional',
    'Works from roughly 280-768px with no external assets or libraries',
  ],
  scaffold: `
<div class="battle-panel" style="position:relative;width:100%;height:280px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
