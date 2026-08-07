import type { Specimen } from '../../../types'

export const mangaPanelExpandFocus: Specimen = {
  id: 'manga-panel-expand-focus',
  ref: 'SPX-4071',
  title: 'Panel Expand Focus',
  blurb:
    'Four equal manga panels replate so the selected frame grows to ~68% while the other three compress into a visible 32% stack.',
  origin: {
    project: 'Original',
    surface: 'Manga panel hierarchy as interactive drill-down',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: { franchise: 'manga' },
  tags: ['panels', 'hierarchy', 'replate', 'focus'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, panel geometry snaps with no animated transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620,
    height: 400,
    background: 'page',
    scaffold:
      '<div style="width:620px;height:400px;overflow:hidden;margin:0 auto">{{specimen}}</div>',
    label: 'Manga panel expand focus',
  },
  integration: [
    'Copy the wrapper, four panel buttons, CSS, and tiny selection script.',
    'Replace placeholder copy while retaining four panel containers and data-panel indices.',
    'Preserve is-active / aria-pressed / data-active / data-layout semantics.',
    'Preserve click and native Enter/Space keyboard activation on the panels.',
    'Preserve both reduced-motion overrides (media query and data-force-reduced-motion).',
  ],
  acceptance: [
    'One and only one panel is active at a time.',
    'Selecting each panel causes that exact panel to dominate (~68%).',
    'Secondary panels remain visible in the ~32% region.',
    'Keyboard activation (Enter/Space) promotes the focused panel.',
    'Content never leaves the 620×400 overflow:hidden preview boundary.',
    'Reduced motion performs an immediate layout state change.',
  ],
}
