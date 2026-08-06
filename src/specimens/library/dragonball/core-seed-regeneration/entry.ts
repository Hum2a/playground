import type { Specimen } from '../../../types'
export const coreSeedRegeneration: Specimen = {
  id: 'core-seed-regeneration',
  ref: 'SPX-1128',
  title: 'Core Seed Regeneration',
  blurb:
    'An 18×18 canonical core (ID // 09) verifies, grows six skeleton lines, reconstructs six body regions by clip-expansion, then restores metadata to HEALTHY.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired core-seed / Cell-style regeneration recovery',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['recovery', 'reconstruction', 'canonical-state'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, REBUILD immediately shows restored Worker 09.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 440,
    background: 'dark',

    label: 'Core seed regeneration demo',
  },

}
