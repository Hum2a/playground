# PlayStation Specimen Checklist

> Working backlog for portable motion/UI artifacts inspired by PlayStation console / system UI grammar (home/control center, geometric shapes, boot/rest, activities, trophies, downloads, DualSense-style feedback, focus navigation, capture, cloud saves). Interaction primitives, not console replicas. Avoid PlayStation logos, exact boot animations, proprietary sounds, copyrighted game artwork, exact controller glyph artwork, official fonts, and pixel-copy screens.

## How to use

- **PS-NNN** — stable catalogue id (this list).
- **SPX-NNN** — specimen registry ref. Unbuilt ideas are pre-assigned `SPX-3307`…`SPX-3522` — use that ref when implementing; do not invent a different number.
- Non-catalogue specimens (other franchises / originals) use gaps not reserved by open P5 (`SPX-015`–`SPX-312`), P3 (`SPX-400`–`SPX-635`), PK (`SPX-700`–`SPX-965`), DB (`SPX-966`–`SPX-1209`), IOS (`SPX-1300`–`SPX-1557`), AND (`SPX-1558`–`SPX-1974`), MHA (`SPX-1975`–`SPX-2343`), NR (`SPX-2344`–`SPX-2918`), P4 (`SPX-2919`–`SPX-3109`), NF (`SPX-3110`–`SPX-3306`), or open PS rows; prefer leftover `SPX-313`–`SPX-399`, `SPX-636`–`SPX-699`, `SPX-1210`–`SPX-1299`, or `SPX-3523+`.
- Mark **`[x]`** only when the specimen is registered in `src/specimens/index.ts` with a real `ref` (not `SPX-TODO`) and verified. Agents must update this file in the same change — see `.cursor/rules/37_persona-catalogue.mdc`.
- Progress: **22 / 216** complete.

| Status | Count |
| --- | --- |
| Done | 22 |
| Open | 194 |

## Visual grammar

| Motif | Use for |
| --- | --- |
| Home / Control Center | bottom strip rise, game focus, context crossfade |
| Shapes / geometry | orbit loaders, scatter transitions, abstract primitives |
| Boot / rest | system glow, resume wake, rest dim |
| Launch / resume | zoom handoff, quick resume, close return |
| Activities / trophies | progress fill, objective steps, unlock pops |
| Downloads / DualSense | progress rings, trigger meters, haptic visuals |
| Focus / cards | directional travel, halo settle, media expand |
| Capture / cloud / recovery | screenshot flash, sync, crash recovery |

## Shipped (mapped to live specimens)

| PS | SPX | Specimen id | Title |
| --- | --- | --- | --- |
| PS-001 | `SPX-3307` | `control-center-rise` | Control Center Rise |
| PS-002 | `SPX-3308` | `activity-card-focus` | Activity Card Focus |
| PS-003 | `SPX-3309` | `home-game-focus-shift` | Home Game Focus Shift |
| PS-005 | `SPX-3311` | `context-background-crossfade` | Context Background Crossfade |
| PS-009 | `SPX-3315` | `home-to-game-handoff` | Home-to-Game Handoff |
| PS-019 | `SPX-3325` | `system-boot-glow` | System Boot Glow |
| PS-026 | `SPX-3332` | `game-launch-zoom` | Game Launch Zoom |
| PS-027 | `SPX-3333` | `resume-activity-handoff` | Resume Activity Handoff |
| PS-066 | `SPX-3372` | `directional-focus-travel` | Directional Focus Travel |
| PS-067 | `SPX-3373` | `focus-halo-settle` | Focus Halo Settle |
| PS-033 | `SPX-3339` | `activity-progress-fill` | Activity Progress Fill |
| PS-034 | `SPX-3340` | `activity-complete-burst` | Activity Complete Burst |
| PS-035 | `SPX-3341` | `objective-step-advance` | Objective Step Advance |
| PS-038 | `SPX-3344` | `activity-expand-details` | Activity Expand Details |
| PS-073 | `SPX-3379` | `media-card-focus-expand` | Media Card Focus Expand |
| PS-074 | `SPX-3380` | `card-to-details-morph` | Card-to-Details Morph |
| PS-076 | `SPX-3382` | `ps-neighbour-push-out` | Neighbour Push-Out |
| PS-077 | `SPX-3383` | `card-collapse-return` | Card Collapse Return |
| PS-041 | `SPX-3347` | `trophy-unlock-pop` | Trophy Unlock Pop |
| PS-042 | `SPX-3348` | `rare-trophy-reveal` | Rare Trophy Reveal |
| PS-049 | `SPX-3355` | `download-progress-ring` | Download Progress Ring |
| PS-050 | `SPX-3356` | `download-queue-advance` | Download Queue Advance |

## Core first-wave

Curated implementation priority (Recommended Build Waves A–E). Same checkbox as the master list — checking either counts.

