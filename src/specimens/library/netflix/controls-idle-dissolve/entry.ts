import type { Specimen } from '../types'

export const controlsIdleDissolve: Specimen = {
  id: 'controls-idle-dissolve',
  ref: 'SPX-3168',
  title: "Controls Idle Dissolve",
  blurb: "Controls Idle Dissolve — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["playback","controls"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Controls Idle Dissolve demo" },
}
