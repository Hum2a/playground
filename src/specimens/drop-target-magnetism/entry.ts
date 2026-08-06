import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const dropTargetMagnetism: Specimen = {
  id: 'drop-target-magnetism',
  ref: 'SPX-1453',
  title: 'Drop Target Magnetism',
  blurb:
    'FILE // 07 drag proxy is pulled up to 28% toward ARCHIVE within 86px with four acquisition ticks below 42px; LOCKED never attracts.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired drop target magnetism',
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
  tags: ['drag', 'target', 'attraction'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, disable positional magnetism and use static valid-target outline when in bounds.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 400,
    height: 280,
    background: 'dark',
    scaffold,
    label: 'Drop target magnetism',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 86px radius, 28% max attraction, 42px tick threshold.',
    'Only ARCHIVE attracts; LOCKED is inert.',
    'Drop inside ARCHIVE commits; outside returns to source.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Only ARCHIVE attracts',
    'Attraction begins at 86px radius',
    'Maximum attraction limited to 28%',
    'Exactly four acquisition ticks below 42px',
    'Leaving radius restores normal drag',
    'Invalid target LOCKED never pulls proxy',
    'Reduced motion: static outline when in bounds',
  ],
}
