import type { Specimen } from '../../types'
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
