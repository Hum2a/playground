import type { Specimen } from '../../../types'
export const quickSettingsTileToggle: Specimen = {
  id: 'quick-settings-tile-toggle',
  ref: 'SPX-1647',
  title: 'Quick Settings Tile Toggle',
  blurb:
    '148×72 Network tile — bounded ripple on press; active backing grows from 40px circle to full tile over 260ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired quick settings tile',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['quick-settings', 'tile', 'state'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, state changes instantly with ≤80ms opacity cue.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',

    label: 'Quick settings tile toggle',
  },

}
