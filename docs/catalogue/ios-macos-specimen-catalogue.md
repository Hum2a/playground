# iOS & macOS Specimen Checklist

> Working backlog for portable motion/UI artifacts inspired by iOS and macOS interaction language. Interaction primitives, not OS replicas. Avoid Apple product marks, SF Symbols as assets, system screenshots, extracted assets, audio, and proprietary fonts.

## How to use

- **IOS-NNN** — stable catalogue id (this list).
- **SPX-NNN** — specimen registry ref. Unbuilt ideas are pre-assigned `SPX-1300`…`SPX-1557` — use that ref when implementing; do not invent a different number.
- Non-catalogue specimens (other franchises / originals) use gaps not reserved by open P5 (`SPX-015`–`SPX-312`), P3 (`SPX-400`–`SPX-635`), PK (`SPX-700`–`SPX-965`), DB (`SPX-966`–`SPX-1209`), or open IOS rows; prefer leftover `SPX-313`–`SPX-399`, `SPX-636`–`SPX-699`, `SPX-1210`–`SPX-1299`, or `SPX-1558+`.
- Mark **`[x]`** only when the specimen is registered in `src/specimens/index.ts` with a real `ref` (not `SPX-TODO`) and verified. Agents must update this file in the same change — see `.cursor/rules/37_persona-catalogue.mdc`.
- Progress: **10 / 258** complete.

| Status | Count |
| --- | --- |
| Done | 10 |
| Open | 248 |

## Visual grammar

| Motif | Use for |
| --- | --- |
| Spatial continuity | push/pop hierarchy; matched geometry travel |
| Detent / rubber-band | physical resistance, limits, snap points |
| Material / blur | layered translucency and depth |
| Ownership / lift | long-press lift, drag proxy, drop magnetism |
| Compression | stacks, notification piles, dock magnification |
| State morphing | controls, sheets, live activities reshape in place |
| Threshold commit | auth, destructive confirms, detent lock |
| Spatial memory | Spotlight, Continuity, window/Stage Manager recall |

## Shipped (mapped to live specimens)

| IOS | SPX | Specimen id | Title |
| --- | --- | --- | --- |
| IOS-054 | `SPX-1353` | `stage-manager-stack-shift` | Stage Manager Stack Shift |
| IOS-049 | `SPX-1348` | `mission-control-spread` | Mission Control Spread |
| IOS-040 | `SPX-1339` | `dock-launch-bounce` | Dock Launch Bounce |
| IOS-039 | `SPX-1338` | `dock-magnification` | Dock Magnification |
| IOS-029 | `SPX-1328` | `dual-activity-split` | Dual Activity Split |
| IOS-027 | `SPX-1326` | `compact-activity-expansion` | Compact Activity Expansion |
| IOS-004 | `SPX-1303` | `matched-card-expansion` | Matched Card Expansion |
| IOS-062 | `SPX-1361` | `scroll-rubber-band` | Scroll Rubber Band |
| IOS-015 | `SPX-1314` | `bottom-sheet-detent-snap` | Bottom Sheet Detent Snap |
| IOS-003 | `SPX-1302` | `interactive-back-swipe` | Interactive Back Swipe |

## Core first-wave

Curated implementation priority (former Flagship Cross-Platform Specimens). Same checkbox as the master list — checking either counts.

- [x] **IOS-003** · `SPX-1302` · **Interactive Back Swipe** — navigation-spatial-continuity
- [x] **IOS-004** · `SPX-1303` · **Matched Card Expansion** — navigation-spatial-continuity
- [x] **IOS-015** · `SPX-1314` · **Bottom Sheet Detent Snap** — sheets-panels-presentation
- [ ] **IOS-016** · `SPX-1315` · **Sheet Rubber-Band Limit** — sheets-panels-presentation
- [x] **IOS-027** · `SPX-1326` · **Compact Activity Expansion** — dynamic-island-live-activity-inspired
- [x] **IOS-029** · `SPX-1328` · **Dual Activity Split** — dynamic-island-live-activity-inspired
- [x] **IOS-039** · `SPX-1338` · **Dock Magnification** — dock-macos-application-launching
- [x] **IOS-040** · `SPX-1339` · **Dock Launch Bounce** — dock-macos-application-launching
- [x] **IOS-049** · `SPX-1348` · **Mission Control Spread** — windows-mission-control-desktop-space
- [x] **IOS-054** · `SPX-1353` · **Stage Manager Stack Shift** — windows-mission-control-desktop-space
- [x] **IOS-062** · `SPX-1361` · **Scroll Rubber Band** — spring-rubber-banding-physical-response
- [ ] **IOS-072** · `SPX-1371` · **Large Title Collapse** — scroll-content-physics
- [ ] **IOS-092** · `SPX-1391` · **Long-Press Lift** — context-menus-long-press-interaction
- [ ] **IOS-093** · `SPX-1392` · **Context Menu Bloom** — context-menus-long-press-interaction
- [ ] **IOS-100** · `SPX-1399` · **App Launch Expansion** — home-screen-app-grid
- [ ] **IOS-113** · `SPX-1412` · **Notification Stack Compression** — notifications
- [ ] **IOS-127** · `SPX-1426` · **Biometric Scan Acquisition** — face-id-authentication-inspired
- [ ] **IOS-145** · `SPX-1444` · **Spotlight Materialise** — search
- [ ] **IOS-152** · `SPX-1451` · **Drag Proxy Formation** — drag-drop
- [ ] **IOS-154** · `SPX-1453` · **Drop Target Magnetism** — drag-drop
- [ ] **IOS-160** · `SPX-1459` · **Quick Look Expansion** — macos-finder-inspired
- [ ] **IOS-172** · `SPX-1471` · **Control Centre Module Expansion** — macos-menu-bar-control-centre
- [ ] **IOS-188** · `SPX-1487` · **AirDrop Transfer Arc** — airdrop-nearby-transfer-inspired
- [ ] **IOS-194** · `SPX-1493` · **Handoff Continuation** — continuity-cross-device-concepts
- [ ] **IOS-219** · `SPX-1518` · **Pull to Refresh** — lists-collections
- [ ] **IOS-209** · `SPX-1508` · **Swipe Full-Commit** — delete-archive-destructive-actions
- [ ] **IOS-224** · `SPX-1523` · **Circular Progress Completion Morph** — progress-completion
- [ ] **IOS-231** · `SPX-1530` · **Invalid Field Shake** — error-validation
- [ ] **IOS-237** · `SPX-1536` · **Translucent Material Lift** — material-blur-layering
- [ ] **IOS-250** · `SPX-1549` · **Copy Confirmation Morph** — tiny-microinteractions

