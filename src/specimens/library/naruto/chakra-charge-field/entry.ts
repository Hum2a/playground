import type { Specimen } from '../../../types'

export const chakraChargeField: Specimen = {
  id: 'chakra-charge-field',
  ref: 'SPX-2354',
  title: 'Chakra Charge Field',
  blurb:
    'An irregular chakra boundary grows through frozen diameters 72→96→118→140px into READY.',
  origin: {
    project: 'Original',
    surface: 'Naruto / chakra training — charge field',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ["charge","hold","field"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the field appears READY at 140px immediately.',
  },
    acceptance: [
    'Boundary grows through frozen diameters 72→96→118→140px (data-step)',
    'Each step takes stepMs 140; final READY with readyHoldMs 180',
    'Motion language is width/height growth, not opacity fade',
    'Replay resets to 72px idle before rerunning',
    'Reduced motion shows READY at 140px immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Chakra Charge Field',
  },
}
