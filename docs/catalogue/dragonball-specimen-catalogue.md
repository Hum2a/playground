# Dragon Ball Specimen Checklist

> Working backlog for portable motion/UI artifacts inspired by Dragon Ball. Interaction primitives, not anime/game replicas. Avoid copyrighted character art, logos, extracted assets, audio, and proprietary fonts.

## How to use

- **DB-NNN** ??? stable catalogue id (this list).
- **SPX-NNN** ??? specimen registry ref. Unbuilt ideas are pre-assigned `SPX-966`???`SPX-1209` ??? use that ref when implementing; do not invent a different number.
- Non-catalogue specimens (other franchises / originals) use gaps not reserved by open P5 (`SPX-015`???`SPX-312`), P3 (`SPX-400`???`SPX-635`), PK (`SPX-700`???`SPX-965`), or open DB rows; prefer leftover `SPX-313`???`SPX-399`, `SPX-636`???`SPX-699`, or `SPX-1210+`.
- Mark **`[x]`** only when the specimen is registered in `src/specimens/index.ts` with a real `ref` (not `SPX-TODO`) and verified. Agents must update this file in the same change ??? see `.cursor/rules/37_persona-catalogue.mdc`.
- Progress: **23 / 244** complete.

| Status | Count |
| --- | --- |
| Done | 23 |
| Open | 221 |

## Visual grammar

| Motif | Use for |
| --- | --- |
| Ki / charge | progress, hold-to-confirm, resource budgets |
| Transformation | identity / capability state change |
| Scouter | analysis, metrics, overflow |
| Instant Transmission | navigation without travel |
| Fusion | merge, consolidation, provenance |
| Beam / clash | competing operations, commit |
| Spirit Bomb | collective / distributed completion |
| Dragon Radar | search, discovery, collection |
| Capsule | compact storage ??? deploy |
| Hakai / regeneration | irreversible delete; recovery |

## Shipped (mapped to live specimens)

| DB | SPX | Specimen id | Title |
| --- | --- | --- | --- |
| DB-193 | `SPX-1158` | `isolated-time-freeze` | Isolated Time Freeze |
| DB-159 | `SPX-1124` | `irreversible-threshold` | Irreversible Threshold |
| DB-192 | `SPX-1157` | `processing-time-skip` | Processing Time Skip |
| DB-046 | `SPX-1011` | `instant-transmission-navigation` | Instant Transmission Navigation |
| DB-231 | `SPX-1196` | `collective-ci-deployment` | Collective CI Deployment |
| DB-057 | `SPX-1022` | `linked-fusion-merge` | Linked Fusion Merge |
| DB-105 | `SPX-1070` | `seven-part-prerequisite-collection` | Seven-Part Prerequisite Collection |
| DB-004 | `SPX-969` | `charge-release` | Charge Release |
| DB-005 | `SPX-970` | `overcharge-warning` | Overcharge Warning |
| DB-016 | `SPX-981` | `power-state-transformation` | Power State Transformation |
| DB-027 | `SPX-992` | `ultra-state-optimisation` | Ultra State Optimisation |
| DB-031 | `SPX-996` | `scouter-scan` | Scouter Scan |
| DB-032 | `SPX-997` | `power-level-readout` | Power Level Readout |
| DB-001 | `SPX-966` | `ki-charge-meter` | Ki Charge Meter |
| DB-220 | `SPX-1185` | `measurement-overload` | Measurement Overload |
| DB-003 | `SPX-968` | `concentrated-energy-charge` | Concentrated Energy Charge |
| DB-056 | `SPX-1021` | `synchronous-fusion-merge` | Synchronous Fusion Merge |
| DB-122 | `SPX-1087` | `impact-freeze-frame` | Impact Freeze Frame |
| DB-123 | `SPX-1088` | `propagated-shockwave` | Propagated Shockwave |
| DB-095 | `SPX-1060` | `sector-radar-search` | Sector Radar Search |
| DB-184 | `SPX-1149` | `capsule-collapse` | Capsule Collapse |
| DB-163 | `SPX-1128` | `core-seed-regeneration` | Core Seed Regeneration |
| DB-195 | `SPX-1160` | `temporal-undo` | Temporal Undo |

## Core first-wave

Curated implementation priority (from the former Priority Queue). Same checkbox as the master list ??? checking either counts.

