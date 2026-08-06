import { achievementEncounter } from './achievement-encounter/entry'
import { azureShardTransition } from './azure-shard-transition/entry'
import { blackoutLoader } from './blackout-loader/entry'
import { callingCardPeel } from './calling-card-peel/entry'
import { callingCardSlam } from './calling-card-slam/entry'
import { choiceExecutionSlash } from './choice-execution-slash/entry'
import { comingSoonTape } from './coming-soon-tape/entry'
import { comicCardSelection } from './comic-card-selection/entry'
import { comicPanelScrollReveal } from './comic-panel-scroll-reveal/entry'
import { comicPanelWipe } from './comic-panel-wipe/entry'
import { contentDeclassification } from './content-declassification/entry'
import { crookedMenuStack } from './crooked-menu-stack/entry'
import { corruptedAccessLock } from './corrupted-access-lock/entry'
import { crossOutReplacement } from './cross-out-replacement/entry'
import { crossOutStatusSwap } from './cross-out-status-swap/entry'
import { dayChangeTear } from './day-change-tear/entry'
import { decisionShowdown } from './decision-showdown/entry'
import { diagnosticBootSequence } from './diagnostic-boot-sequence/entry'
import { dramaticObjectionError } from './dramatic-objection-error/entry'
import { errorCorrectionRewrite } from './error-correction-rewrite/entry'
import { graphicBurstHover } from './graphic-burst-hover/entry'
import { holdToChargeButton } from './hold-to-charge-button/entry'
import { hoverCutout } from './hover-cutout/entry'
import { inkSplatTransition } from './ink-splat-transition/entry'
import { letterScatterAssemble } from './letter-scatter-assemble/entry'
import { lockedChainBreak } from './locked-chain-break/entry'
import { mangaCutInNotification } from './manga-cut-in-notification/entry'
import { misprintNotification } from './misprint-notification/entry'
import { newspaperHeadlineDrop } from './newspaper-headline-drop/entry'
import { panelCollapseNavigation } from './panel-collapse-navigation/entry'
import { panelExplosionReveal } from './panel-explosion-reveal/entry'
import { paperRipUnlock } from './paper-rip-unlock/entry'
import { paperStackShuffle } from './paper-stack-shuffle/entry'
import { precisionMenuSnap } from './precision-menu-snap/entry'
import { printRegistrationHover } from './print-registration-hover/entry'
import { progressMilestoneBreakthrough } from './progress-milestone-breakthrough/entry'
import { ransomNoteReveal } from './ransom-note-reveal/entry'
import { rankUpImpact } from './rank-up-impact/entry'
import { redactedContentLock } from './redacted-content-lock/entry'
import { tacticalAlertPing } from './tactical-alert-ping/entry'
import { tornEdgeDrawer } from './torn-edge-drawer/entry'
import { truthShotNotification } from './truth-shot-notification/entry'
import { victoryResultsTally } from './victory-results-tally/entry'
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
  truthShotNotification,
  diagnosticBootSequence,
  corruptedAccessLock,
  achievementEncounter,
  tacticalAlertPing,
  inkSplatTransition,
  victoryResultsTally,
  paperStackShuffle,
  misprintNotification,
  tornEdgeDrawer,
  newspaperHeadlineDrop,
  ransomNoteReveal,
  paperRipUnlock,
  panelCollapseNavigation,
  rankUpImpact,
  crookedMenuStack,
  letterScatterAssemble,
  graphicBurstHover,
  mangaCutInNotification,
  panelExplosionReveal,
  holdToChargeButton,
  lockedChainBreak,
  decisionShowdown,
  comicCardSelection,
  redactedContentLock,
  comicPanelScrollReveal,
  crossOutReplacement,
  printRegistrationHover,
  dayChangeTear,
  hoverCutout,
  blackoutLoader,
  crossOutStatusSwap,
  errorCorrectionRewrite,
  choiceExecutionSlash,
  progressMilestoneBreakthrough,
]

export function getSpecimen(id: string): Specimen | undefined {
  return specimens.find((s) => s.id === id)
}
