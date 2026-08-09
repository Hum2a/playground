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
    'Compute the delta chip text and both before/after total strings from real data before calling slamXp().',
    'Import demo.css verbatim; keep the frozen delta-travel arc and punch-swap timing values.',
    'Wire slamXp / resetXp / replayXp (or equivalent class toggles) without appending duplicate particle nodes.',
    'Keep both total spans as real, readable text; only the delta chip and particles are aria-hidden.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the static new total.',
  ],
  acceptance: [
    'Delta chip enters from off-screen and travels toward the total on a visibly dipped arc',
    'The old total visibly shrinks away and the new total punches in with overshoot at the moment the delta arrives',
    'A small particle burst appears only at the impact point',
    'No smooth digit odometer roll is used — the swap is a discrete punch replacement',
    'Effect can be reset and replayed without accumulating DOM',
    'Reduced motion immediately shows the new total as static readable text',
    'Works from roughly 240-768px with no external assets or libraries',
  ],
  scaffold: `
<div class="xp-panel" style="position:relative;width:100%;height:180px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
