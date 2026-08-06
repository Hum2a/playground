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
    'Mount inside a relative overflow-hidden host; import demo.css verbatim.',
    'White flash peaks at 92% opacity at 12% of 420ms keyframe.',
    'Honour both reduced-motion triggers — remove motion, keep end states.',
    'Sandbox-safe: no parent access, storage, or navigation.',
  ],
  acceptance: [
    'Screenshot Capture Flash behaviour matches freeze table',
    'Trigger: CAPTURE button',
    'PlayStation palette: #2E90FF #0B0F14 #F4F6F8 #7EB6FF',
    'Reduced motion: instant state changes, no travel or keyframes',
    'Live status announces phase changes outside decorative roots',
  ],
  scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  files: { html, css, js },
  spec,
  contract,
}

export default payload
