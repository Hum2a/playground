import type { Specimen } from '../../types'
import { commandWheelFan } from '../../library/final-fantasy/command-wheel-fan/entry'
import { experienceBarFill } from '../../library/final-fantasy/experience-bar-fill/entry'
import { gilCounterRoll } from '../../library/final-fantasy/gil-counter-roll/entry'
import { spellCircleDraw } from '../../library/final-fantasy/spell-circle-draw/entry'
import { targetMenuAcquire } from '../../library/final-fantasy/target-menu-acquire/entry'
import { turnOrderAssemble } from '../../library/final-fantasy/turn-order-assemble/entry'
import { victoryResultsTally } from '../../library/final-fantasy/victory-results-tally/entry'

export const shard: Specimen[] = [
  commandWheelFan,
  targetMenuAcquire,
  turnOrderAssemble,
  gilCounterRoll,
  experienceBarFill,
  spellCircleDraw,
  victoryResultsTally,
]
