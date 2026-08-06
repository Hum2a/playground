import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:500px;background:#0f1218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const screenshotThumbnailArrival: Specimen = {
  id: 'screenshot-thumbnail-arrival',
  ref: 'SPX-1940',
  title: 'Screenshot Thumbnail Arrival',
  blurb:
    'Capture flashes 70ms, then a 116×206 miniature thumbnail arrives bottom-left over 300ms; dwell 4200ms; tap opens editor and pauses timeout.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired screenshot thumbnail chip',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['screenshot', 'thumbnail', 'temporary-surface'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, omit flash and travel; thumbnail appears in place.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 390,
    height: 500,
    background: 'dark',
    scaffold,
    label: 'Screenshot thumbnail arrival',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 70ms flash, 300ms arrival, 4200ms dwell.',
    'Use prebuilt miniature DOM — no canvas capture APIs.',
    'Only one thumbnail; new capture resets timeout.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Capture does not require browser screenshot permissions',
    'Only one thumbnail exists',
    'New capture replaces or resets existing timeout cleanly',
    'Thumbnail never changes app layout',
    'Timeout pauses while focused or hovered',
    'Reduced motion: in-place thumbnail',
  ],
}
