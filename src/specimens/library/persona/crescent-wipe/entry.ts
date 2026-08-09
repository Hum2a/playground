import type { Specimen } from '../../../types'

export const crescentWipe: Specimen = {
  id: 'crescent-wipe',
  ref: 'SPX-460',
  title: 'Crescent Wipe',
  blurb:
    'A 520px geometric crescent with a 2px cyan leading edge sweeps PAGE A aside to reveal PAGE B in 900ms — a true crescent, not a rectangular wipe.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired crescent page wipe',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['wipe', 'lunar', 'crescent'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Crescent travel is skipped under prefers-reduced-motion or data-force-reduced-motion; PAGE B appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620,
    height: 360,
    background: 'dark',
    label: 'Crescent wipe',
  },
}
