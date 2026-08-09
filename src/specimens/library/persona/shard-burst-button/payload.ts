import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Keep demo.css as the portable artifact; Vitest loads this raw text twin.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount the 12 fixed shard elements beside the semantic CONFIRM button.',
    'Import demo.css and demo.js verbatim, then call window.shardBurstButton.init(scope?).',
    'Use window.shardBurstButton.trigger(root) to start or safely restart the burst.',
    'Keep shards aria-hidden and announce confirmation through the polite status region.',
    'Honour both reduced-motion triggers by applying the confirmed state without shard travel.',
  ],
  acceptance: [
    'A native button exposes the semantic CONFIRM action',
    'Exactly 12 deterministic shards burst from the button',
    'Every activation safely restarts a burst without accumulating timers or duplicate handlers',
    'The final confirmed state stays visible after motion ends',
    'Reduced motion has no shard animation and preserves the confirmed text state',
    'No external dependencies; safe in an allow-scripts sandbox',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#071525;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
