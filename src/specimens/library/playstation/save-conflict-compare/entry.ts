import type { Specimen } from '../../../types'

export const saveConflictCompare: Specimen = {
  id: 'save-conflict-compare',
  ref: 'SPX-3452',
  title: 'Save Conflict Compare',
  blurb:
    'Two compare cards show local vs cloud diffs — select one side and commit to keep it; Run auto-keeps cloud.',
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
    works: ['ps5'],
  },
  tags: ['save', 'compare'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Under reduced motion selection and commit snap without card motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 460,
    height: 420,
    background: 'dark',
    label: 'Save Conflict Compare demo',
  },
}
