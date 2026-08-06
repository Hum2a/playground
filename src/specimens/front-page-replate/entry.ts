import type { Specimen } from '../types'

export const frontPageReplate: Specimen = {
  id: 'front-page-replate',
  ref: 'SPX-3524',
  title: 'Front Page Replate',
  blurb: 'An original editorial motion primitive for front page replate.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['editorial', 'replate'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Front Page Replate' },
}
