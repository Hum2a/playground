import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×340+).',
    'Import demo.css verbatim; freeze angles 0/72/144/216/288 and step 160ms from contract.json.',
    'Wire runNetworkScan360 / reset / replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Five nodes at frozen bearings 0/72/144/216/288 discover in order',
    'Sweep completes one revolution; discovery log marks each node',
    'Resolved inventory shows all five nodes active',
    'Replay clears nodes/log before rerunning',
    'Reduced motion shows full inventory immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#070b0e;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
