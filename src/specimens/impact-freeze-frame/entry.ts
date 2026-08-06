import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#101218;">
  {{specimen}}
</div>
`.trim()

export const impactFreezeFrame: Specimen = {
  id: 'impact-freeze-frame',
  ref: 'SPX-1087',
  title: 'Impact Freeze Frame',
  blurb:
    'A COMMIT token strikes a change target, holds an exact 80ms hit-stop with static impact wedges, then settles into APPLIED.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired hit-stop / impact freeze feedback',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['impact', 'feedback', 'hit-stop'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, EXECUTE immediately shows APPLIED with no travel or hit-stop.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 280,
    background: 'dark',
    scaffold,
    label: 'Impact freeze demo',
  },
  integration: [
    'Mount in a relative overflow-hidden host.',
    'Keep --impact-freeze: 80ms and the hard freeze hold (do not slow-mo travel).',
    'Call runImpactFreeze / resetImpactFreeze; state flips to APPLIED only after release.',
    'Six wedges must remain static for the entire freeze window.',
  ],
  acceptance: [
    'Action visibly approaches target with accelerated final 30px',
    'Exact contact is readable; animation freezes for exactly 80ms',
    'Six wedges stay static during freeze',
    'Consequence (wedges out, settle, token collapse) only after freeze',
    'PENDING → APPLIED after release; no looping motion',
    'Reduced motion immediately shows APPLIED',
    'Documented --impact-freeze: 80ms; portable for buttons/cards',
  ],
}
