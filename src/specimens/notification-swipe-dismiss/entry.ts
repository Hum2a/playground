import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const notificationSwipeDismiss: Specimen = {
  id: 'notification-swipe-dismiss',
  ref: 'SPX-1658',
  title: 'Notification Swipe Dismiss',
  blurb:
    'Top 336×76 notification drags horizontally; opacity fades after 35%; commit at 45% or 0.65 px/ms; exit then 180ms height collapse.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired notification swipe dismiss',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['notification', 'swipe', 'dismiss'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, card follows drag then disappears/collapses immediately on commit.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 400,
    background: 'dark',
    scaffold,
    label: 'Notification swipe dismiss',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 336×76 cards and 45% commit threshold.',
    'Dismissal field revealed behind dragged card.',
    'Height collapse only after horizontal exit completes.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Vertical stack does not move until dismissal is committed',
    'Both left and right dismiss work',
    'Cancel leaves card unchanged',
    'Height collapse happens only after horizontal exit',
    'Remaining cards preserve order',
    'Reduced motion: instant dismiss on commit',
  ],
}
