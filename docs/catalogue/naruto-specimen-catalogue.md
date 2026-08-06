# Naruto Specimen Checklist

> Working backlog for portable motion/UI artifacts inspired by Naruto / ninja-fiction visual grammar. Interaction primitives, not anime/manga replicas. Avoid copyrighted character art, village emblems, clan crests, exact eye patterns, title logos, costumes, extracted assets, audio, and proprietary fonts.

## How to use

- **NR-NNN** — stable catalogue id (this list).
- **SPX-NNN** — specimen registry ref. Unbuilt ideas are pre-assigned `SPX-2344`…`SPX-2918` — use that ref when implementing; do not invent a different number.
- Non-catalogue specimens (other franchises / originals) use gaps not reserved by open P5 (`SPX-015`–`SPX-312`), P3 (`SPX-400`–`SPX-635`), PK (`SPX-700`–`SPX-965`), DB (`SPX-966`–`SPX-1209`), IOS (`SPX-1300`–`SPX-1557`), AND (`SPX-1558`–`SPX-1974`), MHA (`SPX-1975`–`SPX-2343`), or open NR rows; prefer leftover `SPX-313`–`SPX-399`, `SPX-636`–`SPX-699`, `SPX-1210`–`SPX-1299`, or `SPX-3110+` (P4 reserves `SPX-2919`–`SPX-3109`).
- Mark **`[x]`** only when the specimen is registered in `src/specimens/index.ts` with a real `ref` (not `SPX-TODO`) and verified. Agents must update this file in the same change — see `.cursor/rules/37_persona-catalogue.mdc`.
- Progress: **50 / 575** complete.

| Status | Count |
| --- | --- |
| Done | 50 |
| Open | 525 |

## Visual grammar

| Motif | Use for |
| --- | --- |
| Hand signs / sequences | command palettes, shortcut chains, confirmation rituals |
| Chakra / resource | quotas, budgets, charge-and-commit, recovery |
| Seals / locks | permissions, multi-key unlocks, stamp confirmation |
| Shadow clones | parallel workers, fan-out/merge, capacity limits |
| Substitution | failover, fallback proxy, graceful recovery |
| Scrolls / missions | portable documents, dispatch, rank, objectives |
| Sensory / focus | scans, weak-point detection, observability |
| Summoning / barriers | lazy materialisation, security boundaries, breach alerts |
| Elemental motion | commit actions, page transitions, hold-to-confirm |

## Shipped (mapped to live specimens)

| NR | SPX | Specimen id | Title |
| --- | --- | --- | --- |
| NR-424 | `SPX-2767` | `technique-mastery-tree` | Technique Mastery Tree |
| NR-334 | `SPX-2677` | `teleport-card-transfer` | Teleport Card Transfer |
| NR-301 | `SPX-2644` | `shadow-bind-selection` | Shadow Bind Selection |
| NR-248 | `SPX-2591` | `three-person-cell-formation` | Three-Person Cell Formation |
| NR-241 | `SPX-2584` | `target-dossier-reveal` | Target Dossier Reveal |
| NR-226 | `SPX-2569` | `mission-board-dispatch` | Mission Board Dispatch |
| NR-217 | `SPX-2560` | `versus-clash-card` | Versus Clash Card |
| NR-208 | `SPX-2551` | `exam-start-seal` | Exam Start Seal |
| NR-201 | `SPX-2544` | `rank-promotion-card` | Rank Promotion Card |
| NR-194 | `SPX-2537` | `mission-complete-stamp` | Mission Complete Stamp |
| NR-193 | `SPX-2536` | `objective-chain-advance` | Objective Chain Advance |
| NR-191 | `SPX-2534` | `mission-rank-reveal` | Mission Rank Reveal |
| NR-184 | `SPX-2527` | `healing-progress-field` | Healing Progress Field |
| NR-182 | `SPX-2525` | `barrier-breach-alert` | Barrier Breach Alert |
| NR-179 | `SPX-2522` | `four-point-barrier-construct` | Four-Point Barrier Construct |
| NR-173 | `SPX-2516` | `summoning-seal-materialise` | Summoning Seal Materialise |
| NR-167 | `SPX-2510` | `chakra-signature-match` | Chakra Signature Match |
| NR-166 | `SPX-2509` | `presence-radar-sweep` | Presence Radar Sweep |
| NR-154 | `SPX-2497` | `network-scan-360` | 360° Network Scan |
| NR-147 | `SPX-2490` | `weak-point-detection` | Weak-Point Detection |
| NR-145 | `SPX-2488` | `focus-mode-activation` | Focus Mode Activation |
| NR-133 | `SPX-2476` | `element-merge-recipe` | Element Merge Recipe |
| NR-127 | `SPX-2470` | `earth-wall-blocker` | Earth Wall Blocker |
| NR-121 | `SPX-2464` | `lightning-target-acquisition` | Lightning Target Acquisition |
| NR-139 | `SPX-2482` | `vortex-hold-to-confirm` | Vortex Hold-to-Confirm |
| NR-115 | `SPX-2458` | `wind-slice-transition` | Wind Slice Transition |
| NR-108 | `SPX-2451` | `water-wave-page-transition` | Water Wave Page Transition |
| NR-101 | `SPX-2444` | `fireball-commit` | Fireball Commit |
| NR-096 | `SPX-2439` | `smoke-mask-transition` | Smoke Mask Transition |
| NR-090 | `SPX-2433` | `explosive-tag-countdown` | Explosive Tag Countdown |
| NR-084 | `SPX-2427` | `wire-connection-draw` | Wire Connection Draw |
| NR-072 | `SPX-2415` | `shuriken-radial-menu` | Shuriken Radial Menu |
| NR-067 | `SPX-2410` | `high-speed-card-relocation` | High-Speed Card Relocation |
| NR-066 | `SPX-2409` | `body-flicker-page-jump` | Body Flicker Page Jump |
| NR-059 | `SPX-2402` | `transformation-morph` | Transformation Morph |
| NR-054 | `SPX-2397` | `clone-failure-pop` | Clone Failure Pop |
| NR-053 | `SPX-2396` | `clone-merge-result` | Clone Merge Result |
| NR-051 | `SPX-2394` | `parallel-worker-clones` | Parallel Worker Clones |
| NR-050 | `SPX-2393` | `shadow-clone-fan-out` | Shadow Clone Fan-Out |
| NR-044 | `SPX-2387` | `error-substitution-recovery` | Error Substitution Recovery |
| NR-042 | `SPX-2385` | `substitution-swap` | Substitution Swap |
| NR-036 | `SPX-2379` | `seal-stamp-confirmation` | Seal Stamp Confirmation |
| NR-035 | `SPX-2378` | `multi-key-seal` | Multi-Key Seal |
| NR-033 | `SPX-2376` | `seal-release-sequence` | Seal Release Sequence |
| NR-032 | `SPX-2375` | `circular-seal-lock` | Circular Seal Lock |
| NR-023 | `SPX-2366` | `scroll-to-panel-transform` | Scroll-to-Panel Transform |
| NR-022 | `SPX-2365` | `mission-scroll-unroll` | Mission Scroll Unroll |
| NR-015 | `SPX-2358` | `chakra-control-balance` | Chakra Control Balance |
| NR-011 | `SPX-2354` | `chakra-charge-field` | Chakra Charge Field |
| NR-001 | `SPX-2344` | `hand-sign-combo-sequence` | Hand-Sign Combo Sequence |

## Core first-wave

Curated implementation priority (50 Best Cursor Prompts shortlist). Same checkbox as the master list — checking either counts.

