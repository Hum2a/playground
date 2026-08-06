import type { Specimen } from '../types'

export const bufferToPlaybackResolve: Specimen = {
  id: 'buffer-to-playback-resolve',
  ref: 'SPX-3192',
  title: "Buffer-to-Playback Resolve",
  blurb: "Buffer-to-Playback Resolve — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["buffer","playback"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Buffer-to-Playback Resolve demo" },
}
