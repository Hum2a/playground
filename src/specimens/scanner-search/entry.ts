import type { Specimen } from '../types'
export const scannerSearch: Specimen = {
  id: 'scanner-search',
  ref: 'SPX-604',
  title: 'Scanner Search',
  blurb:
    'A pale scanline walks a fixed dataset; rows classify only as it reaches them — matches gain brackets and a rule, non-matches subdue then collapse into a quiet result count.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 SEES / analysis–inspired local search filter',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['search', 'filter', 'scan', 'hud'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Scanline travel and per-row classification motion are skipped under prefers-reduced-motion or data-force-reduced-motion; the filtered list and count appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 380,
    background: 'dark',

    label: 'Scanner search demo',
  },

}
