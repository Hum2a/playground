import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~440×320+).',
    'Import demo.css verbatim; freeze split/worker/recombine timings from contract.json.',
    'Wire runParallelWorkerClones / resetParallelWorkerClones / replayParallelWorkerClones.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Job splits into exactly three worker clones with independent progress bars',
    'Idle, splitting, working, and recombined states are visually distinct',
    'Workers recombine into one completed job card',
    'Replay resets before rerunning',
    'Reduced motion completes all bars immediately',
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
