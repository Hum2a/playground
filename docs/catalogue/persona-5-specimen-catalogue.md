# Persona 5 Specimen Checklist

> Working backlog for portable motion/UI artifacts inspired by Persona 5. Interaction primitives, not game replicas. Avoid copyrighted character art, logos, extracted assets, audio, and proprietary fonts.

## How to use

- **P5-NNN** — stable catalogue id (this list).
- **SPX-NNN** — specimen registry ref. Existing shipped effects keep their live refs; everything else is pre-assigned from the next free number after `SPX-014` (`SPX-015`…`SPX-312`). Non-catalogue specimens use `SPX-313+`.
- Mark **`[x]`** only when the specimen is registered in `src/specimens/index.ts` with a real `ref` (not `SPX-TODO`) and verified. Agents must update this file in the same change — see `.cursor/rules/37_persona-catalogue.mdc`.
- Progress: **18 / 301** complete.

| Status | Count |
| --- | --- |
| Done | 18 |
| Open | 283 |

## Shipped (mapped to live specimens)

| P5 | SPX | Specimen id | Title |
| --- | --- | --- | --- |
| P5-001 | `SPX-003` | `calling-card-slam` | Calling Card Slam |
| P5-002 | `SPX-012` | `calling-card-peel` | Calling Card Peel |
| P5-013 | `SPX-002` | `comic-panel-wipe` | Comic Panel Wipe |
| P5-031 | `SPX-042` | `letter-scatter-assemble` | Letter Scatter Assemble |
| P5-045 | `SPX-056` | `crooked-menu-stack` | Crooked Menu Stack |
| P5-093 | `SPX-104` | `manga-cut-in-notification` | Manga Cut-In Notification |
| P5-122 | `SPX-133` | `redacted-content-lock` | Redacted Content Lock |
| P5-165 | `SPX-176` | `comic-card-selection` | Comic Card Selection |
| P5-185 | `SPX-196` | `decision-showdown` | Decision Showdown |
| P5-201 | `SPX-212` | `comic-panel-scroll-reveal` | Comic Panel Scroll Reveal |
| P5-044 | `SPX-055` | `cross-out-replacement` | Cross-Out Replacement |
| P5-034 | `SPX-045` | `print-registration-hover` | Print Registration Hover |
| P5-293 | `SPX-304` | `day-change-tear` | Day Change Tear |
| P5-057 | `SPX-068` | `hover-cutout` | Hover Cutout |
| P5-115 | `SPX-126` | `blackout-loader` | Blackout Loader |
| P5-268 | `SPX-279` | `cross-out-status-swap` | Cross-Out Status Swap |
| P5-156 | `SPX-167` | `progress-milestone-breakthrough` | Progress Milestone Breakthrough |
| P5-294 | `SPX-305` | `deadline-panic` | Deadline Panic |

## Core first-wave

Curated implementation priority. Same checkbox as the master list — checking either counts.

- [x] **P5-001** · `SPX-003` · **Calling Card Slam** — announcement
- [ ] **P5-004** · `SPX-016` · **Paper Rip Unlock** — reveal
- [ ] **P5-009** · `SPX-021` · **Red Stamp Unlock** — status
- [x] **P5-013** · `SPX-002` · **Comic Panel Wipe** — navigation
- [ ] **P5-014** · `SPX-025` · **Panel Collapse Navigation** — navigation
- [ ] **P5-015** · `SPX-026` · **Panel Explosion Reveal** — reveal
- [ ] **P5-029** · `SPX-040` · **Typographic Impact** — emphasis
- [x] **P5-044** · `SPX-055` · **Cross-Out Replacement** — value change
- [x] **P5-045** · `SPX-056` · **Crooked Menu Stack** — navigation
- [ ] **P5-046** · `SPX-057` · **Radial Command Snap** — selection
- [ ] **P5-065** · `SPX-076` · **Graphic Burst Hover** — hover
- [ ] **P5-082** · `SPX-093` · **Hold-to-Charge Button** — confirmation
- [x] **P5-093** · `SPX-104` · **Manga Cut-In Notification** — notification
- [x] **P5-122** · `SPX-133` · **Redacted Content Lock** — locked state
- [ ] **P5-123** · `SPX-134` · **Calling Card Lock** — locked state
- [ ] **P5-133** · `SPX-144` · **Input Focus Attack** — form
- [ ] **P5-145** · `SPX-156` · **Confidant Rank Up** — progression
- [ ] **P5-146** · `SPX-157` · **XP Counter Slam** — progression
- [x] **P5-165** · `SPX-176` · **Comic Card Selection** — cards
- [ ] **P5-177** · `SPX-188` · **Jagged Speech Tooltip** — tooltip
- [x] **P5-185** · `SPX-196` · **Decision Showdown** — confirmation
- [x] **P5-201** · `SPX-212` · **Comic Panel Scroll Reveal** — scroll
- [ ] **P5-221** · `SPX-232` · **Overlapping Newspaper Tabs** — tabs
- [ ] **P5-233** · `SPX-244` · **Filter Slash** — filtering
- [ ] **P5-301** · `SPX-312` · **Graphic Finisher Completion** — major completion

## Calling cards, paper and print

