import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden host (~420×320).',
    'Import demo.css verbatim; freeze path 280ms, travel 500ms, hit 320ms.',
    'Wire runEnergyTransfer / resetEnergyTransfer / replayEnergyTransfer.',
    'Honour both reduced-motion triggers with immediate TRANSFERRED state.',
  ],
  acceptance: [
    'TRANSFER illuminates path then sends one packet source → target',
    'Target IDLE and TRANSFERRED are visually distinct',
    'Effect clips to specimen; no external resources',
    'RESET restores idle target; replay is deterministic',
    'Reduced motion shows TRANSFERRED immediately',
    'Palette #38A3FF / #101820 / #F4F7FA / #FF4D35',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101820;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
