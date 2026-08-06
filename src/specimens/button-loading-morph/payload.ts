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
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 160×48 button and 900ms load cycle.',
    'Wire resetButtonLoadingMorph; ignore clicks while busy.',
    'Success uses same button surface — no second dialog.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Button width never changes',
    'Repeated clicks are ignored while busy',
    'Loading always has a finite completion',
    'Success state is visually distinct',
    'Reset restores original label exactly',
    'Reduced motion: determinate fill, no spin',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:160px;background:#f4f5f7;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
