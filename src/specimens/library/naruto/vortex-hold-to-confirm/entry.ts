import type { Specimen } from '../../../types'

export const vortexHoldToConfirm: Specimen = {
  id: 'vortex-hold-to-confirm',
  ref: 'SPX-2482',
  title: 'Vortex Hold-to-Confirm',
  blurb:
    'Hold the 108px core for 900ms to build three concentric rings; release early cancels in 200ms — vortex confirm gate, no copyrighted iconography.',
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
  tags: ['hold', 'confirmation', 'progress', 'cancel'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, ring spin is disabled; manual holds still require 900ms, while Run/Replay resolve directly to CONFIRMED.',
  },
  acceptance: [
    'Early release before 900ms never confirms (200ms cancel)',
    'Full hold builds 3 rings then CONFIRMED (180ms pulse)',
    'Reduced motion keeps 900ms manual threshold; Run auto-confirms',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Vortex hold-to-confirm',
  },
}
