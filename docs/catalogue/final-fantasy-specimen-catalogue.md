# Final Fantasy Specimen Checklist

> Working backlog for portable motion/UI artifacts inspired by Final Fantasy / JRPG visual grammar (battle HUDs, command menus, ATB/limit gauges, materia-like sockets, magic casting, summon reveals, victory tallies, crystals, quests, world maps, cinematic framing). Interaction primitives, not game replicas. Avoid franchise logos, character art, exact HUDs, copyrighted spell names, proprietary icons, soundtrack, extracted assets, audio, and proprietary fonts. Use original typography, fictional labels, abstract placeholders, and newly designed geometry.

## How to use

- **FF-NNN** — stable catalogue id (this list).
- **SPX-NNN** — specimen registry ref. Unbuilt ideas are pre-assigned `SPX-4340`…`SPX-4547` — use that ref when implementing; do not invent a different number. Shipped FF effects keep their existing refs (`FF-012` Victory Results Tally → `SPX-014`).
- Non-catalogue specimens (other franchises / originals) use gaps not reserved by open P5 (`SPX-015`–`SPX-312`), P3 (`SPX-400`–`SPX-635`), PK (`SPX-700`–`SPX-965`), DB (`SPX-966`–`SPX-1209`), IOS (`SPX-1300`–`SPX-1557`), AND (`SPX-1558`–`SPX-1974`), MHA (`SPX-1975`–`SPX-2343`), NR (`SPX-2344`–`SPX-2918`), P4 (`SPX-2919`–`SPX-3109`), NF (`SPX-3110`–`SPX-3306`), PS (`SPX-3307`–`SPX-3522`), NEWS (`SPX-3523`–`SPX-3759`), MUSIC (`SPX-3760`–`SPX-4069`), MANGA (`SPX-4070`–`SPX-4339`), or open FF rows; prefer leftover `SPX-313`–`SPX-399`, `SPX-636`–`SPX-699`, `SPX-1210`–`SPX-1299`, or `SPX-4548+`.
- Mark **`[x]`** only when the specimen is registered in `src/specimens/registry/` with a real `ref` (not `SPX-TODO`) and verified. Agents must update this file in the same change — see `.cursor/rules/37_persona-catalogue.mdc`.
- Progress: **7 / 208** complete.

| Status | Count |
| --- | --- |
| Done | 7 |
| Open | 201 |

## Visual grammar

| Motif | Use for |
| --- | --- |
| Battle HUD / commands | command wheels, target lists, turn order, action queues |
| Victory / results | tallies, currency rolls, XP fill, clear stamps |
| Limit / overdrive | threshold gauges, ready pulses, command reveals |
| Magic / spells | circles, elemental casts, dissolve completes |
| Summons / reveals | portals, shockwaves, silhouette arrivals |
| Materia / sockets | orb insert, linked beams, unlock fractures |
| Equipment / inventory | equip slam, compare split, item acquire |
| Progression | skill trees, stat allocate, ability stamps |
| Targeting / damage | reticles, weakness, crit slam, numbers |
| Status / ATB | condition icons, charge meters, ready flash |
| Cinematic / boss | letterbox, health reveal, phase break |
| Map / save / crystal | routes, checkpoints, shard assemble/shatter |
| Quest / dialogue | stamps, chains, branching choices |
| Encounter / typography | flash transitions, rank letters |

### Design tokens (portable)

Restrained fantasy-JRPG house style — not official product tokens:

| Token | Hex | Role |
| --- | --- |
| Navy | `#111827` | Stage void |
| Midnight | `#172033` | Panels |
| Parchment | `#E9E3D2` | Labels / paper type |
| Silver | `#C7CDD8` | Secondary chrome |
| Crystal cyan | `#72D6E8` | Magic / save / ready |
| Violet | `#A98BFF` | Spell / summon accent |
| Gold | `#E5BE62` | Reward / rank |
| Crimson | `#C94F58` | Danger / damage |

Useful frozen constants: command-panel border `2px`; crystal facet stroke `2px`; gauge height `8–14px`; command entrance `220–420ms`; result tally interval `70ms` per row; impact frame `60–100ms` max; target reticle settle `260ms`. Particle counts must be fixed, not random.

## Shipped (mapped to live specimens)

| FF | SPX | Specimen id | Title |
| --- | --- | --- | --- |
| FF-001 | `SPX-4340` | `command-wheel-fan` | Command Wheel Fan |
| FF-004 | `SPX-4343` | `target-menu-acquire` | Target Menu Acquire |
| FF-007 | `SPX-4346` | `turn-order-assemble` | Turn Order Assemble |
| FF-012 | `SPX-014` | `victory-results-tally` | Victory Results Tally |
| FF-013 | `SPX-4352` | `gil-counter-roll` | Gil Counter Roll |
| FF-014 | `SPX-4353` | `experience-bar-fill` | Experience Bar Fill |
| FF-029 | `SPX-4368` | `spell-circle-draw` | Spell Circle Draw |

## Core first-wave

Curated implementation priority (Recommended Build Waves A–E / Top 50). Same checkbox as the master list — checking either counts.

### Wave A — Battle HUD / victory / limit

- [x] **FF-001** · `SPX-4340` · **Command Wheel Fan** — `command-wheel-fan`
- [x] **FF-004** · `SPX-4343` · **Target Menu Acquire** — `target-menu-acquire`
- [x] **FF-007** · `SPX-4346` · **Turn Order Assemble** — `turn-order-assemble`
- [x] **FF-012** · `SPX-014` · **Victory Results Tally** — `victory-results-tally`
- [x] **FF-013** · `SPX-4352` · **Gil Counter Roll** — `gil-counter-roll`
- [x] **FF-014** · `SPX-4353` · **Experience Bar Fill** — `experience-bar-fill`
- [ ] **FF-015** · `SPX-4354` · **Level Up Burst** — `level-up-burst`
- [ ] **FF-018** · `SPX-4357` · **Battle Cleared Stamp** — `battle-cleared-stamp`
- [ ] **FF-021** · `SPX-4360` · **Limit Gauge Ignite** — `limit-gauge-ignite`
- [ ] **FF-022** · `SPX-4361` · **Limit Break Flash** — `limit-break-flash`

### Wave B — Magic / summons

