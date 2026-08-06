import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#141218;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const activeBottomNavPillTransfer: Specimen = {
  id: 'active-bottom-nav-pill-transfer',
  ref: 'SPX-1691',
  title: 'Active Bottom-Nav Pill Transfer',
  blurb:
    'One 64×32px pill moves between four nav items over 280ms; active icon shifts 2px up; content fade-through 240ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired bottom navigation indicator',
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
  tags: ['bottom-nav', 'indicator', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Indicator jumps directly and content swaps instantly under both reduced-motion triggers.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 400,
    height: 420,
    background: 'dark',
    scaffold,
    label: 'Active bottom-nav pill transfer',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze nav 360×72, pill 64×32, travel 280ms.',
    'Wire selectBottomNavItem and resetActiveBottomNavPillTransfer.',
    'Arrow keys update selection.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Only one indicator element exists',
    'Pill centre aligns with selected destination',
    'Content and nav state stay in sync',
    'Keyboard arrow navigation updates selection',
    'Rapid selection settles on final item',
    'Reduced motion: instant pill jump and content swap',
  ],
}
