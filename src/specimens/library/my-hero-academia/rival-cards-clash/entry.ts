import type { Specimen } from '../../../types'
export const rivalCardsClash: Specimen = {
  id: 'rival-cards-clash',
  ref: 'SPX-2206',
  title: 'Rival Cards Clash',
  blurb:
    'Two rival profile cards slam from opposite sides into a central diagonal divider and lock in a READY state.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia-inspired comic/anime action language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['versus', 'comic', 'cards', 'clash'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, cards appear at the settled clash position with READY visible immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 320,
    background: 'dark',

    label: 'Rival cards clash',
  },

}
