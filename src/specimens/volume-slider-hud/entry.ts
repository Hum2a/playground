import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#12141a;display:grid;place-items:center;padding:0;">
  {{specimen}}
</div>
`.trim()

export const volumeSliderHud: Specimen = {
  id: 'volume-slider-hud',
  ref: 'SPX-1848',
  title: 'Volume Slider HUD',
  blurb:
    '72×280 transient HUD from translateX(90px) over 220ms; vertical track 0–100 in 10-point steps; mute at 0; expands to 240px with three sliders.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired volume HUD arrival',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['system-hud', 'slider', 'temporary'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, HUD appears in place.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 390,
    height: 420,
    background: 'dark',
    scaffold,
    label: 'Volume slider HUD',
  },
  integration: [
    'Mount inside relative overflow-clipped host.',
    'Import demo.css verbatim; freeze HUD dimensions and 2200ms dwell.',
    'Each level change resets timeout.',
    'Expand widens same container to 240px.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Timeout resets after every level change',
    'Level stays 0–100 in 10-point steps',
    'Expanded state uses same container',
    'Mute glyph at exactly 0',
    'HUD never shifts host layout',
    'Reduced motion: appears in place',
  ],
}
