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
    'Mount in overflow-visible relative host; import demo.css verbatim.',
    'Fill 580ms then break 320ms; total 1230ms.',
    'Wire Breakthrough / Replay to runMaximumOutputBreakthrough.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Meter fills to nominal 100%',
    'Fill extends past track with burst shard',
    'MAX+ label appears at breakthrough',
    'Replay resets meter to 72% idle',
    'Reduced motion: breakthrough state instant',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101820;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
