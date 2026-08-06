import type { Specimen } from '../types'

export const bingeContinuationTransition: Specimen = {
  id: 'binge-continuation-transition',
  ref: 'SPX-3190',
  title: "Binge Continuation Transition",
  blurb: "Binge Continuation Transition — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["binge","transition"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Binge Continuation Transition demo" },
}
