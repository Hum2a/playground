import { achievementEncounter } from './achievement-encounter/entry'
import { azureShardTransition } from './azure-shard-transition/entry'
import { blackoutLoader } from './blackout-loader/entry'
import { blueDoorDiscovery } from './blue-door-discovery/entry'
import { blueFlameButtonHover } from './blue-flame-button-hover/entry'
import { blueFocusBrackets } from './blue-focus-brackets/entry'
import { branchEvolutionChoice } from './branch-evolution-choice/entry'
import { butterflyEntry } from './butterfly-entry/entry'
import { butterflySuccessState } from './butterfly-success-state/entry'
import { callingCardPeel } from './calling-card-peel/entry'
import { callingCardSlam } from './calling-card-slam/entry'
import { captureShake } from './capture-shake/entry'
import { cardBreakSummon } from './card-break-summon/entry'
import { choiceExecutionSlash } from './choice-execution-slash/entry'
import { clockHandWipe } from './clock-hand-wipe/entry'
import { comicCardSelection } from './comic-card-selection/entry'
import { comicPanelScrollReveal } from './comic-panel-scroll-reveal/entry'
import { comicPanelWipe } from './comic-panel-wipe/entry'
import { comingSoonTape } from './coming-soon-tape/entry'
import { completionStrike } from './completion-strike/entry'
import { connectionSevered } from './connection-severed/entry'
import { contentDeclassification } from './content-declassification/entry'
import { corruptedAccessLock } from './corrupted-access-lock/entry'
import { criticalCapture } from './critical-capture/entry'
import { criticalThresholdWarning } from './critical-threshold-warning/entry'
import { criticalWeaknessHit } from './critical-weakness-hit/entry'
import { crookedMenuStack } from './crooked-menu-stack/entry'
import { crossOutReplacement } from './cross-out-replacement/entry'
import { crossOutStatusSwap } from './cross-out-status-swap/entry'
import { crystallisedSelection } from './crystallised-selection/entry'
import { darkHourConversion } from './dark-hour-conversion/entry'
import { darkHourConversionLoader } from './dark-hour-conversion-loader/entry'
import { dayChangeTear } from './day-change-tear/entry'
import { deadlineClock } from './deadline-clock/entry'
import { deadlinePanic } from './deadline-panic/entry'
import { decisionShowdown } from './decision-showdown/entry'
import { delayedDamageBar } from './delayed-damage-bar/entry'
import { deletionGuillotine } from './deletion-guillotine/entry'
import { diagnosticBootSequence } from './diagnostic-boot-sequence/entry'
import { discoveryTearOpen } from './discovery-tear-open/entry'
import { dramaticObjectionError } from './dramatic-objection-error/entry'
import { enemyScanReveal } from './enemy-scan-reveal/entry'
import { energyChargeConfirmation } from './energy-charge-confirmation/entry'
import { energyTransferSync } from './energy-transfer-sync/entry'
import { errorCorrectionRewrite } from './error-correction-rewrite/entry'
import { evokerMenuSnap } from './evoker-menu-snap/entry'
import { evolutionComplete } from './evolution-complete/entry'
import { evolutionSilhouetteTransformation } from './evolution-silhouette-transformation/entry'
import { failureShatter } from './failure-shatter/entry'
import { fullMoonMilestone } from './full-moon-milestone/entry'
import { fusionSelectionMerge } from './fusion-selection-merge/entry'
import { glassFractureReveal } from './glass-fracture-reveal/entry'
import { graphicBurstHover } from './graphic-burst-hover/entry'
import { holdToChargeButton } from './hold-to-charge-button/entry'
import { hoverCutout } from './hover-cutout/entry'
import { inkSplatTransition } from './ink-splat-transition/entry'
import { letterScatterAssemble } from './letter-scatter-assemble/entry'
import { liquidSplitTransition } from './liquid-split-transition/entry'
import { lockedChainBreak } from './locked-chain-break/entry'
import { mangaCutInNotification } from './manga-cut-in-notification/entry'
import { maxRankCompletion } from './max-rank-completion/entry'
import { memoryFragmentReveal } from './memory-fragment-reveal/entry'
import { midnightClockTransition } from './midnight-clock-transition/entry'
import { misprintNotification } from './misprint-notification/entry'
import { moonPhaseProgress } from './moon-phase-progress/entry'
import { newspaperHeadlineDrop } from './newspaper-headline-drop/entry'
import { objectiveAcquired } from './objective-acquired/entry'
import { panelCollapseNavigation } from './panel-collapse-navigation/entry'
import { panelExplosionReveal } from './panel-explosion-reveal/entry'
import { paperRipUnlock } from './paper-rip-unlock/entry'
import { paperStackShuffle } from './paper-stack-shuffle/entry'
import { permissionRejection } from './permission-rejection/entry'
import { personaAwakeningReveal } from './persona-awakening-reveal/entry'
import { precisionMenuSnap } from './precision-menu-snap/entry'
import { printRegistrationHover } from './print-registration-hover/entry'
import { progressMilestoneBreakthrough } from './progress-milestone-breakthrough/entry'
import { rankUpImpact } from './rank-up-impact/entry'
import { ransomNoteReveal } from './ransom-note-reveal/entry'
import { redactedContentLock } from './redacted-content-lock/entry'
import { ripplePortalTransition } from './ripple-portal-transition/entry'
import { scannerSearch } from './scanner-search/entry'
import { surfaceBreakReveal } from './surface-break-reveal/entry'
import { tacticalAlertPing } from './tactical-alert-ping/entry'
import { tacticalCommandWheel } from './tactical-command-wheel/entry'
import { tacticalTargetLock } from './tactical-target-lock/entry'
import { tartarusFloorAscension } from './tartarus-floor-ascension/entry'
import { temporalFreeze } from './temporal-freeze/entry'
import { timeSkip } from './time-skip/entry'
import { tornEdgeDrawer } from './torn-edge-drawer/entry'
import { truthShotNotification } from './truth-shot-notification/entry'
import { velvetDoorTransition } from './velvet-door-transition/entry'
import { victoryResultsTally } from './victory-results-tally/entry'
import { waterlinePageWipe } from './waterline-page-wipe/entry'
import { wildEncounterTransition } from './wild-encounter-transition/entry'
import type { Specimen } from './types'

