import type { Specimen } from '../types'

export const broadsheetPageTurn: Specimen = {
  id: 'broadsheet-page-turn',
  ref: 'SPX-3567',
  title: 'Broadsheet Page Turn',
  blurb: 'An original editorial motion primitive for broadsheet page turn.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'ticker'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Broadsheet Page Turn' },
}