- [x] **DB-031** ?? `SPX-996` ?? **Scouter Scan** ??? scouter-scanning-analytics
- [x] **DB-032** ?? `SPX-997` ?? **Power Level Readout** ??? scouter-scanning-analytics
- [ ] **DB-034** ?? `SPX-999` ?? **Scouter Break** ??? scouter-scanning-analytics
- [x] **DB-001** ?? `SPX-966` ?? **Ki Charge Meter** ??? ki-charging-progress
- [x] **DB-003** ?? `SPX-968` ?? **Kamehameha Charge** ??? ki-charging-progress
- [x] **DB-004** ?? `SPX-969` ?? **Charge ??? Release** ??? ki-charging-progress
- [x] **DB-005** ?? `SPX-970` ?? **Overcharge Warning** ??? ki-charging-progress
- [x] **DB-016** ?? `SPX-981` ?? **Super Saiyan Transformation** ??? transformation
- [x] **DB-027** ?? `SPX-992` ?? **Ultra Instinct Activation** ??? transformation
- [x] **DB-056** ?? `SPX-1021` ?? **Fusion Dance Merge** ??? fusion
- [x] **DB-057** ?? `SPX-1022` ?? **Potara Fusion** ??? fusion
- [x] **DB-046** ?? `SPX-1011` ?? **Instant Transmission Navigation** ??? instant-transmission-navigation
- [ ] **DB-070** ?? `SPX-1035` ?? **Beam Clash** ??? energy-attacks-actions
- [ ] **DB-071** ?? `SPX-1036` ?? **Beam Clash Resolution** ??? energy-attacks-actions
- [x] **DB-122** ?? `SPX-1087` ?? **Impact Freeze Frame** ??? impact-combat-feedback
- [x] **DB-123** ?? `SPX-1088` ?? **Punch Shockwave** ??? impact-combat-feedback
- [ ] **DB-083** ?? `SPX-1048` ?? **Spirit Bomb Contribution** ??? spirit-bomb-collective-contribution
- [x] **DB-231** ?? `SPX-1196` ?? **Spirit Bomb CI Pipeline** ??? data-developer-tool-specimens
- [x] **DB-095** ?? `SPX-1060` ?? **Dragon Radar Search** ??? dragon-radar-search
- [x] **DB-105** ?? `SPX-1070` ?? **Seven-Item Collection** ??? dragon-balls-collection-completion
- [ ] **DB-106** ?? `SPX-1071` ?? **Final Item Acquired** ??? dragon-balls-collection-completion
- [x] **DB-184** ?? `SPX-1149` ?? **Capsule Collapse** ??? capsule-corp-compact-storage
- [x] **DB-185** ?? `SPX-1150` ?? **Capsule Deploy** ??? capsule-corp-compact-storage
- [ ] **DB-154** ?? `SPX-1119` ?? **Hakai Delete** ??? destruction-deletion
- [ ] **DB-162** ?? `SPX-1127` ?? **Namekian Regeneration** ??? regeneration-recovery
- [x] **DB-163** ?? `SPX-1128` ?? **Cell Regeneration** ??? regeneration-recovery
- [x] **DB-195** ?? `SPX-1160` ?? **Whis Rewind** ??? time-manipulation
- [x] **DB-192** ?? `SPX-1157` ?? **Hit Time-Skip** ??? time-manipulation
- [ ] **DB-176** ?? `SPX-1141` ?? **World Tournament Bracket** ??? tournament-ranking
- [ ] **DB-230** ?? `SPX-1195` ?? **Git Fusion Merge** ??? data-developer-tool-specimens
- [ ] **DB-234** ?? `SPX-1199` ?? **Over-9000 Metric Overflow** ??? data-developer-tool-specimens
## Ki Charging / Progress

- [x] **DB-001** ?? `SPX-966` ?? **Ki Charge Meter** ??? scattered energy particles accelerate inward as progress approaches completion.
- [ ] **DB-002** ?? `SPX-967` ?? **Power-Up Threshold** ??? an ordinary progress state becomes increasingly unstable before snapping into READY at 100%.
- [x] **DB-003** ?? `SPX-968` ?? **Kamehameha Charge** ??? several small energy streams converge into one concentrated action node.
- [x] **DB-004** ?? `SPX-969` ?? **Charge ??? Release** ??? holding builds potential energy, releasing converts the stored state into a travelling action.
- [x] **DB-005** ?? `SPX-970` ?? **Overcharge Warning** ??? progress safely reaches 100%, then enters an increasingly unstable overflow region.
- [ ] **DB-006** ?? `SPX-971` ?? **Ki Reserve Drain** ??? a stored resource continuously depletes while an enhanced feature remains active.
- [ ] **DB-007** ?? `SPX-972` ?? **Charge Interrupted** ??? accumulated progress violently disperses when an operation is cancelled.
- [ ] **DB-008** ?? `SPX-973` ?? **Charge Retained** ??? interrupted progress remains partially stored rather than resetting.
- [ ] **DB-009** ?? `SPX-974` ?? **Minimum Charge Gate** ??? action becomes available only after energy crosses a required threshold.
- [ ] **DB-010** ?? `SPX-975` ?? **Multi-Stage Charge** ??? progress crosses several increasingly dramatic power states.
- [ ] **DB-011** ?? `SPX-976` ?? **Energy Stabilisation** ??? noisy incoming energy gradually converges into a stable completed state.
- [ ] **DB-012** ?? `SPX-977` ?? **Charge Decay** ??? unused accumulated power slowly returns toward baseline.
- [ ] **DB-013** ?? `SPX-978` ?? **Shared Ki Pool** ??? multiple contributors feed one collective progress state.
- [ ] **DB-014** ?? `SPX-979` ?? **Burst Charge** ??? several small progress increments arrive almost simultaneously and combine.
- [ ] **DB-015** ?? `SPX-980` ?? **Maximum Power Lock** ??? progress hits its absolute limit and the entire meter structurally locks.

## Transformation

