import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:120px;background:#101218;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const searchFieldActivation: Specimen = {
  id: 'search-field-activation',
  ref: 'SPX-1442',
  title: 'Search Field Activation',
  blurb:
    'Header LIBRARY with compact 38px search — title retracts 120ms, search expands to 276px over 260ms, placeholder after 55%, CANCEL restores.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired search field layout morph',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['search', 'focus', 'layout-morph'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, header layout swaps instantly with focus preserved.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 400,
    height: 120,
    background: 'dark',
    scaffold,
    label: 'Search field activation',
  },
  integration: [
    'Mount inside a relative overflow-clipped host (~400×120).',
    'Import demo.css verbatim; freeze header 360px, search 38→276px.',
    'Wire activateSearch / cancelSearch on trigger and CANCEL.',
    'Title retracts 120ms; placeholder after 55% expand.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Search starts compact at 38px',
    'Expanded width is 276px',
    'Focus enters input on activation',
    'CANCEL restores title LIBRARY and ADD',
    'No elements overlap during transition',
    'Reduced motion: immediate layout swap',
  ],
}
