import type { Specimen } from '../types'

export const broadcastInterruption: Specimen = {
  id: 'broadcast-interruption',
  ref: 'SPX-2923',
  title: 'Broadcast Interruption',
  blurb:
    'Normal content is forcibly replaced by an urgent transmission card with yellow flash punctuation.',
  origin: {
    project: 'Original',
    surface: 'Persona 4 midnight-channel broadcast study',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['broadcast', 'interrupt', 'urgent', 'flash'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Flash and slide animations stop under reduced motion; urgent card appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    label: 'Broadcast override',
  },
}
