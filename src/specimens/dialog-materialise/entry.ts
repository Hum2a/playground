import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#e8eaee;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const dialogMaterialise: Specimen = {
  id: 'dialog-materialise',
  ref: 'SPX-1775',
  title: 'Dialog Materialise',
  blurb:
    '304×220 confirmation dialog: scrim 180ms; scale .92→1 over 240ms from trigger origin; Confirm runs 700ms working then success before close.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired material dialog',
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
  tags: ['dialog', 'modal', 'confirmation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, dialog appears at final scale with opacity-only handoff.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 400,
    height: 380,
    background: 'card',
    scaffold,
    label: 'Dialog materialise',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 304×220 dialog and origin CSS vars.',
    'Wire resetDialogMaterialise; Confirm reuses same dialog surface.',
    'Scrim click and Escape cancel; focus returns to trigger.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Background is inert while dialog is open',
    'Focus moves into dialog and returns to trigger',
    'Confirm does not spawn a second surface',
    'Scrim and dialog have separate timing',
    'No infinite loading state',
    'Reduced motion: final scale, opacity-only',
  ],
}
