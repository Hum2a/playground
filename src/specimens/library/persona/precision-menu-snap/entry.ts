import type { Specimen } from '../../../types'
export const precisionMenuSnap: Specimen = {
  id: 'precision-menu-snap',
  ref: 'SPX-006',
  title: 'Precision Menu Snap',
  blurb:
    'Angled command menu where changing selection snaps into alignment — targeting lines re-aim, the plate punches out, and a cyan accent locks with a short recoil.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Reload–inspired precision menu language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3-reload'],
  },
  tags: ['menu', 'hud', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Snap travel is skipped under prefers-reduced-motion or data-force-reduced-motion; selected plate geometry, corners, and accent line appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 300,
    background: 'dark',

    label: 'Precision menu selection',
  },


}
