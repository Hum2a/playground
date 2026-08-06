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
    'Mount the demo surface and `.comic-wipe` overlay inside a relative, overflow-hidden frame that matches the transition viewport.',
    'Import or inline demo.css verbatim; keep the frozen hex colours and clip-path polygons.',
    'Call runComicWipe(onCovered) from your trigger; put the A↔B (or route) swap only inside onCovered so it runs while fully covered (~450ms).',
    'Guard re-entrancy with the busy flag (or equivalent) so spam-clicks cannot stack overlays.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with a non-sweeping cover → swap → reveal path.',
  ],
  acceptance: [
    'At ~420–500ms the five panels fully cover the viewport with no holes at widths 320–768',
    'Content swap happens only inside the coverage window; no mid-transition flash of the destination',
    'Tear-away exits are non-mirrored (up / left / right / down / upper-right), not reversed enters',
    'Exact hex colours #e60012 / #090909 / #f5f1e8; flat fills only',
    'Reduced motion works via prefers-reduced-motion and data-force-reduced-motion',
    'Spam-click safe; overlay stays aria-hidden; works under sandbox="allow-scripts" without parent/storage/fetch',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0a0a0a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
