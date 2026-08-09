import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  acceptance: ['Exactly five rows resolve in the stated order.', 'Values end at 1240, 850, 06, 03:42, and 98.', 'CLEAR appears after SCORE.', 'Reduced motion immediately shows complete final results.'],
  files: { html, css, js },
  spec,
  contract,
}

export default payload
