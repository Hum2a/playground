import type { Specimen } from '../../../types'

export const rareTrophyReveal: Specimen = {
  id: 'rare-trophy-reveal',
  ref: 'SPX-3348',
  title: 'Rare Trophy Reveal',
  blurb:
    'A higher-tier achievement unveils through veil, rays, and a gold tier hold — distinct from a compact unlock toast.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'overlay', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['trophy', 'reveal'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the settled gold card appears with no veil/rays/tier motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 360,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Rare trophy reveal',
  },
  acceptance: [
    'Reveal sequence is veil → rays → GOLD tier hold → done (not enter/shine toast).',
    'Striped CONCEALED veil thins before the card appears.',
    'Exactly 6 rays bloom; GOLD badge overshoots and holds for 360ms.',
    'Reduced motion shows the settled gold card with no veil/rays/tier motion.',
  ],
}
