import type { Specimen } from '../../../types'
export const connectionSevered: Specimen = {
  id: 'connection-severed',
  ref: 'SPX-323',
  title: 'Connection Severed',
  blurb:
    'An irregular angular tether joins Archive to Portfolio; disconnect tensions it, snaps the centre into three fragments, and recoils both halves into independent UNLINKED cards.',
  origin: {
    project: 'Original',
    surface: 'Graphic unlink / relationship sever interaction',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  tags: ['disconnect', 'unlink', 'relationship'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Tension, snap, fragments, and recoil are skipped under prefers-reduced-motion or data-force-reduced-motion; the tether disappears immediately and UNLINKED labels appear.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 320,
    background: 'dark',

    label: 'Linked entities',
  },

}
