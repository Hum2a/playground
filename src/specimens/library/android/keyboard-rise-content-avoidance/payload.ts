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
    'Mount inside relative overflow-hidden host (~390×700).',
    'Import demo.css verbatim; simulated keyboard only.',
    'Bottom input scrolls into view; top input needs little adjustment.',
    'Dismiss restores scroll where possible.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Bottom input remains visible above keyboard',
    'Higher input not unnecessarily moved',
    'Keyboard changes available layout height',
    'Dismiss restores previous scroll where possible',
    'No native keyboard APIs',
    'Reduced motion: instant reflow',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
