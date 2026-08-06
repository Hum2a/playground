import type { Specimen } from '../../../types'
export const permissionRejection: Specimen = {
  id: 'permission-rejection',
  ref: 'SPX-320',
  title: 'Permission Rejection',
  blurb:
    'Restricted OPEN ARCHIVE lunges forward, hits a diagonal red/black barrier, compresses once, recoils, and ACCESS DENIED stamps above — action stays locked.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 graphic print / blocked-action feedback language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['lock', 'impact', 'confirmation', 'slam'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Forward travel, barrier slam, compress, and recoil are skipped under prefers-reduced-motion or data-force-reduced-motion; a static ACCESS DENIED + barrier appear immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'card',

    label: 'Restricted archive card',
  },

}
