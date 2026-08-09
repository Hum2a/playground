import type { Specimen } from '../../../types'
export const jaggedSpeechTooltip: Specimen = {
  id: 'jagged-speech-tooltip',
  ref: 'SPX-188',
  title: 'Jagged speech tooltip',
  blurb:
    'Irregular clip-path speech bubble punches outward from a trigger on hover or focus, with a quick overshoot pop and a fast snap-away.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'css-only',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['tooltip', 'popover', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The overshoot pop and quick-snap hide collapse to a plain opacity cross-fade under prefers-reduced-motion or data-force-reduced-motion; the bubble remains fully functional via hover and focus.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 260,
    height: 180,
    background: 'card',
    label: 'Info trigger',
  },
}
