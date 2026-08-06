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
    'Import demo.css verbatim; freeze hold 420ms, move cancel 8px, lift 160ms.',
    'Wire resetLongPressLift; only target card lifts; actions after lift only.',
    'Exactly four corner ticks on lifted target.',
    'Honour both reduced-motion triggers with instant lifted state.',
  ],
  acceptance: [
    'Long-press threshold exactly 420ms',
    'Movement over 8px before threshold cancels hold',
    'Early release performs no lift',
    'Only MESSAGE // 04 target card lifts',
    'Exactly four corner ticks appear after lift',
    'COPY PIN DELETE actions appear only after lift',
    'RESET restores original layout',
    'Reduced motion: instant lifted/context state',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#10141c;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
