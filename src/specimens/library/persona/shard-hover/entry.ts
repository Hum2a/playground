import type { Specimen } from '../../../types'

export const shardHover: Specimen = {
  id: 'shard-hover',
  ref: 'SPX-427',
  title: 'Shard Hover',
  blurb:
    'A seven-piece blue-glass access panel fractures outward on hover or keyboard focus, then returns to its precisely assembled state.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Reload–inspired Tartarus access panel',
  },
  facets: {
    kind: 'interaction',
    tech: 'css-only',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3-reload'],
  },
  tags: ['glass', 'shards', 'hover'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The seven shards still separate on hover or focus, but do so immediately when either reduced-motion setting is enabled.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 330,
    height: 196,
    background: 'dark',
    label: 'Shard hover panel',
  },
}
