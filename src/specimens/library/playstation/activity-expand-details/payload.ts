import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wire header toggle to compact↔expanded with aria-expanded / aria-controls.',
    'Keep Tasks (5), Rewards (2), and Actions (3) sections in the expanded layout.',
    'Import demo.css verbatim; freeze expand 280ms / reveal 220ms from contract.json.',
    'Preserve both reduced-motion overrides on card, details, and chevron.',
  ],
  acceptance: [
    'Expanded state reveals a 5-row task list, 2 reward chips, and 3 action chips.',
    'Compact state shows only title, status meta, and 2 / 5 count.',
    'Expansion is content reveal (opacity/transform), not a height bump alone.',
    'Reduced motion snaps expand and collapse with no transition.',
  ],
  scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
