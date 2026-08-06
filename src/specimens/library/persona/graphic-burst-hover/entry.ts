import type { Specimen } from '../../../types'
export const graphicBurstHover: Specimen = {
  id: 'graphic-burst-hover',
  ref: 'SPX-023',
  title: 'Graphic Burst Hover',
  blurb:
    'Angular graphic shards burst outward behind a restrained CTA on hover and focus, with a red offset backing and a stable interactive target.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 explosive graphic emphasis language',
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
  tags: ['hover', 'burst', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Shard travel is skipped under prefers-reduced-motion or data-force-reduced-motion; the final burst composition appears and disappears immediately with hover/focus.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 240,
    background: 'card',

    label: 'Portfolio CTA',
  },

}
