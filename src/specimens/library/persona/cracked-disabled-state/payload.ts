import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Keep ACCESS MODULE as a native disabled button; the wrapper only visualises a rejected pointer attempt and must not grant access.',
    'Copy demo.html and demo.css verbatim; preserve the single SVG with exactly five fracture paths.',
    'Use the wrapper’s active state for the no-script rejection preview, or set data-rejected="true" from application code after a gated request.',
    'Honour both reduced-motion triggers: show the final fracture immediately with no path draw.',
  ],
  acceptance: [
    'ACCESS MODULE is a native button with disabled semantics',
    'A wrapper press reveals one rejection notice without enabling the module',
    'The decorative fracture SVG contains exactly five path elements',
    'No looping motion, external assets, fonts, network, or JavaScript',
    'Reduced motion keeps the final cracked state visible without animation',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:250px;background:#080d16;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