- [x] **DB-016** ?? `SPX-981` ?? **Super Saiyan Transformation** ??? calm component accumulates instability before violently resolving into an enhanced state.
- [ ] **DB-017** ?? `SPX-982` ?? **Transformation Aura Burst** ??? a new state becomes active and its boundary expands outward.
- [ ] **DB-018** ?? `SPX-983` ?? **Hair-Raise Silhouette Morph** ??? simple silhouette geometry progressively becomes sharper and more vertical.
- [ ] **DB-019** ?? `SPX-984` ?? **Transformation Stage Ladder** ??? Base ??? Stage I ??? Stage II ??? Stage III as explicit progressive states.
- [ ] **DB-020** ?? `SPX-985` ?? **Instant Transformation** ??? experienced/high-confidence path skips the full transformation sequence.
- [ ] **DB-021** ?? `SPX-986` ?? **Transformation Reversion** ??? enhanced state loses energy and reconstructs the baseline state.
- [ ] **DB-022** ?? `SPX-987` ?? **Transformation Timeout** ??? temporary enhanced state includes a visible expiry condition.
- [ ] **DB-023** ?? `SPX-988` ?? **Failed Transformation** ??? charge reaches threshold but cannot stabilise into the destination state.
- [ ] **DB-024** ?? `SPX-989` ?? **Fusion Transformation** ??? two independent entities become one new identity.
- [ ] **DB-025** ?? `SPX-990` ?? **Transformation Mastered** ??? previously unstable enhanced state becomes calm and inexpensive.
- [ ] **DB-026** ?? `SPX-991` ?? **Forced Transformation** ??? external trigger causes a component to enter an alternate state.
- [x] **DB-027** ?? `SPX-992` ?? **Ultra Instinct Activation** ??? interface loses visual noise rather than gaining it, signalling a higher-performance state through calmness.
- [ ] **DB-028** ?? `SPX-993` ?? **Kaioken Multiplier** ??? existing capability becomes temporarily multiplied without changing core identity.
- [ ] **DB-029** ?? `SPX-994` ?? **Transformation Exhaustion** ??? elevated state collapses into visibly depleted baseline.
- [ ] **DB-030** ?? `SPX-995` ?? **Power Suppression** ??? high-capability entity deliberately operates at reduced output.

## Scouter / Scanning / Analytics

- [x] **DB-031** ?? `SPX-996` ?? **Scouter Scan** ??? targeting brackets acquire an entity while numbers rapidly analyse it.
- [x] **DB-032** ?? `SPX-997` ?? **Power Level Readout** ??? live numeric analysis accelerates before stabilising on a result.
- [ ] **DB-033** ?? `SPX-998` ?? **Power Level Overflow** ??? scanner's expected numeric range is exceeded and the display can no longer represent the result normally.
- [ ] **DB-034** ?? `SPX-999` ?? **Scouter Break** ??? measurement exceeds system capacity and the analyser physically fails.
- [ ] **DB-035** ?? `SPX-1000` ?? **Target Lock** ??? wandering reticle finds and locks onto the correct entity.
- [ ] **DB-036** ?? `SPX-1001` ?? **Multiple Target Scan** ??? scanner cycles through several candidates before selecting one.
- [ ] **DB-037** ?? `SPX-1002` ?? **Unknown Power Signature** ??? analysis succeeds partially but cannot classify the target.
- [ ] **DB-038** ?? `SPX-1003` ?? **Threat Classification** ??? measured value resolves into LOW / MEDIUM / HIGH / EXTREME.
- [ ] **DB-039** ?? `SPX-1004` ?? **Distance Readout** ??? target distance decreases as a remote operation approaches.
- [ ] **DB-040** ?? `SPX-1005` ?? **Rapid Metric Analysis** ??? several values stream simultaneously before freezing into a diagnostic report.
- [ ] **DB-041** ?? `SPX-1006` ?? **Scan Rejected** ??? target cannot be measured and reticle loses lock.
- [ ] **DB-042** ?? `SPX-1007` ?? **Signature Detected** ??? an otherwise empty scanner receives a sudden remote signal.
- [ ] **DB-043** ?? `SPX-1008` ?? **Signature Lost** ??? tracked entity disappears and the scanner searches its previous location.
- [ ] **DB-044** ?? `SPX-1009` ?? **Power Spike Detection** ??? stable telemetry suddenly jumps beyond expected range.
- [ ] **DB-045** ?? `SPX-1010` ?? **Comparative Power Scan** ??? two entities receive simultaneous measurements and relative ranking.

## Instant Transmission / Navigation

- [x] **DB-046** ?? `SPX-1011` ?? **Instant Transmission Navigation** ??? component compresses to a tiny point at origin and reconstructs at destination.
- [ ] **DB-047** ?? `SPX-1012` ?? **Teleporting Modal** ??? modal appears by spatial reconstruction rather than scale/fade.
- [ ] **DB-048** ?? `SPX-1013` ?? **Instant Route Switch** ??? current context disappears from one anchor and destination emerges from another.
- [ ] **DB-049** ?? `SPX-1014` ?? **Teleport Target Lock** ??? destination must be identified before teleport becomes available.
- [ ] **DB-050** ?? `SPX-1015` ?? **Failed Transmission** ??? target signature disappears before navigation completes.
- [ ] **DB-051** ?? `SPX-1016` ?? **Multi-Hop Transmission** ??? object jumps through several known anchors in rapid sequence.
- [ ] **DB-052** ?? `SPX-1017` ?? **Return Transmission** ??? completed action snaps back to its original context.
- [ ] **DB-053** ?? `SPX-1018` ?? **Group Transmission** ??? several related objects collapse into one departure point and reappear together.
- [ ] **DB-054** ?? `SPX-1019` ?? **Transmission Trail** ??? extremely short spatial echo communicates origin without showing actual travel.
- [ ] **DB-055** ?? `SPX-1020` ?? **Zero-Distance Handoff** ??? ownership transfers without animating through the intervening space.

## Fusion