- [x] **NR-001** · `SPX-2344` · **Hand-Sign Combo Sequence** — hand-sign-sequence-interfaces
- [x] **NR-011** · `SPX-2354` · **Chakra Charge Field** — chakra-resource-systems
- [x] **NR-015** · `SPX-2358` · **Chakra Control Balance** — chakra-resource-systems
- [x] **NR-022** · `SPX-2365` · **Mission Scroll Unroll** — scroll-interfaces
- [x] **NR-023** · `SPX-2366` · **Scroll-to-Panel Transform** — scroll-interfaces
- [x] **NR-032** · `SPX-2375` · **Circular Seal Lock** — seals-locking-systems
- [x] **NR-033** · `SPX-2376` · **Seal Release Sequence** — seals-locking-systems
- [x] **NR-035** · `SPX-2378` · **Multi-Key Seal** — seals-locking-systems
- [x] **NR-036** · `SPX-2379` · **Seal Stamp Confirmation** — seals-locking-systems
- [x] **NR-042** · `SPX-2385` · **Substitution Swap** — substitution-replacement-motion
- [x] **NR-044** · `SPX-2387` · **Error Substitution Recovery** — substitution-replacement-motion
- [x] **NR-050** · `SPX-2393` · **Shadow Clone Fan-Out** — clone-duplication-systems
- [x] **NR-051** · `SPX-2394` · **Parallel Worker Clones** — clone-duplication-systems
- [x] **NR-053** · `SPX-2396` · **Clone Merge Result** — clone-duplication-systems
- [x] **NR-054** · `SPX-2397` · **Clone Failure Pop** — clone-duplication-systems
- [x] **NR-059** · `SPX-2402` · **Transformation Morph** — transformation-disguise
- [x] **NR-066** · `SPX-2409` · **Body Flicker Page Jump** — body-flicker-high-speed-navigation
- [x] **NR-067** · `SPX-2410` · **High-Speed Card Relocation** — body-flicker-high-speed-navigation
- [x] **NR-072** · `SPX-2415` · **Shuriken Radial Menu** — shuriken-projectile-motion
- [x] **NR-084** · `SPX-2427` · **Wire Connection Draw** — ninja-wire-connection-systems
- [x] **NR-090** · `SPX-2433` · **Explosive Tag Countdown** — paper-bomb-countdown-interfaces
- [x] **NR-096** · `SPX-2439` · **Smoke Mask Transition** — smoke-concealment
- [x] **NR-101** · `SPX-2444` · **Fireball Commit** — fire-style
- [x] **NR-108** · `SPX-2451` · **Water Wave Page Transition** — water-style
- [x] **NR-115** · `SPX-2458` · **Wind Slice Transition** — wind-style
- [x] **NR-139** · `SPX-2482` · **Vortex Hold-to-Confirm** — rasengan-inspired-interaction-family
- [x] **NR-121** · `SPX-2464` · **Lightning Target Acquisition** — lightning-style
- [x] **NR-127** · `SPX-2470` · **Earth Wall Blocker** — earth-style
- [x] **NR-133** · `SPX-2476` · **Element Merge Recipe** — elemental-combination
- [x] **NR-145** · `SPX-2488` · **Focus Mode Activation** — dojutsu-inspired-focus-vision-modes
- [x] **NR-147** · `SPX-2490` · **Weak-Point Detection** — dojutsu-inspired-focus-vision-modes
- [x] **NR-154** · `SPX-2497` · **360° Network Scan** — byakugan-inspired-network-inspection
- [x] **NR-166** · `SPX-2509` · **Presence Radar Sweep** — sensory-detection-interfaces
- [x] **NR-167** · `SPX-2510` · **Chakra Signature Match** — sensory-detection-interfaces
- [x] **NR-173** · `SPX-2516` · **Summoning Seal Materialise** — summoning-interfaces
- [x] **NR-179** · `SPX-2522` · **Four-Point Barrier Construct** — barrier-interfaces
- [x] **NR-182** · `SPX-2525` · **Barrier Breach Alert** — barrier-interfaces
- [x] **NR-184** · `SPX-2527` · **Healing Progress Field** — medical-ninja-recovery-ui
- [x] **NR-191** · `SPX-2534` · **Mission Rank Reveal** — mission-system
- [x] **NR-193** · `SPX-2536` · **Objective Chain Advance** — mission-system
- [x] **NR-194** · `SPX-2537` · **Mission Complete Stamp** — mission-system
- [x] **NR-201** · `SPX-2544` · **Rank Promotion Card** — ninja-rank-promotion
- [x] **NR-208** · `SPX-2551` · **Exam Start Seal** — chunin-exam-inspired-testing
- [x] **NR-217** · `SPX-2560` · **Versus Clash Card** — tournament-arena
- [x] **NR-226** · `SPX-2569` · **Mission Board Dispatch** — village-administration
- [x] **NR-241** · `SPX-2584` · **Target Dossier Reveal** — bingo-book-target-dossier
- [x] **NR-248** · `SPX-2591` · **Three-Person Cell Formation** — team-formation
- [x] **NR-301** · `SPX-2644` · **Shadow Bind Selection** — shadow-technique-interfaces
- [x] **NR-334** · `SPX-2677` · **Teleport Card Transfer** — space-time-teleportation-interfaces
- [x] **NR-424** · `SPX-2767` · **Technique Mastery Tree** — mentor-training-progression

## Hand-Sign / Sequence Interfaces

- [x] **NR-001** · `SPX-2344` · **Hand-Sign Combo Sequence** — a row of abstract gesture glyphs acquires one-by-one as the user enters a command sequence.
- [ ] **NR-002** · `SPX-2345` · **Jutsu Sequence Completion** — several required input tokens lock into alignment and release a completion state.
- [ ] **NR-003** · `SPX-2346` · **Failed Sign Sequence** — one incorrect token breaks the chain and rewinds to the last valid checkpoint.
- [ ] **NR-004** · `SPX-2347` · **Rapid Sign Input** — keyboard sequence produces increasingly compressed timing feedback before activation.
- [ ] **NR-005** · `SPX-2348` · **Sign Memory Challenge** — a finite sequence flashes, hides, then accepts reconstruction.
- [ ] **NR-006** · `SPX-2349` · **Branching Technique Sequence** — early input choices change the remaining command chain.
- [ ] **NR-007** · `SPX-2350` · **Sign Cooldown Chain** — completed sequence dims and reconstructs token-by-token.
- [ ] **NR-008** · `SPX-2351` · **Sequence Autocomplete** — valid prefix suggests remaining abstract signs.
- [ ] **NR-009** · `SPX-2352` · **Parallel Sign Comparison** — two command chains are compared for shared prefix/divergence.
- [ ] **NR-010** · `SPX-2353` · **Sequence Cancel Gesture** — active chain retracts rapidly into idle state.

## Chakra / Resource Systems

- [x] **NR-011** · `SPX-2354` · **Chakra Charge Field** — holding an action fills an irregular energy boundary around a control.
- [ ] **NR-012** · `SPX-2355` · **Chakra Network Flow** — energy travels through connected nodes to show resource distribution.
- [ ] **NR-013** · `SPX-2356` · **Chakra Depletion Warning** — resource meter crosses discrete thresholds and changes structural intensity.
- [ ] **NR-014** · `SPX-2357` · **Chakra Burst Commit** — accumulated resource collapses into a single action on release.
- [x] **NR-015** · `SPX-2358` · **Chakra Control Balance** — two opposing inputs must be held within a narrow equilibrium band.
- [ ] **NR-016** · `SPX-2359` · **Chakra Recovery** — depleted meter reconstructs in finite pulses/segments.
- [ ] **NR-017** · `SPX-2360` · **Chakra Allocation Drag** — resource tokens move between abilities or team members.
- [ ] **NR-018** · `SPX-2361` · **Reserve Unlock** — exhausted primary meter reveals a smaller secondary reserve.
- [ ] **NR-019** · `SPX-2362` · **Overcharge Leak** — exceeding safe charge causes finite energy to escape around boundary.
- [ ] **NR-020** · `SPX-2363` · **Chakra Efficiency Compare** — same action displays two resource-cost profiles.
- [ ] **NR-021** · `SPX-2364` · **Suppressed Chakra State** — energetic resource UI collapses into bound/disabled geometry.

## Scroll Interfaces

- [x] **NR-022** · `SPX-2365` · **Mission Scroll Unroll** — rolled document expands horizontally/vertically into a mission briefing.
- [x] **NR-023** · `SPX-2366` · **Scroll-to-Panel Transform** — compact scroll token unfurls into a full information card.
- [ ] **NR-024** · `SPX-2367` · **Technique Scroll Reveal** — hidden content appears line-by-line as paper unrolls.
- [ ] **NR-025** · `SPX-2368` · **Scroll Seal Unlock** — stamped/locked scroll becomes available after a finite seal release.
- [ ] **NR-026** · `SPX-2369` · **Scroll Inventory Carousel** — rolled documents rotate through selection slots.
- [ ] **NR-027** · `SPX-2370` · **Scroll Re-Roll Dismiss** — expanded content collapses back into compact cylinder/token.
- [ ] **NR-028** · `SPX-2371` · **Dual Scroll Compare** — two documents unfurl from opposite sides.
- [ ] **NR-029** · `SPX-2372` · **Scroll Progress Track** — reading/completion progress maps to unrolled length.
- [ ] **NR-030** · `SPX-2373` · **Scroll Annotation** — notes and markers appear in margins after expansion.
- [ ] **NR-031** · `SPX-2374` · **Damaged Scroll Recovery** — missing sections reconstruct from fragments.

## Seals / Locking Systems

- [x] **NR-032** · `SPX-2375` · **Circular Seal Lock** — radial marks rotate into alignment to lock content.
- [x] **NR-033** · `SPX-2376` · **Seal Release Sequence** — concentric rings disengage in ordered stages before revealing content.
- [ ] **NR-034** · `SPX-2377` · **Forbidden Content Seal** — restricted card is covered by intersecting constraint strips and a central mark.
- [x] **NR-035** · `SPX-2378` · **Multi-Key Seal** — several prerequisite nodes must activate before central lock opens.
- [x] **NR-036** · `SPX-2379` · **Seal Stamp Confirmation** — action completes with one forceful circular stamp.
- [ ] **NR-037** · `SPX-2380` · **Seal Integrity Meter** — radial segments disappear as protection weakens.
- [ ] **NR-038** · `SPX-2381` · **Seal Repair** — damaged radial structure reconstructs clockwise.
- [ ] **NR-039** · `SPX-2382` · **Seal Transfer** — lock token travels from one object to another.
- [ ] **NR-040** · `SPX-2383` · **Temporary Seal Countdown** — locked state visibly expires around a ring.
- [ ] **NR-041** · `SPX-2384` · **Seal Mismatch Recoil** — invalid credential causes rings to misalign and return.

## Substitution / Replacement Motion

- [x] **NR-042** · `SPX-2385` · **Substitution Swap** — selected card disappears in a sharp burst and a replacement occupies the exact geometry.
- [ ] **NR-043** · `SPX-2386` · **Content Substitution Log** — old state leaves a temporary proxy while new state snaps into its slot.
- [x] **NR-044** · `SPX-2387` · **Error Substitution Recovery** — failed component is rapidly replaced by fallback UI.
- [ ] **NR-045** · `SPX-2388` · **Substitution Decoy** — clicked object leaves a static placeholder while real content relocates.
- [ ] **NR-046** · `SPX-2389` · **Swap with Smoke Mask** — abstract smoke-like circles briefly mask a DOM replacement.
- [ ] **NR-047** · `SPX-2390` · **Table Row Substitution** — stale row exits while updated row occupies identical height.
- [ ] **NR-048** · `SPX-2391` · **Substitution Undo** — replacement reverses into original content.
- [ ] **NR-049** · `SPX-2392` · **Multi-Swap Chain** — three items rotate through positions using substitution beats.

