import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inline; import demo.css verbatim.',
    'Track active index and per-slot progress; hand off on completion.',
    'Wire runDownloadQueueAdvance / resetDownloadQueueAdvance / replayDownloadQueueAdvance.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Three ranked queue slots; only one NOW active at a time',
    'Completion hands off to next slot with HANDOFF chip before NOW',
    'Completed slots keep DONE state during subsequent fills',
    'Live region announces each handoff; reduced motion completes all immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#0B0F14;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
