import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim()

export const screenshotExpandToEditor: Specimen = {
  id: 'screenshot-expand-to-editor',
  ref: 'SPX-1941',
  title: 'Screenshot Expand to Editor',
  blurb:
    '116×206 thumbnail at bottom-left morphs into centred 358×620 editor over 380ms; radius 18→26px; crop controls after 180ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired screenshot editor container transform',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['screenshot', 'container-transform', 'editor'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate geometry switch.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 390,
    height: 700,
    background: 'dark',
    scaffold,
    label: 'Screenshot expand to editor',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~390×700).',
    'Import demo.css verbatim; freeze thumbnail and editor dimensions.',
    'Controls reveal 180ms after expansion begins.',
    'Close reverses to thumbnail position.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Editor visibly originates from thumbnail',
    'Screenshot representation stays continuous',
    'Controls appear after expansion starts',
    'Closing reconstructs thumbnail position',
    'No browser capture APIs',
    'Reduced motion: immediate geometry switch',
  ],
}