## Clone / Duplication Systems

- [x] **NR-050** · `SPX-2393` · **Shadow Clone Fan-Out** — one source card produces several temporary task proxies that fan into parallel slots.
- [x] **NR-051** · `SPX-2394` · **Parallel Worker Clones** — one job visually divides into multiple deterministic worker cards and recombines at completion.
- [ ] **NR-052** · `SPX-2395` · **Clone Load Distribution** — workload bar splits across several copies.
- [x] **NR-053** · `SPX-2396` · **Clone Merge Result** — parallel result cards converge into one combined output.
- [x] **NR-054** · `SPX-2397` · **Clone Failure Pop** — one worker collapses while remaining workers continue.
- [ ] **NR-055** · `SPX-2398` · **Clone Capacity Limit** — duplication stops at a visible resource boundary.
- [ ] **NR-056** · `SPX-2399` · **Clone Selection Spread** — selected item duplicates into several contextual actions.
- [ ] **NR-057** · `SPX-2400` · **Clone Recall** — distributed proxies return to their source.
- [ ] **NR-058** · `SPX-2401` · **Clone Difference Highlight** — copies reveal divergent state changes.

## Transformation / Disguise

- [x] **NR-059** · `SPX-2402` · **Transformation Morph** — one profile/card changes into another through a bold silhouette intermediate.
- [ ] **NR-060** · `SPX-2403` · **Disguise Reveal** — apparent identity peels/retracts to expose underlying profile.
- [ ] **NR-061** · `SPX-2404` · **Mode Transformation** — basic control gains additional layers and actions in advanced mode.
- [ ] **NR-062** · `SPX-2405` · **Transformation Timer** — alternate state carries a finite expiry boundary.
- [ ] **NR-063** · `SPX-2406` · **Revert Burst** — transformed state snaps back through compressed intermediate geometry.
- [ ] **NR-064** · `SPX-2407` · **Identity Compare Overlay** — current and disguised metadata align for comparison.
- [ ] **NR-065** · `SPX-2408` · **Transformation Failure** — morph begins but recoils to original state.

## Body Flicker / High-Speed Navigation

- [x] **NR-066** · `SPX-2409` · **Body Flicker Page Jump** — destination transition uses compressed directional streaks and an abrupt positional handoff.
- [x] **NR-067** · `SPX-2410` · **High-Speed Card Relocation** — selected card leaves a finite afterimage and arrives in another container.
- [ ] **NR-068** · `SPX-2411` · **Instant Route Jump** — map marker compresses into a streak and resolves at destination.
- [ ] **NR-069** · `SPX-2412` · **Afterimage Navigation** — tab indicator leaves two fading echoes during fast movement.
- [ ] **NR-070** · `SPX-2413` · **Flicker Menu Open** — action menu appears through fast lateral separation.
- [ ] **NR-071** · `SPX-2414` · **Momentum Cancel** — high-speed transition brakes and reconstructs source after cancellation.

## Shuriken / Projectile Motion

- [x] **NR-072** · `SPX-2415` · **Shuriken Radial Menu** — abstract four-point geometry rotates open into action sectors.
- [ ] **NR-073** · `SPX-2416` · **Projectile Target Selection** — pointer/keyboard selection launches a small marker into a target slot.
- [ ] **NR-074** · `SPX-2417` · **Multi-Target Throw** — one action sends deterministic tokens to several selected cards.
- [ ] **NR-075** · `SPX-2418` · **Deflected Action Return** — invalid action token curves back to source.
- [ ] **NR-076** · `SPX-2419` · **Projectile Progress Path** — transfer proxy visibly travels through checkpoints.
- [ ] **NR-077** · `SPX-2420` · **Pinned Target Marker** — selected target receives a small embedded indicator.
- [ ] **NR-078** · `SPX-2421` · **Trajectory Preview** — curved path constructs before commit.

## Kunai / Precision Selection

- [ ] **NR-079** · `SPX-2422` · **Precision Pin Selection** — a narrow marker snaps into the selected row/card edge.
- [ ] **NR-080** · `SPX-2423` · **Pinned Note Action** — annotation token travels into an exact location and remains attached.
- [ ] **NR-081** · `SPX-2424` · **Target Edge Strike** — action confirmation hits a specific card boundary and creates a finite crack/ripple.
- [ ] **NR-082** · `SPX-2425` · **Quick-Action Belt** — compact tool row fans out from a pinned trigger.
- [ ] **NR-083** · `SPX-2426` · **Pin Removal Eject** — attached token pulls out and returns to source.

## Ninja Wire / Connection Systems

- [x] **NR-084** · `SPX-2427` · **Wire Connection Draw** — thin line rapidly connects two selected nodes.
- [ ] **NR-085** · `SPX-2428` · **Tripwire Threshold** — crossing a configured line triggers one finite alert.
- [ ] **NR-086** · `SPX-2429` · **Network Restraint** — several connected nodes become constrained by a shared wire polygon.
- [ ] **NR-087** · `SPX-2430` · **Wire Tension Slider** — drag distance changes line tension and state.
- [ ] **NR-088** · `SPX-2431` · **Connection Cut** — removing a relation causes line to snap/retract from both ends.
- [ ] **NR-089** · `SPX-2432` · **Wire Routing** — connection avoids fixed obstacles through predetermined bends.

## Paper Bomb / Countdown Interfaces

- [x] **NR-090** · `SPX-2433` · **Explosive Tag Countdown** — attached warning token counts down through increasingly intense structural states.
- [ ] **NR-091** · `SPX-2434` · **Timed Delete Tag** — destructive action attaches a visible expiry marker before final removal.
- [ ] **NR-092** · `SPX-2435` · **Chain Detonation Progress** — one completed stage triggers the next in a finite linked sequence.
- [ ] **NR-093** · `SPX-2436` · **Disarm Interaction** — hold/sequence action removes countdown before zero.
- [ ] **NR-094** · `SPX-2437` · **Detonation Radius Preview** — affected items are highlighted before commit.
- [ ] **NR-095** · `SPX-2438` · **Failed Disarm Freeze** — timer reaches zero and locks into result state without uncontrolled flashing.

## Smoke / Concealment

- [x] **NR-096** · `SPX-2439` · **Smoke Mask Transition** — overlapping abstract circles/blur-free shapes cover a swap and disperse.
- [ ] **NR-097** · `SPX-2440` · **Concealed Content Reveal** — information emerges as opacity mask clears from centre outward.
- [ ] **NR-098** · `SPX-2441` · **Smoke Screen Modal** — background becomes obscured by layered opaque forms while dialog stays crisp.
- [ ] **NR-099** · `SPX-2442` · **Concealment Meter** — visual density maps to a scalar stealth value.
- [ ] **NR-100** · `SPX-2443` · **Smoke Clear Completion** — blocked state disperses after a process completes.

## Fire Style

- [x] **NR-101** · `SPX-2444` · **Fireball Commit** — charge grows from a compact control then shoots into a target to confirm action.
- [ ] **NR-102** · `SPX-2445` · **Ignition Toggle** — dormant state catches into an active high-energy mode.
- [ ] **NR-103** · `SPX-2446` · **Heat Threshold Escalation** — resource/control changes state at safe, warning and critical thresholds.
- [ ] **NR-104** · `SPX-2447` · **Burning Progress Edge** — determinate progress consumes an edge/strip.
- [ ] **NR-105** · `SPX-2448` · **Scorch Delete** — removed card darkens/fragments from one edge before collapsing.
- [ ] **NR-106** · `SPX-2449` · **Cooldown Embers** — finite residual particles/marks disappear after activation.
- [ ] **NR-107** · `SPX-2450` · **Firewall Barrier** — active boundary blocks invalid transfer.

## Water Style

- [x] **NR-108** · `SPX-2451` · **Water Wave Page Transition** — layered curved masks sweep across the viewport to reveal destination.
- [ ] **NR-109** · `SPX-2452` · **Water Clone Split** — one information card divides into translucent parallel copies.
- [ ] **NR-110** · `SPX-2453` · **Flowing Progress Channel** — determinate progress travels through a curved route.
- [ ] **NR-111** · `SPX-2454` · **Ripple Selection** — selected point sends one bounded concentric response.
- [ ] **NR-112** · `SPX-2455` · **Water Prison Lock** — content becomes contained inside circular translucent boundary.
- [ ] **NR-113** · `SPX-2456` · **Current Redirect** — drag redirects a flowing connector to another destination.
- [ ] **NR-114** · `SPX-2457` · **Drain State** — filled container recedes to zero during resource consumption.

## Wind Style

- [x] **NR-115** · `SPX-2458` · **Wind Slice Transition** — several diagonal cuts sweep through current content and reveal the next state.
- [ ] **NR-116** · `SPX-2459` · **Rasengan-Inspired Orb Charge** — original swirling segmented orb accumulates from pointer hold, then resolves into action.
- [ ] **NR-117** · `SPX-2460` · **Pressure Burst Button** — activation sends a single expanding distortion ring.
- [ ] **NR-118** · `SPX-2461` · **Wind Tunnel Navigation** — directional lines compress perspective during page movement.
- [ ] **NR-119** · `SPX-2462` · **Slice Delete** — card separates along two diagonal seams before removal.
- [ ] **NR-120** · `SPX-2463` · **Airflow Direction Selector** — vector-like control rotates to selected direction.

