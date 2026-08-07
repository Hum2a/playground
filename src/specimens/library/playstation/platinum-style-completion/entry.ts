import type { Specimen } from '../../../types'

export const platinumStyleCompletion: Specimen = {
  id: 'platinum-style-completion',
  ref: 'SPX-3352',
  title: 'Platinum-Style Completion',
  blurb:
    'Unlocking the final achievement collapses the trophy collection into an unmistakable master completion emblem.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'graphic' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['trophy', 'completion'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the master emblem appears with no collapse/transform animation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Platinum-style completion',
  },
  acceptance: [
    'Starts at 4 of 5 earned with one empty final slot.',
    'Unlocking the final slot collapses the collection and reveals MASTER COMPLETE.',
    'Master emblem shows four geometric shapes replacing the slot grid.',
    'Reduced motion jumps to master with no collapse/transform animation.',
  ],
}
