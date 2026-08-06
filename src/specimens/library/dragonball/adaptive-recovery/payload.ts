import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inline; keep previous-baseline panel visible throughout.',
    'Import demo.css verbatim; preserve health ladder, 120ms baseline hold, and three adaptation struts.',
    'Call runAdaptiveRecovery / runAdaptiveRecoveryReset; adaptation must follow recovery, never skip the hold under motion.',
    'Announce previous and new baseline values for accessibility.',
    'Honour both reduced-motion triggers with an immediate adapted state.',
  ],
  acceptance: [
    'Begins FAILED at 18% with PREVIOUS BASELINE visible',
    'Health walks 18→36→57→78→100 over ~700ms then holds 120ms at old baseline',
    'Exactly three adaptation struts; capacity 100→128, retries 2→4, latency 84→61ms',
    'Deltas and NEW BASELINE appear; status ADAPTED; before/after remain readable',
    'Reduced motion immediately shows adapted result',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:460px;background:#101218;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
