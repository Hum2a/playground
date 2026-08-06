import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const multiItemDragStack: Specimen = {
  id: 'multi-item-drag-stack',
  ref: 'SPX-1452',
  title: 'Multi-Item Drag Stack',
  blurb:
    'Four selected files A.MD–D.JSON condense into 108×58 stack with offsets 4/8/12, badge 4, formation 45ms stagger; drop absorbs at 35ms stagger.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired multi-item drag aggregation',
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
  tags: ['drag', 'aggregation', 'stack'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, create final four-item stack immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 400,
    height: 320,
    background: 'dark',
    scaffold,
    label: 'Multi-item drag stack',
  },
  integration: [
    'Mount inside a relative overflow-clipped host (~400×320).',
    'Import demo.css verbatim; freeze proxy 108×58, offsets, scales, badge 4.',
    'Wire startMultiItemDrag / resetMultiItemDrag.',
    'Source placeholders remain during drag; no duplication after drop.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly four items: A.MD B.PDF C.PNG D.JSON',
    'Exactly four visible stack layers where geometry permits',
    'Count badge equals 4',
    'A.MD remains top identity',
    'No source duplication after successful drop',
    'Reduced motion: instant stack formation',
  ],
}
