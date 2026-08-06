import type { Specimen } from '../types'

export const keyboardFocusExpansion: Specimen = {
  id: 'keyboard-focus-expansion',
  ref: 'SPX-3150',
  title: "Keyboard Focus Expansion",
  blurb: "Keyboard Focus Expansion — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["preview","keyboard"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Keyboard Focus Expansion demo" },
}
