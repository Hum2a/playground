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
    'Copy demo.html, demo.css, and demo.js verbatim into an isolated host; no external assets are required.',
    'Keep the tablist, three tabs, and their aria-controls / aria-labelledby panel relationships intact.',
    'Arrow keys, Home, and End move focus and activate a tab; Space and Enter retain native button activation.',
    'Use window.glassTabSwitcher.set(root, index) to select an index programmatically.',
    'Honour both reduced-motion triggers by swapping the indicator and panel content without transitions.',
  ],
  acceptance: [
    'Exactly three tabs expose role=tab inside a role=tablist container',
    'Only the active tab has aria-selected=true and tabindex=0',
    'Each tab controls a labelled role=tabpanel; inactive panels are hidden',
    'Left/Right arrows wrap, while Home and End select the first and last tab',
    'A translucent glass indicator identifies the active tab independently of colour',
    'Both reduced-motion modes keep the selected tab and panel clear with no movement',
    'No external dependencies, network, storage, parent access, or SVG are used',
  ],
  scaffold: `
<div style="width:100%;height:100%;min-height:260px;background:#101522;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
