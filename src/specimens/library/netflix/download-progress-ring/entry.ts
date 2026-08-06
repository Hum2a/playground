import type { Specimen } from '../../../types'

export const downloadProgressRing: Specimen = {
  id: 'download-progress-ring',
  ref: 'SPX-3258',
  title: "Download Progress Ring",
  blurb: "Download Progress Ring — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["download","progress"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Download Progress Ring demo" },
}
