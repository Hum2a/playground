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
    'Mount inside a relative host (~400×320 stage).',
    'Import demo.css verbatim; freeze job schedule, SVG path `d` values, travel 240ms, and artifact sizes 34…86.',
    'Wire runCollectiveCi / resetCollectiveCi / replayCollectiveCi; grow the artifact only on token arrival, not on PASSED.',
    'Keep DEPLOY disabled until 6/6; do not auto-deploy on click.',
    'Honour both reduced-motion triggers with an immediate final READY state.',
  ],
  acceptance: [
    'Exactly six jobs with deterministic completion times',
    'Jobs complete at different times; PACKAGE last',
    'Each PASSED job emits exactly one diamond token (~240ms travel)',
    'Central artifact grows only when a token arrives (34→86)',
    'Readiness progresses 0/6 → 6/6; six final connection lines',
    'DEPLOY disabled before 6/6 and available at 6/6 without auto-deploy',
    'No looping indicators after completion',
    'Reduced motion immediately shows final READY state',
    'Timings, paths, and dimensions frozen in contract.json',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:440px;background:#0c1218;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
