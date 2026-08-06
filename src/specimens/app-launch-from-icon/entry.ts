import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:700px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim()

export const appLaunchFromIcon: Specimen = {
  id: 'app-launch-from-icon',
  ref: 'SPX-1618',
  title: 'App Launch from Icon',
  blurb:
    '4×4 launcher grid: 56×56 Atlas tile expands from centre at scale 0.12 to full 390×700 app over 420ms; internals fade after 45%.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired launcher container transform',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['launcher', 'icon', 'container-transform'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Immediate full-screen switch with ≤100ms fade.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 390,
    height: 700,
    background: 'dark',
    scaffold,
    label: 'App launch from icon',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~390×700).',
    'Import demo.css verbatim; freeze tile 56×56, start scale 0.12, radius 18→0, duration 420ms.',
    'Wire resetAppLaunchFromIcon / replayAppLaunchFromIcon.',
    'Launch origin matches selected tile centre.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Launch origin matches the selected tile centre',
    'App internals do not appear while the container is tiny',
    'Close returns to the exact source tile',
    'Launcher remains visually intact underneath',
    'No proprietary Android or Google icons are used',
  ],
}
