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
    'Mount inside a relative, overflow-hidden surface (~240px tall).',
    'Import demo.css verbatim; keep frozen palette, clip-paths, delays, and easing.',
    'Call revealRansomNote() from REVEAL MESSAGE (or your control); ignore re-entry while busy.',
    'Keep visual scraps aria-hidden; announce once via the status region: “New material has arrived.”',
    'Use resetRansomNote / replayRansomNote (or harness restart) for deterministic replay.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the instant collage.',
  ],
  acceptance: [
    'Message assembles from four independently moving word scraps plus decorative scraps (8 total)',
    'Primary scraps have visibly different geometry; majors enter from ≥3 directions',
    'ARRIVED! is the final major word to settle; each major overshoots once',
    'Final collage stays readable; no runtime randomness; reset is deterministic',
    'Reduced motion shows the completed collage immediately',
    'No external assets/fonts/libraries; works in sandboxed iframe ~320–768px',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:240px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
