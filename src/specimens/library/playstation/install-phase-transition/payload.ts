import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount on a single card host; preserve geometry across phase change.',
    'Phase attribute toggles download → install → done; ring morphs to bars.',
    'Wire runInstallPhaseTransition / resetInstallPhaseTransition / replayInstallPhaseTransition.',
  ],
  acceptance: [
    'Download phase fills a circular ring on the same card',
    'Phase label changes DOWNLOAD → INSTALL; geometry morphs ring → four install bars',
    'Install continues on bars without resetting the card',
    'Done state shows READY; reduced motion jumps to installed',
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