## Navigation & Spatial Continuity

- [ ] **IOS-001** · `SPX-1300` · **Navigation Push** — current surface shifts aside while the next surface enters with clear spatial hierarchy.
- [ ] **IOS-002** · `SPX-1301` · **Navigation Pop** — reverse-direction return that restores the previous surface.
- [x] **IOS-003** · `SPX-1302` · **Interactive Back Swipe** — drag-controlled navigation transition whose completion depends on release position/velocity.
- [x] **IOS-004** · `SPX-1303` · **Matched Card Expansion** — compact card expands continuously into a detailed surface while preserving identity.
- [ ] **IOS-005** · `SPX-1304` · **Matched Card Collapse** — detailed surface contracts back into its exact originating card.
- [ ] **IOS-006** · `SPX-1305` · **Shared Element Handoff** — one visual element appears to move between two layouts while surrounding structure changes.
- [ ] **IOS-007** · `SPX-1306` · **Tab Content Slide** — adjacent tab content enters with restrained directional movement.
- [ ] **IOS-008** · `SPX-1307` · **Sidebar Detail Swap** — selected sidebar row anchors a rapid detail-pane replacement.
- [ ] **IOS-009** · `SPX-1308` · **Column Reveal** — an additional inspector/detail column unfolds without replacing the primary context.
- [ ] **IOS-010** · `SPX-1309` · **Split View Collapse** — secondary pane retracts while primary pane smoothly claims the available space.
- [ ] **IOS-011** · `SPX-1310` · **Stage Re-centre** — closing one window causes the remaining workspace to rebalance around the available region.
- [ ] **IOS-012** · `SPX-1311` · **Breadcrumb Spatial Return** — hierarchical return visually contracts toward the selected ancestor.
- [ ] **IOS-013** · `SPX-1312` · **Navigation Title Morph** — large contextual heading condenses into a compact persistent navigation title.
- [ ] **IOS-014** · `SPX-1313` · **Context Preservation Slide** — outgoing surface remains partially visible long enough to communicate where the new layer came from.

## Sheets, Panels & Presentation

- [x] **IOS-015** · `SPX-1314` · **Bottom Sheet Detent Snap** — sheet moves between fixed collapsed, medium and expanded heights with spring settling.
- [ ] **IOS-016** · `SPX-1315` · **Sheet Rubber-Band Limit** — dragging beyond a sheet's maximum detent creates increasing resistance before snapping back.
- [ ] **IOS-017** · `SPX-1316` · **Sheet Dismiss Pull** — downward drag crosses a threshold and converts an interactive sheet into dismissal.
- [ ] **IOS-018** · `SPX-1317` · **Popover Materialise** — compact contextual surface grows from its anchor point and establishes directional ownership.
- [ ] **IOS-019** · `SPX-1318` · **Popover Re-anchor** — open popover relocates to a newly selected anchor without behaving like an unrelated new popup.
- [ ] **IOS-020** · `SPX-1319` · **Inspector Slide-In** — contextual inspector enters from an edge while preserving the document beneath.
- [ ] **IOS-021** · `SPX-1320` · **Inspector Section Expansion** — disclosure expands a dense settings region while neighbouring rows reposition smoothly.
- [ ] **IOS-022** · `SPX-1321` · **Modal Focus Lift** — modal establishes priority while background context visually recedes.
- [ ] **IOS-023** · `SPX-1322` · **Modal Return-to-Origin** — dismissed content collapses toward the control or object that launched it.
- [ ] **IOS-024** · `SPX-1323` · **Action Sheet Rise** — action group enters from the bottom with sequential structural settling.
- [ ] **IOS-025** · `SPX-1324` · **Floating Utility Panel** — small utility surface appears with restrained scale/position settling.
- [ ] **IOS-026** · `SPX-1325` · **Panel Edge Attachment** — floating panel visually docks to an application edge and becomes structurally attached.

## Dynamic Island / Live Activity Inspired