## Lightning Style

- [x] **NR-121** · `SPX-2464` · **Lightning Target Acquisition** — branching line rapidly finds and locks onto a selected target.
- [ ] **NR-122** · `SPX-2465` · **Chidori-Inspired Charge Field** — original angular electrical field densifies around a hold-to-confirm action.
- [ ] **NR-123** · `SPX-2466` · **Circuit Activation Chain** — nodes activate in fast branching order.
- [ ] **NR-124** · `SPX-2467` · **Lightning Error Strike** — invalid field receives one sharp finite electrical outline.
- [ ] **NR-125** · `SPX-2468` · **Conductive Transfer** — signal jumps between connected cards.
- [ ] **NR-126** · `SPX-2469` · **Static Discharge Reset** — residual line segments collapse after action.

## Earth Style

- [x] **NR-127** · `SPX-2470` · **Earth Wall Blocker** — segmented slabs rise to lock/protect a region.
- [ ] **NR-128** · `SPX-2471` · **Ground-Up Card Reveal** — card assembles vertically from chunky blocks.
- [ ] **NR-129** · `SPX-2472` · **Stone Barrier Progress** — protection meter adds/removes visible structural segments.
- [ ] **NR-130** · `SPX-2473` · **Terrain Raise Selection** — selected item rises as a solid platform while neighbours remain flat.
- [ ] **NR-131** · `SPX-2474` · **Cracked Validation Error** — invalid surface gains finite fracture geometry.
- [ ] **NR-132** · `SPX-2475` · **Barrier Collapse** — protection blocks fall/retract in sequence.

## Elemental Combination

- [x] **NR-133** · `SPX-2476` · **Element Merge Recipe** — two capability tokens travel into a central synthesis slot and create a new state.
- [ ] **NR-134** · `SPX-2477` · **Element Compatibility Matrix** — selection highlights valid/invalid combinations.
- [ ] **NR-135** · `SPX-2478` · **Dual-Nature Activation** — two resource channels must reach threshold before shared action enables.
- [ ] **NR-136** · `SPX-2479` · **Element Counter Interaction** — opposing states visibly cancel/overpower based on fixed values.
- [ ] **NR-137** · `SPX-2480` · **Combined Technique Card** — two source cards collapse into one richer output.
- [ ] **NR-138** · `SPX-2481` · **Failed Combination Recoil** — incompatible tokens return to sources.

## Rasengan-Inspired Interaction Family

- [x] **NR-139** · `SPX-2482` · **Vortex Hold-to-Confirm** — hold builds concentric rotating segments around a central action.
- [ ] **NR-140** · `SPX-2483` · **Orb Stability Meter** — pointer movement must remain inside tolerance while charge completes.
- [ ] **NR-141** · `SPX-2484` · **Vortex Release** — accumulated segments compress and shoot into completion state.
- [ ] **NR-142** · `SPX-2485` · **Orb Growth Thresholds** — compact, medium and maximum states at fixed hold durations.
- [ ] **NR-143** · `SPX-2486` · **Unstable Charge Failure** — leaving target tolerance causes orb to disperse.
- [ ] **NR-144** · `SPX-2487` · **Cooldown Reformation** — used action reconstructs rings deterministically.

## Dojutsu-Inspired Focus / Vision Modes

- [x] **NR-145** · `SPX-2488` · **Focus Mode Activation** — normal UI narrows into high-contrast analysis mode with a central reticle.
- [ ] **NR-146** · `SPX-2489` · **Motion Prediction Preview** — selected moving element gains a short deterministic future-path ghost.
- [x] **NR-147** · `SPX-2490` · **Weak-Point Detection** — scan identifies and brackets critical regions.
- [ ] **NR-148** · `SPX-2491` · **Copy Pattern Analysis** — observed input sequence is captured and reconstructed beside source.
- [ ] **NR-149** · `SPX-2492` · **Peripheral Data Reveal** — focus mode exposes metadata around viewport edges.
- [ ] **NR-150** · `SPX-2493` · **Vision Mode Toggle** — interface morphs between normal, thermal-like and structural analysis views.
- [ ] **NR-151** · `SPX-2494` · **Focus Fatigue Meter** — prolonged mode drains a determinate resource.
- [ ] **NR-152** · `SPX-2495` · **Occlusion Detection** — hidden target outline appears only during scan.
- [ ] **NR-153** · `SPX-2496` · **Focus Cancel Snap** — analysis overlays retract to exact source positions.

## Byakugan-Inspired Network Inspection

- [x] **NR-154** · `SPX-2497` · **360° Network Scan** — radial scan reveals connected nodes around a central subject.
- [ ] **NR-155** · `SPX-2498` · **Dependency Path Highlight** — selected service exposes upstream/downstream links.
- [ ] **NR-156** · `SPX-2499` · **Critical Node Detection** — scan marks one bottleneck in a graph.
- [ ] **NR-157** · `SPX-2500` · **Flow Blockage Warning** — a connection path becomes visibly interrupted.
- [ ] **NR-158** · `SPX-2501` · **Internal Structure Reveal** — card surface becomes transparent/diagrammatic during inspection.
- [ ] **NR-159** · `SPX-2502` · **Scan Radius Control** — slider changes how many surrounding nodes are included.

## Genjutsu / Illusion Interfaces

- [ ] **NR-160** · `SPX-2503` · **Reality Distortion Transition** — familiar UI subtly misaligns, then snaps into alternate state.
- [ ] **NR-161** · `SPX-2504` · **False Choice Reveal** — apparent selected option dissolves to reveal actual underlying state.
- [ ] **NR-162** · `SPX-2505` · **Loop Detection** — repeating UI sequence gains progressive markers until user breaks the cycle.
- [ ] **NR-163** · `SPX-2506` · **Mirrored Navigation Trap** — directional movement briefly maps to inverted preview before correction.
- [ ] **NR-164** · `SPX-2507` · **Illusion Break** — distorted layers fracture/retract to restore canonical interface.
- [ ] **NR-165** · `SPX-2508` · **Memory Overlay** — prior state appears semi-transparently over current one.

## Sensory / Detection Interfaces

- [x] **NR-166** · `SPX-2509` · **Presence Radar Sweep** — finite radial sweep detects fixed targets.
- [x] **NR-167** · `SPX-2510` · **Chakra Signature Match** — incoming signal shape compares against known profile and resolves match/no-match.
- [ ] **NR-168** · `SPX-2511` · **Threat Proximity Rings** — concentric zones change as target approaches.
- [ ] **NR-169** · `SPX-2512` · **Hidden Target Ping** — one detected target sends a finite pulse.
- [ ] **NR-170** · `SPX-2513` · **Multi-Signature Cluster** — nearby signals group into a compact cluster.
- [ ] **NR-171** · `SPX-2514` · **Signal Lost** — tracked target marker breaks/retracts.
- [ ] **NR-172** · `SPX-2515` · **Detection Confidence Meter** — certainty builds as scan progresses.

## Summoning Interfaces

- [x] **NR-173** · `SPX-2516` · **Summoning Seal Materialise** — radial seal draws beneath an empty mount point, then content rises from it.
- [ ] **NR-174** · `SPX-2517` · **Summoned Tool Arrival** — inventory object emerges from a circular portal-like mask.
- [ ] **NR-175** · `SPX-2518` · **Summon Contract Selection** — several contract cards orbit/fan around a central trigger.
- [ ] **NR-176** · `SPX-2519` · **Summon Resource Cost** — activation consumes a visible resource before content appears.
- [ ] **NR-177** · `SPX-2520` · **Summon Dismiss** — summoned panel collapses back into radial mark.
- [ ] **NR-178** · `SPX-2521` · **Failed Summon** — incomplete seal disperses and resource partially returns.

## Barrier Interfaces

- [x] **NR-179** · `SPX-2522` · **Four-Point Barrier Construct** — four corner nodes connect to form a protected region.
- [ ] **NR-180** · `SPX-2523` · **Barrier Integrity** — impacts remove segments from a polygonal perimeter.
- [ ] **NR-181** · `SPX-2524` · **Access Barrier Open** — one edge retracts after valid credential.
- [x] **NR-182** · `SPX-2525` · **Barrier Breach Alert** — perimeter fractures at exact breach location.
- [ ] **NR-183** · `SPX-2526` · **Barrier Expansion** — protected region grows to include newly selected nodes.

## Medical Ninja / Recovery UI

- [x] **NR-184** · `SPX-2527` · **Healing Progress Field** — damaged/error region reconstructs from centre outward.
- [ ] **NR-185** · `SPX-2528` · **Vital Stability Monitor** — several metrics move from critical into stable bands.
- [ ] **NR-186** · `SPX-2529` · **Recovery Seal** — circular progress completes and converts into stable status badge.
- [ ] **NR-187** · `SPX-2530` · **Injury Localization Scan** — scan highlights affected region in a diagram.
- [ ] **NR-188** · `SPX-2531` · **Treatment Queue Triage** — cases reorder by severity.
- [ ] **NR-189** · `SPX-2532` · **Resource-to-Recovery Transfer** — energy visibly moves from reserve meter into health/status.
- [ ] **NR-190** · `SPX-2533` · **Treatment Complete Release** — constrained patient/card returns to normal layout.

## Mission System

