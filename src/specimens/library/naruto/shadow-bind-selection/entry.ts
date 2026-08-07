import type { Specimen } from '../../../types'

export const shadowBindSelection: Specimen = {
  id: 'shadow-bind-selection',
  ref: 'SPX-2644',
  title: 'Shadow Bind Selection',
  blurb:
    'Three seal-lacquer tendrils extend from source to target in 260ms, then lock selection with a 220ms bind pulse — shadow bind, not a highlight fade.',
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
  acceptance: [
    '3 tendrils extend in 260ms then lock in 220ms',
    'Status BOUND after lock pulse; bind count frozen',
    'Reduced motion shows already bound',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Shadow bind selection',
  },
}
