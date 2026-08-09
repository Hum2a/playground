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
    'Mount in a 420×360 dark host; keep the card at 280×180 and the new moon at 82px.',
    'The card is non-interactive; only ATTEMPT ACCESS beneath it triggers the refusal sequence.',
    'Import demo.css verbatim; freeze emphasis 80ms, rim flash 180ms, recoil 2px / 120ms, denied 600ms, return 220ms.',
    'Busy-guard the sequence with one timer at a time — do not stack overlapping timeouts.',
    'Use an angular status marker, not a padlock. Reserve #C94F58 for the brief ACCESS DENIED state only.',
    'Honour both reduced-motion triggers: skip moon/rim motion, show ACCESS DENIED immediately, then return after 600ms + 220ms.',
  ],
  acceptance: [
    'Card is 280×180, non-interactive, labelled NIGHT ACCESS / UNAVAILABLE with ACCESS RESTRICTED copy',
    'Central new moon is an 82px circle (#111827, rim #236B91) with a tiny top-right crescent highlight',
    'Status uses a small angular marker — not a padlock or lock icon',
    'ATTEMPT ACCESS runs emphasis 80ms → rim flash 180ms → 2px recoil 120ms → ACCESS DENIED 600ms → UNAVAILABLE 220ms',
    'Sequence is busy-guarded and does not stack timers, shake the page, flash rapidly, or open a red modal',
    'Reduced motion keeps a static new moon, jumps to ACCESS DENIED, then returns after the same 600ms + 220ms delay',
    'No external assets, parent access, or storage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#09111D;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
