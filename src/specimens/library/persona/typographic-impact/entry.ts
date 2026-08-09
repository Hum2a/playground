import type { Specimen } from '../../../types'
export const typographicImpact: Specimen = {
  id: 'typographic-impact',
  ref: 'SPX-040',
  title: 'Typographic impact',
  blurb:
    'Oversized headline word slams in behind a readable callout, trailed by a misregistered red ghost duplicate.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['typography', 'emphasis', 'slam', 'misprint'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The slam and crush animations are skipped under prefers-reduced-motion or data-force-reduced-motion; the settled composition (giant word at -2deg, ghost offset 6px/4px, foreground callout visible) appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 260,
    background: 'card',
    label: 'Threat metric card',
  },
}
