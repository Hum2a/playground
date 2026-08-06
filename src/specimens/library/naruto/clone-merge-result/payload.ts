import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~400×340+).',
    'Import demo.css verbatim; freeze converge/merge/expand timings from contract.json.',
    'Wire runCloneMergeResult / resetCloneMergeResult / replayCloneMergeResult.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Three clone result cards converge into one output card',
    'Idle, converging, merging, and resolved states are visually distinct',
    'Output card shows the combined result only once merge completes',
    'Replay resets before rerunning',
    'Reduced motion shows the merged result immediately',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
