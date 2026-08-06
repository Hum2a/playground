# Persona 3 Specimen Checklist

> Working backlog for portable motion/UI artifacts inspired by Persona 3 and Persona 3 Reload. Interaction primitives, not game replicas. Avoid copyrighted character art, logos, extracted assets, audio, and proprietary fonts.

## How to use

- **P3-NNN** — stable catalogue id (this list).
- **SPX-NNN** — specimen registry ref. Existing shipped effects keep their live refs (`Blue Glass Shard Transition` → `SPX-005`, `Evoker Menu Snap` → `SPX-006`). Unbuilt ideas are pre-assigned `SPX-400`…`SPX-635` — use that ref when implementing; do not invent a different number.
- Non-catalogue specimens (other franchises / originals) use gaps not reserved by open P5 (`SPX-015`–`SPX-312`), P3 (`SPX-400`–`SPX-635`), or PK (`SPX-700`–`SPX-965`) rows; prefer leftover `SPX-313`–`SPX-399`, `SPX-636`–`SPX-699`, or `SPX-966+`.
- Mark **`[x]`** only when the specimen is registered in `src/specimens/index.ts` with a real `ref` (not `SPX-TODO`) and verified. Agents must update this file in the same change — see `.cursor/rules/37_persona-catalogue.mdc`.
- Progress: **33 / 238** complete.

| Status | Count |
| --- | --- |
| Done | 33 |
| Open | 205 |

## Visual grammar

| Motif | Use for |
| --- | --- |
| Water | flow, transition, depth |
| Glass | state change, revelation, refraction |
| Moon | time, progression, thresholds |
| Evoker | decisive action, commitment, snap |
| Dark Hour | transformation, warning, alternate state |
| Tartarus | hierarchy, ascension, progress, discovery |
| SEES UI | selection, targeting, analysis |
| Velvet / butterflies | arrival, departure, fusion, ephemeral state |

## Shipped (mapped to live specimens)

| P3 | SPX | Specimen id | Title |
| --- | --- | --- | --- |
| P3-019 | `SPX-005` | `azure-shard-transition` | Blue Glass Shard Transition |
| P3-037 | `SPX-006` | `precision-menu-snap` | Precision Menu Snap |
| P3-047 | `SPX-444` | `dark-hour-conversion` | Dark Hour Conversion |
| P3-059 | `SPX-456` | `moon-phase-progress` | Moon Phase Progress |
| P3-112 | `SPX-509` | `fusion-selection-merge` | Fusion Selection Merge |
| P3-105 | `SPX-502` | `velvet-door-transition` | Velvet Door Transition |
| P3-096 | `SPX-493` | `persona-awakening-reveal` | Persona Awakening Reveal |
| P3-071 | `SPX-468` | `tartarus-floor-ascension` | Tartarus Floor Ascension |
| P3-007 | `SPX-406` | `ripple-portal-transition` | Ripple Portal Transition |
| P3-224 | `SPX-621` | `blue-door-discovery` | Blue Door Discovery |
| P3-107 | `SPX-504` | `butterfly-entry` | Butterfly Entry |
| P3-001 | `SPX-400` | `waterline-page-wipe` | Waterline Page Wipe |
| P3-207 | `SPX-604` | `scanner-search` | Scanner Search |
| P3-083 | `SPX-480` | `tactical-target-lock` | Tactical Target Lock |
| P3-085 | `SPX-482` | `enemy-scan-reveal` | Enemy Scan Reveal |
| P3-221 | `SPX-618` | `energy-transfer-sync` | Energy Transfer Sync |
| P3-134 | `SPX-531` | `midnight-clock-transition` | Midnight Clock Transition |
| P3-225 | `SPX-622` | `memory-fragment-reveal` | Memory Fragment Reveal |
| P3-054 | `SPX-451` | `temporal-freeze` | Temporal Freeze |
| P3-098 | `SPX-495` | `card-break-summon` | Card Break Summon |
| P3-031 | `SPX-429` | `crystallised-selection` | Crystallised Selection |
| P3-009 | `SPX-408` | `surface-break-reveal` | Surface Break Reveal |
| P3-121 | `SPX-518` | `butterfly-success-state` | Butterfly Success State |
| P3-003 | `SPX-402` | `liquid-split-transition` | Liquid Split Transition |
| P3-089 | `SPX-486` | `tactical-command-wheel` | Tactical Command Wheel |
| P3-064 | `SPX-461` | `full-moon-milestone` | Full Moon Milestone |
| P3-170 | `SPX-567` | `blue-focus-brackets` | Blue Focus Brackets |
| P3-153 | `SPX-550` | `max-rank-completion` | Max Rank Completion |
| P3-186 | `SPX-583` | `dark-hour-conversion-loader` | Dark Hour Conversion Loader |
| P3-138 | `SPX-535` | `deadline-clock` | Deadline Clock |
| P3-092 | `SPX-489` | `critical-weakness-hit` | Critical Weakness Hit |

