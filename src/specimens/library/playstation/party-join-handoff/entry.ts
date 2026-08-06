import type { Specimen } from '../types'

export const partyJoinHandoff: Specimen = {
  id: 'party-join-handoff',
  ref: 'SPX-3402',
  title: 'Party Join Handoff',
  blurb: 'A party card expands into an active voice session state with participant slots.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired UI study — abstract shapes, no official glyphography',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'playstation',
  },
  tags: ["party","social","expand"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Session panel appears instantly; pulse animation removed.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 300,
    background: 'dark',
    label: 'Party join handoff',
  },
}
