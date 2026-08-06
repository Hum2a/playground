import type { Specimen } from '../types'
export const comicPanelScrollReveal: Specimen = {
  id: 'comic-panel-scroll-reveal',
  ref: 'SPX-212',
  title: 'Comic Panel Scroll Reveal',
  blurb:
    'Internal scroll container where opposing irregular comic panels tear apart once each section hits ~35% visibility.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['comic', 'reveal', 'clip-path'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Covers are not shown under prefers-reduced-motion or data-force-reduced-motion; all section content is immediately readable with no IntersectionObserver reveal path.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 400,
    background: 'dark',

    label: 'Comic panel scroll reveal',
  },

}
