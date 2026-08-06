# Netflix Specimen Checklist

> Working backlog for portable motion/UI artifacts inspired by modern streaming interfaces (Netflix as primary reference): cinematic identity, content rails, expanding previews, playback chrome, skip/next-up, profiles, progress, downloads, TV focus, and vertical discovery. Interaction primitives, not product replicas. Avoid Netflix logos, wordmarks, Netflix Sans, proprietary artwork, show/movie imagery, copyrighted video/audio, or pixel-copied production screens. Use original placeholder titles, generic media cards, and abstract geometry.

## How to use

- **NF-NNN** — stable catalogue id (this list).
- **SPX-NNN** — specimen registry ref. Unbuilt ideas are pre-assigned `SPX-3110`…`SPX-3306` — use that ref when implementing; do not invent a different number.
- Non-catalogue specimens (other franchises / originals) use gaps not reserved by open P5 (`SPX-015`–`SPX-312`), P3 (`SPX-400`–`SPX-635`), PK (`SPX-700`–`SPX-965`), DB (`SPX-966`–`SPX-1209`), IOS (`SPX-1300`–`SPX-1557`), AND (`SPX-1558`–`SPX-1974`), MHA (`SPX-1975`–`SPX-2343`), NR (`SPX-2344`–`SPX-2918`), P4 (`SPX-2919`–`SPX-3109`), or open NF rows; prefer leftover `SPX-313`–`SPX-399`, `SPX-636`–`SPX-699`, `SPX-1210`–`SPX-1299`, or `SPX-3523+` (PS reserves `SPX-3307`–`SPX-3522`).
- Mark **`[x]`** only when the specimen is registered in `src/specimens/index.ts` with a real `ref` (not `SPX-TODO`) and verified. Agents must update this file in the same change — see `.cursor/rules/37_persona-catalogue.mdc`.
- Progress: **18 / 197** complete.

| Status | Count |
| --- | --- |
| Done | 18 |
| Open | 179 |

## Visual grammar

| Motif | Use for |
| --- | --- |
| Cinematic identity | brand/product arrival without logo lockup |
| Profile / identity | workspace or account switchers |
| Hero / featured | featured object staging |
| Rails / carousels | horizontal category browsing |
| Preview expand | rich inspection without navigation |
| Playback chrome | controls that yield to content |
| Scrub / timeline | time-based inspection |
| Skip / next-up | contextual shortcuts and timed handoffs |
| Progress / downloads | resumable and background jobs |
| TV focus / vertical clips | directional focus and mobile discovery |

## Shipped (mapped to live specimens)

| NF | SPX | Specimen id | Title |
| --- | --- | --- | --- |
| NF-123 | `SPX-3232` | `oversized-rank-numeral` | Oversized Rank Numeral |
| NF-098 | `SPX-3207` | `live-result-grid-reflow` | Live Result Grid Reflow |
| NF-097 | `SPX-3206` | `search-field-expand` | Search Field Expand |
| NF-018 | `SPX-3127` | `hero-metadata-cascade` | Hero Metadata Cascade |
| NF-017 | `SPX-3126` | `featured-hero-crossfade` | Featured Hero Crossfade |
| NF-041 | `SPX-3150` | `keyboard-focus-expansion` | Keyboard Focus Expansion |
| NF-037 | `SPX-3146` | `expanded-card-metadata-reveal` | Expanded Card Metadata Reveal |
| NF-036 | `SPX-3145` | `delayed-preview-expansion` | Delayed Preview Expansion |
| NF-075 | `SPX-3184` | `next-episode-countdown` | Next Episode Countdown |
| NF-069 | `SPX-3178` | `skip-intro-appear` | Skip Intro Appear |
| NF-061 | `SPX-3170` | `scrub-preview-thumbnail` | Scrub Preview Thumbnail |
| NF-052 | `SPX-3161` | `playback-controls-fade-in` | Playback Controls Fade-In |
| NF-089 | `SPX-3198` | `details-panel-expand` | Details Panel Expand |
| NF-027 | `SPX-3136` | `rail-page-snap` | Rail Page Snap |
| NF-025 | `SPX-3134` | `horizontal-content-rail` | Horizontal Content Rail |
| NF-040 | `SPX-3149` | `preview-collapse-return` | Preview Collapse Return |
| NF-038 | `SPX-3147` | `neighbour-push-out` | Neighbour Push-Out |
| NF-035 | `SPX-3144` | `preview-card-hover-expand` | Preview Card Hover Expand |

## Core first-wave

Curated implementation priority (Recommended Build Waves A–E / Top 50). Same checkbox as the master list — checking either counts.

### Wave A — Core streaming grammar

