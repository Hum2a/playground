import type { Specimen } from '../../../types'

export const backNavigationReturn: Specimen = {
  id: 'back-navigation-return',
  ref: 'SPX-3268',
  title: "Back Navigation Return",
  blurb: "Back Navigation Return — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["navigation","back"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Back Navigation Return demo" },
}