- [x] **P5-001** · `SPX-003` · **Calling Card Slam** — Crooked paper announcement violently lands over content.
- [x] **P5-002** · `SPX-012` · **Calling Card Peel** — Corner curls upward before card tears away.
- [ ] **P5-003** · `SPX-015` · **Ransom Note Reveal** — Individual cut-paper words snap into place.
- [ ] **P5-004** · `SPX-016` · **Paper Rip Unlock** — Locked paper covering splits down the middle. · scaffold `paper-rip-unlock`
- [ ] **P5-005** · `SPX-017` · **Torn Edge Drawer** — Side drawer enters with an irregular ripped-paper edge.
- [ ] **P5-006** · `SPX-018` · **Newspaper Headline Drop** — Giant headline strip drops over content. · scaffold `newspaper-headline-drop`
- [ ] **P5-007** · `SPX-019` · **Misprint Notification** — CMYK-ish offset layers snap into registration. · scaffold `misprint-notification`
- [ ] **P5-008** · `SPX-020` · **Paper Stack Shuffle** — Several sheets rapidly shuffle before settling on selected one.
- [ ] **P5-009** · `SPX-021` · **Red Stamp Unlock** — Giant angular `UNLOCKED` stamp smashes onto a card.
- [ ] **P5-010** · `SPX-022` · **Stamped Approval** — Circular approval mark rotates and impacts into place.
- [ ] **P5-011** · `SPX-023` · **Paper Scrap Tooltip** — Tiny irregular paper scrap unfolds beside hovered content.
- [ ] **P5-012** · `SPX-024` · **Torn Label Badge** — Badge appears by ripping outward from its centre.

## Comic-book geometry

- [x] **P5-013** · `SPX-002` · **Comic Panel Wipe** — Multi-direction page transition.
- [ ] **P5-014** · `SPX-025` · **Panel Collapse Navigation** — Current content gets crushed between closing comic panels.
- [ ] **P5-015** · `SPX-026` · **Panel Explosion Reveal** — One rectangle fractures into five panels that fly outward.
- [ ] **P5-016** · `SPX-027` · **Manga Grid Shuffle** — Grid cells rapidly resize to highlight selection.
- [ ] **P5-017** · `SPX-028` · **Diagonal Panel Accordion** — Stacked diagonal panels expand/collapse on selection.
- [ ] **P5-018** · `SPX-029` · **Panel Punch-In** — Selected card rapidly expands while neighbours are pushed away.
- [ ] **P5-019** · `SPX-030` · **Comic Iris** — Jagged polygon closes around focal content.
- [ ] **P5-020** · `SPX-031` · **Split-Panel Compare** — Diagonal divider snaps between two states.
- [ ] **P5-021** · `SPX-032` · **Panel Cascade** — Black/red panels enter sequentially from top-left.
- [ ] **P5-022** · `SPX-033` · **Broken Grid Loading** — Irregular panels sequentially fill during loading.
- [ ] **P5-023** · `SPX-034` · **Panel Swap Hover** — Hover changes which overlapping panel owns foreground.
- [ ] **P5-024** · `SPX-035` · **Panel Stack Menu** — Navigation items physically overlap and reorder.
- [ ] **P5-025** · `SPX-036` · **Comic Panel Skeleton** — Loading placeholders appear as angular comic cells.
- [ ] **P5-026** · `SPX-037` · **Panel Crack Error** — Container visually fractures when validation fails.
- [ ] **P5-027** · `SPX-038` · **Panel Fold Transition** — Screen appears divided into folded graphic segments.
- [ ] **P5-028** · `SPX-039` · **Corner Attack Transition** — Four angular panels attack simultaneously from corners.

## Typography behaving badly

- [ ] **P5-029** · `SPX-040` · **Typographic Impact** — Giant word slams behind foreground content.
- [ ] **P5-030** · `SPX-041` · **Crooked Heading Entrance** — Heading pieces arrive at different rotations.
- [x] **P5-031** · `SPX-042` · **Letter Scatter Assemble** — Individual letters fly in and snap into a word.
- [ ] **P5-032** · `SPX-043` · **Headline Overshoot** — Huge heading flies past position then recoils.
- [ ] **P5-033** · `SPX-044` · **Text Slice Reveal** — Horizontal slices reveal different parts of a heading.
- [x] **P5-034** · `SPX-045` · **Print Registration Hover** — Red/black duplicates separate on hover.
- [ ] **P5-035** · `SPX-046` · **Word Collision** — Two words enter from opposite sides and collide.
- [ ] **P5-036** · `SPX-047` · **Rotating Microtype Ring** — Tiny repeated text orbits an icon.
- [ ] **P5-037** · `SPX-048` · **Diagonal Microtype Rail** — Repeating tiny copy continuously traverses a diagonal line.
- [ ] **P5-038** · `SPX-049` · **Text Crush Transition** — Word compresses horizontally to zero before state change.
- [ ] **P5-039** · `SPX-050` · **Counter Slam** — Number punches upward when incremented.
- [ ] **P5-040** · `SPX-051` · **Oversized Clipped Label** — Giant background label changes with selection.
- [ ] **P5-041** · `SPX-052` · **Scrambled Heading Resolve** — Decorative letter fragments resolve into readable text.
- [ ] **P5-042** · `SPX-053` · **Word Stack Shuffle** — Alternative labels rapidly slide over one another.
- [ ] **P5-043** · `SPX-054` · **Impact Underline** — Thick irregular underline shoots underneath selected text.
- [x] **P5-044** · `SPX-055` · **Cross-Out Replacement** — Old value gets aggressively struck out and replaced.

