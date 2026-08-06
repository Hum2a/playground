import type { Specimen } from '../../../types'

export const retryToBufferTransition: Specimen = {
  id: 'retry-to-buffer-transition',
  ref: 'SPX-3245',
  title: "Retry-to-Buffer Transition",
  blurb: "Retry-to-Buffer Transition — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["error","buffer"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Retry-to-Buffer Transition demo" },
}
