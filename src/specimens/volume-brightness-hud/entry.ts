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

export const volumeBrightnessHud: Specimen = {
  id: 'volume-brightness-hud',
  ref: 'SPX-1474',
  title: 'Volume/Brightness HUD',
  blurb:
    '220×86 transient OUTPUT LEVEL HUD with 10 segments; 42→68 over 180ms; entrance 140ms; dwell 900ms; repeated INCREASE resets dwell without replaying entrance.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired transient level HUD',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['hud', 'volume', 'transient'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, HUD appears without scale movement.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 280,
    height: 220,
    background: 'dark',
    scaffold,
    label: 'Volume brightness HUD',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 220×86 HUD and ten segments.',
    'Only one HUD instance; repeated INCREASE extends dwell.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly ten segments',
    'Final value 68',
    'Repeated input extends dwell',
    'Only one HUD exists',
    'Reduced motion: no scale movement',
  ],
}
