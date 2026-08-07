import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Two compare cards; selection enables commit; Run auto-keeps cloud.',
    'Wire runSaveConflictCompare / resetSaveConflictCompare / replaySaveConflictCompare.',
  ],
  acceptance: [
    'Two compare cards show timestamp/progress/chapter side-by-side (not a sync beam)',
    'Selecting a card enables Keep selected save; commit dims the other side',
    'Run auto-selects cloud then commits',
    'Live region announces selection and kept side',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#0B0F14;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
