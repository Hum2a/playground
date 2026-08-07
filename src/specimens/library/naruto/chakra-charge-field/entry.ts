import type { Specimen } from '../../../types'

export const chakraChargeField: Specimen = {
  id: 'chakra-charge-field',
  ref: 'SPX-2354',
  title: 'Chakra Charge Field',
  blurb: 'Hold fills an irregular energy boundary; release commits the charge.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['charge'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, jump to the final static outcome with no intermediate motion.',
  },
  acceptance: [
    'Boundary grows through frozen diameters to READY',
    'Growth is irregular not a linear bar only',
    'Reduced motion shows resolved READY immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Chakra Charge Field',
  },
}
