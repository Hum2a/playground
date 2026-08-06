# My Hero Academia Specimen Checklist

> Working backlog for portable motion/UI artifacts inspired by My Hero Academia visual grammar. Interaction primitives, not anime/manga replicas. Avoid copyrighted character art, logos, costumes, U.A. insignia, title cards, extracted assets, audio, and proprietary fonts.

## How to use

- **MHA-NNN** — stable catalogue id (this list).
- **SPX-NNN** — specimen registry ref. Unbuilt ideas are pre-assigned `SPX-1975`…`SPX-2343` — use that ref when implementing; do not invent a different number.
- Non-catalogue specimens (other franchises / originals) use gaps not reserved by open P5 (`SPX-015`–`SPX-312`), P3 (`SPX-400`–`SPX-635`), PK (`SPX-700`–`SPX-965`), DB (`SPX-966`–`SPX-1209`), IOS (`SPX-1300`–`SPX-1557`), AND (`SPX-1558`–`SPX-1974`), or open MHA rows; prefer leftover `SPX-313`–`SPX-399`, `SPX-636`–`SPX-699`, `SPX-1210`–`SPX-1299`, or `SPX-2344+`.
- Mark **`[x]`** only when the specimen is registered in `src/specimens/index.ts` with a real `ref` (not `SPX-TODO`) and verified. Agents must update this file in the same change — see `.cursor/rules/37_persona-catalogue.mdc`.
- Progress: **24 / 369** complete.

| Status | Count |
| --- | --- |
| Done | 24 |
| Open | 345 |

## Visual grammar

| Motif | Use for |
| --- | --- |
| Manga impact | interruptions, high-priority feedback, panel wipes |
| Quirk / capability | feature activation, cooldown, power thresholds |
| Analysis / diagnostics | scribble reveal, weakness highlight, insight |
| Training / evaluation | simulation start, performance meters, tests |
| Emergency / escalation | threat levels, takeover, lockdown, all-clear |
| Tournament / bracket | versus cards, winner advance, rankings |
| Agency / assignment | dispatch, hero assignment, mission transfer |
| Support tech | blueprint assembly, part snap, plugins/tooling |

## Shipped (mapped to live specimens)

| MHA | SPX | Specimen id | Title |
| --- | --- | --- | --- |
| MHA-001 | `SPX-1975` | `impact-frame-slam` | Impact Frame Slam |
| MHA-002 | `SPX-1976` | `speed-line-action-reveal` | Speed-Line Action Reveal |
| MHA-003 | `SPX-1977` | `panel-break-transition` | Panel Break Transition |
| MHA-013 | `SPX-1987` | `hero-name-slam` | Hero Name Slam |
| MHA-016 | `SPX-1990` | `character-freeze-introduction` | Character Freeze Introduction |
| MHA-023 | `SPX-1997` | `quirk-activation-burst` | Quirk Activation Burst |
| MHA-026 | `SPX-2000` | `quirk-cooldown-ring` | Quirk Cooldown Ring |
| MHA-027 | `SPX-2001` | `power-threshold-break` | Power Threshold Break |
| MHA-034 | `SPX-2008` | `branching-energy-surge` | Branching Energy Surge |
| MHA-043 | `SPX-2017` | `analysis-scribble-reveal` | Analysis Scribble Reveal |
| MHA-044 | `SPX-2018` | `weakness-highlight-sweep` | Weakness Highlight Sweep |
| MHA-053 | `SPX-2027` | `training-simulation-start` | Training Simulation Start |
| MHA-056 | `SPX-2030` | `performance-meter-burst` | Performance Meter Burst |
| MHA-063 | `SPX-2037` | `versus-card-collision` | Versus Card Collision |
| MHA-064 | `SPX-2038` | `bracket-winner-advance` | Bracket Winner Advance |
| MHA-066 | `SPX-2040` | `match-start-slam` | Match Start Slam |
| MHA-075 | `SPX-2049` | `rank-promotion` | Rank Promotion |
| MHA-082 | `SPX-2056` | `incident-dispatch-card` | Incident Dispatch Card |
| MHA-083 | `SPX-2057` | `hero-assignment-transfer` | Hero Assignment Transfer |
| MHA-091 | `SPX-2065` | `emergency-screen-takeover` | Emergency Screen Takeover |
| MHA-092 | `SPX-2066` | `threat-level-escalation` | Threat Level Escalation |
| MHA-102 | `SPX-2076` | `decay-delete` | Decay Delete |
| MHA-111 | `SPX-2085` | `blueprint-assembly` | Blueprint Assembly |
| MHA-112 | `SPX-2086` | `part-compatibility-snap` | Part Compatibility Snap |

## Core first-wave

Curated implementation priority (former Top 30 Recommended First Builds). Same checkbox as the master list — checking either counts.

- [x] **MHA-001** · `SPX-1975` · **Impact Frame Slam** — manga-impact-language
- [x] **MHA-002** · `SPX-1976` · **Speed-Line Action Reveal** — manga-impact-language
- [x] **MHA-003** · `SPX-1977` · **Panel Break Transition** — manga-impact-language
- [x] **MHA-013** · `SPX-1987` · **Hero Name Slam** — hero-introduction-cards
- [x] **MHA-016** · `SPX-1990` · **Character Freeze Introduction** — hero-introduction-cards
- [x] **MHA-023** · `SPX-1997` · **Quirk Activation Burst** — quirk-activation
- [x] **MHA-026** · `SPX-2000` · **Quirk Cooldown Ring** — quirk-activation
- [x] **MHA-027** · `SPX-2001` · **Power Threshold Break** — quirk-activation
- [x] **MHA-034** · `SPX-2008` · **Branching Energy Surge** — one-for-all-style-energy-language
- [x] **MHA-043** · `SPX-2017` · **Analysis Scribble Reveal** — hero-analysis-notebook-ui
- [x] **MHA-044** · `SPX-2018` · **Weakness Highlight Sweep** — hero-analysis-notebook-ui
- [x] **MHA-053** · `SPX-2027` · **Training Simulation Start** — u-a-style-training-interface
- [x] **MHA-056** · `SPX-2030` · **Performance Meter Burst** — u-a-style-training-interface
- [x] **MHA-063** · `SPX-2037` · **Versus Card Collision** — sports-festival-tournament
- [x] **MHA-064** · `SPX-2038` · **Bracket Winner Advance** — sports-festival-tournament
- [x] **MHA-091** · `SPX-2065` · **Emergency Screen Takeover** — emergency-villain-alert-system
- [x] **MHA-092** · `SPX-2066` · **Threat Level Escalation** — emergency-villain-alert-system
- [x] **MHA-082** · `SPX-2056` · **Incident Dispatch Card** — hero-agency-dashboard
- [x] **MHA-083** · `SPX-2057` · **Hero Assignment Transfer** — hero-agency-dashboard
- [x] **MHA-102** · `SPX-2076` · **Decay Delete** — villain-corruption-motion-language
- [x] **MHA-111** · `SPX-2085` · **Blueprint Assembly** — support-course-gadget-ui
- [x] **MHA-112** · `SPX-2086` · **Part Compatibility Snap** — support-course-gadget-ui
- [ ] **MHA-128** · `SPX-2102` · **Mission Incoming** — mission-quest-language
- [ ] **MHA-129** · `SPX-2103` · **Objective Update Slash** — mission-quest-language
- [ ] **MHA-137** · `SPX-2111` · **Maximum Output Breakthrough** — plus-ultra-maximum-effort-language
- [ ] **MHA-158** · `SPX-2132` · **Ice Wipe Transition** — ice-freeze-inspired-effects
- [ ] **MHA-169** · `SPX-2143` · **Explosive Notification Burst** — explosion-inspired-effects
- [ ] **MHA-180** · `SPX-2154` · **Binding Wrap Lock** — capture-binding-effects
- [ ] **MHA-226** · `SPX-2200` · **Team Formation Snap** — team-up-cooperative-effects
- [ ] **MHA-324** · `SPX-2298` · **Angular Focus Brackets** — selection-focus

