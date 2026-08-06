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
    'Mount the demo surface and `.ink-splat` overlay inside a relative, overflow-hidden frame that matches the transition viewport.',
    'Import or inline demo.css verbatim; keep the frozen hex colours and border-radius blob geometry.',
    'Call runInkTransition(onCovered) from your trigger; put the A↔B (or route) swap only inside onCovered so it runs while fully covered (~500ms).',
    'Guard re-entrancy with the busy flag (or equivalent) so spam-clicks cannot stack overlays.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with a non-travelling solid cover → swap → reveal path.',
  ],
  acceptance: [
    'At least seven irregular ink shapes participate; multiple independent impact positions are visible at widths 320–768',
    'Satellite droplets appear during initial hits; solid purple backing plus splats fully cover before swap — no old-state flash',
    'Content swap happens only inside onCovered (~500ms); total sequence ~1100ms',
    'Exit peels/shrinks toward different off-centre directions; exits are non-mirrored (not reversed scale-in)',
    'Exact purple #7c28d9; lime accent #b7ef32 on one splat; no images, canvas, SVG assets, particle libs, or network',
    'Reduced motion works via prefers-reduced-motion and data-force-reduced-motion with no splat travel/expansion',
    'Spam-click safe; overlay stays aria-hidden; works under sandbox="allow-scripts" without parent/storage/fetch',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#f7f5ed;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
