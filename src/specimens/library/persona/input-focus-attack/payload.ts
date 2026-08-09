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
    'Bind the bracket/underline state to real focus and blur events on the actual form control — never simulate hover for this.',
    'Leave 10-14px of breathing room around the input so the brackets have space to sit outside its border at rest.',
    'Import demo.css verbatim; keep the frozen bracket geometry, offsets, and easing.',
    'Keep the four bracket spans and underline span as permanent DOM — only toggle the focus-attack--active class, never add/remove nodes.',
    'Keep the border colour flip (black to red) as the primary focus signal; brackets and underline are reinforcement only.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion by dropping transform from the transition list.',
  ],
  acceptance: [
    'Focusing the input causes four brackets to converge onto its corners with a small overshoot',
    'A red underline sweeps in beneath the input shortly after the brackets land',
    'The input border flips from black to red on focus',
    'Blurring the input reverses both the brackets and underline',
    'The effect responds to real keyboard Tab focus, not just pointer clicks',
    'Reduced motion still shows focus/blur state changes, just without the directional converge motion',
    'Works from roughly 240-768px with no external assets or libraries',
  ],
  scaffold: `
<div class="form-panel" style="width:100%;min-height:200px;padding:1.5rem 1rem;border:1px solid #2c313c;border-radius:2px;background:#12141a;display:flex;align-items:center;justify-content:center;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
