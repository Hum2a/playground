import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×320+).',
    'Import demo.css verbatim; freeze the 560ms sweep / 380ms lock-hold / 150ms lock pulse from contract.json.',
    'Wire runChakraControlBalance / resetChakraControlBalance / replayChakraControlBalance.',
    'Left/Right buttons (or ArrowLeft/ArrowRight) hold-nudge the needle; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Unbalanced, active, and locked states are visually distinct',
    'Needle must dwell inside the centre band continuously before it locks',
    'Replay resets the needle before rerunning',
    'Reduced motion shows the locked, centred needle immediately',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
