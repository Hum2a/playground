import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:480px;background:#0c1018;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const snackbarRise: Specimen = {
  id: 'snackbar-rise',
  ref: 'SPX-1666',
  title: 'Snackbar Rise',
  blurb:
    '344×52px snackbar rises 20px above bottom after row delete; UNDO restores row; dwell 4500ms; one surface reused.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired snackbar feedback',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['snackbar', 'feedback', 'temporary'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, snackbar appears in place with opacity only.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 500,
    background: 'dark',
    scaffold,
    label: 'Snackbar rise',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze snackbar 344×52 and timing.',
    'Wire resetSnackbarRise on replay.',
    'Repeated deletes reuse same snackbar container.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Snackbar never changes host layout',
    'UNDO genuinely restores the deleted row',
    'Repeated deletes reuse one surface',
    'Focus/hover pauses dismissal',
    'Escape can dismiss temporary feedback',
    'Reduced motion: opacity-only appearance',
  ],
}