| P3-124 | `SPX-521` | `blue-flame-button-hover` | Blue Flame Button Hover |
| P3-125 | `SPX-522` | `energy-charge-confirmation` | Energy Charge Confirmation |
## Core first-wave

Curated implementation priority. Same checkbox as the master list — checking either counts.

- [x] **P3-019** · `SPX-005` · **Blue Glass Shard Transition** — transition
- [x] **P3-037** · `SPX-006` · **Evoker Menu Snap** — selection
- [x] **P3-047** · `SPX-444` · **Dark Hour Conversion** — transformation
- [ ] **P3-062** · `SPX-459` · **Eclipse Transition** — transition
- [x] **P3-071** · `SPX-468` · **Tartarus Floor Ascension** — progress
- [x] **P3-096** · `SPX-493` · **Persona Awakening Reveal** — reveal
- [x] **P3-105** · `SPX-502` · **Velvet Door Transition** — transition
- [x] **P3-112** · `SPX-509` · **Fusion Selection Merge** — fusion
- [x] **P3-083** · `SPX-480` · **Tactical Target Lock** — selection
- [x] **P3-059** · `SPX-456` · **Moon Phase Progress** — progress
- [ ] **P3-145** · `SPX-542` · **Social Link Rank Up** — progression
- [x] **P3-224** · `SPX-621` · **Blue Door Discovery** — discovery
- [x] **P3-225** · `SPX-622` · **Memory Fragment Reveal** — reveal
- [x] **P3-001** · `SPX-400` · **Waterline Page Wipe** — transition
- [x] **P3-007** · `SPX-406` · **Ripple Portal Transition** — transition
- [ ] **P3-020** · `SPX-418` · **Glass Fracture Reveal** — reveal
- [x] **P3-107** · `SPX-504` · **Butterfly Entry** — arrival
- [x] **P3-134** · `SPX-531` · **Midnight Clock Transition** — transition
- [x] **P3-207** · `SPX-604` · **Scanner Search** — search
- [x] **P3-221** · `SPX-618` · **Energy Transfer Sync** — sync

## Water / liquid UI

### Transitions

- [x] **P3-001** · `SPX-400` · **Waterline Page Wipe** — transitions.
- [ ] **P3-002** · `SPX-401` · **Submerged Reveal** — transitions.
- [x] **P3-003** · `SPX-402` · **Liquid Split Transition** — transitions.
- [ ] **P3-004** · `SPX-403` · **Wave Crash Reveal** — transitions.
- [ ] **P3-005** · `SPX-404` · **Water Curtain Drop** — transitions.
- [ ] **P3-006** · `SPX-405` · **Tidal Pull Exit** — transitions.
- [x] **P3-007** · `SPX-406` · **Ripple Portal Transition** — transitions.
- [ ] **P3-008** · `SPX-407` · **Underwater Distortion Swap** — transitions.
- [x] **P3-009** · `SPX-408` · **Surface Break Reveal** — transitions.
- [ ] **P3-010** · `SPX-409` · **Droplet Collapse Transition** — transitions.

### Components / feedback

- [ ] **P3-011** · `SPX-410` · **Liquid Button Fill** — components / feedback.
- [ ] **P3-012** · `SPX-411` · **Ripple Selection** — components / feedback.
- [ ] **P3-013** · `SPX-412` · **Waterline Progress** — components / feedback.
- [ ] **P3-014** · `SPX-413` · **Waveform Loading Indicator** — components / feedback.
- [ ] **P3-015** · `SPX-414` · **Liquid Toggle** — components / feedback.
- [ ] **P3-016** · `SPX-415` · **Droplet Notification** — components / feedback.
- [ ] **P3-017** · `SPX-416` · **Water Disturbance Hover** — components / feedback.
- [ ] **P3-018** · `SPX-417` · **Current Direction Indicator** — components / feedback.

