import type { Specimen } from '../../../types'

export const searchFieldExpand: Specimen = {
  id: 'search-field-expand',
  ref: 'SPX-3206',
  title: "Search Field Expand",
  blurb: "Search Field Expand — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["search","expand"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Search Field Expand demo" },
}
