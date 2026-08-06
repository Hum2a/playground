import type { Specimen } from '../../../types'
export const fogClearingDataReveal: Specimen = {
  id: 'fog-clearing-data-reveal',
  ref: 'SPX-TODO',
  title: 'Fog-Clearing Data Reveal',
  blurb:
    'Obscured case data progressively becomes readable as a fog overlay clears to completion.',
  origin: {
    project: 'Original',
    surface: 'Persona 4–inspired fog / hidden information language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['fog', 'reveal', 'data'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, fog removed immediately with data fully visible.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#101010;display:grid;place-items:center;padding:0.75rem;">{{specimen}}</div>',
    label: 'Fog data reveal',
  },
}