- [x] **IOS-027** · `SPX-1326` · **Compact Activity Expansion** — tiny persistent status capsule expands into a richer live-status surface.
- [ ] **IOS-028** · `SPX-1327` · **Activity Contraction** — completed expanded activity compresses back into a minimal persistent indicator.
- [x] **IOS-029** · `SPX-1328` · **Dual Activity Split** — one compact activity separates into two independently meaningful status regions.
- [ ] **IOS-030** · `SPX-1329` · **Activity Merge** — two simultaneous status indicators converge into one combined summary.
- [ ] **IOS-031** · `SPX-1330` · **Live Progress Morph** — compact status geometry changes as an operation progresses through phases.
- [ ] **IOS-032** · `SPX-1331` · **Incoming Event Bloom** — dormant compact region rapidly expands to announce a high-priority event, then settles.
- [ ] **IOS-033** · `SPX-1332` · **Call State Morph** — compact status changes geometry between ringing, active and ended states.
- [ ] **IOS-034** · `SPX-1333` · **Media Activity Pulse** — playback state represented by subtle live waveform/level movement inside a compact region.
- [ ] **IOS-035** · `SPX-1334` · **Background Task Return** — minimized task briefly expands when its state meaningfully changes.
- [ ] **IOS-036** · `SPX-1335` · **Timer Completion Burst** — compact countdown reaches zero and transforms into a completion/attention state.
- [ ] **IOS-037** · `SPX-1336` · **Secondary Activity Satellite** — minor concurrent task appears as a small attached secondary region.
- [ ] **IOS-038** · `SPX-1337` · **Activity Priority Swap** — primary and secondary compact activities exchange visual prominence.

## Dock & macOS Application Launching

- [x] **IOS-039** · `SPX-1338` · **Dock Magnification** — pointer proximity enlarges neighbouring items according to distance from the cursor.
- [x] **IOS-040** · `SPX-1339` · **Dock Launch Bounce** — selected application indicator performs a finite launch bounce and resolves into running state.
- [ ] **IOS-041** · `SPX-1340` · **Dock Attention Bounce** — dormant application requests attention using a deliberately finite repeated bounce.
- [ ] **IOS-042** · `SPX-1341` · **Dock Minimise Genie Concept** — window geometry funnels toward a compact dock destination.
- [ ] **IOS-043** · `SPX-1342` · **Dock Restore Expansion** — compact dock representation reconstructs into its previous window bounds.
- [ ] **IOS-044** · `SPX-1343` · **Running Indicator Arrival** — launch completes and a persistent running-state marker appears beneath the item.
- [ ] **IOS-045** · `SPX-1344` · **Dock Reorder Gap** — dragged item creates a live insertion gap while neighbours redistribute.
- [ ] **IOS-046** · `SPX-1345` · **Dock Remove Poof Abstraction** — item removal breaks into a restrained abstract dispersal rather than a generic fade.
- [ ] **IOS-047** · `SPX-1346` · **Dock Hide Reveal** — edge approach causes the dock to rise into view with acceleration/deceleration.
- [ ] **IOS-048** · `SPX-1347` · **Dock Stack Fan** — compact stack expands into a spatial fan/list of contained items.

## Windows, Mission Control & Desktop Space

- [x] **IOS-049** · `SPX-1348` · **Mission Control Spread** — overlapping windows separate into a readable overview while preserving relative identity.
- [ ] **IOS-050** · `SPX-1349` · **Mission Control Restore** — overview windows converge back into their original workspace positions.
- [ ] **IOS-051** · `SPX-1350` · **Window Minimise Funnel** — rectangular window collapses toward a small destination while preserving spatial continuity.
- [ ] **IOS-052** · `SPX-1351` · **Window Maximise / Zoom** — window transitions between bounded and expanded states with continuous geometry.
- [ ] **IOS-053** · `SPX-1352` · **Desktop Space Swipe** — one workspace exits while another enters as a coherent spatial plane.
- [x] **IOS-054** · `SPX-1353` · **Stage Manager Stack Shift** — foreground workspace swaps with a staged background group using layered depth.
- [ ] **IOS-055** · `SPX-1354` · **Window Snap Preview** — dragging near a target region constructs a potential placement outline before commit.
- [ ] **IOS-056** · `SPX-1355` · **Window Snap Commit** — release converts the preview region into the window's new geometry.
- [ ] **IOS-057** · `SPX-1356` · **Window Shake Rejection** — invalid drop produces a tiny finite lateral refusal gesture.
- [ ] **IOS-058** · `SPX-1357` · **Window Focus Elevation** — selected window becomes visually dominant without moving every surrounding window.
- [ ] **IOS-059** · `SPX-1358` · **Desktop Reveal Spread** — windows temporarily move aside to expose the desktop.
- [ ] **IOS-060** · `SPX-1359` · **Workspace Group Collapse** — several related windows compact into one staged group representation.
- [ ] **IOS-061** · `SPX-1360` · **Workspace Group Expand** — staged group reconstructs into its constituent windows.

## Spring, Rubber-Banding & Physical Response

- [x] **IOS-062** · `SPX-1361` · **Scroll Rubber Band** — overscroll distance is compressed non-linearly and springs back to the valid boundary.
- [ ] **IOS-063** · `SPX-1362` · **Edge Resistance Drag** — draggable object becomes progressively harder to move outside allowed bounds.
- [ ] **IOS-064** · `SPX-1363` · **Spring Toggle** — binary control crosses its midpoint and settles into the new state with restrained spring response.
- [ ] **IOS-065** · `SPX-1364` · **Spring Selection Pill** — active selection marker moves between options with velocity-sensitive settling.
- [ ] **IOS-066** · `SPX-1365` · **Pressed Control Compression** — button/card compresses subtly under touch and rebounds on release.
- [ ] **IOS-067** · `SPX-1366` · **Release Velocity Settle** — dragged element chooses destination based on both position and release velocity.
- [ ] **IOS-068** · `SPX-1367` · **Overshoot Expansion** — newly expanded control passes its final size slightly before settling.
- [ ] **IOS-069** · `SPX-1368` · **Boundary Collision** — moving object reaches a layout constraint and transfers a small response into neighbouring geometry.
- [ ] **IOS-070** · `SPX-1369` · **Elastic Segmented Control** — active segment stretches during travel then returns to normal width.
- [ ] **IOS-071** · `SPX-1370` · **Elastic Search Field** — compact search affordance stretches into a full input field with spring settling.

