import type { Specimen } from '../../../types'

export const versusClashCard: Specimen = {
  id: 'versus-clash-card',
  ref: 'SPX-2560',
  title: 'Versus Clash Card',
  blurb:
    'PROFILE A and B slam inward 28px over 220ms, then VS flashes once for a 220ms clash hold.',
  origin: {
    project: 'Original',
    surface: 'Naruto / matchmaking — versus clash',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ["versus","clash","impact"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved Versus Clash Card state appears immediately.',
  },
  acceptance: [
    'Left/right cards travel travelPx 28 toward centre over closeMs 220',
    'VS flash runs once for flashMs 220; status becomes CLASH after',
    'Replay returns cards to ±28px standby before rerunning',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Versus Clash Card',
  },
}
