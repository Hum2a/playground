import type { Specimen } from '../types'
export const multiItemDragStack: Specimen = {
  id: 'multi-item-drag-stack',
  ref: 'SPX-1452',
  title: 'Multi-Item Drag Stack',
  blurb:
    'Four selected files A.MD–D.JSON condense into 108×58 stack with offsets 4/8/12, badge 4, formation 45ms stagger; drop absorbs at 35ms stagger.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired multi-item drag aggregation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios'],
  },
  tags: ['drag', 'aggregation', 'stack'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, create final four-item stack immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'Multi-item drag stack',
  },

}
