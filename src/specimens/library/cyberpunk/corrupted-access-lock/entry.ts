import type { Specimen } from '../../../types'
export const corruptedAccessLock: Specimen = {
  id: 'corrupted-access-lock',
  ref: 'SPX-009',
  title: 'Corrupted Access Lock',
  blurb:
    'CSS-only locked-card overlay with ACCESS // DENIED, chromatic offsets, and brief glitch bursts every 3.4s over dimmed restricted material.',
  origin: {
    project: 'Original',
    surface: 'Cyberpunk-inspired malfunction / glitch lock language',
  },
  facets: {
    kind: 'overlay',
    tech: 'css-only',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'cyberpunk',
  },
  tags: ['glitch', 'lock', 'scanline'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Glitch bursts and scanline drift stop under prefers-reduced-motion or data-force-reduced-motion; the static ACCESS DENIED veil remains readable.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 240,
    background: 'card',

    label: 'Locked module card',
  },

}
