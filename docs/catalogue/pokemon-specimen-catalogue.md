# Pokémon Specimen Checklist

> Working backlog for portable motion/UI artifacts inspired by Pokémon. Interaction primitives, not game replicas. Avoid copyrighted character art, logos, sprites, extracted assets, audio, and proprietary fonts.

## How to use

- **PK-NNN** — stable catalogue id (this list).
- **SPX-NNN** — specimen registry ref. Unbuilt ideas are pre-assigned `SPX-700`…`SPX-965` — use that ref when implementing; do not invent a different number.
- Non-catalogue specimens (other franchises / originals) use gaps not reserved by open P5 (`SPX-015`–`SPX-312`), P3 (`SPX-400`–`SPX-635`), or open PK rows; prefer leftover `SPX-313`–`SPX-399` or `SPX-636`–`SPX-699` / `SPX-966+`.
- Mark **`[x]`** only when the specimen is registered in `src/specimens/index.ts` with a real `ref` (not `SPX-TODO`) and verified. Agents must update this file in the same change — see `.cursor/rules/37_persona-catalogue.mdc`.
- Progress: **10 / 266** complete.

| Status | Count |
| --- | --- |
| Done | 10 |
| Open | 256 |

## Visual grammar

| Motif | Use for |
| --- | --- |
| Encounter | interruption, discovery, takeover |
| Capture | attempt → uncertainty → resolution |
| Evolution | identity / structure transformation |
| Battle | measurable feedback from an action |
| HP / XP | finite resources and discrete thresholds |
| Pokédex | unknown → identified permanent knowledge |
| Trade / storage | ownership and location transfer |
| Badge / raid | persistent achievement; collective permission |

## Shipped (mapped to live specimens)

| PK | SPX | Specimen id | Title |
| --- | --- | --- | --- |
| PK-001 | `SPX-700` | `wild-encounter-transition` | Wild Encounter Transition |
| PK-012 | `SPX-711` | `critical-capture` | Critical Capture |
| PK-032 | `SPX-731` | `branch-evolution-choice` | Branch Evolution Choice |
| PK-025 | `SPX-724` | `evolution-silhouette-transformation` | Evolution Silhouette Transformation |
| PK-087 | `SPX-786` | `entry-registration` | Entry Registration |
| PK-061 | `SPX-760` | `delayed-damage-bar` | Delayed Damage Bar |
| PK-027 | `SPX-726` | `evolution-complete` | Evolution Complete |
| PK-014 | `SPX-713` | `capture-breakout` | Capture Breakout |
| PK-063 | `SPX-762` | `level-up-overflow` | Level Up Overflow |
| PK-160 | `SPX-859` | `pixel-hp-drain` | Pixel HP Drain |

## Core first-wave

Curated implementation priority (from the former Tier S / S+ queues). Same checkbox as the master list — checking either counts.

- [ ] **PK-011** · `SPX-710` · **Poké Ball Capture Shake** — capture-uncertainty
- [x] **PK-025** · `SPX-724` · **Evolution Silhouette Transformation** — evolution-transformation
- [x] **PK-032** · `SPX-731` · **Branch Evolution Choice** — evolution-transformation
- [x] **PK-087** · `SPX-786` · **Pokédex Entry Registration** — pok-dex
- [ ] **PK-237** · `SPX-936` · **Raid Ready Check** — multiplayer-collective
- [x] **PK-063** · `SPX-762` · **Level Up Overflow** — hp-xp
- [ ] **PK-225** · `SPX-924` · **Terastallization Crystallise** — scarlet-violet
- [ ] **PK-130** · `SPX-829` · **Link Trade Transfer** — trading-transfer
- [ ] **PK-178** · `SPX-877` · **Poké Radar Pulse** — sinnoh-ds
- [x] **PK-001** · `SPX-700` · **Wild Encounter Transition** — encounters-arrivals
- [x] **PK-012** · `SPX-711` · **Critical Capture** — capture-uncertainty
- [ ] **PK-013** · `SPX-712` · **Capture Success Stars** — capture-uncertainty
- [x] **PK-027** · `SPX-726` · **Evolution Complete** — evolution-transformation
- [ ] **PK-089** · `SPX-788` · **New Species Discovered** — pok-dex
- [ ] **PK-041** · `SPX-740` · **Super Effective Hit** — battle-feedback
- [ ] **PK-103** · `SPX-802` · **Item Obtained** — items-inventory
- [ ] **PK-116** · `SPX-815` · **Move Learned** — moves-abilities
- [ ] **PK-117** · `SPX-816` · **Forget a Move** — moves-abilities
- [ ] **PK-144** · `SPX-843` · **Gym Badge Earned** — gym-badges
- [ ] **PK-145** · `SPX-844` · **Badge Case Insert** — gym-badges

## 1. Encounters & arrivals

