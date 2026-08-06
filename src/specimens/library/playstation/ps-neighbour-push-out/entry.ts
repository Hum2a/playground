import type { Specimen } from '../../../types'

export const psNeighbourPushOut: Specimen = {
  id: 'ps-neighbour-push-out',
  ref: 'SPX-3382',
  title: 'Neighbour Push-Out',
  blurb: 'Adjacent cards move aside when the focused tile expands to claim more horizontal space.',
  origin: { project: 'Original', surface: 'PlayStation-inspired media/home row language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation' },
  tags: ['layout', 'focus'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Expansion and neighbour offsets apply instantly with no transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 300,
    background: 'dark',
    scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Neighbour push-out',
  },
}
