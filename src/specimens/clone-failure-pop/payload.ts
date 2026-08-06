import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative host (~440×320+).',
    'Import demo.css verbatim; freeze fail-at/finish/settle timings from contract.json.',
    'Wire runCloneFailurePop / resetCloneFailurePop / replayCloneFailurePop.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly one of three workers pops and shows FAILED mid-run',
    'The remaining two workers complete normally to DONE',
    'A summary line reports 2 succeeded and 1 failed',
    'Replay resets all three workers before rerunning',
    'Reduced motion shows the final succeeded/failed states immediately',
    'No external assets; sandbox-safe; clipped to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101318;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
