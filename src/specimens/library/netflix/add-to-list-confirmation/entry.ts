import type { Specimen } from '../types'

export const addToListConfirmation: Specimen = {
  id: 'add-to-list-confirmation',
  ref: 'SPX-3220',
  title: "Add-to-List Confirmation",
  blurb: "Add-to-List Confirmation — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["list","confirm"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Add-to-List Confirmation demo" },
}
