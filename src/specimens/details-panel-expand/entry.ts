import type { Specimen } from '../types'

export const detailsPanelExpand: Specimen = {
  id: 'details-panel-expand',
  ref: 'SPX-3198',
  title: 'Details Panel Expand',
  blurb: "A compact card opens a details panel without navigating away — CLOSE returns to the compact rail state.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["details","expand"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Motion transitions are skipped; semantic end states remain available.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: 'Details Panel Expand demo' },
}