- [x] **PS-001** · `SPX-3307` · **Control Center Rise** — ps5-home-control-center
- [x] **PS-002** · `SPX-3308` · **Activity Card Focus** — ps5-home-control-center
- [x] **PS-003** · `SPX-3309` · **Home Game Focus Shift** — ps5-home-control-center
- [x] **PS-005** · `SPX-3311` · **Context Background Crossfade** — ps5-home-control-center
- [x] **PS-009** · `SPX-3315` · **Home-to-Game Handoff** — ps5-home-control-center
- [x] **PS-019** · `SPX-3325` · **System Boot Glow** — console-boot-system-identity
- [x] **PS-026** · `SPX-3332` · **Game Launch Zoom** — game-launch-resume
- [x] **PS-027** · `SPX-3333` · **Resume Activity Handoff** — game-launch-resume
- [x] **PS-066** · `SPX-3372` · **Directional Focus Travel** — remote-tv-focus-navigation
- [x] **PS-067** · `SPX-3373` · **Focus Halo Settle** — remote-tv-focus-navigation
- [x] **PS-033** · `SPX-3339` · **Activity Progress Fill** — activity-cards-progress
- [x] **PS-034** · `SPX-3340` · **Activity Complete Burst** — activity-cards-progress
- [x] **PS-035** · `SPX-3341` · **Objective Step Advance** — activity-cards-progress
- [x] **PS-038** · `SPX-3344` · **Activity Expand Details** — activity-cards-progress
- [x] **PS-073** · `SPX-3379` · **Media Card Focus Expand** — cards-media-tiles
- [x] **PS-074** · `SPX-3380` · **Card-to-Details Morph** — cards-media-tiles
- [x] **PS-076** · `SPX-3382` · **Neighbour Push-Out** — cards-media-tiles
- [x] **PS-077** · `SPX-3383` · **Card Collapse Return** — cards-media-tiles
- [x] **PS-041** · `SPX-3347` · **Trophy Unlock Pop** — trophies-achievements
- [x] **PS-042** · `SPX-3348` · **Rare Trophy Reveal** — trophies-achievements
- [x] **PS-049** · `SPX-3355` · **Download Progress Ring** — downloads-installs-updates
- [x] **PS-050** · `SPX-3356` · **Download Queue Advance** — downloads-installs-updates
- [ ] **PS-051** · `SPX-3357` · **Install Phase Transition** — downloads-installs-updates
- [ ] **PS-053** · `SPX-3359` · **Download Complete Morph** — downloads-installs-updates
- [ ] **PS-058** · `SPX-3364` · **Adaptive Trigger Meter** — dualsense-controller-feedback-visuals
- [ ] **PS-059** · `SPX-3365` · **Haptic Pulse Visualizer** — dualsense-controller-feedback-visuals
- [ ] **PS-063** · `SPX-3369` · **Trigger Breakpoint Confirm** — dualsense-controller-feedback-visuals
- [ ] **PS-140** · `SPX-3446` · **Cloud Sync Progress** — network-connectivity
- [ ] **PS-146** · `SPX-3452` · **Save Conflict Compare** — save-data-cloud
- [ ] **PS-083** · `SPX-3389` · **Purchase Confirm Hold** — playstation-store-commerce
- [ ] **PS-021** · `SPX-3327` · **Resume-from-Rest Wake** — console-boot-system-identity
- [ ] **PS-030** · `SPX-3336` · **Quick Resume Snapshot** — game-launch-resume
- [ ] **PS-031** · `SPX-3337` · **Game Close Return** — game-launch-resume
- [ ] **PS-129** · `SPX-3435` · **Rest Mode Dim** — rest-mode-power-states
- [ ] **PS-130** · `SPX-3436` · **Wake from Rest** — rest-mode-power-states
- [ ] **PS-135** · `SPX-3441` · **Network Lost Takeover** — network-connectivity
- [ ] **PS-149** · `SPX-3455` · **Game Crash Recovery** — errors-recovery
- [ ] **PS-102** · `SPX-3408` · **System Notification Slide** — notifications
- [ ] **PS-110** · `SPX-3416` · **Screenshot Capture Flash** — capture-share
- [ ] **PS-111** · `SPX-3417` · **Capture Thumbnail Flyout** — capture-share
- [ ] **PS-011** · `SPX-3317` · **Four-Shape Orbit Loader** — playstation-shapes-geometry
- [ ] **PS-013** · `SPX-3319` · **Shape Scatter Transition** — playstation-shapes-geometry
- [ ] **PS-046** · `SPX-3352` · **Platinum-Style Completion** — trophies-achievements
- [ ] **PS-071** · `SPX-3377` · **Back Navigation Restore** — remote-tv-focus-navigation
- [ ] **PS-088** · `SPX-3394` · **Library Grid Focus** — library-collection
- [ ] **PS-096** · `SPX-3402` · **Party Join Handoff** — friends-parties-social
- [ ] **PS-109** · `SPX-3415` · **Controller Disconnected Alert** — notifications
- [ ] **PS-157** · `SPX-3463` · **Dwell-to-Select Ring** — psvr-spatial-ui
- [ ] **PS-181** · `SPX-3487` · **Horizon-Style Focus Scan** — game-specific-system-like-inspirations
- [ ] **PS-184** · `SPX-3490` · **Ratchet-Style Rift Transition** — game-specific-system-like-inspirations


