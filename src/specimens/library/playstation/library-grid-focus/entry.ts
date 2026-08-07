import type { Specimen } from '../../../types'

export const libraryGridFocus: Specimen = {
  id: 'library-grid-focus',
  ref: 'SPX-3394',
  title: 'Library Grid Focus',
  blurb:
    'Focus moves through a dense 4×3 library grid with frozen travel and controller-readable emphasis.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired UI study — abstract shapes, no official glyphography',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['grid', 'focus', 'library'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, focus scale and ring snap with no transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0B0F14;padding:12px;">{{specimen}}</div>',
    label: 'Library grid focus',
  },
  acceptance: [
    'Arrow controls move focus within a 4×3 dense library grid.',
    'Focused tile scales to 1.06 with a blue ring within 180ms travel.',
    'Status reports the current row and column.',
    'Reduced motion snaps focus with no tile transition.',
  ],
}
