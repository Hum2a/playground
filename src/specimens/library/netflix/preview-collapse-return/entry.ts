import type { Specimen } from '../types'

export const previewCollapseReturn: Specimen = {
  id: 'preview-collapse-return',
  ref: 'SPX-3149',
  title: 'Preview Collapse Return',
  blurb:
    'An expanded rail card collapses back to exactly its original slot transform on RETURN — no residual offset, scale, or shadow left behind.',
  origin: {
    project: 'Original',
    surface: 'Netflix-inspired streaming rail preview collapse (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'netflix',
  },
  tags: ['preview', 'collapse'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Expand/return states still apply instantly with no transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 480,
    height: 260,
    background: 'dark',
    label: 'Preview collapse return demo',
  },
}
