import type { Specimen } from '../types'

export const verticalClipSnap: Specimen = {
  id: 'vertical-clip-snap',
  ref: 'SPX-3251',
  title: "Vertical Clip Snap",
  blurb: "Vertical Clip Snap — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["clips","snap"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Vertical Clip Snap demo" },
}