## Manga Impact Language

- [x] **MHA-001** · `SPX-1975` · **Impact Frame Slam** — a normal interface is interrupted for 180ms by oversized angular impact geometry, then resolves into a status message.
- [x] **MHA-002** · `SPX-1976` · **Speed-Line Action Reveal** — converging comic speed lines pull attention toward a newly revealed action or result.
- [x] **MHA-003** · `SPX-1977` · **Panel Break Transition** — current page fractures into irregular comic panels that move apart to reveal the next state.
- [ ] **MHA-004** · `SPX-1978` · **Diagonal Panel Wipe** — two or three hard diagonal comic planes slice across the viewport to exchange content.
- [ ] **MHA-005** · `SPX-1979` · **Manga Burst Notification** — notification erupts from a radial burst field rather than simply fading in.
- [ ] **MHA-006** · `SPX-1980` · **Impact Word Construction** — large original onomatopoeia-style lettering assembles behind an event and then retreats.
- [ ] **MHA-007** · `SPX-1981` · **Halftone Expansion** — halftone dots expand from an interaction point and become a transition mask.
- [ ] **MHA-008** · `SPX-1982` · **Ink Hatch Warning** — dense diagonal hatching rapidly establishes an error/danger region.
- [ ] **MHA-009** · `SPX-1983` · **Comic Border Snap** — a content card gains a thick irregular border on selection.
- [ ] **MHA-010** · `SPX-1984` · **Panel Stack Cascade** — several cards arrive as offset comic panels and settle into a grid.
- [ ] **MHA-011** · `SPX-1985` · **Speech-Bubble Popover** — contextual helper appears as a sharply tailed comic bubble.
- [ ] **MHA-012** · `SPX-1986` · **Caption Box Stamp** — editorial caption slams into a corner to explain a state change.

## Hero Introduction Cards

- [x] **MHA-013** · `SPX-1987` · **Hero Name Slam** — a profile/name card enters with huge typography, diagonal colour blocks, and a finite impact settle.
- [ ] **MHA-014** · `SPX-1988` · **Codename Reveal** — ordinary identity text flips/slides into a larger codename state.
- [ ] **MHA-015** · `SPX-1989` · **Stat Card Entrance** — compact profile appears while five capability bars rapidly acquire their values.
- [x] **MHA-016** · `SPX-1990` · **Character Freeze Introduction** — active content briefly freezes/desaturates while a profile card cuts across it.
- [ ] **MHA-017** · `SPX-1991` · **Profile Cutout Sweep** — abstract silhouette region slides in while metadata builds around it.
- [ ] **MHA-018** · `SPX-1992` · **Hero Rank Counter** — rank number rolls to its final value and locks with a stamp.
- [ ] **MHA-019** · `SPX-1993` · **Affiliation Ribbon** — agency/team label unfolds from behind a profile card.
- [ ] **MHA-020** · `SPX-1994` · **Quirk Label Reveal** — ability/category label appears as a secondary high-impact strip.
- [ ] **MHA-021** · `SPX-1995` · **Profile Comparison Split** — two profiles collide into a versus-style comparison.
- [ ] **MHA-022** · `SPX-1996` · **Roster Card Focus** — selected profile grows while neighbouring cards compress.

## Quirk Activation

- [x] **MHA-023** · `SPX-1997` · **Quirk Activation Burst** — a dormant control charges for 300ms, releases a finite energy burst, and becomes active.
- [ ] **MHA-024** · `SPX-1998` · **Power Channel Fill** — branching lines fill outward from a source node to indicate capability activation.
- [ ] **MHA-025** · `SPX-1999` · **Ability Ready Lock-In** — rotating/offset geometry aligns into a stable READY state.
- [x] **MHA-026** · `SPX-2000` · **Quirk Cooldown Ring** — activated ability becomes a determinate cooldown indicator and reconstructs the action when complete.
- [x] **MHA-027** · `SPX-2001` · **Power Threshold Break** — gauge crosses a configured threshold and violently but finitely changes visual state.
- [ ] **MHA-028** · `SPX-2002` · **Energy Crack Propagation** — CSS/SVG cracks branch across a card as load/power increases.
- [ ] **MHA-029** · `SPX-2003` · **Activation Pulse Chain** — one active node triggers a deterministic sequence across connected nodes.
- [ ] **MHA-030** · `SPX-2004` · **Overuse Warning** — repeated activations progressively push a meter toward an exhaustion/error state.
- [ ] **MHA-031** · `SPX-2005` · **Ability Type Morph** — one control changes geometry between power/speed/defence modes.
- [ ] **MHA-032** · `SPX-2006` · **Quirk Suppressed State** — energetic interface collapses into muted locked geometry.
- [ ] **MHA-033** · `SPX-2007` · **Power Reacquisition** — disabled capability rebuilds itself segment-by-segment.

## One-For-All-Style Energy Language

- [x] **MHA-034** · `SPX-2008` · **Branching Energy Surge** — bright angular branches travel across a surface and converge on an action.
- [ ] **MHA-035** · `SPX-2009` · **Charge Percentage Ramp** — 0→100% charge changes line density, scale and typography intensity.
- [ ] **MHA-036** · `SPX-2010` · **Full-Power Commit** — crossing 100% causes the entire control to lock into a high-energy completion state.
- [ ] **MHA-037** · `SPX-2011` · **Energy Transfer** — luminous signal visibly travels from one profile/node to another.
- [ ] **MHA-038** · `SPX-2012` · **Stored Power Accumulation** — repeated actions add persistent energy segments around a central meter.
- [ ] **MHA-039** · `SPX-2013` · **Power Release Recoil** — accumulated visual energy collapses outward after activation.
- [ ] **MHA-040** · `SPX-2014` · **Controlled Output Dial** — percentage selector changes the density of energy around its target.
- [ ] **MHA-041** · `SPX-2015` · **Residual Spark Decay** — finite residual particles/segments disappear after a major action.
- [ ] **MHA-042** · `SPX-2016` · **Power Limit Clamp** — attempting to exceed safe output produces resistance and a warning state.

## Hero Analysis / Notebook UI