## PS5 Home / Control Center

- [x] **PS-001** · `SPX-3307` · **Control Center Rise** — A compact control strip rises from the bottom while the active game remains visually present.
- [x] **PS-002** · `SPX-3308` · **Activity Card Focus** — A selected activity card enlarges and exposes progress/actions without becoming a full page.
- [x] **PS-003** · `SPX-3309` · **Home Game Focus Shift** — Moving between game tiles changes the background/context while preserving navigation continuity.
- [ ] **PS-004** · `SPX-3310` · **Game Tile Lift** — Focused game tile gains scale and depth while neighbours remain anchored.
- [x] **PS-005** · `SPX-3311` · **Context Background Crossfade** — The ambient background changes smoothly as focus moves between titles.
- [ ] **PS-006** · `SPX-3312` · **Control Center Dismiss** — The bottom control layer retreats and restores full attention to the current surface.
- [ ] **PS-007** · `SPX-3313` · **Quick Setting Expand** — A compact control expands into an anchored setting panel.
- [ ] **PS-008** · `SPX-3314` · **Switcher Card Slide** — Recent games/apps move through a compact horizontal switcher.
- [x] **PS-009** · `SPX-3315` · **Home-to-Game Handoff** — Selecting a title expands its identity before transitioning into launch state.
- [ ] **PS-010** · `SPX-3316` · **Context Menu Bloom** — Secondary actions emerge from the selected object without losing spatial context.

## PlayStation Shapes / Geometry

- [ ] **PS-011** · `SPX-3317` · **Four-Shape Orbit Loader** — Four original geometric symbols orbit and settle into a completion state.
- [ ] **PS-012** · `SPX-3318` · **Shape Trail Navigation** — Simple circle/cross/square/triangle-like primitives leave a finite directional trail during navigation.
- [ ] **PS-013** · `SPX-3319` · **Shape Scatter Transition** — Small geometric tokens scatter from the selected control and reform around destination content.
- [ ] **PS-014** · `SPX-3320` · **Shape Grid Assemble** — Geometric pieces snap into a structured panel.
- [ ] **PS-015** · `SPX-3321` · **Shape Pulse Confirmation** — A compact symbol emits one bounded pulse when an action succeeds.
- [ ] **PS-016** · `SPX-3322` · **Shape Cascade Loader** — Four primitive shapes acquire in a repeating sequence that stops on completion.
- [ ] **PS-017** · `SPX-3323` · **Shape-to-Card Morph** — A small geometric icon expands into a content card.
- [ ] **PS-018** · `SPX-3324` · **Shape Field Background** — A restrained static field of primitive shapes supports a focused foreground state.

## Console Boot / System Identity

- [x] **PS-019** · `SPX-3325` · **System Boot Glow** — A dark surface develops a restrained blue-white glow before the main UI resolves.
- [ ] **PS-020** · `SPX-3326` · **Cold Boot Sequence** — Several minimal system states progress from blank screen to ready state.
- [ ] **PS-021** · `SPX-3327` · **Resume-from-Rest Wake** — A sleeping interface brightens and restores the previous focused object.
- [ ] **PS-022** · `SPX-3328` · **System Ready Resolve** — Loading marks collapse into a clean ready indicator.
- [ ] **PS-023** · `SPX-3329` · **Safe Mode Entrance** — Normal system styling compresses into a sparse diagnostic state.
- [ ] **PS-024** · `SPX-3330` · **Shutdown Fade** — UI elements dim in ordered layers before the surface goes black.
- [ ] **PS-025** · `SPX-3331` · **Restart Loop Handoff** — Shutdown state transitions directly into a fresh boot sequence.

## Game Launch / Resume

- [x] **PS-026** · `SPX-3332` · **Game Launch Zoom** — A selected game tile expands toward the viewport and hands off into a launch surface.
- [x] **PS-027** · `SPX-3333` · **Resume Activity Handoff** — An activity card becomes the active full-size game/task state.
- [ ] **PS-028** · `SPX-3334` · **Launch Progress Sweep** — A thin determinate indicator travels beneath title identity during launch.
- [ ] **PS-029** · `SPX-3335` · **Launch Failure Recoil** — A failed launch returns cleanly to the original tile with an error state.
- [ ] **PS-030** · `SPX-3336` · **Quick Resume Snapshot** — A paused snapshot-like card expands into an active resumed state.
- [ ] **PS-031** · `SPX-3337` · **Game Close Return** — Exiting a game reconstructs its original home tile and focus position.
- [ ] **PS-032** · `SPX-3338` · **Title Splash Resolve** — A large title treatment recedes into the active game/app interface.

## Activity Cards / Progress

