import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:180px;background:#f4f5f7;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const sliderThumbPickup: Specimen = {
  id: 'slider-thumb-pickup',
  ref: 'SPX-1720',
  title: 'Slider Thumb Pickup',
  blurb:
    '280px range slider (0–100, step 5): thumb grows 20→28px on pickup; 44×32 bubble tracks thumb centre; fill follows value.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired slider precision feedback',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['slider', 'control', 'drag'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, thumb and bubble state switch instantly.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 340,
    height: 220,
    background: 'card',
    scaffold,
    label: 'Slider thumb pickup',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 280px track, step 5, thumb 20/28px.',
    'Wire resetSliderThumbPickup; bubble hides 180ms after release.',
    'Track fill width must match numeric value.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Value is always a multiple of 5',
    'Bubble follows thumb centre',
    'Keyboard arrows update value',
    'Track fill and numeric value cannot disagree',
    'Thumb returns to 20px after interaction',
    'Reduced motion: instant thumb and bubble state',
  ],
}