- [x] **DB-056** ?? `SPX-1021` ?? **Fusion Dance Merge** ??? two entities mirror one another, approach and combine into a new identity.
- [x] **DB-057** ?? `SPX-1022` ?? **Potara Fusion** ??? two objects become linked by a shared constraint, then accelerate into a central merge.
- [ ] **DB-058** ?? `SPX-1023` ?? **Data Fusion** ??? two records enter from opposite sides and produce one enriched record.
- [ ] **DB-059** ?? `SPX-1024` ?? **Branch Merge** ??? two development branches visually converge into one canonical branch.
- [ ] **DB-060** ?? `SPX-1025` ?? **Account Merge** ??? two identity records combine while preserving provenance.
- [ ] **DB-061** ?? `SPX-1026` ?? **Fusion Compatibility Check** ??? entities approach but cannot merge until requirements match.
- [ ] **DB-062** ?? `SPX-1027` ?? **Failed Fusion** ??? merge completes structurally but produces an invalid state.
- [ ] **DB-063** ?? `SPX-1028` ?? **Perfect Fusion** ??? two compatible inputs align exactly and produce a stable combined state.
- [ ] **DB-064** ?? `SPX-1029` ?? **Fusion Timeout** ??? combined entity has a visible finite lifetime before separating.
- [ ] **DB-065** ?? `SPX-1030` ?? **Defusion** ??? one combined entity splits back into its two original identities.
- [ ] **DB-066** ?? `SPX-1031` ?? **Asymmetric Fusion** ??? one entity contributes significantly more data/capability than the other.
- [ ] **DB-067** ?? `SPX-1032` ?? **Three-Way Merge** ??? three inputs converge into one output.

## Energy Attacks / Actions

- [ ] **DB-068** ?? `SPX-1033` ?? **Kamehameha Release** ??? charged operation leaves its source and travels toward an explicit target.
- [ ] **DB-069** ?? `SPX-1034` ?? **Energy Beam Progress** ??? operation visibly advances through a pipeline rather than using a spinner.
- [ ] **DB-070** ?? `SPX-1035` ?? **Beam Clash** ??? two competing operations push against each other for control.
- [ ] **DB-071** ?? `SPX-1036` ?? **Beam Clash Resolution** ??? equilibrium suddenly breaks and one operation overwhelms the other.
- [ ] **DB-072** ?? `SPX-1037` ?? **Final Flash Commit** ??? long preparation culminates in one irreversible high-impact action.
- [ ] **DB-073** ?? `SPX-1038` ?? **Special Beam Piercing Action** ??? operation bypasses several intermediate layers to reach a deep target.
- [ ] **DB-074** ?? `SPX-1039` ?? **Rapid Ki Blast Batch** ??? many small independent operations fire in quick deterministic succession.
- [ ] **DB-075** ?? `SPX-1040` ?? **Homing Action** ??? operation changes trajectory after target state moves.
- [ ] **DB-076** ?? `SPX-1041` ?? **Deflected Action** ??? target rejects an operation and redirects it elsewhere.
- [ ] **DB-077** ?? `SPX-1042` ?? **Absorbed Action** ??? incoming operation increases target resources instead of damaging them.
- [ ] **DB-078** ?? `SPX-1043` ?? **Cancelled Beam** ??? charged operation dissipates before commit.
- [ ] **DB-079** ?? `SPX-1044` ?? **Energy Wave Delete** ??? selected object is progressively erased from the impact boundary outward.
- [ ] **DB-080** ?? `SPX-1045` ?? **Crossfire** ??? multiple independent actions converge on one target.
- [ ] **DB-081** ?? `SPX-1046` ?? **Action Collision** ??? two operations meet and cancel each other.
- [ ] **DB-082** ?? `SPX-1047` ?? **Delayed Blast** ??? action appears complete before a secondary consequence arrives.

## Spirit Bomb / Collective Contribution

- [ ] **DB-083** ?? `SPX-1048` ?? **Spirit Bomb Contribution** ??? small energy particles travel from multiple independent sources into one shared objective.
- [ ] **DB-084** ?? `SPX-1049` ?? **Community Progress Orb** ??? contributions physically increase the size of a collective progress object.
- [ ] **DB-085** ?? `SPX-1050` ?? **Distributed Task Aggregation** ??? several workers complete independently and feed one final operation.
- [ ] **DB-086** ?? `SPX-1051` ?? **Crowdfunding Completion** ??? many contributions accumulate until a shared threshold is crossed.
- [ ] **DB-087** ?? `SPX-1052` ?? **Contribution Accepted** ??? one participant's contribution visibly joins the shared pool.
- [ ] **DB-088** ?? `SPX-1053` ?? **Contributor Dropout** ??? one incoming stream disappears without cancelling collective progress.
- [ ] **DB-089** ?? `SPX-1054` ?? **Insufficient Energy** ??? contributions arrive but total remains below execution threshold.
- [ ] **DB-090** ?? `SPX-1055` ?? **Threshold Reached** ??? collective object reaches critical size and unlocks its final action.
- [ ] **DB-091** ?? `SPX-1056` ?? **Spirit Bomb Release** ??? accumulated community resource leaves storage and becomes an action.
- [ ] **DB-092** ?? `SPX-1057` ?? **Contribution Breakdown** ??? completed collective result separates into visible contributor shares.
- [ ] **DB-093** ?? `SPX-1058` ?? **Late Contribution** ??? new input joins while aggregation is already underway.
- [ ] **DB-094** ?? `SPX-1059` ?? **Contribution Cap** ??? shared pool reaches maximum and rejects further input.

