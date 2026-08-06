/**
 * Ship Netflix Waves B–E one specimen at a time via _ship-netflix-specimen.mjs
 */
import { execSync, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const waves = {
  B: [
    ['delayed-preview-expansion', 'SPX-3145', 'NF-036', 'Delayed Preview Expansion', 'delayedPreviewExpansion'],
    ['expanded-card-metadata-reveal', 'SPX-3146', 'NF-037', 'Expanded Card Metadata Reveal', 'expandedCardMetadataReveal'],
    ['keyboard-focus-expansion', 'SPX-3150', 'NF-041', 'Keyboard Focus Expansion', 'keyboardFocusExpansion'],
    ['featured-hero-crossfade', 'SPX-3126', 'NF-017', 'Featured Hero Crossfade', 'featuredHeroCrossfade'],
    ['hero-metadata-cascade', 'SPX-3127', 'NF-018', 'Hero Metadata Cascade', 'heroMetadataCascade'],
    ['search-field-expand', 'SPX-3206', 'NF-097', 'Search Field Expand', 'searchFieldExpand'],
    ['live-result-grid-reflow', 'SPX-3207', 'NF-098', 'Live Result Grid Reflow', 'liveResultGridReflow'],
    ['oversized-rank-numeral', 'SPX-3232', 'NF-123', 'Oversized Rank Numeral', 'oversizedRankNumeral'],
    ['rank-change-slide', 'SPX-3233', 'NF-124', 'Rank Change Slide', 'rankChangeSlide'],
    ['directional-focus-travel', 'SPX-3265', 'NF-156', 'Directional Focus Travel', 'directionalFocusTravel'],
  ],
  C: [
    ['autoplay-preview-countdown', 'SPX-3153', 'NF-044', 'Autoplay Preview Countdown', 'autoplayPreviewCountdown'],
    ['preview-start-crossfade', 'SPX-3154', 'NF-045', 'Preview Start Crossfade', 'previewStartCrossfade'],
    ['ten-second-seek-ripple', 'SPX-3163', 'NF-054', 'Ten-Second Seek Ripple', 'tenSecondSeekRipple'],
    ['controls-idle-dissolve', 'SPX-3168', 'NF-059', 'Controls Idle Dissolve', 'controlsIdleDissolve'],
    ['timeline-hover-preview', 'SPX-3171', 'NF-062', 'Timeline Hover Preview', 'timelineHoverPreview'],
    ['skip-intro-commit', 'SPX-3179', 'NF-070', 'Skip Intro Commit', 'skipIntroCommit'],
    ['next-up-cancel', 'SPX-3185', 'NF-076', 'Next-Up Cancel', 'nextUpCancel'],
    ['binge-continuation-transition', 'SPX-3190', 'NF-081', 'Binge Continuation Transition', 'bingeContinuationTransition'],
    ['minimal-buffer-spinner', 'SPX-3191', 'NF-082', 'Minimal Buffer Spinner', 'minimalBufferSpinner'],
    ['buffer-to-playback-resolve', 'SPX-3192', 'NF-083', 'Buffer-to-Playback Resolve', 'bufferToPlaybackResolve'],
  ],
  D: [
    ['whos-watching-grid-focus', 'SPX-3118', 'NF-009', "Who's Watching Grid Focus", 'whosWatchingGridFocus'],
    ['profile-avatar-select-snap', 'SPX-3119', 'NF-010', 'Profile Avatar Select Snap', 'profileAvatarSelectSnap'],
    ['match-confidence-meter', 'SPX-3214', 'NF-105', 'Match Confidence Meter', 'matchConfidenceMeter'],
    ['thumb-rating-feedback', 'SPX-3215', 'NF-106', 'Thumb Rating Feedback', 'thumbRatingFeedback'],
    ['add-to-list-confirmation', 'SPX-3220', 'NF-111', 'Add-to-List Confirmation', 'addToListConfirmation'],
    ['remove-from-list-undo', 'SPX-3221', 'NF-112', 'Remove-from-List Undo', 'removeFromListUndo'],
    ['resume-playback-handoff', 'SPX-3226', 'NF-117', 'Resume Playback Handoff', 'resumePlaybackHandoff'],
    ['continue-watching-progress-bar', 'SPX-3227', 'NF-118', 'Continue-Watching Progress Bar', 'continueWatchingProgressBar'],
    ['details-close-return', 'SPX-3202', 'NF-093', 'Details Close Return', 'detailsCloseReturn'],
    ['back-navigation-return', 'SPX-3268', 'NF-159', 'Back Navigation Return', 'backNavigationReturn'],
  ],
  E: [
    ['playback-error-takeover', 'SPX-3244', 'NF-135', 'Playback Error Takeover', 'playbackErrorTakeover'],
    ['retry-to-buffer-transition', 'SPX-3245', 'NF-136', 'Retry-to-Buffer Transition', 'retryToBufferTransition'],
    ['network-lost-overlay', 'SPX-3246', 'NF-137', 'Network Lost Overlay', 'networkLostOverlay'],
    ['vertical-clip-snap', 'SPX-3251', 'NF-142', 'Vertical Clip Snap', 'verticalClipSnap'],
    ['clip-to-title-handoff', 'SPX-3252', 'NF-143', 'Clip-to-Title Handoff', 'clipToTitleHandoff'],
    ['download-progress-ring', 'SPX-3258', 'NF-149', 'Download Progress Ring', 'downloadProgressRing'],
    ['download-complete-morph', 'SPX-3259', 'NF-150', 'Download Complete Morph', 'downloadCompleteMorph'],
    ['cinematic-ribbon-reveal', 'SPX-3110', 'NF-001', 'Cinematic Ribbon Reveal', 'cinematicRibbonReveal'],
    ['vertical-light-bar-intro', 'SPX-3111', 'NF-002', 'Vertical Light-Bar Intro', 'verticalLightBarIntro'],
    ['more-info-overlay', 'SPX-3199', 'NF-090', 'More Info Overlay', 'moreInfoOverlay'],
  ],
}

const wave = process.argv[2]
if (!wave || !waves[wave]) {
  console.error('Usage: node scripts/_ship-netflix-wave.mjs <B|C|D|E>')
  process.exit(1)
}

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
}