## Scroll & Content Physics

- [ ] **IOS-072** · `SPX-1371` · **Large Title Collapse** — oversized page heading condenses into a compact navigation-bar title during scroll.
- [ ] **IOS-073** · `SPX-1372` · **Sticky Header Compression** — section header changes height/detail as it becomes pinned.
- [ ] **IOS-074** · `SPX-1373` · **Scroll Edge Material** — content approaching a constrained edge gains a subtle structural separation cue.
- [ ] **IOS-075** · `SPX-1374` · **Paging Snap** — free scrolling resolves into a discrete page position after release.
- [ ] **IOS-076** · `SPX-1375` · **Scroll-to-Top Collapse** — content rapidly returns to origin while navigation structure remains anchored.
- [ ] **IOS-077** · `SPX-1376` · **Parallax Header Restraint** — header artwork/content moves at a slower ratio than foreground content.
- [ ] **IOS-078** · `SPX-1377` · **Stretchy Header** — downward overscroll expands header region then restores it.
- [ ] **IOS-079** · `SPX-1378` · **Section Index Jump** — index selection rapidly relocates long content while retaining destination context.
- [ ] **IOS-080** · `SPX-1379` · **Pinned Toolbar Handoff** — inline toolbar reaches viewport edge and becomes a fixed toolbar.
- [ ] **IOS-081** · `SPX-1380` · **Scroll Indicator Compression** — scrollbar thumb changes size based on content/viewport relationship.

## Control State Changes

- [ ] **IOS-082** · `SPX-1381` · **iOS-Style Toggle State Change** — thumb crosses a track while track geometry/state changes around it.
- [ ] **IOS-083** · `SPX-1382` · **Checkbox Draw Completion** — selection box fills and check geometry constructs rather than simply appearing.
- [ ] **IOS-084** · `SPX-1383` · **Radio Selection Transfer** — selection ownership moves from one option to another.
- [ ] **IOS-085** · `SPX-1384` · **Segmented Selection Slide** — active backing plate moves between segments while labels remain stable.
- [ ] **IOS-086** · `SPX-1385` · **Stepper Increment Tick** — value change couples numeric clipping with a small physical control response.
- [ ] **IOS-087** · `SPX-1386` · **Slider Thumb Pickup** — thumb subtly enlarges on active drag and returns on release.
- [ ] **IOS-088** · `SPX-1387` · **Slider Value Bubble** — value label emerges from the active thumb and collapses after release.
- [ ] **IOS-089** · `SPX-1388` · **Disclosure Chevron Turn** — chevron rotation and content expansion form one coordinated state transition.
- [ ] **IOS-090** · `SPX-1389` · **Switch Disabled Collapse** — control loses interactive prominence through geometry/detail reduction, not opacity alone.
- [ ] **IOS-091** · `SPX-1390` · **Control Confirmation Tick** — completed action produces a compact finite check response.

## Context Menus & Long-Press Interaction

- [ ] **IOS-092** · `SPX-1391` · **Long-Press Lift** — pressed object separates visually from its context before secondary actions appear.
- [ ] **IOS-093** · `SPX-1392` · **Context Menu Bloom** — menu constructs outward from the long-pressed object's location.
- [ ] **IOS-094** · `SPX-1393` · **Context Preview Expansion** — content preview enlarges while actions arrange around/below it.
- [ ] **IOS-095** · `SPX-1394` · **Context Dismiss Return** — preview and menu collapse precisely back toward the source object.
- [ ] **IOS-096** · `SPX-1395` · **Menu Item Press Track** — pointer/touch movement transfers active state cleanly between menu rows.
- [ ] **IOS-097** · `SPX-1396` · **Submenu Side Bloom** — nested menu grows from the selected parent row.
- [ ] **IOS-098** · `SPX-1397` · **Destructive Menu Commit** — selected destructive row compresses the menu into a confirmation/result state.
- [ ] **IOS-099** · `SPX-1398` · **Menu Edge Reflow** — menu changes opening direction when space is constrained while maintaining anchor ownership.

## Home Screen & App Grid

- [ ] **IOS-100** · `SPX-1399` · **App Launch Expansion** — app tile expands from its grid location into a full surface.
- [ ] **IOS-101** · `SPX-1400` · **App Close Collapse** — full surface contracts back into the exact originating grid tile.
- [ ] **IOS-102** · `SPX-1401` · **Home Screen Jiggle Mode** — icons enter a restrained alternating edit-state oscillation.
- [ ] **IOS-103** · `SPX-1402` · **Icon Reorder Gap** — dragging an icon causes neighbouring icons to open and close insertion positions.
- [ ] **IOS-104** · `SPX-1403` · **Folder Open Expansion** — compact grouped representation expands into a local app grid.
- [ ] **IOS-105** · `SPX-1404` · **Folder Close Compression** — local grid contracts into the folder representation.
- [ ] **IOS-106** · `SPX-1405` · **Widget Size Morph** — information module changes between predefined compact/medium/large structures.
- [ ] **IOS-107** · `SPX-1406` · **Page Dot Progress** — horizontal page movement transfers active state between pagination indicators.
- [ ] **IOS-108** · `SPX-1407` · **Icon Delete Confirmation** — edit-state item transitions into a clear pending-removal state.
- [ ] **IOS-109** · `SPX-1408` · **Grid Settle After Drop** — displaced icons resolve into final positions after a drag ends.

## Notifications