- [x] **MHA-043** · `SPX-2017` · **Analysis Scribble Reveal** — structured data is rapidly annotated with arrows, circles and handwritten-style marks.
- [x] **MHA-044** · `SPX-2018` · **Weakness Highlight Sweep** — analysis pass highlights a critical region in a profile or diagram.
- [ ] **MHA-045** · `SPX-2019` · **Trait Connection Lines** — observations connect to a central subject with animated leader lines.
- [ ] **MHA-046** · `SPX-2020` · **Rapid Note Stack** — small analytical notes accumulate around a subject in deterministic order.
- [ ] **MHA-047** · `SPX-2021` · **Margin Annotation Pop** — side note appears with arrow pointing to exact UI region.
- [ ] **MHA-048** · `SPX-2022` · **Cross-Out Revision** — old hypothesis is struck through and replaced with revised analysis.
- [ ] **MHA-049** · `SPX-2023` · **Evidence Circle Draw** — hand-drawn-looking circle constructs around important content.
- [ ] **MHA-050** · `SPX-2024` · **Notebook Page Flip** — analysis surface changes through a paper/page transition.
- [ ] **MHA-051** · `SPX-2025` · **Sticky Note Layer** — temporary insight card attaches to a larger analysis surface.
- [ ] **MHA-052** · `SPX-2026` · **Sketch-to-Data Morph** — rough diagram becomes clean structured UI.

## U.A.-Style Training Interface

- [x] **MHA-053** · `SPX-2027` · **Training Simulation Start** — READY state counts down and explodes into active telemetry.
- [ ] **MHA-054** · `SPX-2028` · **Training Target Acquisition** — target cards become tracked with brackets and confidence meters.
- [ ] **MHA-055** · `SPX-2029` · **Exercise Complete Stamp** — completion state receives an oversized PASS/CLEAR-style original stamp.
- [x] **MHA-056** · `SPX-2030` · **Performance Meter Burst** — result bars race to final values and one standout metric breaks beyond the graph boundary.
- [ ] **MHA-057** · `SPX-2031` · **Scenario Card Deal** — training scenarios fan/deal onto the screen.
- [ ] **MHA-058** · `SPX-2032` · **Checkpoint Clear** — stage node fills, connector advances, next checkpoint activates.
- [ ] **MHA-059** · `SPX-2033` · **Training Failure Freeze** — simulation abruptly halts, desaturates and displays corrective telemetry.
- [ ] **MHA-060** · `SPX-2034` · **Target Destroyed Collapse** — selected target fractures into geometric debris and disappears.
- [ ] **MHA-061** · `SPX-2035` · **Recovery Interval Timer** — circular rest timer rebuilds READY state.
- [ ] **MHA-062** · `SPX-2036` · **Instructor Override** — normal training UI is displaced by a high-priority instruction strip.

## Sports Festival / Tournament

- [x] **MHA-063** · `SPX-2037` · **Versus Card Collision** — two competitor cards rush from opposite edges and collide at centre.
- [x] **MHA-064** · `SPX-2038` · **Bracket Winner Advance** — winner card physically travels along tournament connector into next round.
- [ ] **MHA-065** · `SPX-2039` · **Scoreboard Flip** — numeric score changes through mechanical/comic flip geometry.
- [x] **MHA-066** · `SPX-2040` · **Match Start Slam** — giant START treatment briefly owns the viewport then tears away.
- [ ] **MHA-067** · `SPX-2041` · **Winner Banner Breakthrough** — winner strip pushes through the scoreboard after final result.
- [ ] **MHA-068** · `SPX-2042` · **Tournament Bracket Draw** — bracket connectors construct outward from seeded competitors.
- [ ] **MHA-069** · `SPX-2043` · **Crowd Momentum Meter** — abstract excitement meter rises with event intensity.
- [ ] **MHA-070** · `SPX-2044` · **Round Indicator Wipe** — ROUND 1/2/FINAL text wipes across between stages.
- [ ] **MHA-071** · `SPX-2045` · **Elimination Strikeout** — defeated competitor is crossed/greyed while winner remains active.
- [ ] **MHA-072** · `SPX-2046` · **Photo Finish Comparison** — two result bars converge into exact time/value comparison.
- [ ] **MHA-073** · `SPX-2047` · **Medal Podium Rise** — three result cards rise to first/second/third heights.

## Pro Hero Ranking

- [ ] **MHA-074** · `SPX-2048` · **Hero Billboard Ranking Reveal** — ranked cards enter in descending order with large number ownership.
- [x] **MHA-075** · `SPX-2049` · **Rank Promotion** — profile physically moves upward through the list while displaced ranks move aside.
- [ ] **MHA-076** · `SPX-2050` · **Rank Drop** — profile loses visual prominence and descends to new slot.
- [ ] **MHA-077** · `SPX-2051` · **Top Ten Cascade** — ranked entries arrive one at a time with increasing scale toward #1.
- [ ] **MHA-078** · `SPX-2052` · **Rank Number Slam** — oversized number lands behind a profile card.
- [ ] **MHA-079** · `SPX-2053` · **New Entry Break-In** — unranked profile pushes into the ranking stack.
- [ ] **MHA-080** · `SPX-2054` · **Rank Tie Split** — shared rank expands into two equal cards.
- [ ] **MHA-081** · `SPX-2055` · **Ranking Update Ticker** — finite lower-third announces changed positions.

## Hero Agency Dashboard

- [x] **MHA-082** · `SPX-2056` · **Incident Dispatch Card** — urgent job card tears/slides into an otherwise calm dashboard.
- [x] **MHA-083** · `SPX-2057` · **Hero Assignment Transfer** — profile chip travels from available roster into an incident card.
- [ ] **MHA-084** · `SPX-2058` · **Patrol Route Draw** — route line constructs across a schematic map.
- [ ] **MHA-085** · `SPX-2059` · **Case Priority Escalation** — ordinary case card progressively gains high-priority geometry.
- [ ] **MHA-086** · `SPX-2060` · **Agency Status Board** — several hero states update through compact animated tokens.
- [ ] **MHA-087** · `SPX-2061` · **Dispatch Countdown** — response window drains toward zero then changes action state.
- [ ] **MHA-088** · `SPX-2062` · **Mission Accepted Stamp** — accepted assignment receives a finite angular stamp.
- [ ] **MHA-089** · `SPX-2063` · **Hero Return-to-Available** — completed assignment chip returns to roster.
- [ ] **MHA-090** · `SPX-2064` · **Incident Merge** — two related case cards collapse into one combined operation.

## Emergency / Villain Alert System

- [x] **MHA-091** · `SPX-2065` · **Emergency Screen Takeover** — calm interface is interrupted by diagonal red/black warning planes.
- [x] **MHA-092** · `SPX-2066` · **Threat Level Escalation** — threat meter steps through five discrete states with increasing structural intensity.
- [ ] **MHA-093** · `SPX-2067` · **Villain Attack Alert** — urgent card punches into the viewport with location/severity data.
- [ ] **MHA-094** · `SPX-2068` · **Evacuation Route Activate** — safe route constructs while unsafe regions are struck out.
- [ ] **MHA-095** · `SPX-2069` · **Lockdown Shutter** — content is progressively covered by segmented security shutters.
- [ ] **MHA-096** · `SPX-2070` · **Perimeter Breach** — boundary line fractures at a detected breach point.
- [ ] **MHA-097** · `SPX-2071` · **Emergency Broadcast Strip** — high-priority ticker forcibly replaces normal status strip.
- [ ] **MHA-098** · `SPX-2072` · **Threat Marker Acquisition** — dangerous target receives expanding angular brackets.
- [ ] **MHA-099** · `SPX-2073` · **All-Clear Reset** — warning geometry retracts and normal interface reconstructs.
- [ ] **MHA-100** · `SPX-2074` · **Civilian Count Update** — evacuation count rolls down/up with clear state semantics.
- [ ] **MHA-101** · `SPX-2075` · **Multiple Alert Stack** — incidents compress into a controlled priority stack.

