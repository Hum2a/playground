import type { Specimen } from '../types'
export const hoverCutout: Specimen = {
  id: 'hover-cutout',
  ref: 'SPX-068',
  title: 'Hover Cutout',
  blurb:
    'Hover/focus expands an oversized irregular black mass behind each action; a paper aperture punches through so the label reads as negative-space cutout, with a delayed red shard.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 extreme black/white negative-space language',
  },
  facets: {
    kind: 'interaction',
    tech: 'css-only',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['hover', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Mass travel is skipped under prefers-reduced-motion or data-force-reduced-motion; idle and final cutout compositions switch immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',

    label: 'Action list',
  },

}