## Dragon Radar / Search

- [x] **DB-095** ?? `SPX-1060` ?? **Dragon Radar Search** ??? periodic radar sweeps reveal fixed targets across a compact grid.
- [ ] **DB-096** ?? `SPX-1061` ?? **Nearest Target Detection** ??? several results exist but scanner identifies the closest.
- [ ] **DB-097** ?? `SPX-1062` ?? **Seven-Target Collection Radar** ??? discovered objectives progressively populate a fixed seven-item collection.
- [ ] **DB-098** ?? `SPX-1063` ?? **Target Distance Pulse** ??? marker frequency increases as user approaches target.
- [ ] **DB-099** ?? `SPX-1064` ?? **Radar Zoom** ??? broad search progressively narrows around one discovered region.
- [ ] **DB-100** ?? `SPX-1065` ?? **Target Outside Range** ??? scanner detects direction but cannot resolve exact location.
- [ ] **DB-101** ?? `SPX-1066` ?? **Multiple Signal Cluster** ??? several targets appear within one search region.
- [ ] **DB-102** ?? `SPX-1067` ?? **Moving Target Radar** ??? tracked marker changes deterministic position between scans.
- [ ] **DB-103** ?? `SPX-1068` ?? **Final Target Located** ??? six known objectives make the seventh discovery unusually significant.
- [ ] **DB-104** ?? `SPX-1069` ?? **Radar Empty State** ??? completed search finds no signal without presenting it as an error.

## Dragon Balls / Collection Completion

- [x] **DB-105** ?? `SPX-1070` ?? **Seven-Item Collection** ??? seven empty positions populate as required objects are acquired.
- [ ] **DB-106** ?? `SPX-1071` ?? **Final Item Acquired** ??? seventh item triggers a qualitatively different completion state.
- [ ] **DB-107** ?? `SPX-1072` ?? **Collection Resonance** ??? completed collection begins responding as one connected system.
- [ ] **DB-108** ?? `SPX-1073` ?? **Summon Unlock** ??? action remains unavailable until all required collection slots are occupied.
- [ ] **DB-109** ?? `SPX-1074` ?? **Wish Selection** ??? completion unlocks a constrained set of high-value actions.
- [ ] **DB-110** ?? `SPX-1075` ?? **Collection Scatter** ??? after consumption, all collected objects leave the system in different directions.
- [ ] **DB-111** ?? `SPX-1076` ?? **Collection Reset** ??? fulfilled collection returns to empty state after use.
- [ ] **DB-112** ?? `SPX-1077` ?? **Duplicate Rejected** ??? fixed-set collection refuses an already-owned identifier.
- [ ] **DB-113** ?? `SPX-1078` ?? **Missing Item Indicator** ??? incomplete collection clearly identifies remaining requirements.
- [ ] **DB-114** ?? `SPX-1079` ?? **Set Completion Burst** ??? seven independent states suddenly behave as one completed structure.

## Shenron / High-Impact Completion

- [ ] **DB-115** ?? `SPX-1080` ?? **Shenron Summon Completion** ??? completed prerequisites trigger a massive vertical reveal from behind the interface.
- [ ] **DB-116** ?? `SPX-1081` ?? **Wish Granted** ??? selected high-value action receives a deliberate irreversible confirmation sequence.
- [ ] **DB-117** ?? `SPX-1082` ?? **Wish Selection Menu** ??? limited set of consequential choices appears only after prerequisites complete.
- [ ] **DB-118** ?? `SPX-1083` ?? **One-Time Action Confirmation** ??? destructive/irreversible action gets ceremonial confirmation rather than generic modal.
- [ ] **DB-119** ?? `SPX-1084` ?? **Request Rejected** ??? selected action exceeds permitted system capability.
- [ ] **DB-120** ?? `SPX-1085` ?? **Summon Dissolve** ??? completed interaction disperses and restores ordinary interface.
- [ ] **DB-121** ?? `SPX-1086` ?? **Cooldown After Wish** ??? consumed capability enters unavailable state after execution.

## Impact & Combat Feedback

- [x] **DB-122** ?? `SPX-1087` ?? **Impact Freeze Frame** ??? interaction pauses for ~80ms at exact contact before consequence explodes outward.
- [x] **DB-123** ?? `SPX-1088` ?? **Punch Shockwave** ??? contact creates expanding concentric distortion rings.
- [ ] **DB-124** ?? `SPX-1089` ?? **Heavy Hit Screen Displacement** ??? target and environment separate momentarily under impact.
- [ ] **DB-125** ?? `SPX-1090` ?? **Knockback** ??? target travels away from the source proportional to result magnitude.
- [ ] **DB-126** ?? `SPX-1091` ?? **Rapid Combo Counter** ??? several discrete actions accumulate into one aggregate result.
- [ ] **DB-127** ?? `SPX-1092` ?? **Block Impact** ??? target absorbs interaction without changing state.
- [ ] **DB-128** ?? `SPX-1093` ?? **Perfect Dodge** ??? incoming operation crosses the expected target location after target has already displaced.
- [ ] **DB-129** ?? `SPX-1094` ?? **Counterattack** ??? rejected incoming action immediately triggers a reverse action.
- [ ] **DB-130** ?? `SPX-1095` ?? **Clash Shockwave** ??? two opposing interactions meet and send feedback outward.
- [ ] **DB-131** ?? `SPX-1096` ?? **Ground Impact** ??? vertical operation produces horizontal displacement.
- [ ] **DB-132** ?? `SPX-1097` ?? **Delayed Impact** ??? contact happens, pauses, then consequence arrives.
- [ ] **DB-133** ?? `SPX-1098` ?? **Multi-Layer Impact** ??? contact ??? freeze ??? flash ??? displacement ??? result.