## Villain / Corruption Motion Language

- [x] **MHA-102** · `SPX-2076` · **Decay Delete** — destructive action causes an element to crumble from contact point outward.
- [ ] **MHA-103** · `SPX-2077` · **Corruption Spread** — error state propagates through connected interface regions.
- [ ] **MHA-104** · `SPX-2078` · **Glitching Identity Card** — profile metadata becomes unstable before resolving into restricted state.
- [ ] **MHA-105** · `SPX-2079` · **Threat Card Intrusion** — hostile card forces existing layout apart rather than appearing politely.
- [ ] **MHA-106** · `SPX-2080` · **Blackout Sweep** — sections of interface shut down sequentially.
- [ ] **MHA-107** · `SPX-2081` · **Signal Hijack** — normal message is overwritten by hostile transmission.
- [ ] **MHA-108** · `SPX-2082` · **Fractured Button State** — disabled/destructive control visually splits along angular seams.
- [ ] **MHA-109** · `SPX-2083` · **Restricted Data Redaction** — information is aggressively redacted in a sweep.
- [ ] **MHA-110** · `SPX-2084` · **Recovered Signal Reconstruction** — corrupted blocks rebuild into usable data.

## Support Course / Gadget UI

- [x] **MHA-111** · `SPX-2085` · **Blueprint Assembly** — gadget diagram constructs from exploded components into a finished device.
- [x] **MHA-112** · `SPX-2086` · **Part Compatibility Snap** — dragged component magnetically locks into a valid slot.
- [ ] **MHA-113** · `SPX-2087` · **Prototype Boot Sequence** — several hardware subsystems initialise in deterministic order.
- [ ] **MHA-114** · `SPX-2088` · **Gadget Deployment** — compact equipment card unfolds into controls/status.
- [ ] **MHA-115** · `SPX-2089` · **Exploded Diagram Expand** — assembled object separates into labelled component layers.
- [ ] **MHA-116** · `SPX-2090` · **Calibration Reticle** — tuning controls align four markers into calibrated state.
- [ ] **MHA-117** · `SPX-2091` · **Support Item Equip** — item chip travels into a profile equipment slot.
- [ ] **MHA-118** · `SPX-2092` · **Durability Stress Meter** — usage pushes a gauge toward warning/failure.
- [ ] **MHA-119** · `SPX-2093` · **Prototype Failure Pop** — gadget test produces finite comic failure response.
- [ ] **MHA-120** · `SPX-2094` · **Repair Reconstruction** — broken component geometry reassembles after repair.

## Costume / Equipment Selection

- [ ] **MHA-121** · `SPX-2095` · **Costume Loadout Assembly** — equipment cards slide into fixed body/loadout slots.
- [ ] **MHA-122** · `SPX-2096` · **Support Item Equip Snap** — selected accessory compresses into an equipped token.
- [ ] **MHA-123** · `SPX-2097` · **Loadout Compare Split** — current and proposed equipment divide the screen for comparison.
- [ ] **MHA-124** · `SPX-2098` · **Stat Delta Burst** — changed equipment causes stat deltas to briefly burst beside affected metrics.
- [ ] **MHA-125** · `SPX-2099` · **Locked Equipment Restraint** — unavailable item resists drag and returns.
- [ ] **MHA-126** · `SPX-2100` · **Costume Variant Carousel** — variants rotate through a controlled profile frame.
- [ ] **MHA-127** · `SPX-2101` · **Equipment Remove Eject** — equipped token ejects back into inventory.

## Mission / Quest Language

- [ ] **MHA-128** · `SPX-2102` · **Mission Incoming** — mission card enters as a high-energy dispatch.
- [ ] **MHA-129** · `SPX-2103` · **Objective Update Slash** — completed objective is struck through and next objective snaps active.
- [ ] **MHA-130** · `SPX-2104` · **Mission Complete Burst** — all active telemetry collapses into one giant completion result.
- [ ] **MHA-131** · `SPX-2105` · **Objective Chain Advance** — completion energy travels down a linked sequence of tasks.
- [ ] **MHA-132** · `SPX-2106` · **Optional Objective Reveal** — hidden secondary goal unfolds after primary action.
- [ ] **MHA-133** · `SPX-2107` · **Mission Failed Freeze** — active UI freezes, desaturates and receives failure treatment.
- [ ] **MHA-134** · `SPX-2108` · **Rescue Counter Completion** — counter reaching target triggers structural completion state.
- [ ] **MHA-135** · `SPX-2109` · **Mission Briefing Pages** — objectives slide through dossier-style cards.
- [ ] **MHA-136** · `SPX-2110` · **Debrief Result Stack** — outcome cards accumulate after mission completion.

## Plus Ultra / Maximum Effort Language

- [ ] **MHA-137** · `SPX-2111` · **Maximum Output Breakthrough** — progress meter reaches nominal maximum, then physically breaks beyond its container.
- [ ] **MHA-138** · `SPX-2112` · **Beyond-Limit Completion** — success state overshoots normal completion geometry before locking.
- [ ] **MHA-139** · `SPX-2113` · **Final Push Button** — hold-to-confirm action becomes increasingly intense until commit.
- [ ] **MHA-140** · `SPX-2114` · **Overdrive Counter** — rapidly accumulating counter crosses a redline and changes mode.
- [ ] **MHA-141** · `SPX-2115` · **Limit Marker Shatter** — fixed threshold marker breaks when exceeded.
- [ ] **MHA-142** · `SPX-2116` · **Second-Wind Recovery** — failed/empty meter unexpectedly reconstructs a smaller reserve state.
- [ ] **MHA-143** · `SPX-2117` · **Maximum Effort Typography** — giant type expands behind a result then becomes a small badge.

## Smash / Impact-Inspired Software Feedback

- [ ] **MHA-144** · `SPX-2118` · **Button Impact Shockwave** — successful high-priority action sends one angular shockwave through its parent card.
- [ ] **MHA-145** · `SPX-2119` · **Card Punch-Out Delete** — removed card shoots backward/away through a comic impact aperture.
- [ ] **MHA-146** · `SPX-2120` · **Success Crater** — completion mark lands and leaves a temporary radial indentation/ring.
- [ ] **MHA-147** · `SPX-2121` · **Metric Smash Counter** — large number hits its target value with overshoot and debris-like line accents.
- [ ] **MHA-148** · `SPX-2122` · **Navigation Impact Cut** — destination change occurs on a single powerful directional strike.
- [ ] **MHA-149** · `SPX-2123` · **Error Counterblow** — invalid action produces one opposing visual force.
- [ ] **MHA-150** · `SPX-2124` · **Impact Trail Button** — pressed control leaves two or three finite directional echoes.

