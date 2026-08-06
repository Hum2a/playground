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
    'Import demo.css verbatim; freeze tile 148×72 and 260ms backing.',
    'Wire resetQuickSettingsTileToggle on replay.',
    'Network tile uses aria-pressed for state.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Ripple and persistent selection are separate layers',
    'Selected state unmistakable without colour alone',
    'Active backing grows from icon region',
    'Toggle is keyboard operable',
    'Repeated toggles never distort tile geometry',
    'Reduced motion: instant state with opacity cue',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#10141c;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
