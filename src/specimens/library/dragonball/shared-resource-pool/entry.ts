import type { Specimen } from '../../../types'
export const sharedResourcePool: Specimen = {
  id: 'shared-resource-pool',
  ref: 'SPX-1048',
  title: 'Shared Resource Pool',
  blurb: 'Twenty orbit units peel off a luminous central pool mass along three frozen arcs into BUILD, TEST, and SHIP receivers until the core reaches 10 LOW.',
  origin: { project: 'Original', surface: 'Dragon Ball collective-energy–inspired shared capacity allocation' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'graphic' },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['shared-resource', 'allocation', 'capacity'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Immediately assigns 40, 35, and 15 capacity, leaving pool 10 LOW.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 420, background: 'dark', label: 'Shared resource pool' },
  integration: [
    'Keep the circular arena: central pool mass, dashed orbit ring, three outer receiver nodes, three frozen SVG arcs.',
    'Call window.sharedResourcePool.allocate() / .reset() / .init().',
    'Pool commits 100→60→25→10; consumer metrics commit only after each group final dock (+240ms).',
  ],
  acceptance: [
    'Pool begins at 100 with exactly 20 orbit units on the ring.',
    'BUILD/TEST/SHIP receive exactly 8/7/3 units (40/35/15 capacity); two units remain.',
    'Central mass scales with pool level; arcs animate only during ALLOCATE.',
    'Pool reaches 10 LOW with two warning ticks; reduced motion is immediate.',
  ],
}
