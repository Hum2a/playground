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
    'Mount inside a relative overflow-hidden frame so the rejected PENDING clip-exit stays contained.',
    'Import demo.css verbatim; keep frozen slash geometry (118% / −7deg / +4deg) and APPROVED backing offset 7px 6px.',
    'Wire advanceCrossOutStatus / resetCrossOutStatus; do not treat this as arbitrary value replacement (see cross-out-replacement).',
    'Announce once via the polite live region after settle; keep crossed-out duplicates aria-hidden.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate APPROVED state.',
  ],
  acceptance: [
    'PENDING initially appears clearly on an irregular paper strip',
    'Red slash invalidates it before replacement arrives',
    'Second opposing black strike reinforces invalidation',
    'Old status physically leaves (not opacity-only)',
    'APPROVED enters from a different direction with one overshoot',
    'CURRENT marker appears last',
    'Nothing loops; no green required for APPROVED',
    'Reduced motion changes immediately; one semantic status exposed',
    'No external dependencies',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
