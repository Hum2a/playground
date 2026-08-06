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
    'Mount inline; import demo.css verbatim.',
    'Keep the 200%-wide track and 50% page transform frozen; NEXT/PREV must use the identical transition regardless of direction.',
    'Disable PREV on page 1 and NEXT on the last page using the native disabled attribute.',
    'Honour both reduced-motion triggers by removing the transition, not the state change.',
  ],
  acceptance: [
    'Idle: page 1 of 2 visible, PREV disabled',
    'NEXT translates the track to -50%, revealing cards 4-6 as one group, then disables itself',
    'PREV translates back to 0% using the identical transition duration and easing',
    'Live status announces the current page after every change',
    'Reduced motion keeps the same page states with transitions disabled',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#0c0c0f;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