- [x] **NF-035** · `SPX-3144` · **Preview Card Hover Expand** — `preview-card-hover-expand`
- [x] **NF-038** · `SPX-3147` · **Neighbour Push-Out** — `neighbour-push-out`
- [x] **NF-040** · `SPX-3149` · **Preview Collapse Return** — `preview-collapse-return`
- [x] **NF-025** · `SPX-3134` · **Horizontal Content Rail** — `horizontal-content-rail`
- [x] **NF-027** · `SPX-3136` · **Rail Page Snap** — `rail-page-snap`
- [x] **NF-089** · `SPX-3198` · **Details Panel Expand** — `details-panel-expand`
- [x] **NF-052** · `SPX-3161` · **Playback Controls Fade-In** — `playback-controls-fade-in`
- [x] **NF-061** · `SPX-3170` · **Scrub Preview Thumbnail** — `scrub-preview-thumbnail`
- [x] **NF-069** · `SPX-3178` · **Skip Intro Appear** — `skip-intro-appear`
- [x] **NF-075** · `SPX-3184` · **Next Episode Countdown** — `next-episode-countdown`

### Wave B — Browse / discovery

- [x] **NF-036** · `SPX-3145` · **Delayed Preview Expansion** — `delayed-preview-expansion`
- [x] **NF-037** · `SPX-3146` · **Expanded Card Metadata Reveal** — `expanded-card-metadata-reveal`
- [x] **NF-041** · `SPX-3150` · **Keyboard Focus Expansion** — `keyboard-focus-expansion`
- [x] **NF-017** · `SPX-3126` · **Featured Hero Crossfade** — `featured-hero-crossfade`
- [x] **NF-018** · `SPX-3127` · **Hero Metadata Cascade** — `hero-metadata-cascade`
- [x] **NF-097** · `SPX-3206` · **Search Field Expand** — `search-field-expand`
- [x] **NF-098** · `SPX-3207` · **Live Result Grid Reflow** — `live-result-grid-reflow`
- [x] **NF-123** · `SPX-3232` · **Oversized Rank Numeral** — `oversized-rank-numeral`
- [ ] **NF-124** · `SPX-3233` · **Rank Change Slide** — `rank-change-slide`
- [ ] **NF-156** · `SPX-3265` · **Directional Focus Travel** — `directional-focus-travel`

### Wave C — Playback

- [ ] **NF-044** · `SPX-3153` · **Autoplay Preview Countdown** — `autoplay-preview-countdown`
- [ ] **NF-045** · `SPX-3154` · **Preview Start Crossfade** — `preview-start-crossfade`
- [ ] **NF-054** · `SPX-3163` · **Ten-Second Seek Ripple** — `ten-second-seek-ripple`
- [ ] **NF-059** · `SPX-3168` · **Controls Idle Dissolve** — `controls-idle-dissolve`
- [ ] **NF-062** · `SPX-3171` · **Timeline Hover Preview** — `timeline-hover-preview`
- [ ] **NF-070** · `SPX-3179` · **Skip Intro Commit** — `skip-intro-commit`
- [ ] **NF-076** · `SPX-3185` · **Next-Up Cancel** — `next-up-cancel`
- [ ] **NF-081** · `SPX-3190` · **Binge Continuation Transition** — `binge-continuation-transition`
- [ ] **NF-082** · `SPX-3191` · **Minimal Buffer Spinner** — `minimal-buffer-spinner`
- [ ] **NF-083** · `SPX-3192` · **Buffer-to-Playback Resolve** — `buffer-to-playback-resolve`

### Wave D — State and personalisation

- [ ] **NF-009** · `SPX-3118` · **Who's Watching Grid Focus** — `whos-watching-grid-focus`
- [ ] **NF-010** · `SPX-3119` · **Profile Avatar Select Snap** — `profile-avatar-select-snap`
- [ ] **NF-105** · `SPX-3214` · **Match Confidence Meter** — `match-confidence-meter`
- [ ] **NF-106** · `SPX-3215` · **Thumb Rating Feedback** — `thumb-rating-feedback`
- [ ] **NF-111** · `SPX-3220` · **Add-to-List Confirmation** — `add-to-list-confirmation`
- [ ] **NF-112** · `SPX-3221` · **Remove-from-List Undo** — `remove-from-list-undo`
- [ ] **NF-117** · `SPX-3226` · **Resume Playback Handoff** — `resume-playback-handoff`
- [ ] **NF-118** · `SPX-3227` · **Continue-Watching Progress Bar** — `continue-watching-progress-bar`
- [ ] **NF-093** · `SPX-3202` · **Details Close Return** — `details-close-return`
- [ ] **NF-159** · `SPX-3268` · **Back Navigation Return** — `back-navigation-return`

### Wave E — Errors, mobile and cinematic polish

