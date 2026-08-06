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
    'Mount inside a relative, overflow-clipped host (~300×340 minimum).',
    'Import demo.css verbatim; keep frozen scatter offsets, 42ms stagger, and 340ms travel.',
    'Call reconstructMemoryFragments() / scatterMemoryFragments() or use the RECONSTRUCT / SCATTER controls.',
    'Keep the fragment stage aria-hidden; announce via the polite status region only.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the instant assembled path.',
  ],
  acceptance: [
    'Exactly six major fragments with meaningful partial text or structure',
    'Initial scatter offsets are deterministic; SCATTER restores the same origins',
    'Fragments converge with staggered arrivals (~42ms); no bounce or loop',
    'Alignment ticks appear on arrival; seams remain after lock',
    'Semantic status updates only once enough fragments align',
    'Rule draws L→R then secondary copy appears',
    'Reduced motion shows the reconstructed final state immediately',
    'No external assets or libraries; sandbox="allow-scripts" safe',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#020b15;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
