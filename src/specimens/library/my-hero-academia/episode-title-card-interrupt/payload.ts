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
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; preserve 420ms slide-in timing.',
    'Wire Interrupt trigger; reset via resetEpisodeTitleCardInterrupt().',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Interrupt trigger pauses app and reveals EPISODE // 12 title card',
    'Title card stays clipped inside the specimen bounds',
    'Replay resets overlay and app opacity deterministically',
    'Reduced motion shows final interrupted state immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101820;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