- [ ] **NF-135** · `SPX-3244` · **Playback Error Takeover** — `playback-error-takeover`
- [ ] **NF-136** · `SPX-3245` · **Retry-to-Buffer Transition** — `retry-to-buffer-transition`
- [ ] **NF-137** · `SPX-3246` · **Network Lost Overlay** — `network-lost-overlay`
- [ ] **NF-142** · `SPX-3251` · **Vertical Clip Snap** — `vertical-clip-snap`
- [ ] **NF-143** · `SPX-3252` · **Clip-to-Title Handoff** — `clip-to-title-handoff`
- [ ] **NF-149** · `SPX-3258` · **Download Progress Ring** — `download-progress-ring`
- [ ] **NF-150** · `SPX-3259` · **Download Complete Morph** — `download-complete-morph`
- [ ] **NF-001** · `SPX-3110` · **Cinematic Ribbon Reveal** — `cinematic-ribbon-reveal`
- [ ] **NF-002** · `SPX-3111` · **Vertical Light-Bar Intro** — `vertical-light-bar-intro`
- [ ] **NF-090** · `SPX-3199` · **More Info Overlay** — `more-info-overlay`

## 1. Brand / Cinematic Identity

- [ ] **NF-001** · `SPX-3110` · **Cinematic Ribbon Reveal** — Thin luminous planes stretch, fold and resolve into a restrained brand or product reveal
- [ ] **NF-002** · `SPX-3111` · **Vertical Light-Bar Intro** — A narrow vertical bar opens into layered light and then collapses into the destination surface
- [ ] **NF-003** · `SPX-3112` · **Soundless Impact Ident** — A short three-beat visual ident communicates arrival without requiring audio
- [ ] **NF-004** · `SPX-3113` · **Letterform Slice Reveal** — Large generic typography is revealed through moving vertical slices
- [ ] **NF-005** · `SPX-3114` · **Dark-to-Content Bloom** — A near-black canvas gradually exposes the first content region through a controlled luminance bloom
- [ ] **NF-006** · `SPX-3115` · **Title Lockup Resolve** — Separated title fragments align into a final stable lockup
- [ ] **NF-007** · `SPX-3116` · **Cinematic Aperture Open** — A narrow central aperture widens to reveal the application state behind it
- [ ] **NF-008** · `SPX-3117` · **End-Credit Fadeout** — Completed content recedes into a quiet dark state with one persistent action
## 2. Profile / Identity Selection

- [ ] **NF-009** · `SPX-3118` · **Who's Watching Grid Focus** — Profile tiles scale and sharpen as keyboard or pointer focus moves between identities
- [ ] **NF-010** · `SPX-3119` · **Profile Avatar Select Snap** — Selected avatar advances, surrounding profiles recede, and the destination state takes over
- [ ] **NF-011** · `SPX-3120` · **Profile Add Tile Morph** — An add-profile tile transforms into a compact creation form
- [ ] **NF-012** · `SPX-3121` · **Profile Switch Curtain** — Current identity collapses into a dark interstitial before the next profile appears
- [ ] **NF-013** · `SPX-3122` · **Kids/Profile Mode Shift** — Changing profile visibly changes content density and navigation treatment without redesigning the host
- [ ] **NF-014** · `SPX-3123` · **Profile Edit Acquisition** — Edit controls appear only around the currently selected profile
- [ ] **NF-015** · `SPX-3124` · **Profile Lock PIN Reveal** — A selected profile becomes a bounded PIN-entry state
- [ ] **NF-016** · `SPX-3125` · **Profile Success Entry** — Successful identity selection expands into the next surface
## 3. Hero / Featured Content

- [x] **NF-017** · `SPX-3126` · **Featured Hero Crossfade** — One featured title transitions to the next through image-free cinematic planes, copy fades and controlled depth
- [x] **NF-018** · `SPX-3127` · **Hero Metadata Cascade** — Title, metadata, description and actions arrive in a deliberate stagger
- [ ] **NF-019** · `SPX-3128` · **Hero Trailer-to-Poster Settle** — A moving-preview placeholder resolves into a quiet static poster-like state
- [ ] **NF-020** · `SPX-3129` · **Hero Action Focus** — Play and secondary actions acquire focus with strong spatial hierarchy
- [ ] **NF-021** · `SPX-3130` · **Hero Gradient Curtain** — A dark information curtain expands or retracts to reveal more visual space
- [ ] **NF-022** · `SPX-3131` · **Featured Content Swap** — The hero swaps recommendation context while preserving controls and layout anchors
- [ ] **NF-023** · `SPX-3132` · **Hero Info Expand** — A short description grows into richer metadata without navigating away
- [ ] **NF-024** · `SPX-3133` · **Hero Mute Indicator** — A compact audio-state control acquires and releases a visible muted state
## 4. Rows / Carousels

- [x] **NF-025** · `SPX-3134` · **Horizontal Content Rail** — A row of cards moves by one viewport group with clear directional continuity
- [ ] **NF-026** · `SPX-3135` · **Edge Arrow Acquisition** — Carousel navigation appears only when the rail can move in that direction
- [x] **NF-027** · `SPX-3136` · **Rail Page Snap** — A multi-card row translates to the next group and settles on exact card boundaries
- [ ] **NF-028** · `SPX-3137` · **Peek-Next-Card Affordance** — The final partial card hints that more content exists beyond the viewport
- [ ] **NF-029** · `SPX-3138` · **Row Title Reveal** — A category heading gains a compact secondary action on focus
- [ ] **NF-030** · `SPX-3139` · **Rail Momentum Brake** — A fast navigation sequence settles cleanly at the requested group
- [ ] **NF-031** · `SPX-3140` · **Carousel Boundary Resist** — Attempting to move past the first/last page produces restrained resistance
- [ ] **NF-032** · `SPX-3141` · **Row Reorder Transition** — Personalised content changes order while cards retain spatial continuity
- [ ] **NF-033** · `SPX-3142` · **Continue-Watching Rail Advance** — Completed content exits or moves back while remaining titles close the gap
- [ ] **NF-034** · `SPX-3143` · **Top-Rank Rail** — Large rank numerals sit behind cards and shift with the rail
## 5. Hover / Focus Expansion

