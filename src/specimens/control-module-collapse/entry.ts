import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const controlModuleCollapse: Specimen = {
  id: 'control-module-collapse',
  ref: 'SPX-1472',
  title: 'Control Centre Module Collapse',
  blurb:
    'NETWORK expanded 320×210 retracts rows bottom-up at 35ms stagger; latency first; boundary contracts 300ms to 142×72 NETWORK // CONNECTED.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired system module collapse',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['control', 'rich-to-compact', 'collapse'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate collapse to compact state.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 340,
    height: 260,
    background: 'dark',
    scaffold,
    label: 'Control module collapse',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze expanded/compact dimensions and stagger.',
    'CONNECTED identity persists in compact node.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Expanded state starts readable',
    'Rows retract in deterministic order',
    'CONNECTED identity persists',
    'Final dimensions exact',
    'Exactly one compact status node',
    'Reduced motion: immediate collapse',
  ],
}
