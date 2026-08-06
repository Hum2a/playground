import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration:   [
    "Mount on a single card host; preserve geometry across phase change.",
    "Phase attribute toggles download → install → done.",
    "Wire runInstallPhaseTransition / resetInstallPhaseTransition / replayInstallPhaseTransition."
  ],
  acceptance:   [
    "Download phase fills ring to 100% on same card",
    "Phase label crossfades to INSTALL without card reset",
    "Install phase continues progress context on same ring",
    "Replay returns to download idle at 0%",
    "Reduced motion skips intermediate animation",
    "Text status names each phase"
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0B0F14;">
  {{specimen}}
</div>`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
