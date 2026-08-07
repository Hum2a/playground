import type { Specimen } from '../../../types'

export const chakraChargeField: Specimen = {
  id: 'chakra-charge-field',
  ref: 'SPX-2354',
  title: 'Chakra Charge Field',
  blurb:
    'An irregular chakra boundary grows through frozen diameters 72→96→118→140px; release commits, full charge settles READY.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, the field appears READY at the full 140px diameter immediately.',
  },
    acceptance: [
    'Hold charges an irregular boundary through diameters 72→96→118→140px',
    'Release commits current level; full charge settles READY',
    'Run auto-charges to 100% over 620ms then commits 150ms',
    'Replay returns to 0% / idle boundary before rerunning',
    'Reduced motion shows READY at full diameter immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Chakra Charge Field',
  },
}
