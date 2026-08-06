import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0c0d10;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const compactActivityExpansion: Specimen = {
  id: 'compact-activity-expansion',
  ref: 'SPX-1326',
  title: 'Compact Activity Expansion',
  blurb:
    'A 126×36 deploy capsule morphs to 318×152 over 360ms; progress glyph persists while header, job rows, and ETA construct at 35/50/68%.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired compact live-status expansion',
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
  tags: ['morph', 'live-activity', 'expansion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Geometry switches in 100ms non-scaling transition; all status text remains available.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 280,
    background: 'dark',
    scaffold,
    label: 'Compact activity expansion',
  },
  integration: [
    'Mount inside a relative overflow-hidden dark host (~360×280).',
    'Import demo.css verbatim; freeze 126×36→318×152 geometry and 360ms expansion.',
    'Wire expandCompactActivity / collapseCompactActivity / resetCompactActivity.',
    'Progress glyph must persist and relocate to expanded header.',
    'Exactly two compact status nodes; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'One compact representation becomes one expanded representation',
    'Width changes 126→318px; height 36→152px; radius 18→24px',
    'Progress identity persists through transition',
    'Exactly two compact status nodes',
    'Expanded rows appear in deterministic order at 35/50/68%',
    'Collapse returns to exact compact dimensions',
    'Reduced motion: immediate or 100ms non-scaling',
  ],
}
