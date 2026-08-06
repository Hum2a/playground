import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-clipped host (~360×440 viewport).',
    'Import demo.css verbatim; freeze 110px max pull, 72px threshold, 58px hold.',
    'Two threshold ticks at 72px; RELEASE status; below threshold cancels.',
    'Committed refresh 620ms with one rotation; timestamp updates after cycle.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Pull is resisted with max 110px display',
    'Threshold exactly 72px with two ticks and RELEASE status',
    'Below threshold release returns to zero without refresh',
    'At/above threshold commits to 58px hold and 620ms refresh',
    'Exactly one refresh arc rotation',
    'Timestamp changes only after committed refresh',
    'Content returns to zero after refresh',
    'Reduced motion: static indicator, direct completion',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:480px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
