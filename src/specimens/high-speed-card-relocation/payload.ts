import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~440×280+).',
    'Import demo.css verbatim; freeze travel/ghost-life timings from contract.json.',
    'Wire runHighSpeedCardRelocation / resetHighSpeedCardRelocation / replayHighSpeedCardRelocation.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Card relocates from slot A to slot B leaving exactly two afterimages',
    'Slot A shows an EMPTY placeholder once the card has left',
    'Idle, travelling, and arrived states are visually distinct',
    'Replay resets the card to slot A before rerunning',
    'Reduced motion places the card in slot B immediately with no afterimages',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
