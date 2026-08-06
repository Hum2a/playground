import type { Specimen } from '../../../types'

export const sectionFlagDrop: Specimen = {
  id: 'section-flag-drop',
  ref: 'SPX-3533',
  title: 'Section Flag Drop',
  blurb: 'An original editorial motion primitive for section flag drop.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'roll'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Section Flag Drop' },
}
