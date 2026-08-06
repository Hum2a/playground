import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#0d1118;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const desktopSpaceSwipe: Specimen = {
  id: 'desktop-space-swipe',
  ref: 'SPX-1352',
  title: 'Desktop Space Swipe',
  blurb:
    'SPACE 01 (3 windows) and SPACE 02 (2 windows) on 520×360 viewport — planes slide 460ms with depth scale .985; indicator updates at 50%.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired desktop space navigation',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['workspace', 'navigation', 'plane'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, space planes switch instantly.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 560,
    height: 400,
    background: 'dark',
    scaffold,
    label: 'Desktop space swipe',
  },
  integration: [
    'Mount inside a relative overflow-clipped host (~560×400).',
    'Import demo.css verbatim; freeze viewport 520×360, transition 460ms.',
    'Wire nextSpace / previousSpace on NEXT SPACE / PREVIOUS.',
    'All windows within a plane move as one unit.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'All windows within a space move as one plane',
    'No window independently lags behind plane motion',
    'Space indicator changes once per transition at 50%',
    'PREVIOUS returns to exact Space 01 arrangement',
    'SPACE 01 has three windows; SPACE 02 has two',
    'Reduced motion: instant plane switch',
  ],
}