- [ ] **IOS-110** · `SPX-1409` · **Notification Banner Drop** — compact alert enters from the top edge and settles into temporary presence.
- [ ] **IOS-111** · `SPX-1410` · **Notification Expand** — compact alert grows into richer actions/content while preserving its identity.
- [ ] **IOS-112** · `SPX-1411` · **Notification Collapse** — expanded notification returns to compact state.
- [ ] **IOS-113** · `SPX-1412` · **Notification Stack Compression** — several alerts collapse into a layered stack.
- [ ] **IOS-114** · `SPX-1413` · **Notification Stack Fan** — compressed stack expands into individually readable notifications.
- [ ] **IOS-115** · `SPX-1414` · **Notification Swipe Dismiss** — drag reveals dismissal intent and commits after threshold.
- [ ] **IOS-116** · `SPX-1415` · **Notification Action Resolve** — tapping an inline action transforms the notification into a result state before removal.
- [ ] **IOS-117** · `SPX-1416` · **Notification Replacement** — updated event replaces prior content without presenting itself as a separate unrelated alert.
- [ ] **IOS-118** · `SPX-1417` · **Notification Timeout Retreat** — temporary banner leaves after a finite dwell with restrained motion.
- [ ] **IOS-119** · `SPX-1418` · **Priority Notification Breakout** — one item separates from a stack because its state becomes more important.

## Lock Screen & Wake-State Concepts

- [ ] **IOS-120** · `SPX-1419` · **Wake Information Reveal** — dormant surface progressively exposes high-priority information without a full page transition.
- [ ] **IOS-121** · `SPX-1420` · **Lock-to-Content Handoff** — authenticated state transitions from lock context into application context.
- [ ] **IOS-122** · `SPX-1421` · **Live Activity Lock Expansion** — compact persistent activity expands to expose additional live state.
- [ ] **IOS-123** · `SPX-1422` · **Charging State Arrival** — power connection produces a finite state-confirmation animation.
- [ ] **IOS-124** · `SPX-1423` · **Focus Mode State Swap** — lock/home presentation changes when a focus state activates.
- [ ] **IOS-125** · `SPX-1424` · **Always-On Dim Transition** — active presentation reduces to a persistent low-information state while preserving hierarchy.
- [ ] **IOS-126** · `SPX-1425` · **Wake Restore** — low-information state returns to full presentation without reconstructing everything from zero.

## Face ID / Authentication Inspired

- [ ] **IOS-127** · `SPX-1426` · **Biometric Scan Acquisition** — abstract identity field searches, acquires and validates a user-presence target.
- [ ] **IOS-128** · `SPX-1427` · **Authentication Success Morph** — scanning geometry resolves into an unlocked state.
- [ ] **IOS-129** · `SPX-1428` · **Authentication Failure Reset** — acquisition fails, geometry rejects once, then resets to retry-ready state.
- [ ] **IOS-130** · `SPX-1429` · **Passkey Handoff** — authentication request transfers from one device/context representation to another.
- [ ] **IOS-131** · `SPX-1430` · **Credential Confirmation Sheet** — identity confirmation surface rises, resolves and dismisses after success.
- [ ] **IOS-132** · `SPX-1431` · **Secure Action Unlock** — previously unavailable control becomes actionable only after authentication completion.
- [ ] **IOS-133** · `SPX-1432` · **Authentication Timeout** — unresolved identity request visibly expires back to neutral state.

## Keyboard & Text Input

- [ ] **IOS-134** · `SPX-1433` · **Keyboard Rise / Content Avoidance** — input surface enters while focused content relocates to remain visible.
- [ ] **IOS-135** · `SPX-1434` · **Selection Loupe Concept** — touch/drag creates a temporary magnified text-position inspector.
- [ ] **IOS-136** · `SPX-1435` · **Cursor Handle Pickup** — selection handle enlarges and follows drag with constrained movement.
- [ ] **IOS-137** · `SPX-1436` · **Autocorrect Replacement** — typed token transforms into corrected token with a clear replacement event.
- [ ] **IOS-138** · `SPX-1437` · **Predictive Text Acceptance** — suggestion transfers from secondary suggestion region into the primary text stream.
- [ ] **IOS-139** · `SPX-1438` · **Text Selection Expansion** — selection grows character-by-character/word-by-word from an anchor.
- [ ] **IOS-140** · `SPX-1439` · **Keyboard Dismiss Pull** — interactive downward gesture moves keyboard and content together before dismissal.
- [ ] **IOS-141** · `SPX-1440` · **Input Accessory Dock** — contextual controls attach above the keyboard/input boundary.
- [ ] **IOS-142** · `SPX-1441` · **Dictation Listening Field** — input enters a live listening state represented by restrained level geometry.

## Search

- [ ] **IOS-143** · `SPX-1442` · **Search Field Activation** — compact search affordance expands, gains focus and reorganises neighbouring controls.
- [ ] **IOS-144** · `SPX-1443` · **Search Cancel Reversion** — active search collapses and restores the prior navigation arrangement.
- [ ] **IOS-145** · `SPX-1444` · **Spotlight Materialise** — central search surface appears over subdued context with immediate keyboard focus semantics.
- [ ] **IOS-146** · `SPX-1445` · **Spotlight Result Selection** — active result marker moves rapidly through heterogeneous result rows.
- [ ] **IOS-147** · `SPX-1446` · **Spotlight Open Handoff** — selected result contracts into an action token then expands into destination content.
- [ ] **IOS-148** · `SPX-1447` · **Search Result Incremental Arrival** — result groups construct as query specificity increases.
- [ ] **IOS-149** · `SPX-1448` · **Search Tokenisation** — free text becomes discrete filter/search tokens.
- [ ] **IOS-150** · `SPX-1449` · **Search Empty-State Collapse** — results region structurally simplifies when no matches remain.

