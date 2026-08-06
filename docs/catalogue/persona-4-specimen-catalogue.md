# Persona 4 Specimen Checklist

> Working backlog for portable motion/UI artifacts inspired by Persona 4 visual grammar (yellow/black broadcast, CRT, fog, investigation, calendar pressure, social progression, tarot-like cards, dungeon exploration, battle feedback). Interaction primitives, not game replicas. Avoid copyrighted character art, logos, proprietary title treatments, soundtrack/lyrics, extracted assets, audio, and proprietary fonts.

## How to use

- **P4-NNN** — stable catalogue id (this list).
- **SPX-NNN** — specimen registry ref. Unbuilt ideas are pre-assigned `SPX-2919`…`SPX-3109` — use that ref when implementing; do not invent a different number.
- Non-catalogue specimens (other franchises / originals) use gaps not reserved by open P5 (`SPX-015`–`SPX-312`), P3 (`SPX-400`–`SPX-635`), PK (`SPX-700`–`SPX-965`), DB (`SPX-966`–`SPX-1209`), IOS (`SPX-1300`–`SPX-1557`), AND (`SPX-1558`–`SPX-1974`), MHA (`SPX-1975`–`SPX-2343`), NR (`SPX-2344`–`SPX-2918`), or open P4 rows; prefer leftover `SPX-313`–`SPX-399`, `SPX-636`–`SPX-699`, `SPX-1210`–`SPX-1299`, or `SPX-3110+`.
- Mark **`[x]`** only when the specimen is registered in `src/specimens/index.ts` with a real `ref` (not `SPX-TODO`) and verified. Agents must update this file in the same change — see `.cursor/rules/37_persona-catalogue.mdc`.
- Progress: **9 / 191** complete.

| Status | Count |
| --- | --- |
| Done | 9 |
| Open | 182 |

## Visual grammar

| Motif | Use for |
| --- | --- |
| Midnight Channel / CRT | signal acquisition, power-on, tuning, broadcast interrupt |
| TV / portals | screen dive, static portals, channel hops |
| Fog / hidden info | progressive reveal, fog-of-war, deadline density |
| Investigation | evidence links, contradictions, dossiers, deductions |
| Shadow / confrontation | identity fracture, boss freeze, challenge cards |
| Social / Arcana | rank-up, milestones, thresholds, max rank |
| Fusion / compendium | combine, preview, inheritance, multi-fusion |
| Battle | weakness, knockdown, tally, level-up, all-out |
| Calendar / dungeon | day change, deadline pressure, map, danger meter |
| Yellow / black graphic | KEEP OUT tape, hazard stripes, impact wipes |

## Shipped (mapped to live specimens)

| P4 | SPX | Specimen id | Title |
| --- | --- | --- | --- |
| P4-001 | `SPX-2919` | `midnight-channel-signal-acquisition` | Midnight Channel Signal Acquisition |
| P4-002 | `SPX-2920` | `crt-power-on-reveal` | CRT Power-On Reveal |
| P4-013 | `SPX-2931` | `tv-screen-dive-transition` | TV Screen Dive Transition |
| P4-021 | `SPX-2939` | `fog-clearing-data-reveal` | Fog-Clearing Data Reveal |
| P4-029 | `SPX-2947` | `evidence-connection-draw` | Evidence Connection Draw |
| P4-030 | `SPX-2948` | `contradiction-found` | Contradiction Found |
| P4-044 | `SPX-2962` | `shadow-self-reveal` | Shadow Self Reveal |
| P4-052 | `SPX-2970` | `arcana-rank-up` | Arcana Rank-Up |
| P4-110 | `SPX-3028` | `keep-out-tape-marquee` | KEEP OUT Tape Marquee |

## Core first-wave

