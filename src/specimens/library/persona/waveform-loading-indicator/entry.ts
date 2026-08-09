import type { Specimen } from '../../../types'

export const waveformLoadingIndicator: Specimen = {
  id: 'waveform-loading-indicator',
  ref: 'SPX-413',
  title: 'Waveform Loading Indicator',
  blurb:
    'A cool cyan signal trace continuously crosses a quiet technical field, with a scanline passing over its 32 fixed waveform samples.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 Reload–inspired tactical loading indicator',
  },
  facets: {
    kind: 'loop',
    tech: 'css-only',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: { franchise: 'persona', works: ['persona-3-reload'] },
  tags: ['loading', 'waveform', 'scanline'],
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The trace and cyan scanline settle into a clearly visible static waveform under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 620,
    height: 300,
    background: 'dark',
    label: 'Waveform loading indicator',
  },
}
