import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount tape inside position:relative overflow:hidden host card.',
    'Tape root is decorative with aria-hidden; announce lock outside tape.',
    'Marquee unit: KEEP OUT · SIGNAL · with dual spans for seamless loop.',
  ],
  acceptance: [
    'Tape clipped at -28deg across card face',
    'Marquee loops with no visible seam',
    'Animation stops under reduced motion; tape remains visible',
    'Palette uses #F5C400 / #101010',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:200px;border:1px solid #E8E8E8;border-radius:2px;background:#F7F3E8;">
  <div style="padding:1rem;font:600 0.85rem/1.2 system-ui,sans-serif;color:#101010;">Restricted zone</div>
  <span class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">Keep out</span>
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
