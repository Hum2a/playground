import type { Specimen } from '../../../types'

export const timelineHoverPreview: Specimen = {
  id: 'timeline-hover-preview',
  ref: 'SPX-3171',
  title: "Timeline Hover Preview",
  blurb: "Timeline Hover Preview — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["timeline","preview"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Timeline Hover Preview demo" },
}
