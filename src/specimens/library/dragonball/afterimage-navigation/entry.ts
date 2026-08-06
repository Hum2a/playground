import type { Specimen } from '../../../types'
export const afterimageNavigation: Specimen = {
  id: 'afterimage-navigation',
  ref: 'SPX-1100',
  title: 'Afterimage Navigation',
  blurb:
    'ACTIVE marker jumps HOME→SHIP in four rapid hops, leaving exactly four outline afterimages and path ticks that clean up to a locked SHIP marker.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired afterimage / high-speed movement language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['navigation', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, SHIP is selected immediately with static path ticks and no afterimages.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 460,
    height: 340,
    background: 'dark',

    label: 'Afterimage navigation jump',
  },

}
