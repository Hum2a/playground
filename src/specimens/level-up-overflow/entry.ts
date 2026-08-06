import type { Specimen } from '../types'
export const levelUpOverflow: Specimen = {
  id: 'level-up-overflow',
  ref: 'SPX-762',
  title: 'Level Up Overflow',
  blurb:
    'SPECIMEN MASTERY: Level 12 at 87/100 receives +38 XP, fills to 100%, levels to 13, resets, then carries 25 XP into the new bar — threshold crossing without lost progress.',
  origin: {
    project: 'Original',
    surface: 'Pokemon-inspired XP level-up overflow progression',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['progress', 'threshold', 'overflow'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, jumps to Level 13 at 25/100 with optional +38 XP APPLIED — no intermediate fill.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 300,
    background: 'card',

    label: 'Mastery XP overflow (demo)',
  },

}
