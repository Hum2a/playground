import type { Specimen } from '../../../types'
export const criticalWeaknessHit: Specimen = {
  id: 'critical-weakness-hit',
  ref: 'SPX-489',
  title: 'Critical Weakness Hit',
  blurb:
    'Short exploit feedback: MEMORY compresses, four blue corner lines attack, the plate splits into three offset layers, then WEAKNESS yields to RESOLVED under one cut.',
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
  tags: ['impact', 'confirmation', 'hud'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, RESOLVED appears immediately with no compress/attack/split/cut.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 300,
    background: 'dark',

    label: 'Critical weakness hit',
  },

}
