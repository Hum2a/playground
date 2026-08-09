import type { Specimen } from '../../../types'

export const textareaPaperExpansion: Specimen = {
  id: 'textarea-paper-expansion',
  ref: 'SPX-149',
  title: 'Textarea Paper Expansion',
  blurb:
    'A MESSAGE textarea unfolds like stacked paper on focus, and stays tall after blur if it still holds text.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired editorial form surface',
  },
  facets: {
    kind: 'interaction',
    tech: 'css-only',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['form', 'textarea', 'paper'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Expand and collapse snap instantly; all three paper layers stay visible under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Textarea paper expansion',
  },
}
