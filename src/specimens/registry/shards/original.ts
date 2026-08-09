import type { Specimen } from '../../types'
import { blinkSelection } from '../../library/original/blink-selection/entry'
import { clockHandWipe } from '../../library/original/clock-hand-wipe/entry'
import { connectionSevered } from '../../library/original/connection-severed/entry'
import { deletionGuillotine } from '../../library/original/deletion-guillotine/entry'
import { enhancedStateReversion } from '../../library/original/enhanced-state-reversion/entry'
import { instantFullRecovery } from '../../library/original/instant-full-recovery/entry'
import { jrpgCommandWheelFan } from '../../library/original/jrpg-command-wheel-fan/entry'
import { jrpgTargetMenuAcquire } from '../../library/original/jrpg-target-menu-acquire/entry'
import { jrpgTurnOrderAssemble } from '../../library/original/jrpg-turn-order-assemble/entry'
import { timeSkip } from '../../library/original/time-skip/entry'

export const shard: Specimen[] = [
  blinkSelection,
  clockHandWipe,
  connectionSevered,
  deletionGuillotine,
  enhancedStateReversion,
  instantFullRecovery,
  jrpgCommandWheelFan,
  jrpgTargetMenuAcquire,
  jrpgTurnOrderAssemble,
  timeSkip,
]