- [x] **NR-191** · `SPX-2534` · **Mission Rank Reveal** — D/C/B/A/S-style generic tier card slams into briefing.
- [ ] **NR-192** · `SPX-2535` · **Mission Scroll Incoming** — compact dispatch scroll arrives and unfurls.
- [x] **NR-193** · `SPX-2536` · **Objective Chain Advance** — completed objective sends a pulse to the next.
- [x] **NR-194** · `SPX-2537` · **Mission Complete Stamp** — briefing receives a large original completion seal.
- [ ] **NR-195** · `SPX-2538` · **Mission Failure Strike** — objectives freeze/desaturate and receive a finite failure slash.
- [ ] **NR-196** · `SPX-2539` · **Mission Difficulty Escalation** — assignment unexpectedly changes tier and card structure.
- [ ] **NR-197** · `SPX-2540` · **Team Assignment** — profile chips move into mission roster.
- [ ] **NR-198** · `SPX-2541` · **Mission Reward Tally** — rewards count into fixed result slots.
- [ ] **NR-199** · `SPX-2542` · **Mission Abandon Re-Roll** — briefing rolls itself closed and exits.
- [ ] **NR-200** · `SPX-2543` · **Optional Objective Reveal** — secondary task unfolds from beneath main objective.

## Ninja Rank / Promotion

- [x] **NR-201** · `SPX-2544` · **Rank Promotion Card** — profile transforms from one rank treatment into the next.
- [ ] **NR-202** · `SPX-2545` · **Promotion List Climb** — profile moves upward through ranked roster.
- [ ] **NR-203** · `SPX-2546` · **Rank Badge Assembly** — credential builds from several qualification markers.
- [ ] **NR-204** · `SPX-2547` · **Rank Requirement Grid** — prerequisites acquire one-by-one.
- [ ] **NR-205** · `SPX-2548` · **Promotion Exam Pass** — result card morphs into persistent rank credential.
- [ ] **NR-206** · `SPX-2549` · **Demotion Drop** — profile descends with subdued treatment.
- [ ] **NR-207** · `SPX-2550` · **Provisional Rank Timer** — temporary promotion carries expiry ring.

## Chunin-Exam-Inspired Testing

- [x] **NR-208** · `SPX-2551` · **Exam Start Seal** — test interface remains locked until a central seal snaps open.
- [ ] **NR-209** · `SPX-2552` · **Timed Question Pressure** — question timer progresses through calm/warning/critical states.
- [ ] **NR-210** · `SPX-2553` · **Answer Lock-In** — selected answer becomes sealed and cannot be changed after commit.
- [ ] **NR-211** · `SPX-2554` · **Score Reveal Scroll** — result document unfurls to expose score.
- [ ] **NR-212** · `SPX-2555` · **Bracket Match Assignment** — competitors/cards travel into tournament slots.
- [ ] **NR-213** · `SPX-2556` · **Exam Elimination** — failed candidate card is crossed and removed from active grid.
- [ ] **NR-214** · `SPX-2557` · **Pass Threshold Break** — score bar crosses qualification line with finite impact.
- [ ] **NR-215** · `SPX-2558` · **Proctor Warning** — rule violation interrupts test with a high-priority strip.
- [ ] **NR-216** · `SPX-2559` · **Question Scroll Transition** — next question arrives through small paper/scroll movement.

## Tournament / Arena

- [x] **NR-217** · `SPX-2560` · **Versus Clash Card** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-218** · `SPX-2561` · **Arena Match Start** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-219** · `SPX-2562` · **Winner Advance Bracket** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-220** · `SPX-2563` · **Knockout Result Slam** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-221** · `SPX-2564` · **Round Transition** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-222** · `SPX-2565` · **Score Counter Impact** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-223** · `SPX-2566` · **Competitor Health/Resource Compare** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-224** · `SPX-2567` · **Draw Resolution** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-225** · `SPX-2568` · **Spectator Momentum Meter** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Village Administration

- [x] **NR-226** · `SPX-2569` · **Mission Board Dispatch** — job cards move from unassigned board into team lanes.
- [ ] **NR-227** · `SPX-2570` · **Ninja Availability Roster** — profile states change between available, deployed and recovery.
- [ ] **NR-228** · `SPX-2571` · **Village Alert Level** — calm dashboard structurally escalates through threat levels.
- [ ] **NR-229** · `SPX-2572` · **Gate Access Approval** — credential token passes through a barrier control.
- [ ] **NR-230** · `SPX-2573` · **Patrol Route Assignment** — team marker receives a route on schematic map.
- [ ] **NR-231** · `SPX-2574` · **Resource Allocation Board** — limited resources are dragged between missions.
- [ ] **NR-232** · `SPX-2575` · **Message Hawk Arrival** — abstract courier notification lands in inbox.
- [ ] **NR-233** · `SPX-2576` · **Archive Scroll Filing** — completed mission rolls into archive stack.

## Hokage / Command Interface

- [ ] **NR-234** · `SPX-2577` · **Priority Mission Override** — high-priority order physically displaces ordinary tasks.
- [ ] **NR-235** · `SPX-2578` · **Village-Wide Alert Takeover** — dashboard switches into emergency command mode.
- [ ] **NR-236** · `SPX-2579` · **Team Deployment Map** — several squads travel from roster into map regions.
- [ ] **NR-237** · `SPX-2580` · **Approval Seal** — decision receives a strong official stamp.
- [ ] **NR-238** · `SPX-2581` · **Command Chain Expand** — hierarchy unfolds from leader to teams.
- [ ] **NR-239** · `SPX-2582` · **Crisis Resource Reallocation** — resources transfer between districts.
- [ ] **NR-240** · `SPX-2583` · **Command Dismissal Roll-Up** — resolved order compresses into archive.

## Bingo Book / Target Dossier

- [x] **NR-241** · `SPX-2584` · **Target Dossier Reveal** — restricted profile opens through redaction/seal layers.
- [ ] **NR-242** · `SPX-2585` · **Threat Rank Slam** — target receives oversized danger classification.
- [ ] **NR-243** · `SPX-2586` · **Known Ability Annotation** — notes and arrows accumulate around profile.
- [ ] **NR-244** · `SPX-2587` · **Target Status Update** — active/unknown/captured status transforms in-place.
- [ ] **NR-245** · `SPX-2588` · **Dossier Page Flip** — profile sections change like compact paper pages.
- [ ] **NR-246** · `SPX-2589` · **Redaction Sweep** — sensitive lines become hidden in deterministic sequence.
- [ ] **NR-247** · `SPX-2590` · **Target Cross-Off** — resolved target receives one heavy diagonal mark.

## Team Formation

- [x] **NR-248** · `SPX-2591` · **Three-Person Cell Formation** — three profile cards snap into triangular formation around leader/mission.
- [ ] **NR-249** · `SPX-2592` · **Role Assignment Tokens** — scout/support/lead tokens travel into profiles.
- [ ] **NR-250** · `SPX-2593` · **Team Compatibility Links** — connectors build between compatible members.
- [ ] **NR-251** · `SPX-2594` · **Team Swap** — one member substitutes out while replacement occupies same slot.
- [ ] **NR-252** · `SPX-2595` · **Team Readiness Meter** — individual readiness contributes to shared total.
- [ ] **NR-253** · `SPX-2596` · **Formation Break** — profiles return to roster positions.
- [ ] **NR-254** · `SPX-2597` · **Reserve Member Reveal** — backup profile unfolds from beneath team.

## Rival / Duel Interfaces

- [ ] **NR-255** · `SPX-2598` · **Rival Card Collision** — two profiles slam into a central diagonal boundary.
- [ ] **NR-256** · `SPX-2599` · **Power Comparison Tug** — comparative bar shifts toward stronger metric.
- [ ] **NR-257** · `SPX-2600` · **Technique Counter Preview** — one capability card visually blocks another.
- [ ] **NR-258** · `SPX-2601` · **Advantage Shift** — central divider moves as data changes.
- [ ] **NR-259** · `SPX-2602` · **Duel Countdown** — 3→2→1 sequence compresses into start state.
- [ ] **NR-260** · `SPX-2603` · **Draw Lock** — both sides settle into symmetric result.

## Manga / Anime Presentation

- [ ] **NR-261** · `SPX-2604` · **Manga Panel Break Transition** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-262** · `SPX-2605` · **Speed-Line Focus Reveal** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-263** · `SPX-2606` · **Impact Frame Slam** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-264** · `SPX-2607` · **Freeze-Frame Character Introduction** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-265** · `SPX-2608` · **Episode Title Interrupt** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-266** · `SPX-2609` · **Eyecatch Transition** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-267** · `SPX-2610` · **Ink Brush Wipe** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-268** · `SPX-2611` · **Panel Zoom Focus** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-269** · `SPX-2612` · **Black-and-White Flash Frame** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-270** · `SPX-2613` · **Vertical Manga Caption** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-271** · `SPX-2614` · **Recap Snapshot Cascade** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-272** · `SPX-2615` · **End-Card Freeze** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Ink / Brush Language

- [ ] **NR-273** · `SPX-2616` · **Brush Stroke Page Wipe** — thick irregular stroke masks the page transition.
- [ ] **NR-274** · `SPX-2617` · **Ink Circle Selection** — rough circle draws around selected item.
- [ ] **NR-275** · `SPX-2618` · **Ink Slash Completion** — objective receives one fast diagonal stroke.
- [ ] **NR-276** · `SPX-2619` · **Brush Underline Acquisition** — selected navigation item gains hand-drawn underline.
- [ ] **NR-277** · `SPX-2620` · **Ink Spread Reveal** — black mask blooms then retracts to reveal content.
- [ ] **NR-278** · `SPX-2621` · **Calligraphy Stamp** — result receives original brush-style mark.
- [ ] **NR-279** · `SPX-2622` · **Dry Brush Loading Bar** — determinate progress fills with rough edge.

