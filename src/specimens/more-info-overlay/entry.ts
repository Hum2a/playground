import type { Specimen } from '../types'

export const moreInfoOverlay: Specimen = {
  id: 'more-info-overlay',
  ref: 'SPX-3199',
  title: "More Info Overlay",
  blurb: "More Info Overlay — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["details","info"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "More Info Overlay demo" },
}
