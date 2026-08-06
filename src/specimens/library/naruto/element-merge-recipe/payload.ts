import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~380×340+).',
    'Import demo.css verbatim; freeze travel (340ms) → merge (200ms) → settle (160ms) from contract.json.',
    'Wire runElementMergeRecipe / resetElementMergeRecipe / replayElementMergeRecipe.',
    'Honour both reduced-motion triggers — show the result token directly.',
  ],
  acceptance: [
    'Two orbs travel from opposite sides into the same central slot',
    'A radial flash marks the merge moment; a dual-tone result token appears after',
    'Replay resets the slot before rerunning',
    'Reduced motion shows the result token immediately with no travel/merge',
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