- [x] **NF-035** · `SPX-3144` · **Preview Card Hover Expand** — Focused content expands while adjacent cards move outward rather than overlap
- [x] **NF-036** · `SPX-3145` · **Delayed Preview Expansion** — A short focus dwell triggers a larger information card only after intent is clear
- [x] **NF-037** · `SPX-3146` · **Expanded Card Metadata Reveal** — An enlarged card exposes actions, match-like metadata and tags beneath the visual
- [x] **NF-038** · `SPX-3147` · **Neighbour Push-Out** — Adjacent cards translate away from an expanding selection while keeping their size
- [ ] **NF-039** · `SPX-3148` · **Card Focus Lift** — A selected card gains scale and depth without starting a full preview
- [x] **NF-040** · `SPX-3149` · **Preview Collapse Return** — Expanded content returns exactly to its rail slot without layout residue
- [x] **NF-041** · `SPX-3150` · **Keyboard Focus Expansion** — The same expansion behaviour works from keyboard focus, not hover alone
- [ ] **NF-042** · `SPX-3151` · **Expansion Edge Compensation** — Cards near viewport edges expand inward so content remains visible
- [ ] **NF-043** · `SPX-3152` · **Action Strip Reveal** — Play/add/info controls slide into the expanded card after its geometry settles
## 6. Autoplay / Preview States

- [ ] **NF-044** · `SPX-3153` · **Autoplay Preview Countdown** — A focused card shows a finite intent delay before its preview state activates
- [ ] **NF-045** · `SPX-3154` · **Preview Start Crossfade** — Static artwork placeholder transitions into a moving-preview surface
- [ ] **NF-046** · `SPX-3155` · **Preview Stop Settle** — Leaving focus returns the card to a stable static state without flashing
- [ ] **NF-047** · `SPX-3156` · **Muted Preview State** — Preview begins with a persistent compact mute indicator
- [ ] **NF-048** · `SPX-3157` · **Preview Progress Strip** — A tiny determinate strip communicates the current preview segment
- [ ] **NF-049** · `SPX-3158` · **Autoplay Disabled State** — The same card expansion remains useful when motion preview is disabled
- [ ] **NF-050** · `SPX-3159` · **Preview Replay** — A finished preview can restart with a compact replay affordance
- [ ] **NF-051** · `SPX-3160` · **Preview-to-Details Handoff** — Expanded preview smoothly becomes a details panel after explicit selection
## 7. Playback Controls

- [x] **NF-052** · `SPX-3161` · **Playback Controls Fade-In** — Pointer/keyboard activity reveals controls over content and inactivity hides them
- [ ] **NF-053** · `SPX-3162` · **Central Play/Pause Pulse** — A brief centre-screen glyph confirms play/pause then disappears
- [ ] **NF-054** · `SPX-3163` · **Ten-Second Seek Ripple** — Seek action creates a bounded directional feedback pulse and time delta
- [ ] **NF-055** · `SPX-3164` · **Volume Slider Acquire** — Audio control expands from icon to slider and collapses after use
- [ ] **NF-056** · `SPX-3165` · **Subtitle Menu Rise** — Caption options rise from the playback control bar into a bounded menu
- [ ] **NF-057** · `SPX-3166` · **Episode Menu Lift** — Episode list emerges above playback controls without leaving playback
- [ ] **NF-058** · `SPX-3167` · **Playback Speed Picker** — Speed options fan into a compact anchored selector
- [ ] **NF-059** · `SPX-3168` · **Controls Idle Dissolve** — Playback chrome fades away while preserving focus safety
- [ ] **NF-060** · `SPX-3169` · **Keyboard Seek Confirmation** — Arrow/shortcut seeking produces visible time-change feedback
## 8. Timeline / Scrubbing

