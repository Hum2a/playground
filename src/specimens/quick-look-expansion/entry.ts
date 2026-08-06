import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const quickLookExpansion: Specimen = {
  id: 'quick-look-expansion',
  ref: 'SPX-1459',
  title: 'Quick Look Expansion',
  blurb:
    'DESIGN.PDF expands from its file row into a 420×330 preview over 380ms; list stays visible at scale 0.985; three content blocks stagger 45ms.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired quick preview expansion',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['preview', 'expansion', 'context'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, show/hide preview directly while preserving selected row.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 400,
    background: 'dark',
    scaffold,
    label: 'Quick look expansion',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 380ms expansion, 52px row, 420×330 preview.',
    'List remains visible at scale 0.985; three blocks at 45ms stagger.',
    'ESC/CLOSE collapses back to DESIGN.PDF row without navigation.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'File list remains present during preview',
    'DESIGN.PDF identity persists through transition',
    'Preview expands from selected row context',
    'Exactly three document content blocks reveal',
    'Close returns focus/visual ownership to selected row',
    'Reduced motion: instant preview toggle',
  ],
}
