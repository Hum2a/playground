import type { Specimen } from '../../../types'
export const buttonLoadingMorph: Specimen = {
  id: 'button-loading-morph',
  ref: 'SPX-1714',
  title: 'Button Loading Morph',
  blurb:
    '160×48 Save changes: label fades in 80ms; 20px arc rotates 900ms; check morph 180ms; Saved dwell 1200ms — width never changes.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired button progress state',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['button', 'progress', 'state'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, static arc fills over 900ms with no rotation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 220,
    height: 180,
    background: 'card',

    label: 'Button loading morph',
  },

}
