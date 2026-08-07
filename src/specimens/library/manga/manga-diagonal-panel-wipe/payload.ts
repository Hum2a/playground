import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount outgoing and incoming surfaces inside a relative overflow-hidden host (620×360 plate).',
    'Place the wipe/gutter layer above both surfaces.',
    'Trigger the transition by setting data-state="playing" (or use the demo RUN control).',
    'Replace demo surfaces with host content; keep geometry and timing unchanged.',
    'Honour both reduced-motion triggers — destination appears immediately.',
  ],
  acceptance: [
    'Incoming surface reaches 100% coverage after completion.',
    'No outgoing pixels remain after completion.',
    'Boundary angle remains -12deg for the full travel.',
    'Transition contains no visible end seam.',
    'Replay restores the exact starting state then re-runs.',
    'Reduced motion immediately shows destination with no moving gutter.',
  ],
  scaffold:
    '<div style="position:relative;overflow:hidden;width:620px;height:360px;max-width:100%;margin:0 auto;background:#111;">{{specimen}}</div>',
  files: { html, css, js },
  spec,
  contract,
}

export default payload
