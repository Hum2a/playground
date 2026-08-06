import type { Specimen } from '../../types'
import { addToListConfirmation } from '../../library/netflix/add-to-list-confirmation/entry'
import { autoplayPreviewCountdown } from '../../library/netflix/autoplay-preview-countdown/entry'
import { backNavigationReturn } from '../../library/netflix/back-navigation-return/entry'
import { bingeContinuationTransition } from '../../library/netflix/binge-continuation-transition/entry'
import { bufferToPlaybackResolve } from '../../library/netflix/buffer-to-playback-resolve/entry'
import { cinematicRibbonReveal } from '../../library/netflix/cinematic-ribbon-reveal/entry'
import { clipToTitleHandoff } from '../../library/netflix/clip-to-title-handoff/entry'
import { continueWatchingProgressBar } from '../../library/netflix/continue-watching-progress-bar/entry'
import { controlsIdleDissolve } from '../../library/netflix/controls-idle-dissolve/entry'
import { delayedPreviewExpansion } from '../../library/netflix/delayed-preview-expansion/entry'
import { detailsCloseReturn } from '../../library/netflix/details-close-return/entry'
import { detailsPanelExpand } from '../../library/netflix/details-panel-expand/entry'
import { directionalFocusTravel } from '../../library/netflix/directional-focus-travel/entry'
import { downloadCompleteMorph } from '../../library/netflix/download-complete-morph/entry'
import { downloadProgressRing } from '../../library/netflix/download-progress-ring/entry'
import { expandedCardMetadataReveal } from '../../library/netflix/expanded-card-metadata-reveal/entry'
import { featuredHeroCrossfade } from '../../library/netflix/featured-hero-crossfade/entry'
import { heroMetadataCascade } from '../../library/netflix/hero-metadata-cascade/entry'
import { horizontalContentRail } from '../../library/netflix/horizontal-content-rail/entry'
import { keyboardFocusExpansion } from '../../library/netflix/keyboard-focus-expansion/entry'
import { liveResultGridReflow } from '../../library/netflix/live-result-grid-reflow/entry'
import { matchConfidenceMeter } from '../../library/netflix/match-confidence-meter/entry'
import { minimalBufferSpinner } from '../../library/netflix/minimal-buffer-spinner/entry'
import { moreInfoOverlay } from '../../library/netflix/more-info-overlay/entry'
import { neighbourPushOut } from '../../library/netflix/neighbour-push-out/entry'
import { networkLostOverlay } from '../../library/netflix/network-lost-overlay/entry'
import { nextEpisodeCountdown } from '../../library/netflix/next-episode-countdown/entry'
import { nextUpCancel } from '../../library/netflix/next-up-cancel/entry'
import { oversizedRankNumeral } from '../../library/netflix/oversized-rank-numeral/entry'
import { playbackControlsFadeIn } from '../../library/netflix/playback-controls-fade-in/entry'
import { playbackErrorTakeover } from '../../library/netflix/playback-error-takeover/entry'
import { previewCardHoverExpand } from '../../library/netflix/preview-card-hover-expand/entry'
import { previewCollapseReturn } from '../../library/netflix/preview-collapse-return/entry'
import { previewStartCrossfade } from '../../library/netflix/preview-start-crossfade/entry'
import { profileAvatarSelectSnap } from '../../library/netflix/profile-avatar-select-snap/entry'
import { railPageSnap } from '../../library/netflix/rail-page-snap/entry'
import { rankChangeSlide } from '../../library/netflix/rank-change-slide/entry'
import { removeFromListUndo } from '../../library/netflix/remove-from-list-undo/entry'
import { resumePlaybackHandoff } from '../../library/netflix/resume-playback-handoff/entry'
import { retryToBufferTransition } from '../../library/netflix/retry-to-buffer-transition/entry'
import { scrubPreviewThumbnail } from '../../library/netflix/scrub-preview-thumbnail/entry'
import { searchFieldExpand } from '../../library/netflix/search-field-expand/entry'
import { skipIntroAppear } from '../../library/netflix/skip-intro-appear/entry'
import { skipIntroCommit } from '../../library/netflix/skip-intro-commit/entry'
import { tenSecondSeekRipple } from '../../library/netflix/ten-second-seek-ripple/entry'
import { thumbRatingFeedback } from '../../library/netflix/thumb-rating-feedback/entry'
import { timelineHoverPreview } from '../../library/netflix/timeline-hover-preview/entry'
import { verticalClipSnap } from '../../library/netflix/vertical-clip-snap/entry'
import { verticalLightBarIntro } from '../../library/netflix/vertical-light-bar-intro/entry'
import { whosWatchingGridFocus } from '../../library/netflix/whos-watching-grid-focus/entry'

export const shard: Specimen[] = [
  addToListConfirmation,
  autoplayPreviewCountdown,
  backNavigationReturn,
  bingeContinuationTransition,
  bufferToPlaybackResolve,
  cinematicRibbonReveal,
  clipToTitleHandoff,
  continueWatchingProgressBar,
  controlsIdleDissolve,
  delayedPreviewExpansion,
  detailsCloseReturn,
  detailsPanelExpand,
  directionalFocusTravel,
  downloadCompleteMorph,
  downloadProgressRing,
  expandedCardMetadataReveal,
  featuredHeroCrossfade,
  heroMetadataCascade,
  horizontalContentRail,
  keyboardFocusExpansion,
  liveResultGridReflow,
  matchConfidenceMeter,
  minimalBufferSpinner,
  moreInfoOverlay,
  neighbourPushOut,
  networkLostOverlay,
  nextEpisodeCountdown,
  nextUpCancel,
  oversizedRankNumeral,
  playbackControlsFadeIn,
  playbackErrorTakeover,
  previewCardHoverExpand,
  previewCollapseReturn,
  previewStartCrossfade,
  profileAvatarSelectSnap,
  railPageSnap,
  rankChangeSlide,
  removeFromListUndo,
  resumePlaybackHandoff,
  retryToBufferTransition,
  scrubPreviewThumbnail,
  searchFieldExpand,
  skipIntroAppear,
  skipIntroCommit,
  tenSecondSeekRipple,
  thumbRatingFeedback,
  timelineHoverPreview,
  verticalClipSnap,
  verticalLightBarIntro,
  whosWatchingGridFocus,
]
