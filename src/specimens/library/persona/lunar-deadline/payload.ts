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
    'Mount in a 620×340 dark host; keep the geometric moon circular via equal width/height.',
    'Import demo.css verbatim; drive FULL → WANING GIBBOUS → LAST QUARTER → NEW via data-phase.',
    'Wire advanceLunarDeadline / resetLunarDeadline; use type=button controls under sandbox allow-scripts.',
    'Announce remaining phases with a dynamic aria-label plus a polite live status — not per-frame.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate phase snap.',
  ],
  acceptance: [
    'Copy reads DEADLINE plus 03 PHASES REMAINING with the moon to the left',
    'Exactly four states: FULL → WANING GIBBOUS → LAST QUARTER → NEW',
    'ADVANCE moves one state; RESET returns to FULL; no wall clock',
    'Phase transition is 620ms: illumination decreases, shadow grows, label and urgency update',
    'Urgency is normal / elevated / urgent / critical with no flashing',
    'NEW may show a static thin cyan/red boundary; phase text always names the state',
    'aria-label follows Deadline: three phases remaining (dynamic)',
    'Reduced motion snaps the phase immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#09111d;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