function findAnchor(id) {
  const index = sh('git show HEAD:src/specimens/index.ts')
  const re = /import \{ (\w+) \} from '\.\/([^'/]+)\/entry'/g
  const entries = []
  let m
  while ((m = re.exec(index))) {
    entries.push({ exportName: m[1], folder: m[2] })
  }
  const sorted = [...entries].sort((a, b) => a.folder.localeCompare(b.folder))
  const after = sorted.find((e) => e.folder.localeCompare(id) > 0)
  if (!after) throw new Error(`No insert-before anchor for ${id}`)
  return after
}

for (const row of waves[wave]) {
  const [id, spx, nf, title, exportName] = row
  if (existsSync(`src/specimens/${id}`)) {
    console.log('skip existing', id)
    continue
  }
  if (!existsSync(`.wip-aside/${id}/entry.ts`)) {
    throw new Error(`missing WIP ${id}`)
  }
  const anchor = findAnchor(id)
  console.log('\n=== shipping', id, 'before', anchor.folder, '===')
  const args = [
    'scripts/_ship-netflix-specimen.mjs',
    id,
    spx,
    nf,
    title,
    exportName,
    anchor.exportName,
    anchor.folder,
  ]
  const r = spawnSync(process.execPath, args, {
    stdio: 'inherit',
    env: process.env,
  })
  if (r.status !== 0) {
    console.error('FAILED', id, 'status', r.status)
    process.exit(r.status || 1)
  }
}

console.log('\nWave', wave, 'done')
