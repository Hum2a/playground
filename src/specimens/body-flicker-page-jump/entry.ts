import type { Specimen } from '../types'

export const bodyFlickerPageJump: Specimen = {
  id: 'body-flicker-page-jump',
  ref: 'SPX-2409',
  title: 'Body Flicker Page Jump',
  blurb: 'Page content streaks away and resolves as a new view.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved state appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Body Flicker Page Jump',
  },
}
