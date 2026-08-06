import type { Specimen } from '../../../types'

export const playbackErrorTakeover: Specimen = {
  id: 'playback-error-takeover',
  ref: 'SPX-3244',
  title: "Playback Error Takeover",
  blurb: "Playback Error Takeover — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["error","playback"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Playback Error Takeover demo" },
}
