import type { Specimen } from '../types'

export const previewStartCrossfade: Specimen = {
  id: 'preview-start-crossfade',
  ref: 'SPX-3154',
  title: "Preview Start Crossfade",
  blurb: "Preview Start Crossfade — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["preview","crossfade"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Preview Start Crossfade demo" },
}
