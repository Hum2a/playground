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
    'Mount inline as a rail of cards; import demo.css verbatim.',
    'Drive expand/return with a single is-expanded class — never set transform inline from JS, so return is guaranteed to match the base rule exactly.',
    'Disable sibling cards while one is expanded to keep the expand-then-return flow unambiguous.',
    'Honour both reduced-motion triggers by removing the transition, not the state change.',
  ],
  acceptance: [
    'Idle: all four cards flush in their slots at base transform',
    'Activating a card expands it (translateY -18px, scale 1.28) and disables the other three',
    'Activating the expanded card again removes is-expanded, returning it to the exact base transform',
    'No residual inline transform, opacity, or shadow remains after return',
    'Reduced motion keeps the same states with transitions disabled',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#0c0c0f;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