## Glass / shards / refraction

### Transitions

- [x] **P3-019** · `SPX-005` · **Blue Glass Shard Transition** — transitions.
- [ ] **P3-020** · `SPX-418` · **Glass Fracture Reveal** — transitions.
- [ ] **P3-021** · `SPX-419` · **Glass Assembly Entrance** — transitions.
- [ ] **P3-022** · `SPX-420` · **Refraction Page Swap** — transitions.
- [ ] **P3-023** · `SPX-421` · **Diagonal Glass Sweep** — transitions.
- [ ] **P3-024** · `SPX-422` · **Shard Tunnel Transition** — transitions.
- [ ] **P3-025** · `SPX-423` · **Glass Collapse Exit** — transitions.
- [ ] **P3-026** · `SPX-424` · **Cracked Screen Error** — transitions.
- [ ] **P3-027** · `SPX-425` · **Shatter-to-Content Reveal** — transitions.
- [ ] **P3-028** · `SPX-426` · **Glass Door Open** — transitions.

### Interaction

- [ ] **P3-029** · `SPX-427` · **Shard Hover** — interaction.
- [ ] **P3-030** · `SPX-428` · **Glass Focus Frame** — interaction.
- [x] **P3-031** · `SPX-429` · **Crystallised Selection** — interaction.
- [ ] **P3-032** · `SPX-430` · **Shard Burst Button** — interaction.
- [ ] **P3-033** · `SPX-431` · **Glass Tab Switcher** — interaction.
- [ ] **P3-034** · `SPX-432` · **Refraction Hover** — interaction.
- [ ] **P3-035** · `SPX-433` · **Cracked Disabled State** — interaction.
- [ ] **P3-036** · `SPX-434` · **Glass Badge Assembly** — interaction.

## Evoker / trigger / decisive action

- [x] **P3-037** · `SPX-006` · **Evoker Menu Snap** — evoker.
- [ ] **P3-038** · `SPX-435` · **Trigger Confirmation** — evoker.
- [ ] **P3-039** · `SPX-436` · **Evoker Selection Lock** — evoker.
- [ ] **P3-040** · `SPX-437` · **Trigger Pull Button** — evoker.
- [ ] **P3-041** · `SPX-438` · **Execution Line** — evoker.
- [ ] **P3-042** · `SPX-439` · **Commit Snap** — evoker.
- [ ] **P3-043** · `SPX-440` · **Action Chamber Loader** — evoker.
- [ ] **P3-044** · `SPX-441` · **Target Acquired Selection** — evoker.
- [ ] **P3-045** · `SPX-442` · **Evoker Cancel Recoil** — evoker.
- [ ] **P3-046** · `SPX-443` · **Critical Action Freeze** — evoker.

## Dark Hour transformation

- [x] **P3-047** · `SPX-444` · **Dark Hour Conversion** — dark-hour.
- [ ] **P3-048** · `SPX-445` · **Midnight Snap** — dark-hour.
- [ ] **P3-049** · `SPX-446` · **Dark Hour Overlay Descent** — dark-hour.
- [ ] **P3-050** · `SPX-447` · **Reality Distortion Transition** — dark-hour.
- [ ] **P3-051** · `SPX-448` · **Environmental Colour Drain** — dark-hour.
- [ ] **P3-052** · `SPX-449` · **Dark Hour Scan** — dark-hour.
- [ ] **P3-053** · `SPX-450` · **Midnight Pulse** — dark-hour.
- [x] **P3-054** · `SPX-451` · **Temporal Freeze** — dark-hour.
- [ ] **P3-055** · `SPX-452` · **Dark Hour Exit** — dark-hour.
- [ ] **P3-056** · `SPX-453` · **Dark Hour Approaching** — dark-hour.
- [ ] **P3-057** · `SPX-454` · **Temporal Anomaly Warning** — dark-hour.
- [ ] **P3-058** · `SPX-455` · **Midnight Threshold Warning** — dark-hour.

## Moon / lunar cycle

