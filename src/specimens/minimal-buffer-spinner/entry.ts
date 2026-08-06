import type { Specimen } from '../types'

export const minimalBufferSpinner: Specimen = {
  id: 'minimal-buffer-spinner',
  ref: 'SPX-3191',
  title: "Minimal Buffer Spinner",
  blurb: "Minimal Buffer Spinner — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["buffer","spinner"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Minimal Buffer Spinner demo" },
}
