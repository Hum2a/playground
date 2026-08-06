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
    'Mount inside a relative host (~320×360+).',
    'Import demo.css verbatim; keep Form B clip-path, settle 180ms, ring 160%→112% / 260ms, and four cardinals.',
    'Call evolutionComplete.run() / .reset() or use REGISTER / RESET.',
    'Status must wipe with the sweep — no opacity fade between UNREGISTERED and CANONICAL.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate canonical path.',
  ],
  acceptance: [
    'Begins with Form 02 already present and UNREGISTERED',
    'Entity settles from scale 1.08 / translateY(-6px) to rest over ~180ms',
    'Registration ring contracts ~160% → 112% over ~260ms',
    'Exactly four cardinal markers lock onto the ring',
    'Status becomes CANONICAL only during the left→right sweep (no fade)',
    'PREVIOUS // FORM 01 remains as historical metadata in an archive position',
    'Final state is static; reduced motion immediate; no Pokémon assets',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0c0a12;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
