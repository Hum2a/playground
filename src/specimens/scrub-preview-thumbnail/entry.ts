import type { Specimen } from '../types'

export const scrubPreviewThumbnail: Specimen = {
  id: 'scrub-preview-thumbnail',
  ref: 'SPX-3170',
  title: 'Scrub Preview Thumbnail',
  blurb: "Dragging the progress handle reveals a preview card anchored to the current time along the timeline.",
  origin: { project: 'Original', surface: 'Streaming UI / Netflix-inspired interaction' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'netflix' },
  tags: ["scrub","timeline"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Motion transitions are skipped; semantic end states remain available.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: { width: 440, height: 300, background: 'dark', label: 'Scrub Preview Thumbnail demo' },
}
