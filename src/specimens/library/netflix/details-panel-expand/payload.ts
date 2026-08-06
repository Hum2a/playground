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
    'Mount inline as a single card; import demo.css verbatim.',
    'Use the grid-template-rows 0fr/1fr technique — do not measure scrollHeight in JS.',
    'Keep the panel visibility: hidden while closed so it leaves the tab order; only toggle one is-open class from JS.',
    'Honour both reduced-motion triggers by removing the transition, not the state change.',
  ],
  acceptance: [
    'Idle: panel collapsed to zero height, hidden from the accessibility tree',
    'DETAILS grows the panel to its natural height and becomes HIDE DETAILS',
    'CLOSE (or the toggle again) collapses the panel back to zero height',
    'Panel is not focusable/visible while collapsed',
    'Reduced motion keeps the same open/closed states with transitions disabled',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0c0c0f;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
