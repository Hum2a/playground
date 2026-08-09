import type { Specimen } from '../../../types'

export const lunarCalendarChange: Specimen = {
  id: 'lunar-calendar-change',
  ref: 'SPX-466',
  title: 'Lunar Calendar Change',
  blurb:
    'JUNE 2026 stays put while demo dates slide and a 64px geometric moon crossfades between crescent, half, and gibbous.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired lunar calendar step',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['lunar', 'calendar', 'phase'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Date and moon update instantly with no slide or crossfade under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 360,
    background: 'dark',
    label: 'Lunar calendar change',
  },
}
