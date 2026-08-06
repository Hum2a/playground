import type { Specimen } from '../../../types'
export const androidDragProxyFormation: Specimen = {
  id: 'android-drag-proxy-formation',
  ref: 'SPX-1897',
  title: 'Drag Proxy Formation',
  blurb:
    '300×92 FIELD NOTES row condenses to 156×48 proxy after 7px drag; 92px placeholder; INBOX/LOCKED targets; invalid drop returns in 220ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired drag proxy condensation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['drag-drop', 'proxy', 'ownership'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, proxy formation and return happen instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 380,
    background: 'card',

    label: 'Android drag proxy formation',
  },

}
