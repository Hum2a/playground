import type { Specimen } from '../../../types'

export const channelTuningScrub: Specimen = {
  id: 'channel-tuning-scrub',
  ref: 'SPX-TODO',
  title: 'Channel Tuning Scrub',
  blurb:
    'Dragging a tuning dial moves through unstable analogue fragments before a target broadcast locks into place.',
  origin: {
    project: 'Original',
    surface: 'Persona 4 midnight-channel broadcast study',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['crt', 'tuning', 'static', 'broadcast', 'scrub'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Static flicker and content transitions stop under reduced motion; phase states remain visible.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',
    label: 'Channel tuning dial',
  },
}
