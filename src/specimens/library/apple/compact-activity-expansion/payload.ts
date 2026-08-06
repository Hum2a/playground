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
    'Mount inside a relative overflow-hidden dark host (~360×280).',
    'Import demo.css verbatim; freeze 126×36→318×152 geometry and 360ms expansion.',
    'Wire expandCompactActivity / collapseCompactActivity / resetCompactActivity.',
    'Progress glyph must persist and relocate to expanded header.',
    'Exactly two compact status nodes; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'One compact representation becomes one expanded representation',
    'Width changes 126→318px; height 36→152px; radius 18→24px',
    'Progress identity persists through transition',
    'Exactly two compact status nodes',
    'Expanded rows appear in deterministic order at 35/50/68%',
    'Collapse returns to exact compact dimensions',
    'Reduced motion: immediate or 100ms non-scaling',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0c0d10;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