## Speed / Movement

- [ ] **DB-134** ?? `SPX-1099` ?? **High-Speed Dash** ??? component exits before its motion trail has time to disappear.
- [ ] **DB-135** ?? `SPX-1100` ?? **Afterimage Navigation** ??? previous component position remains for several frames after state movement.
- [ ] **DB-136** ?? `SPX-1101` ?? **Vanish / Reappear** ??? target disappears immediately before an incoming interaction arrives.
- [ ] **DB-137** ?? `SPX-1102` ?? **Speed-Line Transition** ??? directional lines dominate the viewport while content moves between states.
- [ ] **DB-138** ?? `SPX-1103` ?? **Rapid Position Exchange** ??? two entities swap places too quickly for conventional travel.
- [ ] **DB-139** ?? `SPX-1104` ?? **Pursuit Sequence** ??? one moving entity repeatedly closes distance with another.
- [ ] **DB-140** ?? `SPX-1105` ?? **Blink Selection** ??? focus jumps between distant targets with tiny residual afterimages.
- [ ] **DB-141** ?? `SPX-1106` ?? **High-Speed List Reorder** ??? reordered items leave directional traces showing where they came from.
- [ ] **DB-142** ?? `SPX-1107` ?? **Acceleration Launch** ??? motion begins slowly before rapidly leaving the host.
- [ ] **DB-143** ?? `SPX-1108` ?? **Hard Stop Arrival** ??? extremely fast movement resolves into completely static positioning.

## Aura / System State

- [ ] **DB-144** ?? `SPX-1109` ?? **Idle Ki Aura** ??? subtle irregular boundary indicates an active elevated state.
- [ ] **DB-145** ?? `SPX-1110` ?? **Aura Intensity Meter** ??? boundary behaviour becomes stronger as a metric rises.
- [ ] **DB-146** ?? `SPX-1111` ?? **Unstable Aura** ??? irregular boundary communicates degraded or dangerous operation.
- [ ] **DB-147** ?? `SPX-1112` ?? **Calm Aura** ??? extremely restrained boundary indicates stable enhanced state.
- [ ] **DB-148** ?? `SPX-1113` ?? **Aura Collapse** ??? system loses elevated capability and boundary falls inward.
- [ ] **DB-149** ?? `SPX-1114` ?? **Dual Aura Conflict** ??? two simultaneous states create visibly competing boundaries.
- [ ] **DB-150** ?? `SPX-1115` ?? **State Aura Transfer** ??? active state leaves one component and attaches to another.
- [ ] **DB-151** ?? `SPX-1116` ?? **Hidden Power** ??? ordinary component intermittently reveals evidence of higher capability.
- [ ] **DB-152** ?? `SPX-1117` ?? **Aura Threshold** ??? boundary appears only once metric crosses a specific value.
- [ ] **DB-153** ?? `SPX-1118` ?? **Suppressed Aura** ??? active capability remains present but visually compressed.

## Destruction / Deletion

- [ ] **DB-154** ?? `SPX-1119` ?? **Hakai Delete** ??? selected object progressively disintegrates into upward-moving fragments.
- [ ] **DB-155** ?? `SPX-1120` ?? **Energy Erasure** ??? deletion boundary travels through object and leaves empty space behind.
- [ ] **DB-156** ?? `SPX-1121` ?? **Planet-Break Delete Confirmation** ??? destructive operation creates visible irreversible structural fracture before execution.
- [ ] **DB-157** ?? `SPX-1122` ?? **Disintegration** ??? object breaks into deterministic square/diamond fragments.
- [ ] **DB-158** ?? `SPX-1123` ?? **Delete Cancellation** ??? disintegration begins but reverses before irreversible threshold.
- [x] **DB-159** ?? `SPX-1124` ?? **Irreversible Threshold** ??? deletion animation visibly crosses a point after which undo is unavailable.
- [ ] **DB-160** ?? `SPX-1125` ?? **Mass Delete** ??? several selected entities disintegrate sequentially.
- [ ] **DB-161** ?? `SPX-1126` ?? **Erase From History** ??? object disappears from both active position and historical trail.

## Regeneration / Recovery

- [ ] **DB-162** ?? `SPX-1127` ?? **Namekian Regeneration** ??? missing portion of a component reconstructs outward from surviving structure.
- [x] **DB-163** ?? `SPX-1128` ?? **Cell Regeneration** ??? tiny surviving core progressively reconstructs the entire entity.
- [ ] **DB-164** ?? `SPX-1129` ?? **Partial Recovery** ??? damaged structural regions rebuild while unavailable regions remain absent.
- [ ] **DB-165** ?? `SPX-1130` ?? **Self-Healing Service** ??? failed system visibly reconstructs without external intervention.
- [ ] **DB-166** ?? `SPX-1131` ?? **Recovery From Snapshot** ??? small canonical state expands into restored full component.
- [ ] **DB-167** ?? `SPX-1132` ?? **Regeneration Interrupted** ??? reconstruction stops when resource supply disappears.
- [ ] **DB-168** ?? `SPX-1133` ?? **Recovery Progress** ??? structural completeness itself acts as the progress indicator.
- [ ] **DB-169** ?? `SPX-1134` ?? **Full Restoration Burst** ??? reconstructed component locks into healthy state.