## Leaf / Nature Motion

- [ ] **NR-280** · `SPX-2623` · **Leaf Swirl Transition** — a finite spiral of simple leaf silhouettes masks a page swap.
- [ ] **NR-281** · `SPX-2624` · **Leaf Arrival Notification** — one leaf traces a curve into a compact message.
- [ ] **NR-282** · `SPX-2625` · **Windblown Card Exit** — dismissed card breaks into a few leaf-like fragments.
- [ ] **NR-283** · `SPX-2626` · **Seasonal Status Shift** — leaf density/color changes between fixed modes.
- [ ] **NR-284** · `SPX-2627` · **Leaf Trail Navigation** — selected route gains finite leaf markers.

## Sand Interfaces

- [ ] **NR-285** · `SPX-2628` · **Sand Shield Construct** — granular-looking CSS particles/blocks gather into protective boundary.
- [ ] **NR-286** · `SPX-2629` · **Sand Burial Delete** — card sinks beneath a rising granular mask before removal.
- [ ] **NR-287** · `SPX-2630` · **Sand Coffin Lock** — content is enclosed by closing irregular panels.
- [ ] **NR-288** · `SPX-2631` · **Sand Flow Progress** — resource moves like an hourglass between two regions.
- [ ] **NR-289** · `SPX-2632` · **Sand Clone Disperse** — proxy breaks into small blocks and disappears.
- [ ] **NR-290** · `SPX-2633` · **Sandstorm Transition** — finite particle field obscures and reveals next state.

## Puppet / Remote Control

- [ ] **NR-291** · `SPX-2634` · **Puppet Wire Control** — draggable controller node moves several linked child elements.
- [ ] **NR-292** · `SPX-2635` · **Remote Action Chain** — one master control triggers dependent components in sequence.
- [ ] **NR-293** · `SPX-2636` · **Control Wire Break** — dependent component becomes inactive when link snaps.
- [ ] **NR-294** · `SPX-2637` · **Multi-Puppet Selector** — control focus transfers between linked targets.
- [ ] **NR-295** · `SPX-2638` · **Puppet Recall** — remote objects return to master positions.

## Insect / Swarm Interfaces

- [ ] **NR-296** · `SPX-2639` · **Swarm Search** — small deterministic dots fan across a region and converge on detected target.
- [ ] **NR-297** · `SPX-2640` · **Distributed Worker Swarm** — many tiny agents process sections and recombine results.
- [ ] **NR-298** · `SPX-2641` · **Swarm Containment** — particles surround a selected card to indicate quarantine.
- [ ] **NR-299** · `SPX-2642` · **Swarm Route Finding** — particles travel along several candidate paths, then only best path remains.
- [ ] **NR-300** · `SPX-2643` · **Swarm Recall** — distributed dots collapse back into source token.

## Shadow Technique Interfaces

- [x] **NR-301** · `SPX-2644` · **Shadow Bind Selection** — dark geometric extension travels from source to target and locks both.
- [ ] **NR-302** · `SPX-2645` · **Linked Motion State** — two controls become synchronised after connection.
- [ ] **NR-303** · `SPX-2646` · **Shadow Range Limit** — binding extension stops/resists at maximum range.
- [ ] **NR-304** · `SPX-2647` · **Bind Release** — connecting shadow retracts back to source.
- [ ] **NR-305** · `SPX-2648` · **Multi-Target Shadow Fork** — one source branches toward several targets.

## Expansion / Size Transformation

- [ ] **NR-306** · `SPX-2649` · **Expansion Button-to-Panel** — compact circular control expands into a large content surface.
- [ ] **NR-307** · `SPX-2650` · **Size Mode Toggle** — selected card grows while neighbours make structural space.
- [ ] **NR-308** · `SPX-2651` · **Expansion Threshold Meter** — scale maps to resource percentage.
- [ ] **NR-309** · `SPX-2652` · **Partial Expansion Preview** — drag controls continuous growth before commit.
- [ ] **NR-310** · `SPX-2653` · **Recompression** — expanded state returns to compact token.

## Rotation / Spin Techniques

- [ ] **NR-311** · `SPX-2654` · **Rotating Defence Loader** — finite circular defensive field runs during protected processing.
- [ ] **NR-312** · `SPX-2655` · **Spin-to-Select Wheel** — radial menu rotates selected option to a fixed acquisition point.
- [ ] **NR-313** · `SPX-2656` · **Rotation Momentum Picker** — drag velocity influences finite wheel settling.
- [ ] **NR-314** · `SPX-2657` · **Spinning Barrier Deflect** — invalid incoming token curves away from protected target.
- [ ] **NR-315** · `SPX-2658` · **Rotation Cooldown** — fast ring slows to a stop as operation completes.

## Curse Mark / Escalation Language

- [ ] **NR-316** · `SPX-2659` · **Corruption Spread State** — dark abstract marks propagate across a card as risk increases.
- [ ] **NR-317** · `SPX-2660` · **Power-at-a-Cost Toggle** — enabling boosted mode simultaneously raises a visible danger meter.
- [ ] **NR-318** · `SPX-2661` · **Escalation Threshold Transform** — crossing a limit changes the entire control silhouette.
- [ ] **NR-319** · `SPX-2662` · **Corruption Purge** — marks retract as recovery completes.
- [ ] **NR-320** · `SPX-2663` · **Containment Seal** — escalation is constrained by a locking overlay.
- [ ] **NR-321** · `SPX-2664` · **Risk Rebound** — disabling boost returns resource but leaves temporary cooldown.

## Tailed-Beast-Inspired Resource Escalation

- [ ] **NR-322** · `SPX-2665` · **Multi-Stage Power Meter** — resource crosses several named stages, adding one abstract trailing segment each time.
- [ ] **NR-323** · `SPX-2666` · **Power Cloak Boundary** — profile gains increasingly dense energy outline as stage rises.
- [ ] **NR-324** · `SPX-2667` · **Control Loss Threshold** — beyond safe stage, normal controls become constrained.
- [ ] **NR-325** · `SPX-2668` · **Stage Reversion** — power reduces one stage at a time.
- [ ] **NR-326** · `SPX-2669` · **Reserve Partnership Meter** — two resource sources gradually synchronise.
- [ ] **NR-327** · `SPX-2670` · **Emergency Suppression** — forced reset collapses all stages into sealed state.

## Sage / Nature Energy Balance

- [ ] **NR-328** · `SPX-2671` · **Three-Way Energy Balance** — three resources must converge into a stable central band.
- [ ] **NR-329** · `SPX-2672` · **Stillness Charge** — progress only accumulates while pointer/device interaction remains still.
- [ ] **NR-330** · `SPX-2673` · **Nature Mode Activation** — balanced resources transform interface into enhanced analysis state.
- [ ] **NR-331** · `SPX-2674` · **Imbalance Warning** — one resource dominating distorts the equilibrium indicator.
- [ ] **NR-332** · `SPX-2675` · **Mode Expiry** — enhanced state drains a determinate timer.
- [ ] **NR-333** · `SPX-2676` · **Balance Recovery** — controls guide resources back to centre.

## Space-Time / Teleportation Interfaces

- [x] **NR-334** · `SPX-2677` · **Teleport Card Transfer** — card compresses into a circular aperture and reconstructs in another slot.
- [ ] **NR-335** · `SPX-2678` · **Portal Page Transition** — destination expands from a small circular/spiral mask.
- [ ] **NR-336** · `SPX-2679` · **Marked Destination Jump** — only pre-marked targets accept instant transfer.
- [ ] **NR-337** · `SPX-2680` · **Warp Inventory Move** — item disappears from source list and materialises in destination.
- [ ] **NR-338** · `SPX-2681` · **Teleport Cooldown Marker** — used destination remains unavailable until ring completes.
- [ ] **NR-339** · `SPX-2682` · **Failed Warp Rebound** — invalid target returns compressed proxy to source.

## Infinite / Recursive Illusion Ideas

- [ ] **NR-340** · `SPX-2683` · **Recursive Card Tunnel** — card repeats inward several levels before resolving to destination.
- [ ] **NR-341** · `SPX-2684` · **Looping Corridor Break** — repeated content positions accumulate evidence of repetition until user exits.
- [ ] **NR-342** · `SPX-2685` · **Nested Modal Illusion** — apparent repeated modal collapses into one canonical state.
- [ ] **NR-343** · `SPX-2686` · **Mirror Stack Transition** — 3--5 reflected panels converge into real content.
- [ ] **NR-344** · `SPX-2687` · **False Reset Reveal** — UI appears reset, then exposes preserved underlying state.

## Tracking / Pursuit

- [ ] **NR-345** · `SPX-2688` · **Target Trail Reconstruction** — recent path draws backward from current marker.
- [ ] **NR-346** · `SPX-2689` · **Pursuit Distance Meter** — two markers converge as distance shrinks.
- [ ] **NR-347** · `SPX-2690` · **Lost Trail Fragmentation** — route line breaks as confidence drops.
- [ ] **NR-348** · `SPX-2691` · **Scent/Signal Cone** — directional search region narrows toward target.
- [ ] **NR-349** · `SPX-2692` · **Trail Reacquired Snap** — fragmented route reconnects after detection.

## Trap / Detection UI

- [ ] **NR-350** · `SPX-2693` · **Trap Armed State** — ordinary zone gains hidden-but-readable armed geometry.
- [ ] **NR-351** · `SPX-2694` · **Tripwire Trigger** — crossing pointer/drag boundary causes one alert and locks state.
- [ ] **NR-352** · `SPX-2695` · **Trap Radius Preview** — hover/focus exposes affected region.
- [ ] **NR-353** · `SPX-2696` · **Disarm Sequence** — several ordered controls must be completed before timer.
- [ ] **NR-354** · `SPX-2697` · **Trap Reset** — triggered mechanism reconstructs to armed state.

