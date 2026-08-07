import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount stage with overflow hidden; import demo.css verbatim.',
    'Start with hazard stripe overlay covering content.',
    'Wire Reveal to runHazardStripeReveal (~620ms sweep).',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Content hidden under diagonal hazard stripes on load',
    'Reveal sweeps stripes off-stage in 620ms',
    'Unlocked content visible in revealed state',
    'Reset / harness restart restores covered phase',
    'Stripe angle/band and revealMs frozen in contract',
    'Reduced motion reveals content instantly',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#101010;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
