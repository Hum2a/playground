import type { Specimen } from '../../../types'

export const lunarCycleLoader: Specimen = {
  id: 'lunar-cycle-loader',
  ref: 'SPX-457',
  title: 'Lunar Cycle Loader',
  blurb:
    'A compact loader whose moon cycles new through full and back, with a static LOADING label and a quiet mute orbit.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired lunar loading indicator',
  },
  facets: {
    kind: 'loop',
    tech: 'css-only',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['loading', 'lunar', 'phase'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Shade freezes at last quarter with the orbit and LOADING label visible under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 300,
    background: 'dark',
    label: 'Lunar cycle loader',
  },
}
