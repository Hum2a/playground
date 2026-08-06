import type { Specimen } from '../types'

export const shadowBindSelection: Specimen = {
  id: 'shadow-bind-selection',
  ref: 'SPX-2644',
  title: 'Shadow Bind Selection',
  blurb:
    'A dark geometric extension travels from a source anchor to a target card and locks both together as one bound selection.',
  origin: {
    project: 'Original',
    surface: 'Naruto / shadow-technique-interfaces — bound selection',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['selection', 'shadow', 'bind'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the source and target appear already bound.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Shadow bind selection',
  },
}
