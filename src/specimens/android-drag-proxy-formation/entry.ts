import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#f4f5f7;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const androidDragProxyFormation: Specimen = {
  id: 'android-drag-proxy-formation',
  ref: 'SPX-1897',
  title: 'Drag Proxy Formation',
  blurb:
    '300×92 FIELD NOTES row condenses to 156×48 proxy after 7px drag; 92px placeholder; INBOX/LOCKED targets; invalid drop returns in 220ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired drag proxy condensation',
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
  tags: ['drag-drop', 'proxy', 'ownership'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, proxy formation and return happen instantly.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 380,
    background: 'card',
    scaffold,
    label: 'Android drag proxy formation',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 7px threshold, 300×92→156×48 proxy.',
    'Source placeholder remains during drag; proxy centre hit-tests targets.',
    'Valid INBOX absorbs; invalid/void returns over 220ms.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Drag does not start on simple click',
    'Source layout stays stable via placeholder',
    'Proxy contains reduced, not duplicated, information',
    'Valid target acquisition is deterministic',
    'Invalid drop restores source exactly',
    'Reduced motion: instant formation and return',
  ],
}
