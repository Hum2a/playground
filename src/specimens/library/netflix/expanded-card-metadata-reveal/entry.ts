import type { Specimen } from '../../../types'

export const expandedCardMetadataReveal: Specimen = {
  id: 'expanded-card-metadata-reveal',
  ref: 'SPX-3146',
  title: "Expanded Card Metadata Reveal",
  blurb: "Expanded Card Metadata Reveal — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["preview","metadata"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Expanded Card Metadata Reveal demo" },
}
