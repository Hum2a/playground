import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:220px;background:#12141a;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const wiFiSearchingToConnectedMorph: Specimen = {
  id: 'wi-fi-searching-to-connected-morph',
  ref: 'SPX-1854',
  title: 'Wi-Fi Searching-to-Connected Morph',
  blurb:
    '300×180 card — arcs illuminate every 180ms, centre dot 540ms cycle; after 900ms resolves to Connected or Fail with Try again.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired connectivity acquisition morph',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['connectivity', 'state', 'finite'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, arcs step through discrete states.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 320,
    height: 240,
    background: 'dark',
    scaffold,
    label: 'Wi-Fi searching morph',
  },
  integration: [
    'Mount inside relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 180ms arc interval and 900ms search.',
    'Connected state has no looping animation.',
    'Fail path exposes Try again.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Searching always ends in success or failure',
    'Connected state has no looping animation',
    'Fail path exposes retry',
    'Original abstract signal geometry',
    'Reset returns to disconnected',
    'Reduced motion: discrete arc steps',
  ],
}
