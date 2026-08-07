import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Local and cloud vertical meters with centre hub; % labels stay visible.',
    'Wire runCloudSyncProgress / resetCloudSyncProgress / replayCloudSyncProgress.',
  ],
  acceptance: [
    'Local and cloud vertical meters start unbalanced (18% / 42%) with visible % labels',
    'Sync raises both meters toward 100% until hub reads OK',
    'No DualSense leftover class names in reduced-motion rules',
    'Live region announces unbalanced → balanced',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0B0F14;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
