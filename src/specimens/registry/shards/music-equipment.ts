import type { Specimen } from '../../types'
import { ledLadderMeter } from '../../library/music-equipment/led-ladder-meter/entry'
import { analogVuNeedle } from '../../library/music-equipment/analog-vu-needle/entry'
import { sceneRecallSweep } from '../../library/music-equipment/scene-recall-sweep/entry'
import { motorisedFaderRecall } from '../../library/music-equipment/motorised-fader-recall/entry'

export const shard: Specimen[] = [
  ledLadderMeter,
  analogVuNeedle,
  sceneRecallSweep,
  motorisedFaderRecall,]
