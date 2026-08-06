import type { Specimen } from '../types'
export const impactFrameSlam: Specimen = {
  id: 'impact-frame-slam',
  ref: 'SPX-1975',
  title: 'Impact Frame Slam',
  blurb:
    'A halftone impact flash and angular slam swap STANDBY to ALERT inside a clipped comic panel with corner wedges.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired impact-frame / action feedback language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['impact', 'comic', 'feedback'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, ALERT appears immediately with static wedges and no flash or slam.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',

    label: 'Impact frame slam',
  },
  integration: [
    'Mount inside a relative overflow-hidden host (~400×280).',
    'Import demo.css verbatim; freeze flash 90ms, slam 500ms, settle 280ms.',
    'Wire runImpactFrameSlam / resetImpactFrameSlam / replayImpactFrameSlam.',
    'Impact overlay must clip to stage; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Run triggers flash → slam → ALERT end state deterministically',
    'STANDBY and ALERT are visually distinct; final ALERT readable',
    'Effect clips to specimen stage; no external resources',
    'Replay resets to STANDBY before rerunning',
    'Reduced motion shows ALERT immediately without flash or translation',
    'Palette uses #38A3FF / #101820 / #F4F7FA / #FF4D35',
  ],
}