- [x] **P3-059** · `SPX-456` · **Moon Phase Progress** — moon.
- [ ] **P3-060** · `SPX-457` · **Lunar Cycle Loader** — moon.
- [ ] **P3-061** · `SPX-458` · **Moonrise Reveal** — moon.
- [ ] **P3-062** · `SPX-459` · **Eclipse Transition** — moon.
- [ ] **P3-063** · `SPX-460` · **Crescent Wipe** — moon.
- [x] **P3-064** · `SPX-461` · **Full Moon Milestone** — moon.
- [ ] **P3-065** · `SPX-462` · **Lunar Deadline** — moon.
- [ ] **P3-066** · `SPX-463` · **Moon Phase Pagination** — moon.
- [ ] **P3-067** · `SPX-464` · **Eclipse Loading State** — moon.
- [ ] **P3-068** · `SPX-465` · **Moon Orbit Selection** — moon.
- [ ] **P3-069** · `SPX-466` · **Lunar Calendar Change** — moon.
- [ ] **P3-070** · `SPX-467` · **New Moon Locked State** — moon.

## Tartarus / tower / ascension

- [x] **P3-071** · `SPX-468` · **Tartarus Floor Ascension** — tartarus.
- [ ] **P3-072** · `SPX-469` · **Tower Progress Indicator** — tartarus.
- [ ] **P3-073** · `SPX-470` · **Floor Cleared Stamp** — tartarus.
- [ ] **P3-074** · `SPX-471` · **Block Completion** — tartarus.
- [ ] **P3-075** · `SPX-472` · **Floor Breakthrough** — tartarus.
- [ ] **P3-076** · `SPX-473` · **Vertical Milestone Climb** — tartarus.
- [ ] **P3-077** · `SPX-474` · **Tartarus Elevator Selector** — tartarus.
- [ ] **P3-078** · `SPX-475` · **Floor Number Counter** — tartarus.
- [ ] **P3-079** · `SPX-476` · **Tower Section Navigation** — tartarus.
- [ ] **P3-080** · `SPX-477` · **Floor Discovery** — tartarus.
- [ ] **P3-081** · `SPX-478` · **Locked Floor Barrier** — tartarus.
- [ ] **P3-082** · `SPX-479` · **Teleport Floor Selection** — tartarus.

## SEES / tactical interface

- [x] **P3-083** · `SPX-480` · **Tactical Target Lock** — tactical.
- [ ] **P3-084** · `SPX-481` · **Target Switch Snap** — tactical.
- [x] **P3-085** · `SPX-482` · **Enemy Scan Reveal** — tactical.
- [ ] **P3-086** · `SPX-483` · **Weakness Discovery** — tactical.
- [ ] **P3-087** · `SPX-484` · **Analysis Complete** — tactical.
- [ ] **P3-088** · `SPX-485` · **Party Member Selection** — tactical.
- [x] **P3-089** · `SPX-486` · **Tactical Command Wheel** — tactical.
- [ ] **P3-090** · `SPX-487` · **Command Confirmation Snap** — tactical.
- [ ] **P3-091** · `SPX-488` · **Status Scanline** — tactical.
- [x] **P3-092** · `SPX-489` · **Critical Weakness Hit** — tactical.
- [ ] **P3-093** · `SPX-490` · **Target Lost** — tactical.
- [ ] **P3-094** · `SPX-491` · **Target Reacquired** — tactical.
- [ ] **P3-095** · `SPX-492` · **Battle Initiative Strip** — tactical.

## Persona summoning / awakening

- [x] **P3-096** · `SPX-493` · **Persona Awakening Reveal** — summon.
- [ ] **P3-097** · `SPX-494` · **Summoning Burst** — summon.
- [x] **P3-098** · `SPX-495` · **Card Break Summon** — summon.
- [ ] **P3-099** · `SPX-496` · **Identity Breakthrough** — summon.
- [ ] **P3-100** · `SPX-497` · **Power Unlocked** — summon.
- [ ] **P3-101** · `SPX-498` · **Awakening Pulse** — summon.
- [ ] **P3-102** · `SPX-499` · **Persona Acquired** — summon.
- [ ] **P3-103** · `SPX-500` · **Summon Exit** — summon.
- [ ] **P3-104** · `SPX-501` · **Power Surge Progress** — summon.

