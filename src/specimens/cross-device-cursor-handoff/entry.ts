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

export const crossDeviceCursorHandoff: Specimen = {
  id: 'cross-device-cursor-handoff',
  ref: 'SPX-1497',
  title: 'Cross-Device',
  blurb:
    'Pointer approaches right edge at y 62%; clips over last 4px; reappears after 45ms on adjacent display; two boundary ticks 120ms; continues 120px without traversing 36px gap.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired cross-surface pointer handoff',
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
  tags: ['pointer', 'boundary', 'continuity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, pointer transfers directly across boundary without travel animation.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 440,
    height: 220,
    background: 'dark',
    scaffold,
    label: 'Cross-device cursor handoff',
  },
  integration: [
    'Mount inside a relative overflow-clipped host.',
    'Import demo.css verbatim; freeze 36px gap and handoff timings.',
    'Pointer never animates through physical gap.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Pointer never traverses gap',
    'Normalised y preserved',
    'Two boundary ticks',
    'Velocity continuity visually plausible',
    'Reduced motion: instant boundary transfer',
  ],
}
