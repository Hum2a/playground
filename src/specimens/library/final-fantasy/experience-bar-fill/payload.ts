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
    'Mount in a relative, overflow-hidden host at least 360×260px.',
    'Import demo.css verbatim and load demo.js after the markup.',
    'Keep the AWARD XP button available so the fixed reward sequence can replay.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion by showing the final level and gauge state immediately.',
  ],
  acceptance: [
    'The gauge starts at 82 / 100 XP, fills to the threshold, then settles at LEVEL 5 and 17 / 100 XP.',
    'The fill uses fixed 390ms steps(6, end) phases and one finite 120ms level-up burst.',
    'AWARD XP restarts the same deterministic sequence without accumulating timers.',
    'Reduced motion renders the final LEVEL 5 and 17 / 100 XP state immediately.',
  ],
  files: { html, css, js },
  spec,
  contract,
}

export default payload
