import type { Specimen } from '../../../types'
export const copyConfirmationMorph: Specimen = {
  id: 'copy-confirmation-morph',
  ref: 'SPX-1549',
  title: 'Copy Confirmation Morph',
  blurb:
    '72×32 COPY control compresses copy outlines into a check, clips to COPIED for 900ms, then morphs back — no clipboard API.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired copy confirmation microinteraction',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['copy', 'morph', 'confirmation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, labels swap without geometric morph; 900ms dwell retained.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 280,
    height: 160,
    background: 'dark',

    label: 'Copy confirmation morph',
  },

}
