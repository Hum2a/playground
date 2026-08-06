import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden host (~360×280).',
    'Import demo.css verbatim; freeze anchor 6px/60ms, boundary 188×176/180ms, row stagger 35ms.',
    'Wire openContextMenuBloom / dismissContextMenuBloom on source row click.',
    'Dismiss via outside click or ESC; collapse toward anchor over 150ms.',
    'Honour both reduced-motion triggers with immediate anchored menu.',
  ],
  acceptance: [
    'Menu originates from FILE // NOTES.MD trailing anchor, not centre-screen',
    'Exactly four actions: OPEN, RENAME, DUPLICATE, DELETE',
    'Boundary constructs before all rows appear (anchor 60ms then expand 180ms)',
    'First row receives selection backing after stagger',
    'Dismiss collapses toward anchor over 150ms',
    'ESC and outside click dismiss; focus restored to source',
    'Reduced motion: immediate appear/disappear at anchor',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101218;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