- [x] **NF-061** · `SPX-3170` · **Scrub Preview Thumbnail** — Dragging the progress handle reveals a preview card anchored to the current time
- [ ] **NF-062** · `SPX-3171` · **Timeline Hover Preview** — Pointer movement over the timeline produces a bounded scene-preview proxy
- [ ] **NF-063** · `SPX-3172` · **Progress Handle Acquire** — The tiny playhead grows only while the user is interacting with the timeline
- [ ] **NF-064** · `SPX-3173` · **Buffered Range Reveal** — Loaded and played ranges remain visually distinct
- [ ] **NF-065** · `SPX-3174` · **Chapter Marker Snap** — The scrubber magnetically settles on fixed chapter markers
- [ ] **NF-066** · `SPX-3175` · **Seek Jump Trail** — A rapid seek leaves a finite trail from old position to new position
- [ ] **NF-067** · `SPX-3176` · **Resume Position Marker** — A persistent marker shows where a previous session stopped
- [ ] **NF-068** · `SPX-3177` · **Timeline Completion Sweep** — Reaching the end converts the progress bar into completed state
## 9. Skip / Contextual Actions

- [x] **NF-069** · `SPX-3178` · **Skip Intro Appear** — A contextual Skip Intro action fades/slides in only during the relevant segment
- [ ] **NF-070** · `SPX-3179` · **Skip Intro Commit** — Activating the contextual action rapidly advances the timeline and dismisses itself
- [ ] **NF-071** · `SPX-3180` · **Skip Recap Action** — A temporary skip control appears for recap content and vanishes after use
- [ ] **NF-072** · `SPX-3181` · **Skip Credits Prompt** — Credits trigger a compact action group for continuing or staying
- [ ] **NF-073** · `SPX-3182` · **Context Button Timeout** — A temporary playback action expires cleanly when its window closes
- [ ] **NF-074** · `SPX-3183` · **Context Action Focus** — Keyboard focus preserves a contextual action that would otherwise time out
## 10. Episode / Next-Up

- [x] **NF-075** · `SPX-3184` · **Next Episode Countdown** — A compact next-up card includes a visible finite countdown to automatic continuation
- [ ] **NF-076** · `SPX-3185` · **Next-Up Cancel** — User interaction cancels the countdown and restores the current end-state
- [ ] **NF-077** · `SPX-3186` · **Episode Card Progress** — Each episode card carries its own watched-progress indicator
- [ ] **NF-078** · `SPX-3187` · **Episode Select Handoff** — Selecting another episode transforms the current card into loading/playback state
- [ ] **NF-079** · `SPX-3188` · **Season Switch** — Episode list changes season while preserving the selected row anchor
- [ ] **NF-080** · `SPX-3189` · **Episode Completion Check** — Finished episodes receive a compact completed treatment
- [ ] **NF-081** · `SPX-3190` · **Binge Continuation Transition** — One episode ends, the next-up card takes focus, and playback handoff completes
## 11. Loading / Buffering

- [ ] **NF-082** · `SPX-3191` · **Minimal Buffer Spinner** — A restrained circular loader appears over paused visual content and disappears without layout shift
- [ ] **NF-083** · `SPX-3192` · **Buffer-to-Playback Resolve** — Loading state contracts directly into playback state
- [ ] **NF-084** · `SPX-3193` · **Title Loading Skeleton** — Poster/title placeholders resolve in a staggered but finite sequence
- [ ] **NF-085** · `SPX-3194` · **Rail Lazy-Load Reveal** — New cards appear at the end of a rail as the user approaches
- [ ] **NF-086** · `SPX-3195` · **Connection Slow Warning** — Persistent buffering escalates into a clear network-quality state
- [ ] **NF-087** · `SPX-3196` · **Retry Playback Transition** — An error panel collapses into loading after retry
- [ ] **NF-088** · `SPX-3197` · **Progressive Metadata Load** — Primary title information resolves before secondary metadata
## 12. Title Details / Modal Surfaces

- [x] **NF-089** · `SPX-3198` · **Details Panel Expand** — A selected card grows into a larger details surface while retaining visual continuity
- [ ] **NF-090** · `SPX-3199` · **More Info Overlay** — A dark bounded overlay opens with title metadata and actions
- [ ] **NF-091** · `SPX-3200` · **Details Hero Reveal** — The details surface reveals its title region before secondary sections
- [ ] **NF-092** · `SPX-3201` · **Modal Background Recede** — Underlying browse rows dim and scale subtly while details take focus
- [ ] **NF-093** · `SPX-3202` · **Details Close Return** — Closing the panel reconstructs the exact originating card position
- [ ] **NF-094** · `SPX-3203` · **Metadata Chip Cascade** — Year, rating, runtime and tags appear as a short stagger
- [ ] **NF-095** · `SPX-3204` · **Cast/Genre Expand** — Secondary metadata unfolds only when requested
- [ ] **NF-096** · `SPX-3205` · **Related Titles Rail Reveal** — A secondary recommendation row appears beneath details
## 13. Search / Discovery

- [x] **NF-097** · `SPX-3206` · **Search Field Expand** — A compact search icon expands into a full query field while preserving focus
- [x] **NF-098** · `SPX-3207` · **Live Result Grid Reflow** — Result cards reorganise as the query narrows
- [ ] **NF-099** · `SPX-3208` · **Empty Search State** — No-results state arrives without destroying the search context
- [ ] **NF-100** · `SPX-3209` · **Search Category Filter** — Filter selection visibly restructures the result set
- [ ] **NF-101** · `SPX-3210` · **Voice/Search Listening Pulse** — A finite listening-state pulse communicates active input without recording externally
- [ ] **NF-102** · `SPX-3211` · **Recent Search Restore** — Previous queries slide into the empty search surface
- [ ] **NF-103** · `SPX-3212` · **Search Result Acquire** — Selected result grows into a preview/details state
## 14. Recommendation / Personalisation

