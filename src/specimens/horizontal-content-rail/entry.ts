import type { Specimen } from '../types'

export const horizontalContentRail: Specimen = {
  id: 'horizontal-content-rail',
  ref: 'SPX-3134',
  title: 'Horizontal Content Rail',
  blurb: "A row of cards moves by one viewport group with clear directional continuity — PREV/NEXT pages three titles at a time.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["rail","carousel"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Motion transitions are skipped; semantic end states remain available.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: 'Horizontal Content Rail demo' },
}
