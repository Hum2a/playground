import type { Specimen } from '../../types'
import { achievementEncounter } from '../../library/pokemon/achievement-encounter/entry'
import { badgeCaseInsert } from '../../library/pokemon/badge-case-insert/entry'
import { badgeEarned } from '../../library/pokemon/badge-earned/entry'
import { branchEvolutionChoice } from '../../library/pokemon/branch-evolution-choice/entry'
import { captureBreakout } from '../../library/pokemon/capture-breakout/entry'
import { captureShake } from '../../library/pokemon/capture-shake/entry'
import { criticalCapture } from '../../library/pokemon/critical-capture/entry'
import { delayedDamageBar } from '../../library/pokemon/delayed-damage-bar/entry'
import { entryRegistration } from '../../library/pokemon/entry-registration/entry'
import { evolutionComplete } from '../../library/pokemon/evolution-complete/entry'
import { evolutionSilhouetteTransformation } from '../../library/pokemon/evolution-silhouette-transformation/entry'
import { forgetAMove } from '../../library/pokemon/forget-a-move/entry'
import { itemObtained } from '../../library/pokemon/item-obtained/entry'
import { levelUpOverflow } from '../../library/pokemon/level-up-overflow/entry'
import { linkTradeTransfer } from '../../library/pokemon/link-trade-transfer/entry'
import { monochromeBattleSlideIn } from '../../library/pokemon/monochrome-battle-slide-in/entry'
import { moveLearned } from '../../library/pokemon/move-learned/entry'
import { pixelHpDrain } from '../../library/pokemon/pixel-hp-drain/entry'
import { radarPulseDiscovery } from '../../library/pokemon/radar-pulse-discovery/entry'
import { wildEncounterTransition } from '../../library/pokemon/wild-encounter-transition/entry'

export const shard: Specimen[] = [
  achievementEncounter,
  badgeCaseInsert,
  badgeEarned,
  branchEvolutionChoice,
  captureBreakout,
  captureShake,
  criticalCapture,
  delayedDamageBar,
  entryRegistration,
  evolutionComplete,
  evolutionSilhouetteTransformation,
  forgetAMove,
  itemObtained,
  levelUpOverflow,
  linkTradeTransfer,
  monochromeBattleSlideIn,
  moveLearned,
  pixelHpDrain,
  radarPulseDiscovery,
  wildEncounterTransition,
]
