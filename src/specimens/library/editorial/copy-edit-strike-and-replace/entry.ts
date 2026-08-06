import type { Specimen } from '../../../types'

export const copyEditStrikeAndReplace: Specimen = {
  id: 'copy-edit-strike-and-replace',
  ref: 'SPX-3586',
  title: 'Copy Edit Strike-and-Replace',
  blurb: 'An original editorial motion primitive for copy edit strike-and-replace.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'edit'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Copy Edit Strike-and-Replace' },
}
