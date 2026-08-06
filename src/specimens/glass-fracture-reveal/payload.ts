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
    'Mount inside a relative overflow-hidden frame (~360×320+) so separating shards clip at the host edge.',
    'Import demo.css verbatim; freeze origin 63% 42%, five major + three secondary paths, and six shard polygons.',
    'Keep record markup under the pane from t0 — never fade or inject content after reveal.',
    'Wire revealGlassFracture / resetGlassFracture; honour both reduced-motion triggers with an immediate open state.',
    'Start record with aria-hidden + inert; announce once on reveal.',
  ],
  acceptance: [
    'One coherent unbroken pane initially with no cracks',
    'Pressure originates at fixed off-centre 63% 42%',
    'Exactly five major fracture paths and about three secondary branches',
    'Pane divides into about six major regions that separate (no dissolve / particle shower)',
    'Hidden content is physically underneath; no crossfade',
    'Pale edge trace on completion; reset reconstructs the pane',
    'Reduced motion immediate; no external dependencies',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#020a14;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
