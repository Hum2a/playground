import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#020912;">
  {{specimen}}
</div>
`.trim()

export const deadlineClock: Specimen = {
  id: 'deadline-clock',
  ref: 'SPX-535',
  title: 'Deadline Clock',
  blurb:
    'A pale clock perimeter closes around a submission window as time runs out — enclosure marks and compressed type, not a remaining-progress bar.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired temporal deadline language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['time', 'deadline', 'enclosure'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Arc growth and letter-spacing transitions are skipped under prefers-reduced-motion or data-force-reduced-motion; deadline states change immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 340,
    background: 'dark',
    scaffold,
    label: 'Deadline enclosure clock',
  },
  integration: [
    'Mount inside a relative frame; keep the ~150px ring and enclosure percentages frozen.',
    'Import demo.css verbatim; wire advanceDeadlineClock / resetDeadlineClock.',
    'Treat the arc as enclosure pressure, not remaining-progress percentage.',
    'Announce exact remaining time via visible label + polite status; do not use role=progressbar.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with immediate state changes.',
  ],
  acceptance: [
    'Clock perimeter increasingly encloses content (25%→60%→85%→96%→100%)',
    'Four demo deadline states plus optional CLOSED',
    'No conventional progress bar',
    'Threshold marks: 0 / 1 / 2 / 4 at 72h / 24h / 6h / 1h',
    'No continuous alarming animation or pulsing red',
    'Visible text conveys exact remaining time',
    'Letter-spacing compresses 0.08em → 0; reduced motion is immediate',
  ],
}
