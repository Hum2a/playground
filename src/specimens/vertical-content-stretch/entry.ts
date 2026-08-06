import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:520px;background:#141218;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const verticalContentStretch: Specimen = {
  id: 'vertical-content-stretch',
  ref: 'SPX-1757',
  title: 'Vertical Content Stretch',
  blurb:
    'Top/bottom overscroll deforms content scaleY 1→1.055 with opposite transform origins; release settles 260ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired overscroll stretch physics',
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
  tags: ['overscroll', 'stretch', 'physics'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Replaces deformation with static 2px boundary emphasis under both reduced-motion triggers.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 380,
    height: 520,
    background: 'dark',
    scaffold,
    label: 'Vertical content stretch',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; freeze max drag 140px, scale 1.055, settle 260ms.',
    'Wire resetVerticalContentStretch.',
    'Normal scrolling must remain functional away from boundaries.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Normal scrolling works away from boundaries',
    'Top and bottom use opposite transform origins',
    'Maximum stretch is capped at scaleY 1.055',
    'Release always returns to exact scale 1',
    'Reduced motion: 2px boundary emphasis only',
  ],
}