- [x] **PK-001** · `SPX-700` · **Wild Encounter Transition** — The current interface is abruptly interrupted by an encounter sweep and a newly discovered entity takes over the plate.
- [ ] **PK-002** · `SPX-701` · **Battle Intro Face-Off** — Two opposing entities enter from opposite sides and lock into a confrontational comparison state.
- [ ] **PK-003** · `SPX-702` · **Poké Ball Encounter Reveal** — A radial capture-device abstraction opens from the centre and reveals new content inside.
- [ ] **PK-004** · `SPX-703` · **Tall Grass Disturbance** — An apparently ordinary region rustles before hidden content emerges.
- [ ] **PK-005** · `SPX-704` · **Cave Encounter Flash** — Darkness closes around the interface before a hidden entity appears from the centre.
- [ ] **PK-006** · `SPX-705` · **Fishing Hook Encounter** — A line becomes taut and physically pulls newly discovered content into the interface.
- [ ] **PK-007** · `SPX-706` · **Double Battle Arrival** — A single-target layout restructures itself as two entities arrive sequentially.
- [ ] **PK-008** · `SPX-707` · **Trainer Challenge** — An opposing identity card enters aggressively and temporarily blocks normal progression.
- [ ] **PK-009** · `SPX-708` · **Horde Encounter** — One expected result unexpectedly expands into several related entities.
- [ ] **PK-010** · `SPX-709` · **Legendary Encounter** — Long restrained anticipation resolves into one unusually dominant reveal

## 2. Capture & uncertainty

- [ ] **PK-011** · `SPX-710` · **Poké Ball Capture Shake** — Content enters a closed container which rocks through three discrete uncertainty checks before resolving.
- [x] **PK-012** · `SPX-711` · **Critical Capture** — A normally multi-stage uncertain operation unexpectedly compresses into one decisive lock.
- [ ] **PK-013** · `SPX-712` · **Capture Success Stars** — A completed uncertain operation receives a restrained three-star confirmation.
- [x] **PK-014** · `SPX-713` · **Capture Breakout** — The container begins resolving but bursts open and restores the unresolved state.
- [ ] **PK-015** · `SPX-714` · **Capture Probability Behaviour** — Confidence is communicated through the stability and motion of the container rather than a conventional percentage bar.
- [ ] **PK-016** · `SPX-715` · **Ball Throw Arc** — An action leaves its source, follows a deterministic arc and reaches a target.
- [ ] **PK-017** · `SPX-716` · **Ball Snap Shut** — Two opposing semicircular regions close around content and commit it.
- [ ] **PK-018** · `SPX-717` · **Guaranteed Capture** — A guaranteed operation skips uncertainty and immediately locks.
- [ ] **PK-019** · `SPX-718` · **Failed Throw Deflection** — An attempted action reaches an invalid target and physically bounces away.
- [ ] **PK-020** · `SPX-719` · **Capture Registered** — A successfully captured entity transforms directly into a permanent catalogue/database record.
- [ ] **PK-021** · `SPX-720` · **Capture Chain** — Several successful uncertain operations accumulate into a visible streak.
- [ ] **PK-022** · `SPX-721` · **Capture Interrupted** — An external state change interrupts the uncertainty sequence before resolution.
- [ ] **PK-023** · `SPX-722` · **Container Selection** — Several capture methods communicate different strengths through geometry before one is chosen.
- [ ] **PK-024** · `SPX-723` · **Shake Counter** — Each discrete shake advances an explicit but restrained internal resolution state

## 3. Evolution & transformation

- [x] **PK-025** · `SPX-724` · **Evolution Silhouette Transformation** — One abstract silhouette oscillates between old and new forms until the destination identity permanently wins.
- [ ] **PK-026** · `SPX-725` · **Evolution Light Burst** — A component becomes an overexposed abstract shape, restructures and resolves as something new.
- [x] **PK-027** · `SPX-726` · **Evolution Complete** — The transformed component settles while the previous identity is formally replaced.
- [ ] **PK-028** · `SPX-727` · **Evolution Cancelled** — Transformation begins, destabilises and deliberately reconstructs the original state.
- [ ] **PK-029** · `SPX-728` · **Item Evolution** — An external object reaches a component and causes its structure to transform.
- [ ] **PK-030** · `SPX-729` · **Trade Evolution** — An entity enters a transfer process and returns transformed.
- [ ] **PK-031** · `SPX-730` · **Level Evolution** — Progress crosses an exact threshold and automatically initiates identity transformation.
- [x] **PK-032** · `SPX-731` · **Branch Evolution Choice** — One current state physically branches into several possible future forms.
- [ ] **PK-033** · `SPX-732` · **Mega Evolution Burst** — A component temporarily restructures into a stronger enhanced state.
- [ ] **PK-034** · `SPX-733` · **Terastal Crystallisation** — Translucent crystalline facets progressively propagate across an existing component.
- [ ] **PK-035** · `SPX-734` · **Dynamax Expansion** — An ordinary component temporarily expands into a dominant presentation state.
- [ ] **PK-036** · `SPX-735` · **Revert / Devolution** — An enhanced state collapses cleanly back into its canonical form.
- [ ] **PK-037** · `SPX-736` · **Evolution Requirement Met** — Several prerequisite markers converge and unlock a transformation.
- [ ] **PK-038** · `SPX-737` · **Evolution Requirement Missing** — Transformation begins to form but an incomplete prerequisite prevents structural change.
- [ ] **PK-039** · `SPX-738` · **Form Change** — Identity remains constant while visual configuration transforms into an alternate form.
- [ ] **PK-040** · `SPX-739` · **Temporary Form Expiry** — An enhanced form reaches a deadline and reconstructs the canonical state

