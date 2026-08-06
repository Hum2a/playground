import type { Specimen } from '../types'
export const pressedControlCompression: Specimen = {
  id: 'pressed-control-compression',
  ref: 'SPX-1365',
  title: 'Pressed Control Compression',
  blurb:
    'RUN BUILD control compresses on press (.965 scale, 3px padding), release inside bounces to RUNNING; outside release cancels.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired pressed control tactile response',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['press', 'compression', 'button'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, structural pressed boundary without scale.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 220,
    height: 220,
    background: 'dark',

    label: 'Pressed control compression',
  },

}
