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
    'Mount inside a relative overflow-hidden frame (~360×380+).',
    'Import demo.css verbatim; keep frozen panel clip-paths, threshold 0.35, and exit transforms.',
    'Root IntersectionObserver to the specimen scroller only — never parent scroll or parent DOM.',
    'Call resetComicPanelScroll() (or harness restart) to restore covers and scrollTop.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with covers hidden.',
  ],
  acceptance: [
    'Own overflow-y auto scroll region; independent of parent-page scroll',
    'Three sections start covered (normal motion) and reveal once at ~35% intersection',
    'Opposing panels depart; content exists beneath covers throughout',
    'Three related but non-identical panel geometries',
    'Scrolling backward does not re-cover; reset restores covers + scroll position',
    'Reduced motion shows all content immediately readable',
    'No scroll libraries, network, or parent access; works ~320–768px',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
