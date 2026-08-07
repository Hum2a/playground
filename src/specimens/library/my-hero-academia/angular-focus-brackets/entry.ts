import type { Specimen } from '../../../types'
export const angularFocusBrackets: Specimen = {
  id: 'angular-focus-brackets',
  ref: 'SPX-2298',
  title: 'Angular Focus Brackets',
  blurb:
    'Four angular brackets snap onto a TARGET card; lock engages LOCK ENGAGED meta and accent slash.',
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
  tags: ['focus', 'brackets', 'selection', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, brackets appear in the locked position immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 320,
    background: 'dark',

    label: 'Angular focus brackets',
  },

}
