import type { Specimen } from '../types'
export const playPauseGlyphMorph: Specimen = {
  id: 'play-pause-glyph-morph',
  ref: 'SPX-1477',
  title: 'Play/Pause',
  blurb:
    '48×48 control morphs play triangle into pause bars over 180ms/160ms for SIGNAL // 04; label swaps at 50%; compresses to .96 on press.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired playback glyph morph',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['media', 'icon-morph', 'playback'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, instant glyph state swap without morph.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 240,
    height: 180,
    background: 'dark',

    label: 'Play/pause glyph morph',
  },

}