## 4. Battle feedback

- [ ] **PK-041** · `SPX-740` · **Super Effective Hit** — A successful action receives disproportionately strong positive impact feedback.
- [ ] **PK-042** · `SPX-741` · **Not Very Effective Hit** — An action technically succeeds but visibly loses momentum at the target.
- [ ] **PK-043** · `SPX-742` · **No Effect** — An action reaches the target and is structurally rejected.
- [ ] **PK-044** · `SPX-743` · **Critical Hit** — Normal successful feedback receives a sharp secondary impact.
- [ ] **PK-045** · `SPX-744` · **HP Drain** — Resource leaves one entity and visibly travels into another.
- [ ] **PK-046** · `SPX-745` · **Recoil Damage** — A successful outgoing action causes a smaller reverse response to its origin.
- [ ] **PK-047** · `SPX-746` · **Multi-Hit Attack** — Several discrete impacts accumulate into one final result.
- [ ] **PK-048** · `SPX-747` · **Miss / Avoided** — An action passes its target without triggering target state.
- [ ] **PK-049** · `SPX-748` · **Flinch** — A component begins an action but gets interrupted before execution.
- [ ] **PK-050** · `SPX-749` · **Protect Barrier** — Temporary geometry intercepts an incoming interaction.
- [ ] **PK-051** · `SPX-750` · **Substitute Swap** — A target is replaced by a proxy representation immediately before impact.
- [ ] **PK-052** · `SPX-751` · **Stat Increase** — Upward directional energy passes through a metric and increases it.
- [ ] **PK-053** · `SPX-752` · **Stat Decrease** — Downward directional energy passes through a metric and reduces it.
- [ ] **PK-054** · `SPX-753` · **Ability Activated** — A passive capability briefly interrupts normal flow with a compact announcement.
- [ ] **PK-055** · `SPX-754` · **Weather Changed** — The same interface remains while its environmental rules and presentation visibly change.
- [ ] **PK-056** · `SPX-755` · **Turn Priority Shift** — Two queued actions physically exchange execution order.
- [ ] **PK-057** · `SPX-756` · **Speed Tie Resolution** — Two competing actions approach simultaneously before one gains priority.
- [ ] **PK-058** · `SPX-757` · **Immune State** — Incoming interaction reaches a persistent immunity boundary and dissipates.
- [ ] **PK-059** · `SPX-758` · **Damage Roll** — A deterministic demo shows one action resolving into a bounded result range.
- [ ] **PK-060** · `SPX-759` · **Knockout / Faint State** — Active entity loses structural presence and exits its occupied slot

## 5. HP, XP & progression

- [x] **PK-061** · `SPX-760` · **HP Bar Damage Drain** — The primary value responds immediately while a delayed secondary bar catches up behind it.
- [ ] **PK-062** · `SPX-761` · **XP Bar Fill** — Earned progress travels through a long bar and approaches a threshold.
- [x] **PK-063** · `SPX-762` · **Level Up Overflow** — XP reaches 100%, increments the level, resets and continues with leftover progress.
- [ ] **PK-064** · `SPX-763` · **Low HP Warning** — A resource crossing a critical threshold causes a restrained persistent warning state.
- [ ] **PK-065** · `SPX-764` · **Healing Recovery** — A depleted metric reconstructs upward through discrete recovery pulses.
- [ ] **PK-066** · `SPX-765` · **Full Restore** — Several damaged metrics recover together but finish in a controlled sequence.
- [ ] **PK-067** · `SPX-766` · **EXP Share** — One earned resource divides into multiple streams and reaches several recipients.
- [ ] **PK-068** · `SPX-767` · **Level Up Stat Tally** — Several numeric attributes increment sequentially.
- [ ] **PK-069** · `SPX-768` · **Level Up Results Card** — Old and new attributes compare through staged increases.
- [ ] **PK-070** · `SPX-769` · **Max Level Lock** — Progress reaches terminal state and progression affordances permanently settle.
- [ ] **PK-071** · `SPX-770` · **XP Gain Packet** — A discrete earned-XP token travels from event result into the progression meter.
- [ ] **PK-072** · `SPX-771` · **Bonus XP Multiplier** — A normal reward is visibly amplified before entering the progression system.
- [ ] **PK-073** · `SPX-772` · **Shared Level Threshold** — Several entities approach the same milestone at different rates.
- [ ] **PK-074** · `SPX-773` · **Overflow Reward Chain** — One large reward crosses several thresholds in a single sequence

## 6. Status effects

