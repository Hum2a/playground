import type { Specimen } from '../../../types'

export const playbackControlsFadeIn: Specimen = {
  id: 'playback-controls-fade-in',
  ref: 'SPX-3161',
  title: 'Playback Controls Fade-In',
  blurb:
    'Pointer, focus, or a SHOW CONTROLS button reveal playback controls over an abstract player surface; 900ms of inactivity dissolves them again.',
  origin: {
    project: 'Original',
    surface: 'Netflix-inspired streaming playback chrome (abstract)',
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
  tags: ['playback', 'controls'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Show/hide states still apply on the same triggers and timer with no transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 480,
    height: 300,
    background: 'dark',
    label: 'Playback controls fade-in demo',
  },
}
