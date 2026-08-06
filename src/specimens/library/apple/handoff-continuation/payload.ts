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
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze six bridge segments, 180×92→92×48 compression.',
    'Progress stays 68% through transfer; ownership changes once at midpoint.',
    'TABLET continues progress to 74% after arrival.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'DESKTOP owns task initially',
    'Exactly six bridge segments during handoff',
    'Progress never resets from 68%',
    'Ownership changes once at midpoint',
    'TABLET receives same task identity',
    'TABLET continues from 68 to 74',
    'Reduced motion: instant handoff then 74%',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
