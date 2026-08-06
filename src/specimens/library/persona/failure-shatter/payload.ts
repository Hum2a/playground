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
    'Mount inside a relative overflow-hidden frame (~360×340+).',
    'Import demo.css verbatim; keep frozen SUCCESS enter, strike, four-piece travel, and FAILED slam values.',
    'Never announce temporary SUCCESS to AT — only the final failure status is live.',
    'Wire runFailureShatter / resetFailureShatter (or harness restart); TRY AGAIN must fully reset before another run.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate FAILED state (no SUCCESS flash).',
  ],
  acceptance: [
    'PROCESSING then SUCCESS begins entering and is interrupted by a red strike',
    'SUCCESS fractures into four major pieces plus three small fragments',
    'FAILED becomes the stable final state with ERROR // 042 and TRY AGAIN',
    'Exactly one semantic failure announcement; SUCCESS never announced',
    'Nothing loops; retry resets deterministically',
    'Reduced motion skips misleading temporary success',
    'No external assets/libraries/network; works ~320–768px',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
