import type { Specimen } from '../../../types'

export const systemBootGlow: Specimen = {
  id: 'system-boot-glow',
  ref: 'SPX-3325',
  title: 'System Boot Glow',
  blurb: 'A dark surface develops a restrained blue-white glow before the main UI resolves to READY.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'transition', tech: 'tiny-js', scope: 'fullscreen', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation' },
  tags: ["boot","glow"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'READY UI shown immediately without glow build.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'dark',
    scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'System boot glow',
  },
}
