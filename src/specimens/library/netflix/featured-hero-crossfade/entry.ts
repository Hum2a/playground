import type { Specimen } from '../types'

export const featuredHeroCrossfade: Specimen = {
  id: 'featured-hero-crossfade',
  ref: 'SPX-3126',
  title: "Featured Hero Crossfade",
  blurb: "Featured Hero Crossfade — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["hero","crossfade"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Featured Hero Crossfade demo" },
}