- [x] **PS-033** · `SPX-3339` · **Activity Progress Fill** — A card shows objective progress filling toward a fixed completion boundary.
- [x] **PS-034** · `SPX-3340` · **Activity Complete Burst** — A completed activity receives a concise celebratory geometric burst.
- [x] **PS-035** · `SPX-3341` · **Objective Step Advance** — One completed step sends focus/progress into the next objective.
- [ ] **PS-036** · `SPX-3342` · **Activity Time Estimate Tick** — Estimated time updates with a small finite numeric transition.
- [ ] **PS-037** · `SPX-3343` · **Activity Pin** — A selected objective becomes persistently attached to a compact tracking surface.
- [x] **PS-038** · `SPX-3344` · **Activity Expand Details** — A compact objective card expands to expose tasks, rewards and actions.
- [ ] **PS-039** · `SPX-3345` · **Activity Dismiss Collapse** — A completed/dismissed card compresses away and remaining cards close the gap.
- [ ] **PS-040** · `SPX-3346` · **Multi-Activity Rail** — Several objectives navigate horizontally with exact snapping.

## Trophies / Achievements

- [x] **PS-041** · `SPX-3347` · **Trophy Unlock Pop** — A compact trophy-like achievement notification enters, shines once and settles.
- [x] **PS-042** · `SPX-3348` · **Rare Trophy Reveal** — A higher-tier achievement uses a more elaborate but finite reveal.
- [ ] **PS-043** · `SPX-3349` · **Trophy Progress Ring** — Progress toward an achievement fills around a compact emblem.
- [ ] **PS-044** · `SPX-3350` · **Trophy Tier Ascend** — Achievement treatment transforms from lower to higher tier.
- [ ] **PS-045** · `SPX-3351` · **Trophy List Acquisition** — Newly earned entry inserts into a trophy list with clear chronology.
- [ ] **PS-046** · `SPX-3352` · **Platinum-Style Completion** — Completing the final achievement transforms the collection into a master completion state.
- [ ] **PS-047** · `SPX-3353` · **Hidden Trophy Reveal** — A secret achievement removes its concealed treatment after unlock.
- [ ] **PS-048** · `SPX-3354` · **Trophy Compare** — Two players' achievement progress expands into a side-by-side comparison.

## Downloads / Installs / Updates

- [x] **PS-049** · `SPX-3355` · **Download Progress Ring** — A determinate circular progress indicator fills around a content icon.
- [x] **PS-050** · `SPX-3356` · **Download Queue Advance** — Completion hands active queue status to the next item.
- [ ] **PS-051** · `SPX-3357` · **Install Phase Transition** — Download progress converts into an installation phase without resetting context.
- [ ] **PS-052** · `SPX-3358` · **Copying/Processing Progress** — A secondary processing state uses a distinct progress treatment.
- [ ] **PS-053** · `SPX-3359` · **Download Complete Morph** — Progress control resolves into a ready/play state.
- [ ] **PS-054** · `SPX-3360` · **Pause Download Toggle** — Active progress freezes into a paused state and resumes cleanly.
- [ ] **PS-055** · `SPX-3361` · **Download Error Recovery** — Failed progress becomes retry state then returns to determinate progress.
- [ ] **PS-056** · `SPX-3362` · **Update Available Badge** — A compact update marker appears without shifting card layout.
- [ ] **PS-057** · `SPX-3363` · **Storage Required Warning** — Insufficient storage interrupts the queue with a clear requirement state.

## DualSense / Controller Feedback Visuals

- [ ] **PS-058** · `SPX-3364` · **Adaptive Trigger Meter** — A control visually gains increasing resistance as a hold action approaches its threshold.
- [ ] **PS-059** · `SPX-3365` · **Haptic Pulse Visualizer** — A button/action produces a short wave pattern representing tactile feedback.
- [ ] **PS-060** · `SPX-3366` · **Controller Connection Acquire** — A disconnected controller icon transforms into active input state.
- [ ] **PS-061** · `SPX-3367` · **Battery Low Pulse** — Controller battery state escalates into a restrained warning pulse.
- [ ] **PS-062** · `SPX-3368` · **Input Source Switch** — UI changes from keyboard/touch to controller prompts with a finite handoff.
- [ ] **PS-063** · `SPX-3369` · **Trigger Breakpoint Confirm** — A hold action crosses a visible resistance notch before committing.
- [ ] **PS-064** · `SPX-3370` · **Stick Direction Halo** — Directional input moves a bounded halo around a central control.
- [ ] **PS-065** · `SPX-3371` · **Controller Reconnect** — Lost-input overlay resolves immediately when the controller returns.

## Remote / TV Focus Navigation

- [x] **PS-066** · `SPX-3372` · **Directional Focus Travel** — Focus moves between cards with motion aligned to the user's directional input.
- [x] **PS-067** · `SPX-3373` · **Focus Halo Settle** — A soft bright focus boundary catches up to the newly selected object.
- [ ] **PS-068** · `SPX-3374` · **Row-to-Row Focus Jump** — Vertical navigation preserves approximate horizontal position.
- [ ] **PS-069** · `SPX-3375` · **Edge Resistance** — Input against a grid boundary produces restrained spatial resistance.
- [ ] **PS-070** · `SPX-3376` · **Focus Scale Lift** — Selected object grows slightly while retaining surrounding layout.
- [ ] **PS-071** · `SPX-3377` · **Back Navigation Restore** — Returning from details restores the exact previous focus target.
- [ ] **PS-072** · `SPX-3378` · **Long-Press Secondary Action** — Holding a controller action reveals an anchored secondary state.

