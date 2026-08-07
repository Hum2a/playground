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
    'RESUME: frozen 112×64 PAUSED snap → live surface (480ms expand / 260ms fade).',
    'Honour both reduced-motion triggers — remove motion, keep frozen/live end states.',
  ],
  acceptance: [
    'Frozen phase shows grayscale PAUSED stamp distinct from LIVE surface',
    'Live phase shows LIVE badge, green pulse, and pulsing playhead',
    'Uses unique .qrs chrome — no shared .ps__stage twinning',
    'Expand duration 480ms; reduced motion snaps with no pulse animation',
    'Status announces frozen vs live outside decorative roots',
  ],
  scaffold:
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  files: { html, css, js },
  spec,
  contract,
}

export default payload
