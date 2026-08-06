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

export const headsUpNotificationDrop: Specimen = {
  id: 'heads-up-notification-drop',
  ref: 'SPX-1656',
  title: 'Heads-Up Notification Drop',
  blurb:
    '350×88px overlay alert drops from -110px, dwells 3200ms; click expands to 156px; swipe up >55px dismisses early.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired heads-up notification',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['notification', 'heads-up'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, alert appears/disappears without travel; dwell timing retained.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 760,
    background: 'dark',
    scaffold,
    label: 'Heads-up notification drop',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze alert 350×88 and timing.',
    'Wire showHeadsUpNotification and resetHeadsUpNotificationDrop.',
    'Only one heads-up alert at a time.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Alert overlays rather than pushes host content',
    'Timeout pauses while actively interacted with',
    'Expansion keeps the same outer container',
    'Upward swipe dismiss works',
    'Only one heads-up alert exists at once',
    'Reduced motion: no travel, dwell retained',
  ],
}
