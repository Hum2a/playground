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
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze ring 72×72, stroke 5px, progress steps, 1100ms total.',
    'Wire runCircularProgressMorph and resetCircularProgressMorph.',
    'Morph retains 110° arc and constructs two internal check segments over 240ms.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Progress reaches exact values 0, 18, 37, 61, 84, 100',
    '100% ring visible before morph',
    'Completion mark derives from ring geometry',
    'No unrelated icon crossfade',
    'Label EXPORT → COMPLETE',
    'Final state static',
    'Reduced motion: immediate completion geometry',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
