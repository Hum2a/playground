import type { Specimen } from '../../../types'
export const butterflySuccessState: Specimen = {
  id: 'butterfly-success-state',
  ref: 'SPX-518',
  title: 'Butterfly Success State',
  blurb:
    'Four geometric wing pieces and a narrow body assemble into one abstract butterfly, open briefly, then depart upward to leave a calm COMPLETE status with Record saved.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Velvet Room–inspired ephemeral success',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['completion', 'ephemeral'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Assembly, wing open, and departure are skipped; static COMPLETE with Record saved. appears immediately under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',

    label: 'Butterfly success demo',
  },

}
