import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden host; import demo.css verbatim.',
    'Resume: card left/bottom/width/height → full stage over 580ms; task opacity after 300ms.',
    'Honour both reduced-motion triggers — .rah__card and .rah__task snap (no delay leak).',
  ],
  acceptance: [
    'Card expands via left/bottom/width/height (not scale()) from tray into full stage',
    'Task surface shows OBJECTIVE A / RESUMED after handoff',
    'Handoff duration is 580ms before done phase',
    'Reduced motion: .rah__task has no transition delay; RESUMED appears instantly',
    'Reset restores activity card in tray',
  ],
  scaffold:
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
  files: { html, css, js },
  spec,
  contract,
}

export default payload
