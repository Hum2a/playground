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
    'Mount in overflow-hidden host; four shards use frozen clip-paths.',
    'Wire runPanelBreak / resetPanelBreak / replayPanelBreak.',
    'Break 480ms; settle 260ms; honour reduced-motion triggers.',
  ],
  acceptance: [
    'Run shatters ANALYSIS overlay into four shards',
    'COMPLETE readable underneath after break',
    'Replay resets overlay before rerun',
    'Reduced motion skips shard translation',
    'Effect clips to stage',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#101820;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
