import type { Specimen } from '../types'

export const rankChangeSlide: Specimen = {
  id: 'rank-change-slide',
  ref: 'SPX-3233',
  title: "Rank Change Slide",
  blurb: "Rank Change Slide — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["rank","slide"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Rank Change Slide demo" },
}
