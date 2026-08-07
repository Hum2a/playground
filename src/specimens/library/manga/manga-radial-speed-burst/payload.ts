import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount the specimen in a position:relative; overflow:hidden host. The effect layer sits behind the focal subject and does not alter the subject\u2019s own styles.',
    'Import demo.css verbatim — keep exactly 36 beams, 72px protected radius, 420px outer radius, and 420ms timeline.',
    'Trigger via Burst / the result card; Reset returns to idle. Replays are geometrically identical (no Math.random).',
    'Honour prefers-reduced-motion and data-force-reduced-motion with static 12-ray emphasis and no beam animation.',
  ],
  acceptance: [
    'Exactly 36 animated lines in normal mode',
    'No line crosses the 72px protected centre',
    'Subject remains readable throughout; scales 1\u21921.055\u21921 around peak',
    'Burst opacity peaks near 110ms and clears by 420ms',
    'Every replay is geometrically identical',
    'Reduced motion shows 12 static rays / focus border with no line movement',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#d8d4cb;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
