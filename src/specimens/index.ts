import { achievementEncounter } from './achievement-encounter/entry'
import { azureShardTransition } from './azure-shard-transition/entry'
import { blackoutLoader } from './blackout-loader/entry'
import { blueDoorDiscovery } from './blue-door-discovery/entry'
import { butterflyEntry } from './butterfly-entry/entry'
import { callingCardPeel } from './calling-card-peel/entry'
import { callingCardSlam } from './calling-card-slam/entry'
import { choiceExecutionSlash } from './choice-execution-slash/entry'
import { comicCardSelection } from './comic-card-selection/entry'
import { comicPanelScrollReveal } from './comic-panel-scroll-reveal/entry'
import { comicPanelWipe } from './comic-panel-wipe/entry'
import { comingSoonTape } from './coming-soon-tape/entry'
import { completionStrike } from './completion-strike/entry'
import { connectionSevered } from './connection-severed/entry'
import { contentDeclassification } from './content-declassification/entry'
import { corruptedAccessLock } from './corrupted-access-lock/entry'
import { criticalThresholdWarning } from './critical-threshold-warning/entry'
import { crookedMenuStack } from './crooked-menu-stack/entry'
import { crossOutReplacement } from './cross-out-replacement/entry'
import { crossOutStatusSwap } from './cross-out-status-swap/entry'
import { darkHourConversion } from './dark-hour-conversion/entry'
import { dayChangeTear } from './day-change-tear/entry'
import { deadlinePanic } from './deadline-panic/entry'
import { decisionShowdown } from './decision-showdown/entry'
import { deletionGuillotine } from './deletion-guillotine/entry'
import { diagnosticBootSequence } from './diagnostic-boot-sequence/entry'
import { discoveryTearOpen } from './discovery-tear-open/entry'
import { dramaticObjectionError } from './dramatic-objection-error/entry'
import { energyTransferSync } from './energy-transfer-sync/entry'
import { errorCorrectionRewrite } from './error-correction-rewrite/entry'
import { evokerMenuSnap } from './evoker-menu-snap/entry'
import { failureShatter } from './failure-shatter/entry'
import { fusionSelectionMerge } from './fusion-selection-merge/entry'
import { graphicBurstHover } from './graphic-burst-hover/entry'
import { holdToChargeButton } from './hold-to-charge-button/entry'
import { hoverCutout } from './hover-cutout/entry'
import { inkSplatTransition } from './ink-splat-transition/entry'
import { letterScatterAssemble } from './letter-scatter-assemble/entry'
import { lockedChainBreak } from './locked-chain-break/entry'
import { mangaCutInNotification } from './manga-cut-in-notification/entry'
import { memoryFragmentReveal } from './memory-fragment-reveal/entry'
import { misprintNotification } from './misprint-notification/entry'
import { midnightClockTransition } from './midnight-clock-transition/entry'
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
import { scannerSearch } from './scanner-search/entry'
import { redactedContentLock } from './redacted-content-lock/entry'
import { ripplePortalTransition } from './ripple-portal-transition/entry'
import { tacticalAlertPing } from './tactical-alert-ping/entry'
import { tacticalTargetLock } from './tactical-target-lock/entry'
import { tartarusFloorAscension } from './tartarus-floor-ascension/entry'
import { tornEdgeDrawer } from './torn-edge-drawer/entry'
import { truthShotNotification } from './truth-shot-notification/entry'
import { velvetDoorTransition } from './velvet-door-transition/entry'
import { victoryResultsTally } from './victory-results-tally/entry'
import { waterlinePageWipe } from './waterline-page-wipe/entry'
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
  butterflyEntry,
  choiceExecutionSlash,
  comicCardSelection,
  comicPanelScrollReveal,
  completionStrike,
  connectionSevered,
  crookedMenuStack,
  crossOutReplacement,
  crossOutStatusSwap,
  darkHourConversion,
  dayChangeTear,
  deadlinePanic,
  decisionShowdown,
  deletionGuillotine,
  discoveryTearOpen,
  energyTransferSync,
  errorCorrectionRewrite,
  failureShatter,
  fusionSelectionMerge,
  graphicBurstHover,
  holdToChargeButton,
  hoverCutout,
  letterScatterAssemble,
  lockedChainBreak,
  mangaCutInNotification,
  memoryFragmentReveal,
  misprintNotification,
  midnightClockTransition,
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
  tacticalTargetLock,
  tartarusFloorAscension,
  tornEdgeDrawer,
  velvetDoorTransition,
  waterlinePageWipe,
  scannerSearch,
]

export function getSpecimen(id: string): Specimen | undefined {
  return specimens.find((s) => s.id === id)
}