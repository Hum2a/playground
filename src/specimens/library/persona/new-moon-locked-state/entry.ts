import type { Specimen } from '../../../types'

export const newMoonLockedState: Specimen = {
  id: 'new-moon-locked-state',
  ref: 'SPX-467',
  title: 'New Moon Locked State',
  blurb:
    'A non-interactive night-access card refuses ATTEMPT ACCESS with a brief new-moon emphasis, one cyan rim flash, and ACCESS DENIED.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired restricted night access',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['lunar', 'locked', 'denied'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'No moon movement or rim animation; ACCESS DENIED appears immediately, then UNAVAILABLE after 600ms + 220ms under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 360,
    background: 'dark',
    label: 'New moon locked state',
  },
}
