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
    'Mount the 620×380 surface in a relative overflow-clipped host; keep TRIGGER outside the stacked panels.',
    'Import demo.css verbatim; freeze 180px moon, 2px rim, overlay .92, 350/300/200/350ms.',
    'Call window.eclipseTransition.trigger(root); reset then play; ignore re-entry while busy; never auto-loop.',
    'Keep the moon aria-hidden; announce state via visible copy and the polite status region.',
    'Honour both reduced-motion triggers by skipping the moon and showing NEXT STATE immediately.',
  ],
  acceptance: [
    'TRIGGER resets to CURRENT STATE then runs exactly one 1200ms eclipse sequence; busy-guard prevents stacking',
    'Moon (180px, 2px cyan rim) enters from the left in 350ms, eclipses at centre for 300ms, dark 200ms, exits during 350ms reveal',
    'Smaller dark disc crosses the moon into a luminous crescent at centre — not a hard rectangular cut',
    'Overlay peaks at 0.92 during dark; NEXT STATE is already underneath; not an instant black cut',
    'Effect never loops; restart only via TRIGGER after settle',
    'Reduced motion: immediate NEXT STATE, no moon travel',
    'No external dependencies; sandbox allow-scripts only',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#09111d;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
