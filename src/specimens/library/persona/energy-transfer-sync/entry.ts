import type { Specimen } from '../types'
export const energyTransferSync: Specimen = {
  id: 'energy-transfer-sync',
  ref: 'SPX-618',
  title: 'Energy Transfer Sync',
  blurb:
    'Archive (READY v1.4) sends one angular blue energy packet along a three-segment path to Playground (OUTDATED v1.3); on arrival the target updates vertically and the link settles to SYNCED.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 directional sync / energy-transfer language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['progress', 'hud', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Packet travel, trail, and arrival motion are skipped under prefers-reduced-motion or data-force-reduced-motion; target immediately shows READY v1.4 with SYNCED.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 300,
    background: 'dark',

    label: 'Archive → Playground sync',
  },

}