## Speed / Mobility Effects

- [ ] **MHA-151** · `SPX-2125` · **High-Speed Card Entry** — card arrives with elongated motion streaks that collapse into its border.
- [ ] **MHA-152** · `SPX-2126` · **Dash Navigation** — selected tab/page exits so quickly it leaves a temporary directional echo.
- [ ] **MHA-153** · `SPX-2127` · **Speedometer Acquisition** — performance dial races to measured value and settles.
- [ ] **MHA-154** · `SPX-2128` · **Afterimage Selection** — moving selection indicator leaves two fading positional echoes.
- [ ] **MHA-155** · `SPX-2129` · **Route Dash** — marker rapidly traverses a path with speed-line emphasis.
- [ ] **MHA-156** · `SPX-2130` · **Momentum Cancel** — high-speed motion visibly brakes and returns after cancelled gesture.

## Ice / Freeze-Inspired Effects

- [ ] **MHA-157** · `SPX-2131` · **Freeze Locked State** — content becomes covered by angular translucent crystalline plates.
- [ ] **MHA-158** · `SPX-2132` · **Ice Wipe Transition** — crystalline facets grow across the screen, then fracture away to reveal destination.
- [ ] **MHA-159** · `SPX-2133` · **Frozen Button Unlock** — disabled control sheds crystalline segments as it becomes available.
- [ ] **MHA-160** · `SPX-2134` · **Temperature Slider Frost** — lower values progressively accumulate edge frost.
- [ ] **MHA-161** · `SPX-2135` · **Freeze Error Containment** — dangerous content is visually immobilised behind a frozen overlay.
- [ ] **MHA-162** · `SPX-2136` · **Thaw Progress** — locked state melts/retracts according to determinate progress.

## Fire / Heat-Inspired Effects

- [ ] **MHA-163** · `SPX-2137` · **Heat Threshold Warning** — meter moves from calm to turbulent angular heat distortion at a fixed threshold.
- [ ] **MHA-164** · `SPX-2138` · **Ignition Button** — dormant control sparks once and becomes an active hot state.
- [ ] **MHA-165** · `SPX-2139` · **Heatmap Bloom** — data cells acquire intensity outward from an event.
- [ ] **MHA-166** · `SPX-2140` · **Overheat Shutdown** — active control reaches limit and collapses into cooldown.
- [ ] **MHA-167** · `SPX-2141` · **Thermal Scan Sweep** — scanner reveals temperature-coded regions.
- [ ] **MHA-168** · `SPX-2142` · **Cooldown Reconstruction** — overheated UI gradually regains normal controls.

## Explosion-Inspired Effects

- [ ] **MHA-169** · `SPX-2143` · **Explosive Notification Burst** — compact centre point expands into jagged notification card.
- [ ] **MHA-170** · `SPX-2144` · **Blast Transition** — angular fragments fly outward from a click point to reveal next state.
- [ ] **MHA-171** · `SPX-2145` · **Detonation Countdown** — segmented timer becomes increasingly compressed/intense before a finite state change.
- [ ] **MHA-172** · `SPX-2146` · **Burst Menu** — action choices explode radially from a trigger and retract.
- [ ] **MHA-173** · `SPX-2147` · **Blast Radius Selection** — selected node reveals a growing radial influence area.
- [ ] **MHA-174** · `SPX-2148` · **Smoke-Clear Reveal** — opaque abstract fragments disperse after action completion.

## Gravity / Float Effects

- [ ] **MHA-175** · `SPX-2149` · **Zero-Gravity Card Field** — cards drift within bounded positions, then snap into ordered layout on command.
- [ ] **MHA-176** · `SPX-2150` · **Float-to-Anchor** — free object acquires a destination and locks into a slot.
- [ ] **MHA-177** · `SPX-2151` · **Weight Shift Selection** — selected card visually gains mass and pushes neighbours aside.
- [ ] **MHA-178** · `SPX-2152` · **Gravity Drop Confirmation** — action token falls into a confirmation slot.
- [ ] **MHA-179** · `SPX-2153` · **Levitation Hover State** — card rises and slowly stabilises without perpetual decorative looping under reduced motion.

## Capture / Binding Effects

- [ ] **MHA-180** · `SPX-2154` · **Binding Wrap Lock** — several strips/lines rapidly wrap a card to indicate restricted state.
- [ ] **MHA-181** · `SPX-2155` · **Capture Target Snap** — targeting lines converge and immobilise a moving element.
- [ ] **MHA-182** · `SPX-2156` · **Constraint Tighten** — invalid range/input becomes visually bounded by tightening brackets.
- [ ] **MHA-183** · `SPX-2157` · **Release Unwrap** — locked content sheds constraint lines in reverse order.
- [ ] **MHA-184** · `SPX-2158` · **Multi-Target Bind** — one action connects several selected cards into a grouped state.

## Stealth / Invisibility Effects

- [ ] **MHA-185** · `SPX-2159` · **Visibility Fade Grid** — content becomes partially invisible while its structural outline remains.
- [ ] **MHA-186** · `SPX-2160` · **Stealth Mode Activate** — colourful UI collapses into sparse outline-only state.
- [ ] **MHA-187** · `SPX-2161` · **Hidden Data Reveal** — hovering/focusing causes concealed content to reconstruct from edge outlines.
- [ ] **MHA-188** · `SPX-2162` · **Cloaked Card Detection** — scanning sweep briefly reveals hidden card boundaries.
- [ ] **MHA-189** · `SPX-2163` · **Visibility Meter** — opacity and outline strength map to a scalar concealment value.

## Sound / Voice Effects

- [ ] **MHA-190** · `SPX-2164` · **Voice Command Burst** — spoken-command simulation creates radial waveform typography and resolves into an action.
- [ ] **MHA-191** · `SPX-2165` · **Sonic Alert Ring** — warning emits two finite concentric distortion rings.
- [ ] **MHA-192** · `SPX-2166` · **Volume Power Meter** — waveform amplitude fills a capability gauge.
- [ ] **MHA-193** · `SPX-2167` · **Command Accepted Echo** — text confirmation produces two directional outline echoes.
- [ ] **MHA-194** · `SPX-2168` · **Silenced State Collapse** — waveform geometry compresses to a flat line.

## Creation / Materialisation Effects

- [ ] **MHA-195** · `SPX-2169` · **Object Materialise Scan** — new UI element builds from a moving scan line.
- [ ] **MHA-196** · `SPX-2170` · **Inventory Creation** — empty slot fills through wireframe→solid transition.
- [ ] **MHA-197** · `SPX-2171` · **Blueprint-to-Object** — technical outline gains surfaces until fully assembled.
- [ ] **MHA-198** · `SPX-2172` · **Resource Consumption Meter** — creation visibly consumes a finite resource bar.
- [ ] **MHA-199** · `SPX-2173` · **Failed Creation Dissolve** — insufficient-resource object begins forming then retracts.

## Transformation Effects

