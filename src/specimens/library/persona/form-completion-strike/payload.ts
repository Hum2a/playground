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
    'Mount the 520×380 contact card in a dark overflow-hidden host; keep NAME and EMAIL valid and MESSAGE empty at rest.',
    'Import demo.css verbatim; freeze 180×6 slash at −8deg / 180ms, COMPLETE badge 220ms, exactly four 2px radial accents.',
    'Call window.formCompletionStrike.complete(root) only when native fields are valid; no-op or keep the button disabled otherwise.',
    'Announce completion with role="status"; slash and accents stay aria-hidden.',
    'Honour both reduced-motion triggers with COMPLETE + final slash immediately, no movement.',
  ],
  acceptance: [
    'COMPLETE FORM stays disabled or no-ops until NAME, EMAIL, and MESSAGE are all valid',
    'On success the form border brightens once, then a cyan 180×6 slash at −8deg draws scaleX 0→1 in 180ms',
    'COMPLETE badge enters slightly after the strike begins over 220ms',
    'Exactly four radial 2px accents appear; no particles',
    'role="status" announces completion; replay restores idle fields and hides the badge',
    'Reduced motion shows COMPLETE + final slash immediately with no movement',
    'Keyboard operable; colour is not the only complete signal; no parent, storage, or external assets',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#111827;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
