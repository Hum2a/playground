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
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 220×70 card, 260ms return, 6px overshoot cap.',
    'Placeholder prevents source collapse during drag.',
    'LOCKED triggers 90ms flash; INBOX absorbs without return.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Return starts from exact release coordinates',
    'Source placeholder remains until return completes',
    'LOCKED gives one 90ms boundary flash',
    'Proxy removed only after reaching source',
    'Valid INBOX drop never runs return animation',
    'Reduced motion: instant return after invalid cue',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