- [ ] **FF-024** · `SPX-4363` · **Limit Command Reveal** — `limit-command-reveal`
- [ ] **FF-027** · `SPX-4366` · **Ultimate Ready Pulse** — `ultimate-ready-pulse`
- [x] **FF-029** · `SPX-4368` · **Spell Circle Draw** — `spell-circle-draw`
- [ ] **FF-031** · `SPX-4370` · **Fire Cast Spiral** — `fire-cast-spiral`
- [ ] **FF-032** · `SPX-4371` · **Ice Crystal Bloom** — `ice-crystal-bloom`
- [ ] **FF-033** · `SPX-4372` · **Lightning Branch** — `lightning-branch`
- [ ] **FF-037** · `SPX-4376` · **Holy Radiance Column** — `holy-radiance-column`
- [ ] **FF-039** · `SPX-4378` · **Summon Portal Open** — `summon-portal-open`
- [ ] **FF-041** · `SPX-4380` · **Summon Arrival Shockwave** — `summon-arrival-shockwave`
- [ ] **FF-043** · `SPX-4382` · **Summon Silhouette Reveal** — `summon-silhouette-reveal`

### Wave C — Materia / equipment / targeting

- [ ] **FF-047** · `SPX-4386` · **Materia Socket Insert** — `materia-socket-insert`
- [ ] **FF-050** · `SPX-4389` · **Linked Socket Beam** — `linked-socket-beam`
- [ ] **FF-051** · `SPX-4390` · **Materia Level Ring** — `materia-level-ring`
- [ ] **FF-053** · `SPX-4392` · **Socket Unlock** — `socket-unlock`
- [ ] **FF-055** · `SPX-4394` · **Equipment Equip Slam** — `equipment-equip-slam`
- [ ] **FF-061** · `SPX-4400` · **Equipment Compare Split** — `equipment-compare-split`
- [ ] **FF-065** · `SPX-4404` · **Skill Tree Unlock** — `skill-tree-unlock`
- [ ] **FF-071** · `SPX-4410` · **Target Reticle Snap** — `target-reticle-snap`
- [ ] **FF-073** · `SPX-4412` · **Weakness Indicator** — `weakness-indicator`
- [ ] **FF-075** · `SPX-4414` · **Critical Target Lock** — `critical-target-lock`

### Wave D — Combat feedback / ATB / cinematic

- [ ] **FF-079** · `SPX-4418` · **Damage Number Burst** — `damage-number-burst`
- [ ] **FF-080** · `SPX-4419` · **Critical Damage Slam** — `critical-damage-slam`
- [ ] **FF-081** · `SPX-4420` · **Weakness Break** — `weakness-break`
- [ ] **FF-092** · `SPX-4431` · **Barrier Shell** — `barrier-shell`
- [ ] **FF-093** · `SPX-4432` · **Doom Countdown** — `doom-countdown`
- [ ] **FF-095** · `SPX-4434` · **ATB Gauge Charge** — `atb-gauge-charge`
- [ ] **FF-096** · `SPX-4435` · **ATB Ready Flash** — `atb-ready-flash`
- [ ] **FF-101** · `SPX-4440` · **Action Queue Slide** — `action-queue-slide`
- [ ] **FF-103** · `SPX-4442` · **Cinematic Letterbox** — `cinematic-letterbox`
- [ ] **FF-110** · `SPX-4449` · **Boss Health Reveal** — `boss-health-reveal`

### Wave E — Boss / crystal / quest / encounter

- [ ] **FF-111** · `SPX-4450` · **Boss Phase Transition** — `boss-phase-transition`
- [ ] **FF-112** · `SPX-4451` · **Break Gauge Crack** — `break-gauge-crack`
- [ ] **FF-123** · `SPX-4462` · **Save Crystal Pulse** — `save-crystal-pulse`
- [ ] **FF-125** · `SPX-4464` · **Load Data Sweep** — `load-data-sweep`
- [ ] **FF-130** · `SPX-4469` · **Crystal Shard Assemble** — `crystal-shard-assemble`
- [ ] **FF-131** · `SPX-4470` · **Crystal Shatter** — `crystal-shatter`
- [ ] **FF-137** · `SPX-4476` · **Quest Accepted Stamp** — `quest-accepted-stamp`
- [ ] **FF-141** · `SPX-4480` · **Quest Chain Advance** — `quest-chain-advance`
- [ ] **FF-186** · `SPX-4525` · **Encounter Flash** — `encounter-flash`
- [ ] **FF-167** · `SPX-4506` · **Rank Letter Reveal** — `rank-letter-reveal`

## 1. Battle HUD / Commands

- [x] **FF-001** · `SPX-4340` · ★★★★★ **Command Wheel Fan** — Battle commands fan outward from a central cursor with a crisp mechanical snap
- [ ] **FF-002** · `SPX-4341` · ★★★☆☆ **Command Menu Slide** — A portable JRPG-inspired specimen exploring command menu slide as a self-contained UI or motion artifact
- [ ] **FF-003** · `SPX-4342` · ★★★☆☆ **Active Command Highlight** — A portable JRPG-inspired specimen exploring active command highlight as a self-contained UI or motion artifact
- [x] **FF-004** · `SPX-4343` · ★★★★★ **Target Menu Acquire** — A target list assembles around the selected enemy or object
- [ ] **FF-005** · `SPX-4344` · ★★★☆☆ **Subcommand Cascade** — A portable JRPG-inspired specimen exploring subcommand cascade as a self-contained UI or motion artifact
- [ ] **FF-006** · `SPX-4345` · ★★★☆☆ **Battle HUD Wake** — A portable JRPG-inspired specimen exploring battle hud wake as a self-contained UI or motion artifact
- [x] **FF-007** · `SPX-4346` · ★★★★★ **Turn Order Assemble** — Abstract turn-order tokens arrange into a deterministic initiative sequence
- [ ] **FF-008** · `SPX-4347` · ★★★★★ **Action Queue Slide** — Queued actions stack beside an actor and execute in order
- [ ] **FF-009** · `SPX-4348` · ★★★★☆ **Battle Menu Collapse** — A portable JRPG-inspired specimen exploring battle menu collapse as a self-contained UI or motion artifact
- [ ] **FF-010** · `SPX-4349` · ★★★☆☆ **Command Cancel Rewind** — A portable JRPG-inspired specimen exploring command cancel rewind as a self-contained UI or motion artifact

## 2. Victory / Results

