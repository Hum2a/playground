import type { Specimen } from '../../../types'

export const fireballCommit: Specimen = {
  id: 'fireball-commit',
  ref: 'SPX-2444',
  title: 'Fireball Commit',
  blurb:
    'Four embers charge a compact orb at the source (380ms), it launches 216px across the track (220ms), then impacts to confirm — progressive fire commit, no copyrighted iconography.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — fire-style commit gestures',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['commit', 'projectile', 'confirmation', 'ember'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the target resolves directly to CONFIRMED with no ember/charge/launch/impact choreography.',
  },
  acceptance: [
    'Ember charge (4 sparks, 380ms) precedes launch',
    'Orb travels 216px then impact flash before CONFIRMED',
    'Reduced motion shows CONFIRMED immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Fireball commit',
  },
}
