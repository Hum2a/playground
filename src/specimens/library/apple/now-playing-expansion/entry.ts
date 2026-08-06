import type { Specimen } from '../../../types'
export const nowPlayingExpansion: Specimen = {
  id: 'now-playing-expansion',
  ref: 'SPX-1478',
  title: 'Now Playing Expansion',
  blurb:
    'NIGHT SIGNAL compact strip at 300×56 expands to 360×260 over 360ms; progress 01:42 persists; controls reveal prev, play, next, then volume.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired now playing expansion',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['media', 'compact-to-rich', 'playback'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate compact/expanded swap.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 300,
    background: 'dark',

    label: 'Now playing expansion',
  },

}
