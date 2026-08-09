import type { Specimen } from '../../types'
import { allOutCompletionBurst } from '../../library/persona/all-out-completion-burst/entry'
import { arcanaCardDraw } from '../../library/persona/arcana-card-draw/entry'
import { arcanaRankUp } from '../../library/persona/arcana-rank-up/entry'
import { azureShardTransition } from '../../library/persona/azure-shard-transition/entry'
import { battleResultTally } from '../../library/persona/battle-result-tally/entry'
import { blackoutLoader } from '../../library/persona/blackout-loader/entry'
import { blueDoorDiscovery } from '../../library/persona/blue-door-discovery/entry'
import { blueFlameButtonHover } from '../../library/persona/blue-flame-button-hover/entry'
import { blueFocusBrackets } from '../../library/persona/blue-focus-brackets/entry'
import { bossIntroductionFreeze } from '../../library/persona/boss-introduction-freeze/entry'
import { broadcastInterruption } from '../../library/persona/broadcast-interruption/entry'
import { butterflyEntry } from '../../library/persona/butterfly-entry/entry'
import { butterflySuccessState } from '../../library/persona/butterfly-success-state/entry'
import { callingCardPeel } from '../../library/persona/calling-card-peel/entry'
import { callingCardSlam } from '../../library/persona/calling-card-slam/entry'
import { cardBreakSummon } from '../../library/persona/card-break-summon/entry'
import { caseBreakthrough } from '../../library/persona/case-breakthrough/entry'
import { caseSolvedCompletion } from '../../library/persona/case-solved-completion/entry'
import { channelTuningScrub } from '../../library/persona/channel-tuning-scrub/entry'
import { choiceExecutionSlash } from '../../library/persona/choice-execution-slash/entry'
import { classifiedDossierReveal } from '../../library/persona/classified-dossier-reveal/entry'
import { comicCardSelection } from '../../library/persona/comic-card-selection/entry'
import { comicPanelScrollReveal } from '../../library/persona/comic-panel-scroll-reveal/entry'
import { comicPanelWipe } from '../../library/persona/comic-panel-wipe/entry'
import { comingSoonTape } from '../../library/persona/coming-soon-tape/entry'
import { completionStrike } from '../../library/persona/completion-strike/entry'
import { confrontationCardSlam } from '../../library/persona/confrontation-card-slam/entry'
import { contentDeclassification } from '../../library/persona/content-declassification/entry'
import { contractConfirmation } from '../../library/persona/contract-confirmation/entry'
import { contradictionFound } from '../../library/persona/contradiction-found/entry'
import { criticalThresholdWarning } from '../../library/persona/critical-threshold-warning/entry'
import { criticalWeaknessHit } from '../../library/persona/critical-weakness-hit/entry'
import { crookedMenuStack } from '../../library/persona/crooked-menu-stack/entry'
import { crossOutReplacement } from '../../library/persona/cross-out-replacement/entry'
import { crossOutStatusSwap } from '../../library/persona/cross-out-status-swap/entry'
import { crtPowerOnReveal } from '../../library/persona/crt-power-on-reveal/entry'
import { crystallisedSelection } from '../../library/persona/crystallised-selection/entry'
import { dangerMeterEscalation } from '../../library/persona/danger-meter-escalation/entry'
import { darkHourConversion } from '../../library/persona/dark-hour-conversion/entry'
import { darkHourConversionLoader } from '../../library/persona/dark-hour-conversion-loader/entry'
import { dayChangeCard } from '../../library/persona/day-change-card/entry'
import { dayChangeTear } from '../../library/persona/day-change-tear/entry'
import { deadlineClock } from '../../library/persona/deadline-clock/entry'
import { deadlinePanic } from '../../library/persona/deadline-panic/entry'
import { deadlinePressureMeter } from '../../library/persona/deadline-pressure-meter/entry'
import { decisionShowdown } from '../../library/persona/decision-showdown/entry'
import { deductionLockIn } from '../../library/persona/deduction-lock-in/entry'
import { discoveryTearOpen } from '../../library/persona/discovery-tear-open/entry'
import { dropletNotification } from '../../library/persona/droplet-notification/entry'
import { enemyScanReveal } from '../../library/persona/enemy-scan-reveal/entry'
import { energyChargeConfirmation } from '../../library/persona/energy-charge-confirmation/entry'
import { energyTransferSync } from '../../library/persona/energy-transfer-sync/entry'
import { errorCorrectionRewrite } from '../../library/persona/error-correction-rewrite/entry'
import { evidenceChainAdvance } from '../../library/persona/evidence-chain-advance/entry'
import { evidenceConnectionDraw } from '../../library/persona/evidence-connection-draw/entry'
import { evokerMenuSnap } from '../../library/persona/evoker-menu-snap/entry'
import { failureShatter } from '../../library/persona/failure-shatter/entry'
import { falseLeadStrikeout } from '../../library/persona/false-lead-strikeout/entry'
import { fingerprintScanMatch } from '../../library/persona/fingerprint-scan-match/entry'
import { fogClearingDataReveal } from '../../library/persona/fog-clearing-data-reveal/entry'
import { fogDeadlineEscalation } from '../../library/persona/fog-deadline-escalation/entry'
import { fogForecastWarning } from '../../library/persona/fog-forecast-warning/entry'
import { fogOfWarCard } from '../../library/persona/fog-of-war-card/entry'
import { fullMoonMilestone } from '../../library/persona/full-moon-milestone/entry'
import { fusionPreview } from '../../library/persona/fusion-preview/entry'
import { fusionSelectionMerge } from '../../library/persona/fusion-selection-merge/entry'
import { glassFractureReveal } from '../../library/persona/glass-fracture-reveal/entry'
import { graphicBurstHover } from '../../library/persona/graphic-burst-hover/entry'
import { hazardStripeReveal } from '../../library/persona/hazard-stripe-reveal/entry'
import { holdToChargeButton } from '../../library/persona/hold-to-charge-button/entry'
import { hoverCutout } from '../../library/persona/hover-cutout/entry'
import { keepOutTapeMarquee } from '../../library/persona/keep-out-tape-marquee/entry'
import { knockdownChain } from '../../library/persona/knockdown-chain/entry'
import { letterScatterAssemble } from '../../library/persona/letter-scatter-assemble/entry'
import { levelUpBurst } from '../../library/persona/level-up-burst/entry'
import { liquidSplitTransition } from '../../library/persona/liquid-split-transition/entry'
import { liquidToggle } from '../../library/persona/liquid-toggle/entry'
import { lockedChainBreak } from '../../library/persona/locked-chain-break/entry'
import { lunarCycleLoader } from '../../library/persona/lunar-cycle-loader/entry'
import { moonriseReveal } from '../../library/persona/moonrise-reveal/entry'
import { eclipseTransition } from '../../library/persona/eclipse-transition/entry'
import { crescentWipe } from '../../library/persona/crescent-wipe/entry'
import { lunarDeadline } from '../../library/persona/lunar-deadline/entry'
import { moonPhasePagination } from '../../library/persona/moon-phase-pagination/entry'
import { eclipseLoadingState } from '../../library/persona/eclipse-loading-state/entry'
import { moonOrbitSelection } from '../../library/persona/moon-orbit-selection/entry'
import { lunarCalendarChange } from '../../library/persona/lunar-calendar-change/entry'
import { newMoonLockedState } from '../../library/persona/new-moon-locked-state/entry'
import { mangaCutInNotification } from '../../library/persona/manga-cut-in-notification/entry'
import { mapConstruction } from '../../library/persona/map-construction/entry'
import { maxRankCompletion } from '../../library/persona/max-rank-completion/entry'
import { memoryFragmentReveal } from '../../library/persona/memory-fragment-reveal/entry'
import { midnightChannelSignalAcquisition } from '../../library/persona/midnight-channel-signal-acquisition/entry'
import { midnightClockTransition } from '../../library/persona/midnight-clock-transition/entry'
import { misprintNotification } from '../../library/persona/misprint-notification/entry'
import { moonPhaseProgress } from '../../library/persona/moon-phase-progress/entry'
import { multiFusionAssembly } from '../../library/persona/multi-fusion-assembly/entry'
import { newspaperHeadlineDrop } from '../../library/persona/newspaper-headline-drop/entry'
import { noSignalCard } from '../../library/persona/no-signal-card/entry'
import { objectiveAcquired } from '../../library/persona/objective-acquired/entry'
import { p4MaxRankCompletion } from '../../library/persona/p4-max-rank-completion/entry'
import { panelCollapseNavigation } from '../../library/persona/panel-collapse-navigation/entry'
import { panelExplosionReveal } from '../../library/persona/panel-explosion-reveal/entry'
import { paperRipUnlock } from '../../library/persona/paper-rip-unlock/entry'
import { paperStackShuffle } from '../../library/persona/paper-stack-shuffle/entry'
import { permissionRejection } from '../../library/persona/permission-rejection/entry'
import { personaAwakeningReveal } from '../../library/persona/persona-awakening-reveal/entry'
import { personaFusionCombine } from '../../library/persona/persona-fusion-combine/entry'
import { precisionMenuSnap } from '../../library/persona/precision-menu-snap/entry'
import { printRegistrationHover } from '../../library/persona/print-registration-hover/entry'
import { progressMilestoneBreakthrough } from '../../library/persona/progress-milestone-breakthrough/entry'
import { rankThresholdUnlock } from '../../library/persona/rank-threshold-unlock/entry'
import { rankUpImpact } from '../../library/persona/rank-up-impact/entry'
import { ransomNoteReveal } from '../../library/persona/ransom-note-reveal/entry'
import { redactedContentLock } from '../../library/persona/redacted-content-lock/entry'
import { redactionReveal } from '../../library/persona/redaction-reveal/entry'
import { ripplePortalTransition } from '../../library/persona/ripple-portal-transition/entry'
import { rippleSelection } from '../../library/persona/ripple-selection/entry'
import { scannerSearch } from '../../library/persona/scanner-search/entry'
import { shadowSelfReveal } from '../../library/persona/shadow-self-reveal/entry'
import { skillInheritanceSelect } from '../../library/persona/skill-inheritance-select/entry'
import { socialLinkMilestone } from '../../library/persona/social-link-milestone/entry'
import { staticPortalMaterialise } from '../../library/persona/static-portal-materialise/entry'
import { surfaceBreakReveal } from '../../library/persona/surface-break-reveal/entry'
import { suspectCardReveal } from '../../library/persona/suspect-card-reveal/entry'
import { tacticalCommandWheel } from '../../library/persona/tactical-command-wheel/entry'
import { tacticalTargetLock } from '../../library/persona/tactical-target-lock/entry'
import { tartarusFloorAscension } from '../../library/persona/tartarus-floor-ascension/entry'
import { temporalFreeze } from '../../library/persona/temporal-freeze/entry'
import { timelineReconstruction } from '../../library/persona/timeline-reconstruction/entry'
import { tornEdgeDrawer } from '../../library/persona/torn-edge-drawer/entry'
import { trackingErrorRecovery } from '../../library/persona/tracking-error-recovery/entry'
import { tvScreenDiveTransition } from '../../library/persona/tv-screen-dive-transition/entry'
import { velvetDoorTransition } from '../../library/persona/velvet-door-transition/entry'
import { vhsTrackingScrub } from '../../library/persona/vhs-tracking-scrub/entry'
import { waterDisturbanceHover } from '../../library/persona/water-disturbance-hover/entry'
import { waterlinePageWipe } from '../../library/persona/waterline-page-wipe/entry'
import { weaknessDiscovered } from '../../library/persona/weakness-discovered/entry'
import { yellowImpactWipe } from '../../library/persona/yellow-impact-wipe/entry'
import { shardHover } from '../../library/persona/shard-hover/entry'
import { glassFocusFrame } from '../../library/persona/glass-focus-frame/entry'
import { shardBurstButton } from '../../library/persona/shard-burst-button/entry'
import { glassTabSwitcher } from '../../library/persona/glass-tab-switcher/entry'
import { refractionHover } from '../../library/persona/refraction-hover/entry'
import { crackedDisabledState } from '../../library/persona/cracked-disabled-state/entry'
import { glassBadgeAssembly } from '../../library/persona/glass-badge-assembly/entry'
import { redStampUnlock } from '../../library/persona/red-stamp-unlock/entry'
import { typographicImpact } from '../../library/persona/typographic-impact/entry'
import { radialCommandSnap } from '../../library/persona/radial-command-snap/entry'
import { inputFocusAttack } from '../../library/persona/input-focus-attack/entry'
import { invalidFieldSlash } from '../../library/persona/invalid-field-slash/entry'
import { successfulFieldStamp } from '../../library/persona/successful-field-stamp/entry'
import { checkboxImpact } from '../../library/persona/checkbox-impact/entry'
import { radioTargetSelector } from '../../library/persona/radio-target-selector/entry'
import { textareaPaperExpansion } from '../../library/persona/textarea-paper-expansion/entry'
import { labelEjection } from '../../library/persona/label-ejection/entry'
import { passwordRevealCutout } from '../../library/persona/password-reveal-cutout/entry'
import { submitBlackout } from '../../library/persona/submit-blackout/entry'
import { errorHeadlineIntrusion } from '../../library/persona/error-headline-intrusion/entry'
import { formCompletionStrike } from '../../library/persona/form-completion-strike/entry'
import { requiredMarkerImpact } from '../../library/persona/required-marker-impact/entry'
import { confidantRankUp } from '../../library/persona/confidant-rank-up/entry'
import { xpCounterSlam } from '../../library/persona/xp-counter-slam/entry'
import { jaggedSpeechTooltip } from '../../library/persona/jagged-speech-tooltip/entry'
import { overlappingNewspaperTabs } from '../../library/persona/overlapping-newspaper-tabs/entry'
import { filterSlash } from '../../library/persona/filter-slash/entry'
import { graphicFinisherCompletion } from '../../library/persona/graphic-finisher-completion/entry'