- [ ] **FF-011** · `SPX-4350` · ★★★☆☆ **Victory Fanfare Burst** — A portable JRPG-inspired specimen exploring victory fanfare burst as a self-contained UI or motion artifact
- [x] **FF-012** · `SPX-014` · ★★★★★ **Victory Results Tally** — Rewards, score and completion data count into place in staged rows · `victory-results-tally`
- [x] **FF-013** · `SPX-4352` · ★★★★★ **Gil Counter Roll** — A currency-like number rapidly rolls and settles on the earned total
- [x] **FF-014** · `SPX-4353` · ★★★★★ **Experience Bar Fill** — A progress bar fills through a reward gain and stops at the exact new value
- [ ] **FF-015** · `SPX-4354` · ★★★★★ **Level Up Burst** — A threshold crossing produces a brief radiating burst and level indicator change
- [ ] **FF-016** · `SPX-4355` · ★★★★☆ **New Ability Acquire** — A portable JRPG-inspired specimen exploring new ability acquire as a self-contained UI or motion artifact
- [ ] **FF-017** · `SPX-4356` · ★★★★☆ **Loot Reveal Carousel** — A portable JRPG-inspired specimen exploring loot reveal carousel as a self-contained UI or motion artifact
- [ ] **FF-018** · `SPX-4357` · ★★★★★ **Battle Cleared Stamp** — A strong original CLEAR mark lands over the finished encounter
- [ ] **FF-019** · `SPX-4358` · ★★★★☆ **Results Panel Slide** — A portable JRPG-inspired specimen exploring results panel slide as a self-contained UI or motion artifact
- [ ] **FF-020** · `SPX-4359` · ★★★★☆ **Reward Sparkle Orbit** — A portable JRPG-inspired specimen exploring reward sparkle orbit as a self-contained UI or motion artifact

## 3. Limit Break / Overdrive

- [ ] **FF-021** · `SPX-4360` · ★★★★★ **Limit Gauge Ignite** — A combat gauge fills to its threshold and ignites into a high-energy state
- [ ] **FF-022** · `SPX-4361` · ★★★★★ **Limit Break Flash** — A threshold crossing produces a finite high-contrast impact beat
- [ ] **FF-023** · `SPX-4362` · ★★★★☆ **Overdrive Meter Charge** — A portable JRPG-inspired specimen exploring overdrive meter charge as a self-contained UI or motion artifact
- [ ] **FF-024** · `SPX-4363` · ★★★★★ **Limit Command Reveal** — A previously unavailable command tears open into an active option
- [ ] **FF-025** · `SPX-4364` · ★★★☆☆ **Limit Break Name Slam** — A portable JRPG-inspired specimen exploring limit break name slam as a self-contained UI or motion artifact
- [ ] **FF-026** · `SPX-4365` · ★★★★☆ **Charge Aura Ring** — A portable JRPG-inspired specimen exploring charge aura ring as a self-contained UI or motion artifact
- [ ] **FF-027** · `SPX-4366` · ★★★★★ **Ultimate Ready Pulse** — A full gauge enters a restrained ready state with a short pulse
- [ ] **FF-028** · `SPX-4367` · ★★★★☆ **Gauge Overflow Spark** — A portable JRPG-inspired specimen exploring gauge overflow spark as a self-contained UI or motion artifact

## 4. Magic / Spells

- [x] **FF-029** · `SPX-4368` · ★★★★★ **Spell Circle Draw** — An original geometric magic circle draws around a selected action
- [ ] **FF-030** · `SPX-4369` · ★★★★☆ **Element Burst** — A portable JRPG-inspired specimen exploring element burst as a self-contained UI or motion artifact
- [ ] **FF-031** · `SPX-4370` · ★★★★★ **Fire Cast Spiral** — Warm angular particles spiral outward from a casting point
- [ ] **FF-032** · `SPX-4371` · ★★★★★ **Ice Crystal Bloom** — Faceted geometric shards grow around a target and settle
- [ ] **FF-033** · `SPX-4372` · ★★★★★ **Lightning Branch** — Thin branching lines flash between source and target in a finite sequence
- [ ] **FF-034** · `SPX-4373` · ★★★★☆ **Wind Arc Sweep** — A portable JRPG-inspired specimen exploring wind arc sweep as a self-contained UI or motion artifact
- [ ] **FF-035** · `SPX-4374` · ★★★★☆ **Water Ring Impact** — A portable JRPG-inspired specimen exploring water ring impact as a self-contained UI or motion artifact
- [ ] **FF-036** · `SPX-4375` · ★★★★☆ **Darkness Vignette** — A portable JRPG-inspired specimen exploring darkness vignette as a self-contained UI or motion artifact
- [ ] **FF-037** · `SPX-4376` · ★★★★★ **Holy Radiance Column** — A vertical light column expands around a restorative action
- [ ] **FF-038** · `SPX-4377` · ★★★★☆ **Spell Complete Dissolve** — A portable JRPG-inspired specimen exploring spell complete dissolve as a self-contained UI or motion artifact

## 5. Summons / Grand Reveals

- [ ] **FF-039** · `SPX-4378` · ★★★★★ **Summon Portal Open** — A circular portal expands behind a focal object and reveals an abstract original silhouette
- [ ] **FF-040** · `SPX-4379` · ★★★★☆ **Summon Name Plate** — A portable JRPG-inspired specimen exploring summon name plate as a self-contained UI or motion artifact
- [ ] **FF-041** · `SPX-4380` · ★★★★★ **Summon Arrival Shockwave** — A summon arrival creates concentric rings and a brief impact scale
- [ ] **FF-042** · `SPX-4381` · ★★★★☆ **Summon Charge Sequence** — A portable JRPG-inspired specimen exploring summon charge sequence as a self-contained UI or motion artifact
- [ ] **FF-043** · `SPX-4382` · ★★★★★ **Summon Silhouette Reveal** — A backlit abstract silhouette resolves into an original geometric figure
- [ ] **FF-044** · `SPX-4383` · ★★★★☆ **Grand Entrance Curtain** — A portable JRPG-inspired specimen exploring grand entrance curtain as a self-contained UI or motion artifact
- [ ] **FF-045** · `SPX-4384` · ★★★★☆ **Summon Dismiss** — A portable JRPG-inspired specimen exploring summon dismiss as a self-contained UI or motion artifact
- [ ] **FF-046** · `SPX-4385` · ★★★☆☆ **Cosmic Particle Field** — A portable JRPG-inspired specimen exploring cosmic particle field as a self-contained UI or motion artifact

## 6. Materia / Sockets

