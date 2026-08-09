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
    'Mount in a 420×360 dark host; keep JUNE 2026 as a stable heading outside the sliding date stage.',
    'Use only the five deterministic demo dates — never Date.now() or the system clock.',
    'Import demo.css verbatim; keep the 64px moon and 360ms slide / crossfade.',
    'Wire PREVIOUS / NEXT as real buttons; disable them at the ends of the demo sequence.',
    'Expose the date as text (day + weekday) plus an aria-live announcement; do not rely on the moon alone.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an instant date and moon swap.',
  ],
  acceptance: [
    'Heading reads JUNE 2026 and does not move when the date changes',
    'Exactly five demo dates: 17 WED CRESCENT through 21 SUN GIBBOUS',
    'PREVIOUS and NEXT are real buttons; date is shown as text, not moon-only',
    'On change the outgoing date slides away, the incoming date enters from the opposite side, and the moon crossfades/masks in 360ms',
    '64px geometric moon matches the listed phase for each date',
    'Reduced motion applies the new date and moon instantly',
    'No system clock, external assets, parent access, or storage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#09111D;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
