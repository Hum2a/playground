import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  acceptance: ['EXECUTE is a semantic button with a visible focus outline.', 'Hover and focus raise a deterministic liquid layer to full height.', 'The label stays readable above a 12px undulating waterline.', 'Leaving drains the layer in 420ms.', 'Both reduced-motion triggers stop liquid movement while retaining active fill.'],
  files: { html, css },
  spec,
  contract,
}

export default payload
