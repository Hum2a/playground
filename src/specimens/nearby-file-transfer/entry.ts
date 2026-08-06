import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:220px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const nearbyFileTransfer: Specimen = {
  id: 'nearby-file-transfer',
  ref: 'SPX-1868',
  title: 'Nearby File Transfer',
  blurb:
    'ARCHIVE.ZIP condenses to a 34×42px proxy along a curved 650ms path; recipient ring progresses 0→100% over 1100ms; REJECT returns proxy.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired nearby file transfer arc',
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
  tags: ['nearby', 'transfer', 'progress'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, proxy jumps between nodes while progress remains determinate.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 220,
    background: 'dark',
    scaffold,
    label: 'Nearby file transfer',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 240px separation, 650ms arc, 1100ms ring.',
    'Reject sends proxy 40px toward recipient then returns to source.',
    'Completion absorbs proxy — no duplicate document nodes.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Transfer path has visible source and destination',
    'Reject never reaches completed state',
    'Completion absorbs proxy rather than leaving duplicates',
    'Progress is finite and deterministic',
    'Reset reconstructs original document',
    'Reduced motion: jump proxy, keep determinate progress',
  ],
}
