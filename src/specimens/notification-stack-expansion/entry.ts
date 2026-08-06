import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#12141a;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const notificationStackExpansion: Specimen = {
  id: 'notification-stack-expansion',
  ref: 'SPX-1640',
  title: 'Notification Stack Expansion',
  blurb:
    'Four 336×74 cards in 150px layered stack — offset 8px, scale 0.98 — expand to 10px gaps over 320ms; rear cards travel farther.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired notification stack expansion',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['notifications', 'stack', 'expand'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, cards jump between stacked and separated positions.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 400,
    background: 'dark',
    scaffold,
    label: 'Notification stack expansion',
  },
  integration: [
    'Mount inside relative overflow-clipped host.',
    'Import demo.css verbatim; freeze card dimensions and 320ms duration.',
    'Same four DOM cards throughout toggle.',
    'Parent height tracks final layout.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Four cards remain individually identifiable',
    'Expanded stack has no overlaps',
    'Collapsed state implies multiple items',
    'No cards created/destroyed during toggle',
    'Parent height tracks final layout',
    'Reduced motion: instant position jump',
  ],
}
