import type { Specimen } from '../../../types'
export const itemObtained: Specimen = {
  id: 'item-obtained',
  ref: 'SPX-802',
  title: 'Item Obtained',
  blurb:
    'ENERGY SHARD appears, holds for acknowledgement, then curves into the inventory slot — quantity stays ×02 until dock, then clips to ×03.',
  origin: {
    project: 'Original',
    surface: 'Pokemon-inspired item pickup / inventory acquisition',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['acquisition', 'inventory', 'feedback'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, inventory jumps to ×03 with static ITEM OBTAINED — no discovery or transfer.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 340,
    background: 'card',

    label: 'Energy Shard acquisition (demo)',
  },

}
