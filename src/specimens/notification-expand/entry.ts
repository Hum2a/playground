import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#101218;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const notificationExpand: Specimen = {
  id: 'notification-expand',
  ref: 'SPX-1410',
  title: 'Notification Detail Expansion',
  blurb:
    'Compact 330×76 notification expands to 330×184 over 280ms — title persists, detail rows after 120px, OPEN/APPROVE buttons at 40ms stagger.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired notification compact-to-rich expansion',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['notification', 'expansion', 'compact-to-rich'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, compact and expanded states switch instantly.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 280,
    background: 'dark',
    scaffold,
    label: 'Notification detail expansion',
  },
  integration: [
    'Mount inside a relative overflow-clipped host (~360×280).',
    'Import demo.css verbatim; freeze compact 330×76, expanded 330×184, height 280ms.',
    'Click compact card expands; CLOSE collapses.',
    'Detail rows reveal after height passes 120px; buttons stagger 40ms.',
    'Honour both reduced-motion triggers with instant state swap.',
  ],
  acceptance: [
    'Width remains constant at 330px',
    'Height expands 76→184px over 280ms',
    'Title REVIEW REQUEST identity persists',
    'Actions OPEN and APPROVE only appear in expanded state',
    'CLOSE collapses to exact compact height',
    'Reduced motion: immediate height/state switch',
  ],
}
