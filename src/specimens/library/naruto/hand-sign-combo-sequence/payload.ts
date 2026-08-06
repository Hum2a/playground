import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~420×320+).',
    'Import demo.css verbatim; freeze four signs at 130ms steps from contract.json.',
    'Wire runHandSignComboSequence / resetHandSignComboSequence / replayHandSignComboSequence.',
    'Optional keys 1–4 acquire in order; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly four glyph slots; acquire one-by-one to READY',
    'Idle, active, and resolved states are visually distinct',
    'Replay resets all slots before rerunning',
    'Reduced motion shows READY immediately',
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