## Drag & Drop

- [ ] **IOS-151** · `SPX-1450` · **Drag Lift** — item separates from its source with scale/depth change before movement.
- [ ] **IOS-152** · `SPX-1451` · **Drag Proxy Formation** — complex selected content condenses into a portable drag representation.
- [ ] **IOS-153** · `SPX-1452` · **Multi-Item Drag Stack** — additional selected items join the drag proxy as layered countable objects.
- [ ] **IOS-154** · `SPX-1453` · **Drop Target Magnetism** — approaching a valid destination subtly pulls/reorients the proxy.
- [ ] **IOS-155** · `SPX-1454` · **Drop Commit Absorption** — proxy is structurally absorbed into the destination rather than simply disappearing.
- [ ] **IOS-156** · `SPX-1455` · **Invalid Drop Return** — rejected item follows a deterministic return path to its source.
- [ ] **IOS-157** · `SPX-1456` · **Spring-Loaded Folder Hover** — sustained hover over a container causes it to open for deeper drop navigation.
- [ ] **IOS-158** · `SPX-1457` · **Drag Count Increment** — newly added dragged item visibly joins the existing stack and increments count.
- [ ] **IOS-159** · `SPX-1458` · **Cross-Column Drag Handoff** — item changes layout ownership while pointer remains continuous.

## macOS Finder Inspired

- [ ] **IOS-160** · `SPX-1459` · **Quick Look Expansion** — selected file representation expands into a larger preview without leaving context.
- [ ] **IOS-161** · `SPX-1460` · **Quick Look Dismiss** — preview collapses back toward the selected file.
- [ ] **IOS-162** · `SPX-1461` · **File Copy Progress Collapse** — active copy operation condenses into a compact progress indicator.
- [ ] **IOS-163** · `SPX-1462` · **File Conflict Decision** — duplicate/conflict state presents two competing outcomes and resolves one.
- [ ] **IOS-164** · `SPX-1463` · **List-to-Icon View Morph** — same file set reorganises between linear rows and spatial grid while preserving identities.
- [ ] **IOS-165** · `SPX-1464` · **Column Browser Advance** — selecting a folder populates the next hierarchical column.
- [ ] **IOS-166** · `SPX-1465` · **Sidebar Location Handoff** — selected location changes while content plane updates independently.
- [ ] **IOS-167** · `SPX-1466` · **File Rename Focus** — static filename becomes an editable focused token without moving the file itself.
- [ ] **IOS-168** · `SPX-1467` · **Eject Completion** — mounted item enters pending-eject state then disappears from available destinations.
- [ ] **IOS-169** · `SPX-1468` · **Tag Attachment** — metadata token docks onto a file representation and becomes persistent.

## macOS Menu Bar & Control Centre

- [ ] **IOS-170** · `SPX-1469` · **Menu Bar Dropdown Origin** — menu grows downward from a fixed menu-bar anchor.
- [ ] **IOS-171** · `SPX-1470` · **Menu Bar Active Transfer** — pointer crosses menu headings and the open menu transfers ownership without closing/reopening theatrically.
- [ ] **IOS-172** · `SPX-1471` · **Control Centre Module Expansion** — compact system-control module expands into detailed controls.
- [ ] **IOS-173** · `SPX-1472` · **Control Centre Module Collapse** — detailed control contracts back into its compact summary.
- [ ] **IOS-174** · `SPX-1473` · **Menu Check State** — selecting an option transfers a persistent check marker between mutually exclusive items.
- [ ] **IOS-175** · `SPX-1474` · **Volume/Brightness HUD** — temporary system-value overlay appears, updates magnitude and retreats.
- [ ] **IOS-176** · `SPX-1475` · **Status Item Activity** — menu-bar item gains a compact finite activity state while background work runs.
- [ ] **IOS-177** · `SPX-1476` · **Submenu Aim Corridor** — nested menu remains open while pointer travels through the geometric corridor toward its submenu.

## Media & Playback

- [ ] **IOS-178** · `SPX-1477` · **Play/Pause Glyph Morph** — one control's geometry transforms directly between playback states.
- [ ] **IOS-179** · `SPX-1478` · **Now Playing Expansion** — compact media control grows into richer playback information.
- [ ] **IOS-180** · `SPX-1479` · **Now Playing Collapse** — expanded player compresses back into compact persistent playback state.
- [ ] **IOS-181** · `SPX-1480` · **Scrubber Pickup** — progress thumb enlarges, reveals precision information and follows active drag.
- [ ] **IOS-182** · `SPX-1481` · **AirPlay Route Transfer** — playback ownership visibly moves from local device to external destination.
- [ ] **IOS-183** · `SPX-1482` · **Volume Route Change** — audio control changes destination while preserving current playback context.
- [ ] **IOS-184** · `SPX-1483` · **Track Skip Handoff** — outgoing metadata exits as incoming track metadata establishes itself.
- [ ] **IOS-185** · `SPX-1484` · **Playback Buffer Catch-Up** — buffered region advances ahead of playback then playback resumes into it.

## AirDrop / Nearby Transfer Inspired

