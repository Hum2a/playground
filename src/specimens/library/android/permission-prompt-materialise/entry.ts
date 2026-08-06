import type { Specimen } from '../../../types'
export const permissionPromptMaterialise: Specimen = {
  id: 'permission-prompt-materialise',
  ref: 'SPX-1842',
  title: 'Permission Prompt Materialise',
  blurb:
    '320×250 decision surface over 0.28 scrim — scale 0.94→1 in 220ms; While using / Only this time / Don\'t allow; denial snackbar.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired permission prompt materialise',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['permission', 'modal', 'system-surface'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, prompt appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 390,
    height: 360,
    background: 'dark',

    label: 'Permission prompt materialise',
  },

}
