import type { Specimen } from '../types'

export const networkLostOverlay: Specimen = {
  id: 'network-lost-overlay',
  ref: 'SPX-3246',
  title: "Network Lost Overlay",
  blurb: "Network Lost Overlay — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["network","offline"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Network Lost Overlay demo" },
}