## Velvet Room

- [x] **P3-105** · `SPX-502` · **Velvet Door Transition** — velvet.
- [ ] **P3-106** · `SPX-503` · **Velvet Curtain Reveal** — velvet.
- [x] **P3-107** · `SPX-504` · **Butterfly Entry** — velvet.
- [ ] **P3-108** · `SPX-505` · **Butterfly Dissolve Exit** — velvet.
- [ ] **P3-109** · `SPX-506` · **Velvet Selection Glow** — velvet.
- [ ] **P3-110** · `SPX-507` · **Contract Signature Reveal** — velvet.
- [ ] **P3-111** · `SPX-508` · **Compendium Entry Acquired** — velvet.
- [x] **P3-112** · `SPX-509` · **Fusion Selection Merge** — velvet.
- [ ] **P3-113** · `SPX-510` · **Fusion Result Reveal** — velvet.
- [ ] **P3-114** · `SPX-511` · **Velvet Loading Curtain** — velvet.
- [ ] **P3-115** · `SPX-512` · **Compendium Search Reveal** — velvet.

## Butterfly motifs

- [ ] **P3-116** · `SPX-513` · **Butterfly Trail Navigation** — butterfly.
- [ ] **P3-117** · `SPX-514` · **Butterfly Notification Arrival** — butterfly.
- [ ] **P3-118** · `SPX-515` · **Butterfly Departure** — butterfly.
- [ ] **P3-119** · `SPX-516` · **Butterfly Hover Trail** — butterfly.
- [ ] **P3-120** · `SPX-517` · **Butterfly Loading Orbit** — butterfly.
- [x] **P3-121** · `SPX-518` · **Butterfly Success State** — butterfly.
- [ ] **P3-122** · `SPX-519` · **Butterfly Unlock** — butterfly.
- [ ] **P3-123** · `SPX-520` · **Butterfly Breadcrumb** — butterfly.

## Blue flame / energy

- [x] **P3-124** · `SPX-521` · **Blue Flame Button Hover** — energy.
- [x] **P3-125** · `SPX-522` · **Energy Charge Confirmation** — energy.
- [ ] **P3-126** · `SPX-523` · **Flame Selection Marker** — energy.
- [ ] **P3-127** · `SPX-524` · **Energy Overflow Warning** — energy.
- [ ] **P3-128** · `SPX-525` · **Power-Up Completion** — energy.
- [ ] **P3-129** · `SPX-526` · **Flame Dissolve** — energy.
- [ ] **P3-130** · `SPX-527` · **Energy Transfer** — energy.
- [ ] **P3-131** · `SPX-528` · **Charge Meter** — energy.
- [ ] **P3-132** · `SPX-529` · **Energy Drain** — energy.
- [ ] **P3-133** · `SPX-530` · **Overcharge Breakthrough** — energy.

## Clock / time / midnight

- [x] **P3-134** · `SPX-531` · **Midnight Clock Transition** — time.
- [ ] **P3-135** · `SPX-532` · **Clock-Hand Wipe** — time.
- [ ] **P3-136** · `SPX-533` · **Time Skip** — time.
- [ ] **P3-137** · `SPX-534` · **Day Advance** — time.
- [x] **P3-138** · `SPX-535` · **Deadline Clock** — time.
- [ ] **P3-139** · `SPX-536` · **Time Frozen State** — time.
- [ ] **P3-140** · `SPX-537` · **Time Resumed** — time.
- [ ] **P3-141** · `SPX-538` · **Midnight Threshold** — time.
- [ ] **P3-142** · `SPX-539` · **Schedule Selection Dial** — time.
- [ ] **P3-143** · `SPX-540` · **Time Window Closing** — time.

## Social Link / relationship UI

- [ ] **P3-144** · `SPX-541` · **Social Link Established** — social-link.
- [ ] **P3-145** · `SPX-542` · **Social Link Rank Up** — social-link.
- [ ] **P3-146** · `SPX-543` · **Relationship Strengthened** — social-link.
- [ ] **P3-147** · `SPX-544` · **Bond Progress Nodes** — social-link.
- [ ] **P3-148** · `SPX-545` · **Rank Milestone** — social-link.
- [ ] **P3-149** · `SPX-546` · **Connection Forming** — social-link.
- [ ] **P3-150** · `SPX-547` · **Connection Broken** — social-link.
- [ ] **P3-151** · `SPX-548` · **New Relationship Discovery** — social-link.
- [ ] **P3-152** · `SPX-549` · **Relationship Selection** — social-link.
- [x] **P3-153** · `SPX-550` · **Max Rank Completion** — social-link.

