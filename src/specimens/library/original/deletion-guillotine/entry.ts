import type { Specimen } from '../../../types'
export const deletionGuillotine: Specimen = {
  id: 'deletion-guillotine',
  ref: 'SPX-317',
  title: 'Deletion Guillotine',
  blurb:
    'After deliberate confirmation, a black irregular blade cuts Project Nightfall along a diagonal; complementary clipped halves exit opposite ways — visual delete only, no persistence.',
  origin: {
    project: 'Original',
    surface: 'Destructive delete / irreversible removal language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  tags: ['delete', 'destructive', 'removal'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, jumps immediately to PROJECT REMOVED with status announcement — no blade or split.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 300,
    background: 'dark',

    label: 'Project card delete (demo)',
  },

}
