import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative, overflow-hidden host so the drop and sideways exit clip correctly.',
    'Import or inline demo.css verbatim; keep the frozen hex colours, clip-path, and timing values.',
    'Wire dropNewspaperHeadline / dismissNewspaperHeadline / replayNewspaperHeadline (or equivalent class toggles) without duplicating strip nodes.',
    'Keep role="alert" on the strip as the sole semantic announcement; leave marks and scraps aria-hidden.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the static settled pose.',
  ],
  acceptance: [
    'Newspaper strip enters vertically from outside the host',
    'Entrance contains visible overshoot (5% / -3deg) and rebound before settling at approximately -2deg',
    'Host content nudges down exactly 3px for ~70ms at impact — no prolonged shake',
    'Headline is visually dominant and may clip slightly; exact colours #eee9da / #101010 / #cf1723',
    'Dismiss exits sideways (translateX 125%) rather than reversing the entrance; no fade',
    'Reduced motion shows a static settled strip immediately; dismiss is instant',
    'Replay is deterministic with no DOM accumulation; works 320–768px; no external imagery or fonts',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#1a1a1a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
