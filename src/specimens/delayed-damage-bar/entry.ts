import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#e8e6e1;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const delayedDamageBar: Specimen = {
  id: 'delayed-damage-bar',
  ref: 'SPX-760',
  title: 'Delayed Damage Bar',
  blurb:
    'SYSTEM HEALTH drops 164→96: the primary bar and number move first, a warm trailing layer holds at 82% then catches up to 48% — Pokemon-inspired resource feedback without game assets.',
  origin: {
    project: 'Original',
    surface: 'Pokemon-inspired HP damage drain / trailing resource feedback',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['resource', 'damage', 'feedback'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, fill and trail jump to 48% with 96/200 immediately — no trail hold or impact.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 280,
    background: 'card',
    scaffold,
    label: 'System health damage bar (demo)',
  },
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
}
