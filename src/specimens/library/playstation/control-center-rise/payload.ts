import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden host (~400×320).',
    'Import demo.css verbatim; wire toggleControlCenter for open/dismiss.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Open raises the strip so it covers the bottom of the playfield',
    'Dismiss restores the full sharp game view',
    'TITLE A layered game plane stays visible (blurred) while the strip is open',
    'Strip shows five labeled slots: Friends, Media, Party, Store, Settings',
    'Reduced motion snaps strip and blur to final states with no transition',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
