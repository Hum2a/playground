import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Abstract polygon silhouette only — no character likeness.',
    'Approach 280ms, freeze 140ms, card 420ms; wire run/reset/replay APIs.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Start runs approach → freeze → card sequence',
    'Final ANALYST card and frozen silhouette readable',
    'Replay resets to idle',
    'Reduced motion shows final pose immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101820;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
