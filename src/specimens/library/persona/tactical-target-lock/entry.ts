import type { Specimen } from '../../../types'
export const tacticalTargetLock: Specimen = {
  id: 'tactical-target-lock',
  ref: 'SPX-480',
  title: 'Tactical Target Lock',
  blurb:
    'Four angular targeting brackets attack inward from outside a candidate card, overshoot once, settle, then snap a LOCKED marker — with outward release when switching targets.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Reload–inspired tactical UI language',
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
  tags: ['selection', 'targeting', 'focus'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, brackets and LOCKED appear immediately around the selected target with no attack/guide choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 300,
    background: 'dark',

    label: 'Tactical target lock',
  },

}
