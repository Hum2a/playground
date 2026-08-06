import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#0d1118;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const windowSnapPreview: Specimen = {
  id: 'window-snap-preview',
  ref: 'SPX-1354',
  title: 'Window Snap Preview',
  blurb:
    'EDITOR 260×190 on 520×380 desktop — left 54px zone shows snap preview inset 10px over 120ms; release commits to left half in 260ms.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired window snap preview',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['window', 'drag', 'preview'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, preview and committed snap appear instantly.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 560,
    height: 420,
    background: 'dark',
    scaffold,
    label: 'Window snap preview',
  },
  integration: [
    'Mount inside a relative overflow-clipped host (~560×420).',
    'Import demo.css verbatim; freeze desktop 520×380, zone 54px, preview bounds.',
    'Drag window freely; preview only in left zone.',
    'Release in zone commits exact preview bounds over 260ms.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Preview only appears in left 54px activation zone',
    'Preview does not move window before release',
    'Leaving zone cancels preview in 90ms',
    'Release inside commits exact preview bounds',
    'Release elsewhere keeps free window position',
    'Reduced motion: instant preview and snap',
  ],
}
