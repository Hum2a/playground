import type { Specimen } from '../types'
export const blueFlameButtonHover: Specimen = {
  id: 'blue-flame-button-hover',
  ref: 'SPX-521',
  title: 'Blue Flame Button Hover',
  blurb:
    'Five graphic blue energy polygons rise from the upper edge of a static OPEN RECORD button on hover and focus, with a 3px label shift and a brightened lower edge.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired blue energy feedback',
  },
  facets: {
    kind: 'interaction',
    tech: 'css-only',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['hover', 'energy'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Hover/focus shows the five settled energy shapes immediately with no entrance animation and no loop under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 240,
    background: 'dark',

    label: 'Blue flame button',
  },

}