## School / calendar / daily life

- [ ] **P3-154** · `SPX-551` · **School Bell Transition** — calendar.
- [ ] **P3-155** · `SPX-552` · **After School Time Change** — calendar.
- [ ] **P3-156** · `SPX-553` · **Calendar Page Advance** — calendar.
- [ ] **P3-157** · `SPX-554` · **Activity Selected** — calendar.
- [ ] **P3-158** · `SPX-555` · **Schedule Slot Insert** — calendar.
- [ ] **P3-159** · `SPX-556` · **Day Complete** — calendar.
- [ ] **P3-160** · `SPX-557` · **Evening Arrival** — calendar.
- [ ] **P3-161** · `SPX-558` · **Night Activity Unlock** — calendar.
- [ ] **P3-162** · `SPX-559` · **Next Day Transition** — calendar.

## Menu / navigation language

- [ ] **P3-163** · `SPX-560` · **Blue Blade Navigation Hover** — navigation.
- [ ] **P3-164** · `SPX-561` · **Diagonal Glass Tab Switch** — navigation.
- [ ] **P3-165** · `SPX-562` · **Liquid Navigation Underline** — navigation.
- [ ] **P3-166** · `SPX-563` · **Shard Breadcrumb Transition** — navigation.
- [ ] **P3-167** · `SPX-564` · **Glass Drawer Open** — navigation.
- [ ] **P3-168** · `SPX-565` · **Angular Menu Expansion** — navigation.
- [ ] **P3-169** · `SPX-566` · **Vertical Menu Current** — navigation.
- [x] **P3-170** · `SPX-567` · **Blue Focus Brackets** — navigation.
- [ ] **P3-171** · `SPX-568` · **Navigation Refraction** — navigation.
- [ ] **P3-172** · `SPX-569` · **Selected Item Depth Shift** — navigation.
- [ ] **P3-173** · `SPX-570` · **Menu Exit Collapse** — navigation.
- [ ] **P3-174** · `SPX-571` · **Submenu Glass Split** — navigation.
- [ ] **P3-175** · `SPX-572` · **Back Navigation Recoil** — navigation.

## Loading / processing

- [ ] **P3-176** · `SPX-573` · **Shard Assembly Loader** — loading.
- [ ] **P3-177** · `SPX-574` · **Moon Phase Loader** — loading.
- [ ] **P3-178** · `SPX-575` · **Waterline Loader** — loading.
- [ ] **P3-179** · `SPX-576` · **Tartarus Floor Loader** — loading.
- [ ] **P3-180** · `SPX-577` · **Scan Analysis Loader** — loading.
- [ ] **P3-181** · `SPX-578` · **Butterfly Assembly Loader** — loading.
- [ ] **P3-182** · `SPX-579` · **Clock Advance Loader** — loading.
- [ ] **P3-183** · `SPX-580` · **Glass Refraction Loader** — loading.
- [ ] **P3-184** · `SPX-581` · **Energy Charge Loader** — loading.
- [ ] **P3-185** · `SPX-582` · **Velvet Curtain Loader** — loading.
- [x] **P3-186** · `SPX-583` · **Dark Hour Conversion Loader** — loading.
- [ ] **P3-187** · `SPX-584` · **Fusion Processing Loader** — loading.

## Error / failure

- [ ] **P3-188** · `SPX-585` · **Glass Crack Error** — error.
- [ ] **P3-189** · `SPX-586` · **Frozen Action Failure** — error.
- [ ] **P3-190** · `SPX-587` · **Target Lost Error** — error.
- [ ] **P3-191** · `SPX-588` · **Analysis Failed** — error.
- [ ] **P3-192** · `SPX-589` · **Connection Fracture** — error.
- [ ] **P3-193** · `SPX-590` · **Rejected Command Snap** — error.
- [ ] **P3-194** · `SPX-591` · **Temporal Error** — error.
- [ ] **P3-195** · `SPX-592` · **Broken Shard Status** — error.
- [ ] **P3-196** · `SPX-593` · **Submerged Error** — error.
- [ ] **P3-197** · `SPX-594` · **Dark Hour Failure State** — error.

