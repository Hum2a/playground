import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount in a relative overflow-hidden host (~420×300+).',
    'Import demo.css verbatim; freeze 24 predetermined lines, 38px shift, 520ms travel from contract.json.',
    'Wire runMangaDirectionalSpeedWipe / resetMangaDirectionalSpeedWipe / replayMangaDirectionalSpeedWipe.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate destination swap.',
  ],
  acceptance: [
    'Exactly 24 speed lines appear during the wipe',
    'Motion direction is consistently right-to-left',
    'Incoming surface finishes at translateX(0)',
    'No lines remain after completion',
    'Reset restores source Panel A exactly',
    'Reduced motion uses no travelling elements',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#e8e4d8;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