- [ ] **PK-075** · `SPX-774` · **Poison Tick** — Recurring resource reduction receives a short deterministic distortion.
- [ ] **PK-076** · `SPX-775` · **Burn Tick** — Periodic reduction is paired with restrained edge-energy feedback.
- [ ] **PK-077** · `SPX-776` · **Sleep State** — A component enters a subdued inactive state with minimal ascending sleep geometry.
- [ ] **PK-078** · `SPX-777` · **Paralysis Interruption** — An attempted action occasionally locks partway through its choreography.
- [ ] **PK-079** · `SPX-778` · **Frozen State** — A translucent angular shell forms around a component and prevents interaction.
- [ ] **PK-080** · `SPX-779` · **Confusion State** — Directional indicators orbit briefly before an uncertain action resolves.
- [ ] **PK-081** · `SPX-780` · **Infatuation Interrupt** — An anticipated action is interrupted by restrained heart geometry.
- [ ] **PK-082** · `SPX-781` · **Status Cleansed** — A persistent state marker breaks away and canonical presentation returns.
- [ ] **PK-083** · `SPX-782` · **Multiple Status Prevention** — A second incompatible status approaches and gets rejected.
- [ ] **PK-084** · `SPX-783` · **Status Immunity** — A status token reaches the entity but cannot attach.
- [ ] **PK-085** · `SPX-784` · **Status Expired** — A temporary state reaches its final tick and cleanly detaches.
- [ ] **PK-086** · `SPX-785` · **Status Transfer** — A persistent state leaves one entity and attaches to another

## 7. Pokédex & data interfaces

- [x] **PK-087** · `SPX-786` · **Pokédex Entry Registration** — An unknown silhouette becomes identified, numbered and permanently indexed.
- [ ] **PK-088** · `SPX-787` · **Pokédex Scan** — A scanner traverses an entity and progressively reveals structured metadata.
- [ ] **PK-089** · `SPX-788` · **New Species Discovered** — An empty catalogue slot transforms into a populated permanent record.
- [ ] **PK-090** · `SPX-789` · **Pokédex Number Roll** — An index rapidly advances before locking onto the newly discovered entry.
- [ ] **PK-091** · `SPX-790` · **Habitat Map Reveal** — Regions illuminate sequentially to communicate where something exists.
- [ ] **PK-092** · `SPX-791` · **Type Classification** — An unknown entity receives one or two categorical classifications after analysis.
- [ ] **PK-093** · `SPX-792` · **Seen vs Caught State** — A partial record transforms into a complete record.
- [ ] **PK-094** · `SPX-793` · **Form Switcher** — One indexed identity switches between alternate representations.
- [ ] **PK-095** · `SPX-794` · **Search Scan** — A query sends an energetic local scan through catalogue entries.
- [ ] **PK-096** · `SPX-795` · **Unknown → Identified** — Question-mark metadata progressively resolves into name, classification and details.
- [ ] **PK-097** · `SPX-796` · **Regional Pokédex Filter** — A large catalogue reorganises around a selected region/category.
- [ ] **PK-098** · `SPX-797` · **Entry Comparison** — Two indexed records enter a side-by-side analytical state.
- [ ] **PK-099** · `SPX-798` · **Data Completion Meter** — Record completeness grows as missing metadata becomes known.
- [ ] **PK-100** · `SPX-799` · **Rare Entry Discovery** — A normal registration flow receives a restrained exceptional classification.
- [ ] **PK-101** · `SPX-800` · **Search by Silhouette** — Unknown visual form narrows a local dataset to possible matches.
- [ ] **PK-102** · `SPX-801` · **Pokédex Book Registration** — A discovered record physically joins a shelf/grid of indexed book-like entries

## 8. Items & inventory

- [ ] **PK-103** · `SPX-802` · **Item Obtained** — An object arrives, rotates once, docks into an inventory slot and increments quantity.
- [ ] **PK-104** · `SPX-803` · **Rare Item Obtained** — Acquisition receives a slower, more deliberate reveal before storage.
- [ ] **PK-105** · `SPX-804` · **Item Used** — An inventory object leaves its slot, reaches a target and disappears on application.
- [ ] **PK-106** · `SPX-805` · **Item Consumed Count** — Usage animation and quantity decrement remain visibly connected.
- [ ] **PK-107** · `SPX-806` · **Bag Pocket Switch** — One inventory category structurally replaces another.
- [ ] **PK-108** · `SPX-807` · **Held Item Attach** — An independent object travels to an entity and docks into a persistent attachment point.
- [ ] **PK-109** · `SPX-808` · **TM Learned** — An external knowledge object enters an entity and becomes a persistent capability.
- [ ] **PK-110** · `SPX-809` · **Inventory Full** — Incoming content reaches storage capacity and is physically rejected.
- [ ] **PK-111** · `SPX-810` · **Item Stack Merge** — A newly acquired duplicate joins an existing stack and increments count.
- [ ] **PK-112** · `SPX-811` · **Item Stack Split** — A quantity divides into two independently movable stacks.
- [ ] **PK-113** · `SPX-812` · **Key Item Lock** — A protected item resists ordinary removal behaviour.
- [ ] **PK-114** · `SPX-813` · **Item Category Sort** — Inventory entries reorganise into deterministic category groups.
- [ ] **PK-115** · `SPX-814` · **Quick Item Carousel** — A small subset of items rotates through a compact selection mechanism

## 9. Moves & abilities

