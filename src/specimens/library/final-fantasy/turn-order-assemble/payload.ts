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
    'Mount in a relative, overflow-hidden host at least 320px wide and 260px tall.',
    'Import demo.css verbatim; preserve the six 42px tokens, 10px gaps, 2px connectors, fixed ordering, and frozen palette.',
    'Load demo.js after the markup to open the queue and set the active token.',
    'Keep each actor as a native button so pointer selection and keyboard focus remain available.',
    'Honour prefers-reduced-motion and data-force-reduced-motion by showing the complete queue without entrance movement.',
  ],
  acceptance: [
    'Exactly six tokens appear in this order: ALLY A, ALLY B, ENEMY A, ALLY C, ENEMY B, ENEMY C.',
    'Each 42px token enters its fixed horizontal position over 240ms with a fixed 70ms stagger.',
    'Adjacent tokens have 10px gaps joined by 2px connectors, making queue order readable without motion.',
    'Clicking or keyboard-focusing a token makes it the active token with cyan treatment and 1.15 portrait scale.',
    'The queue fits and remains operable from 320px through 768px viewport widths.',
    'Reduced motion renders all six tokens at final positions immediately.',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#111827;">\n  {{specimen}}\n</div>`,
  files: { html, css, js },
  spec,
  contract,
}

export default payload
