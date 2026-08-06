import type { Specimen } from '../../../types'
export const inkSplatTransition: Specimen = {
  id: 'ink-splat-transition',
  ref: 'SPX-013',
  title: 'Ink Splat Transition',
  blurb:
    'Seven irregular ink blobs strike and expand to full purple coverage for a content swap, then peel away toward off-centre origins.',
  origin: {
    project: 'Original',
    surface: 'Splatoon-inspired playful ink transition language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'splatoon',
  },
  tags: ['ink', 'splat', 'liquid'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Splat travel/expansion is skipped under prefers-reduced-motion or data-force-reduced-motion; a solid purple coverage frame still hides the content change before reveal.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'page',

    label: 'Page transition demo',
  },

}