- [ ] **PK-116** · `SPX-815` · **Move Learned** — An empty capability slot receives and permanently locks a new command.
- [ ] **PK-117** · `SPX-816` · **Forget a Move** — Four existing capabilities rearrange as one leaves and another takes its exact place.
- [ ] **PK-118** · `SPX-817` · **Move Selection** — Four-command battle menu uses decisive movement to establish selection.
- [ ] **PK-119** · `SPX-818` · **PP Depletion** — Available action capacity visibly reduces every time a command executes.
- [ ] **PK-120** · `SPX-819` · **Move Disabled** — One available command becomes temporarily inaccessible.
- [ ] **PK-121** · `SPX-820` · **Ability Proc** — A passive effect briefly interrupts the normal interaction sequence.
- [ ] **PK-122** · `SPX-821` · **Ability Swap** — Two entities exchange persistent capability markers.
- [ ] **PK-123** · `SPX-822` · **Move Charging** — First interaction stores energy; a later interaction releases it.
- [ ] **PK-124** · `SPX-823` · **Recharge Turn** — A powerful successful action leaves its control temporarily recovering.
- [ ] **PK-125** · `SPX-824` · **Move Replacement Preview** — Existing and proposed capabilities enter a comparison state before commitment.
- [ ] **PK-126** · `SPX-825` · **Move Type Match** — A selected command receives feedback when its classification matches the current entity.
- [ ] **PK-127** · `SPX-826` · **Move Locked In** — A chosen action becomes temporarily committed and other options withdraw.
- [ ] **PK-128** · `SPX-827` · **Priority Move** — One command jumps ahead of the ordinary execution queue.
- [ ] **PK-129** · `SPX-828` · **Ability Suppressed** — A passive capability remains visible but enters a disabled state

## 10. Trading, transfer & storage

- [ ] **PK-130** · `SPX-829` · **Link Trade Transfer** — Two entities travel through opposing communication paths and exchange positions.
- [ ] **PK-131** · `SPX-830` · **Trade Complete** — Outgoing identity leaves ownership while incoming identity becomes registered.
- [ ] **PK-132** · `SPX-831` · **Wonder Trade Mystery** — A known outgoing entity exchanges for an initially unknown incoming one.
- [ ] **PK-133** · `SPX-832` · **PC Box Transfer** — An active entity shrinks into a rigid indexed storage slot.
- [ ] **PK-134** · `SPX-833` · **Deposit** — An active entity transitions from foreground state into storage.
- [ ] **PK-135** · `SPX-834` · **Withdraw** — A stored grid record expands into active state.
- [ ] **PK-136** · `SPX-835` · **Box Selection Grid** — A cursor moves through rigid indexed slots with explicit focus.
- [ ] **PK-137** · `SPX-836` · **Party Reorder** — Two entities visibly exchange positions rather than teleporting.
- [ ] **PK-138** · `SPX-837` · **Trade Evolution** — A transfer path doubles as a transformation chamber.
- [ ] **PK-139** · `SPX-838` · **Wireless Connection Search** — Two nodes repeatedly attempt synchronisation before locking together.
- [ ] **PK-140** · `SPX-839` · **Storage Box Full** — Incoming entity reaches capacity and cannot dock.
- [ ] **PK-141** · `SPX-840` · **Move Between Boxes** — One indexed record travels from one storage group to another.
- [ ] **PK-142** · `SPX-841` · **Mass Transfer** — Several selected entities collapse into a grouped transfer operation.
- [ ] **PK-143** · `SPX-842` · **Transfer Confirmation** — Selected entities cross a clear irreversible commitment threshold

## 11. Gym, badges & achievements

- [ ] **PK-144** · `SPX-843` · **Gym Badge Earned** — An incomplete badge abstraction assembles into a permanent achievement.
- [ ] **PK-145** · `SPX-844` · **Badge Case Insert** — A newly earned achievement physically docks into an empty collection slot.
- [ ] **PK-146** · `SPX-845` · **Badge Polish** — A subdued achievement responds to interaction by revealing its completed visual state.
- [ ] **PK-147** · `SPX-846` · **Gym Victory Stamp** — A completion mark physically stamps itself onto a record.
- [ ] **PK-148** · `SPX-847` · **Elite Four Progress** — Four sequential challenges become structural checkpoints.
- [ ] **PK-149** · `SPX-848` · **Champion Completion** — The final checkpoint transforms the entire progression structure into its terminal state.
- [ ] **PK-150** · `SPX-849` · **League Card Update** — An achievement permanently changes identity/profile metadata.
- [ ] **PK-151** · `SPX-850` · **Medal Collection Progress** — Earned objects populate a fixed geometric collection.
- [ ] **PK-152** · `SPX-851` · **Badge Requirement Gate** — Locked content becomes available once enough achievement nodes are present.
- [ ] **PK-153** · `SPX-852` · **Challenge Streak** — Consecutive successes build a persistent visual chain.
- [ ] **PK-154** · `SPX-853` · **Streak Broken** — A previously connected achievement chain visibly fractures.
- [ ] **PK-155** · `SPX-854` · **Hall of Fame Entry** — A completed entity is formally archived into a permanent historical list

## 12. Gen I / Game Boy

