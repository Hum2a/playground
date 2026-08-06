import type { Specimen } from '../../types'
import { quantizeSweep } from '../../library/music-equipment/quantize-sweep/entry'
import { crossfadeOverlap } from '../../library/music-equipment/crossfade-overlap/entry'
import { waveformTrimHandles } from '../../library/music-equipment/waveform-trim-handles/entry'
import { loopBraceClamp } from '../../library/music-equipment/loop-brace-clamp/entry'
import { transportPlayEngage } from '../../library/music-equipment/transport-play-engage/entry'
import { autoGainScan } from '../../library/music-equipment/auto-gain-scan/entry'
import { recordingWaveformGrow } from '../../library/music-equipment/recording-waveform-grow/entry'
import { strobeTunerLock } from '../../library/music-equipment/strobe-tuner-lock/entry'
import { needleTunerCentre } from '../../library/music-equipment/needle-tuner-centre/entry'
import { tubeWarmUp } from '../../library/music-equipment/tube-warm-up/entry'
import { tapeSplice } from '../../library/music-equipment/tape-splice/entry'
import { tapeThreadRoute } from '../../library/music-equipment/tape-thread-route/entry'
import { reelSpinUp } from '../../library/music-equipment/reel-spin-up/entry'
import { rackUnitPowerOn } from '../../library/music-equipment/rack-unit-power-on/entry'
import { noiseGateOpen } from '../../library/music-equipment/noise-gate-open/entry'
import { gainReductionSlam } from '../../library/music-equipment/gain-reduction-slam/entry'
import { spectrogramWaterfall } from '../../library/music-equipment/spectrogram-waterfall/entry'
import { oscilloscopeTrace } from '../../library/music-equipment/oscilloscope-trace/entry'
import { spectrumBarDance } from '../../library/music-equipment/spectrum-bar-dance/entry'
import { feedbackLoopWarning } from '../../library/music-equipment/feedback-loop-warning/entry'
import { loopRecordRing } from '../../library/music-equipment/loop-record-ring/entry'
import { tapTempoPulse } from '../../library/music-equipment/tap-tempo-pulse/entry'
import { loopRegionClamp } from '../../library/music-equipment/loop-region-clamp/entry'
import { beatgridLock } from '../../library/music-equipment/beatgrid-lock/entry'
import { scrollingDjWaveform } from '../../library/music-equipment/scrolling-dj-waveform/entry'
import { crossfaderBlend } from '../../library/music-equipment/crossfader-blend/entry'
import { deckSyncLock } from '../../library/music-equipment/deck-sync-lock/entry'
import { scratchRecoil } from '../../library/music-equipment/scratch-recoil/entry'
import { vinylSpinUp } from '../../library/music-equipment/vinyl-spin-up/entry'
import { signalFlowPulse } from '../../library/music-equipment/signal-flow-pulse/entry'
import { patchCableConnect } from '../../library/music-equipment/patch-cable-connect/entry'
import { clockDividerCascade } from '../../library/music-equipment/clock-divider-cascade/entry'
import { envelopeGeneratorCycle } from '../../library/music-equipment/envelope-generator-cycle/entry'
import { sampleSliceMarkers } from '../../library/music-equipment/sample-slice-markers/entry'
import { velocityPadHit } from '../../library/music-equipment/velocity-pad-hit/entry'
import { swingOffset } from '../../library/music-equipment/swing-offset/entry'
import { 16StepSequencerChase } from '../../library/music-equipment/16-step-sequencer-chase/entry'
import { arpeggiatorStepChase } from '../../library/music-equipment/arpeggiator-step-chase/entry'
import { oscillatorWaveMorph } from '../../library/music-equipment/oscillator-wave-morph/entry'
import { pedalboardSignalChain } from '../../library/music-equipment/pedalboard-signal-chain/entry'
import { stompSwitchPress } from '../../library/music-equipment/stomp-switch-press/entry'
import { compressorThresholdCrush } from '../../library/music-equipment/compressor-threshold-crush/entry'
import { eqBypassFlatten } from '../../library/music-equipment/eq-bypass-flatten/entry'
import { parametricEqNodeDrag } from '../../library/music-equipment/parametric-eq-node-drag/entry'
import { peakHoldMarker } from '../../library/music-equipment/peak-hold-marker/entry'
import { ledLadderMeter } from '../../library/music-equipment/led-ladder-meter/entry'
import { analogVuNeedle } from '../../library/music-equipment/analog-vu-needle/entry'
import { sceneRecallSweep } from '../../library/music-equipment/scene-recall-sweep/entry'
import { motorisedFaderRecall } from '../../library/music-equipment/motorised-fader-recall/entry'

export const shard: Specimen[] = [
  quantizeSweep,
  crossfadeOverlap,
  waveformTrimHandles,
  loopBraceClamp,
  transportPlayEngage,
  autoGainScan,
  recordingWaveformGrow,
  strobeTunerLock,
  needleTunerCentre,
  tubeWarmUp,
  tapeSplice,
  tapeThreadRoute,
  reelSpinUp,
  rackUnitPowerOn,
  noiseGateOpen,
  gainReductionSlam,
  spectrogramWaterfall,
  oscilloscopeTrace,
  spectrumBarDance,
  feedbackLoopWarning,
  loopRecordRing,
  tapTempoPulse,
  loopRegionClamp,
  beatgridLock,
  scrollingDjWaveform,
  crossfaderBlend,
  deckSyncLock,
  scratchRecoil,
  vinylSpinUp,
  signalFlowPulse,
  patchCableConnect,
  clockDividerCascade,
  envelopeGeneratorCycle,
  sampleSliceMarkers,
  velocityPadHit,
  swingOffset,
  16StepSequencerChase,
  arpeggiatorStepChase,
  oscillatorWaveMorph,
  pedalboardSignalChain,
  stompSwitchPress,
  compressorThresholdCrush,
  eqBypassFlatten,
  parametricEqNodeDrag,
  peakHoldMarker,
  ledLadderMeter,
  analogVuNeedle,
  sceneRecallSweep,
  motorisedFaderRecall,]