## Stealth / Infiltration

- [ ] **NR-355** · `SPX-2698` · **Stealth Mode Collapse** — colourful interface reduces into sparse low-visibility outline system.
- [ ] **NR-356** · `SPX-2699` · **Detection Meter** — observer awareness moves through hidden/suspicious/detected.
- [ ] **NR-357** · `SPX-2700` · **Cover-to-Cover Navigation** — selection jumps between safe nodes with risk preview.
- [ ] **NR-358** · `SPX-2701` · **Visibility Cone Avoidance** — moving proxy shows safe/unsafe areas.
- [ ] **NR-359** · `SPX-2702` · **Alarm Trigger Takeover** — stealth UI abruptly becomes emergency state.
- [ ] **NR-360** · `SPX-2703` · **Alarm Cooldown** — detected state returns to suspicious then hidden.

## Intelligence / Espionage

- [ ] **NR-361** · `SPX-2704` · **Intercepted Message Decode** — scrambled blocks resolve into readable message in stages.
- [ ] **NR-362** · `SPX-2705` · **Dossier Redaction Reveal** — authorised action removes redactions one-by-one.
- [ ] **NR-363** · `SPX-2706` · **Spy Network Graph** — hidden relationships construct between profiles.
- [ ] **NR-364** · `SPX-2707` · **Message Authenticity Check** — seal/signature comparison resolves trusted/untrusted.
- [ ] **NR-365** · `SPX-2708` · **Intel Confidence Meter** — multiple evidence inputs raise confidence.
- [ ] **NR-366** · `SPX-2709` · **Burn After Reading** — temporary message destructs after expiry using original abstract effect.

## Communication / Messenger Effects

- [ ] **NR-367** · `SPX-2710` · **Courier Message Arrival** — compact message token travels along a path and unfolds.
- [ ] **NR-368** · `SPX-2711` · **Emergency Transmission** — normal interface is interrupted by high-priority incoming communication.
- [ ] **NR-369** · `SPX-2712` · **Message Seal Open** — unread message remains locked until clicked.
- [ ] **NR-370** · `SPX-2713` · **Reply Scroll Roll-Up** — composed reply compresses into outbound token.
- [ ] **NR-371** · `SPX-2714` · **Delivery Confirmation Flight Path** — token reaches destination and changes to delivered state.

## Inventory / Ninja Tools

- [ ] **NR-372** · `SPX-2715` · **Tool Pouch Radial Menu** — compact pouch button opens into several tool slots.
- [ ] **NR-373** · `SPX-2716` · **Quick Equip Snap** — selected tool travels into active slot.
- [ ] **NR-374** · `SPX-2717` · **Tool Count Decrement** — quantity change receives compact impact feedback.
- [ ] **NR-375** · `SPX-2718` · **Out-of-Stock Collapse** — empty tool becomes disabled and retracts from quick menu.
- [ ] **NR-376** · `SPX-2719` · **Loadout Reorder** — tool chips drag between belt slots.
- [ ] **NR-377** · `SPX-2720` · **Tool Restock** — count reconstructs with finite refill animation.

## Crafting / Preparation

- [ ] **NR-378** · `SPX-2721` · **Tag Preparation Sequence** — ingredients/components move into a prepared tool.
- [ ] **NR-379** · `SPX-2722` · **Scroll Packing** — selected inventory items compress into scroll storage.
- [ ] **NR-380** · `SPX-2723` · **Loadout Checklist** — required tools acquire checks before mission readiness.
- [ ] **NR-381** · `SPX-2724` · **Recipe Compatibility** — invalid components recoil from assembly slot.
- [ ] **NR-382** · `SPX-2725` · **Preparation Complete Seal** — finished kit receives compact stamp.

## Maps / World Navigation

- [ ] **NR-383** · `SPX-2726` · **Mission Route Draw** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-384** · `SPX-2727` · **Village Marker Acquisition** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-385** · `SPX-2728` · **Squad Travel Path** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-386** · `SPX-2729` · **Threat Radius Expansion** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-387** · `SPX-2730` · **Border Crossing Alert** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-388** · `SPX-2731` · **Hidden Route Reveal** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-389** · `SPX-2732` · **Map Scroll Unfold** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-390** · `SPX-2733` · **Waypoint Completion** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-391** · `SPX-2734` · **Return Route Reconstruction** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Village Gate / Access Control

- [ ] **NR-392** · `SPX-2735` · **Gate Barrier Open** — two structural panels retract after successful verification.
- [ ] **NR-393** · `SPX-2736` · **Identity Scroll Verify** — credential unfurls and receives approval seal.
- [ ] **NR-394** · `SPX-2737` · **Watchlist Alert** — identity card shifts into high-priority restricted state.
- [ ] **NR-395** · `SPX-2738` · **Visitor Pass Issue** — temporary credential constructs from blank card.
- [ ] **NR-396** · `SPX-2739` · **Gate Close Countdown** — access window drains before panels close.

## Akatsuki-Inspired Threat Network

- [ ] **NR-397** · `SPX-2740` · **Threat Network Reveal** — dark profile nodes connect into an organisation graph.
- [ ] **NR-398** · `SPX-2741` · **Member Dossier Slam** — target profile arrives with high-threat classification.
- [ ] **NR-399** · `SPX-2742` · **Cell Pairing Interface** — two threat profiles snap into an operational pair.
- [ ] **NR-400** · `SPX-2743` · **Network Node Eliminated** — resolved node collapses and graph reroutes.
- [ ] **NR-401** · `SPX-2744` · **Unknown Member Reveal** — obscured node gradually gains verified metadata.
- [ ] **NR-402** · `SPX-2745` · **Threat Network Fragmentation** — organisation graph breaks into isolated cells.

## ANBU / Covert Operations Language

- [ ] **NR-403** · `SPX-2746` · **Masked Identity Reveal** — anonymous operative card selectively exposes metadata.
- [ ] **NR-404** · `SPX-2747` · **Covert Mission Brief** — dark compact dossier unfolds into objectives.
- [ ] **NR-405** · `SPX-2748` · **Clearance Level Unlock** — layers of redaction retract after verification.
- [ ] **NR-406** · `SPX-2749` · **Silent Deployment** — operative chips leave roster with minimal high-speed motion.
- [ ] **NR-407** · `SPX-2750` · **Identity Reconceal** — revealed metadata returns to masked state.

## Training Ground Interfaces

- [ ] **NR-408** · `SPX-2751` · **Training Start Countdown** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-409** · `SPX-2752` · **Target Acquisition Course** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-410** · `SPX-2753` · **Technique Accuracy Meter** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-411** · `SPX-2754` · **Chakra Control Exercise** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-412** · `SPX-2755` · **Obstacle Checkpoint Advance** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-413** · `SPX-2756` · **Training Failure Freeze** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-414** · `SPX-2757` · **Personal Best Break** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-415** · `SPX-2758` · **Recovery Interval** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-416** · `SPX-2759` · **Instructor Override** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Academy / Classroom

- [ ] **NR-417** · `SPX-2760` · **Roster Attendance Sweep** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-418** · `SPX-2761` · **Technique Grade Stamp** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-419** · `SPX-2762` · **Team Assignment Shuffle** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-420** · `SPX-2763` · **Exam Timer Pressure** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-421** · `SPX-2764` · **Instructor Annotation** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-422** · `SPX-2765` · **Lesson Scroll Reveal** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-423** · `SPX-2766` · **Class Bell Schedule Flip** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Mentor / Training Progression

- [x] **NR-424** · `SPX-2767` · **Technique Mastery Tree** — skill nodes unlock along a branching path.
- [ ] **NR-425** · `SPX-2768` · **Mentor Demonstration Replay** — reference sequence plays once then waits for user reproduction.
- [ ] **NR-426** · `SPX-2769` · **Practice Accuracy Compare** — user input path overlays target path.
- [ ] **NR-427** · `SPX-2770` · **Mastery Rank-Up** — technique card transforms into mastered state.
- [ ] **NR-428** · `SPX-2771` · **Correction Annotation** — failed step receives precise note/arrow.
- [ ] **NR-429** · `SPX-2772` · **Training Streak Counter** — consecutive successful attempts build a finite stack.

## Technique Learning

- [ ] **NR-430** · `SPX-2773` · **Technique Scroll Learning** — scroll reveals stages and user completes them sequentially.
- [ ] **NR-431** · `SPX-2774` · **Prerequisite Seal Grid** — required skills activate central technique.
- [ ] **NR-432** · `SPX-2775` · **Technique Acquired Burst** — completed learning transforms lesson into persistent ability card.
- [ ] **NR-433** · `SPX-2776` · **Practice Cooldown** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-434** · `SPX-2777` · **Mastery Percentage** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-435** · `SPX-2778` · **Technique Forgotten/Locked State** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Status Effects

- [ ] **NR-436** · `SPX-2779` · **Poisoned State Propagation** — warning markings spread according to severity.
- [ ] **NR-437** · `SPX-2780` · **Paralysis Lock** — controls become progressively constrained.
- [ ] **NR-438** · `SPX-2781` · **Genjutsu Distortion** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-439** · `SPX-2782` · **Burning Damage Tick** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-440** · `SPX-2783` · **Slowed State Drag** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-441** · `SPX-2784` · **Sealed Ability Lock** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-442** · `SPX-2785` · **Status Cleanse** — effects retract in deterministic order.

