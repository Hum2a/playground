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
    'Mount inside a relative, overflow-clipped host sized for the angled rail (~300×280 minimum).',
    'Import demo.css verbatim; keep the frozen navy/blue/cyan/white palette and stepped timings.',
    'Call selectPrecisionMenu(index) or rely on auto-init on [data-precision-menu]; keep radiogroup semantics.',
    'Guard re-entrancy with the busy flag so rapid selection changes cannot stack mid-snap.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate selected geometry path.',
  ],
  acceptance: [
    'Selection change completes in approximately 260ms',
    'Selected option shows different geometry (offset plate, corners, accent), not colour alone',
    'Targeting lines visibly converge on the selected option',
    'Keyboard arrows / Home / End move selection among real radio controls',
    'Reduced motion removes snapping/travel via prefers-reduced-motion and data-force-reduced-motion',
    'No external assets or libraries; works under sandbox="allow-scripts"',
    'Readable at narrow preview widths (~320px)',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#06182d;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
