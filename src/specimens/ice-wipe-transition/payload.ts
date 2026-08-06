import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount stage with overflow hidden; import demo.css verbatim.',
    'Grow 740ms then fracture 380ms; total 1390ms.',
    'Wire Transition / Replay to runIceWipeTransition.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Six ice shards grow to cover stage',
    'Shards fracture away revealing scene B',
    'Replay returns to scene A',
    'Effect clipped to stage',
    'Reduced motion: instant scene swap',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101820;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
