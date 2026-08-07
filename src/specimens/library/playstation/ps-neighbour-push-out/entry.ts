import type { Specimen } from '../../../types'

export const psNeighbourPushOut: Specimen = {
  id: 'ps-neighbour-push-out',
  ref: 'SPX-3382',
  title: 'Neighbour Push-Out',
  blurb:
    'Adjacent cards yield by frozen push distances when the focused tile expands, then restore.',
  origin: { project: 'Original', surface: 'PlayStation-inspired media/home row language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['layout', 'focus'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, expand and neighbour offsets apply instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 300,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Neighbour push-out',
  },
  acceptance: [
    'Focused card expands to 112px width at scale 1.06.',
    'Neighbours yield by 20/24/36px push distances matching focus index.',
    'Changing focus restores previous neighbours and pushes the new ones.',
    'Reduced motion applies expand and offsets instantly with no transition.',
  ],
}