- [ ] **PK-156** · `SPX-855` · **Gen I Battle Slide-In** — Chunky monochrome entities slide from opposing sides into confrontation.
- [ ] **PK-157** · `SPX-856` · **Game Boy Screen Transition** — A four-tone pixel wipe replaces one state with another.
- [ ] **PK-158** · `SPX-857` · **Pixel Encounter Flash** — Alternating monochrome regions interrupt the current interface.
- [ ] **PK-159** · `SPX-858` · **RPG Text Box Typewriter** — Restrained low-resolution message progression.
- [x] **PK-160** · `SPX-859` · **Pixel HP Drain** — Segmented low-resolution resource depletion.
- [ ] **PK-161** · `SPX-860` · **Sprite Flicker Defeat** — An entity alternates visibility before dropping out of its occupied space.
- [ ] **PK-162** · `SPX-861` · **Four-Tone Selection Cursor** — A rigid pixel cursor moves between menu options.
- [ ] **PK-163** · `SPX-862` · **Pixel Menu Open** — A hard-edged command box constructs from corners.
- [ ] **PK-164** · `SPX-863` · **Game Boy Save Confirmation** — A tiny modal sequence communicates a completed persistent operation.
- [ ] **PK-165** · `SPX-864` · **Pixel Level Up** — Low-resolution progress threshold triggers a compact numeric advancement

## 13. Gen III / Hoenn

- [ ] **PK-166** · `SPX-865` · **Emerald Battle Transition** — Aggressive geometric regions sweep into a battle/compare state.
- [ ] **PK-167** · `SPX-866` · **Gen III Pokédex Scan** — Chunky device-style data analysis progressively reveals information.
- [ ] **PK-168** · `SPX-867` · **PokéNav Selection** — Early-2000s device UI uses decisive panel switching.
- [ ] **PK-169** · `SPX-868` · **Contest Results Tally** — Multiple scoring categories accumulate into a final ranking.
- [ ] **PK-170** · `SPX-869` · **Battle Frontier Symbol Earned** — A rare achievement locks into a persistent collection.
- [ ] **PK-171** · `SPX-870` · **Secret Base Placement** — A selected object moves from inventory into a fixed spatial slot.
- [ ] **PK-172** · `SPX-871` · **Berry Growth Progress** — A multi-stage state progresses through several visually distinct phases.
- [ ] **PK-173** · `SPX-872` · **Dive Transition** — The interface crosses a water boundary into an alternate environmental state.
- [ ] **PK-174** · `SPX-873` · **Weather Institute Alert** — Environmental data changes trigger a compact system announcement

## 14. Sinnoh / DS era

- [ ] **PK-175** · `SPX-874` · **Pokétch Panel Switch** — Utilitarian monochrome app panels switch through a tactile device-style transition.
- [ ] **PK-176** · `SPX-875` · **Sinnoh Pokédex Registration** — Newly identified information receives a compact DS-era registration sequence.
- [ ] **PK-177** · `SPX-876` · **Underground Discovery** — Repeated scanning progressively exposes an object hidden beneath a surface.
- [ ] **PK-178** · `SPX-877` · **Poké Radar Pulse** — Concentric search pulses identify interesting regions inside a field.
- [ ] **PK-179** · `SPX-878` · **Distortion World Transition** — Interface geometry rotates into an impossible alternate orientation.
- [ ] **PK-180** · `SPX-879` · **Dual-Screen Handoff** — Content moves from one stacked context to another.
- [ ] **PK-181** · `SPX-880` · **Mining Crack Meter** — Repeated interaction reveals hidden content while simultaneously approaching a structural failure threshold.
- [ ] **PK-182** · `SPX-881` · **Berry Map Marker** — A map receives persistent discovered-resource markers.
- [ ] **PK-183** · `SPX-882` · **Day/Night Palette Shift** — The same information crosses between temporal environmental states

## 15. HeartGold / SoulSilver

- [ ] **PK-184** · `SPX-883` · **Follower Arrival** — A secondary entity enters and establishes a persistent relationship behind the primary.
- [ ] **PK-185** · `SPX-884` · **Pokéwalker Step Milestone** — A physical-style step counter crosses a threshold and releases a reward.
- [ ] **PK-186** · `SPX-885` · **Touch Menu Selection** — Large tactile controls respond through compression and snap.
- [ ] **PK-187** · `SPX-886` · **Radio Tuning** — A frequency indicator travels across stations and locks onto selected content.
- [ ] **PK-188** · `SPX-887` · **Phone Call Arrival** — An incoming communication interrupts the current state with a compact notification.
- [ ] **PK-189** · `SPX-888` · **Apricorn Crafting Queue** — Inputs enter a timed process and return as transformed outputs

## 16. Black / White

- [ ] **PK-190** · `SPX-889` · **BW Battle Zoom** — Camera-like scaling brings two opposing entities into confrontation.
- [ ] **PK-191** · `SPX-890` · **Animated Sprite Idle** — A low-resolution object uses stepped deterministic idle motion.
- [ ] **PK-192** · `SPX-891` · **C-Gear Connection** — Concentric communication geometry activates outward.
- [ ] **PK-193** · `SPX-892` · **Season Change** — The same interface changes environmental presentation while retaining its data.
- [ ] **PK-194** · `SPX-893` · **Triple Battle Layout Shift** — A simple context restructures into three simultaneous target positions.
- [ ] **PK-195** · `SPX-894` · **Rotation Battle Shift** — Several available entities rotate through a shared active position.
- [ ] **PK-196** · `SPX-895` · **Entralink Transfer** — One entity crosses into another contextual space through a central portal.
- [ ] **PK-197** · `SPX-896` · **Musical Performance Tally** — Several performance dimensions resolve into a final result.
- [ ] **PK-198** · `SPX-897` · **Habitat List Completion** — Regional record completeness updates as required entries become known

