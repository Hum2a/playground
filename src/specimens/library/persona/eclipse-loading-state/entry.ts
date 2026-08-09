import type { Specimen } from '../../../types'

export const eclipseLoadingState: Specimen = {
  id: 'eclipse-loading-state',
  ref: 'SPX-464',
  title: 'Eclipse Loading State',
  blurb:
    'A 120px eclipse loader whose moon travels across a luminous ring, peaking the corona at centre beside a static LOADING label.',
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
  tags: ['loading', 'lunar', 'eclipse'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Moon stops centred over a visible ring with static LOADING under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 300,
    background: 'dark',
    label: 'Eclipse loading state',
  },
}
