import type { Specimen } from '../types'

export const thumbRatingFeedback: Specimen = {
  id: 'thumb-rating-feedback',
  ref: 'SPX-3215',
  title: "Thumb Rating Feedback",
  blurb: "Thumb Rating Feedback — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["rating","feedback"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Thumb Rating Feedback demo" },
}