## Success / completion

- [ ] **P3-198** · `SPX-595` · **Glass Resolution Success** — success.
- [ ] **P3-199** · `SPX-596` · **Water Surface Calm** — success.
- [ ] **P3-200** · `SPX-597` · **Target Confirmed** — success.
- [ ] **P3-201** · `SPX-598` · **Moon Completion** — success.
- [ ] **P3-202** · `SPX-599` · **Floor Cleared** — success.
- [ ] **P3-203** · `SPX-600` · **Butterfly Release** — success.
- [ ] **P3-204** · `SPX-601` · **Energy Stabilised** — success.
- [ ] **P3-205** · `SPX-602` · **Operation Complete Scan** — success.
- [ ] **P3-206** · `SPX-603` · **Midnight Resolved** — success.

## Data / SaaS interactions

### Search

- [x] **P3-207** · `SPX-604` · **Scanner Search** — search.
- [ ] **P3-208** · `SPX-605` · **Search Target Lock** — search.
- [ ] **P3-209** · `SPX-606` · **No Results Dissolve** — search.

### Filtering

- [ ] **P3-210** · `SPX-607` · **Filter Refraction** — filtering.
- [ ] **P3-211** · `SPX-608` · **Filter Lock-In** — filtering.
- [ ] **P3-212** · `SPX-609` · **Filter Clear Waterline** — filtering.

### Sorting

- [ ] **P3-213** · `SPX-610` · **Vertical Floor Sort** — sorting.
- [ ] **P3-214** · `SPX-611` · **Glass Layer Sort** — sorting.

### Insert / remove

- [ ] **P3-215** · `SPX-612` · **Shard Insert** — insert / remove.
- [ ] **P3-216** · `SPX-613` · **Submerge Remove** — insert / remove.
- [ ] **P3-217** · `SPX-614` · **Butterfly Remove** — insert / remove.

### Refresh

- [ ] **P3-218** · `SPX-615` · **Water Refresh** — refresh.
- [ ] **P3-219** · `SPX-616` · **Scan Refresh** — refresh.
- [ ] **P3-220** · `SPX-617` · **Dark Hour Refresh** — refresh.

### Sync

- [x] **P3-221** · `SPX-618` · **Energy Transfer Sync** — sync.
- [ ] **P3-222** · `SPX-619` · **Connection Sync Pulse** — sync.
- [ ] **P3-223** · `SPX-620` · **Sync Complete Merge** — sync.

## Miscellaneous

- [x] **P3-224** · `SPX-621` · **Blue Door Discovery** — misc.
- [x] **P3-225** · `SPX-622` · **Memory Fragment Reveal** — misc.
- [ ] **P3-226** · `SPX-623` · **Reflection Mismatch Hover** — misc.
- [ ] **P3-227** · `SPX-624` · **Underwater Typography Reveal** — misc.
- [ ] **P3-228** · `SPX-625` · **Broken Reflection Transition** — misc.
- [ ] **P3-229** · `SPX-626` · **Depth Dive Navigation** — misc.
- [ ] **P3-230** · `SPX-627` · **Ascending Bubble Metadata** — misc.
- [ ] **P3-231** · `SPX-628` · **Blue Horizon Transition** — misc.
- [ ] **P3-232** · `SPX-629` · **Reflection Selection** — misc.
- [ ] **P3-233** · `SPX-630` · **Memory Reassembly** — misc.
- [ ] **P3-234** · `SPX-631` · **Memory Corruption** — misc.
- [ ] **P3-235** · `SPX-632` · **Doorway Focus State** — misc.
- [ ] **P3-236** · `SPX-633` · **Falling Hour Transition** — misc.
- [ ] **P3-237** · `SPX-634` · **Ocean Depth Loader** — misc.
- [ ] **P3-238** · `SPX-635` · **Distorted Reflection Loader** — misc.

## Collection contrast

**Persona 5:** impact, ink, paper, typography, collision, editorial destruction.

**Persona 3:** water, glass, refraction, depth, moonlight, time, verticality, transformation, cool technological geometry.