- [ ] **IOS-186** · `SPX-1485` · **Nearby Device Discovery** — dormant field discovers a fixed set of nearby recipients.
- [ ] **IOS-187** · `SPX-1486` · **Recipient Acquisition Ring** — selected nearby recipient receives an explicit transfer-ready state.
- [ ] **IOS-188** · `SPX-1487` · **AirDrop Transfer Arc** — file proxy leaves source and travels toward a recipient representation.
- [ ] **IOS-189** · `SPX-1488` · **Transfer Acceptance** — pending incoming item changes from offered to accepted before data movement begins.
- [ ] **IOS-190** · `SPX-1489` · **Transfer Completion Absorption** — transferred object becomes part of the recipient's content rather than evaporating.
- [ ] **IOS-191** · `SPX-1490` · **Transfer Rejection Return** — rejected item collapses back toward sender.
- [ ] **IOS-192** · `SPX-1491` · **Nearby Discovery Timeout** — candidate disappears from the discovery field when availability ends.
- [ ] **IOS-193** · `SPX-1492` · **Multi-Recipient Broadcast** — one source creates separate transfer instances for several destinations.

## Continuity / Cross-Device Concepts

- [ ] **IOS-194** · `SPX-1493` · **Handoff Continuation** — active task representation transfers from one device frame to another while retaining state.
- [ ] **IOS-195** · `SPX-1494` · **Universal Clipboard Transfer** — copied object becomes a temporary shared token then materialises on another device.
- [ ] **IOS-196** · `SPX-1495` · **Continuity Camera Acquisition** — desktop placeholder discovers and binds to a nearby camera source.
- [ ] **IOS-197** · `SPX-1496` · **Sidecar Workspace Extension** — secondary display region attaches to the primary workspace and receives moved content.
- [ ] **IOS-198** · `SPX-1497` · **Cross-Device Cursor Handoff** — pointer reaches one display boundary and emerges on another contextual surface.
- [ ] **IOS-199** · `SPX-1498` · **Device Proximity Unlock** — nearby trusted-device state changes a locked action into an available one.
- [ ] **IOS-200** · `SPX-1499` · **Task Return Handoff** — task previously transferred away re-enters the original device with preserved progress.

## Focus, Selection & Hover on macOS

- [ ] **IOS-201** · `SPX-1500` · **Pointer Hover Lift** — interactive card gains restrained spatial prominence under pointer without dramatic scaling.
- [ ] **IOS-202** · `SPX-1501` · **Selection Ownership Transfer** — selected backing moves between rows while old selection relinquishes state.
- [ ] **IOS-203** · `SPX-1502` · **Focus Ring Construction** — keyboard focus produces a clear structural ring around the active element.
- [ ] **IOS-204** · `SPX-1503` · **Inactive Window Selection** — selected content remains selected but visually changes when its window loses focus.
- [ ] **IOS-205** · `SPX-1504` · **Default Button Pulse** — primary action has a restrained finite/persistent emphasis state that stops under reduced motion.
- [ ] **IOS-206** · `SPX-1505` · **Pointer Hotspot Reveal** — controls appear only when pointer enters a specific content region.
- [ ] **IOS-207** · `SPX-1506` · **Hover Action Materialise** — row actions construct at the trailing edge without shifting core content.

## Delete, Archive & Destructive Actions

- [ ] **IOS-208** · `SPX-1507` · **Swipe Action Reveal** — horizontal drag progressively exposes contextual actions behind a row.
- [ ] **IOS-209** · `SPX-1508` · **Swipe Full-Commit** — crossing a destructive threshold converts the drag into automatic completion.
- [ ] **IOS-210** · `SPX-1509` · **Delete Collapse** — removed row contracts vertically and neighbouring rows reclaim its space.
- [ ] **IOS-211** · `SPX-1510` · **Undo Toast Arrival** — destructive completion produces a temporary reversible-action surface.
- [ ] **IOS-212** · `SPX-1511` · **Undo Row Restoration** — deleted row reconstructs into its previous exact list position.
- [ ] **IOS-213** · `SPX-1512` · **Archive Transfer** — item leaves active list and visibly enters an archive destination representation.
- [ ] **IOS-214** · `SPX-1513` · **Destructive Confirmation Hold** — dangerous action requires a short continuous commitment gesture.
- [ ] **IOS-215** · `SPX-1514` · **Recently Deleted Countdown** — deleted object remains recoverable while a finite expiry state progresses.

## Lists & Collections

- [ ] **IOS-216** · `SPX-1515` · **Insert Row Expansion** — new list item creates space first, then its content constructs into the gap.
- [ ] **IOS-217** · `SPX-1516` · **Remove Row Collapse** — content exits before neighbouring rows close the vacated space.
- [ ] **IOS-218** · `SPX-1517` · **Reorder Lift and Gap** — dragged row lifts while an insertion gap moves through the list.
- [ ] **IOS-219** · `SPX-1518` · **Pull to Refresh** — overscroll progressively constructs a refresh state, crosses an activation threshold, then resolves.
- [ ] **IOS-220** · `SPX-1519` · **Section Collapse** — grouped rows compress beneath their header.
- [ ] **IOS-221** · `SPX-1520` · **Section Expand** — hidden rows unfold sequentially while the section retains identity.
- [ ] **IOS-222** · `SPX-1521` · **Pinned Row Swipe** — row transitions into a persistent pinned state with structural marker.
- [ ] **IOS-223** · `SPX-1522` · **Batch Selection Counter** — entering multi-select mode causes selected items to contribute to a shared count.

## Progress & Completion

- [ ] **IOS-224** · `SPX-1523` · **Circular Progress Completion Morph** — progress ring reaches 100% and transforms directly into completion geometry.
- [ ] **IOS-225** · `SPX-1524` · **Download Progress to File** — abstract progress representation becomes the completed downloadable object.
- [ ] **IOS-226** · `SPX-1525` · **Install Progress to Launch** — installation state morphs into an available launch control.
- [ ] **IOS-227** · `SPX-1526` · **Activity Spinner to Result** — indeterminate work resolves into a deterministic success/failure state.
- [ ] **IOS-228** · `SPX-1527` · **Multi-Stage Progress Handoff** — one progress indicator changes meaning between downloading, processing and completing.
- [ ] **IOS-229** · `SPX-1528` · **Progress Cancellation Rewind** — cancelled operation visually relinquishes acquired progress and returns to neutral.
- [ ] **IOS-230** · `SPX-1529` · **Background Progress Condense** — large progress UI compresses into a small persistent status while work continues.

