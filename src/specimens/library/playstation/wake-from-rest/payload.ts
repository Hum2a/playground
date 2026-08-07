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
    'Mount inside a relative overflow-hidden host; import demo.css verbatim.',
    'WAKE: black veil 1 → 0.28 (700ms rise) → 0; framed home shelf revealed.',
    'Honour both reduced-motion triggers — remove motion, keep end states.',
  ],
  acceptance: [
    'Dark phase is a full black veil with REST mark (not a dimmed console)',
    'Lifting raises/thins the veil over 700ms while home shelf emerges',
    'Awake clears black; focus tile on framed shelf keeps ring',
    'Silhouette is framed home shelf — distinct from rest-mode-dim console',
    'Distinct from resume-from-rest-wake (focus restore on visible dim dock)',
    'Reduced motion snaps dark→awake with no veil travel',
  ],
  scaffold:
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  files: { html, css, js },
  spec,
  contract,
}

export default payload
