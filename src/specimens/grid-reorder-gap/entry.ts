import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#f4f5f7;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const gridReorderGap: Specimen = {
  id: 'grid-reorder-gap',
  ref: 'SPX-1902',
  title: 'Grid Reorder Gap',
  blurb:
    '4×3 grid of 64px tiles: long-press 240ms or 6px drag lifts 1.06 proxy; one visible gap travels; tiles animate 160ms; Escape cancels.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired grid reorder gap',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['drag', 'grid', 'reorder'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, tiles jump between slots; drag proxy still follows pointer.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 320,
    background: 'card',
    scaffold,
    label: 'Grid reorder gap',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 4×3 grid, 64px tiles, 12px gap.',
    'Wire resetGridReorderGap; exactly one gap during drag.',
    'Escape restores original order.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly one gap exists during drag',
    'Dragged tile is never duplicated',
    'Reordering uses pointer position, not random swapping',
    'Cancel restores original ordering',
    'Drop produces a stable new DOM order',
    'Reduced motion: tiles jump; proxy follows pointer',
  ],
}