## Cards / Media Tiles

- [x] **PS-073** · `SPX-3379` · **Media Card Focus Expand** — Focused card expands to reveal richer metadata and actions.
- [x] **PS-074** · `SPX-3380` · **Card-to-Details Morph** — A compact tile becomes a larger information surface with spatial continuity.
- [ ] **PS-075** · `SPX-3381` · **Card Artwork Parallax** — Abstract artwork layers move subtly as focus shifts.
- [x] **PS-076** · `SPX-3382` · **Neighbour Push-Out** — Adjacent cards move aside when the selected tile needs more space.
- [x] **PS-077** · `SPX-3383` · **Card Collapse Return** — Expanded tile reconstructs its exact original geometry.
- [ ] **PS-078** · `SPX-3384` · **Metadata Cascade** — Title, status and actions appear in a short hierarchy-driven stagger.
- [ ] **PS-079** · `SPX-3385` · **Card Badge Acquire** — Small status metadata enters without layout shift.

## PlayStation Store / Commerce

- [ ] **PS-080** · `SPX-3386` · **Store Hero Crossfade** — Featured product context exchanges through a restrained cinematic crossfade.
- [ ] **PS-081** · `SPX-3387` · **Price Drop Reveal** — A changed price receives a concise acquisition treatment.
- [ ] **PS-082** · `SPX-3388` · **Add-to-Cart Morph** — Purchase action transforms into a persistent cart state.
- [ ] **PS-083** · `SPX-3389` · **Purchase Confirm Hold** — A hold-to-confirm interaction fills toward a purchase threshold.
- [ ] **PS-084** · `SPX-3390` · **Cart Item Transfer** — Selected product visually moves into a cart indicator.
- [ ] **PS-085** · `SPX-3391` · **Wishlist Save Morph** — Save action converts from neutral into persistent saved state.
- [ ] **PS-086** · `SPX-3392` · **Edition Compare Expand** — Product editions unfold into a side-by-side feature comparison.
- [ ] **PS-087** · `SPX-3393` · **Sale Countdown** — A finite promotion timer moves through calm and urgent states.

## Library / Collection

- [ ] **PS-088** · `SPX-3394` · **Library Grid Focus** — Focus moves through a dense game grid with strong controller readability.
- [ ] **PS-089** · `SPX-3395` · **Installed Filter Reflow** — Changing a filter deterministically rearranges the library grid.
- [ ] **PS-090** · `SPX-3396` · **Recently Played Reorder** — Cards move to new positions while preserving identity.
- [ ] **PS-091** · `SPX-3397` · **Collection Folder Expand** — A compact collection tile unfolds into its member games.
- [ ] **PS-092** · `SPX-3398` · **Hidden Game Collapse** — A hidden title retracts from the visible collection.
- [ ] **PS-093** · `SPX-3399` · **Library Search Acquire** — Search field expands and filters the grid live.
- [ ] **PS-094** · `SPX-3400` · **Sort Transition** — Changing sort order moves cards rather than replacing them abruptly.

## Friends / Parties / Social

- [ ] **PS-095** · `SPX-3401` · **Friend Online Toast** — A compact friend-status notification enters and dismisses.
- [ ] **PS-096** · `SPX-3402` · **Party Join Handoff** — A party card expands into an active voice/session state.
- [ ] **PS-097** · `SPX-3403` · **Voice Activity Pulse** — Active speaker receives a bounded audio-reactive-looking pulse using deterministic animation.
- [ ] **PS-098** · `SPX-3404` · **Party Member Join** — A new member chip enters the session roster.
- [ ] **PS-099** · `SPX-3405` · **Party Member Leave** — Departing member retracts and remaining members close the gap.
- [ ] **PS-100** · `SPX-3406` · **Invite Sent Confirmation** — Invite action transforms into sent/pending state.
- [ ] **PS-101** · `SPX-3407` · **Share Session Card** — A shared-play/session card expands into a richer connection state.

## Notifications

- [ ] **PS-102** · `SPX-3408` · **System Notification Slide** — A compact notification slides into a corner/edge and times out cleanly.
- [ ] **PS-103** · `SPX-3409` · **Screenshot Saved Toast** — Capture confirmation arrives with a tiny preview placeholder.
- [ ] **PS-104** · `SPX-3410` · **Recording Started Indicator** — A persistent recording state appears without obscuring the active surface.
- [ ] **PS-105** · `SPX-3411` · **Recording Saved Confirmation** — Capture state resolves into a saved notification.
- [ ] **PS-106** · `SPX-3412` · **Friend Request Notification** — A social request arrives with accept/decline actions.
- [ ] **PS-107** · `SPX-3413` · **Download Complete Toast** — Finished download receives a concise ready-state notification.
- [ ] **PS-108** · `SPX-3414` · **Trophy Notification** — Achievement card arrives with tier and title hierarchy.
- [ ] **PS-109** · `SPX-3415` · **Controller Disconnected Alert** — Input loss produces a high-priority modal-like interruption.