- [ ] **FF-047** · `SPX-4386` · ★★★★★ **Materia Socket Insert** — A glowing orb slides into a socket and locks with a short flash
- [ ] **FF-048** · `SPX-4387` · ★★★☆☆ **Socket Empty Pulse** — A portable JRPG-inspired specimen exploring socket empty pulse as a self-contained UI or motion artifact
- [ ] **FF-049** · `SPX-4388` · ★★★☆☆ **Materia Equip Swap** — A portable JRPG-inspired specimen exploring materia equip swap as a self-contained UI or motion artifact
- [ ] **FF-050** · `SPX-4389` · ★★★★★ **Linked Socket Beam** — Two equipped sockets connect with a thin animated line
- [ ] **FF-051** · `SPX-4390` · ★★★★★ **Materia Level Ring** — A circular progress ring fills around an equipped orb
- [ ] **FF-052** · `SPX-4391` · ★★★☆☆ **Orb Acquire Pop** — A portable JRPG-inspired specimen exploring orb acquire pop as a self-contained UI or motion artifact
- [ ] **FF-053** · `SPX-4392` · ★★★★★ **Socket Unlock** — A locked socket fractures and reveals its usable state
- [ ] **FF-054** · `SPX-4393` · ★★★☆☆ **Loadout Reorder** — A portable JRPG-inspired specimen exploring loadout reorder as a self-contained UI or motion artifact

## 7. Equipment / Inventory

- [ ] **FF-055** · `SPX-4394` · ★★★★★ **Equipment Equip Slam** — A selected item snaps into an equipment slot with a decisive impact
- [ ] **FF-056** · `SPX-4395` · ★★★★☆ **Weapon Upgrade Rise** — A portable JRPG-inspired specimen exploring weapon upgrade rise as a self-contained UI or motion artifact
- [ ] **FF-057** · `SPX-4396` · ★★★☆☆ **Stat Increase Tick** — A portable JRPG-inspired specimen exploring stat increase tick as a self-contained UI or motion artifact
- [ ] **FF-058** · `SPX-4397` · ★★★☆☆ **Inventory Grid Reveal** — A portable JRPG-inspired specimen exploring inventory grid reveal as a self-contained UI or motion artifact
- [ ] **FF-059** · `SPX-4398` · ★★★★☆ **Item Description Slide** — A portable JRPG-inspired specimen exploring item description slide as a self-contained UI or motion artifact
- [ ] **FF-060** · `SPX-4399` · ★★★☆☆ **New Item Notification** — A portable JRPG-inspired specimen exploring new item notification as a self-contained UI or motion artifact
- [ ] **FF-061** · `SPX-4400` · ★★★★★ **Equipment Compare Split** — Old and new equipment values appear in opposing comparison columns
- [ ] **FF-062** · `SPX-4401` · ★★★☆☆ **Loadout Confirm** — A portable JRPG-inspired specimen exploring loadout confirm as a self-contained UI or motion artifact

## 8. Character Progression

- [ ] **FF-063** · `SPX-4402` · ★★★☆☆ **Level Up Number Burst** — A portable JRPG-inspired specimen exploring level up number burst as a self-contained UI or motion artifact
- [ ] **FF-064** · `SPX-4403` · ★★★★☆ **Stat Point Allocate** — A portable JRPG-inspired specimen exploring stat point allocate as a self-contained UI or motion artifact
- [ ] **FF-065** · `SPX-4404` · ★★★★★ **Skill Tree Unlock** — A connected node activates and draws its route into the surrounding tree
- [ ] **FF-066** · `SPX-4405` · ★★★★☆ **Skill Node Pulse** — A portable JRPG-inspired specimen exploring skill node pulse as a self-contained UI or motion artifact
- [ ] **FF-067** · `SPX-4406` · ★★★☆☆ **Ability Learned Stamp** — A portable JRPG-inspired specimen exploring ability learned stamp as a self-contained UI or motion artifact
- [ ] **FF-068** · `SPX-4407` · ★★★★☆ **Experience Overflow** — A portable JRPG-inspired specimen exploring experience overflow as a self-contained UI or motion artifact
- [ ] **FF-069** · `SPX-4408` · ★★★★☆ **Growth Panel Replate** — A portable JRPG-inspired specimen exploring growth panel replate as a self-contained UI or motion artifact
- [ ] **FF-070** · `SPX-4409` · ★★★☆☆ **Progression Page Turn** — A portable JRPG-inspired specimen exploring progression page turn as a self-contained UI or motion artifact

## 9. Targeting

- [ ] **FF-071** · `SPX-4410` · ★★★★★ **Target Reticle Snap** — An angular target reticle contracts around the chosen target
- [ ] **FF-072** · `SPX-4411` · ★★★☆☆ **Target Cycle Sweep** — A portable JRPG-inspired specimen exploring target cycle sweep as a self-contained UI or motion artifact
- [ ] **FF-073** · `SPX-4412` · ★★★★★ **Weakness Indicator** — A target state acquires a sharp attribute indicator
- [ ] **FF-074** · `SPX-4413` · ★★★★☆ **Resist Indicator** — A portable JRPG-inspired specimen exploring resist indicator as a self-contained UI or motion artifact
- [ ] **FF-075** · `SPX-4414` · ★★★★★ **Critical Target Lock** — A critical target receives a heavier reticle and impact accent
- [ ] **FF-076** · `SPX-4415` · ★★★★☆ **Multi-Target Arc** — A portable JRPG-inspired specimen exploring multi-target arc as a self-contained UI or motion artifact
- [ ] **FF-077** · `SPX-4416` · ★★★★☆ **Target Confirm Flash** — A portable JRPG-inspired specimen exploring target confirm flash as a self-contained UI or motion artifact
- [ ] **FF-078** · `SPX-4417` · ★★★★☆ **Target Lost** — A portable JRPG-inspired specimen exploring target lost as a self-contained UI or motion artifact

## 10. Damage / Combat Feedback

- [ ] **FF-079** · `SPX-4418` · ★★★★★ **Damage Number Burst** — Damage values burst outward from the target and settle before disappearing
- [ ] **FF-080** · `SPX-4419` · ★★★★★ **Critical Damage Slam** — A critical value enters larger with a short impact freeze
- [ ] **FF-081** · `SPX-4420` · ★★★★★ **Weakness Break** — A weakness hit fractures the target indicator into deterministic shards
- [ ] **FF-082** · `SPX-4421` · ★★★☆☆ **Guard Impact** — A portable JRPG-inspired specimen exploring guard impact as a self-contained UI or motion artifact
- [ ] **FF-083** · `SPX-4422` · ★★★★☆ **Miss Flick** — A portable JRPG-inspired specimen exploring miss flick as a self-contained UI or motion artifact
- [ ] **FF-084** · `SPX-4423` · ★★★★☆ **Resist Bounce** — A portable JRPG-inspired specimen exploring resist bounce as a self-contained UI or motion artifact
- [ ] **FF-085** · `SPX-4424` · ★★★★☆ **Status Effect Apply** — A portable JRPG-inspired specimen exploring status effect apply as a self-contained UI or motion artifact
- [ ] **FF-086** · `SPX-4425` · ★★★☆☆ **Damage Chain** — A portable JRPG-inspired specimen exploring damage chain as a self-contained UI or motion artifact

