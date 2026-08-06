import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:580px;background:#e8eaee;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const searchBarToViewTransform: Specimen = {
  id: 'search-bar-to-view-transform',
  ref: 'SPX-1736',
  title: 'Search Bar-to-View Transform',
  blurb:
    '320×56 search bar in 360×560 catalogue expands to 344×500 view; radius 28→24px; icon shifts 8px; results after 140ms; Back restores scroll.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired search container transform',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['search', 'container-transform'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate container geometry switch.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 400,
    height: 600,
    background: 'card',
    scaffold,
    label: 'Search bar-to-view transform',
  },
  integration: [
    'Mount inside a relative overflow-clipped host (600px preview height).',
    'Import demo.css verbatim; freeze compact 320×56 and expanded 344×500.',
    'Wire resetSearchBarToViewTransform; focus input after expand.',
    'Host content inert while expanded; Escape/back collapses.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Search view originates from the search bar',
    'Search input remains the same logical field',
    'Results do not appear before expanded state begins',
    'Back restores exact compact geometry',
    'Host content is inert while expanded',
    'Reduced motion: instant geometry switch',
  ],
}
