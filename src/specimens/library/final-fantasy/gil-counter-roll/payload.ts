import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  acceptance: ['Final value is always exactly 8500.', 'The tabular odometer aligns every digit.', 'The 720ms roll runs once with deterministic intermediates.', 'Reduced motion renders 8500 immediately.'],
  files: { html, css, js },
  spec,
  contract,
}

export default payload
