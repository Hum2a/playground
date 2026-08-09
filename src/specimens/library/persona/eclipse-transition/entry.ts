import type { Specimen } from '../../../types'

export const eclipseTransition: Specimen = {
  id: 'eclipse-transition',
  ref: 'SPX-459',
  title: 'Eclipse Transition',
  blurb:
    'A 180px moon enters from the left, a smaller dark disc crosses it into a central crescent, then a .92 overlay hides the swap before next state reveals and the moon exits.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired lunar eclipse page transition',
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
  tags: ['eclipse', 'lunar', 'wipe'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Moon travel and overlay are skipped under prefers-reduced-motion or data-force-reduced-motion; NEXT STATE appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620,
    height: 380,
    background: 'dark',
    label: 'Eclipse transition',
  },
}
