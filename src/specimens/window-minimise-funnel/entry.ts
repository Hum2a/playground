import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0d1118;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const windowMinimiseFunnel: Specimen = {
  id: 'window-minimise-funnel',
  ref: 'SPX-1350',
  title: 'Window Minimise Funnel',
  blurb:
    'TERMINAL 380×250 funnels via clip-path into 52×34 dock token over 520ms — content clips at 70%, title persists; RESTORE reconstructs window.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired window minimise funnel',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['window', 'minimise', 'funnel'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, open and minimised states swap instantly.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Window minimise funnel',
  },
  integration: [
    'Mount inside a relative overflow-clipped host (~420×360).',
    'Import demo.css verbatim; freeze window 380×250, token 52×34, duration 520ms.',
    'Wire minimiseWindow / restoreWindow on MINIMISE / RESTORE.',
    'Destination token visible before minimise.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Destination token visible before minimise',
    'Geometry visibly funnels via clip-path',
    'TERMINAL identity persists through transition',
    'Final token occupies exact 52×34 destination',
    'RESTORE reconstructs full 380×250 window',
    'Reduced motion: instant state swap',
  ],
}
