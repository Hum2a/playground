import type { Specimen } from '../../../types'

export const glassTabSwitcher: Specimen = {
  id: 'glass-tab-switcher',
  ref: 'SPX-431',
  title: 'Glass Tab Switcher',
  blurb:
    'Three compact tabs sit on a dark glass rail; a translucent indicator glides between their panels while keyboard navigation keeps the active destination explicit.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired glass navigation control',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['glass', 'tabs', 'navigation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The active glass indicator and panel content change immediately under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 260,
    background: 'dark',
    label: 'Glass tab switcher',
  },
}