## Menu and navigation interactions

- [x] **P5-045** · `SPX-056` · **Crooked Menu Stack** — Menu options overlap and selected item jumps forward.
- [ ] **P5-046** · `SPX-057` · **Radial Command Snap** — Commands rotate/snap around a focal point.
- [ ] **P5-047** · `SPX-058` · **Menu Punch Forward** — Selected option scales/rotates toward viewer.
- [ ] **P5-048** · `SPX-059` · **Selection Slash** — Red slash shoots behind newly selected option.
- [ ] **P5-049** · `SPX-060` · **Jagged Selection Plate** — Irregular background polygon morphs between items.
- [ ] **P5-050** · `SPX-061` · **Menu Compression** — Unselected options squash while active option expands.
- [ ] **P5-051** · `SPX-062` · **Opposing Rail Selector** — Two graphic rails converge around selected item.
- [ ] **P5-052** · `SPX-063` · **Numbered Index Snap** — Huge `01 / 02 / 03` changes behind menu.
- [ ] **P5-053** · `SPX-064` · **Menu Shuffle** — Options physically reorder when selection changes.
- [ ] **P5-054** · `SPX-065` · **Corner Label Navigation** — Current section label attacks from viewport corner.
- [ ] **P5-055** · `SPX-066` · **Exploding Submenu** — Child actions burst radially from selected option.
- [ ] **P5-056** · `SPX-067` · **Diagonal Tab Switcher** — Tabs overlap like cut pieces of card.
- [x] **P5-057** · `SPX-068` · **Hover Cutout** — Hovered menu item punches a white hole through black backing.
- [ ] **P5-058** · `SPX-069` · **Reverse Highlight** — Entire region turns black except selected item's white cutout.
- [ ] **P5-059** · `SPX-070` · **Arrow Barrage Selector** — Several tiny arrows converge on current selection.
- [ ] **P5-060** · `SPX-071` · **Cursor Chase** — Angular cursor rapidly catches newly selected item.
- [ ] **P5-061** · `SPX-072` · **Menu Exit Scatter** — Options leave in different directions on confirmation.
- [ ] **P5-062** · `SPX-073` · **Back Navigation Recoil** — Current menu violently retracts to reveal parent.
- [ ] **P5-063** · `SPX-074` · **Selection Shockwave** — Confirmation sends angular ring through menu.
- [ ] **P5-064** · `SPX-075` · **Action Lock Slash** — Disabled option gets crossed by animated graphic bars.

## Hover specimens

- [ ] **P5-065** · `SPX-076` · **Graphic Burst Hover** — Black/red shards explode behind hovered CTA.
- [ ] **P5-066** · `SPX-077` · **Cutout Hover** — White polygon cuts through black background.
- [ ] **P5-067** · `SPX-078` · **Misregistration Hover** — RGB/print layers separate slightly.
- [ ] **P5-068** · `SPX-079` · **Skew Kick Hover** — Element sharply rotates 2–3° and translates.
- [ ] **P5-069** · `SPX-080` · **Underline Attack** — Thick line attacks text from opposite direction.
- [ ] **P5-070** · `SPX-081` · **Corner Bite Hover** — Polygon appears to bite corner from card.
- [ ] **P5-071** · `SPX-082` · **Microtype Hover Rail** — Tiny repeated copy starts moving behind item.
- [ ] **P5-072** · `SPX-083` · **Arrow Swarm Hover** — Tiny arrows appear around target.
- [ ] **P5-073** · `SPX-084` · **Blackout Hover** — Background suddenly floods black around item.
- [ ] **P5-074** · `SPX-085` · **Label Ejection Hover** — Small secondary label shoots from side.
- [ ] **P5-075** · `SPX-086` · **Comic Shadow Hover** — Hard offset backing separates dramatically.
- [ ] **P5-076** · `SPX-087` · **Card Tilt Snap** — Card instantly changes angle rather than smoothly tilting.
- [ ] **P5-077** · `SPX-088` · **Slash Reveal Hover** — Diagonal slash reveals secondary text.
- [ ] **P5-078** · `SPX-089` · **Inverse Flash Hover** — Colours briefly invert on entry.
- [ ] **P5-079** · `SPX-090` · **Jagged Border Hover** — Rectangular border becomes irregular polygon.
- [ ] **P5-080** · `SPX-091` · **Foreground Theft** — Hovered card violently jumps above overlapping siblings.

## Buttons and CTAs

