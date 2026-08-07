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
    'Idle ARMED @ 100% full ring (r=46, circ 289.03); Run drains COOLDOWN 580ms linear with 40ms percent ticks; settle READY @ 0% accent empty ring + 320ms flash.',
    'Four angular tick caps at cardinal points (contract.geometry.ticks); stroke-linecap butt — not a rounded Material spinner.',
    'Wire runQuirkCooldownRing / resetQuirkCooldownRing / replayQuirkCooldownRing; honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Idle shows ARMED 100% with full primary ring and four tick caps',
    'Run drains COOLDOWN with ticking percent → READY 0% accent ring',
    'Replay returns to ARMED 100% then re-runs',
    'Reduced motion skips drain and shows READY 0% immediately',
    'Live region announces armed / draining / ready states',
    'No network; effect clipped to stage',
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
