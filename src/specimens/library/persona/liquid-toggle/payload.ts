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
    'Mount the 180×68 vessel in a relative host; import demo.css verbatim.',
    'Freeze OFF 18% / ON 82%, ON 460ms vs OFF 360ms, waterline 10px / ±3px wave.',
    'Wire window.liquidToggle.toggle(root) or click/Space/Enter on the button.',
    'Expose state with aria-pressed; announce via the polite status region.',
    'Honour both reduced-motion triggers with an immediate level jump and static waterline.',
  ],
  acceptance: [
    'Real button toggle with aria-pressed true/false',
    'OFF liquid ~18% muted navy; ON liquid ~82% cyan; labels OFF/ON',
    'ON fill 460ms (.2,.85,.25,1); OFF drain 360ms (.65,0,.3,1)',
    'Waterline 10px stays attached; ±3px wave only during travel then static',
    'Space and Enter toggle; not a pill switch',
    'Reduced motion: instant level, no travel or wave',
    'No external dependencies; sandbox allow-scripts only',
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
