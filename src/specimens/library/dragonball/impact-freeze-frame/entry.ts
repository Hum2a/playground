import type { Specimen } from '../../../types'
export const impactFreezeFrame: Specimen = {
  id: 'impact-freeze-frame',
  ref: 'SPX-1087',
  title: 'Impact Freeze Frame',
  blurb:
    'A COMMIT token strikes a change target, holds an exact 80ms hit-stop with static impact wedges, then settles into APPLIED.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired hit-stop / impact freeze feedback',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['impact', 'feedback', 'hit-stop'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, EXECUTE immediately shows APPLIED with no travel or hit-stop.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'dark',

    label: 'Impact freeze demo',
  },

}
