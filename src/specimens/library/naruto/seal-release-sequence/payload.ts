import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~320×300+).',
    'Import demo.css verbatim; freeze the 120ms ring stagger / 300ms ring animation from contract.json.',
    'Wire runSealReleaseSequence / resetSealReleaseSequence / replaySealReleaseSequence.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Engaged and unlocked states are visually distinct',
    'Rings disengage outer-to-inner in a visible stagger, not simultaneously',
    'Replay resets all rings before rerunning',
    'Reduced motion shows all rings disengaged and the open glyph immediately',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
