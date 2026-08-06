import type { Specimen } from '../../../types'

export const sealReleaseSequence: Specimen = {
  id: 'seal-release-sequence',
  ref: 'SPX-2376',
  title: 'Seal Release Sequence',
  blurb:
    'Three concentric rings disengage outward in stagger, and the locked-glyph core crossfades to an open glyph as the seal unlocks.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction fūinjutsu study — concentric seal release',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['seal', 'unlock', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all three rings appear already disengaged and the core shows the open glyph immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 320,
    background: 'dark',
    label: 'Seal release sequence',
  },
}
