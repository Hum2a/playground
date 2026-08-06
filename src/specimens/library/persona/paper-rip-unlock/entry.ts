import type { Specimen } from '../types'
export const paperRipUnlock: Specimen = {
  id: 'paper-rip-unlock',
  ref: 'SPX-020',
  title: 'Paper rip unlock',
  blurb:
    'A sealed paper sheet tears from the centre into two zig-zag halves that violently pull apart, revealing the lesson underneath.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['unlock', 'reveal', 'tear'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Crack, tear travel, separation, and fragments are skipped under prefers-reduced-motion or data-force-reduced-motion; the paper hides immediately and the unlocked underlay remains.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'card',

    label: 'Sealed lesson',
  },

}
