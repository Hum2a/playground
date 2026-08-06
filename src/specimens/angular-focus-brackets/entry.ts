import type { Specimen } from '../types'
export const angularFocusBrackets: Specimen = {
  id: 'angular-focus-brackets',
  ref: 'SPX-2298',
  title: 'Angular Focus Brackets',
  blurb:
    'Four angular comic brackets snap from outside corners onto a target card and lock focus with an accent outline.',
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
  integration: [
    'Mount inside a relative overflow-hidden frame.',
    'Import demo.css verbatim; wire Focus trigger or runAngularFocusBrackets().',
    'Reset via resetAngularFocusBrackets() on replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Focus trigger snaps four brackets onto the target card',
    'Locked state uses accent bracket colour and outline',
    'Replay retracts brackets deterministically',
    'Reduced motion shows locked brackets immediately',
  ],
}