## 17. X / Y

- [ ] **PK-199** · `SPX-898` · **Mega Evolution Sequence** — A stable component temporarily transforms into a stronger structural state.
- [ ] **PK-200** · `SPX-899` · **New Type Discovery** — Existing classification rules expand to include a newly recognised category.
- [ ] **PK-201** · `SPX-900` · **3D Battle Camera Entry** — Layered scale and translation establish confrontation and depth.
- [ ] **PK-202** · `SPX-901` · **Affection Gain** — Relationship feedback increases without necessarily changing rank.
- [ ] **PK-203** · `SPX-902` · **Super Training Meter** — Repeated focused actions increase a specialised metric.
- [ ] **PK-204** · `SPX-903` · **Friend Safari Unlock** — A relationship/contact condition unlocks a new category of content.
- [ ] **PK-205** · `SPX-904` · **Roller-Skate Momentum Menu** — Navigation carries a small amount of directional momentum before snapping

## 18. Sun / Moon

- [ ] **PK-206** · `SPX-905` · **Z-Move Charge** — Several energy paths converge into one committed high-impact action.
- [ ] **PK-207** · `SPX-906` · **Rotom Pokédex Registration** — Energetic device-style UI identifies and registers new information.
- [ ] **PK-208** · `SPX-907` · **Island Trial Complete** — A ceremonial but compact completion state resolves a challenge.
- [ ] **PK-209** · `SPX-908` · **Totem Encounter** — An ordinary entity transforms into a dominant confrontation state.
- [ ] **PK-210** · `SPX-909` · **SOS Call** — An existing entity requests assistance and a second entity joins the layout.
- [ ] **PK-211** · `SPX-910` · **Ultra Wormhole Transition** — A radial tunnel takes over the host and transports content between states.
- [ ] **PK-212** · `SPX-911` · **Poké Pelago Progress** — Passive background activity matures into a collectible result.
- [ ] **PK-213** · `SPX-912` · **Festival Plaza Rank Up** — Accumulated social/activity progress triggers a compact rank increase.
- [ ] **PK-214** · `SPX-913` · **Ride Summon** — A utility capability enters from outside the current interface and temporarily changes available controls

## 19. Sword / Shield

- [ ] **PK-215** · `SPX-914` · **Dynamax Expansion** — An ordinary entity expands into a temporary dominant state.
- [ ] **PK-216** · `SPX-915` · **Raid Lobby Join** — Empty participant slots populate independently one by one.
- [ ] **PK-217** · `SPX-916` · **Raid Shield Break** — A segmented defensive structure loses discrete layers.
- [ ] **PK-218** · `SPX-917` · **Wild Area Weather Shift** — Environmental rules change while the underlying interface remains.
- [ ] **PK-219** · `SPX-918` · **League Card Flip** — An identity surface physically rotates between front and back.
- [ ] **PK-220** · `SPX-919` · **Max Raid Capture** — An oversized capture structure encloses a dominant target before collapsing back to normal scale.
- [ ] **PK-221** · `SPX-920` · **Dynamax Countdown** — A temporary enhanced state visibly approaches expiry over several turns/stages.
- [ ] **PK-222** · `SPX-921` · **Camp Friendship Reaction** — Several entities respond independently to one shared interaction.
- [ ] **PK-223** · `SPX-922` · **Job Dispatch** — Selected entities leave for a timed task and later return with results.
- [ ] **PK-224** · `SPX-923` · **Raid Shield Threshold** — A defensive layer automatically activates when a metric crosses a threshold

## 20. Scarlet / Violet

- [ ] **PK-225** · `SPX-924` · **Terastallization Crystallise** — Crystal facets propagate across a component and create a temporary alternate structural state.
- [ ] **PK-226** · `SPX-925` · **Tera Type Reveal** — An ordinary classification transforms into a temporary alternate classification.
- [ ] **PK-227** · `SPX-926` · **Let's Go Auto-Battle Result** — A tiny autonomous task leaves, executes and returns with a result.
- [ ] **PK-228** · `SPX-927` · **Pokédex Book Registration** — A discovered record physically joins a shelf/grid of indexed book-like entries.
- [ ] **PK-229** · `SPX-928` · **TM Machine Construction** — Several resource inputs converge and become one output.
- [ ] **PK-230** · `SPX-929` · **Raid Ready Check** — Several participants independently lock READY before collective progression becomes available.
- [ ] **PK-231** · `SPX-930` · **Sandwich Buff Activation** — Several inputs resolve into a temporary timed capability.
- [ ] **PK-232** · `SPX-931` · **Mass Outbreak Alert** — A regional data point suddenly gains high-density/priority status.
- [ ] **PK-233** · `SPX-932` · **Picnic Egg Discovery** — A passive container unexpectedly gains a newly available item/entity.
- [ ] **PK-234** · `SPX-933` · **Auto-Heal Sequence** — Several resources are consumed in deterministic priority order until a target metric reaches its goal.
- [ ] **PK-235** · `SPX-934` · **Tera Raid Crystal Entry** — A crystalline portal grows from a small node into an interactive destination.
- [ ] **PK-236** · `SPX-935` · **Map Objective Rotation** — Selecting a destination reorients the map/objective indicator around it

## 21. Multiplayer & collective state

