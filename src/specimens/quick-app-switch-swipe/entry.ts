import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:460px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const quickAppSwitchSwipe: Specimen = {
  id: 'quick-app-switch-swipe',
  ref: 'SPX-1613',
  title: 'Quick App Switch Swipe',
  blurb:
    'Bottom 32px zone acquires horizontal swipe between two tasks; preview up to 72px / scale 0.96; commit at 96px or 0.6 px/ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired quick app switch gesture',
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
  tags: ['gesture', 'task-switching', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, maintain drag preview but snap immediately on release.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 390,
    height: 460,
    background: 'dark',
    scaffold,
    label: 'Quick app switch swipe',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 32px bottom zone and 96px commit.',
    'Adjacent task visible before commitment; cancel restores current task.',
    'Support switching in both directions.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Gesture ownership is restricted to bottom zone',
    'Adjacent task is visible before commitment',
    'Cancel restores current task',
    'Commit supports both directions where a neighbour exists',
    'Internal task state is preserved',
    'Reduced motion: snap on release',
  ],
}
