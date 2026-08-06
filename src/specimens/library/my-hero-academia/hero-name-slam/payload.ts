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
    'Mount in overflow-hidden host; slam 740ms, settle 320ms.',
    'Wire runHeroNameSlam / resetHeroNameSlam / replayHeroNameSlam.',
    'Generic codename only — no franchise names.',
  ],
  acceptance: [
    'Assign triggers slam from off-screen to settled UNIT 07',
    'Brackets and role copy appear in final state',
    'Replay resets to idle hidden name',
    'Reduced motion shows final assigned state immediately',
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