- [ ] **P5-081** · `SPX-092` · **Confirm Impact Button** — Confirmation produces graphic shockwave.
- [ ] **P5-082** · `SPX-093` · **Hold-to-Charge Button** — Black/red graphic fills irregularly while held.
- [ ] **P5-083** · `SPX-094` · **Button Tear Open** — CTA splits apart after successful click.
- [ ] **P5-084** · `SPX-095` · **Cancel Slash** — Cancel action gets physically crossed out.
- [ ] **P5-085** · `SPX-096` · **Submit Stamp** — Successful submit stamps itself.
- [ ] **P5-086** · `SPX-097` · **Button Compression** — Button squashes before firing action.
- [ ] **P5-087** · `SPX-098` · **Arrow Launch Button** — Arrow exits button and pulls label after it.
- [ ] **P5-088** · `SPX-099` · **Impact Ripple Button** — Polygon shockwave instead of circular Material ripple.
- [ ] **P5-089** · `SPX-100` · **Double-Layer Button** — Foreground and backing temporarily separate on press.
- [ ] **P5-090** · `SPX-101` · **Decision Split Button** — YES/NO physically pull away from each other.
- [ ] **P5-091** · `SPX-102` · **Danger Confirmation Crack** — Button surface cracks before destructive confirmation.
- [ ] **P5-092** · `SPX-103` · **CTA Microtype Conveyor** — Repeating action text moves underneath main label.

## Notifications and alerts

- [x] **P5-093** · `SPX-104` · **Manga Cut-In Notification** — Thin horizontal graphic strip opens across screen.
- [ ] **P5-094** · `SPX-105` · **Breaking News Strip** — Crooked newspaper strip interrupts viewport.
- [ ] **P5-095** · `SPX-106` · **Corner Attack Toast** — Toast flies diagonally from corner.
- [ ] **P5-096** · `SPX-107` · **Impact Badge** — Tiny notification count lands with graphic explosion.
- [ ] **P5-097** · `SPX-108` · **Urgent Slash Alert** — Red slash crosses screen before alert appears.
- [ ] **P5-098** · `SPX-109` · **Speech Burst Toast** — Jagged speech bubble expands from notification origin.
- [ ] **P5-099** · `SPX-110` · **Stacked Alert Cards** — Multiple notifications physically pile up.
- [ ] **P5-100** · `SPX-111` · **Notification Ejection** — Dismissed toast gets violently kicked sideways.
- [ ] **P5-101** · `SPX-112` · **Priority Blackout** — Background briefly blacks out around critical alert.
- [ ] **P5-102** · `SPX-113` · **Alert Headline** — Giant background word accompanies small readable notification.
- [ ] **P5-103** · `SPX-114` · **Corner Newspaper Peel** — Notification unfolds from page corner.
- [ ] **P5-104** · `SPX-115` · **Redacted Notification** — Black bars retract to reveal message.
- [ ] **P5-105** · `SPX-116` · **Incoming Message Slice** — Horizontal slit expands into message.
- [ ] **P5-106** · `SPX-117` · **Warning Crosshair** — Graphic markers converge around problematic component.
- [ ] **P5-107** · `SPX-118` · **Notification Stampede** — Multiple tiny labels rapidly arrive then consolidate.

## Loading

- [ ] **P5-108** · `SPX-119` · **Take Your Time Loader** — Crooked repeating microtype gently traverses screen.
- [ ] **P5-109** · `SPX-120` · **Running Silhouette Loader** — Abstract figure/icon travels along bottom rail.
- [ ] **P5-110** · `SPX-121` · **Newspaper Print Loader** — Black regions progressively print onto page.
- [ ] **P5-111** · `SPX-122` · **Panel Fill Loader** — Comic cells fill sequentially.
- [ ] **P5-112** · `SPX-123` · **Slash Progress** — Diagonal bars accumulate rather than horizontal bar.
- [ ] **P5-113** · `SPX-124` · **Ransom Letter Loader** — `LOADING` letters arrive individually.
- [ ] **P5-114** · `SPX-125` · **Rotating Headline Loader** — Loading words rotate around centre.
- [x] **P5-115** · `SPX-126` · **Blackout Loader** — Irregular black shape slowly consumes surface.
- [ ] **P5-116** · `SPX-127` · **Microtype Conveyor Loader** — Tiny status words move along rails.
- [ ] **P5-117** · `SPX-128` · **Ink Registration Loader** — Layers progressively align as progress reaches 100%.
- [ ] **P5-118** · `SPX-129` · **Page Flip Loader** — Tiny paper scraps flip through statuses.
- [ ] **P5-119** · `SPX-130` · **Comic Dot Loader** — Irregular halftone field grows/shrinks.
- [ ] **P5-120** · `SPX-131` · **Cutout Progress** — Progress revealed as white hole through black polygon.

## Locked / disabled / coming soon

- [ ] **P5-121** · `SPX-132` · **Phantom Graffiti Lock** — Animated painted slash covers unavailable content.
- [x] **P5-122** · `SPX-133` · **Redacted Content Lock** — Black censor bars aggressively conceal card.
- [ ] **P5-123** · `SPX-134` · **Calling Card Lock** — Paper notice pinned diagonally over content.
- [ ] **P5-124** · `SPX-135` · **Crossed-Out Card** — Two giant irregular strokes form X.
- [ ] **P5-125** · `SPX-136` · **Restricted Newspaper** — Newspaper clipping overlays inaccessible area.
- [ ] **P5-126** · `SPX-137` · **Blackout Lock** — Black polygon consumes most content except label.
- [ ] **P5-127** · `SPX-138` · **Warning Microtype Lock** — Repeating warning text wraps around card perimeter.
- [ ] **P5-128** · `SPX-139` · **Shredded Preview Lock** — Content visible only through narrow irregular strips.
- [ ] **P5-129** · `SPX-140` · **Classified Stamp Lock** — Giant stamped restriction mark.
- [ ] **P5-130** · `SPX-141` · **Cutout Keyhole Lock** — Content visible through changing polygon aperture.
- [ ] **P5-131** · `SPX-142` · **Interrupted Card** — Graphic panel physically blocks CTA.
- [ ] **P5-132** · `SPX-143` · **Locked Menu Strike** — Selecting disabled item triggers cross-out animation.