- [ ] **MHA-200** · `SPX-2174` · **State Transformation Silhouette** — one card/control changes shape through a bold silhouette intermediate.
- [ ] **MHA-201** · `SPX-2175` · **Mode Shift Armour-Up** — simple UI gains additional structural layers when advanced mode activates.
- [ ] **MHA-202** · `SPX-2176` · **Transformation Progress Bands** — several horizontal regions transform in sequence.
- [ ] **MHA-203** · `SPX-2177` · **Revert Mode Strip-Off** — advanced layers peel away to return to basic state.
- [ ] **MHA-204** · `SPX-2178` · **Temporary Boost Timer** — transformed state carries a determinate expiry boundary.

## Hero Rescue / Success Feedback

- [ ] **MHA-205** · `SPX-2179` · **Rescue Complete Sweep** — danger UI clears outward and a clean success field replaces it.
- [ ] **MHA-206** · `SPX-2180` · **Civilian Secured Counter** — target count increments with finite celebratory impact.
- [ ] **MHA-207** · `SPX-2181` · **Safe Zone Acquisition** — map region changes from warning to secured state.
- [ ] **MHA-208** · `SPX-2182` · **Team Assist Chain** — several helper nodes light in sequence before completion.
- [ ] **MHA-209** · `SPX-2183` · **Recovery Card Rise** — failed/down state returns through a medical/recovery-style status card.

## School / Classroom Effects

- [ ] **MHA-210** · `SPX-2184` · **Class Roster Attendance Sweep** — roster rows acquire PRESENT states in rapid sequence.
- [ ] **MHA-211** · `SPX-2185` · **Assignment Grade Stamp** — score appears then receives a large angular grade stamp.
- [ ] **MHA-212** · `SPX-2186` · **Exam Timer Pressure** — timer transitions through calm/warning/critical structural states.
- [ ] **MHA-213** · `SPX-2187` · **Desk Card Shuffle** — roster/student cards rearrange into teams.
- [ ] **MHA-214** · `SPX-2188` · **Teacher Annotation** — feedback marks draw directly over submitted content.
- [ ] **MHA-215** · `SPX-2189` · **Class Bell Transition** — schedule card flips to next period with finite ringing-line visual.

## Internship / Work Study Effects

- [ ] **MHA-216** · `SPX-2190` · **Agency Offer Arrival** — offer card shoots into a student's profile stack.
- [ ] **MHA-217** · `SPX-2191` · **Offer Compare Fan** — multiple agency cards fan into a comparison layout.
- [ ] **MHA-218** · `SPX-2192` · **Placement Accepted Transfer** — selected offer moves into active placement slot.
- [ ] **MHA-219** · `SPX-2193` · **Mentor Assignment Link** — animated connector establishes student↔mentor relationship.
- [ ] **MHA-220** · `SPX-2194` · **Work Study Progress** — milestone chain fills as placement progresses.

## License / Certification Effects

- [ ] **MHA-221** · `SPX-2195` · **License Card Issue** — blank credential constructs through photo/data/seal stages.
- [ ] **MHA-222** · `SPX-2196` · **Exam Pass Certification** — test result folds/morphs into a persistent credential card.
- [ ] **MHA-223** · `SPX-2197` · **License Scan Verify** — scan line traverses credential and resolves into verified state.
- [ ] **MHA-224** · `SPX-2198` · **Temporary License Countdown** — credential carries determinate expiry treatment.
- [ ] **MHA-225** · `SPX-2199` · **License Suspended Lock** — credential becomes bound/redacted while retaining identity.

## Team-Up / Cooperative Effects

- [ ] **MHA-226** · `SPX-2200` · **Team Formation Snap** — individual profile cards fly into fixed formation slots.
- [ ] **MHA-227** · `SPX-2201` · **Combo Chain** — one member's completed action sends a pulse to the next.
- [ ] **MHA-228** · `SPX-2202` · **Assist Ready Indicator** — teammate card gains a compact ready state when conditions are met.
- [ ] **MHA-229** · `SPX-2203` · **Role Assignment Transfer** — role tokens move into selected team members.
- [ ] **MHA-230** · `SPX-2204` · **Team Ultimate Meter** — contributions from multiple nodes fill one shared meter.
- [ ] **MHA-231** · `SPX-2205` · **Formation Break** — team cards scatter back to individual roster positions.

## Rivalry / Versus Effects

- [ ] **MHA-232** · `SPX-2206` · **Rival Cards Clash** — two cards slam into a central diagonal divider.
- [ ] **MHA-233** · `SPX-2207` · **Stat Tug-of-War** — comparative bar dynamically claims more space for stronger side.
- [ ] **MHA-234** · `SPX-2208` · **Advantage Shift** — centre divider physically moves as comparison values change.
- [ ] **MHA-235** · `SPX-2209` · **Head-to-Head Metric Burst** — winning metric punches through comparison line.
- [ ] **MHA-236** · `SPX-2210` · **Draw Lock** — both cards snap into perfectly symmetrical tie state.

## Manga Page Navigation

- [ ] **MHA-237** · `SPX-2211` · **Panel-to-Panel Route** — selected comic panel grows into the next content state.
- [ ] **MHA-238** · `SPX-2212` · **Page Turn with Ink Reveal** — page flips while new content appears through halftone mask.
- [ ] **MHA-239** · `SPX-2213` · **Gutter Wipe** — black/white comic gutter expands until it becomes the next page boundary.
- [ ] **MHA-240** · `SPX-2214` · **Four-Panel Sequence** — four UI states advance through manga-panel rhythm.
- [ ] **MHA-241** · `SPX-2215` · **Panel Zoom Focus** — selected region enlarges while surrounding panels slide beyond frame.
- [ ] **MHA-242** · `SPX-2216` · **Margin Caption Navigation** — section labels move like editorial page captions.

## Anime Episode Language

- [ ] **MHA-243** · `SPX-2217` · **Episode Title Card Interrupt** — application state pauses for a stark finite title-card reveal.
- [ ] **MHA-244** · `SPX-2218` · **Eyecatch Transition** — short 500--900ms branded-with-original-art interstitial separates major states.
- [ ] **MHA-245** · `SPX-2219` · **Recap Flash Cards** — previous states appear in rapid stacked snapshots before current state.
- [ ] **MHA-246** · `SPX-2220` · **To-Be-Continued Freeze** — final state freezes into graphic end-card treatment.
- [ ] **MHA-247** · `SPX-2221` · **Next Objective Preview** — next workflow stage appears as a brief preview card.
- [ ] **MHA-248** · `SPX-2222` · **Commercial Break Split** — paired eyecatch cards create an intentional workflow intermission.

## Comic Typography

- [ ] **MHA-249** · `SPX-2223` · **Kinetic Headline Slam** — Kinetic Headline Slam
- [ ] **MHA-250** · `SPX-2224` · **Vertical Impact Type** — Vertical Impact Type
- [ ] **MHA-251** · `SPX-2225` · **Diagonal Warning Type** — Diagonal Warning Type
- [ ] **MHA-252** · `SPX-2226` · **Outlined Echo Typography** — Outlined Echo Typography
- [ ] **MHA-253** · `SPX-2227` · **Halftone Text Fill** — Halftone Text Fill
- [ ] **MHA-254** · `SPX-2228` · **Letter-by-Letter Impact Cascade** — Letter-by-Letter Impact Cascade
- [ ] **MHA-255** · `SPX-2229` · **Type Stretch on Velocity** — Type Stretch on Velocity
- [ ] **MHA-256** · `SPX-2230` · **Speech Bubble Text Burst** — Speech Bubble Text Burst
- [ ] **MHA-257** · `SPX-2231` · **Caption Strip Typewriter** — Caption Strip Typewriter
- [ ] **MHA-258** · `SPX-2232` · **Handwritten Annotation Draw** — Handwritten Annotation Draw

