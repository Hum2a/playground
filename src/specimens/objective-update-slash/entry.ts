import type { Specimen } from '../types'
export const objectiveUpdateSlash: Specimen = {
  id: 'objective-update-slash',
  ref: 'SPX-2103',
  title: 'Objective Update Slash',
  blurb:
    'Completed objective TARGET is struck through with a diagonal slash, then ESCORT snaps active.',
  origin: {
    project: 'Original',
    surface: 'anime/comic action language study',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['objective', 'slash', 'mission', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, slash and snap appear instantly with ESCORT active.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Objective list',
  },
  integration: [
    'Mount in a relative host; import demo.css verbatim.',
    'Wire Advance / Replay to runObjectiveUpdateSlash / replayObjectiveUpdateSlash.',
    'Slash 280ms then snap 220ms; total hold 1150ms.',
    'Honour both reduced-motion triggers with instant final state.',
  ],
  acceptance: [
    'TARGET receives visible diagonal slash',
    'ESCORT becomes active with snap emphasis',
    'TARGET dims to completed state',
    'Replay returns to initial TARGET-active layout',
    'Reduced motion: slash and active swap appear instantly',
  ],
}
