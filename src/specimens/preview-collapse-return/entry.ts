import type { Specimen } from '../types'

export const previewCollapseReturn: Specimen = {
  id: 'preview-collapse-return',
  ref: 'SPX-3149',
  title: 'Preview Collapse Return',
  blurb: "Expanded content returns exactly to its rail slot without layout residue — expand then RETURN settles on the origin geometry.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["preview","collapse"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Motion transitions are skipped; semantic end states remain available.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: 'Preview Collapse Return demo' },
}
