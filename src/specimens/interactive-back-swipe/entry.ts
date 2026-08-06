import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:560px;background:#12141a;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const interactiveBackSwipe: Specimen = {
  id: 'interactive-back-swipe',
  ref: 'SPX-1302',
  title: 'Interactive Back Swipe',
  blurb:
    'Edge-initiated back gesture: ORBIT detail follows drag 1:1 while PROJECTS reveals from -28% scale .98; commit at 42% width or >0.62 px/ms velocity.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired spatial back navigation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['navigation', 'gesture', 'threshold'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Gesture thresholds preserved; parallax scale removed; immediate switch on committed release.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 560,
    background: 'dark',
    scaffold,
    label: 'Interactive back swipe',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~420×560).',
    'Import demo.css verbatim; freeze edge 28px, commit 42%, velocity 0.62 px/ms, settle 260/220ms.',
    'Wire resetInteractiveBackSwipe / replayInteractiveBackSwipe.',
    'Gesture starts only in left 28px edge zone.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Gesture starts only within 28px edge zone',
    'Current page tracks drag 1:1 horizontally',
    'Previous page reveals continuously from -28% scale .98',
    '42% position threshold shows 2px tick',
    'Fast release above 0.62 px/ms can commit below 42%',
    'Short/slow release cancels with 220ms settle',
    'No page half-positioned after release',
    'REPLAY resets to ORBIT detail',
    'Reduced motion preserves thresholds without parallax scale',
  ],
}
