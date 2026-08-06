import type { Specimen } from '../types'
export const monochromeBattleSlideIn: Specimen = {
  id: 'monochrome-battle-slide-in',
  ref: 'SPX-855',
  title: 'Monochrome Battle Slide-In',
  blurb:
    'Four-tone Gen I–inspired confrontation: pixel bands interrupt SEARCHING, then abstract LOCAL and REMOTE entities step in from opposite sides — right leading — before ground chunks and labels lock a static face-off.',
  origin: {
    project: 'Original',
    surface: 'Pokémon Gen I / Game Boy battle spatial language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['retro', 'confrontation', 'arrival'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the final LOCAL vs REMOTE confrontation appears immediately with no bands or stepped slide-ins.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',

    label: 'Monochrome battle slide-in',
  },

}
