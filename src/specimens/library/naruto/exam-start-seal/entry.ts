import type { Specimen } from '../../../types'

export const examStartSeal: Specimen = {
  id: 'exam-start-seal',
  ref: 'SPX-2551',
  title: 'Exam Start Seal',
  blurb:
    'A locked exam surface stays dark until the central seal cracks and halves split ±42px — then the timer and panel go ACTIVE.',
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
  acceptance: [
    'Unlock phases: crack 160ms → split ±42px over 260ms → activate 180ms',
    'Seal halves translate/rotate apart (not opacity fade); timer starts on ACTIVE only',
    'Reduced motion shows unlocked ACTIVE surface immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Exam start seal',
  },
}