- [ ] **NF-104** · `SPX-3213` · **Because-You-Watched Reveal** — A recommendation explanation appears as secondary metadata on focus
- [ ] **NF-105** · `SPX-3214` · **Match Confidence Meter** — A compact confidence-like value fills into place as recommendation context appears
- [ ] **NF-106** · `SPX-3215` · **Thumb Rating Feedback** — A rating action produces immediate finite confirmation and updates the card state
- [ ] **NF-107** · `SPX-3216` · **Preference Feedback Morph** — Rating controls morph from neutral into selected preference state
- [ ] **NF-108** · `SPX-3217` · **Recommendation Row Refresh** — A feedback action causes affected cards to reorder or replace deterministically
- [ ] **NF-109** · `SPX-3218` · **Personalised Rank Shift** — Cards move to new positions while preserving identity and spatial continuity
- [ ] **NF-110** · `SPX-3219` · **Taste Profile Pulse** — A small abstract preference indicator updates after feedback
## 15. My List / Save / Collection

- [ ] **NF-111** · `SPX-3220` · **Add-to-List Confirmation** — A plus-style action morphs into a persistent saved state
- [ ] **NF-112** · `SPX-3221` · **Remove-from-List Undo** — Removing a title exposes a short-lived undo action
- [ ] **NF-113** · `SPX-3222` · **List Card Insert** — A newly saved card enters a collection at a deterministic position
- [ ] **NF-114** · `SPX-3223` · **List Reorder** — Collection cards rearrange with spatial continuity
- [ ] **NF-115** · `SPX-3224` · **Saved State Sync** — The same card's save state visibly updates across two scaffolded locations
- [ ] **NF-116** · `SPX-3225` · **Collection Empty State** — The last removed item transitions the surface into an empty state
## 16. Continue Watching / Progress

- [ ] **NF-117** · `SPX-3226` · **Resume Playback Handoff** — A partially watched card expands and hands off directly to its stored progress point
- [ ] **NF-118** · `SPX-3227` · **Continue-Watching Progress Bar** — A thin progress strip communicates watched position without dominating the card
- [ ] **NF-119** · `SPX-3228` · **Remove-from-Row Collapse** — A dismissed continue-watching card shrinks away and neighbours close the gap
- [ ] **NF-120** · `SPX-3229` · **Completed Title Exit** — Finishing a title changes or removes its row state
- [ ] **NF-121** · `SPX-3230` · **Resume Marker Flash** — A compact marker confirms the stored resume position
- [ ] **NF-122** · `SPX-3231` · **Watch Progress Catch-Up** — A changed progress value animates from old to new state
## 17. Top 10 / Ranking

- [x] **NF-123** · `SPX-3232` · **Oversized Rank Numeral** — A giant numeral anchors behind a content card without obscuring its visual
- [ ] **NF-124** · `SPX-3233` · **Rank Change Slide** — A title moving from one rank to another carries its numeral and card together
- [ ] **NF-125** · `SPX-3234` · **New Entry Rank Burst** — A newly ranked title enters with a compact high-priority marker
- [ ] **NF-126** · `SPX-3235` · **Rank Drop** — A card descends through ranked positions with restrained motion
- [ ] **NF-127** · `SPX-3236` · **Top-Ten Rail Advance** — Ranked cards navigate horizontally while numerals maintain alignment
- [ ] **NF-128** · `SPX-3237` · **Number-to-Card Parallax** — Rank numeral and card move at slightly different rates during rail motion
## 18. Notifications / Toasts

- [ ] **NF-129** · `SPX-3238` · **Playback Error Toast** — A concise playback problem appears over content and dismisses cleanly
- [ ] **NF-130** · `SPX-3239` · **Download Complete Toast** — A finished offline action receives a compact confirmation
- [ ] **NF-131** · `SPX-3240` · **Added-to-List Toast** — Save action produces a temporary secondary confirmation
- [ ] **NF-132** · `SPX-3241` · **Profile Restriction Notice** — Unavailable content receives a clear maturity/access notice
- [ ] **NF-133** · `SPX-3242` · **Network Reconnected Toast** — Connectivity recovery appears briefly without interrupting playback
- [ ] **NF-134** · `SPX-3243` · **New Episode Badge** — Fresh content receives a small temporary acquisition marker
## 19. Error / Recovery

