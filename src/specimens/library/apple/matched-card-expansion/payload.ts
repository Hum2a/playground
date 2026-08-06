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
    'Mount inside a relative overflow-hidden host (520×520 preview).',
    'Import demo.css verbatim; freeze ORBIT card start bounds and animate transition layer to 20px inset.',
    'Wire OPEN ORBIT / CLOSE (or openMatchedCardExpansion / closeMatchedCardExpansion).',
    'Title ORBIT persists 20px→34px; sibling cards recede scale(.96) translateY(8px) over 180ms.',
    'Detail-only content reveals after 55% (253ms) of the 460ms expansion.',
    'Honour both reduced-motion triggers with instant opacity/outline swap.',
  ],
  acceptance: [
    'Preview 520×520 with ORBIT, ATLAS, NOVA cards; ORBIT interactive at 180×118',
    'OPEN ORBIT expands from exact measured card bounds to detail inset 20px over 460ms',
    'Title ORBIT persists and grows 20px→34px through the transition',
    'ATLAS and NOVA recede with scale(.96) translateY(8px) over 180ms',
    'Detail content begins revealing after 55% transition progress',
    'CLOSE reverses spatial ownership to exact originating card bounds',
    'Repeated open/close does not drift geometry',
    'Reduced motion: short opacity/outline swap without large-scale movement',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:520px;background:#101218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
