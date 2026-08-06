import type { Specimen } from '../../../types'
export const keepOutTapeMarquee: Specimen = {
  id: 'keep-out-tape-marquee',
  ref: 'SPX-3028',
  title: 'KEEP OUT Tape Marquee',
  blurb:
    'Diagonal yellow-and-black KEEP OUT tape crosses a host card with a seamless moving warning marquee.',
  origin: {
    project: 'Original',
    surface: 'Persona 4–inspired yellow / black graphic language',
  },
  facets: {
    kind: 'overlay',
    tech: 'css-only',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['tape', 'marquee', 'hazard', 'keep-out'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Marquee stops under prefers-reduced-motion or data-force-reduced-motion; static tape stays visible.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 240,
    background: 'card',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:200px;border:1px solid #E8E8E8;border-radius:2px;background:#F7F3E8;"><div style="padding:1rem;font:600 0.85rem/1.2 system-ui,sans-serif;color:#101010;">Restricted zone</div><span class="sr-only" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">Keep out</span>{{specimen}}</div>',
    label: 'KEEP OUT tape',
  },
}
