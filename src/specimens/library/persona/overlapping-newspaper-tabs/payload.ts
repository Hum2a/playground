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
    'Keep the full WAI-ARIA APG tabs pattern intact — role=tablist/tab/tabpanel, aria-selected, aria-controls/aria-labelledby, roving tabindex.',
    'Import demo.css verbatim; keep the frozen overlap, per-tab rotation, and clip-path values.',
    'Wire selectTab(index, focus) to real content panels; do not add/remove tab or panel nodes when switching.',
    'Support ArrowLeft/ArrowRight/Home/End for keyboard navigation in addition to click.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion by dropping transform from the tab transition list.',
  ],
  acceptance: [
    'Four tabs overlap with distinct fixed rotations and distinct torn-edge clip-paths',
    'Selecting a tab lifts it above the others, straightens its rotation, and adds a hard offset backing',
    'Inactive tabs remain visibly tilted and slightly dimmed',
    'The associated panel content updates to match the selected tab',
    'Tab selection is operable via click and ArrowLeft/ArrowRight/Home/End keyboard input',
    'aria-selected and roving tabindex correctly reflect the active tab at all times',
    'Reduced motion removes the lift/scale/rotate transition while keeping the tablist fully functional',
    'Works from roughly 320-768px with no external assets or libraries',
  ],
  scaffold: `
<div class="section-panel" style="width:100%;min-height:220px;padding:1rem;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
