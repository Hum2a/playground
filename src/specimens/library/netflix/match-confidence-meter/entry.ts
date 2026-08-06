import type { Specimen } from '../../../types'

export const matchConfidenceMeter: Specimen = {
  id: 'match-confidence-meter',
  ref: 'SPX-3214',
  title: "Match Confidence Meter",
  blurb: "Match Confidence Meter — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["match","meter"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Match Confidence Meter demo" },
}