Curated implementation priority (Recommended Build Waves A–E; Wave B #20 is **False Lead Strikeout** instead of duplicate Shadow Self Reveal). Same checkbox as the master list — checking either counts.

- [x] **P4-001** · `SPX-2919` · **Midnight Channel Signal Acquisition** — midnight-channel-crt-broadcast
- [x] **P4-002** · `SPX-2920` · **CRT Power-On Reveal** — midnight-channel-crt-broadcast
- [x] **P4-013** · `SPX-2931` · **TV Screen Dive Transition** — tv-world-screen-portals
- [x] **P4-021** · `SPX-2939` · **Fog-Clearing Data Reveal** — fog-hidden-information
- [x] **P4-029** · `SPX-2947` · **Evidence Connection Draw** — investigation-evidence
- [x] **P4-030** · `SPX-2948` · **Contradiction Found** — investigation-evidence
- [x] **P4-044** · `SPX-2962` · **Shadow Self Reveal** — shadow-identity-confrontation
- [x] **P4-052** · `SPX-2970` · **Arcana Rank-Up** — social-links-bonds
- [x] **P4-110** · `SPX-3028` · **KEEP OUT Tape Marquee** — yellow-black-graphic-language
- [ ] **P4-069** · `SPX-2987` · **Persona Fusion Combine** — persona-fusion-compendium
- [ ] **P4-031** · `SPX-2949` · **Case Breakthrough** — investigation-evidence
- [ ] **P4-034** · `SPX-2952` · **Suspect Card Reveal** — investigation-evidence
- [ ] **P4-035** · `SPX-2953` · **Evidence Chain Advance** — investigation-evidence
- [ ] **P4-036** · `SPX-2954` · **Deduction Lock-In** — investigation-evidence
- [ ] **P4-040** · `SPX-2958` · **Timeline Reconstruction** — investigation-evidence
- [ ] **P4-156** · `SPX-3074` · **Classified Dossier Reveal** — mystery-thriller
- [ ] **P4-157** · `SPX-3075` · **Fingerprint Scan Match** — mystery-thriller
- [ ] **P4-043** · `SPX-2961` · **Redaction Reveal** — investigation-evidence
- [ ] **P4-170** · `SPX-3088` · **Case Solved Completion** — notifications-errors-success
- [ ] **P4-037** · `SPX-2955` · **False Lead Strikeout** — investigation-evidence
- [ ] **P4-003** · `SPX-2921` · **Channel Tuning Scrub** — midnight-channel-crt-broadcast
- [ ] **P4-005** · `SPX-2923` · **Broadcast Interruption** — midnight-channel-crt-broadcast
- [ ] **P4-019** · `SPX-2937` · **Static Portal Materialise** — tv-world-screen-portals
- [ ] **P4-022** · `SPX-2940` · **Fog-of-War Card** — fog-hidden-information
- [ ] **P4-025** · `SPX-2943` · **Fog Deadline Escalation** — fog-hidden-information
- [ ] **P4-119** · `SPX-3037` · **VHS Tracking Scrub** — analogue-vhs-retro-broadcast
- [ ] **P4-007** · `SPX-2925` · **Tracking Error Recovery** — midnight-channel-crt-broadcast
- [ ] **P4-127** · `SPX-3045` · **No Signal Card** — analogue-vhs-retro-broadcast
- [ ] **P4-112** · `SPX-3030` · **Yellow Impact Wipe** — yellow-black-graphic-language
- [ ] **P4-111** · `SPX-3029` · **Hazard Stripe Reveal** — yellow-black-graphic-language
- [ ] **P4-053** · `SPX-2971` · **Social Link Milestone** — social-links-bonds
- [ ] **P4-057** · `SPX-2975` · **Rank Threshold Unlock** — social-links-bonds
- [ ] **P4-062** · `SPX-2980` · **Arcana Card Draw** — tarot-arcana-cards
- [ ] **P4-070** · `SPX-2988` · **Fusion Preview** — persona-fusion-compendium
- [ ] **P4-071** · `SPX-2989` · **Skill Inheritance Select** — persona-fusion-compendium
- [ ] **P4-078** · `SPX-2996` · **Multi-Fusion Assembly** — persona-fusion-compendium
- [ ] **P4-079** · `SPX-2997` · **Weakness Discovered** — battle-weakness-advantage
- [ ] **P4-080** · `SPX-2998` · **Knockdown Chain** — battle-weakness-advantage
- [ ] **P4-087** · `SPX-3005` · **Battle Result Tally** — battle-weakness-advantage
- [ ] **P4-089** · `SPX-3007` · **Level-Up Burst** — battle-weakness-advantage
- [ ] **P4-092** · `SPX-3010` · **Map Construction** — dungeon-exploration
- [ ] **P4-094** · `SPX-3012` · **Danger Meter Escalation** — dungeon-exploration
- [ ] **P4-100** · `SPX-3018` · **Day Change Card** — calendar-time-deadlines
- [ ] **P4-103** · `SPX-3021` · **Deadline Pressure Meter** — calendar-time-deadlines
- [ ] **P4-105** · `SPX-3023` · **Fog Forecast Warning** — calendar-time-deadlines
- [ ] **P4-049** · `SPX-2967` · **Boss Introduction Freeze** — shadow-identity-confrontation
- [ ] **P4-046** · `SPX-2964` · **Confrontation Card Slam** — shadow-identity-confrontation
- [ ] **P4-150** · `SPX-3068` · **Contract Confirmation** — velvet-room-inspired-elegance
- [ ] **P4-059** · `SPX-2977` · **Max Rank Completion** — social-links-bonds
- [ ] **P4-083** · `SPX-3001` · **All-Out Completion Burst** — battle-weakness-advantage


## Midnight Channel / CRT Broadcast

- [x] **P4-001** · `SPX-2919` · **Midnight Channel Signal Acquisition** — Tune through analogue noise until hidden content locks into a stable broadcast.
- [x] **P4-002** · `SPX-2920` · **CRT Power-On Reveal** — A dead screen collapses to a bright line, blooms, and resolves into UI.
- [ ] **P4-003** · `SPX-2921` · **Channel Tuning Scrub** — Dragging a tuning dial moves through unstable fragments before acquiring a target state.
- [ ] **P4-004** · `SPX-2922` · **Lost Signal Collapse** — Stable content progressively loses sync and collapses into a no-signal state.
- [ ] **P4-005** · `SPX-2923` · **Broadcast Interruption** — Normal content is forcibly replaced by an urgent transmission card.
- [ ] **P4-006** · `SPX-2924` · **Vertical Hold Slip** — Content drifts vertically out of sync before snapping back into alignment.
- [ ] **P4-007** · `SPX-2925` · **Tracking Error Recovery** — Horizontal tearing bands destabilise content until a calibration action fixes them.
- [ ] **P4-008** · `SPX-2926` · **Channel Number Slam** — Oversized channel numerals punctuate a content/state switch.
- [ ] **P4-009** · `SPX-2927` · **Recording Indicator** — A compact REC state pulses while a finite capture operation runs.
- [ ] **P4-010** · `SPX-2928` · **Test Pattern Loader** — Abstract broadcast bars resolve into loaded content.
- [ ] **P4-011** · `SPX-2929` · **Signal Strength Lock** — A noisy signal meter stabilises as confidence increases.
- [ ] **P4-012** · `SPX-2930` · **Transmission Ghosting** — Previous frames leave finite analogue echoes during a state transition.

## TV World / Screen Portals

- [x] **P4-013** · `SPX-2931` · **TV Screen Dive Transition** — Current UI bends inward toward a screen aperture and destination emerges from the other side.
- [ ] **P4-014** · `SPX-2932` · **Screen Surface Ripple** — A rigid display briefly behaves like a flexible portal when activated.
- [ ] **P4-015** · `SPX-2933` · **TV Exit Push-Through** — Content presses outward through a screen plane before returning to normal geometry.
- [ ] **P4-016** · `SPX-2934` · **Channel-Hop Page Transition** — Pages swap as if rapidly changing channels.
- [ ] **P4-017** · `SPX-2935` · **CRT Glass Warp** — A bounded panel bows and distorts during a transition.
- [ ] **P4-018** · `SPX-2936` · **Screen Within Screen Tunnel** — Nested display frames recurse inward before resolving into destination.
- [ ] **P4-019** · `SPX-2937` · **Static Portal Materialise** — Noise condenses into a clean interactive panel.
- [ ] **P4-020** · `SPX-2938` · **TV Stack Navigator** — Several screen cards slide past one another as channel-like destinations.

## Fog / Hidden Information

- [x] **P4-021** · `SPX-2939` · **Fog-Clearing Data Reveal** — Obscured information progressively becomes readable as a process completes.
- [ ] **P4-022** · `SPX-2940` · **Fog-of-War Card** — Unknown regions of a card are revealed by pointer or progress.
- [ ] **P4-023** · `SPX-2941` · **Visibility Confidence Meter** — Fog density maps directly to certainty or data quality.
- [ ] **P4-024** · `SPX-2942` · **Hidden Object Discovery** — A scan clears a small region and permanently exposes a hidden item.
- [ ] **P4-025** · `SPX-2943` · **Fog Deadline Escalation** — A deadline approaching causes progressively denser obstruction and warning geometry.
- [ ] **P4-026** · `SPX-2944` · **Fog Lift Success** — A completed task clears an obscured interface into crisp final state.
- [ ] **P4-027** · `SPX-2945` · **Fog Return Warning** — Previously clear content becomes uncertain again after stale data is detected.
- [ ] **P4-028** · `SPX-2946` · **Layered Mist Transition** — Several translucent planes cross a preview to exchange content.

## Investigation / Evidence

- [x] **P4-029** · `SPX-2947` · **Evidence Connection Draw** — Selecting two clues draws a physical connection and creates a relationship state.
- [x] **P4-030** · `SPX-2948` · **Contradiction Found** — Two evidence cards collide and highlight the exact values that conflict.
- [ ] **P4-031** · `SPX-2949` · **Case Breakthrough** — A chaotic evidence board reorganises into a solved relationship graph.
- [ ] **P4-032** · `SPX-2950` · **Evidence Pin Drop** — A clue card is pinned into an investigation board with a finite impact.
- [ ] **P4-033** · `SPX-2951` · **Clue Acquired Stamp** — New evidence receives a bold acquisition treatment and enters the case file.
- [ ] **P4-034** · `SPX-2952` · **Suspect Card Reveal** — A partially redacted identity card opens as confidence rises.
- [ ] **P4-035** · `SPX-2953` · **Evidence Chain Advance** — One confirmed clue activates the next inference node.
- [ ] **P4-036** · `SPX-2954` · **Deduction Lock-In** — Several observations converge into one conclusion card.
- [ ] **P4-037** · `SPX-2955` · **False Lead Strikeout** — An invalid hypothesis is aggressively crossed out and demoted.
- [ ] **P4-038** · `SPX-2956` · **Case File Unfold** — A compact folder expands into a structured dossier.
- [ ] **P4-039** · `SPX-2957` · **Evidence Compare Split** — Two clues expand into a side-by-side comparison.
- [ ] **P4-040** · `SPX-2958` · **Timeline Reconstruction** — Disconnected event cards slide into chronological order.
- [ ] **P4-041** · `SPX-2959` · **Witness Statement Highlight** — Critical phrases receive hand-drawn/highlighter-style emphasis.
- [ ] **P4-042** · `SPX-2960` · **Fingerprint Match** — Two abstract print patterns align and resolve match/no-match.
- [ ] **P4-043** · `SPX-2961` · **Redaction Reveal** — Authorised content removes black bars in a deterministic sweep.

## Shadow / Identity / Confrontation

- [x] **P4-044** · `SPX-2962` · **Shadow Self Reveal** — A polished profile fractures to expose a darker underlying state.
- [ ] **P4-045** · `SPX-2963` · **Identity Distortion** — Profile typography and geometry become unstable before resolving into truth state.
- [ ] **P4-046** · `SPX-2964` · **Confrontation Card Slam** — A hidden issue interrupts the interface with a high-impact challenge card.
- [ ] **P4-047** · `SPX-2965` · **Denial-to-Acceptance Morph** — A rejected state visually fights the transition before settling into accepted status.
- [ ] **P4-048** · `SPX-2966` · **Shadow Encounter Warning** — A hostile presence is acquired through warning brackets and rising threat.
- [ ] **P4-049** · `SPX-2967` · **Boss Introduction Freeze** — The interface freezes while an oversized threat identity card cuts across it.
- [ ] **P4-050** · `SPX-2968` · **Shadow Defeated Collapse** — Threat geometry breaks apart and resolves into a clean completion state.
- [ ] **P4-051** · `SPX-2969` · **Hidden Trait Exposure** — Unknown profile attributes reveal after a successful test.

## Social Links / Bonds

- [x] **P4-052** · `SPX-2970` · **Arcana Rank-Up** — A relationship/progression card rises to a new rank with a finite card flourish.
- [ ] **P4-053** · `SPX-2971` · **Social Link Milestone** — Bond nodes converge into a newly unlocked capability.
- [ ] **P4-054** · `SPX-2972` · **Bond Progress Ring** — Relationship progress accumulates around a symbolic card.
- [ ] **P4-055** · `SPX-2973` · **Relationship Node Connect** — Two profiles gain a persistent connection line after interaction.
- [ ] **P4-056** · `SPX-2974` · **Bond Deepened Stamp** — A milestone receives a bold but elegant confirmation mark.
- [ ] **P4-057** · `SPX-2975` · **Rank Threshold Unlock** — Progress crossing a fixed threshold unlocks a new interaction.
- [ ] **P4-058** · `SPX-2976` · **Social Link Card Flip** — A card flips from unknown relationship to established bond.
- [ ] **P4-059** · `SPX-2977` · **Max Rank Completion** — The final rank transforms the entire progression card into a completed state.
- [ ] **P4-060** · `SPX-2978` · **Broken Link Warning** — A relationship connector visibly weakens or breaks after a state change.
- [ ] **P4-061** · `SPX-2979` · **Multi-Bond Overview** — Several compact relationship cards orbit/stack around a central profile.

## Tarot / Arcana Cards

- [ ] **P4-062** · `SPX-2980` · **Arcana Card Draw** — A card rises from a deck, flips, and reveals a category/result.
- [ ] **P4-063** · `SPX-2981` · **Tarot Spread Layout** — Several cards deal into fixed analytical positions.
- [ ] **P4-064** · `SPX-2982` · **Arcana Selection Fan** — Cards fan outward from a compact deck for selection.
- [ ] **P4-065** · `SPX-2983` · **Card Reverse State** — A selected card rotates into an alternate interpretation/state.
- [ ] **P4-066** · `SPX-2984` · **Arcana Match** — Two cards align to show compatibility or category match.
- [ ] **P4-067** · `SPX-2985` · **Card Seal Unlock** — A locked card becomes available after a prerequisite.
- [ ] **P4-068** · `SPX-2986` · **Major Arcana Progress Track** — A sequence of symbolic cards marks progression through stages.

## Persona / Fusion / Compendium

- [ ] **P4-069** · `SPX-2987` · **Persona Fusion Combine** — Two input cards travel into a central synthesis field and become one derived result.
- [ ] **P4-070** · `SPX-2988` · **Fusion Preview** — Candidate inputs project a deterministic preview of the resulting capability.
- [ ] **P4-071** · `SPX-2989` · **Skill Inheritance Select** — Selected capability chips travel from source cards into the fusion result.
- [ ] **P4-072** · `SPX-2990` · **Fusion Result Reveal** — A hidden result card constructs after synthesis completes.
- [ ] **P4-073** · `SPX-2991` · **Fusion Failure Recoil** — Invalid inputs separate and return to their source slots.
- [ ] **P4-074** · `SPX-2992` · **Compendium Entry Register** — A newly discovered entity is stamped into an indexed archive.
- [ ] **P4-075** · `SPX-2993` · **Compendium Search Acquire** — Search narrows a card grid until one entry is isolated.
- [ ] **P4-076** · `SPX-2994` · **Summon from Compendium** — Archived card materialises into an active slot.
- [ ] **P4-077** · `SPX-2995` · **Fusion Forecast** — Several potential outputs branch from selected inputs.
- [ ] **P4-078** · `SPX-2996` · **Multi-Fusion Assembly** — Three or more inputs converge into one high-tier result.

## Battle / Weakness / Advantage

- [ ] **P4-079** · `SPX-2997` · **Weakness Discovered** — An unknown property is tested, struck, and permanently identified.
- [ ] **P4-080** · `SPX-2998` · **Knockdown Chain** — One successful weakness hit sends a completion pulse through dependent targets.
- [ ] **P4-081** · `SPX-2999` · **Player Advantage Alert** — A favourable encounter begins with a sharp advantage banner.
- [ ] **P4-082** · `SPX-3000` · **Enemy Advantage Warning** — An unfavourable encounter forcibly takes over the combat card.
- [ ] **P4-083** · `SPX-3001` · **All-Out Completion Burst** — Multiple active entities collapse into a single explosive completion/result state.
- [ ] **P4-084** · `SPX-3002` · **Critical Hit Impact** — A result value lands with oversized finite impact geometry.
- [ ] **P4-085** · `SPX-3003` · **Guard State Lock** — A character/card compresses into a protected defensive treatment.
- [ ] **P4-086** · `SPX-3004` · **Status Effect Acquire** — A compact state token snaps onto a profile.
- [ ] **P4-087** · `SPX-3005` · **Battle Result Tally** — XP/reward values count into fixed result rows.
- [ ] **P4-088** · `SPX-3006` · **Skill Acquired Reveal** — A new capability emerges from the result panel.
- [ ] **P4-089** · `SPX-3007` · **Level-Up Burst** — A level value rolls upward and reorganises stat presentation.
- [ ] **P4-090** · `SPX-3008` · **Escape Transition** — Battle surface tears away into exploration state.

## Dungeon / Exploration

- [ ] **P4-091** · `SPX-3009` · **Floor Discovery Reveal** — A newly reached floor label emerges through map-like geometry.
- [ ] **P4-092** · `SPX-3010` · **Map Construction** — Explored corridors draw themselves as movement progresses.
- [ ] **P4-093** · `SPX-3011` · **Treasure Chest Acquisition** — A locked reward container opens and transfers its item into inventory.
- [ ] **P4-094** · `SPX-3012` · **Danger Meter Escalation** — Threat rises through discrete structural states as exploration continues.
- [ ] **P4-095** · `SPX-3013` · **Hidden Passage Reveal** — A wall/region changes after discovery to expose a new route.
- [ ] **P4-096** · `SPX-3014` · **Floor Transition Elevator** — Current map moves vertically into the next floor state.
- [ ] **P4-097** · `SPX-3015` · **Dungeon Entrance Slam** — A destination name card takes over briefly on entry.
- [ ] **P4-098** · `SPX-3016` · **Return Point Activation** — A discovered checkpoint becomes a persistent active node.
- [ ] **P4-099** · `SPX-3017` · **Exploration Breadcrumb Trail** — Visited nodes remain connected behind the current marker.

## Calendar / Time / Deadlines

- [ ] **P4-100** · `SPX-3018` · **Day Change Card** — The current date peels/slides away and the next day locks into place.
- [ ] **P4-101** · `SPX-3019` · **After-School Transition** — Time-of-day state shifts through a short graphic interstitial.
- [ ] **P4-102** · `SPX-3020` · **Weather Forecast Change** — Calendar weather iconography morphs between fixed states.
- [ ] **P4-103** · `SPX-3021` · **Deadline Pressure Meter** — Days remaining compress visually as a deadline approaches.
- [ ] **P4-104** · `SPX-3022` · **Rainy-Day State** — A page acquires finite rain-on-glass treatment tied to state.
- [ ] **P4-105** · `SPX-3023` · **Fog Forecast Warning** — Upcoming fog/deadline creates a prominent forecast alert.
- [ ] **P4-106** · `SPX-3024` · **Week Flip** — Seven-day strip shifts to the next week with one decisive motion.
- [ ] **P4-107** · `SPX-3025` · **Event Day Highlight** — A calendar cell expands into an event briefing.
- [ ] **P4-108** · `SPX-3026` · **Missed Deadline Collapse** — Countdown reaches zero and the active task becomes failed/locked.
- [ ] **P4-109** · `SPX-3027` · **Time Slot Selection** — Morning/after-school/evening choices move a shared selection indicator.

## Yellow / Black Graphic Language

- [x] **P4-110** · `SPX-3028` · **KEEP OUT Tape Marquee** — Diagonal yellow/black tape crosses a host card with a seamless moving warning marquee.
- [ ] **P4-111** · `SPX-3029` · **Hazard Stripe Reveal** — Diagonal warning stripes sweep away to expose newly available content.
- [ ] **P4-112** · `SPX-3030` · **Yellow Impact Wipe** — A saturated yellow plane cuts across the preview to exchange states.
- [ ] **P4-113** · `SPX-3031` · **Black Cutout Transition** — Irregular black silhouettes carve through a yellow field.
- [ ] **P4-114** · `SPX-3032` · **Chunky Type Slam** — Oversized condensed text lands behind a result card.
- [ ] **P4-115** · `SPX-3033` · **Diagonal Warning Banner** — A high-priority strip slices across a bounded host.
- [ ] **P4-116** · `SPX-3034` · **Rotating Hazard Ring** — A segmented yellow/black ring aligns around selected content.
- [ ] **P4-117** · `SPX-3035` · **Tape Tear Dismiss** — Warning tape appears to tear apart when a lock is removed.
- [ ] **P4-118** · `SPX-3036` · **Striped Progress Barrier** — Determinate progress advances through hazard-strip geometry.

## Analogue / VHS / Retro Broadcast

- [ ] **P4-119** · `SPX-3037` · **VHS Tracking Scrub** — A slider deliberately introduces and then removes horizontal tracking errors.
- [ ] **P4-120** · `SPX-3038` · **Tape Rewind Transition** — Recent states rapidly reverse through a finite snapshot sequence.
- [ ] **P4-121** · `SPX-3039` · **Pause Frame Jitter** — A paused state gains restrained analogue instability.
- [ ] **P4-122** · `SPX-3040` · **Fast-Forward Timeline** — Timeline cards accelerate past a fixed viewport marker.
- [ ] **P4-123** · `SPX-3041` · **Chromatic Separation Error** — A failed state briefly splits colour channels before resolving.
- [ ] **P4-124** · `SPX-3042` · **Scanline Acquisition** — Horizontal scan passes reveal content bands.
- [ ] **P4-125** · `SPX-3043` · **Tape Counter Roll** — A mechanical-style time counter advances during playback.
- [ ] **P4-126** · `SPX-3044` · **Broadcast Timestamp** — A timestamp snaps into a recorded-state overlay.
- [ ] **P4-127** · `SPX-3045` · **No Signal Card** — Unavailable content becomes a bold broadcast-style fallback.

## Weather / Atmosphere

- [ ] **P4-128** · `SPX-3046` · **Rain-on-Glass Overlay** — Finite droplets/lines establish rainy state over a bounded card.
- [ ] **P4-129** · `SPX-3047` · **Lightning Forecast Flash** — A weather warning uses one controlled high-contrast flash and static warning state.
- [ ] **P4-130** · `SPX-3048` · **Sunny Clear Transition** — Clouded/fogged interface opens into high-contrast clear state.
- [ ] **P4-131** · `SPX-3049` · **Storm Escalation** — Weather card progresses through increasingly severe fixed modes.
- [ ] **P4-132** · `SPX-3050` · **Umbrella Status Toggle** — A playful weather preparation control opens/closes with state.
- [ ] **P4-133** · `SPX-3051` · **Weather-to-Deadline Link** — Forecast changes visibly alter a linked deadline/risk card.

## School / Exams / Clubs

- [ ] **P4-134** · `SPX-3052` · **Exam Result Slam** — Score/result lands with bold school-notice presentation.
- [ ] **P4-135** · `SPX-3053` · **Knowledge Stat Gain** — A compact stat increment rises from a completed study action.
- [ ] **P4-136** · `SPX-3054` · **Classroom Question Prompt** — A question card interrupts content and locks answer after selection.
- [ ] **P4-137** · `SPX-3055` · **Correct Answer Burst** — A selected answer receives a finite celebratory impact.
- [ ] **P4-138** · `SPX-3056` · **Club Invitation Card** — A compact invitation unfolds from a school notice.
- [ ] **P4-139** · `SPX-3057` · **Club Rank Progress** — Participation fills a milestone strip.
- [ ] **P4-140** · `SPX-3058` · **Timetable Flip** — Current lesson cell shifts into the next scheduled block.
- [ ] **P4-141** · `SPX-3059` · **School Notice Pin** — Announcement card pins itself to a noticeboard scaffold.

## Junes / Retail / Everyday UI

- [ ] **P4-142** · `SPX-3060` · **Retail Sale Burst** — A cheerful yellow sale badge expands into a promotional card.
- [ ] **P4-143** · `SPX-3061` · **Receipt Result Roll** — A compact receipt grows downward while line items tally.
- [ ] **P4-144** · `SPX-3062` · **Shopping Basket Transfer** — Selected item travels into a basket slot.
- [ ] **P4-145** · `SPX-3063` · **Escalator Navigation** — Cards move diagonally/upward through stacked destination levels.
- [ ] **P4-146** · `SPX-3064` · **Store Announcement Ticker** — Finite retail announcement crosses a signboard.
- [ ] **P4-147** · `SPX-3065` · **Price Drop Stamp** — Updated price receives a bold discount mark.
- [ ] **P4-148** · `SPX-3066` · **Checkout Complete Jingle Visual** — A short sequence of graphic beats confirms purchase without audio.

## Velvet-Room-Inspired Elegance

- [ ] **P4-149** · `SPX-3067` · **Elegant Card Rotation** — A dark-blue abstract card rotates into a refined selection state.
- [ ] **P4-150** · `SPX-3068` · **Contract Confirmation** — A formal agreement panel assembles and receives a final seal.
- [ ] **P4-151** · `SPX-3069` · **Compendium Index Slide** — Entries glide along a restrained archival index.
- [ ] **P4-152** · `SPX-3070` · **Fusion Chamber Transition** — Inputs move into a central geometric chamber before synthesis.
- [ ] **P4-153** · `SPX-3071` · **Capability Inheritance Flow** — Chosen traits visibly transfer between source and result.
- [ ] **P4-154** · `SPX-3072` · **Archive Registration** — A result is added to a formal persistent-looking catalogue.
- [ ] **P4-155** · `SPX-3073` · **Blue Curtain Reveal** — Two dark-blue panels part to expose protected content.

## Mystery / Thriller

- [ ] **P4-156** · `SPX-3074` · **Classified Dossier Reveal** — A locked case file removes redactions after verification.
- [ ] **P4-157** · `SPX-3075` · **Fingerprint Scan Match** — Abstract print-like lines align into match/no-match.
- [ ] **P4-158** · `SPX-3076` · **Evidence Stamp** — A clue receives a CASE EVIDENCE-style original stamp.
- [ ] **P4-159** · `SPX-3077` · **Suspect Lineup Focus** — Selection brackets move between candidate cards.
- [ ] **P4-160** · `SPX-3078` · **Case Status Escalation** — Open case moves from routine to urgent visual treatment.
- [ ] **P4-161** · `SPX-3079` · **Anonymous Message Reveal** — Obscured message progressively resolves after analysis.
- [ ] **P4-162** · `SPX-3080` · **Photo Evidence Zoom** — A selected image placeholder expands while annotation brackets isolate a region.
- [ ] **P4-163** · `SPX-3081` · **Mystery Countdown** — A deadline card becomes increasingly broadcast-like as time expires.

## Notifications / Errors / Success

- [ ] **P4-164** · `SPX-3082` · **Midnight Broadcast Alert** — An incoming transmission forcibly interrupts a calm host.
- [ ] **P4-165** · `SPX-3083` · **Clue Acquired Toast** — Evidence enters as a compact yellow/black acquisition strip.
- [ ] **P4-166** · `SPX-3084` · **Social Rank-Up Notification** — Relationship rank change arrives as a card flourish.
- [ ] **P4-167** · `SPX-3085` · **Weakness Found Notification** — Newly discovered property receives a permanent knowledge marker.
- [ ] **P4-168** · `SPX-3086` · **Signal Lost Error** — Active content destabilises into a clear disconnected state.
- [ ] **P4-169** · `SPX-3087` · **Contradiction Error** — Conflicting values receive a hard investigative warning.
- [ ] **P4-170** · `SPX-3088` · **Case Solved Completion** — Multiple clues collapse into a clean solved-state title card.
- [ ] **P4-171** · `SPX-3089` · **Dungeon Cleared Result** — Exploration UI reorganises into a finite reward/result panel.
- [ ] **P4-172** · `SPX-3090` · **Deadline Missed Alert** — Calendar state locks into failure treatment.

## Loading / Progress

- [ ] **P4-173** · `SPX-3091` · **Midnight Channel Tuning Loader** — Noise decreases as a determinate load approaches signal lock.
- [ ] **P4-174** · `SPX-3092` · **Fog Clearing Loader** — Visibility increases directly with progress.
- [ ] **P4-175** · `SPX-3093` · **Investigation Board Loader** — Clue nodes appear and connect as analysis progresses.
- [ ] **P4-176** · `SPX-3094` · **Fusion Assembly Loader** — Input cards orbit/align until synthesis is ready.
- [ ] **P4-177** · `SPX-3095` · **TV Static Skeleton** — Placeholder blocks flicker between stable broadcast bands.
- [ ] **P4-178** · `SPX-3096` · **Case Analysis Scan** — A scanning line traverses evidence and updates completion.
- [ ] **P4-179** · `SPX-3097` · **Dungeon Map Loader** — Map corridors construct toward a fixed endpoint.

## Experimental Software Mappings

- [ ] **P4-180** · `SPX-3098` · **Midnight Channel as Search Discovery** — A tuning interaction searches noisy candidates until one result locks.
- [ ] **P4-181** · `SPX-3099` · **Fog as Data Uncertainty** — Information clarity directly reflects confidence or freshness.
- [ ] **P4-182** · `SPX-3100` · **Investigation Board as Debugging** — Logs, symptoms and hypotheses connect into a root-cause graph.
- [ ] **P4-183** · `SPX-3101` · **Contradiction as Validation Diff** — Conflicting system values collide and expose their mismatch.
- [ ] **P4-184** · `SPX-3102` · **Shadow Self as Underlying System State** — A polished component reveals its actual raw/internal state.
- [ ] **P4-185** · `SPX-3103` · **Social Links as Capability Progression** — Relationship/progress milestones unlock features.
- [ ] **P4-186** · `SPX-3104` · **Persona Fusion as Workflow Composition** — Two workflows or datasets synthesize into a derived pipeline.
- [ ] **P4-187** · `SPX-3105` · **Weakness Discovery as Test Intelligence** — Repeated tests permanently reveal supported/unsupported behaviours.
- [ ] **P4-188** · `SPX-3106` · **TV Tuning as Environment Selection** — A dial moves through unstable previews before selecting an environment.
- [ ] **P4-189** · `SPX-3107` · **Weather as Operational Risk** — Forecast state drives risk/deadline presentation.
- [ ] **P4-190** · `SPX-3108` · **Dungeon Map as Codebase Discovery** — Unknown architecture becomes visible as components are explored.
- [ ] **P4-191** · `SPX-3109` · **Compendium as Component Registry** — Discovered components register into an indexed archive.
