import type { Specimen } from '../../../types'

export const gadgetDeployment: Specimen = {
  id: 'gadget-deployment',
  ref: 'SPX-2088',
  title: 'Gadget Deployment',
  blurb:
    'A stowed GRAPPLE tile unfolds into FIRE/REEL controls with a READY status panel.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired support equipment UI',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['gadget', 'deploy', 'controls'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Deployed panel appears immediately without unfold animation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'Gadget deployment',
  },

}
