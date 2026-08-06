import type { Specimen } from '../../../types'

export const vortexHoldToConfirm: Specimen = {
  id: 'vortex-hold-to-confirm',
  ref: 'SPX-2482',
  title: 'Vortex Hold-to-Confirm',
  blurb:
    'Holding a central core builds three concentric rotating rings; releasing early cancels, holding the full 900ms confirms — original geometry, no copyrighted iconography.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — spinning-core hold interaction',
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
  tags: ['hold', 'confirmation', 'progress'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Manual pointer/keyboard holds still require the full 900ms but skip the rotating ring animation in favour of a static engaged state under prefers-reduced-motion or data-force-reduced-motion; Run/Replay resolve directly to CONFIRMED.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Vortex hold-to-confirm',
  },
}
