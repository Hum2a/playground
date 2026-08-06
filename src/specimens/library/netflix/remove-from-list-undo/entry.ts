import type { Specimen } from '../../../types'

export const removeFromListUndo: Specimen = {
  id: 'remove-from-list-undo',
  ref: 'SPX-3221',
  title: "Remove-from-List Undo",
  blurb: "Remove-from-List Undo — Netflix-inspired streaming UI motion specimen.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["list","undo"],
  deps: 'none',
  motion: { loops: false, respectsReducedMotion: true, reducedMotionNote: 'Transitions skipped; end states remain.' },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: "Remove-from-List Undo demo" },
}
