import type { Specimen } from '../../../types'

export const saveConflictCompare: Specimen = {
  id: 'save-conflict-compare',
  ref: 'SPX-3452',
  title: 'Save Conflict Compare',
  blurb: 'Two save versions expand side-by-side revealing timestamp and progress differences for conflict resolution.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired system UI motion study (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'playstation',
  },
  tags: ["save","compare"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Under reduced motion both cards appear expanded with metadata visible immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 460,
    height: 360,
    background: 'dark',
    label: 'Save Conflict Compare demo',
  },
}
