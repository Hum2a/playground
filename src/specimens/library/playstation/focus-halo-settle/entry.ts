import type { Specimen } from '../../../types'

export const focusHaloSettle: Specimen = {
  id: 'focus-halo-settle',
  ref: 'SPX-3373',
  title: 'Focus Halo Settle',
  blurb:
    'A soft bloom focus halo catches up to the newly selected tile and settles with spring overshoot.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['focus', 'halo'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the halo snaps to the target with no spring overshoot.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 280,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Focus halo settle',
  },
  acceptance: [
    'Halo travels to the clicked tile over 420ms with spring overshoot then settles.',
    'Halo shows soft outer bloom and inset glow on the focused tile.',
    'Three tiles cycle focus on click.',
    'Reduced motion snaps the halo with no overshoot transition.',
  ],
}