## 11. Status Effects

- [ ] **FF-087** · `SPX-4426` · ★★★☆☆ **Poison Pulse** — A portable JRPG-inspired specimen exploring poison pulse as a self-contained UI or motion artifact
- [ ] **FF-088** · `SPX-4427` · ★★★☆☆ **Silence Lock** — A portable JRPG-inspired specimen exploring silence lock as a self-contained UI or motion artifact
- [ ] **FF-089** · `SPX-4428` · ★★★★☆ **Slow Time Ring** — A portable JRPG-inspired specimen exploring slow time ring as a self-contained UI or motion artifact
- [ ] **FF-090** · `SPX-4429` · ★★★☆☆ **Haste Speed Trails** — A portable JRPG-inspired specimen exploring haste speed trails as a self-contained UI or motion artifact
- [ ] **FF-091** · `SPX-4430` · ★★★★☆ **Regen Orbit** — A portable JRPG-inspired specimen exploring regen orbit as a self-contained UI or motion artifact
- [ ] **FF-092** · `SPX-4431` · ★★★★★ **Barrier Shell** — A geometric protective shell forms around the active target
- [ ] **FF-093** · `SPX-4432` · ★★★★★ **Doom Countdown** — A deterministic countdown ring closes toward a status threshold
- [ ] **FF-094** · `SPX-4433` · ★★★★☆ **Status Expire Crack** — A portable JRPG-inspired specimen exploring status expire crack as a self-contained UI or motion artifact

## 12. ATB / Turn Gauges

- [ ] **FF-095** · `SPX-4434` · ★★★★★ **ATB Gauge Charge** — A segmented action gauge fills toward readiness
- [ ] **FF-096** · `SPX-4435` · ★★★★★ **ATB Ready Flash** — A completed gauge gains a short readiness highlight
- [ ] **FF-097** · `SPX-4436` · ★★★★☆ **ATB Drain Commit** — A portable JRPG-inspired specimen exploring atb drain commit as a self-contained UI or motion artifact
- [ ] **FF-098** · `SPX-4437` · ★★★★☆ **Turn Marker Advance** — A portable JRPG-inspired specimen exploring turn marker advance as a self-contained UI or motion artifact
- [ ] **FF-099** · `SPX-4438` · ★★★★☆ **Wait State Dim** — A portable JRPG-inspired specimen exploring wait state dim as a self-contained UI or motion artifact
- [ ] **FF-100** · `SPX-4439` · ★★★★☆ **Turn Complete Sweep** — A portable JRPG-inspired specimen exploring turn complete sweep as a self-contained UI or motion artifact
- [ ] **FF-101** · `SPX-4440` · ★★★★★ **Action Queue Slide** — Queued actions stack beside an actor and execute in order
- [ ] **FF-102** · `SPX-4441` · ★★★★☆ **Gauge Break** — A portable JRPG-inspired specimen exploring gauge break as a self-contained UI or motion artifact

## 13. Cinematic / Boss UI

- [ ] **FF-103** · `SPX-4442` · ★★★★★ **Cinematic Letterbox** — Black bars slide into place to convert the preview into a dramatic cinematic mode
- [ ] **FF-104** · `SPX-4443` · ★★★★☆ **Letterbox Release** — A portable JRPG-inspired specimen exploring letterbox release as a self-contained UI or motion artifact
- [ ] **FF-105** · `SPX-4444` · ★★★★☆ **Boss Name Reveal** — A portable JRPG-inspired specimen exploring boss name reveal as a self-contained UI or motion artifact
- [ ] **FF-106** · `SPX-4445` · ★★★★☆ **Boss Health Bar Drop** — A portable JRPG-inspired specimen exploring boss health bar drop as a self-contained UI or motion artifact
- [ ] **FF-107** · `SPX-4446` · ★★★★☆ **Phase Change Slam** — A portable JRPG-inspired specimen exploring phase change slam as a self-contained UI or motion artifact
- [ ] **FF-108** · `SPX-4447` · ★★★★☆ **Final Phase Warning** — A portable JRPG-inspired specimen exploring final phase warning as a self-contained UI or motion artifact
- [ ] **FF-109** · `SPX-4448` · ★★★☆☆ **Cinematic Skip Prompt** — A portable JRPG-inspired specimen exploring cinematic skip prompt as a self-contained UI or motion artifact
- [ ] **FF-110** · `SPX-4449` · ★★★★★ **Boss Health Reveal** — A large health bar grows from zero to its known starting value
- [ ] **FF-111** · `SPX-4450` · ★★★★★ **Boss Phase Transition** — The boss bar and surrounding HUD transform during a phase change
- [ ] **FF-112** · `SPX-4451` · ★★★★★ **Break Gauge Crack** — A secondary gauge fractures as the boss reaches a stagger threshold
- [ ] **FF-113** · `SPX-4452` · ★★★★☆ **Stagger State** — A portable JRPG-inspired specimen exploring stagger state as a self-contained UI or motion artifact
- [ ] **FF-114** · `SPX-4453` · ★★★★☆ **Boss Defeat Collapse** — A portable JRPG-inspired specimen exploring boss defeat collapse as a self-contained UI or motion artifact

## 14. Map / World Navigation

- [ ] **FF-115** · `SPX-4454` · ★★★★☆ **World Map Region Reveal** — A portable JRPG-inspired specimen exploring world map region reveal as a self-contained UI or motion artifact
- [ ] **FF-116** · `SPX-4455` · ★★★★☆ **Location Pin Drop** — A portable JRPG-inspired specimen exploring location pin drop as a self-contained UI or motion artifact
- [ ] **FF-117** · `SPX-4456` · ★★★★☆ **Fast Travel Gate** — A portable JRPG-inspired specimen exploring fast travel gate as a self-contained UI or motion artifact
- [ ] **FF-118** · `SPX-4457` · ★★★★☆ **Map Zoom Lock** — A portable JRPG-inspired specimen exploring map zoom lock as a self-contained UI or motion artifact
- [ ] **FF-119** · `SPX-4458` · ★★★★☆ **Route Trace** — A portable JRPG-inspired specimen exploring route trace as a self-contained UI or motion artifact
- [ ] **FF-120** · `SPX-4459` · ★★★★☆ **Destination Acquire** — A portable JRPG-inspired specimen exploring destination acquire as a self-contained UI or motion artifact
- [ ] **FF-121** · `SPX-4460` · ★★★★☆ **Region Transition Wipe** — A portable JRPG-inspired specimen exploring region transition wipe as a self-contained UI or motion artifact
- [ ] **FF-122** · `SPX-4461` · ★★★☆☆ **Map Marker Cluster** — A portable JRPG-inspired specimen exploring map marker cluster as a self-contained UI or motion artifact

