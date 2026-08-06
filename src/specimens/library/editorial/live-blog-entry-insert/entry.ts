import type { Specimen } from '../types'

export const liveBlogEntryInsert: Specimen = {
  id: 'live-blog-entry-insert',
  ref: 'SPX-3623',
  title: 'Live Blog Entry Insert',
  blurb: 'An original editorial motion primitive for live blog entry insert.',
  origin: { project: 'Original', surface: 'Newspaper & editorial interface language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'editorial' },
  tags: ['newspaper', 'replate'],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Reduced motion resolves directly to the final editorial state.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 360, height: 280, background: 'card', label: 'Live Blog Entry Insert' },
}
