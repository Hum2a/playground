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
    'Mount in a relative overflow-hidden square host so the over-long hand and conic mask clip cleanly.',
    'Import demo.css verbatim; keep --cw-sweep driven reveal, 2px hands, 10px hub, and 4deg trail.',
    'Wire clockHandWipe.wipe / reset; do not crossfade scenes — destination is only the swept sector.',
    'Announce wipe / done via the live status region; keep hands decorative (aria-hidden).',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate destination state.',
  ],
  acceptance: [
    'Hand begins at 12 and rotates 0deg → 360deg over ~700ms',
    'Reveal follows hand angle via conic-gradient mask (no opacity crossfade)',
    'Full 360deg coverage leaves destination fully visible',
    'Secondary pale hand trails primary by ~4deg; hub is 10px',
    'At completion hands contract into centre',
    'Reduced motion jumps straight to destination',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#060a12;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
