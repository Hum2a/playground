import type { Specimen } from '../types'
export const delayedDamageBar: Specimen = {
  id: 'delayed-damage-bar',
  ref: 'SPX-760',
  title: 'Delayed Damage Bar',
  blurb:
    'SYSTEM HEALTH drops 164→96: the primary bar and number move first, a warm trailing layer holds at 82% then catches up to 48% — Pokemon-inspired resource feedback without game assets.',
  origin: {
    project: 'Original',
    surface: 'Pokemon-inspired HP damage drain / trailing resource feedback',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['resource', 'damage', 'feedback'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, fill and trail jump to 48% with 96/200 immediately — no trail hold or impact.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'card',

    label: 'System health damage bar (demo)',
  },

}