## Form interactions

- [ ] **P5-133** · `SPX-144` · **Input Focus Attack** — Angular graphics converge around focused input.
- [ ] **P5-134** · `SPX-145` · **Invalid Field Slash** — Error literally crosses underneath input.
- [ ] **P5-135** · `SPX-146` · **Successful Field Stamp** — `OK` stamp lands beside valid field.
- [ ] **P5-136** · `SPX-147` · **Checkbox Impact** — Checkmark lands with hard offset backing.
- [ ] **P5-137** · `SPX-148` · **Radio Target Selector** — Selection markers converge on chosen option.
- [ ] **P5-138** · `SPX-149` · **Textarea Paper Expansion** — Input grows like unfolding paper.
- [ ] **P5-139** · `SPX-150` · **Label Ejection** — Floating label shoots upward rather than gliding.
- [ ] **P5-140** · `SPX-151` · **Password Reveal Cutout** — Black mask tears away to expose characters.
- [ ] **P5-141** · `SPX-152` · **Submit Blackout** — Form becomes graphic silhouette during submission.
- [ ] **P5-142** · `SPX-153` · **Error Headline Intrusion** — Giant ERROR text enters behind form.
- [ ] **P5-143** · `SPX-154` · **Form Completion Strike** — Final valid field triggers small success burst.
- [ ] **P5-144** · `SPX-155` · **Required Marker Impact** — Required marker slams beside label.

## Progress and XP

- [ ] **P5-145** · `SPX-156` · **Confidant Rank Up** — Giant rank transition with concentric graphic impact.
- [ ] **P5-146** · `SPX-157` · **XP Counter Slam** — Earned XP attacks existing counter.
- [ ] **P5-147** · `SPX-158` · **Progress Slash Fill** — Jagged shape consumes progress track.
- [ ] **P5-148** · `SPX-159` · **Level Number Collision** — Old/new numbers collide and replacement survives.
- [ ] **P5-149** · `SPX-160` · **Milestone Stamp** — Achievement threshold receives graphic stamp.
- [ ] **P5-150** · `SPX-161` · **Progress Rail Attack** — Multiple arrows move toward next milestone.
- [ ] **P5-151** · `SPX-162` · **Rank Card Flip** — Old rank gets ejected, new rank slams forward.
- [ ] **P5-152** · `SPX-163` · **XP Receipt** — Reward values print sequentially like receipt.
- [ ] **P5-153** · `SPX-164` · **Progress Explosion** — Reaching 100% fractures progress bar.
- [ ] **P5-154** · `SPX-165` · **Skill Unlock Branch** — Graphic branch shoots from rank into unlocked ability.
- [ ] **P5-155** · `SPX-166` · **Combo Counter** — Number grows more visually aggressive with consecutive actions.
- [x] **P5-156** · `SPX-167` · **Threshold Cross** — Marker violently punches through milestone line.

## Numbers and counters

- [ ] **P5-157** · `SPX-168` · **Counter Punch** — New digit physically displaces old digit.
- [ ] **P5-158** · `SPX-169` · **Score Roll** — Digits snap vertically with irregular timing.
- [ ] **P5-159** · `SPX-170` · **Price Strike** — Old price crossed out and replacement attacks.
- [ ] **P5-160** · `SPX-171` · **Countdown Impact** — Each countdown number lands differently.
- [ ] **P5-161** · `SPX-172` · **Statistic Burst** — Percentage increase creates graphic burst.
- [ ] **P5-162** · `SPX-173` · **Negative Delta Slash** — Falling metric receives downward red strike.
- [ ] **P5-163** · `SPX-174` · **Maximum Hit** — Counter reaching limit produces full graphic impact.
- [ ] **P5-164** · `SPX-175` · **Numeric Cutout** — Number appears as negative space through polygon.

## Cards

- [x] **P5-165** · `SPX-176` · **Comic Card Selection** — Selected card physically escapes grid alignment.
- [ ] **P5-166** · `SPX-177` · **Card Backing Separation** — Hard backing moves opposite foreground.
- [ ] **P5-167** · `SPX-178` · **Card Corner Peel** — Corner exposes hidden metadata.
- [ ] **P5-168** · `SPX-179` · **Card Slash Reveal** — Diagonal cut exposes alternate state.
- [ ] **P5-169** · `SPX-180` · **Stacked Card Fan** — Cards fan outward on hover.
- [ ] **P5-170** · `SPX-181` · **Card Impact Entrance** — Newly added card punches into grid.
- [ ] **P5-171** · `SPX-182` · **Card Ejection Delete** — Deleted card violently exits before grid closes.
- [ ] **P5-172** · `SPX-183` · **Card Blackout** — Selection floods card black then restores content inverted.
- [ ] **P5-173** · `SPX-184` · **Card Headline Intrusion** — Giant category word clips through card.
- [ ] **P5-174** · `SPX-185` · **Card Rank Stamp** — Rank lands over corner.
- [ ] **P5-175** · `SPX-186` · **Card Shred Exit** — Card separates into strips during removal.
- [ ] **P5-176** · `SPX-187` · **Card Focus Brackets** — Angular marks attack corners on focus.

