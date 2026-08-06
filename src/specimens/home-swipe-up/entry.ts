import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:720px;background:#0c1018;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const homeSwipeUp: Specimen = {
  id: 'home-swipe-up',
  ref: 'SPX-1611',
  title: 'Home Swipe Up',
  blurb:
    '390×700 app shrinks over launcher as bottom 28px upward drag maps scale 1→0.72; commit at 150px or 0.6 px/ms velocity.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired home gesture',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['gesture', 'home', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, drag tracking remains; release snaps immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 760,
    background: 'dark',
    scaffold,
    label: 'Home swipe up',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~420×760).',
    'Import demo.css verbatim; freeze 390×700 frame and bottom 28px zone.',
    'Wire resetHomeSwipeUp on replay.',
    'Pointer capture limited to nav zone.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Gesture only starts from bottom navigation zone',
    'Launcher becomes progressively visible during drag',
    'App geometry stays coherent during scale',
    'Commit ends at visible home state on launcher icon',
    'Cancel restores full-screen app exactly',
    'Reduced motion: immediate release resolution',
  ],
}