## Loading States

- [ ] **MHA-259** · `SPX-2233` · **Hero Analysis Loader** — annotations rapidly inspect placeholder content until data resolves.
- [ ] **MHA-260** · `SPX-2234` · **Training Simulation Loader** — subsystem checks light in sequence then reveal scenario.
- [ ] **MHA-261** · `SPX-2235` · **Energy Charge Loader** — determinate charge lines converge toward completion.
- [ ] **MHA-262** · `SPX-2236` · **Support Gadget Boot Loader** — modules initialise one by one.
- [ ] **MHA-263** · `SPX-2237` · **Mission Dispatch Loader** — route/target/hero assignment stages resolve sequentially.
- [ ] **MHA-264** · `SPX-2238` · **Manga Panel Skeleton** — placeholder panels fill in reading order.

## Notifications

- [ ] **MHA-265** · `SPX-2239` · **Hero Alert Card Slam** — Hero Alert Card Slam
- [ ] **MHA-266** · `SPX-2240` · **Mission Update Strip** — Mission Update Strip
- [ ] **MHA-267** · `SPX-2241` · **Emergency Warning Takeover** — Emergency Warning Takeover
- [ ] **MHA-268** · `SPX-2242` · **Achievement Rank-Up Burst** — Achievement Rank-Up Burst
- [ ] **MHA-269** · `SPX-2243` · **Training Result Toast** — Training Result Toast
- [ ] **MHA-270** · `SPX-2244` · **Agency Message Ribbon** — Agency Message Ribbon
- [ ] **MHA-271** · `SPX-2245` · **Support Item Ready Notification** — Support Item Ready Notification
- [ ] **MHA-272** · `SPX-2246` · **Class Announcement Caption** — Class Announcement Caption
- [ ] **MHA-273** · `SPX-2247` · **Low-Priority Side Bubble** — Low-Priority Side Bubble

## Progress & Completion

- [ ] **MHA-274** · `SPX-2248` · **Plus-Threshold Progress Break** — Plus-Threshold Progress Break
- [ ] **MHA-275** · `SPX-2249` · **Objective Chain Completion** — Objective Chain Completion
- [ ] **MHA-276** · `SPX-2250` · **Training Score Tally** — Training Score Tally
- [ ] **MHA-277** · `SPX-2251` · **Hero Rank Promotion** — Hero Rank Promotion
- [ ] **MHA-278** · `SPX-2252` · **License Earned Transform** — License Earned Transform
- [ ] **MHA-279** · `SPX-2253` · **Rescue Counter Completion** — Rescue Counter Completion
- [ ] **MHA-280** · `SPX-2254` · **Mission Debrief Tally** — Mission Debrief Tally
- [ ] **MHA-281** · `SPX-2255` · **Power Cooldown Reconstruction** — Power Cooldown Reconstruction
- [ ] **MHA-282** · `SPX-2256` · **Study Progress Notebook Fill** — Study Progress Notebook Fill

## Errors & Locked States

- [ ] **MHA-283** · `SPX-2257` · **Quirk Overuse Error** — Quirk Overuse Error
- [ ] **MHA-284** · `SPX-2258` · **Emergency Lockdown** — Emergency Lockdown
- [ ] **MHA-285** · `SPX-2259` · **Training Failure Freeze** — Training Failure Freeze
- [ ] **MHA-286** · `SPX-2260` · **Decay Delete Confirmation** — Decay Delete Confirmation
- [ ] **MHA-287** · `SPX-2261` · **Support Item Malfunction** — Support Item Malfunction
- [ ] **MHA-288** · `SPX-2262` · **Insufficient Power Clamp** — Insufficient Power Clamp
- [ ] **MHA-289** · `SPX-2263` · **Restricted Hero Data** — Restricted Hero Data
- [ ] **MHA-290** · `SPX-2264` · **License Required Barrier** — License Required Barrier
- [ ] **MHA-291** · `SPX-2265` · **Unavailable Mission Restraint** — Unavailable Mission Restraint

## Buttons & Controls

- [ ] **MHA-292** · `SPX-2266` · **Impact Press Button** — press compresses control and releases a finite comic shock.
- [ ] **MHA-293** · `SPX-2267` · **Hold-to-Maximum Button** — sustained press fills energy around boundary before commit.
- [ ] **MHA-294** · `SPX-2268` · **Quirk Toggle** — switch changes from dormant to energised structural state.
- [ ] **MHA-295** · `SPX-2269` · **Hero Selector Pill** — shared selected backing moves between profiles.
- [ ] **MHA-296** · `SPX-2270` · **Training Difficulty Dial** — rotary control changes intensity bands.
- [ ] **MHA-297** · `SPX-2271` · **Support Gadget Slider** — slider acquires calibration markers.
- [ ] **MHA-298** · `SPX-2272` · **Emergency Confirm Guard** — destructive action requires two-stage activation.

## Cards

- [ ] **MHA-299** · `SPX-2273` · **Hero Profile Card** — Hero Profile Card
- [ ] **MHA-300** · `SPX-2274` · **Quirk Analysis Card** — Quirk Analysis Card
- [ ] **MHA-301** · `SPX-2275` · **Mission Dispatch Card** — Mission Dispatch Card
- [ ] **MHA-302** · `SPX-2276` · **Tournament Competitor Card** — Tournament Competitor Card
- [ ] **MHA-303** · `SPX-2277` · **Emergency Incident Card** — Emergency Incident Card
- [ ] **MHA-304** · `SPX-2278` · **Support Gadget Card** — Support Gadget Card
- [ ] **MHA-305** · `SPX-2279` · **Training Scenario Card** — Training Scenario Card
- [ ] **MHA-306** · `SPX-2280` · **License Credential Card** — License Credential Card
- [ ] **MHA-307** · `SPX-2281` · **Class Roster Card** — Class Roster Card
- [ ] **MHA-308** · `SPX-2282` · **Agency Offer Card** — Each should have a distinct entrance/selection/completion primitive rather than merely different decoration.

## Data Visualisation

- [ ] **MHA-309** · `SPX-2283` · **Quirk Capability Radar Build** — radar polygon draws to fixed values.
- [ ] **MHA-310** · `SPX-2284` · **Hero Stat Bars Impact Fill** — bars hit final values with staggered force.
- [ ] **MHA-311** · `SPX-2285` · **Threat Map Propagation** — incident intensity spreads across schematic regions.
- [ ] **MHA-312** · `SPX-2286` · **Training Performance Timeline** — events punch into a running performance line.
- [ ] **MHA-313** · `SPX-2287` · **Power Output Graph Redline** — line crosses a safe boundary and changes state.
- [ ] **MHA-314** · `SPX-2288` · **Team Contribution Ring** — several profiles contribute segments to one total.
- [ ] **MHA-315** · `SPX-2289` · **Rank History Ladder** — profile moves through historical rank positions.

