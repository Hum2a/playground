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

export const controlCentreModuleExpansion: Specimen = {
  id: 'control-centre-module-expansion',
  ref: 'SPX-1471',
  title: 'Control Centre Module Expansion',
  blurb:
    'AUDIO compact tile at 62% expands to 320×210 over 340ms with slider, OUTPUT // SPEAKERS, and BALANCE // 0; changed volume persists after collapse.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired system module expansion',
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
  tags: ['control', 'compact-to-rich', 'slider'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, instant compact/expanded swap; slider remains functional.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 340,
    height: 260,
    background: 'dark',
    scaffold,
    label: 'Control module expansion',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 142×72 compact, 320×210 expanded, 340ms expansion.',
    '62% value persists; slider at 70% width; rows stagger 45ms.',
    'Collapse preserves any changed slider value.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Compact and expanded states share AUDIO identity',
    '62% persists through expansion',
    'Expanded size exactly 320×210',
    'OUTPUT then BALANCE rows reveal in order',
    'Changed volume persists after collapse',
    'Reduced motion: instant state swap',
  ],
}
