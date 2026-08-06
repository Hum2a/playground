import type { Specimen } from '../types'
export const comicPanelWipe: Specimen = {
  id: 'comic-panel-wipe',
  ref: 'SPX-002',
  title: 'Comic panel wipe',
  blurb:
    'Five irregular clipped panels slam across the viewport, cover for a content swap, then tear away in non-mirrored exits.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired graphic transition language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['comic', 'wipe'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Sweeping panel sequence is skipped under prefers-reduced-motion or data-force-reduced-motion; a brief static cover (or immediate swap) still hides the content change.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Page transition demo',
  },

}
