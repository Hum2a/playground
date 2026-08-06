import type { Specimen } from '../../../types'
export const shapeMorphButtonToCard: Specimen = {
  id: 'shape-morph-button-to-card',
  ref: 'SPX-1880',
  title: 'Shape Morph Button-to-Card',
  blurb:
    'Details pill (132×48) morphs into a 320×220 card in one container; radius 24→30px over 360ms; content after 140ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired shape morph container transform',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['shape-morph', 'container', 'material-you'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, shape and content swap immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',

    label: 'Shape morph button-to-card',
  },

}
