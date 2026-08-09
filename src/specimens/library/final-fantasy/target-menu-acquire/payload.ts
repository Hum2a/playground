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
    'Mount inside a relative, overflow-hidden host at least 360×320px.',
    'Import demo.css verbatim; preserve the fixed target positions, 54×54px reticle, 3px corner strokes, and navy/silver/cyan palette.',
    'Load demo.js after the markup to initialise TARGET A and expose pointer and keyboard target selection.',
    'Keep the three target buttons and focus-visible outlines; Arrow keys cycle, Enter confirms, and Escape cancels.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion so the reticle moves directly to its next target.',
  ],
  acceptance: [
    'Exactly three labelled target buttons exist: TARGET A, TARGET B, and TARGET C.',
    'While targeting is open, one 54×54px four-corner reticle surrounds exactly one selected target.',
    'Opening acquires TARGET A over 280ms; arrow-key changes use the fixed 240ms mechanical step transition.',
    'Cycling order is deterministic: A → B → C → A forward and the inverse backward.',
    'The reticle uses fixed, bounded target coordinates and never leaves the preview scene.',
    'Enter announces confirmation and Escape cancels; focus-visible remains visible on the scene and targets.',
    'Reduced motion retains target selection and labels while removing acquisition and reticle interpolation.',
    'No external assets, network requests, runtime randomness, or framework runtime are used.',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#111827;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
