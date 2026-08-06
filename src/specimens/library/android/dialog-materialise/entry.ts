import type { Specimen } from '../../../types'
export const dialogMaterialise: Specimen = {
  id: 'dialog-materialise',
  ref: 'SPX-1775',
  title: 'Dialog Materialise',
  blurb:
    '304×220 confirmation dialog: scrim 180ms; scale .92→1 over 240ms from trigger origin; Confirm runs 700ms working then success before close.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired material dialog',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['dialog', 'modal', 'confirmation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, dialog appears at final scale with opacity-only handoff.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 380,
    background: 'card',

    label: 'Dialog materialise',
  },

}
