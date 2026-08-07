import type { Specimen } from '../../../types'

export const backNavigationRestore: Specimen = {
  id: 'back-navigation-restore',
  ref: 'SPX-3377',
  title: 'Back Navigation Restore',
  blurb:
    'Returning from details restores the exact previous focus index and DOM focus in the list.',
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
  tags: ['navigation', 'focus', 'restore'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, focus ring transitions are killed; index restore remains instant.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 300,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0B0F14;padding:12px;">{{specimen}}</div>',
    label: 'Back navigation restore',
  },
  acceptance: [
    'Clicking tile N opens details for that item and stores index N.',
    'BACK returns to list with data-focus-index still N and that tile is-focused.',
    'BACK moves DOM focus onto the restored tile.',
    'Status announces the restored index; reduced motion snaps focus ring with no transition.',
  ],
}
