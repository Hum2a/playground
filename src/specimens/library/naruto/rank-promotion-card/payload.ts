import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
    integration: [
    'Mount inside a relative host (~420×300+).',
    'Import demo.css verbatim; freeze collapse 140ms / expand 180ms / glow 280ms and GENIN→CHUNIN from contract.json.',
    'Wire runRankPromotionCard / resetRankPromotionCard / replayRankPromotionCard.',
    'Honour both reduced-motion triggers.',
  ],
    acceptance: [
    'Idle shows GENIN badge only (CURRENT)',
    'Morph phases: collapse 140ms → expand CHUNIN 180ms → glow 280ms',
    'Resolved shows CHUNIN with PROMOTED status',
    'Replay restores GENIN before rerunning',
    'Reduced motion shows CHUNIN / PROMOTED immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#1a1612;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
