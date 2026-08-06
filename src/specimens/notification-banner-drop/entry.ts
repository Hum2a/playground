import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:240px;background:#0e1116;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const notificationBannerDrop: Specimen = {
  id: 'notification-banner-drop',
  ref: 'SPX-1409',
  title: 'Notification Banner Drop',
  blurb:
    'DEPLOY COMPLETE banner drops from -96px with 6px overshoot, dwells 2200ms, exits upward; hover/focus pauses retreat.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired temporary notification banner',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['notification', 'banner', 'alert'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, banner appears at final position, dwells, then disappears without travel.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 280,
    background: 'dark',
    scaffold,
    label: 'Notification banner drop',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze banner 340×74 and timing sequence.',
    'Wire runNotificationBannerDrop, resetNotificationBannerDrop, and REPLAY.',
    'Hover/focus on banner pauses dwell timeout.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Banner originates above viewport at -96px',
    'Overshoot max 6px then settle 80ms',
    'Dwell 2200ms',
    'Hover/focus pauses auto retreat',
    'Banner exits completely upward',
    'Exactly one leading status marker',
    'Reduced motion: no travel',
  ],
}