## Senzu / Instant Restore

- [ ] **DB-170** ?? `SPX-1135` ?? **Instant Full Restore** ??? several damaged metrics jump to healthy state in a coordinated snap.
- [ ] **DB-171** ?? `SPX-1136` ?? **Recovery Item Applied** ??? external resource enters target and immediately restores its state.
- [ ] **DB-172** ?? `SPX-1137` ?? **Resource Refill** ??? several depleted bars recover simultaneously.
- [ ] **DB-173** ?? `SPX-1138` ?? **Emergency Recovery** ??? critical system instantly returns to operational state.
- [ ] **DB-174** ?? `SPX-1139` ?? **Restore Consumed** ??? recovery resource disappears permanently after use.
- [ ] **DB-175** ?? `SPX-1140` ?? **Restore Unavailable** ??? recovery action is visible but unavailable without required resource.

## Tournament / Ranking

- [ ] **DB-176** ?? `SPX-1141` ?? **World Tournament Bracket** ??? competitors progress through a rigid elimination structure.
- [ ] **DB-177** ?? `SPX-1142` ?? **Bracket Winner Advance** ??? winning entity physically moves into the next-round slot.
- [ ] **DB-178** ?? `SPX-1143` ?? **Tournament Intro Cards** ??? two competitors slam into opposing sides before comparison.
- [ ] **DB-179** ?? `SPX-1144` ?? **Ring-Out Result** ??? entity crosses a fixed spatial boundary and immediately loses active status.
- [ ] **DB-180** ?? `SPX-1145` ?? **Round Complete** ??? bracket restructures around remaining entities.
- [ ] **DB-181** ?? `SPX-1146` ?? **Finalist Reveal** ??? two surviving branches become dominant.
- [ ] **DB-182** ?? `SPX-1147` ?? **Champion Result** ??? final surviving entity leaves bracket structure and becomes singular result.
- [ ] **DB-183** ?? `SPX-1148` ?? **Tournament Seed Shuffle** ??? participants deterministically rearrange into initial positions.

## Capsule Corp / Compact Storage

- [x] **DB-184** ?? `SPX-1149` ?? **Capsule Collapse** ??? large complex object compresses into a tiny portable representation.
- [x] **DB-185** ?? `SPX-1150` ?? **Capsule Deploy** ??? tiny token expands into a complete functional component.
- [ ] **DB-186** ?? `SPX-1151` ?? **Component Packing** ??? complex UI collapses into a compact stored state.
- [ ] **DB-187** ?? `SPX-1152` ?? **Capsule Inventory** ??? several large potential objects represented as tiny indexed tokens.
- [ ] **DB-188** ?? `SPX-1153` ?? **Deploy From Capsule** ??? selected stored object rapidly reconstructs into its usable state.
- [ ] **DB-189** ?? `SPX-1154` ?? **Re-Capsule** ??? active component collapses back into storage.
- [ ] **DB-190** ?? `SPX-1155` ?? **Capsule Slot Full** ??? compact storage reaches its fixed capacity.
- [ ] **DB-191** ?? `SPX-1156` ?? **Capsule Identification** ??? tiny representation reveals enough metadata to identify stored content.

## Time Manipulation

- [x] **DB-192** ?? `SPX-1157` ?? **Hit Time-Skip** ??? an operation skips its expected intermediate animation frames and appears further ahead.
- [x] **DB-193** ?? `SPX-1158` ?? **Time Freeze Interaction** ??? surrounding interface pauses while one selected operation remains active.
- [ ] **DB-194** ?? `SPX-1159` ?? **Temporal Snapshot** ??? current system state freezes and becomes a restorable checkpoint.
- [x] **DB-195** ?? `SPX-1160` ?? **Whis Rewind** ??? recent destructive action visibly reverses through its exact previous states.
- [ ] **DB-196** ?? `SPX-1161` ?? **Three-Minute Rewind** ??? timeline scrub reconstructs a previous state.
- [ ] **DB-197** ?? `SPX-1162` ?? **Time Chamber Acceleration** ??? long-running operation is represented as accelerated internal time.
- [ ] **DB-198** ?? `SPX-1163` ?? **Skipped Processing Steps** ??? expected pipeline stages disappear because an optimisation bypassed them.
- [ ] **DB-199** ?? `SPX-1164` ?? **Temporal Duplicate** ??? previous state remains briefly alongside current state for comparison.

## UI Notifications / Iconic Micro-Effects

- [ ] **DB-200** ?? `SPX-1165` ?? **Scouter Alert** ??? compact threat/value notification locks onto a card.
- [ ] **DB-201** ?? `SPX-1166` ?? **Power Spike Warning** ??? telemetry suddenly exceeds normal range.
- [ ] **DB-202** ?? `SPX-1167` ?? **Ki Signature Detected** ??? tiny remote activity notification.
- [ ] **DB-203** ?? `SPX-1168` ?? **Transformation Available** ??? threshold unlock notification.
- [ ] **DB-204** ?? `SPX-1169` ?? **Fusion Ready** ??? two compatible entities receive shared readiness indicator.
- [ ] **DB-205** ?? `SPX-1170` ?? **Dragon Ball Located** ??? radar result becomes a persistent discovered objective.
- [ ] **DB-206** ?? `SPX-1171` ?? **Opponent Approaching** ??? distance counter rapidly decreases.
- [ ] **DB-207** ?? `SPX-1172` ?? **Energy Low** ??? active enhanced state receives restrained resource warning.
- [ ] **DB-208** ?? `SPX-1173` ?? **Over 9000 Overflow** ??? numeric display exceeds designed measurement range and structurally breaks into an overflow state.
- [ ] **DB-209** ?? `SPX-1174` ?? **New Technique Available** ??? capability unlock arrives through a short charge-and-lock animation.