## 15. Save / Load / Menu

- [ ] **FF-123** · `SPX-4462` · ★★★★★ **Save Crystal Pulse** — An abstract crystalline save point emits a restrained geometric pulse
- [ ] **FF-124** · `SPX-4463` · ★★★☆☆ **Save Confirm** — A portable JRPG-inspired specimen exploring save confirm as a self-contained UI or motion artifact
- [ ] **FF-125** · `SPX-4464` · ★★★★★ **Load Data Sweep** — A loading line sweeps across a save slot while status updates
- [ ] **FF-126** · `SPX-4465` · ★★★★☆ **Save Slot Select** — A portable JRPG-inspired specimen exploring save slot select as a self-contained UI or motion artifact
- [ ] **FF-127** · `SPX-4466` · ★★★★☆ **Load Slot Expand** — A portable JRPG-inspired specimen exploring load slot expand as a self-contained UI or motion artifact
- [ ] **FF-128** · `SPX-4467` · ★★★☆☆ **New Game Title Reveal** — A portable JRPG-inspired specimen exploring new game title reveal as a self-contained UI or motion artifact
- [ ] **FF-129** · `SPX-4468` · ★★★☆☆ **Menu Back Dissolve** — A portable JRPG-inspired specimen exploring menu back dissolve as a self-contained UI or motion artifact

## 16. Crystal Motifs

- [ ] **FF-130** · `SPX-4469` · ★★★★★ **Crystal Shard Assemble** — Faceted abstract shards assemble into a glowing crystal emblem
- [ ] **FF-131** · `SPX-4470` · ★★★★★ **Crystal Shatter** — A crystal-like UI emblem fractures into deterministic polygonal pieces
- [ ] **FF-132** · `SPX-4471` · ★★★★☆ **Crystal Rotation** — A portable JRPG-inspired specimen exploring crystal rotation as a self-contained UI or motion artifact
- [ ] **FF-133** · `SPX-4472` · ★★★★☆ **Crystal Save Icon** — A portable JRPG-inspired specimen exploring crystal save icon as a self-contained UI or motion artifact
- [ ] **FF-134** · `SPX-4473` · ★★★★☆ **Shard Progress Fill** — A portable JRPG-inspired specimen exploring shard progress fill as a self-contained UI or motion artifact
- [ ] **FF-135** · `SPX-4474` · ★★★☆☆ **Crystal Lock** — A portable JRPG-inspired specimen exploring crystal lock as a self-contained UI or motion artifact
- [ ] **FF-136** · `SPX-4475` · ★★★★☆ **Crystal Unlock** — A portable JRPG-inspired specimen exploring crystal unlock as a self-contained UI or motion artifact

## 17. Quest / Objectives

- [ ] **FF-137** · `SPX-4476` · ★★★★★ **Quest Accepted Stamp** — An objective enters with a strong original acceptance treatment
- [ ] **FF-138** · `SPX-4477` · ★★★★☆ **Quest Updated Slide** — A portable JRPG-inspired specimen exploring quest updated slide as a self-contained UI or motion artifact
- [ ] **FF-139** · `SPX-4478` · ★★★☆☆ **Objective Complete** — A portable JRPG-inspired specimen exploring objective complete as a self-contained UI or motion artifact
- [ ] **FF-140** · `SPX-4479` · ★★★★☆ **New Objective Beacon** — A portable JRPG-inspired specimen exploring new objective beacon as a self-contained UI or motion artifact
- [ ] **FF-141** · `SPX-4480` · ★★★★★ **Quest Chain Advance** — One objective completes and the next objective takes its place
- [ ] **FF-142** · `SPX-4481` · ★★★★☆ **Optional Objective Fade** — A portable JRPG-inspired specimen exploring optional objective fade as a self-contained UI or motion artifact
- [ ] **FF-143** · `SPX-4482` · ★★★★☆ **Quest Reward Reveal** — A portable JRPG-inspired specimen exploring quest reward reveal as a self-contained UI or motion artifact
- [ ] **FF-144** · `SPX-4483` · ★★★★☆ **Objective Failed** — A portable JRPG-inspired specimen exploring objective failed as a self-contained UI or motion artifact

## 18. Dialogue / Narrative

- [ ] **FF-145** · `SPX-4484` · ★★★★☆ **Dialogue Box Reveal** — A portable JRPG-inspired specimen exploring dialogue box reveal as a self-contained UI or motion artifact
- [ ] **FF-146** · `SPX-4485` · ★★★★☆ **Character Name Plate** — A portable JRPG-inspired specimen exploring character name plate as a self-contained UI or motion artifact
- [ ] **FF-147** · `SPX-4486` · ★★★☆☆ **Text Type-On** — A portable JRPG-inspired specimen exploring text type-on as a self-contained UI or motion artifact
- [ ] **FF-148** · `SPX-4487` · ★★★★☆ **Dialogue Advance Pulse** — A portable JRPG-inspired specimen exploring dialogue advance pulse as a self-contained UI or motion artifact
- [ ] **FF-149** · `SPX-4488` · ★★★★☆ **Choice List Assemble** — A portable JRPG-inspired specimen exploring choice list assemble as a self-contained UI or motion artifact
- [ ] **FF-150** · `SPX-4489` · ★★★★☆ **Choice Confirm** — A portable JRPG-inspired specimen exploring choice confirm as a self-contained UI or motion artifact
- [ ] **FF-151** · `SPX-4490` · ★★★★☆ **Narrative Fade Transition** — A portable JRPG-inspired specimen exploring narrative fade transition as a self-contained UI or motion artifact

## 19. Vehicle / Fast Travel

- [ ] **FF-152** · `SPX-4491` · ★★★★☆ **Vehicle Launch** — A portable JRPG-inspired specimen exploring vehicle launch as a self-contained UI or motion artifact
- [ ] **FF-153** · `SPX-4492` · ★★★★☆ **Destination Lock** — A portable JRPG-inspired specimen exploring destination lock as a self-contained UI or motion artifact
- [ ] **FF-154** · `SPX-4493` · ★★★☆☆ **Travel Progress Sweep** — A portable JRPG-inspired specimen exploring travel progress sweep as a self-contained UI or motion artifact
- [ ] **FF-155** · `SPX-4494` · ★★★★☆ **Arrival Brake** — A portable JRPG-inspired specimen exploring arrival brake as a self-contained UI or motion artifact
- [ ] **FF-156** · `SPX-4495` · ★★★★☆ **Airship Map Overlay** — A portable JRPG-inspired specimen exploring airship map overlay as a self-contained UI or motion artifact

