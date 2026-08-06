import type { Specimen } from '../types'

export const summoningSealMaterialise: Specimen = {
  id: 'summoning-seal-materialise',
  ref: 'SPX-2516',
  title: 'Summoning Seal Materialise',
  blurb: 'A seal constructs then materialises a tool panel.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['summon'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved state appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Summoning Seal Materialise',
  },
}
