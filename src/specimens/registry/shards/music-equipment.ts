import type { Specimen } from '../../types'
import { analogVuNeedle } from '../../library/music-equipment/analog-vu-needle/entry'
import { sceneRecallSweep } from '../../library/music-equipment/scene-recall-sweep/entry'
import { motorisedFaderRecall } from '../../library/music-equipment/motorised-fader-recall/entry'

export const shard: Specimen[] = [
  analogVuNeedle,
  sceneRecallSweep,
  motorisedFaderRecall,]
