import type { Specimen } from '../../../types'
export const universalClipboardTransfer: Specimen = {
  id: 'universal-clipboard-transfer',
  ref: 'SPX-1494',
  title: 'Universal Clipboard Transfer',
  blurb:
    'BUILD-184 token 96×34 lifts 8px from DESKTOP; six-dot corridor; 70ms absence gap; reconstructs at TABLET caret; status PASTED.',
  origin: {
    project: 'Original',
    surface: 'Apple-inspired universal clipboard handoff',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['clipboard', 'cross-device', 'handoff'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate copied/pasted state.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 500,
    height: 220,
    background: 'dark',

    label: 'Universal clipboard transfer',
  },

}
