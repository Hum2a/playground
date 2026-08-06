import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden host (~420×280+).',
    'Import demo.css verbatim; freeze active 480ms + settle 160ms from contract.json.',
    'Wire runSmokeMaskTransition / resetSmokeMaskTransition / replaySmokeMaskTransition.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Run produces one finite idle → active → done sequence',
    'Resolved state remains until reset/replay',
    'Replay restores idle before rerunning',
    'Reduced motion jumps to done without motion',
    'Sandbox-safe; no external assets',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
