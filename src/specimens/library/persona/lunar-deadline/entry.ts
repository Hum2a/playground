import type { Specimen } from '../../../types'

export const lunarDeadline: Specimen = {
  id: 'lunar-deadline',
  ref: 'SPX-462',
  title: 'Lunar Deadline',
  blurb:
    'A four-phase deadline moon that wanes from full to new as remaining phases drop, with urgency that strengthens without flashing.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired lunar deadline language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['lunar', 'deadline', 'phase'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Phase, remaining count, and urgency snap immediately under prefers-reduced-motion or data-force-reduced-motion; no 620ms illumination tween.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620,
    height: 340,
    background: 'dark',
    label: 'Lunar deadline',
  },
}
