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
    'Mount the 320×58 field in a dark host; keep the slash between the opaque plate and the transparent input.',
    'Import demo.css verbatim; freeze 350×8 slash at −7deg, 220ms draw, −3px / 90ms recoil.',
    'Call window.invalidFieldSlash.trigger(root); reset then slash once; ignore re-entry while busy.',
    'Keep aria-invalid and aria-describedby wired to INVALID VALUE; slash is decorative.',
    'Honour both reduced-motion triggers with an immediate final slash and error text, no recoil.',
  ],
  acceptance: [
    'VALIDATE produces exactly one slash that crosses underneath readable input text',
    'Slash is 350×8 at −7deg, scaleX 0→1 over 220ms after a 40ms delay',
    'Field recoils −3px for 90ms once; no continuous shake',
    'Error state settles with dark-red border, visible slash, and INVALID VALUE',
    'aria-invalid=true and aria-describedby expose the error without relying on the slash',
    'Reduced motion shows final slash + error immediately; keyboard VALIDATE works',
    'No external assets or libraries',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#111827;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
