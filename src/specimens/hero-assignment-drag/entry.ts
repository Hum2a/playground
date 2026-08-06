import type { Specimen } from '../types'
export const heroAssignmentDrag: Specimen = {
  id: 'hero-assignment-drag',
  ref: 'SPX-2304',
  title: 'Hero Assignment Drag',
  blurb:
    'A hero profile card condenses into a compact dispatch proxy and travels into the dispatch zone.',
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
  tags: ['drag', 'dispatch', 'assignment', 'proxy'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, the dispatch zone fills immediately with no proxy travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'Hero assignment drag',
  },
  integration: [
    'Mount inside a relative overflow-hidden board.',
    'Import demo.css verbatim; wire Assign trigger or runHeroAssignmentDrag().',
    'Reset via resetHeroAssignmentDrag() on replay.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Assign trigger condenses card into proxy and moves it toward DISPATCH',
    'Source card becomes dashed placeholder during assignment',
    'Dispatch zone shows filled accent state on completion',
    'Replay resets card, proxy, and zone deterministically',
    'Reduced motion skips proxy animation',
  ],
}