## Map / Patrol Effects

- [ ] **MHA-316** · `SPX-2290` · **Patrol Route Draw** — Patrol Route Draw
- [ ] **MHA-317** · `SPX-2291` · **Incident Marker Slam** — Incident Marker Slam
- [ ] **MHA-318** · `SPX-2292` · **Hero Dispatch Travel** — Hero Dispatch Travel
- [ ] **MHA-319** · `SPX-2293` · **Safe Zone Expansion** — Safe Zone Expansion
- [ ] **MHA-320** · `SPX-2294` · **Threat Radius Pulse** — Threat Radius Pulse
- [ ] **MHA-321** · `SPX-2295` · **Evacuation Route Replan** — Evacuation Route Replan
- [ ] **MHA-322** · `SPX-2296` · **Multiple Hero Convergence** — Multiple Hero Convergence
- [ ] **MHA-323** · `SPX-2297` · **Patrol Complete Trace Fade** — Patrol Complete Trace Fade

## Selection / Focus

- [ ] **MHA-324** · `SPX-2298` · **Angular Focus Brackets** — four comic brackets snap around selected content.
- [ ] **MHA-325** · `SPX-2299` · **Hero Card Spotlight** — selection pushes neighbouring cards into halftone background.
- [ ] **MHA-326** · `SPX-2300` · **Target Lock Reticle** — brackets converge into stable selected state.
- [ ] **MHA-327** · `SPX-2301` · **Notebook Circle Selection** — rough circular mark draws around chosen item.
- [ ] **MHA-328** · `SPX-2302` · **Tournament Focus Beam** — selected competitor receives strong directional lines.
- [ ] **MHA-329** · `SPX-2303` · **Roster Multi-Select Formation** — selected cards shift into grouped arrangement.

## Drag & Drop

- [ ] **MHA-330** · `SPX-2304` · **Hero Assignment Drag** — profile card becomes a compact dispatch proxy.
- [ ] **MHA-331** · `SPX-2305` · **Support Item Equip Drag** — equipment proxy snaps into valid slot.
- [ ] **MHA-332** · `SPX-2306` · **Team Formation Drag** — hero cards create formation gaps.
- [ ] **MHA-333** · `SPX-2307` · **Training Target Reorder** — Training Target Reorder
- [ ] **MHA-334** · `SPX-2308` · **Mission Priority Reorder** — Mission Priority Reorder
- [ ] **MHA-335** · `SPX-2309` · **Invalid Quirk Match Recoil** — Invalid Quirk Match Recoil
- [ ] **MHA-336** · `SPX-2310` · **Notebook Evidence Pin** — Notebook Evidence Pin

## Reduced-Motion-Friendly Static Effects

- [ ] **MHA-337** · `SPX-2311` · **Static Impact Frame** — Static Impact Frame
- [ ] **MHA-338** · `SPX-2312` · **Static Speed-Line Focus** — Static Speed-Line Focus
- [ ] **MHA-339** · `SPX-2313` · **Static Quirk Energy Boundary** — Static Quirk Energy Boundary
- [ ] **MHA-340** · `SPX-2314` · **Static Emergency Takeover** — Static Emergency Takeover
- [ ] **MHA-341** · `SPX-2315` · **Static Halftone Selection** — Static Halftone Selection
- [ ] **MHA-342** · `SPX-2316` · **Static Tournament Versus** — Static Tournament Versus
- [ ] **MHA-343** · `SPX-2317` · **Static Analysis Annotation** — Static Analysis Annotation
- [ ] **MHA-344** · `SPX-2318` · **Static Threat Brackets** — Static Threat Brackets

## Tiny Microinteractions

- [ ] **MHA-345** · `SPX-2319` · **Stat Increment Punch** — Stat Increment Punch
- [ ] **MHA-346** · `SPX-2320` · **Rank Number Flip** — Rank Number Flip
- [ ] **MHA-347** · `SPX-2321` · **Objective Check Slash** — Objective Check Slash
- [ ] **MHA-348** · `SPX-2322` · **Quirk Ready Spark** — Quirk Ready Spark
- [ ] **MHA-349** · `SPX-2323` · **Cooldown Complete Snap** — Cooldown Complete Snap
- [ ] **MHA-350** · `SPX-2324` · **Hero Available Tick** — Hero Available Tick
- [ ] **MHA-351** · `SPX-2325` · **Threat Level Step** — Threat Level Step
- [ ] **MHA-352** · `SPX-2326` · **Evidence Circle Draw** — Evidence Circle Draw
- [ ] **MHA-353** · `SPX-2327` · **Gadget Equipped Click** — Gadget Equipped Click
- [ ] **MHA-354** · `SPX-2328` · **Mission Accepted Stamp** — Mission Accepted Stamp
- [ ] **MHA-355** · `SPX-2329` · **Roster Badge Arrival** — Roster Badge Arrival
- [ ] **MHA-356** · `SPX-2330` · **Training Timer Tick** — Training Timer Tick
- [ ] **MHA-357** · `SPX-2331` · **Support Part Snap** — Support Part Snap
- [ ] **MHA-358** · `SPX-2332` · **Safe Zone Check** — Safe Zone Check

## Full-Viewport Transitions

- [ ] **MHA-359** · `SPX-2333` · **Comic Panel Break** — Comic Panel Break
- [ ] **MHA-360** · `SPX-2334` · **Diagonal Hero Wipe** — Diagonal Hero Wipe
- [ ] **MHA-361** · `SPX-2335` · **Emergency Alert Takeover** — Emergency Alert Takeover
- [ ] **MHA-362** · `SPX-2336` · **Energy Branch Transition** — Energy Branch Transition
- [ ] **MHA-363** · `SPX-2337` · **Halftone Burst Reveal** — Halftone Burst Reveal
- [ ] **MHA-364** · `SPX-2338` · **Ice Facet Transition** — Ice Facet Transition
- [ ] **MHA-365** · `SPX-2339` · **Explosion Fragment Transition** — Explosion Fragment Transition
- [ ] **MHA-366** · `SPX-2340` · **Notebook Page Flip** — Notebook Page Flip
- [ ] **MHA-367** · `SPX-2341` · **Speed-Line Tunnel** — Speed-Line Tunnel
- [ ] **MHA-368** · `SPX-2342` · **Blackout-to-Recovery** — Blackout-to-Recovery
- [ ] **MHA-369** · `SPX-2343` · **Broadcast Signal Interruption** — Broadcast Signal Interruption

---

## Notes for specimen implementation

- Prefer HTML + CSS; tiny deterministic JS only when interaction requires it.
- iframe-safe: no parent access, storage, network, or native APIs.
- Freeze colours, durations, geometry, and thresholds in the contract.
- Honour `prefers-reduced-motion` and `data-force-reduced-motion`.
- Keep inspiration conceptual. Original icons/silhouettes/copy — no anime frames, manga panels, character likenesses, U.A. insignia, costumes, or title logos.
- Every burst, line, panel, or slam should explain **what changed in the software**.
