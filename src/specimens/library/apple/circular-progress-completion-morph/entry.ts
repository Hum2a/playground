import type { Specimen } from '../../../types'
export const circularProgressCompletionMorph: Specimen = {
  id: 'circular-progress-completion-morph',
  ref: 'SPX-1523',
  title: 'Progress Ring Completion Morph',
  blurb:
    'EXPORT ring progresses 0→100% through fixed steps, holds, then morphs stroke geometry into a completion check — no icon swap.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired progress completion morph',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['progress', 'morph', 'completion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, final completion geometry appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 280,
    height: 320,
    background: 'dark',

    label: 'Progress ring completion morph',
  },

}
