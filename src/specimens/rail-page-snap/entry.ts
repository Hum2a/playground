import type { Specimen } from '../types'

export const railPageSnap: Specimen = {
  id: 'rail-page-snap',
  ref: 'SPX-3136',
  title: 'Rail Page Snap',
  blurb: "A multi-card row translates to the next group and settles on exact card boundaries — no fractional overhang after snap.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["rail","snap"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Motion transitions are skipped; semantic end states remain available.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: 'Rail Page Snap demo' },
}
