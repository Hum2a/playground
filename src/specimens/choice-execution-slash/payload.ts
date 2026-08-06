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
    'Mount the option radiogroup and CONFIRM control inside a relative overflow-hidden frame.',
    'Import demo.css verbatim; keep frozen slash geometry (130% × 20px @ 18deg) and timings.',
    'Wire selectChoice for pre-confirm emphasis only; call runChoiceSlash on CONFIRM; resetChoiceSlash restores the trio.',
    'Announce via a polite status string; keep decorative shards/slash aria-hidden.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with the instant-confirm path.',
  ],
  acceptance: [
    'Three choices visible before confirmation; selection alone does not trigger destruction',
    'Confirm creates a diagonal slash that crosses the option group',
    'Unselected alternatives visibly leave via split pieces (not opacity-only)',
    'Selected choice survives the slash and enlarges into a final SELECTED state',
    'Total ≈620ms; nothing loops; reset restores all options without leftover shards',
    'Reduced motion immediately confirms; keyboard radios remain usable; sandbox-safe',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#090909;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
