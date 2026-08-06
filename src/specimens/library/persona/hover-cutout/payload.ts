import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount in a relative overflow-hidden host so oversized masses clip safely.',
    'Import demo.css verbatim; keep distinct enter/exit transform origins and frozen clip-paths.',
    'Use real links/buttons; keep mass/cut/red at pointer-events: none to avoid hover flicker.',
    'Ensure :focus-visible matches the hover composition plus a visible focus ring.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with instant compositions.',
  ],
  acceptance: [
    'Idle actions stay restrained (paper chip + ink type)',
    'Hover/focus produces black geometry larger than the target (~135%×170%)',
    'Paper cutout aperture makes the label read as negative space — not mere background inversion',
    'Red shard appears ~30ms after the mass with ~8px 5px offset',
    'Enter (~200ms, overshoot) and exit (~140ms, opposite-side collapse) differ directionally',
    'Keyboard focus-visible supported; no pointer flicker; CSS-only',
    'Reduced motion is static; no external assets; works ~320–768px',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#12141a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
