import type { Specimen } from '../../../types'

export const downloadCompleteMorph: Specimen = {
  id: 'download-complete-morph',
  ref: 'SPX-3259',
  title: "Download Complete Morph",
  blurb: "Download Complete Morph — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["download","complete"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Download Complete Morph demo" },
}