- [ ] **PK-237** · `SPX-936` · **Raid Ready Check** — Independent participants converge on a collective READY condition.
- [ ] **PK-238** · `SPX-937` · **Party Formation** — Individual entities enter fixed team slots and create a collective structure.
- [ ] **PK-239** · `SPX-938` · **Player Joined** — An empty participant slot receives identity and becomes active.
- [ ] **PK-240** · `SPX-939` · **Player Left** — A populated slot becomes vacant without collapsing the whole layout.
- [ ] **PK-241** · `SPX-940` · **Host Selected** — One participant receives persistent coordination authority.
- [ ] **PK-242** · `SPX-941` · **Waiting for Players** — Several independent readiness states progress without generic spinner UI.
- [ ] **PK-243** · `SPX-942` · **All Players Ready** — Final independent readiness event unlocks collective action.
- [ ] **PK-244** · `SPX-943` · **Communication Lost** — One participant's connection visibly fractures from the shared structure.
- [ ] **PK-245** · `SPX-944` · **Reconnection** — A disconnected participant re-establishes the shared link.
- [ ] **PK-246** · `SPX-945` · **Team Result Tally** — Individual contributions converge into a collective outcome

## 22. Search, exploration & discovery

- [ ] **PK-247** · `SPX-946` · **Radar Pulse Discovery** — Expanding concentric pulses reveal hidden points of interest.
- [ ] **PK-248** · `SPX-947` · **Hidden Item Ping** — Proximity to hidden content produces increasingly strong local feedback.
- [ ] **PK-249** · `SPX-948` · **Dowsing Search** — Directional indicators respond to the relative position of hidden content.
- [ ] **PK-250** · `SPX-949` · **Map Area Discovered** — An obscured region becomes permanently available after discovery.
- [ ] **PK-251** · `SPX-950` · **Route Unlock** — Two previously disconnected map nodes become linked.
- [ ] **PK-252** · `SPX-951` · **Secret Passage Reveal** — An ordinary boundary develops an unexpected navigable opening.
- [ ] **PK-253** · `SPX-952` · **Footprint Tracking** — Sequential evidence markers construct a path toward a result.
- [ ] **PK-254** · `SPX-953` · **Encounter Density Map** — Regions progressively communicate relative likelihood through density.
- [ ] **PK-255** · `SPX-954` · **Rare Spawn Indicator** — A normal search result receives a restrained exceptional signal.
- [ ] **PK-256** · `SPX-955` · **Research Task Completion** — Several observations accumulate into a completed knowledge record

## 23. Results & completion

- [ ] **PK-257** · `SPX-956` · **Battle Victory Results** — Several earned values tally sequentially before final completion.
- [ ] **PK-258** · `SPX-957` · **Prize Money Tally** — Numeric reward rapidly counts to its final value.
- [ ] **PK-259** · `SPX-958` · **XP Distribution Results** — One result divides across multiple recipients.
- [ ] **PK-260** · `SPX-959` · **Item Drop Results** — Several earned items populate fixed result slots.
- [ ] **PK-261** · `SPX-960` · **Rank Increase** — Performance crosses a threshold and the rank marker physically advances.
- [ ] **PK-262** · `SPX-961` · **Perfect Result** — A normal result card receives an exceptional terminal treatment.
- [ ] **PK-263** · `SPX-962` · **New Record** — A previous best is displaced by a newly achieved value.
- [ ] **PK-264** · `SPX-963` · **Challenge Failed** — Results settle without destructive error theatrics and clearly preserve retry state.
- [ ] **PK-265** · `SPX-964` · **Rematch Available** — Completed confrontation transforms into a reusable challenge state.
- [ ] **PK-266** · `SPX-965` · **Reward Claimed** — A result leaves its pending state and permanently enters ownership.

## Semantic vocabulary

The Pokémon collection should gradually establish a reusable interaction grammar.

### Capture
**Meaning:** an operation has been attempted but its final resolution is uncertain.

Use for: uploads, verification, deployments, pairing, submissions, connection attempts.

### Evolution
**Meaning:** the identity or structure of something is changing.

Use for: migrations, upgrades, conversions, feature transformations.

### Battle
**Meaning:** an action has interacted with another state and produced measurable feedback.

Use for: validation, optimisation, testing, comparisons, system actions.

### HP
**Meaning:** a finite resource is being consumed or restored.

Use for: capacity, quotas, health, budgets, remaining allowance.

### XP
**Meaning:** accumulated progress can cross discrete thresholds.

Use for: levels, onboarding, milestones, loyalty, progression.

### Pokédex
**Meaning:** unknown information becomes identified and permanently structured.

Use for: catalogues, scanning, metadata enrichment, indexing, discovery.

### Trade / storage
**Meaning:** ownership or location transfers between two explicit endpoints.

Use for: sync, migration, transfer, handoff, reassignment.

### Badge / raid
**Meaning:** a completed condition creates a persistent achievement; or independent states converge into collective permission.

Use for: certification, milestones, multi-party readiness, completed objectives.

## Implementation rule

When implementing a row, use its assigned `SPX-NNN`, register it in `src/specimens/index.ts`, freeze geometry/timing in `contract.json`, honour reduced motion, and mark the checklist `[x]` in the same change.
