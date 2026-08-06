export type PreviewBackground = 'card' | 'page' | 'grid' | 'dark'

export type ReducedMotionMode = 'off' | 'prefers' | 'force'

export type PlaybackRate = 0 | 0.25 | 0.5 | 1 | 2

export type ViewportPreset = 320 | 360 | 768 | 'full'

export interface HarnessControls {
  viewport: ViewportPreset
  background: PreviewBackground
  reducedMotion: ReducedMotionMode
  playbackRate: PlaybackRate
}

export const DEFAULT_CONTROLS: HarnessControls = {
  viewport: 360,
  background: 'card',
  reducedMotion: 'off',
  playbackRate: 1,
}

export interface ComposeSrcDocInput {
  html: string
  css: string
  js?: string
  background: PreviewBackground
  forceReducedMotion?: boolean
  emulatePrefersReducedMotion?: boolean
  scaffold?: string
}