## Health / Battle HUD Concepts

- [ ] **NR-443** · `SPX-2786` · **Health Critical Takeover** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-444** · `SPX-2787` · **Chakra Resource Drain** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-445** · `SPX-2788` · **Substitution Escape** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-446** · `SPX-2789` · **Technique Cooldown** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-447** · `SPX-2790` · **Status Effect Stack** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-448** · `SPX-2791` · **Target Switch Reticle** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-449** · `SPX-2792` · **Combo Counter** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-450** · `SPX-2793` · **Recovery Item Use** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Boss / Major Threat Presentation

- [ ] **NR-451** · `SPX-2794` · **Major Threat Introduction** — viewport briefly freezes while enormous threat card enters.
- [ ] **NR-452** · `SPX-2795` · **Multi-Phase Threat Bar** — health/progress crosses boundaries and reconstructs next phase.
- [ ] **NR-453** · `SPX-2796` · **Phase Transition Seal Break** — completed phase shatters a radial boundary.
- [ ] **NR-454** · `SPX-2797` · **Threat Ability Telegraph** — upcoming dangerous action shows deterministic preview region.
- [ ] **NR-455** · `SPX-2798` · **Enrage Threshold** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-456** · `SPX-2799` · **Threat Defeated Collapse** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Notifications

- [ ] **NR-457** · `SPX-2800` · **Mission Incoming Scroll** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-458** · `SPX-2801` · **Threat Alert Slam** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-459** · `SPX-2802` · **Rank Promotion Burst** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-460** · `SPX-2803` · **Technique Acquired** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-461** · `SPX-2804` · **Team Message Arrival** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-462** · `SPX-2805` · **Chakra Low Warning** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-463** · `SPX-2806` · **Seal Broken Alert** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-464** · `SPX-2807` · **Training Result Toast** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-465** · `SPX-2808` · **Courier Delivery** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Loading States

- [ ] **NR-466** · `SPX-2809` · **Hand-Sign Loader** — finite sequence of abstract signs ends in loaded state.
- [ ] **NR-467** · `SPX-2810` · **Chakra Network Loader** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-468** · `SPX-2811` · **Summoning Seal Loader** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-469** · `SPX-2812` · **Scroll Decode Loader** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-470** · `SPX-2813` · **Sensory Scan Loader** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-471** · `SPX-2814` · **Barrier Construction Loader** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-472** · `SPX-2815` · **Mission Dispatch Loader** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-473** · `SPX-2816` · **Ink Brush Progress** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Errors

- [ ] **NR-474** · `SPX-2817` · **Seal Mismatch Error** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-475** · `SPX-2818` · **Chakra Exhausted** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-476** · `SPX-2819` · **Failed Technique Sequence** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-477** · `SPX-2820` · **Barrier Breach** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-478** · `SPX-2821` · **Target Lost** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-479** · `SPX-2822` · **Invalid Element Combination** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-480** · `SPX-2823` · **Mission Intel Compromised** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-481** · `SPX-2824` · **Tool Depleted** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Success / Completion

- [ ] **NR-482** · `SPX-2825` · **Mission Complete Seal** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-483** · `SPX-2826` · **Technique Mastered** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-484** · `SPX-2827` · **Rank Promotion** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-485** · `SPX-2828` · **Exam Passed** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-486** · `SPX-2829` · **Barrier Secured** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-487** · `SPX-2830` · **Target Captured** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-488** · `SPX-2831` · **Training Personal Best** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-489** · `SPX-2832` · **Team Formation Ready** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-490** · `SPX-2833` · **Message Delivered** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Buttons & Controls

- [ ] **NR-491** · `SPX-2834` · **Hold-to-Charge Button** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-492** · `SPX-2835` · **Seal Toggle** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-493** · `SPX-2836` · **Hand-Sign Sequence Button** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-494** · `SPX-2837` · **Shuriken Radial Action** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-495** · `SPX-2838` · **Chakra Allocation Slider** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-496** · `SPX-2839` · **Scroll Expand Button** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-497** · `SPX-2840` · **Summon Action** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-498** · `SPX-2841` · **Barrier Strength Dial** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-499** · `SPX-2842` · **Stealth Mode Switch** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Cards

- [ ] **NR-500** · `SPX-2843` · **Mission Scroll Card** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-501** · `SPX-2844` · **Ninja Profile Dossier** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-502** · `SPX-2845` · **Technique Card** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-503** · `SPX-2846` · **Target Bingo-Book Card** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-504** · `SPX-2847` · **Team Formation Card** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-505** · `SPX-2848` · **Summon Contract Card** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-506** · `SPX-2849` · **Rank Credential** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-507** · `SPX-2850` · **Tool Loadout Card** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-508** · `SPX-2851` · **Academy Result Card** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-509** · `SPX-2852` · **Village Incident Card** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Drag & Drop

- [ ] **NR-510** · `SPX-2853` · **Team Assignment Drag** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-511** · `SPX-2854` · **Tool Equip Drag** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-512** · `SPX-2855` · **Scroll Packing Drag** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-513** · `SPX-2856` · **Mission Priority Reorder** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-514** · `SPX-2857` · **Element Combination Drag** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-515** · `SPX-2858` · **Barrier Node Placement** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-516** · `SPX-2859` · **Invalid Technique Recoil** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Data Visualisation

- [ ] **NR-517** · `SPX-2860` · **Chakra Network Graph** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-518** · `SPX-2861` · **Mission Risk Radar** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-519** · `SPX-2862` · **Threat Network Graph** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-520** · `SPX-2863` · **Team Compatibility Triangle** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-521** · `SPX-2864` · **Training Accuracy Timeline** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-522** · `SPX-2865` · **Resource Allocation Sankey-Like Flow** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-523** · `SPX-2866` · **Rank History Ladder** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-524** · `SPX-2867` · **Sensory Detection Radar** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Microinteractions

- [ ] **NR-525** · `SPX-2868` · **Seal Stamp** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-526** · `SPX-2869` · **Objective Slash** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-527** · `SPX-2870` · **Chakra Ready Spark** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-528** · `SPX-2871` · **Technique Cooldown Snap** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-529** · `SPX-2872` · **Target Lock Tick** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-530** · `SPX-2873` · **Tool Equip Click** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-531** · `SPX-2874` · **Rank Number Flip** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-532** · `SPX-2875` · **Mission Accepted Mark** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-533** · `SPX-2876` · **Barrier Node Connect** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-534** · `SPX-2877` · **Scroll Tab Unfurl** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-535** · `SPX-2878` · **Roster Available Tick** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-536** · `SPX-2879` · **Threat Level Step** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-537** · `SPX-2880` · **Detection Ping** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-538** · `SPX-2881` · **Team Link Acquire** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Full-Viewport Transitions

- [ ] **NR-539** · `SPX-2882` · **Manga Panel Break** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-540** · `SPX-2883` · **Brush Stroke Wipe** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-541** · `SPX-2884` · **Water Wave Transition** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-542** · `SPX-2885` · **Smoke Substitution Transition** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-543** · `SPX-2886` · **Teleport Aperture Transition** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-544** · `SPX-2887` · **Summoning Seal Reveal** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-545** · `SPX-2888` · **Lightning Branch Transition** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-546** · `SPX-2889` · **Genjutsu Distortion Transition** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-547** · `SPX-2890` · **Scroll Unroll Transition** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-548** · `SPX-2891` · **Earth Wall Reveal** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Reduced-Motion Static Treatments

- [ ] **NR-549** · `SPX-2892` · **Static Seal Lock** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-550** · `SPX-2893` · **Static Chakra Boundary** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-551** · `SPX-2894` · **Static Target Brackets** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-552** · `SPX-2895` · **Static Mission Rank** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-553** · `SPX-2896` · **Static Emergency Threat State** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-554** · `SPX-2897` · **Static Brush Selection** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-555** · `SPX-2898` · **Static Barrier** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-556** · `SPX-2899` · **Static Element Mode** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-557** · `SPX-2900` · **Static Sensory Detection** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).

## Experimental Software Mappings

- [ ] **NR-558** · `SPX-2901` · **Shadow Clones as Parallel Compute Jobs** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-559** · `SPX-2902` · **Hand Signs as Command Palette Chords** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-560** · `SPX-2903` · **Chakra as API/Compute Budget** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-561** · `SPX-2904` · **Seals as Permission/Access Control** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-562** · `SPX-2905` · **Substitution as Fallback/Failover** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-563** · `SPX-2906` · **Summoning as Lazy Component Materialisation** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-564** · `SPX-2907` · **Sensory Scan as Observability/Service Discovery** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-565** · `SPX-2908` · **Mission Scrolls as Work Tickets** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-566** · `SPX-2909` · **Ninja Teams as Worker Pools** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-567** · `SPX-2910` · **Dojutsu-Style Focus as Debug/Inspection Mode** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-568** · `SPX-2911` · **Barriers as Security Boundaries** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-569** · `SPX-2912` · **Teleportation as Cross-Workspace Transfer** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-570** · `SPX-2913` · **Element Combination as Workflow Composition** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-571** · `SPX-2914` · **Genjutsu as Simulation/Preview Mode** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-572** · `SPX-2915` · **Medical Recovery as Self-Healing Service State** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-573** · `SPX-2916` · **Bingo Book as Incident/Threat Intelligence** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-574** · `SPX-2917` · **Promotion Exam as Certification Workflow** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
- [ ] **NR-575** · `SPX-2918` · **Tool Pouch as Contextual Command Launcher** — portable ninja/anime-inspired interaction (blurb omitted in source shortlist).
