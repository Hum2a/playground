import type {
  HarnessControls,
  PlaybackRate,
  PreviewBackground,
  ReducedMotionMode,
  ViewportPreset,
} from './types'
import './control-strip.css'

interface ControlStripProps {
  value: HarnessControls
  onChange: (next: HarnessControls) => void
  onRestart: () => void
}

const VIEWPORTS: { value: ViewportPreset; label: string }[] = [
  { value: 320, label: '320' },
  { value: 360, label: '360' },
  { value: 768, label: '768' },
  { value: 'full', label: 'Full' },
]

const BACKGROUNDS: PreviewBackground[] = ['card', 'page', 'grid', 'dark']

const REDUCED: { value: ReducedMotionMode; label: string }[] = [
  { value: 'off', label: 'Off' },
  { value: 'prefers', label: 'Prefers' },
  { value: 'force', label: 'Force' },
]

const RATES: { value: PlaybackRate; label: string }[] = [
  { value: 0, label: 'Pause' },
  { value: 0.25, label: '0.25×' },
  { value: 0.5, label: '0.5×' },
  { value: 1, label: '1×' },
  { value: 2, label: '2×' },
]

export function ControlStrip({ value, onChange, onRestart }: ControlStripProps) {
  return (
    <div className="control-strip" role="group" aria-label="Preview controls">
      <fieldset className="control-strip__group">
        <legend className="control-strip__legend">Viewport</legend>
        <div className="control-strip__options">
          {VIEWPORTS.map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              className="control-strip__btn"
              aria-pressed={value.viewport === opt.value}
              onClick={() => onChange({ ...value, viewport: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="control-strip__group">
        <legend className="control-strip__legend">Background</legend>
        <div className="control-strip__options">
          {BACKGROUNDS.map((bg) => (
            <button
              key={bg}
              type="button"
              className="control-strip__btn"
              aria-pressed={value.background === bg}
              onClick={() => onChange({ ...value, background: bg })}
            >
              {bg}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="control-strip__group">
        <legend className="control-strip__legend">Reduced motion</legend>
        <div className="control-strip__options">
          {REDUCED.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className="control-strip__btn"
              aria-pressed={value.reducedMotion === opt.value}
              onClick={() => onChange({ ...value, reducedMotion: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="control-strip__group">
        <legend className="control-strip__legend">Playback</legend>
        <div className="control-strip__options">
          {RATES.map((opt) => (
            <button
              key={opt.label}
              type="button"
              className="control-strip__btn"
              aria-pressed={value.playbackRate === opt.value}
              onClick={() => onChange({ ...value, playbackRate: opt.value })}
            >
              {opt.label}
            </button>
          ))}
          <button type="button" className="control-strip__btn" onClick={onRestart}>
            Restart
          </button>
        </div>
      </fieldset>
    </div>
  )
}