- [ ] **NF-135** · `SPX-3244` · **Playback Error Takeover** — Playback collapses into a clear error surface with retry and exit actions
- [ ] **NF-136** · `SPX-3245` · **Retry-to-Buffer Transition** — Retry converts error state directly into loading
- [ ] **NF-137** · `SPX-3246` · **Network Lost Overlay** — Content dims into an offline state while preserving the playback context
- [ ] **NF-138** · `SPX-3247` · **Unavailable Title State** — A selected title becomes clearly unavailable without destroying navigation
- [ ] **NF-139** · `SPX-3248` · **Profile Restriction Lock** — Restricted content receives a bounded lock treatment
- [ ] **NF-140** · `SPX-3249` · **Error Code Reveal** — Technical error metadata expands only on request
- [ ] **NF-141** · `SPX-3250` · **Graceful Preview Failure** — Failed autoplay preview returns to static card rather than leaving broken media
## 20. Mobile / Vertical Discovery

- [ ] **NF-142** · `SPX-3251` · **Vertical Clip Snap** — Full-height discovery cards snap one at a time during vertical navigation
- [ ] **NF-143** · `SPX-3252` · **Clip-to-Title Handoff** — A short-form discovery card transforms into a title detail surface
- [ ] **NF-144** · `SPX-3253` · **Vertical Action Rail** — Like/save/info controls acquire alongside the active clip
- [ ] **NF-145** · `SPX-3254` · **Swipe-Up Next** — A vertical gesture advances to the next discovery item with strict snap
- [ ] **NF-146** · `SPX-3255` · **Clip Progress Edge** — A subtle edge strip communicates short-form playback progress
- [ ] **NF-147** · `SPX-3256` · **Mobile Nav Compress** — Navigation condenses as vertical discovery takes over
- [ ] **NF-148** · `SPX-3257` · **Tap-to-Unmute Feedback** — A compact muted state responds immediately to user activation
## 21. Downloads / Offline

- [ ] **NF-149** · `SPX-3258` · **Download Progress Ring** — A circular determinate progress control fills around a download action
- [ ] **NF-150** · `SPX-3259` · **Download Complete Morph** — Progress ring resolves into a persistent offline-ready state
- [ ] **NF-151** · `SPX-3260` · **Download Cancel Recoil** — Cancelling reverses the progress control into its idle action
- [ ] **NF-152** · `SPX-3261` · **Offline Badge Acquire** — Downloaded content gains a small stable availability marker
- [ ] **NF-153** · `SPX-3262` · **Download Queue Advance** — Completed item hands queue activity to the next card
- [ ] **NF-154** · `SPX-3263` · **Expired Download Warning** — Offline content enters a clear renewal-required state
## 22. Navigation / TV Focus

- [ ] **NF-155** · `SPX-3264` · **TV Focus Halo** — Remote focus creates a clear scale/border treatment around one selectable item
- [ ] **NF-156** · `SPX-3265` · **Directional Focus Travel** — Focus moves between cards with spatial continuity that mirrors arrow direction
- [ ] **NF-157** · `SPX-3266` · **Focus Row-to-Row Jump** — Moving vertically preserves approximate horizontal intent
- [ ] **NF-158** · `SPX-3267` · **Nav Pill Expand** — A compact navigation item widens to reveal its label on focus
- [ ] **NF-159** · `SPX-3268` · **Back Navigation Return** — Returning from details restores the exact previously focused card
- [ ] **NF-160** · `SPX-3269` · **Focus Boundary Resist** — Directional input at a grid edge produces restrained no-op feedback
- [ ] **NF-161** · `SPX-3270` · **Remote Long-Press State** — A held remote action visibly enters a secondary interaction mode
## 23. Dark Cinematic Transitions

- [ ] **NF-162** · `SPX-3271` · **Black Frame Cut** — A brief black-frame interruption creates a cinematic state change
- [ ] **NF-163** · `SPX-3272` · **Letterbox Close/Open** — Top and bottom dark bars close over one state and reopen onto the next
- [ ] **NF-164** · `SPX-3273` · **Spotlight Reveal** — A bounded region of a dark canvas opens around selected content
- [ ] **NF-165** · `SPX-3274` · **Cinematic Cross-Dissolve** — Two content states exchange through opacity and slight scale
- [ ] **NF-166** · `SPX-3275` · **Hard Cut with Metadata Hold** — Visual content changes instantly while metadata persists then catches up
- [ ] **NF-167** · `SPX-3276` · **Fade-to-Black Completion** — A completed workflow fades into a dark result card
- [ ] **NF-168** · `SPX-3277` · **Trailer-End Title Resolve** — Moving content stops and resolves into a stable title/action layout
## 24. Audio-State Visualisations

- [ ] **NF-169** · `SPX-3278` · **Mute Toggle Confirmation** — Audio state changes with a compact glyph transition
- [ ] **NF-170** · `SPX-3279` · **Volume Step Pulse** — Each discrete volume change creates a finite bar pulse
- [ ] **NF-171** · `SPX-3280` · **Audio Language Switch** — Selected language acquires while old selection retracts
- [ ] **NF-172** · `SPX-3281` · **Subtitle Enabled State** — Caption state receives a stable active indicator
- [ ] **NF-173** · `SPX-3282` · **Spatial Audio Badge Reveal** — A capability badge appears as secondary playback metadata
## 25. Microinteractions

