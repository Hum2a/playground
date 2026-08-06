import type { Specimen } from '../types'

export const directionalFocusTravel: Specimen = {
  id: 'directional-focus-travel',
  ref: 'SPX-3265',
  title: "Directional Focus Travel",
  blurb: "Directional Focus Travel — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["tv","focus"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Directional Focus Travel demo" },
}
