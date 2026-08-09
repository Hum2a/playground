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
    'Mount in a relative, overflow-hidden host at least 360×280px.',
    'Import demo.css verbatim and load demo.js after the markup.',
    'Keep the CAST button available to replay the fixed draw sequence.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion by rendering the completed circle without motion.',
  ],
  acceptance: [
    'The two rings and fixed geometric marks draw over 620ms, then resolve with one finite 180ms confirmation beat.',
    'CAST restarts the deterministic sequence without stacking timers.',
    'The SVG is decorative and the control retains a visible focus ring.',
    'Reduced motion reveals the completed circle immediately.',
  ],
  files: { html, css, js },
  spec,
  contract,
}

export default payload
