import type { Specimen } from '../../../types'
export const contextualVanishReappear: Specimen = {
  id: 'contextual-vanish-reappear',
  ref: 'SPX-1101',
  title: 'Contextual Vanish Reappear',
  blurb:
    'INSPECT vanishes from LEFT on FOCUS ERROR—two residual marks, a travel-free gap—then reconstructs at LINE 72 with matching marks and a 28px connector. No destination scan.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired vanish/reappear as contextual UI relocation',
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
  tags: ['navigation', 'relocation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, INSPECT appears immediately at LINE 72 with connector; no vanish travel or residues.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 400,
    background: 'dark',

    label: 'Contextual vanish reappear',
  },

}
