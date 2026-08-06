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
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 7px threshold, 300×92→156×48 proxy.',
    'Source placeholder remains during drag; proxy centre hit-tests targets.',
    'Valid INBOX absorbs; invalid/void returns over 220ms.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Drag does not start on simple click',
    'Source layout stays stable via placeholder',
    'Proxy contains reduced, not duplicated, information',
    'Valid target acquisition is deterministic',
    'Invalid drop restores source exactly',
    'Reduced motion: instant formation and return',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#f4f5f7;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
