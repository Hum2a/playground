import type { Specimen } from '../../../types'

export const checkboxImpact: Specimen = {
  id: 'checkbox-impact',
  ref: 'SPX-147',
  title: 'Checkbox Impact',
  blurb:
    'A native checkbox hits a hard offset backing; the cyan checkmark draws in, expands once, and settles.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired editorial form control',
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
  tags: ['form', 'checkbox', 'impact'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Checked and unchecked states snap immediately with no draw or scale under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 240,
    background: 'dark',
    label: 'Checkbox impact',
  },
}