## 20. Menu Transitions

- [ ] **FF-157** · `SPX-4496` · ★★★☆☆ **JRPG Menu Slide** — A portable JRPG-inspired specimen exploring jrpg menu slide as a self-contained UI or motion artifact
- [ ] **FF-158** · `SPX-4497` · ★★★★☆ **Panel Corner Snap** — A portable JRPG-inspired specimen exploring panel corner snap as a self-contained UI or motion artifact
- [ ] **FF-159** · `SPX-4498` · ★★★☆☆ **Menu Stack Reorder** — A portable JRPG-inspired specimen exploring menu stack reorder as a self-contained UI or motion artifact
- [ ] **FF-160** · `SPX-4499` · ★★★★☆ **Menu Blur Reveal** — A portable JRPG-inspired specimen exploring menu blur reveal as a self-contained UI or motion artifact
- [ ] **FF-161** · `SPX-4500` · ★★★☆☆ **Menu Close Fold** — A portable JRPG-inspired specimen exploring menu close fold as a self-contained UI or motion artifact
- [ ] **FF-162** · `SPX-4501` · ★★★★☆ **Section Header Sweep** — A portable JRPG-inspired specimen exploring section header sweep as a self-contained UI or motion artifact

## 21. Typography / Scores

- [ ] **FF-163** · `SPX-4502` · ★★★★☆ **Large Result Numeral** — A portable JRPG-inspired specimen exploring large result numeral as a self-contained UI or motion artifact
- [ ] **FF-164** · `SPX-4503` · ★★★★☆ **Gold Result Label** — A portable JRPG-inspired specimen exploring gold result label as a self-contained UI or motion artifact
- [ ] **FF-165** · `SPX-4504` · ★★★★☆ **Damage Counter Roll** — A portable JRPG-inspired specimen exploring damage counter roll as a self-contained UI or motion artifact
- [ ] **FF-166** · `SPX-4505` · ★★★★☆ **Stat Counter Tick** — A portable JRPG-inspired specimen exploring stat counter tick as a self-contained UI or motion artifact
- [ ] **FF-167** · `SPX-4506` · ★★★★★ **Rank Letter Reveal** — A large rank letter arrives with a short radial emphasis
- [ ] **FF-168** · `SPX-4507` · ★★★★☆ **Score Total Assemble** — A portable JRPG-inspired specimen exploring score total assemble as a self-contained UI or motion artifact

## 22. Particles / Light

- [ ] **FF-169** · `SPX-4508` · ★★★★☆ **Magic Particle Orbit** — A portable JRPG-inspired specimen exploring magic particle orbit as a self-contained UI or motion artifact
- [ ] **FF-170** · `SPX-4509` · ★★★★☆ **Spark Trail** — A portable JRPG-inspired specimen exploring spark trail as a self-contained UI or motion artifact
- [ ] **FF-171** · `SPX-4510` · ★★★☆☆ **Starburst Cross** — A portable JRPG-inspired specimen exploring starburst cross as a self-contained UI or motion artifact
- [ ] **FF-172** · `SPX-4511` · ★★★★☆ **Light Sweep** — A portable JRPG-inspired specimen exploring light sweep as a self-contained UI or motion artifact
- [ ] **FF-173** · `SPX-4512` · ★★★★☆ **Energy Ring** — A portable JRPG-inspired specimen exploring energy ring as a self-contained UI or motion artifact
- [ ] **FF-174** · `SPX-4513` · ★★★★☆ **Particle Collapse** — A portable JRPG-inspired specimen exploring particle collapse as a self-contained UI or motion artifact

## 23. Crafting / Upgrades

- [ ] **FF-175** · `SPX-4514` · ★★★★☆ **Upgrade Material Insert** — A portable JRPG-inspired specimen exploring upgrade material insert as a self-contained UI or motion artifact
- [ ] **FF-176** · `SPX-4515` · ★★★☆☆ **Upgrade Success Burst** — A portable JRPG-inspired specimen exploring upgrade success burst as a self-contained UI or motion artifact
- [ ] **FF-177** · `SPX-4516` · ★★★★☆ **Crafting Complete** — A portable JRPG-inspired specimen exploring crafting complete as a self-contained UI or motion artifact
- [ ] **FF-178** · `SPX-4517` · ★★★★☆ **Equipment Level Roll** — A portable JRPG-inspired specimen exploring equipment level roll as a self-contained UI or motion artifact
- [ ] **FF-179** · `SPX-4518` · ★★★★☆ **Upgrade Cost Deduct** — A portable JRPG-inspired specimen exploring upgrade cost deduct as a self-contained UI or motion artifact
- [ ] **FF-180** · `SPX-4519` · ★★★☆☆ **Upgrade Failure Shake** — A portable JRPG-inspired specimen exploring upgrade failure shake as a self-contained UI or motion artifact

## 24. Party / Character Select

- [ ] **FF-181** · `SPX-4520` · ★★★★☆ **Party Slot Assemble** — A portable JRPG-inspired specimen exploring party slot assemble as a self-contained UI or motion artifact
- [ ] **FF-182** · `SPX-4521` · ★★★★☆ **Character Swap Slide** — A portable JRPG-inspired specimen exploring character swap slide as a self-contained UI or motion artifact
- [ ] **FF-183** · `SPX-4522` · ★★★★☆ **Active Character Frame** — A portable JRPG-inspired specimen exploring active character frame as a self-contained UI or motion artifact
- [ ] **FF-184** · `SPX-4523` · ★★★★☆ **Party Order Reorder** — A portable JRPG-inspired specimen exploring party order reorder as a self-contained UI or motion artifact
- [ ] **FF-185** · `SPX-4524` · ★★★★☆ **Character Portrait Reveal** — A portable JRPG-inspired specimen exploring character portrait reveal as a self-contained UI or motion artifact

## 25. Encounter Transitions

