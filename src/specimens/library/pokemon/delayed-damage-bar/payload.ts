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
    'Mount inline; keep bar width ~280px and height 18px as the portable contract.',
    'Call runDelayedDamage from DAMAGE; put any real state mutation in your host — this specimen is visual only.',
    'Primary reaches destination in 180ms; trail holds 320ms then drains 420ms (82%→48%).',
    'Use role=meter with aria-valuetext; pair colour with Healthy/Low resource text.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate final state.',
  ],
  acceptance: [
    'Starts at 164/200 (82%) and ends at 96/200 (48%)',
    'Primary bar reaches destination first; trailing layer visibly lags then catches up',
    'Fill colour crosses into low-resource palette only when value goes below 50%',
    'Single 100ms impact shake; -68 annotation rises 6px over ~500ms; no looping',
    'Reduced motion updates all layers immediately; meter exposes 96 of 200',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#e8e6e1;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
