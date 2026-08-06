import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:620px;background:#14161c;display:grid;place-items:center;padding:0.5rem;">
  {{specimen}}
</div>
`.trim()

export const cardToDetailContainerTransform: Specimen = {
  id: 'card-to-detail-container-transform',
  ref: 'SPX-1558',
  title: 'Card-to-Detail Container Transform',
  blurb:
    'Middle list card morphs into a detail surface over 420ms with persistent title, metadata fade, and measured geometry.',
  origin: {
    project: 'Original',
    surface: 'Android Material container transform',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['container-transform', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Immediate geometry switch with short opacity handoff ≤100ms.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 620,
    background: 'dark',
    scaffold,
    label: 'Card to detail transform',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~360×620).',
    'Import demo.css verbatim; freeze card 304×112, detail 336×548, radius 20→28px, duration 420ms.',
    'Wire resetCardToDetail / replayCardToDetail.',
    'Middle card is the morph source; Back reverses geometry.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Expanded surface visibly originates from the selected card',
    'Title never disappears during the transformation',
    'Closing returns to the exact source card',
    'Sibling cards remain static beneath the overlay layer',
    'Reopening after resize recomputes geometry correctly',
  ],
}
