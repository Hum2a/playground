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
    'Mount inside a relative overflow-clipped host sized for a five-stage pipeline (~520×220).',
    'Import demo.css verbatim; keep timings 180 / 60 / 70 / 45 and exactly three slice lines.',
    'Call executeProcessingTimeSkip() from EXECUTE; resetProcessingTimeSkip() or harness restart returns to REQUEST.',
    'Keep the pipeline host aria-hidden; announce skipped stages via the polite status region.',
    'Honour both reduced-motion triggers with the immediate final pipeline.',
  ],
  acceptance: [
    'Exactly five stages; REQUEST runs normally then CACHE HIT',
    'Exactly three slice lines; PARSE, SEARCH, ASSEMBLE never become active',
    'Marker disappears at REQUEST and reappears at RESULT with no travel path',
    'Final shows RESULT 24ms, NORMAL 184ms / ACTUAL 24ms; skipped stages remain visible as SKIPPED',
    'Reduced motion immediately shows final pipeline; no looping effects',
    'No characters or franchise symbols; sandbox="allow-scripts" safe',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0a0c10;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
