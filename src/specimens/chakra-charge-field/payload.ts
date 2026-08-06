import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~360×320+).',
    'Import demo.css verbatim; freeze the 620ms charge / 150ms commit settle from contract.json.',
    'Wire runChakraChargeField / resetChakraChargeField / replayChakraChargeField.',
    'Pointer and Space both hold-to-charge on the core; releasing commits the reached level; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Idle, charging, and committed states are visually distinct',
    'Releasing mid-charge commits the current percentage rather than cancelling',
    'Replay resets the field before rerunning',
    'Reduced motion commits at 100% instantly on press (manual or Run)',
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