## Capture / Share

- [ ] **PS-110** · `SPX-3416` · **Screenshot Capture Flash** — A single controlled shutter-like flash confirms capture.
- [ ] **PS-111** · `SPX-3417` · **Capture Thumbnail Flyout** — A small captured-frame placeholder travels into a saved-preview corner.
- [ ] **PS-112** · `SPX-3418` · **Recording Timer Acquire** — A recording timer appears and becomes persistent.
- [ ] **PS-113** · `SPX-3419` · **Share Sheet Rise** — Share destinations rise from the bottom into an anchored panel.
- [ ] **PS-114** · `SPX-3420` · **Clip Trim Handles** — Timeline trim controls acquire around a selected clip range.
- [ ] **PS-115** · `SPX-3421` · **Upload Progress Morph** — Share action becomes determinate upload progress then success.
- [ ] **PS-116** · `SPX-3422` · **Broadcast Live State** — A compact live indicator and viewer count settle into the active surface.

## Audio / Media Controls

- [ ] **PS-117** · `SPX-3423` · **Volume Step Pulse** — Volume changes create finite stepped bar feedback.
- [ ] **PS-118** · `SPX-3424` · **Mute Toggle Morph** — Audio control changes between active and muted states.
- [ ] **PS-119** · `SPX-3425` · **Media Control Strip** — Playback controls rise into a compact overlay.
- [ ] **PS-120** · `SPX-3426` · **Music Track Change** — Current track metadata slides into the next selection.
- [ ] **PS-121** · `SPX-3427` · **Audio Output Switch** — Output device selection hands state from one device card to another.
- [ ] **PS-122** · `SPX-3428` · **Mic Mute Confirmation** — Microphone state changes with immediate high-clarity feedback.

## Accessibility / System Settings

- [ ] **PS-123** · `SPX-3429` · **Setting Toggle Snap** — A system setting switches with a crisp finite state change.
- [ ] **PS-124** · `SPX-3430` · **Text Size Preview** — Adjusting text scale updates a bounded live preview.
- [ ] **PS-125** · `SPX-3431` · **High Contrast Mode Morph** — A preview surface transforms between normal and high-contrast states.
- [ ] **PS-126** · `SPX-3432` · **Screen Reader Focus March** — Focus indicator advances through elements in reading order.
- [ ] **PS-127** · `SPX-3433` · **Accessibility Shortcut Hold** — Holding a shortcut builds toward an accessibility action.
- [ ] **PS-128** · `SPX-3434` · **Preset Apply Sweep** — Several settings update together after a preset is selected.

## Rest Mode / Power States

- [ ] **PS-129** · `SPX-3435` · **Rest Mode Dim** — The interface gradually reduces luminance and activity into a sleeping state.
- [ ] **PS-130** · `SPX-3436` · **Wake from Rest** — Previous state restores from darkness with focus intact.
- [ ] **PS-131** · `SPX-3437` · **Power Menu Rise** — Power actions appear in a compact anchored strip.
- [ ] **PS-132** · `SPX-3438` · **Shutdown Countdown** — A short finite countdown communicates imminent power-off.
- [ ] **PS-133** · `SPX-3439` · **Controller Sleep** — Controller indicator dims separately from the main system.
- [ ] **PS-134** · `SPX-3440` · **Auto-Rest Warning** — Idle state produces a warning before sleeping.

## Network / Connectivity

- [ ] **PS-135** · `SPX-3441` · **Network Lost Takeover** — Active content recedes into a clear offline state.
- [ ] **PS-136** · `SPX-3442` · **Reconnect Pulse** — Connection recovery travels through a finite network-node sequence.
- [ ] **PS-137** · `SPX-3443` · **Latency Meter Escalation** — Connection quality moves through stable/warning/critical bands.
- [ ] **PS-138** · `SPX-3444` · **Wi-Fi Signal Acquire** — Signal arcs build as connection establishes.
- [ ] **PS-139** · `SPX-3445` · **Party Connection Retry** — Social session error transitions into reconnection progress.
- [ ] **PS-140** · `SPX-3446` · **Cloud Sync Progress** — Local and cloud nodes exchange a determinate sync signal.
- [ ] **PS-141** · `SPX-3447` · **Cloud Conflict Reveal** — Two save states expand into a clear conflict comparison.

## Save Data / Cloud

- [ ] **PS-142** · `SPX-3448` · **Autosave Spinner** — A tiny finite spinner communicates active save without interrupting play.
- [ ] **PS-143** · `SPX-3449` · **Save Complete Tick** — Autosave resolves into a brief stable confirmation.
- [ ] **PS-144** · `SPX-3450` · **Cloud Upload Transfer** — A local save token travels into a cloud destination.
- [ ] **PS-145** · `SPX-3451` · **Cloud Download Transfer** — Remote save state reconstructs into the local slot.
- [ ] **PS-146** · `SPX-3452` · **Save Conflict Compare** — Two save versions expand side-by-side with timestamp/progress differences.
- [ ] **PS-147** · `SPX-3453` · **Storage Slot Fill** — Save usage meter advances as data is added.
- [ ] **PS-148** · `SPX-3454` · **Delete Save Hold** — Destructive save removal requires a visible hold threshold.

