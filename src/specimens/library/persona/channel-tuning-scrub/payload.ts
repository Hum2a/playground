import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden host; import demo.css verbatim.',
    'Wire range input to phase thresholds (partial ≥ 42, locked ≥ 78).',
    'Announce state via the live region outside decorative screen layers.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Low dial values show heavy static noise',
    'Mid range shows partial content with reduced static',
    'High dial values lock a stable channel readout',
    'Live region announces each phase change',
    'Reduced motion stops flicker while phases remain visible',
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