- [ ] **NF-174** · `SPX-3283` · **Play Button Press** — The primary play action compresses and releases with immediate state feedback
- [ ] **NF-175** · `SPX-3284` · **Plus-to-Check Morph** — Save control morphs from add into confirmed state
- [ ] **NF-176** · `SPX-3285` · **Thumb Feedback Pop** — Rating control gives one bounded scale response
- [ ] **NF-177** · `SPX-3286` · **Info Button Acquire** — Secondary information control gains a concise focus treatment
- [ ] **NF-178** · `SPX-3287` · **Card Progress Tick** — A tiny watched-progress change catches up smoothly
- [ ] **NF-179** · `SPX-3288` · **Chevron Rail Nudge** — Carousel arrow responds with directional compression
- [ ] **NF-180** · `SPX-3289` · **Close Button Snap** — Closing a panel gives a fast, exact response
- [ ] **NF-181** · `SPX-3290` · **Focus Border Settle** — Focus outline catches up to a newly selected item
- [ ] **NF-182** · `SPX-3291` · **Badge Reveal** — A small metadata badge enters without shifting neighbouring content
## 26. Experimental Software Mappings

- [ ] **NF-183** · `SPX-3292` · **Content Rail as Project Portfolio** — Horizontal recommendation rows become categories of projects, tools or artifacts
- [ ] **NF-184** · `SPX-3293` · **Preview Card as Rich Object Inspector** — Hover/focus expansion exposes live status and actions for any software object
- [ ] **NF-185** · `SPX-3294` · **Continue Watching as Resume Workflow** — Partially completed work carries a visible progress strip and one-click resume
- [ ] **NF-186** · `SPX-3295` · **Skip Intro as Contextual Shortcut** — A temporary action appears only when a workflow contains a safely skippable phase
- [ ] **NF-187** · `SPX-3296` · **Next Episode as Auto-Advance Workflow** — Completed work offers a timed transition to the next queued task with cancellation
- [ ] **NF-188** · `SPX-3297` · **Top 10 as Priority Ranking** — Oversized numerals communicate ranked incidents, leads or tasks
- [ ] **NF-189** · `SPX-3298` · **Who's Watching as Workspace Switcher** — Profile selection becomes a strong visual workspace/persona selector
- [ ] **NF-190** · `SPX-3299` · **My List as Saved Work Queue** — Save/remove interactions map to a personal shortlist
- [ ] **NF-191** · `SPX-3300` · **Scrub Preview as Timeline Inspector** — Hovering a process timeline previews historical state at that point
- [ ] **NF-192** · `SPX-3301` · **Autoplay Preview as Intent Preview** — Dwell reveals richer object information before explicit navigation
- [ ] **NF-193** · `SPX-3302` · **Recommendation Match as Confidence Score** — Personalisation treatment becomes relevance/confidence for search or AI results
- [ ] **NF-194** · `SPX-3303` · **Episode List as Multi-Step Runbook** — Episodes become ordered workflow stages with progress and resume
- [ ] **NF-195** · `SPX-3304` · **Buffering as Async Job Wait** — Playback buffering language becomes a compact async-operation state
- [ ] **NF-196** · `SPX-3305` · **Details Expand as Object Drilldown** — A small card expands into a richer inspector and returns to origin
- [ ] **NF-197** · `SPX-3306` · **Download Ring as Offline/Export Job** — Determinate download motion maps cleanly to exports, builds and background jobs

## Strong software mappings

- **Content rails → portfolio/catalogue browsing**
- **Hover preview → rich object inspection**
- **Continue Watching → resume workflow**
- **Skip Intro → contextual shortcut**
- **Next Episode → queued auto-advance**
- **Top 10 → priority ranking**
- **Profile picker → workspace switcher**
- **Scrub preview → timeline inspector**
- **Buffering → asynchronous job wait**
- **Details expansion → object drilldown**
- **Download progress → export/build job**
- **Recommendation match → relevance/confidence**

## Playground technical contract

- Plain HTML + CSS preferred; tiny vanilla JS only for state/timing/keyboard/pointer/measurement.
- Must run inside `<iframe sandbox="allow-scripts">`. Never add `allow-same-origin`.
- No parent access, storage, navigation, fetch, or external APIs.
- No external images, fonts, video, or audio. Abstract poster placeholders and CSS/inline SVG only.
- Prefer `deps: 'none'`. Freeze dimensions, timings, easing, thresholds, and copy. No runtime randomness.
- Honour both `prefers-reduced-motion` and `data-force-reduced-motion`.
- Register explicitly in `src/specimens/index.ts`. Do not redesign catalogue chrome.

## Catalogue thesis

The useful lesson from streaming-style motion is **continuity of intent**: cards expand because interest is clear, neighbours move to make room, controls yield to content, skip actions appear only when contextual, and progress persists for return. Specimens should feel browsable, resumable, previewable, and continuous.
