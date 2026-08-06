import type { Specimen } from '../../../types'

export const fireballCommit: Specimen = {
  id: 'fireball-commit',
  ref: 'SPX-2444',
  title: 'Fireball Commit',
  blurb:
    'A compact charge grows at a source node, launches across a track, and impacts a target to confirm — abstract graphic fire, no copyrighted iconography.',
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
  tags: ['commit', 'projectile', 'confirmation'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the target resolves directly to CONFIRMED with no charge/launch/impact choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Fireball commit',
  },
}