- [ ] **FF-186** · `SPX-4525` · ★★★★★ **Encounter Flash** — The world view freezes briefly and snaps into a battle-state transition
- [ ] **FF-187** · `SPX-4526` · ★★★☆☆ **Encounter Ring Expand** — A portable JRPG-inspired specimen exploring encounter ring expand as a self-contained UI or motion artifact
- [ ] **FF-188** · `SPX-4527` · ★★★☆☆ **Enemy Group Reveal** — A portable JRPG-inspired specimen exploring enemy group reveal as a self-contained UI or motion artifact
- [ ] **FF-189** · `SPX-4528` · ★★★☆☆ **Random Encounter Flicker** — A portable JRPG-inspired specimen exploring random encounter flicker as a self-contained UI or motion artifact
- [ ] **FF-190** · `SPX-4529` · ★★★★☆ **Battle Start Shutter** — A portable JRPG-inspired specimen exploring battle start shutter as a self-contained UI or motion artifact

## 26. Software Mappings

- [ ] **FF-191** · `SPX-4530` · ★★★★☆ **ATB Gauge as Processing Queue** — A portable JRPG-inspired specimen exploring atb gauge as processing queue as a self-contained UI or motion artifact
- [ ] **FF-192** · `SPX-4531` · ★★★☆☆ **Limit Gauge as Capacity Threshold** — A portable JRPG-inspired specimen exploring limit gauge as capacity threshold as a self-contained UI or motion artifact
- [ ] **FF-193** · `SPX-4532` · ★★★★☆ **Materia Socket as Plugin Slot** — A portable JRPG-inspired specimen exploring materia socket as plugin slot as a self-contained UI or motion artifact
- [ ] **FF-194** · `SPX-4533` · ★★★☆☆ **Skill Tree as Dependency Graph** — A portable JRPG-inspired specimen exploring skill tree as dependency graph as a self-contained UI or motion artifact
- [ ] **FF-195** · `SPX-4534` · ★★★☆☆ **Victory Tally as Batch Results** — A portable JRPG-inspired specimen exploring victory tally as batch results as a self-contained UI or motion artifact
- [ ] **FF-196** · `SPX-4535` · ★★★★☆ **Boss Health as Remaining Budget** — A portable JRPG-inspired specimen exploring boss health as remaining budget as a self-contained UI or motion artifact
- [ ] **FF-197** · `SPX-4536` · ★★★★☆ **Target Reticle as Search Selection** — A portable JRPG-inspired specimen exploring target reticle as search selection as a self-contained UI or motion artifact
- [ ] **FF-198** · `SPX-4537` · ★★★☆☆ **Status Effect as System Condition** — A portable JRPG-inspired specimen exploring status effect as system condition as a self-contained UI or motion artifact
- [ ] **FF-199** · `SPX-4538` · ★★★★☆ **Save Crystal as Checkpoint** — A portable JRPG-inspired specimen exploring save crystal as checkpoint as a self-contained UI or motion artifact
- [ ] **FF-200** · `SPX-4539` · ★★★★☆ **Quest Chain as Workflow** — A portable JRPG-inspired specimen exploring quest chain as workflow as a self-contained UI or motion artifact
- [ ] **FF-201** · `SPX-4540` · ★★★★☆ **World Map Route as Navigation** — A portable JRPG-inspired specimen exploring world map route as navigation as a self-contained UI or motion artifact
- [ ] **FF-202** · `SPX-4541` · ★★★★☆ **Dialogue Choice as Branching Decision** — A portable JRPG-inspired specimen exploring dialogue choice as branching decision as a self-contained UI or motion artifact
- [ ] **FF-203** · `SPX-4542` · ★★★☆☆ **Cinematic Letterbox as Focus Mode** — A portable JRPG-inspired specimen exploring cinematic letterbox as focus mode as a self-contained UI or motion artifact
- [ ] **FF-204** · `SPX-4543` · ★★★☆☆ **Crystal Shatter as Destructive Reset** — A portable JRPG-inspired specimen exploring crystal shatter as destructive reset as a self-contained UI or motion artifact
- [ ] **FF-205** · `SPX-4544` · ★★★★☆ **Rank Reveal as Evaluation Result** — A portable JRPG-inspired specimen exploring rank reveal as evaluation result as a self-contained UI or motion artifact
- [ ] **FF-206** · `SPX-4545` · ★★★★☆ **Light Sweep as Freshness Marker** — A portable JRPG-inspired specimen exploring light sweep as freshness marker as a self-contained UI or motion artifact
- [ ] **FF-207** · `SPX-4546` · ★★★☆☆ **Party Slots as Team Assignment** — A portable JRPG-inspired specimen exploring party slots as team assignment as a self-contained UI or motion artifact
- [ ] **FF-208** · `SPX-4547` · ★★★☆☆ **Encounter Flash as Context Switch** — A portable JRPG-inspired specimen exploring encounter flash as context switch as a self-contained UI or motion artifact

## Strong software mappings

- **ATB gauge → processing queue**
- **Limit gauge → capacity threshold**
- **Materia socket → plugin slot**
- **Skill tree → dependency graph**
- **Victory tally → batch results**
- **Boss health → remaining budget/capacity**
- **Target reticle → search selection**
- **Status effects → system conditions**
- **Save crystal → checkpoint**
- **Quest chain → workflow**
- **World-map route → navigation**
- **Dialogue choice → branching decision**
- **Cinematic letterbox → focus mode**
- **Crystal shatter → destructive reset**
- **Rank reveal → evaluation result**
- **Party slots → team assignment**
- **Encounter flash → context switch**

## Playground technical contract

- Prefer plain HTML + CSS; tiny deterministic vanilla JS only where counters, gauges, selection or sequencing require it.
- Must run inside `<iframe sandbox="allow-scripts">`. Never add `allow-same-origin`.
- No parent access, storage, fetch, navigation, WebAudio, or external APIs.
- No React/Vue inside specimens. No external game assets, extracted textures, audio, fonts, or logos.
- Prefer `deps: 'none'`. Freeze durations, counts, colours, gauge ranges, particle positions, and geometry. No runtime randomness.
- Honour both `prefers-reduced-motion` and `data-force-reduced-motion`. Looping gauges/pulses become static representative states.
- High-contrast flashes must be finite and must not rapidly repeat. Replay/reset must clear timers.
- Preserve keyboard accessibility for commands, targets, and choices.
- Register in `registry/shards/final-fantasy.ts` + `registry/order.ts`. Do not redesign catalogue chrome.

## Catalogue thesis

Final Fantasy-style interfaces turn invisible state into **ritual**. A command becomes a physical menu. Readiness becomes a filling gauge. A new ability becomes a reveal. A reward becomes a tally. A target becomes a reticle. A checkpoint becomes a crystal. A major state change gets cinematic framing. Specimens should borrow that grammar without becoming cosplay: software states should feel earned, charged, staged, and legible.
