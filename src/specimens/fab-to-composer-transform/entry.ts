import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:640px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim()

export const fabToComposerTransform: Specimen = {
  id: 'fab-to-composer-transform',
  ref: 'SPX-1559',
  title: 'FAB-to-Composer Transform',
  blurb:
    '56×56 FAB grows into a 342×210 composer over 360ms; glyph rotates 45° and fades; content staggers in; Escape cancels.',
  origin: {
    project: 'Original',
    surface: 'Android Material FAB container transform',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['fab', 'container-transform', 'composer'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Immediate container geometry switch; contents reveal without movement.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 390,
    height: 640,
    background: 'dark',
    scaffold,
    label: 'FAB to composer transform',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~390×640).',
    'Import demo.css verbatim; freeze FAB 56×56, composer 342×210, radius 28→24px, duration 360ms.',
    'Wire resetFabToComposer / replayFabToComposer.',
    'Focus textarea only after expansion completes.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'There is never a visible duplicate FAB and composer container',
    'The composer clearly grows from the FAB location',
    'Cancel reconstructs the original FAB',
    'Keyboard focus is sensible and Escape closes it',
    'No framework or external asset dependency',
  ],
}
