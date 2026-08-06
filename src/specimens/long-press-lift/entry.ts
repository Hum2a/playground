import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#10141c;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const longPressLift: Specimen = {
  id: 'long-press-lift',
  ref: 'SPX-1391',
  title: 'Long-Press Lift',
  blurb:
    'Hold MESSAGE // 04 for 420ms to lift the card (scale 1.035, −4px); neighbours recede to 0.975; four corner ticks and COPY PIN DELETE rail appear after 160ms.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired long-press context lift',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['press', 'context', 'elevation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, lifted/context state appears instantly without scale or translation.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 380,
    background: 'dark',
    scaffold,
    label: 'Long-press lift',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze hold 420ms, move cancel 8px, lift 160ms.',
    'Wire resetLongPressLift; only target card lifts; actions after lift only.',
    'Exactly four corner ticks on lifted target.',
    'Honour both reduced-motion triggers with instant lifted state.',
  ],
  acceptance: [
    'Long-press threshold exactly 420ms',
    'Movement over 8px before threshold cancels hold',
    'Early release performs no lift',
    'Only MESSAGE // 04 target card lifts',
    'Exactly four corner ticks appear after lift',
    'COPY PIN DELETE actions appear only after lift',
    'RESET restores original layout',
    'Reduced motion: instant lifted/context state',
  ],
}
