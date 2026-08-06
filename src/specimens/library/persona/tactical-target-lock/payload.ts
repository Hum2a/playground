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
    'Mount inside a relative host (~380×280+).',
    'Import demo.css verbatim; keep frozen attack offsets (±28px / ±24px), overshoot (2.5px), and phase timings.',
    'Use radiogroup semantics; call tacticalTargetLock.select(root, index) or rely on click/keyboard.',
    'When switching, release the previous lock outward before the new attack begins (~50ms after release starts).',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate locked composition.',
  ],
  acceptance: [
    'Three targets available; none selected initially',
    'Four corner brackets converge from outside, overshoot once, then settle',
    'Guide lines appear briefly during acquisition only',
    'Selected card scales 1 → 0.98 → 1.02 under ~180ms',
    'LOCKED marker appears after brackets settle',
    'Switching releases old brackets outward before new lock settles',
    'Hover preview is faint and distinct from selection; keyboard works; focus ≠ selected',
    'Reduced motion immediate; no external assets; works under sandbox="allow-scripts"',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#020912;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
