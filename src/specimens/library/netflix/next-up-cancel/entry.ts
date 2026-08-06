import type { Specimen } from '../../../types'

export const nextUpCancel: Specimen = {
  id: 'next-up-cancel',
  ref: 'SPX-3185',
  title: "Next-Up Cancel",
  blurb: "Next-Up Cancel — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["next-up","cancel"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Next-Up Cancel demo" },
}
