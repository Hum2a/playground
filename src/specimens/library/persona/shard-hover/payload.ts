import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Use the native button and copy demo.html and demo.css verbatim; it needs no JavaScript or external assets.',
    'Keep exactly seven decorative shard elements and their authored clip-path geometry.',
    'Hover and :focus-visible shift the same seven shards outward from the panel centre.',
    'Preserve both reduced-motion selectors; they make the state change instant rather than removing the visible fractured state.',
  ],
  acceptance: [
    'The panel is a focusable native button measuring 330 × 196px',
    'Exactly seven decorative shards compose the glass surface',
    'Hover and keyboard focus produce the same outward shard separation',
    'The focus-visible ring is clearly visible and uses the cyan interface colour',
    'No motion loops, JavaScript, external assets, network, storage, parent access, SVG, or canvas',
    'Both reduced-motion modes preserve the static separated result with no transition',
  ],
  files: { html, css },
  spec,
  contract,
}

export default payload
