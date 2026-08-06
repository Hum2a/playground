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
    'Mount in a relative overflow-hidden host.',
    'Keep frozen region order central→top→left→right→bl→br and 45ms stagger.',
    'Regions must clip/expand from connection points — never fade in.',
    'Call runCoreSeedRegeneration / resetCoreSeedRegeneration; keep core ID // 09 visible.',
  ],
  acceptance: [
    'Begins with only tiny angular core; identity Worker 09',
    'Core verified before reconstruction; exactly six skeleton lines',
    'Exactly six major regions build outward (not fade); metadata after structure',
    'Identity 09 persists; final HEALTHY / STATE RESTORED; no looping',
    'Reduced motion immediately shows restored worker',
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
