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
    'Mount in a relative overflow-hidden host (~400×400 stage).',
    'Keep frozen radii A70–F166 and hitAt = 140 + 520 × (r / 190).',
    'Call runPropagatedShockwave / resetPropagatedShockwave; each node updates once.',
    'Rings are finite thin outlines — do not loop or leave glow.',
  ],
  acceptance: [
    'Exactly six dependents at fixed deterministic positions',
    'Exactly three shockwave rings; nodes update by spatial distance (A before F)',
    'Each node reacts once with 3px radial bump, STALE→UPDATED clip, two ticks ~90ms',
    'All nodes end UPDATED; ROOT PROPAGATED; rings disappear; static final',
    'Reduced motion immediately shows completed propagation',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#101218;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
