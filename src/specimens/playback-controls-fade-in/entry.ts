import type { Specimen } from '../types'

export const playbackControlsFadeIn: Specimen = {
  id: 'playback-controls-fade-in',
  ref: 'SPX-3161',
  title: 'Playback Controls Fade-In',
  blurb: "Pointer or keyboard activity reveals playback controls over content; after a frozen idle window they dissolve.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["playback","controls"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Motion transitions are skipped; semantic end states remain available.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: 'Playback Controls Fade-In demo' },
}
