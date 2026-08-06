import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount in a relative host; import demo.css verbatim.',
    'Wire Advance / Replay to runObjectiveUpdateSlash / replayObjectiveUpdateSlash.',
    'Slash 280ms then snap 220ms; total hold 1150ms.',
    'Honour both reduced-motion triggers with instant final state.',
  ],
  acceptance: [
    'TARGET receives visible diagonal slash',
    'ESCORT becomes active with snap emphasis',
    'TARGET dims to completed state',
    'Replay returns to initial TARGET-active layout',
    'Reduced motion: slash and active swap appear instantly',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#F4F7FA;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
