import type { Specimen } from '../../../types'

export const missionScrollUnroll: Specimen = {
  id: 'mission-scroll-unroll',
  ref: 'SPX-2365',
  title: 'Mission Scroll Unroll',
  blurb:
    'A rolled parchment expands from 16px to 190px between caps, then four briefing lines unclip in a 70ms stagger into BRIEFED.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction mission-briefing language — scroll reveal',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['scroll', 'reveal', 'briefing'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the scroll appears fully unrolled at 190px with all four briefing lines visible immediately.',
  },
  acceptance: [
    'Idle body height is 16px (rolled); done body height is 190px (open)',
    'Unroll expands height over 480ms before line unclip starts at 280ms',
    'Exactly four briefing lines unclip with 70ms stagger into BRIEFED',
    'Replay collapses to 16px then re-runs',
    'Reduced motion shows 190px open scroll with all lines immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 340,
    background: 'dark',
    label: 'Mission scroll unroll',
  },
}
