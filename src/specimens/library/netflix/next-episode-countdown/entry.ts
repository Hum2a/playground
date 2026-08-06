import type { Specimen } from '../../../types'

export const nextEpisodeCountdown: Specimen = {
  id: 'next-episode-countdown',
  ref: 'SPX-3184',
  title: 'Next Episode Countdown',
  blurb:
    'A next-up card counts down 5 to 0 with a filling ring, then hands off to the next episode automatically — CANCEL stops it and restores the end-state.',
  origin: {
    project: 'Original',
    surface: 'Netflix-inspired streaming next-up hand-off (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'netflix',
  },
  tags: ['next-up', 'countdown'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Same countdown/hand-off/cancel states occur with the dismiss transition removed.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Next episode countdown demo',
  },
}