export const shard: Specimen[] = [
  allOutCompletionBurst,
  arcanaCardDraw,
  arcanaRankUp,
  azureShardTransition,
  battleResultTally,
  blackoutLoader,
  blueDoorDiscovery,
  blueFlameButtonHover,
  blueFocusBrackets,
  bossIntroductionFreeze,
  broadcastInterruption,
  butterflyEntry,
  butterflySuccessState,
  callingCardPeel,
  callingCardSlam,
  cardBreakSummon,
  caseBreakthrough,
  caseSolvedCompletion,
  channelTuningScrub,
  choiceExecutionSlash,
  classifiedDossierReveal,
  comicCardSelection,
  comicPanelScrollReveal,
  comicPanelWipe,
  comingSoonTape,
  completionStrike,
  confrontationCardSlam,
  contentDeclassification,
  contractConfirmation,
  contradictionFound,
  criticalThresholdWarning,
  criticalWeaknessHit,
  crookedMenuStack,
  crossOutReplacement,
  crossOutStatusSwap,
  crtPowerOnReveal,
  crystallisedSelection,
  dangerMeterEscalation,
  darkHourConversion,
  darkHourConversionLoader,
  dayChangeCard,
  dayChangeTear,
  deadlineClock,
  deadlinePanic,
  deadlinePressureMeter,
  decisionShowdown,
  deductionLockIn,
  discoveryTearOpen,
  dropletNotification,
  enemyScanReveal,
  energyChargeConfirmation,
  energyTransferSync,
  errorCorrectionRewrite,
  evidenceChainAdvance,
  evidenceConnectionDraw,
  evokerMenuSnap,
  failureShatter,
  falseLeadStrikeout,
  fingerprintScanMatch,
  fogClearingDataReveal,
  fogDeadlineEscalation,
  fogForecastWarning,
  fogOfWarCard,
  fullMoonMilestone,
  fusionPreview,
  fusionSelectionMerge,
  glassFractureReveal,
  graphicBurstHover,
  hazardStripeReveal,
  holdToChargeButton,
  hoverCutout,
  keepOutTapeMarquee,
  knockdownChain,
  letterScatterAssemble,
  levelUpBurst,
  liquidSplitTransition,
  liquidToggle,
  lockedChainBreak,
  lunarCycleLoader,
  moonriseReveal,
  eclipseTransition,
  crescentWipe,
  lunarDeadline,
  moonPhasePagination,
  eclipseLoadingState,
  moonOrbitSelection,
  lunarCalendarChange,
  newMoonLockedState,
  mangaCutInNotification,
  mapConstruction,
  maxRankCompletion,
  memoryFragmentReveal,
  midnightChannelSignalAcquisition,
  midnightClockTransition,
  misprintNotification,
  moonPhaseProgress,
  multiFusionAssembly,
  newspaperHeadlineDrop,
  noSignalCard,
  objectiveAcquired,
  p4MaxRankCompletion,
  panelCollapseNavigation,
  panelExplosionReveal,
  paperRipUnlock,
  paperStackShuffle,
  permissionRejection,
  personaAwakeningReveal,
  personaFusionCombine,
  precisionMenuSnap,
  printRegistrationHover,
  progressMilestoneBreakthrough,
  rankThresholdUnlock,
  rankUpImpact,
  ransomNoteReveal,
  redactedContentLock,
  redactionReveal,
  ripplePortalTransition,
  rippleSelection,
  scannerSearch,
  shadowSelfReveal,
  skillInheritanceSelect,
  socialLinkMilestone,
  staticPortalMaterialise,
  surfaceBreakReveal,
  suspectCardReveal,
  tacticalCommandWheel,
  tacticalTargetLock,
  tartarusFloorAscension,
  temporalFreeze,
  timelineReconstruction,
  tornEdgeDrawer,
  trackingErrorRecovery,
  tvScreenDiveTransition,
  velvetDoorTransition,
  vhsTrackingScrub,
  waterDisturbanceHover,
  waterlinePageWipe,
  weaknessDiscovered,
  yellowImpactWipe,
  shardHover,
  glassFocusFrame,
  shardBurstButton,
  glassTabSwitcher,
  refractionHover,
  crackedDisabledState,
  glassBadgeAssembly,
  redStampUnlock,
  typographicImpact,
  radialCommandSnap,
  inputFocusAttack,
  invalidFieldSlash,
  successfulFieldStamp,
  checkboxImpact,
  radioTargetSelector,
  textareaPaperExpansion,
  labelEjection,
  passwordRevealCutout,
  submitBlackout,
  errorHeadlineIntrusion,
  formCompletionStrike,
  requiredMarkerImpact,
  confidantRankUp,
  xpCounterSlam,
  jaggedSpeechTooltip,
  overlappingNewspaperTabs,
  filterSlash,
  graphicFinisherCompletion,
]
