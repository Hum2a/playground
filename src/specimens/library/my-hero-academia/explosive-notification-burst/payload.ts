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
    'Mount in relative overflow-hidden host; import demo.css verbatim.',
    'Frozen burst polygon via --enb-burst-clip/--enb-burst-scale-max; no radial bloom.',
    'Burst 420ms + card delay 120ms; wire Trigger / Replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Jagged ALERT polygon scales to 11× over 420ms — no soft radial bloom',
    'Notification card scales in with frozen jagged clip-path',
    'ALERT badge readable at settle',
    'Replay clears card to idle',
    'Reduced motion: instant card without burst',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101820;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
