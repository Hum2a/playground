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
    'Mount inside a relative overflow-clipped host (~340×220 stage).',
    'Import demo.css verbatim; keep A/B/C geometries and 280/300/80/100/220ms timings.',
    'Call fuseSyncMerge() from FUSE; resetSyncMerge() or harness restart restores A/B.',
    'Keep the stage aria-hidden; announce merge via the polite status region.',
    'Honour both reduced-motion triggers with the immediate MODEL C path.',
  ],
  acceptance: [
    'Two distinct sources: rectangular A and diamond B',
    'Mirrored synchronisation before approach; sync line has exactly eight segments that become continuous',
    'Both approach simultaneously; 80ms hold at ~12px gap; six radial merge lines',
    'Final C is a hybrid geometry with A/B provenance markers; static, no aura',
    'Status announces A and B merged into C; reduced motion shows C immediately',
    'No characters or franchise symbols; no external assets; sandbox="allow-scripts" safe',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0a0a0c;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
