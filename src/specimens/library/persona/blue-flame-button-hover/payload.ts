import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount with a little top padding so rising polygons are not clipped by the host.',
    'Import demo.css verbatim; keep five polygons, scaleY/translateY values, and enter/exit timings.',
    'Keep the energy layer pointer-events: none and aria-hidden.',
    'Pair :hover with :focus-visible for equivalent keyboard treatment.',
    'Honour both reduced-motion triggers with static shapes and no loop.',
  ],
  acceptance: [
    'Exactly five graphic CSS energy polygons attached to the button top edge',
    'Rest state is scaleY 0; hover/focus rises with staggered scaleY ~0.6–1.4 and 5–14px upward travel',
    'Entrance ~150ms; exit collapses into the edge ~120ms',
    'Label shifts 3px right; thin lower edge brightens',
    'Keyboard focus-visible matches hover energy treatment',
    'Reduced motion shows static five shapes with no loop; CSS-only; no flame images',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:240px;background:#020912;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
