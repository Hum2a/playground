import type { Specimen } from '../../../types'

export const missionCompleteStamp: Specimen = {
  id: 'mission-complete-stamp',
  ref: 'SPX-2537',
  title: 'Mission Complete Stamp',
  blurb:
    'A briefing card receives a large original completion seal — the stamp slams down, rings, and settles into COMPLETE.',
  origin: {
    project: 'Original',
    surface: 'Naruto / mission-system — completion feedback',
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
  tags: ['complete', 'stamp', 'briefing'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the stamp appears already settled in the COMPLETE state.',
  },
  acceptance: [
    'Stamp slams with measurable settle angle; ring pulses once',
    'Host briefing card remains readable under stamp',
    'Reduced motion shows settled COMPLETE stamp',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#1a1612;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,300px);min-height:200px;border:1px solid #3a3228;background:#ebe2d0;padding:1.25rem;color:#1a1612;font:700 13px ui-serif,Georgia,serif;">Briefing complete{{specimen}}</div></div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Mission complete stamp',
  },
}
