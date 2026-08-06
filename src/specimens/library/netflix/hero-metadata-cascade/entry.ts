import type { Specimen } from '../../../types'

export const heroMetadataCascade: Specimen = {
  id: 'hero-metadata-cascade',
  ref: 'SPX-3127',
  title: "Hero Metadata Cascade",
  blurb: "Hero Metadata Cascade — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["hero","stagger"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Hero Metadata Cascade demo" },
}