## Tooltips / popovers

- [ ] **P5-177** · `SPX-188` · **Jagged Speech Tooltip** — Irregular speech shape punches outward.
- [ ] **P5-178** · `SPX-189` · **Annotation Arrow Tooltip** — Huge graphic arrow points at target.
- [ ] **P5-179** · `SPX-190` · **Paper Scrap Tooltip** — Crooked note appears pinned to target.
- [ ] **P5-180** · `SPX-191` · **Black Cutout Tooltip** — White text appears in black irregular silhouette.
- [ ] **P5-181** · `SPX-192` · **Microtype Tooltip** — Tiny repeated words frame actual explanation.
- [ ] **P5-182** · `SPX-193` · **Exploded Tooltip** — Backing shards appear before tooltip body.
- [ ] **P5-183** · `SPX-194` · **Numbered Annotation** — Giant index number accompanies explanation.
- [ ] **P5-184** · `SPX-195` · **Hover Headline** — Giant background descriptor appears behind tooltip.

## Modals / dialogs

- [x] **P5-185** · `SPX-196` · **Decision Showdown** — YES and NO attack from opposite sides.
- [ ] **P5-186** · `SPX-197` · **Confirmation Blackout** — Background becomes graphic black field before dialog.
- [ ] **P5-187** · `SPX-198` · **Paper Notice Dialog** — Dialog slams down as irregular paper.
- [ ] **P5-188** · `SPX-199` · **Comic Frame Modal** — Four panels construct modal perimeter.
- [ ] **P5-189** · `SPX-200` · **Danger Slash Confirmation** — Red graphic slices through screen before warning.
- [ ] **P5-190** · `SPX-201` · **Choice Collision** — Two options collide into final layout.
- [ ] **P5-191** · `SPX-202` · **Dialog Tear Exit** — Confirmation tears dialog apart.
- [ ] **P5-192** · `SPX-203` · **Modal Headline Attack** — Giant contextual word enters behind actual dialog.

## Success states

- [ ] **P5-193** · `SPX-204` · **Success Stamp** — Approval stamp hits component.
- [ ] **P5-194** · `SPX-205` · **Success Slash** — Graphic cuts across completed element.
- [ ] **P5-195** · `SPX-206` · **Completion Headline** — Giant DONE appears behind component.
- [ ] **P5-196** · `SPX-207` · **Check Impact** — Checkmark explodes outward from centre.
- [ ] **P5-197** · `SPX-208` · **Submitted Receipt** — Confirmation prints downward.
- [ ] **P5-198** · `SPX-209` · **Success Card Ejection** — Completed card exits active queue.
- [ ] **P5-199** · `SPX-210` · **Completion Blackout** — Content briefly becomes silhouette then returns completed.
- [ ] **P5-200** · `SPX-211` · **Done Cross-Out** — Finished task gets aggressively crossed through.

## Scroll effects

- [x] **P5-201** · `SPX-212` · **Comic Panel Scroll Reveal** — Sections revealed through angled clipping masks.
- [ ] **P5-202** · `SPX-213` · **Headline Scroll Attack** — Giant words enter opposite content movement.
- [ ] **P5-203** · `SPX-214` · **Diagonal Newspaper Scroll** — Paper strips move at different scroll speeds.
- [ ] **P5-204** · `SPX-215` · **Microtype Scroll Rail** — Repeating copy responds to scroll direction.
- [ ] **P5-205** · `SPX-216` · **Panel Compression Scroll** — Previous section visually compresses as next enters.
- [ ] **P5-206** · `SPX-217` · **Red Slash Scroll Marker** — Graphic slash tracks current section.
- [ ] **P5-207** · `SPX-218` · **Cutout Scroll Reveal** — Moving polygon aperture exposes content.
- [ ] **P5-208** · `SPX-219` · **Graphic Sticky Chapter** — Huge chapter number stays while content passes.
- [ ] **P5-209** · `SPX-220` · **Panel Peel Scroll** — Foreground graphic peels away with scroll.
- [ ] **P5-210** · `SPX-221` · **Alternating Attack Reveal** — Sections enter aggressively from alternating sides.
- [ ] **P5-211** · `SPX-222` · **Scroll Speed Lines** — Directional lines briefly appear during fast scrolling.
- [ ] **P5-212** · `SPX-223` · **Section Collision** — Adjacent section graphics overlap during boundary crossing.

## Toggles and switches

