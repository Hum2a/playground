import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Track focus index across list/detail toggle via data-focus-index.',
    'On BACK, restore list, is-focused class, and DOM focus on the same index.',
    'Import demo.css verbatim — no mega-kit selectors.',
    'Preserve RM override on .bnr__tile.',
  ],
  acceptance: [
    'Clicking tile N opens details for that item and stores index N.',
    'BACK returns to list with data-focus-index still N and that tile is-focused.',
    'BACK moves DOM focus onto the restored tile.',
    'Status announces the restored index; reduced motion snaps focus ring with no transition.',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0B0F14;padding:12px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
