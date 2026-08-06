import type { Specimen } from '../../../types'
export const crossDeviceCursorHandoff: Specimen = {
  id: 'cross-device-cursor-handoff',
  ref: 'SPX-1497',
  title: 'Cross-Device',
  blurb:
    'Pointer approaches right edge at y 62%; clips over last 4px; reappears after 45ms on adjacent display; two boundary ticks 120ms; continues 120px without traversing 36px gap.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired cross-surface pointer handoff',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['pointer', 'boundary', 'continuity'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, pointer transfers directly across boundary without travel animation.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 220,
    background: 'dark',

    label: 'Cross-device cursor handoff',
  },

}
