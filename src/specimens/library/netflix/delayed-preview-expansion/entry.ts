import type { Specimen } from '../types'

export const delayedPreviewExpansion: Specimen = {
  id: 'delayed-preview-expansion',
  ref: 'SPX-3145',
  title: "Delayed Preview Expansion",
  blurb: "Delayed Preview Expansion — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["preview","dwell"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Delayed Preview Expansion demo" },
}
