import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze four nodes at 150ms steps from contract.json.',
    'Wire runTechniqueMasteryTree / resetTechniqueMasteryTree / replayTechniqueMasteryTree.',
    'Optional keys 1–4 unlock in order; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly four skill nodes; unlock one-by-one along the path to MASTERED',
    'Locked, unlocking, and mastered states are visually distinct',
    'The connecting path fills in step with each unlocked node',
    'Replay locks all nodes before rerunning',
    'Reduced motion shows MASTERED immediately',
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