## Errors / Recovery

- [ ] **PS-149** · `SPX-3455` · **Game Crash Recovery** — Active content collapses into an error report state with clear next actions.
- [ ] **PS-150** · `SPX-3456` · **Launch Error Recoil** — Failed launch returns to the originating tile and exposes retry.
- [ ] **PS-151** · `SPX-3457` · **Network Error Overlay** — Online-dependent content enters a bounded disconnected state.
- [ ] **PS-152** · `SPX-3458` · **Storage Full Warning** — Install/download progress halts and reveals storage requirements.
- [ ] **PS-153** · `SPX-3459` · **Controller Required Alert** — Interaction pauses until an input device is connected.
- [ ] **PS-154** · `SPX-3460` · **License Verification Wait** — Protected content enters a finite verification state.
- [ ] **PS-155** · `SPX-3461` · **Retry-to-Ready Transition** — Error action becomes loading and then resolves into ready state.

## PSVR / Spatial UI

- [ ] **PS-156** · `SPX-3462` · **Gaze Focus Acquire** — A spatial card gains focus after a short gaze dwell.
- [ ] **PS-157** · `SPX-3463` · **Dwell-to-Select Ring** — A radial timer fills around a target before activation.
- [ ] **PS-158** · `SPX-3464` · **Depth Card Approach** — A selected card moves closer in depth while neighbours remain back.
- [ ] **PS-159** · `SPX-3465` · **Spatial Menu Fan** — Options spread around a central gaze target.
- [ ] **PS-160** · `SPX-3466` · **Recenter Confirmation** — A horizon/reticle recenters with a finite snap.
- [ ] **PS-161** · `SPX-3467` · **Boundary Warning** — Approaching a virtual safety boundary creates escalating edge geometry.
- [ ] **PS-162** · `SPX-3468` · **VR Loading Cocoon** — A comfortable static loading environment replaces high-motion transitions.

## Classic PlayStation Memory / Retro

- [ ] **PS-163** · `SPX-3469` · **Memory Card Save Pulse** — A retro-inspired save slot flashes through a finite write sequence.
- [ ] **PS-164** · `SPX-3470` · **Memory Card Slot Insert** — A small data card slides into a slot and locks.
- [ ] **PS-165** · `SPX-3471` · **Disc Spin Loader** — An abstract disc rotates during loading and brakes to a stop.
- [ ] **PS-166** · `SPX-3472` · **Disc Read Error** — Disc-like loader stutters into a readable failure state.
- [ ] **PS-167** · `SPX-3473` · **Classic Menu Cursor Snap** — A sharp selection cursor jumps between list rows.
- [ ] **PS-168** · `SPX-3474` · **Boot Grid Resolve** — Minimal geometric marks assemble into a ready menu.
- [ ] **PS-169** · `SPX-3475` · **Retro Save Slot Select** — Multiple save slots acquire one at a time with controller focus.
- [ ] **PS-170** · `SPX-3476` · **Disc Eject Transition** — Active media state retracts into an ejected/idle state.

## Blue / White Ambient Motion

- [ ] **PS-171** · `SPX-3477` · **Blue Light Sweep** — A restrained blue-white light band travels across a dark surface to reveal state.
- [ ] **PS-172** · `SPX-3478` · **Ambient Particle Drift** — A tiny deterministic field of soft points supports an idle system surface.
- [ ] **PS-173** · `SPX-3479` · **Soft Wave Background** — Layered abstract waves move once during a state transition.
- [ ] **PS-174** · `SPX-3480` · **Focus Glow Expansion** — Selected object receives a soft luminous boundary that grows then settles.
- [ ] **PS-175** · `SPX-3481` · **White Flash Resolve** — A brief controlled white reveal resolves into clean content.
- [ ] **PS-176** · `SPX-3482` · **Blue Depth Curtain** — Dark-blue layers separate to reveal deeper content.

## Game-Specific System-Like Inspirations

- [ ] **PS-177** · `SPX-3483` · **Astro-Style Joyful Pop** — A playful system notification uses springy geometric pieces and a crisp settle.
- [ ] **PS-178** · `SPX-3484` · **Gran-Turismo-Style Precision Gauge** — A technical circular gauge sweeps to an exact value with instrument-like restraint.
- [ ] **PS-179** · `SPX-3485` · **Ghost-Style Wind Navigation** — Directional particles/lines guide attention toward the next action.
- [ ] **PS-180** · `SPX-3486` · **God-of-War-Style Rune Lock** — Original angular marks align around a protected action.
- [ ] **PS-181** · `SPX-3487` · **Horizon-Style Focus Scan** — A scanning reticle reveals metadata around a selected target.
- [ ] **PS-182** · `SPX-3488` · **Spider-Style Web Connection** — Abstract connecting strands build between related nodes.
- [ ] **PS-183** · `SPX-3489` · **Returnal-Style Loop Reset** — A failed sequence snaps back to its initial state while preserving one learned marker.
- [ ] **PS-184** · `SPX-3490` · **Ratchet-Style Rift Transition** — Content is pulled through a dimensional slit and reconstructs elsewhere.
- [ ] **PS-185** · `SPX-3491` · **LittleBigPlanet-Style Sticker Pop** — A paper/sticker-like badge attaches to a card with tactile squash.
- [ ] **PS-186** · `SPX-3492` · **Dreams-Style Cursor Trail** — A soft creative cursor leaves a short deterministic trail.

