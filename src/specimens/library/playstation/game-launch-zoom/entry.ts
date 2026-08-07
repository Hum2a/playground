import type { Specimen } from '../../../types'

export const gameLaunchZoom: Specimen = {
  id: 'game-launch-zoom',
  ref: 'SPX-3332',
  title: 'Game Launch Zoom',
  blurb:
    'Selected tile expands spatially (box geometry, 640ms) into the viewport and hands off to a launch READY surface.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'transition', tech: 'tiny-js', scope: 'fullscreen', intensity: 'graphic' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['launch', 'zoom'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, tile and launch-layer transitions are removed; READY appears instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Game launch zoom',
  },
}
