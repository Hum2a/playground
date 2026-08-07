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
    'Mount inside a relative overflow-hidden host; import demo.css verbatim.',
    'ENTER REST MODE: active → dimming (55%, 700ms) → rest (18%). WAKE resets.',
    'Honour both reduced-motion triggers — remove motion, keep end states.',
  ],
  acceptance: [
    'Stage shows a console silhouette with status LED and pulsing activity bars (not a tile grid)',
    'ENTER REST MODE dims stage brightness to 55% for 700ms, then to 18%',
    'At rest: activity bars stop/hide, LED softens, REST label is visible',
    'WAKE restores full luminance and activity',
    'Reduced motion snaps between active/dimming/rest with no transitions or pulse',
  ],
  scaffold:
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  files: { html, css, js },
  spec,
  contract,
}

export default payload
