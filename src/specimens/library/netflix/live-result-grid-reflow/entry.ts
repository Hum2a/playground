import type { Specimen } from '../../../types'

export const liveResultGridReflow: Specimen = {
  id: 'live-result-grid-reflow',
  ref: 'SPX-3207',
  title: "Live Result Grid Reflow",
  blurb: "Live Result Grid Reflow — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["search","grid"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Live Result Grid Reflow demo" },
}
