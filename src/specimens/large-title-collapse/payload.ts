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
    'Mount inside a relative overflow-hidden host; scroll viewport 380×500, nav 52px.',
    'Import demo.css verbatim; freeze large 42px, compact 17px, collapse 0–84px, compact at 72px.',
    'Wire resetLargeTitleCollapse; scroll syncs --ltc-scroll custom properties.',
    'Large and compact titles share PROJECTS identity with spatial handoff.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Large title PROJECTS visible at scroll top with 12 ACTIVE subtitle',
    'Collapse occurs over 84px scroll range',
    'Compact 17px title established by 72px scroll',
    'Title remains readable throughout transition',
    'Scrolling back to top restores large title state',
    'At least 12 list rows present',
    'Reduced motion: scroll-linked without scale interpolation',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:500px;background:#0f141c;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
