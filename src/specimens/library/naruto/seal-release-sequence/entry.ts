import type { Specimen } from '../../../types'

export const sealReleaseSequence: Specimen = {
  id: 'seal-release-sequence',
  ref: 'SPX-2376',
  title: 'Seal Release Sequence',
  blurb:
    'Three concentric rings expand outward on a 0/120/240ms stagger, then the locked glyph snaps open last.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction fūinjutsu study — concentric seal release',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['seal', 'unlock', 'stagger', 'disengage'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, all three rings appear already expanded and the core shows the open glyph immediately.',
  },
  acceptance: [
    'Three rings at radii 46/34/22 disengage outer→inner on staggerMs [0,120,240] expanding to ×1.38/1.32/1.26',
    'Disengage is scale + stroke-dash break (not opacity fade); open glyph latches last after glyphMs 160',
    'Replay clears data-disengaged before rerunning; reduced motion shows UNLOCKED expanded immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 320,
    background: 'dark',
    label: 'Seal release sequence',
  },
}
