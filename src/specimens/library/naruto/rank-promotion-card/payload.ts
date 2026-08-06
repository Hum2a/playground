import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze fold/settle timings from contract.json.',
    'Wire runRankPromotionCard / resetRankPromotionCard / replayRankPromotionCard.',
    'Listen for a postMessage `{ type: "restart" }` to replay; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle card shows current rank badge, status CURRENT',
    'Active phase folds the current badge away and reveals the next rank',
    'Resolved phase shows the promoted badge glowing, status PROMOTED',
    'Replay resets to the current rank before rerunning',
    'Reduced motion shows the promoted rank immediately',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
