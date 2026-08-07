import type { Specimen } from '../../../types'

export const shadowBindSelection: Specimen = {
  id: 'shadow-bind-selection',
  ref: 'SPX-2644',
  title: 'Shadow Bind Selection',
  blurb:
    'Three shadow tendrils extend from source to target on a 60ms stagger, then lock both into one bound selection.',
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
    'Exactly 3 tendrils extend with 60ms stagger over 260ms then lock for 220ms',
    'Lock uses scale + pulse on target — not opacity fade as primary',
    'Reduced motion shows already BOUND',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Shadow bind selection',
  },
}
