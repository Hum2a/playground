import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden host; import demo.css verbatim.',
    'Launch: tile left/top/width/height → full stage over 640ms; launch layer opacity after 360ms.',
    'Honour both reduced-motion triggers — .glz__tile and .glz__launch snap.',
  ],
  acceptance: [
    'Tile expands via left/top/width/height (not scale()) from dock slot to full stage',
    'Dock slots fade during zoom; launch surface shows TITLE A / READY',
    'Zoom duration is 640ms before done phase',
    'Reduced motion: .glz__launch has no transition delay; READY appears instantly',
    'Reset restores idle tile in origin slot',
  ],
  scaffold:
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
  files: { html, css, js },
  spec,
  contract,
}

export default payload
