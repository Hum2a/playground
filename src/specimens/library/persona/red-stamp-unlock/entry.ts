import type { Specimen } from '../../../types'
export const redStampUnlock: Specimen = {
  id: 'red-stamp-unlock',
  ref: 'SPX-030',
  title: 'Red stamp unlock',
  blurb:
    'Hand-struck red ink ring stamp smashes onto a locked surface at a steep angle, overshoots, recoils, and settles crooked.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['unlock', 'stamp', 'ink', 'status'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Slam, ink halo, and particles are skipped under prefers-reduced-motion or data-force-reduced-motion; the settled stamp at -8deg appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',
    label: 'Locked module card',
  },
}
