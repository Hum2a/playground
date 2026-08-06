import type { Specimen } from '../../../types'

export const bodyFlickerPageJump: Specimen = {
  id: 'body-flicker-page-jump',
  ref: 'SPX-2409',
  title: 'Body Flicker Page Jump',
  blurb:
    'The current view flickers into compressed directional streaks, then hands off abruptly to a new destination view.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — body flicker & high-speed navigation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['navigation', 'streak', 'handoff'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the destination view appears immediately with no streaks.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Body flicker page jump',
  },
}
