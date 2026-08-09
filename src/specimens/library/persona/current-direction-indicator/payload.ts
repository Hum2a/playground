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
    'Mount the 480 × 72 channel as an inline status component; copy demo.css and demo.js without host-specific token rewrites.',
    'Keep exactly three static curved flow lines and exactly seven 24px chevrons in the track.',
    'The default current travels left-to-right in a seamless 1.8s linear loop; reverse must change direction without rebuilding or resetting the animation.',
    'Honour both reduced-motion triggers by freezing the clear, labelled East/West direction.',
  ],
  acceptance: [
    'Channel measures 480px by 72px at its authored size',
    'Three static curved flow lines remain visible behind the markers',
    'Exactly seven chevron markers are each 24px square',
    'Default East current travels left-to-right on a seamless 1.8s linear loop',
    'Reverse changes the semantic direction label, chevron orientation, and animation direction without a reset',
    'Both reduced-motion modes show a static, clearly labelled current direction',
    'No external assets, network, storage, parent access, canvas, or SVG are used',
  ],
  files: { html, css, js },
  spec,
  contract,
}

export default payload