## Error & Validation

- [ ] **IOS-231** · `SPX-1530` · **Invalid Field Shake** — rejected input performs one short lateral refusal movement and returns to its exact position.
- [ ] **IOS-232** · `SPX-1531` · **Validation Success Resolve** — focused field transitions from editing into accepted state with compact confirmation geometry.
- [ ] **IOS-233** · `SPX-1532` · **Inline Error Expansion** — layout creates a dedicated error region beneath a field rather than overlaying content.
- [ ] **IOS-234** · `SPX-1533` · **Form Error Navigation** — submitting invalid form transfers focus to the first failing field.
- [ ] **IOS-235** · `SPX-1534` · **Permission Denied Recoil** — attempted restricted action moves toward completion, hits a boundary and returns.
- [ ] **IOS-236** · `SPX-1535` · **Error Recovery Collapse** — correcting a field causes its inline error region to retract and surrounding layout to settle.

## Material, Blur & Layering

- [ ] **IOS-237** · `SPX-1536` · **Translucent Material Lift** — contextual surface separates from content using layered translucency and boundary treatment.
- [ ] **IOS-238** · `SPX-1537` · **Material Density Transition** — surface changes between thin/compact and denser/high-priority material states.
- [ ] **IOS-239** · `SPX-1538` · **Backdrop Defocus on Modal** — underlying content becomes visually secondary while modal remains crisp.
- [ ] **IOS-240** · `SPX-1539` · **Layered Sheet Depth** — multiple presented sheets establish depth through scale/offset hierarchy.
- [ ] **IOS-241** · `SPX-1540` · **Toolbar Material Condensation** — scrolling content causes a formerly transparent toolbar to gain structural material.
- [ ] **IOS-242** · `SPX-1541` · **Sidebar Material Separation** — navigation region establishes a different material plane from content.
- [ ] **IOS-243** · `SPX-1542` · **Transient HUD Material** — system feedback appears on a compact material plane and retreats after a fixed dwell.

## Vision / Spatial Ideas That Still Work on 2D Web

- [ ] **IOS-244** · `SPX-1543` · **Depth Selection Lift** — selected object moves forward in apparent depth while neighbours remain anchored.
- [ ] **IOS-245** · `SPX-1544` · **Gaze-Like Focus Bloom** — focused control subtly expands its hit/visual region before activation.
- [ ] **IOS-246** · `SPX-1545` · **Spatial Window Placement** — draggable panel previews and commits to fixed spatial zones.
- [ ] **IOS-247** · `SPX-1546` · **Ornament Attachment** — secondary controls attach outside a primary panel without becoming part of its content flow.
- [ ] **IOS-248** · `SPX-1547` · **Immersive Transition Portal** — bounded content expands until it occupies the whole preview plane.
- [ ] **IOS-249** · `SPX-1548` · **Spatial Dismiss Retreat** — foreground content retreats into depth rather than sliding offscreen.

## Tiny Microinteractions

- [ ] **IOS-250** · `SPX-1549` · **Copy Confirmation Morph** — copy icon/control becomes a finite success state then returns.
- [ ] **IOS-251** · `SPX-1550` · **Favourite Heart/Symbol Pop** — selection creates one compact scale/shape response with no particle storm.
- [ ] **IOS-252** · `SPX-1551` · **Refresh Glyph Rotation** — refresh action performs exactly one meaningful rotation tied to request initiation.
- [ ] **IOS-253** · `SPX-1552` · **Share Button Lift** — share control physically establishes an outgoing action before presentation appears.
- [ ] **IOS-254** · `SPX-1553` · **Reveal Password Eye State** — icon geometry changes while text visibility changes simultaneously.
- [ ] **IOS-255** · `SPX-1554` · **Mute State Slash Construct** — audio state change draws/removes a slash rather than swapping unrelated icons.
- [ ] **IOS-256** · `SPX-1555` · **Pin State Dock** — pin action causes the object to settle into a persistent anchored position.
- [ ] **IOS-257** · `SPX-1556` · **More Menu Ellipsis Response** — ellipsis control compresses and hands focus to its resulting menu.
- [ ] **IOS-258** · `SPX-1557` · **Refresh Completion Tick** — completed refresh produces a tiny finite acknowledgement before returning to refresh affordance.

---

## Notes for specimen implementation

- Prefer HTML + CSS.
- Use tiny deterministic JavaScript only when interaction state or pointer/drag tracking genuinely requires it.
- Never depend on parent-window access, storage, network requests, or same-origin iframe privileges.
- Use fixed coordinates, durations, thresholds, and easing values as part of the specimen contract.
- Avoid runtime randomness.
- Preserve the semantic distinction between visually similar effects.
- Every loop must stop under `prefers-reduced-motion` / `data-force-reduced-motion`.
- Interactive specimens should preserve their state semantics under reduced motion even if travel/spring effects disappear.
- Keep source inspiration conceptual. Build original geometry rather than copying Apple assets or screens.
- Treat scaffold requirements as part of the specimen contract.
- Acceptance criteria should describe observable behaviour, counts, thresholds, and final states.

The strongest direction is not “Apple-looking animations.” Extract the interaction logic: **continuity, physical resistance, ownership, hierarchy, compression, thresholds, state morphing, and spatial memory.**
