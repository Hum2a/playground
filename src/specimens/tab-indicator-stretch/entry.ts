import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:220px;background:#12141a;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const tabIndicatorStretch: Specimen = {
  id: 'tab-indicator-stretch',
  ref: 'SPX-1704',
  title: 'Tab Indicator Stretch',
  blurb:
    'Single 34×3px indicator stretches toward next tab centre during first 45% of 300ms travel — width returns to 34px; keyboard arrows switch tabs.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired tab indicator stretch',
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
  tags: ['tabs', 'indicator', 'selection'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, indicator jumps to new centre at fixed 34px width.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 240,
    background: 'dark',
    scaffold,
    label: 'Tab indicator stretch',
  },
  integration: [
    'Mount inside relative overflow-clipped host.',
    'Import demo.css verbatim; single indicator element only.',
    'Stretch capped at 104px total width (34 + 70).',
    'Real tab semantics with arrow key navigation.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Only one indicator exists',
    'Width returns exactly to 34px after every transition',
    'Longer moves stretch more capped at 104px',
    'Rapid tab changes settle correctly',
    'Selected tab has semantic aria state',
    'Reduced motion: jump to centre at 34px',
  ],
}
