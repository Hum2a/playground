import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:760px;background:#0c1018;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const notificationShadePullDown: Specimen = {
  id: 'notification-shade-pull-down',
  ref: 'SPX-1637',
  title: 'Notification Shade Pull-Down',
  blurb:
    'Top 32px drag reveals shade tracking pointer to 620px max with resistance; detents at 0, 260, and 620px.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired notification shade',
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
  tags: ['notification-shade', 'gesture', 'system-surface'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, drag and detents preserved; settling snaps instantly.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 760,
    background: 'dark',
    scaffold,
    label: 'Notification shade pull-down',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze max shade 620px and detents.',
    'Wire resetNotificationShadePullDown on replay.',
    'Quick controls reveal after 220px drag.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Shade follows direct pointer movement',
    'At least three meaningful detents exist',
    'Host remains visible beneath partial shade',
    'Overdrag meets visible resistance',
    'Upward drag from shade can dismiss it',
    'Reduced motion: instant detent snap',
  ],
}
