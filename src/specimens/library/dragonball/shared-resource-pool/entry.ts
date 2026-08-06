import type { Specimen } from '../types'
export const sharedResourcePool: Specimen = {
  id: 'shared-resource-pool',
  ref: 'SPX-1048',
  title: 'Shared Resource Pool',
  blurb: 'Twenty fixed five-capacity units leave one pool along three paths, making concurrent allocation and the final low reserve explicit.',
  origin: { project: 'Original', surface: 'Dragon Ball collective-energy–inspired shared capacity allocation' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'graphic' },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['shared-resource', 'allocation', 'capacity'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Immediately assigns 40, 35, and 15 capacity, leaving pool 10 LOW.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 380, height: 390, background: 'dark', label: 'Shared resource pool' },
  integration: ['Keep exactly 20 five-capacity units and three fixed paths.', 'Call window.sharedResourcePool.allocate() / .reset().', 'Update consumer metrics only after each final unit docks.'],
  acceptance: ['Pool begins at 100 with exactly 20 units.', 'BUILD/TEST/SHIP receive exactly 8/7/3 units; two remain.', 'Exactly three fixed paths and no duplicated units.', 'Pool reaches 10 LOW with two warning ticks; reduced motion is immediate.'],
}
