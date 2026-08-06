import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×320+).',
    'Import demo.css verbatim; freeze collapse/hold/reveal timings from contract.json.',
    'Wire runTransformationMorph / resetTransformationMorph / replayTransformationMorph.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Profile A collapses into a bold silhouette block before profile B expands out',
    'Idle, collapsing, silhouette, revealing, and done states are visually distinct',
    'Replay resets to profile A before rerunning',
    'Reduced motion shows profile B immediately with no silhouette',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
