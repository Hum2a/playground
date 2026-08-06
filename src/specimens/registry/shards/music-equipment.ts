import type { Specimen } from '../../types'
import { compressorThresholdCrush } from '../../library/music-equipment/compressor-threshold-crush/entry'
import { eqBypassFlatten } from '../../library/music-equipment/eq-bypass-flatten/entry'
import { parametricEqNodeDrag } from '../../library/music-equipment/parametric-eq-node-drag/entry'
import { peakHoldMarker } from '../../library/music-equipment/peak-hold-marker/entry'
import { ledLadderMeter } from '../../library/music-equipment/led-ladder-meter/entry'
import { analogVuNeedle } from '../../library/music-equipment/analog-vu-needle/entry'
import { sceneRecallSweep } from '../../library/music-equipment/scene-recall-sweep/entry'
import { motorisedFaderRecall } from '../../library/music-equipment/motorised-fader-recall/entry'

export const shard: Specimen[] = [
  compressorThresholdCrush,
  eqBypassFlatten,
  parametricEqNodeDrag,
  peakHoldMarker,
  ledLadderMeter,
  analogVuNeedle,
  sceneRecallSweep,
  motorisedFaderRecall,]
