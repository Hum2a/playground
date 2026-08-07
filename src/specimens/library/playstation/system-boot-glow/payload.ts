import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden host; import demo.css verbatim.',
    'Boot: dark → glow(55%, 900ms) → settle(100%, 320ms) → READY(400ms).',
    'Honour both reduced-motion triggers — .sbg__glow and .sbg__ui snap; end states remain.',
  ],
  acceptance: [
    'Boot advances through dark → glow → settle → ready with visible luminance stops',
    'READY label and status dot appear only in ready phase',
    'Luma mark shows 0% / 55% / 100% then hides at ready',
    'Reduced motion: .sbg__ui and .sbg__glow have no transitions; READY still appears',
    'No external assets; sandbox-safe (no parent/storage/navigation)',
  ],
  scaffold:
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
  files: { html, css, js },
  spec,
  contract,
}

export default payload
