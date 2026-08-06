import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×340+).',
    'Import demo.css verbatim; freeze stagger/travel/settle timings from contract.json.',
    'Wire runShadowCloneFanOut / resetShadowCloneFanOut / replayShadowCloneFanOut.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly three clone proxies fan from source into three worker slots',
    'Idle, fanning, and done states are visually distinct',
    'Source dims to an ORIGIN marker once fan-out completes',
    'Replay resets all slots before rerunning',
    'Reduced motion fills all slots immediately',
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
