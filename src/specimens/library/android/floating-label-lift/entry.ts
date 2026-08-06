import type { Specimen } from '../../../types'
export const floatingLabelLift: Specimen = {
  id: 'floating-label-lift',
  ref: 'SPX-1727',
  title: 'Floating Label Lift',
  blurb:
    '300×58 outlined field: label lifts to y=-7px with 12px type and surface patch on focus or value; 180ms border emphasis; error text below.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired outlined text field',
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
  tags: ['textfield', 'focus', 'form'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, label position changes instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 340,
    height: 240,
    background: 'card',

    label: 'Floating label lift',
  },

}
