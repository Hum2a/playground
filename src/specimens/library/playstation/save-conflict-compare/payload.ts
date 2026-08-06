import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration:   [
    "Two compact cards expand in parallel on Run.",
    "Wire runSaveConflictCompare / resetSaveConflictCompare / replaySaveConflictCompare."
  ],
  acceptance:   [
    "Idle: two compact save cards side by side",
    "Run expands both revealing timestamp and progress rows",
    "Differences highlighted between versions",
    "Replay collapses cards to compact",
    "Reduced motion shows expanded metadata immediately"
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0B0F14;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
