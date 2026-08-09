import type { Specimen } from '../../../types'

export const shardBurstButton: Specimen = {
  id: 'shard-burst-button',
  ref: 'SPX-430',
  title: 'Shard Burst Button',
  blurb:
    'A semantic CONFIRM button releases twelve deterministic blue-glass shards on every activation, then settles into a clear confirmed state.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired glass confirmation control',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3', 'persona-3-reload'],
  },
  tags: ['confirm', 'glass', 'shards', 'burst'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Confirmation state appears immediately; the twelve shards do not travel under either reduced-motion trigger.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 280,
    background: 'dark',
    label: 'Shard burst confirmation button',
  },
}
