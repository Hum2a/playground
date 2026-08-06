import type { Specimen } from '../../../types'

export const examStartSeal: Specimen = {
  id: 'exam-start-seal',
  ref: 'SPX-2551',
  title: 'Exam Start Seal',
  blurb:
    'A test interface stays locked behind a central seal until it snaps open — the timer and question state then activate.',
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
  tags: ['exam', 'seal', 'gate'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the panel appears already unlocked and active.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Exam start seal',
  },
}
