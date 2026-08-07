import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount with preview.scaffold host.',
    'Import demo.css verbatim; freeze blip coords and 190ms step from contract.json.',
    'Wire runPresenceRadarSweep / reset / replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Sweep arcs once; three blips at frozen coords (57.6,49.3), (111.5,35), (154.1,62.1)',
    'Contacts log in bearing order 042° → 090° → 138°',
    'Resolved shows COMPLETE with all three contacts active',
    'Replay clears blips/log before rerunning',
    'Reduced motion shows all contacts COMPLETE immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#070b0e;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
