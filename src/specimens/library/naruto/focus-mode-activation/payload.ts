import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount with preview.scaffold relative overflow host.',
    'Import demo.css verbatim; freeze bracketInsetPx 18 / narrow 240ms from contract.json.',
    'Wire runFocusModeActivation / reset / replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Four brackets converge to 18px inset on the host over 240ms',
    'Periphery dims while reticle settles FOCUSED',
    'Replay returns brackets outward / NORMAL before rerunning',
    'Reduced motion shows FOCUSED brackets at inset immediately',
    'preview.scaffold provides the relative overflow host',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070b0e;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
