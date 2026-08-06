import type { Specimen } from '../types'

export const clipToTitleHandoff: Specimen = {
  id: 'clip-to-title-handoff',
  ref: 'SPX-3252',
  title: "Clip-to-Title Handoff",
  blurb: "Clip-to-Title Handoff — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["clips","handoff"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Clip-to-Title Handoff demo" },
}
