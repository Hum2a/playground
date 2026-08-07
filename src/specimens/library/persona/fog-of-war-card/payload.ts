import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden host; import demo.css verbatim.',
    'Resize canvas to card bounds on mount and window resize.',
    'Pointer scrub erases fog; ≥42% cleared marks card revealed.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Card content hidden under fog on load',
    'Pointer scrub visibly erases fog regions (brush 42px)',
    'Reveal completes at ≥42% cleared (contract threshold)',
    'Reset button and harness restart restore full fog',
    'Reduced motion reveals all on first contact',
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
