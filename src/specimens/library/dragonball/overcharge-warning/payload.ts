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
    'Mount inside a relative host (~440×320+).',
    'Import demo.css verbatim; keep safe width, overflow bay at 25% of normal scale, and frozen ladder.',
    'Wire INCREASE LOAD via runOverchargeWarning; RESET / harness restart via resetOverchargeWarning.',
    'Do not animate fill past the parent by width overflow alone — unfold the 100–125% region; decorative bleed/spill may extend outside the frame.',
    'Rupture cracks appear at first overflow step; OVERFLOW RUPTURE band at 118%.',
    'Announce above-safe-capacity text; no looping shake or strobing.',
  ],
  acceptance: [
    'Starts at 72%; safe maximum marked at 100%; hard limit 125% visible',
    'Holds 160ms at 100% with NOMINAL MAXIMUM before overflow unfolds',
    'Ends at 118% OVERCHARGED with rupture cracks, bleed bands, drip spill, and OVERFLOW RUPTURE alert band',
    'Warning uses structure + text, not colour alone; no looping shake',
    'Reduced motion immediately shows overcharged final state',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0a0e12;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