- [ ] **P5-213** · `SPX-224` · **YES/NO Slam Toggle** — Active state physically punches inactive state away.
- [ ] **P5-214** · `SPX-225` · **Slash Toggle** — Graphic slash moves between two labels.
- [ ] **P5-215** · `SPX-226` · **Cutout Toggle** — Selection changes negative-space region.
- [ ] **P5-216** · `SPX-227` · **Print Registration Toggle** — Layers realign differently between states.
- [ ] **P5-217** · `SPX-228` · **Panel Flip Toggle** — Irregular panel rotates between choices.
- [ ] **P5-218** · `SPX-229` · **Cross-Out Toggle** — Disabled state gets physically crossed.
- [ ] **P5-219** · `SPX-230` · **Binary Impact Switch** — `ON` / `OFF` labels collide on change.
- [ ] **P5-220** · `SPX-231` · **Microtype Toggle Rail** — Background microcopy changes direction.

## Tabs

- [ ] **P5-221** · `SPX-232` · **Overlapping Newspaper Tabs** — Selected tab climbs above paper stack.
- [ ] **P5-222** · `SPX-233` · **Diagonal Slash Tabs** — Selection marker cuts between tabs.
- [ ] **P5-223** · `SPX-234` · **Comic Cell Tabs** — Tab widths physically recompose.
- [ ] **P5-224** · `SPX-235` · **Blackout Tabs** — Selected tab becomes negative-space cutout.
- [ ] **P5-225** · `SPX-236` · **Number Attack Tabs** — Huge section number changes behind labels.
- [ ] **P5-226** · `SPX-237` · **Tab Ejection** — Old tab flies out before new tab enters.
- [ ] **P5-227** · `SPX-238` · **Stack Shuffle Tabs** — Tabs reorder visually around active item.
- [ ] **P5-228** · `SPX-239` · **Headline Swap Tabs** — Giant background typography changes with tab.

## Search

- [ ] **P5-229** · `SPX-240` · **Search Result Attack** — Matching results punch into foreground.
- [ ] **P5-230** · `SPX-241` · **Search Blackout** — Everything except matching text becomes graphic black.
- [ ] **P5-231** · `SPX-242` · **Query Stamp** — Search term stamps itself over results.
- [ ] **P5-232** · `SPX-243` · **Result Number Slam** — Count changes with impact.
- [ ] **P5-233** · `SPX-244` · **Filter Slash** — Active filter slices irrelevant content away.
- [ ] **P5-234** · `SPX-245` · **Search Reveal Cutout** — Matches become holes through dark overlay.
- [ ] **P5-235** · `SPX-246` · **No Results Interruption** — Giant `NOTHING!` composition interrupts empty state.
- [ ] **P5-236** · `SPX-247` · **Search Suggestions Fan** — Suggestions fan out like paper strips.

## Filters and sorting

- [ ] **P5-237** · `SPX-248` · **Filter Stamp** — Applied filter lands as stamp.
- [ ] **P5-238** · `SPX-249` · **Filter Cross-Out** — Removing filter physically strikes it away.
- [ ] **P5-239** · `SPX-250` · **Sort Shuffle** — Items visibly shuffle like paper.
- [ ] **P5-240** · `SPX-251` · **Active Filter Rail** — Graphic rail connects active criteria.
- [ ] **P5-241** · `SPX-252` · **Filter Drawer Rip** — Controls tear open from screen edge.
- [ ] **P5-242** · `SPX-253` · **Selection Count Punch** — Result count gets punched by changes.
- [ ] **P5-243** · `SPX-254` · **Filter Chips Collide** — Selected filters assemble into stack.
- [ ] **P5-244** · `SPX-255` · **Clear-All Sweep** — Black slash clears all filter labels.

## Empty states

- [ ] **P5-245** · `SPX-256` · **Nothing Here Headline** — Huge clipped typography dominates empty container.
- [ ] **P5-246** · `SPX-257` · **Missing Poster** — Empty state presented as crooked poster.
- [ ] **P5-247** · `SPX-258` · **Redacted Empty State** — Content appears censored because nothing exists.
- [ ] **P5-248** · `SPX-259` · **Search Failure Burst** — Failed query produces graphic interruption.
- [ ] **P5-249** · `SPX-260` · **Empty Panel Collapse** — Expected content panels fold inward.
- [ ] **P5-250** · `SPX-261` · **Zero Counter Impact** — Giant zero punches into centre.
- [ ] **P5-251** · `SPX-262` · **Vacant Newspaper** — Blank print columns become graphic composition.
- [ ] **P5-252** · `SPX-263` · **Try Again Calling Card** — Suggestion arrives as paper notice.

## Onboarding / hints

- [ ] **P5-253** · `SPX-264` · **Tutorial Cut-In** — Thin comic panel interrupts to explain feature.
- [ ] **P5-254** · `SPX-265` · **Arrow Attack Coachmark** — Giant arrow attacks target.
- [ ] **P5-255** · `SPX-266` · **Numbered Instruction Stamp** — Steps appear as physical numbered stamps.
- [ ] **P5-256** · `SPX-267` · **Hint Paper Scrap** — Hint unfolds beside feature.
- [ ] **P5-257** · `SPX-268` · **Focus Blackout** — Everything except target gets graphic black treatment.
- [ ] **P5-258** · `SPX-269` · **Next-Step Slash** — Red graphic points toward next action.
- [ ] **P5-259** · `SPX-270` · **Tutorial Panel Sequence** — Three comic cells reveal instructions sequentially.
- [ ] **P5-260** · `SPX-271` · **Dismissal Tear** — Closing hint literally tears it away.

