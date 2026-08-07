import type { Specimen } from '../../../types'

export const fourPointBarrierConstruct: Specimen = {
  id: 'four-point-barrier-construct',
  ref: 'SPX-2522',
  title: 'Four-Point Barrier Construct',
  blurb:
    'Four seal corners latch, edges draw (160ms each), then the field fills (180ms) into SECURED.',
  origin: {
    project: 'Original',
    surface: 'Naruto / barrier interfaces — four-point construct',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ["barrier","construct","ward"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the barrier appears SECURED immediately.',
  },
    acceptance: [
    'Corners activate at frozen coords [{"x":30,"y":30},{"x":170,"y":30},{"x":170,"y":170},{"x":30,"y":170}]',
    'Edges draw edge-by-edge over edgeMs 160, then fillMs 180',
    'Seal lacquer palette; stroke draw not opacity-only',
    'Replay clears edges/fill before rerunning',
    'Reduced motion shows SECURED immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0c0806;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,260px);min-height:180px;border:1px solid #5a5048;background:#140e0c;padding:1rem;color:#f4f1e8;font:600 12px ui-sans-serif,system-ui,sans-serif;">Protected zone{{specimen}}</div></div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Four-Point Barrier Construct',
  },
}
