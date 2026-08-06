import type { Specimen } from '../../../types'

export const scrubPreviewThumbnail: Specimen = {
  id: 'scrub-preview-thumbnail',
  ref: 'SPX-3170',
  title: 'Scrub Preview Thumbnail',
  blurb:
    'Dragging the timeline handle reveals a preview thumbnail anchored above the current position, labelled with the time at that point.',
  origin: {
    project: 'Original',
    surface: 'Netflix-inspired streaming timeline scrub (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'netflix',
  },
  tags: ['scrub', 'timeline'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Thumbnail show/hide still occurs on the same triggers with the opacity transition removed.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 260,
    background: 'dark',
    label: 'Scrub preview thumbnail demo',
  },
}