export type { Specimen } from './types'
export type {
  FacetKey,
  SpecimenFacets,
  SpecimenIntensity,
  SpecimenKind,
  SpecimenScope,
  SpecimenTech,
} from './taxonomy'
export type {
  InspirationFranchiseId,
  InspirationWorkId,
  SpecimenInspiration,
  SuggestedFreeTag,
} from './inspiration'
export {
  ALL_FACET_VALUES,
  FACET_KEYS,
  FACET_LABELS,
  FACET_VALUES,
  SPECIMEN_INTENSITIES,
  SPECIMEN_KINDS,
  SPECIMEN_SCOPES,
  SPECIMEN_TECHS,
  formatFacets,
} from './taxonomy'
export {
  ALL_INSPIRATION_IDS,
  INSPIRATION_DIRECTORY,
  INSPIRATION_FRANCHISE_IDS,
  SUGGESTED_FREE_TAGS,
  formatInspiredBy,
  franchiseLabel,
  isWorkInFranchise,
  workLabel,
} from './inspiration'

/** Explicit specimen registry. Add one import per specimen. */
export const specimens: Specimen[] = [
  comingSoonTape,
  comicPanelWipe,
  contentDeclassification,
  callingCardSlam,
  callingCardPeel,
  dramaticObjectionError,
  azureShardTransition,
  precisionMenuSnap,
  evokerMenuSnap,
  truthShotNotification,
  diagnosticBootSequence,
  corruptedAccessLock,
  criticalThresholdWarning,
  achievementEncounter,
  tacticalAlertPing,
  inkSplatTransition,
  victoryResultsTally,
  blackoutLoader,
  blueDoorDiscovery,
  blueFlameButtonHover,
  blueFocusBrackets,
  branchEvolutionChoice,
  butterflyEntry,
  butterflySuccessState,
  captureShake,
  cardBreakSummon,
  choiceExecutionSlash,
  clockHandWipe,
  comicCardSelection,
  comicPanelScrollReveal,
  completionStrike,
  connectionSevered,
  criticalCapture,
  criticalWeaknessHit,
  crookedMenuStack,
  crossOutReplacement,
  crossOutStatusSwap,
  crystallisedSelection,
  darkHourConversion,
  darkHourConversionLoader,
  dayChangeTear,
  deadlineClock,
  deadlinePanic,
  decisionShowdown,
  delayedDamageBar,
  deletionGuillotine,
  discoveryTearOpen,
  enemyScanReveal,
  energyChargeConfirmation,
  energyTransferSync,
  errorCorrectionRewrite,
  evolutionComplete,
  evolutionSilhouetteTransformation,
  failureShatter,
  fullMoonMilestone,
  fusionSelectionMerge,
  glassFractureReveal,
  graphicBurstHover,
  holdToChargeButton,
  hoverCutout,
  letterScatterAssemble,
  liquidSplitTransition,
  lockedChainBreak,
  mangaCutInNotification,
  maxRankCompletion,
  memoryFragmentReveal,
  midnightClockTransition,
  misprintNotification,
  moonPhaseProgress,
  newspaperHeadlineDrop,
  objectiveAcquired,
  panelCollapseNavigation,
  panelExplosionReveal,
  paperRipUnlock,
  paperStackShuffle,
  permissionRejection,
  personaAwakeningReveal,
  printRegistrationHover,
  progressMilestoneBreakthrough,
  rankUpImpact,
  ransomNoteReveal,
  redactedContentLock,
  ripplePortalTransition,
  scannerSearch,
  surfaceBreakReveal,
  tacticalCommandWheel,
  tacticalTargetLock,
  tartarusFloorAscension,
  temporalFreeze,
  timeSkip,
  tornEdgeDrawer,
  velvetDoorTransition,
  waterlinePageWipe,
  wildEncounterTransition,
]

export function getSpecimen(idOrRef: string): Specimen | undefined {
  const needle = idOrRef.trim()
  return specimens.find(
    (s) =>
      s.id === needle ||
      s.ref === needle ||
      s.ref.toLowerCase() === needle.toLowerCase(),
  )
}

export function getSpecimenNeighbors(id: string): {
  prev: Specimen | undefined
  next: Specimen | undefined
} {
  const i = specimens.findIndex((s) => s.id === id)
  if (i < 0) return { prev: undefined, next: undefined }
  return {
    prev: i > 0 ? specimens[i - 1] : undefined,
    next: i < specimens.length - 1 ? specimens[i + 1] : undefined,
  }
}
