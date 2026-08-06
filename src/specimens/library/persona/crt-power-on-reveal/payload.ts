import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside relative overflow-hidden host (~360×280).',
    'Wire runCrtPowerOn / resetCrtPowerOn / replayCrtPowerOn.',
    'Sequence: line 180ms → expand 320ms → bloom 280ms → resolve 360ms.',
  ],
  acceptance: [
    'Power on runs line → bloom → SIGNAL READY deterministically',
    'Replay resets to off before rerunning',
    'Reduced motion shows final UI immediately',
    'Palette uses #F5C400 / #101010 / #F7F3E8 / #E8E8E8',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#101010;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
