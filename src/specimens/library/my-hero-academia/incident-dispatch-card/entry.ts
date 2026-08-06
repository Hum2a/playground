import type { Specimen } from '../../../types'
export const incidentDispatchCard: Specimen = {
  id: 'incident-dispatch-card',
  ref: 'SPX-2056',
  title: 'Incident Dispatch Card',
  blurb:
    'Calm OPS dashboard is interrupted when a torn incident card slides in from the edge with CRITICAL priority.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia-inspired hero agency dispatch UI',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['dispatch', 'alert', 'dashboard', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, incident card appears in final position immediately; dashboard dims without slide.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'Ops dashboard',
  },

}
