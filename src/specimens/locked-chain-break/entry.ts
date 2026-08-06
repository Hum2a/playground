import type { Specimen } from '../types'
export const lockedChainBreak: Specimen = {
  id: 'locked-chain-break',
  ref: 'SPX-314',
  title: 'Locked Chain Break',
  blurb:
    'Seven angular graphic chain links hold a restricted card shut; on grant, the centre fractures and the segments recoil to reveal the chapter.',
  origin: {
    project: 'Original',
    surface: 'Persona 5–inspired aggressive graphic unlock language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['unlock', 'locked', 'reveal'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Tension, fracture, and recoil are skipped under prefers-reduced-motion or data-force-reduced-motion; the chain hides immediately and the unlocked chapter remains.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 320,
    background: 'dark',

    label: 'Locked chapter card',
  },

}