## Loading & Processing

- [ ] **DB-210** ?? `SPX-1175` ?? **Ki Gathering Loader** ??? particles converge toward a central operation as processing continues.
- [ ] **DB-211** ?? `SPX-1176` ?? **Energy Orbit Loader** ??? several energy nodes orbit before locking into completion.
- [ ] **DB-212** ?? `SPX-1177` ?? **Dragon Radar Processing** ??? scanner repeatedly searches different deterministic sectors.
- [ ] **DB-213** ?? `SPX-1178` ?? **Power-Up Build Loader** ??? activity gets progressively more intense as completion approaches.
- [ ] **DB-214** ?? `SPX-1179` ?? **Capsule Construction Loader** ??? output gradually reconstructs from a compact source.
- [ ] **DB-215** ?? `SPX-1180` ?? **Fusion Processing** ??? two processing streams gradually synchronise before merging.
- [ ] **DB-216** ?? `SPX-1181` ?? **Training Progress** ??? repeated actions increment a visible capability metric.
- [ ] **DB-217** ?? `SPX-1182` ?? **Gravity Training Progress** ??? difficulty multiplier rises as operation advances.
- [ ] **DB-218** ?? `SPX-1183` ?? **Hyperbolic Processing** ??? externally small wait state contains accelerated internal progress.
- [ ] **DB-219** ?? `SPX-1184` ?? **Recovery Loader** ??? missing structure progressively reconstructs instead of showing percentage.

## Error / Failure States

- [x] **DB-220** ?? `SPX-1185` ?? **Scouter Overload Error** ??? measurement exceeds supported range and analyser fails. ?? `measurement-overload`
- [ ] **DB-221** ?? `SPX-1186` ?? **Fusion Failed** ??? two valid inputs combine into an invalid output state.
- [ ] **DB-222** ?? `SPX-1187` ?? **Insufficient Ki** ??? action begins charging but cannot reach minimum execution threshold.
- [ ] **DB-223** ?? `SPX-1188` ?? **Beam Overpowered** ??? operation progresses normally until opposing process forces it backwards.
- [ ] **DB-224** ?? `SPX-1189` ?? **Transformation Failed** ??? threshold reached but destination state cannot stabilise.
- [ ] **DB-225** ?? `SPX-1190` ?? **Target Lost** ??? locked operation loses its destination before execution.
- [ ] **DB-226** ?? `SPX-1191` ?? **Capsule Deployment Failure** ??? stored object begins reconstruction but cannot fully instantiate.
- [ ] **DB-227** ?? `SPX-1192` ?? **Radar No Signal** ??? complete search resolves cleanly with zero results.
- [ ] **DB-228** ?? `SPX-1193` ?? **Technique Interrupted** ??? multi-stage action is cancelled midway.
- [ ] **DB-229** ?? `SPX-1194` ?? **Resource Exhausted** ??? enhanced state shuts down because its supporting resource reaches zero.

## Data / Developer-Tool Specimens

- [ ] **DB-230** ?? `SPX-1195` ?? **Git Fusion Merge** ??? two branch histories converge into one canonical commit.
- [x] **DB-231** ?? `SPX-1196` ?? **Spirit Bomb CI Pipeline** ??? independent jobs feed one final deploy state.
- [ ] **DB-232** ?? `SPX-1197` ?? **Scouter Performance Profiler** ??? component metrics scan and resolve into a performance classification.
- [ ] **DB-233** ?? `SPX-1198` ?? **Power Level Benchmark** ??? benchmark number climbs rapidly before stabilising.
- [ ] **DB-234** ?? `SPX-1199` ?? **Over-9000 Metric Overflow** ??? monitoring value exceeds expected visual scale.
- [ ] **DB-235** ?? `SPX-1200` ?? **Instant Transmission Route Change** ??? SPA navigation uses disappearance/reconstruction anchors.
- [ ] **DB-236** ?? `SPX-1201` ?? **Capsule Component Collapse** ??? complex component becomes compact portable token.
- [ ] **DB-237** ?? `SPX-1202` ?? **Hakai File Delete** ??? destructive deletion visualises irreversibility.
- [ ] **DB-238** ?? `SPX-1203` ?? **Whis Undo** ??? destructive UI mutation runs backward into previous state.
- [ ] **DB-239** ?? `SPX-1204` ?? **Namekian Service Recovery** ??? unhealthy service reconstructs itself.
- [ ] **DB-240** ?? `SPX-1205` ?? **Fusion Record Merge** ??? duplicate records combine while provenance remains visible.
- [ ] **DB-241** ?? `SPX-1206` ?? **Dragon Radar Search Results** ??? spatial search progressively locates matching nodes.
- [ ] **DB-242** ?? `SPX-1207` ?? **Training Benchmark Progress** ??? repeated benchmark iterations visibly improve a metric.
- [ ] **DB-243** ?? `SPX-1208` ?? **Ki Resource Monitor** ??? active process consumes a finite computational budget.
- [ ] **DB-244** ?? `SPX-1209` ?? **Transformation Feature Upgrade** ??? component changes from legacy implementation into upgraded implementation.