## Loading / Progress

- [ ] **PS-187** · `SPX-3493` · **System Ring Loader** — A clean circular indicator runs during a bounded system operation.
- [ ] **PS-188** · `SPX-3494` · **Shape Sequence Loader** — Primitive geometric symbols animate in sequence and freeze at completion.
- [ ] **PS-189** · `SPX-3495` · **Game Launch Loader** — Title identity remains visible while a determinate launch strip advances.
- [ ] **PS-190** · `SPX-3496` · **Cloud Sync Loader** — Two endpoints exchange a signal until sync completes.
- [ ] **PS-191** · `SPX-3497` · **Install Phase Loader** — One progress control changes label/geometry between download and install.
- [ ] **PS-192** · `SPX-3498` · **Activity Completion Loader** — Objective progress closes into a completed badge.
- [ ] **PS-193** · `SPX-3499` · **Store Content Skeleton** — Cards resolve from placeholders into populated product tiles.

## Transitions

- [ ] **PS-194** · `SPX-3500` · **Tile-to-Fullscreen Zoom** — A focused tile grows into the next surface with origin continuity.
- [ ] **PS-195** · `SPX-3501` · **Bottom Control Rise** — A secondary system layer rises while the current context stays visible.
- [ ] **PS-196** · `SPX-3502` · **Blue Wave Wipe** — A restrained blue geometric wave masks a page transition.
- [ ] **PS-197** · `SPX-3503` · **Shape Scatter Wipe** — Primitive symbols scatter across the viewport and clear into destination.
- [ ] **PS-198** · `SPX-3504` · **Card Stack Push** — A new system layer pushes the previous layer backward in depth.
- [ ] **PS-199** · `SPX-3505` · **Focus Tunnel Transition** — Surrounding content dims as the selected object expands toward the user.
- [ ] **PS-200** · `SPX-3506` · **Black-to-Blue Wake** — Dark screen develops a blue ambient field before content appears.
- [ ] **PS-201** · `SPX-3507` · **Quick Switch Slide** — Recent app/game cards slide laterally into the active position.

## Experimental Software Mappings

- [ ] **PS-202** · `SPX-3508` · **Control Center as Command Palette** — A bottom quick-access layer exposes contextual system actions without leaving work.
- [ ] **PS-203** · `SPX-3509` · **Activity Cards as Task Objectives** — Project tasks become progress-aware cards with time estimates and direct resume actions.
- [ ] **PS-204** · `SPX-3510` · **Trophy Unlock as Milestone Achievement** — Product milestones receive concise celebratory unlock feedback.
- [ ] **PS-205** · `SPX-3511` · **Game Resume as Workspace Resume** — A suspended workspace snapshot expands directly back into active work.
- [ ] **PS-206** · `SPX-3512` · **Home Tiles as Project Switcher** — Large focused cards switch between projects while contextual background changes.
- [ ] **PS-207** · `SPX-3513` · **DualSense Trigger as Hold-to-Commit** — Increasing resistance visualises commitment toward a consequential action.
- [ ] **PS-208** · `SPX-3514` · **Cloud Sync as Distributed State** — Local and remote state visibly reconcile through transfer and conflict handling.
- [ ] **PS-209** · `SPX-3515` · **Focus Navigation as TV/Kiosk UI** — Directional spatial focus becomes a reusable keyboard/remote navigation primitive.
- [ ] **PS-210** · `SPX-3516` · **Download Queue as Job Queue** — Background builds/exports move through queued, active, processing and ready states.
- [ ] **PS-211** · `SPX-3517` · **Trophies as Learning Progress** — Achievements become certifications, completed modules or mastery markers.
- [ ] **PS-212** · `SPX-3518` · **PSVR Dwell as Hands-Free Selection** — Gaze/dwell timing becomes a general accessible selection primitive.
- [ ] **PS-213** · `SPX-3519` · **Shape Loader as Brand-Neutral System Loader** — Geometric sequence becomes a portable loading motif.
- [ ] **PS-214** · `SPX-3520` · **Capture Flyout as Snapshot Confirmation** — Screenshots/exported states visibly travel into a saved history.
- [ ] **PS-215** · `SPX-3521` · **Rest Mode as Suspended Process** — An active workspace dims into suspended state and restores exactly.
- [ ] **PS-216** · `SPX-3522` · **Rift Transition as Cross-Workspace Transfer** — An object disappears through a slit and reconstructs in another context.
