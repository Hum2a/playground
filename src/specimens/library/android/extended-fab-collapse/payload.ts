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
    'Mount inside relative overflow-hidden host.',
    'Import demo.css verbatim; freeze 152→56px width over 240ms.',
    'Label fades before width finishes shrinking.',
    'Right edge remains fixed during collapse.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Right edge remains fixed',
    'Minor scroll jitter does not toggle state',
    'Label never spills outside shrinking container',
    'Down 48px / up 36px thresholds differ',
    'At scroll top extended state restored',
    'Reduced motion: immediate width switch',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
