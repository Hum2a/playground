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
    'Mount inside a relative overflow-clipped host (600px preview height).',
    'Import demo.css verbatim; freeze compact 320×56 and expanded 344×500.',
    'Wire resetSearchBarToViewTransform; focus input after expand.',
    'Host content inert while expanded; Escape/back collapses.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Search view originates from the search bar',
    'Search input remains the same logical field',
    'Results do not appear before expanded state begins',
    'Back restores exact compact geometry',
    'Host content is inert while expanded',
    'Reduced motion: instant geometry switch',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:580px;background:#e8eaee;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
