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
    'Mount inside a relative host (~400×380+).',
    'Import demo.css verbatim; keep frozen SVG path geometry and stem/branch timings.',
    'Wire evolve → select (radiogroup) → choose via window.branchEvolutionChoice or the controls.',
    'Selection emphasis must thicken the corresponding branch path — do not teleport highlight alone.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with immediate structure / final identity.',
  ],
  acceptance: [
    'One current BUILD // STANDARD; exactly three futures',
    'Branches physically grow from a shared ~45px stem (not fade-only cards)',
    'Keyboard left/right selects; emphasis stays on branch geometry',
    'CHOOSE retracts unselected branches (~220ms); current travels the kept path',
    'Final identity is BUILD // {chosen}; other futures gone; static',
    'Reduced motion usable; no external assets; sandbox allow-scripts',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#0b0f14;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
