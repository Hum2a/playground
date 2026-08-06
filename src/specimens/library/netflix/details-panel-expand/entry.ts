import type { Specimen } from '../types'

export const detailsPanelExpand: Specimen = {
  id: 'details-panel-expand',
  ref: 'SPX-3198',
  title: 'Details Panel Expand',
  blurb:
    'A compact card grows a details panel beneath it in place — description and tags appear without leaving the page. CLOSE returns it to the card.',
  origin: {
    project: 'Original',
    surface: 'Netflix-inspired streaming details panel (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'netflix',
  },
  tags: ['details', 'expand'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'Panel open/close still applies instantly with no transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Details panel expand demo',
  },
}
