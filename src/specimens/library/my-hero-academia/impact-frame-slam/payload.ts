import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden host (~400×280).',
    'Import demo.css verbatim; freeze flash 90ms, slam 500ms, settle 280ms.',
    'Wire runImpactFrameSlam / resetImpactFrameSlam / replayImpactFrameSlam.',
    'Impact overlay must clip to stage; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Run triggers flash → slam → ALERT end state deterministically',
    'STANDBY and ALERT are visually distinct; final ALERT readable',
    'Effect clips to specimen stage; no external resources',
    'Replay resets to STANDBY before rerunning',
    'Reduced motion shows ALERT immediately without flash or translation',
    'Palette uses #38A3FF / #101820 / #F4F7FA / #FF4D35',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101820;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
