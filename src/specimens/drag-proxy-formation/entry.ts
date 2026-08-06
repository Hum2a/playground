import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const dragProxyFormation: Specimen = {
  id: 'drag-proxy-formation',
  ref: 'SPX-1451',
  title: 'Drag Proxy Formation',
  blurb:
    'REPORT // Q3 condenses into a 116×64 portable proxy after 6px drag while the source placeholder remains; valid ARCHIVE drop absorbs, cancel merges back.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired drag proxy condensation',
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
  tags: ['drag', 'compression', 'portability'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, use a fixed compact proxy immediately with no formation morph.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 360,
    background: 'dark',
    scaffold,
    label: 'Drag proxy formation',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 6px threshold, 140ms formation, 8px pointer offset.',
    'Source placeholder remains during drag; proxy centre hit-tests ARCHIVE.',
    'Valid drop absorbs; cancel returns and merges without duplicate cards.',
    'Honour both reduced-motion triggers with instant compact proxy.',
  ],
  acceptance: [
    'Drag begins only after 6px movement',
    'Original source location remains represented as placeholder',
    'Proxy is smaller than source (116×64)',
    'REPORT // Q3 and 18 PAGES persist on proxy',
    'Valid drop target ARCHIVE responds when proxy centre enters bounds',
    'Cancel restores source without duplicate cards',
    'Reduced motion: fixed compact proxy, no formation morph',
  ],
}
