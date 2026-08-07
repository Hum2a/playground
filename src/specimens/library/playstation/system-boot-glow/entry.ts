import type { Specimen } from '../../../types'

export const systemBootGlow: Specimen = {
  id: 'system-boot-glow',
  ref: 'SPX-3325',
  title: 'System Boot Glow',
  blurb:
    'Dark → glow at 55% → settle at 100% → READY: multi-phase boot luminance with frozen stops.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'transition', tech: 'tiny-js', scope: 'fullscreen', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['boot', 'glow'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, glow and READY UI snap with no travel.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'System boot glow',
  },
}
