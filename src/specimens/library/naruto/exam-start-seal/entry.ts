import type { Specimen } from '../../../types'

export const examStartSeal: Specimen = {
  id: 'exam-start-seal',
  ref: 'SPX-2551',
  title: 'Exam Start Seal',
  blurb:
    'A locked exam panel unlocks when the seal crack-strokes and splits into flying halves — then the timer activates.',
  origin: {
    project: 'Original',
    surface: 'Naruto / chunin-exam-inspired-testing — gated activation',
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
  tags: ['exam', 'seal', 'gate', 'break'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the panel appears already unlocked and active with no seal break.',
  },
  acceptance: [
    'Crack stroke 160ms then halves fly to frozen offsets',
    'ACTIVE surface + timer after seal break',
    'Reduced motion shows unlocked surface immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Exam start seal',
  },
}