## Status indicators

- [ ] **P5-261** · `SPX-272` · **LIVE Impact Badge** — LIVE indicator periodically punches forward.
- [ ] **P5-262** · `SPX-273` · **Offline Cross-Out** — Connectivity status gets struck through.
- [ ] **P5-263** · `SPX-274` · **Pending Microtype** — Repeating waiting copy moves around perimeter.
- [ ] **P5-264** · `SPX-275` · **Processing Slash** — Moving diagonal graphic indicates work.
- [ ] **P5-265** · `SPX-276` · **Ready Stamp** — Status transition lands as stamp.
- [ ] **P5-266** · `SPX-277` · **Failed Blackout** — Failure state visually consumes normal status.
- [ ] **P5-267** · `SPX-278` · **Queued Paper Stack** — Queue count represented by stacked slips.
- [x] **P5-268** · `SPX-279` · **Status Collision** — Old/new status labels physically replace each other.

## Breadcrumbs / step navigation

- [ ] **P5-269** · `SPX-280` · **Chapter Slash Trail** — Graphic line cuts through completed steps.
- [ ] **P5-270** · `SPX-281` · **Step Number Punch** — Current step number becomes enormous.
- [ ] **P5-271** · `SPX-282` · **Breadcrumb Cross-Out** — Previous locations visibly crossed through.
- [ ] **P5-272** · `SPX-283` · **Progress Newspaper Rail** — Steps appear as overlapping strips.
- [ ] **P5-273** · `SPX-284` · **Current Step Attack** — Selected breadcrumb escapes baseline.
- [ ] **P5-274** · `SPX-285` · **Completed Step Stamp** — Finished stages get stamped.
- [ ] **P5-275** · `SPX-286` · **Backtrack Recoil** — Returning to previous step reverses visual direction.
- [ ] **P5-276** · `SPX-287` · **Final Step Explosion** — Completing final breadcrumb breaks rail apart.

## Avatars / profile

- [ ] **P5-277** · `SPX-288` · **Portrait Cut-In** — Avatar enters through narrow angular aperture.
- [ ] **P5-278** · `SPX-289` · **Profile Headline** — Name attacks behind avatar.
- [ ] **P5-279** · `SPX-290` · **Avatar Focus Burst** — Selecting person creates angular backing.
- [ ] **P5-280** · `SPX-291` · **Status Speech Burst** — Message appears in irregular bubble.
- [ ] **P5-281** · `SPX-292` · **Profile Card Shuffle** — User profiles reorder like paper stack.
- [ ] **P5-282** · `SPX-293` · **Avatar Ring Microtype** — Repeating metadata orbits avatar.
- [ ] **P5-283** · `SPX-294` · **Online Stamp** — Status lands over portrait.
- [ ] **P5-284** · `SPX-295` · **Profile Switch Wipe** — Angular mask swaps current profile.

## Tables and data

- [ ] **P5-285** · `SPX-296` · **Row Selection Attack** — Selected table row violently escapes grid.
- [ ] **P5-286** · `SPX-297` · **Sort Header Slam** — Active sort header gets graphic backing.
- [ ] **P5-287** · `SPX-298` · **Cell Correction Strike** — Changed value crossed/replaced.
- [ ] **P5-288** · `SPX-299` · **New Row Impact** — Added record punches into table.
- [ ] **P5-289** · `SPX-300` · **Deleted Row Ejection** — Removed record exits before table collapses.
- [ ] **P5-290** · `SPX-301` · **Threshold Warning Slash** — Dangerous metric gets graphic strike.
- [ ] **P5-291** · `SPX-302` · **Total Row Impact** — Aggregate row visually dominates after calculation.
- [ ] **P5-292** · `SPX-303` · **Data Refresh Shuffle** — Rows rapidly recompose after refresh.

## Calendar / time

- [x] **P5-293** · `SPX-304` · **Day Change Tear** — Previous date tears away to reveal next.
- [x] **P5-294** · `SPX-305` · **Deadline Attack** — Approaching deadline gets graphic warning.
- [ ] **P5-295** · `SPX-306` · **Today Stamp** — Current date receives physical stamp.
- [ ] **P5-296** · `SPX-307` · **Month Panel Wipe** — Calendar month changes through comic panels.
- [ ] **P5-297** · `SPX-308` · **Event Calling Card** — Important event lands over calendar.
- [ ] **P5-298** · `SPX-309` · **Countdown Headline** — Remaining time becomes giant background text.
- [ ] **P5-299** · `SPX-310` · **Overdue Cross-Out** — Missed item gets aggressive strike.
- [ ] **P5-300** · `SPX-311` · **Timeline Slash** — Current time represented by diagonal graphic blade.

## Core collection extras

- [ ] **P5-301** · `SPX-312` · **Graphic Finisher Completion** — Major completion finisher — full graphic punctuation for a finished arc.

## Suggested primitive taxonomy

- overlay
- transition
- entrance
- exit
- selection
- hover
- focus
- notification
- error
- success
- progress
- loading
- confirmation
- locked
- scroll
- value-change
