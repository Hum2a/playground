# Android Specimen Checklist

> Working backlog for portable motion/UI artifacts inspired by Android and Material interaction language. Interaction primitives, not OS replicas. Avoid Google/Pixel product marks, proprietary system artwork, extracted assets, audio, and proprietary fonts.

## How to use

- **AND-NNN** — stable catalogue id (this list).
- **SPX-NNN** — specimen registry ref. Unbuilt ideas are pre-assigned `SPX-1558`…`SPX-1974` — use that ref when implementing; do not invent a different number.
- Non-catalogue specimens (other franchises / originals) use gaps not reserved by open P5 (`SPX-015`–`SPX-312`), P3 (`SPX-400`–`SPX-635`), PK (`SPX-700`–`SPX-965`), DB (`SPX-966`–`SPX-1209`), IOS (`SPX-1300`–`SPX-1557`), or open AND rows; prefer leftover `SPX-313`–`SPX-399`, `SPX-636`–`SPX-699`, `SPX-1210`–`SPX-1299`, or `SPX-1975+`.
- Mark **`[x]`** only when the specimen is registered in `src/specimens/index.ts` with a real `ref` (not `SPX-TODO`) and verified. Agents must update this file in the same change — see `.cursor/rules/37_persona-catalogue.mdc`.
- Progress: **18 / 417** complete.

| Status | Count |
| --- | --- |
| Done | 18 |
| Open | 399 |

## Visual grammar

| Motif | Use for |
| --- | --- |
| Predictive back | edge gesture, destination preview, threshold commit |
| Container transform | card/FAB/list identity-preserving expansion |
| Shared axis | directional hierarchy handoff (X/Y/Z) |
| Touch acknowledgement | ripple, press, bounded feedback |
| System surfaces | shade, QS, snackbar, HUD, permission |
| Boundary deformation | overscroll, stretch, drawer resistance |
| Task ownership | recents, PiP, nearby transfer, drag proxy |
| Compact-to-rich | tile/chip/FAB morph into detailed controls |

## Shipped (mapped to live specimens)

| AND | SPX | Specimen id | Title |
| --- | --- | --- | --- |
| AND-134 | `SPX-1691` | `active-bottom-nav-pill-transfer` | Active Bottom-Nav Pill Transfer |
| AND-126 | `SPX-1683` | `navigation-drawer-edge-pull` | Navigation Drawer Edge Pull |
| AND-118 | `SPX-1675` | `android-bottom-sheet-detent-snap` | Bottom Sheet Detent Snap |
| AND-109 | `SPX-1666` | `snackbar-rise` | Snackbar Rise |
| AND-099 | `SPX-1656` | `heads-up-notification-drop` | Heads-Up Notification Drop |
| AND-090 | `SPX-1647` | `quick-settings-tile-toggle` | Quick Settings Tile Toggle |
| AND-080 | `SPX-1637` | `notification-shade-pull-down` | Notification Shade Pull-Down |
| AND-248 | `SPX-1805` | `recents-card-restore` | Recents Card Restore |
| AND-245 | `SPX-1802` | `app-to-recents-shrink` | App-to-Recents Shrink |
| AND-054 | `SPX-1611` | `home-swipe-up` | Home Swipe Up |
| AND-061 | `SPX-1618` | `app-launch-from-icon` | App Launch from Icon |
| AND-011 | `SPX-1568` | `shared-x-axis-navigation` | Shared X-Axis Navigation |
| AND-020 | `SPX-1577` | `fade-through` | Fade Through |
| AND-036 | `SPX-1593` | `bounded-touch-ripple` | Bounded Touch Ripple |
| AND-002 | `SPX-1559` | `fab-to-composer-transform` | FAB-to-Composer Transform |
| AND-001 | `SPX-1558` | `card-to-detail-container-transform` | Card-to-Detail Container Transform |
| AND-045 | `SPX-1602` | `predictive-back-app-shrink` | Predictive Back App Shrink |
| AND-044 | `SPX-1601` | `predictive-back-edge-pull` | Predictive Back Edge Pull |

## Core first-wave

Curated implementation priority (former Flagship Android Specimens). Same checkbox as the master list — checking either counts.

- [x] **AND-044** · `SPX-1601` · **Predictive Back Edge Pull** — android-back-gesture
- [x] **AND-045** · `SPX-1602` · **Predictive Back App Shrink** — android-back-gesture
- [x] **AND-001** · `SPX-1558` · **Card-to-Detail Container Transform** — material-container-transform
- [x] **AND-002** · `SPX-1559` · **FAB-to-Composer Transform** — material-container-transform
- [x] **AND-020** · `SPX-1577` · **Fade Through** — material-fade-patterns
- [x] **AND-011** · `SPX-1568` · **Shared X-Axis Forward** — shared-axis-transitions
- [x] **AND-036** · `SPX-1593` · **Bounded Touch Ripple** — ripple-touch-feedback
- [x] **AND-061** · `SPX-1618` · **App Launch from Icon** — launcher-home-screen
- [x] **AND-054** · `SPX-1611` · **Home Swipe Up** — gesture-navigation
- [x] **AND-245** · `SPX-1802` · **App-to-Recents Shrink** — android-recents-overview
- [x] **AND-248** · `SPX-1805` · **Recents Card Restore** — android-recents-overview
- [x] **AND-080** · `SPX-1637` · **Shade Pull-Down** — notification-shade
- [x] **AND-090** · `SPX-1647` · **Quick Settings Tile Toggle** — quick-settings
- [x] **AND-099** · `SPX-1656` · **Heads-Up Notification Drop** — android-notifications
- [x] **AND-109** · `SPX-1666` · **Snackbar Rise** — toasts-snackbars-temporary-feedback
- [x] **AND-118** · `SPX-1675` · **Standard Bottom Sheet Drag** — bottom-sheets
- [x] **AND-126** · `SPX-1683` · **Edge Drawer Pull** — navigation-drawer
- [x] **AND-134** · `SPX-1691` · **Active Indicator Pill Slide** — bottom-navigation
- [ ] **AND-193** · `SPX-1750` · **Material Pull-to-Refresh** — pull-to-refresh-overscroll
- [ ] **AND-200** · `SPX-1757` · **Vertical Content Stretch** — android-12-stretch-edge-effects
- [ ] **AND-205** · `SPX-1762` · **Collapsing App Bar** — scroll-behaviour
- [ ] **AND-273** · `SPX-1830` · **Fingerprint Acquisition Field** — biometric-unlock-inspired
- [ ] **AND-257** · `SPX-1814` · **Picture-in-Picture Collapse** — split-screen-multi-window
- [ ] **AND-309** · `SPX-1866` · **Nearby Device Discovery** — nearby-share-quick-share-inspired
- [ ] **AND-311** · `SPX-1868` · **File Transfer Arc** — nearby-share-quick-share-inspired
- [ ] **AND-317** · `SPX-1874` · **Widget Resize Morph** — widgets
- [ ] **AND-323** · `SPX-1880` · **Shape Morph Button-to-Card** — material-you-dynamic-shape-ideas
- [ ] **AND-340** · `SPX-1897` · **Drag Proxy Formation** — drag-drop
- [ ] **AND-383** · `SPX-1940` · **Screenshot Thumbnail Arrival** — screenshot-selection-inspired
- [ ] **AND-398** · `SPX-1955` · **Single-to-Dual Pane Transform** — foldable-adaptive-layout-ideas

## Material Container Transform

- [x] **AND-001** · `SPX-1558` · **Card-to-Detail Container Transform** — a compact card grows into a detail surface while preserving title and container identity.
- [x] **AND-002** · `SPX-1559` · **FAB-to-Composer Transform** — a floating action control expands into a full composer/input surface.
- [ ] **AND-003** · `SPX-1560` · **List Item-to-Detail Transform** — selected row becomes the header/container of its destination.
- [ ] **AND-004** · `SPX-1561` · **Thumbnail-to-Viewer Transform** — image/media thumbnail expands continuously into a larger viewing surface.
- [ ] **AND-005** · `SPX-1562` · **Chip-to-Filter Panel Transform** — compact filter chip becomes a detailed filter configuration surface.
- [ ] **AND-006** · `SPX-1563` · **Button-to-Dialog Transform** — triggering control structurally becomes the dialog it opened.
- [ ] **AND-007** · `SPX-1564` · **Search Pill-to-Results Transform** — compact search surface grows into a full search/results region.
- [ ] **AND-008** · `SPX-1565` · **Mini Player-to-Full Player Transform** — playback strip expands into detailed media controls.
- [ ] **AND-009** · `SPX-1566` · **Calendar Cell-to-Event Transform** — date/event cell expands into contextual event details.
- [ ] **AND-010** · `SPX-1567` · **Avatar-to-Profile Transform** — identity token expands into a compact profile card.

## Shared Axis Transitions

- [x] **AND-011** · `SPX-1568` · **Shared X-Axis Forward** — outgoing content leaves left while incoming content enters right with depth/opacity hierarchy.
- [ ] **AND-012** · `SPX-1569` · **Shared X-Axis Back** — reverse navigation restores previous spatial context.
- [ ] **AND-013** · `SPX-1570` · **Shared Y-Axis Advance** — vertical hierarchy transition for sequential steps or stacked content.
- [ ] **AND-014** · `SPX-1571` · **Shared Y-Axis Return** — reverse vertical hierarchy restoration.
- [ ] **AND-015** · `SPX-1572` · **Shared Z-Axis Enter** — incoming content gains prominence through scale/depth rather than directional travel.
- [ ] **AND-016** · `SPX-1573` · **Shared Z-Axis Exit** — current content recedes while destination becomes dominant.
- [ ] **AND-017** · `SPX-1574` · **Stepper Shared-Axis Handoff** — multi-step form transfers between steps using one coherent axis.
- [ ] **AND-018** · `SPX-1575` · **Tab Shared-Axis Swap** — tab content changes using directional ownership.
- [ ] **AND-019** · `SPX-1576` · **Settings Hierarchy Advance** — preference category opens with restrained spatial progression.

## Material Fade Patterns

- [x] **AND-020** · `SPX-1577` · **Fade Through** — outgoing content fades first, then incoming content establishes itself after a short gap.
- [ ] **AND-021** · `SPX-1578` · **Fade Through with Scale** — content replacement uses opacity plus restrained scale hierarchy.
- [ ] **AND-022** · `SPX-1579` · **Crossfade with Persistent Header** — body content swaps while header remains anchored.
- [ ] **AND-023** · `SPX-1580` · **Staggered Fade Through** — child elements enter in deterministic groups after parent transition.
- [ ] **AND-024** · `SPX-1581` · **Icon State Fade Through** — one semantic icon state yields to another without both being fully visible simultaneously.
- [ ] **AND-025** · `SPX-1582` · **Empty-to-Content Fade Through** — empty state relinquishes the surface before loaded content enters.

## Floating Action Button Motion

- [ ] **AND-026** · `SPX-1583` · **FAB Press Compression** — circular action control compresses under contact and rebounds on activation.
- [ ] **AND-027** · `SPX-1584` · **FAB Expand to Sheet** — floating action control grows into a larger action surface.
- [ ] **AND-028** · `SPX-1585` · **FAB Morph to Composer** — FAB becomes a text-entry/composer container.
- [ ] **AND-029** · `SPX-1586` · **Extended FAB Collapse** — label-bearing FAB contracts into icon-only state as content scrolls.
- [ ] **AND-030** · `SPX-1587` · **Extended FAB Expand** — compact FAB regains label when contextual space returns.
- [ ] **AND-031** · `SPX-1588` · **FAB Hide on Scroll** — downward scroll causes the action to retreat; upward scroll restores it.
- [ ] **AND-032** · `SPX-1589` · **FAB Speed Dial** — one action expands into a finite radial/vertical family of related actions.
- [ ] **AND-033** · `SPX-1590` · **FAB Relocation** — FAB moves between anchored positions when navigation/system geometry changes.
- [ ] **AND-034** · `SPX-1591` · **FAB Success Morph** — action glyph becomes finite completion geometry before restoring.
- [ ] **AND-035** · `SPX-1592` · **FAB Loading State** — action boundary temporarily carries deterministic progress.

## Ripple & Touch Feedback

- [x] **AND-036** · `SPX-1593` · **Bounded Touch Ripple** — contact produces a radial response clipped to the control boundary.
- [ ] **AND-037** · `SPX-1594` · **Unbounded Icon Ripple** — compact icon control produces a restrained radial touch field beyond glyph bounds.
- [ ] **AND-038** · `SPX-1595` · **Ripple from Pointer Origin** — radial response originates at exact contact coordinates.
- [ ] **AND-039** · `SPX-1596` · **Ripple-to-Selected State** — touch response resolves into persistent selected backing.
- [ ] **AND-040** · `SPX-1597` · **Ripple Interrupted by Drag** — touch ripple begins but cancels cleanly when gesture becomes a drag.
- [ ] **AND-041** · `SPX-1598` · **Keyboard Activation Ripple Alternative** — keyboard activation receives equivalent non-pointer feedback.
- [ ] **AND-042** · `SPX-1599` · **Multi-Touch Ripple Study** — several fixed contact points generate independent clipped ripples.
- [ ] **AND-043** · `SPX-1600` · **Ripple Boundary Collision** — expanding touch field visibly clips against irregular control geometry.

## Android Back Gesture

- [x] **AND-044** · `SPX-1601` · **Predictive Back Edge Pull** — edge gesture progressively previews the destination before commit.
- [x] **AND-045** · `SPX-1602` · **Predictive Back App Shrink** — current surface scales/rounds as back gesture advances.
- [ ] **AND-046** · `SPX-1603` · **Predictive Back Destination Reveal** — previous surface becomes increasingly legible under the active page.
- [ ] **AND-047** · `SPX-1604` · **Predictive Back Cancel** — insufficient gesture returns current surface to exact original state.
- [ ] **AND-048** · `SPX-1605` · **Predictive Back Commit** — threshold/velocity release completes navigation.
- [ ] **AND-049** · `SPX-1606` · **Back-to-Home Preview** — app surface contracts toward a launcher/home context.
- [ ] **AND-050** · `SPX-1607` · **Back-to-Previous-Task Preview** — current task reveals the task beneath.
- [ ] **AND-051** · `SPX-1608` · **Back Gesture Arrow Progress** — edge arrow changes geometry as gesture confidence increases.
- [ ] **AND-052** · `SPX-1609` · **Back Boundary Resistance** — invalid/no-history back gesture resists and returns.
- [ ] **AND-053** · `SPX-1610` · **Nested Back Ownership** — inner panel consumes back before outer navigation.

## Gesture Navigation

- [x] **AND-054** · `SPX-1611` · **Home Swipe Up** — current application surface follows an upward gesture and contracts toward home.
- [ ] **AND-055** · `SPX-1612` · **Recents Swipe and Hold** — upward gesture transitions from home intent into overview/task-switching intent after hold threshold.
- [ ] **AND-056** · `SPX-1613` · **Quick App Switch Swipe** — bottom-edge horizontal gesture transfers between adjacent app/task surfaces.
- [ ] **AND-057** · `SPX-1614` · **Gesture Cancel Return** — incomplete home/recents gesture restores application surface.
- [ ] **AND-058** · `SPX-1615` · **Bottom Gesture Handle Response** — gesture region subtly responds to active navigation.
- [ ] **AND-059** · `SPX-1616` · **App-to-Home Icon Return** — closing app contracts toward its originating launcher tile.
- [ ] **AND-060** · `SPX-1617` · **Gesture Tutorial Trail** — finite guided path demonstrates a gesture without becoming a looping tutorial.

## Launcher / Home Screen

- [x] **AND-061** · `SPX-1618` · **App Launch from Icon** — launcher tile expands into application surface from exact grid coordinates.
- [ ] **AND-062** · `SPX-1619` · **App Close to Icon** — application contracts back into its originating launcher position.
- [ ] **AND-063** · `SPX-1620` · **Launcher Page Swipe** — app-grid pages move as coherent spatial planes.
- [ ] **AND-064** · `SPX-1621` · **Icon Reorder Gap** — dragged launcher item creates one moving insertion gap.
- [ ] **AND-065** · `SPX-1622` · **Folder Open Transform** — grouped icon tile expands into a local grid.
- [ ] **AND-066** · `SPX-1623` · **Folder Close Transform** — local grid condenses back into grouped tile.
- [ ] **AND-067** · `SPX-1624` · **Widget Placement Preview** — dragged widget displays potential occupied grid cells before drop.
- [ ] **AND-068** · `SPX-1625` · **Widget Resize Handles** — selected widget reveals constrained resize anchors.
- [ ] **AND-069** · `SPX-1626` · **Home Search Expansion** — compact launcher search field becomes a richer results surface.
- [ ] **AND-070** · `SPX-1627` · **At-a-Glance Expansion** — compact status module expands into contextual detail.
- [ ] **AND-071** · `SPX-1628` · **Icon Long-Press Lift** — launcher icon lifts before contextual shortcuts appear.
- [ ] **AND-072** · `SPX-1629` · **Home Edit Mode Settle** — grid enters a structured editing state.

## App Drawer

- [ ] **AND-073** · `SPX-1630` · **App Drawer Rise** — application drawer follows upward drag from launcher.
- [ ] **AND-074** · `SPX-1631` · **Drawer Interactive Dismiss** — downward gesture progressively returns to home.
- [ ] **AND-075** · `SPX-1632` · **Drawer Search Pin** — search control becomes pinned as app list moves.
- [ ] **AND-076** · `SPX-1633` · **Alphabet Index Scrub** — side index rapidly relocates through application groups.
- [ ] **AND-077** · `SPX-1634` · **Drawer Section Snap** — app groups settle to deterministic section boundaries.
- [ ] **AND-078** · `SPX-1635` · **Drawer Search Result Reflow** — app grid condenses into filtered results.
- [ ] **AND-079** · `SPX-1636` · **Keyboard/App Drawer Avoidance** — drawer content reorganises around active search keyboard region.

## Notification Shade

- [x] **AND-080** · `SPX-1637` · **Shade Pull-Down** — notification surface follows direct downward gesture from top edge.
- [ ] **AND-081** · `SPX-1638` · **Shade Partial-to-Full Expansion** — compact shade becomes fully expanded shade at a second detent.
- [ ] **AND-082** · `SPX-1639` · **Shade Dismiss Upward** — shade follows upward gesture and returns to application.
- [ ] **AND-083** · `SPX-1640` · **Notification Stack Expansion** — compressed notifications separate into readable cards.
- [ ] **AND-084** · `SPX-1641` · **Notification Stack Compression** — expanded notifications condense into layered groups.
- [ ] **AND-085** · `SPX-1642` · **Shade Header Compression** — status/header geometry changes between shade detents.
- [ ] **AND-086** · `SPX-1643` · **Notification Group Expand** — one grouped notification opens its child events.
- [ ] **AND-087** · `SPX-1644` · **Notification Group Collapse** — child notifications compress back under group summary.
- [ ] **AND-088** · `SPX-1645` · **Shade Overscroll Resistance** — pulling beyond full expansion produces increasing resistance.
- [ ] **AND-089** · `SPX-1646` · **Shade Scrim Progress** — background hierarchy changes proportionally with pull distance.

## Quick Settings

- [x] **AND-090** · `SPX-1647` · **Quick Settings Tile Toggle** — tile changes state through ripple, icon treatment and persistent selected backing.
- [ ] **AND-091** · `SPX-1648` · **Quick Settings Expansion** — compact tile row becomes a larger configurable grid.
- [ ] **AND-092** · `SPX-1649` · **Quick Settings Tile Detail** — long press/secondary action expands tile into detailed controls.
- [ ] **AND-093** · `SPX-1650` · **Brightness Slider Pickup** — thumb enlarges and value response appears during drag.
- [ ] **AND-094** · `SPX-1651` · **Quick Settings Reorder** — tile drag creates a deterministic insertion gap.
- [ ] **AND-095** · `SPX-1652` · **Tile Loading to Active** — background operation resolves tile into active state.
- [ ] **AND-096** · `SPX-1653` · **Connectivity Tile State Morph** — disconnected/searching/connected states reuse one tile geometry.
- [ ] **AND-097** · `SPX-1654` · **Tile Unavailable Recoil** — unavailable setting rejects interaction once and returns.
- [ ] **AND-098** · `SPX-1655` · **Quick Settings Pagination** — tile pages snap with active page indicator transfer.

## Android Notifications

- [x] **AND-099** · `SPX-1656` · **Heads-Up Notification Drop** — alert enters from top edge and temporarily overlays current task.
- [ ] **AND-100** · `SPX-1657` · **Heads-Up Expand** — compact alert becomes actionable notification.
- [ ] **AND-101** · `SPX-1658` · **Notification Swipe Dismiss** — horizontal gesture dismisses notification past threshold.
- [ ] **AND-102** · `SPX-1659` · **Notification Action Resolve** — inline action transforms card into result state before removal.
- [ ] **AND-103** · `SPX-1660` · **Conversation Notification Expand** — messaging alert reveals conversation actions/replies.
- [ ] **AND-104** · `SPX-1661` · **Notification Snooze Reveal** — partial swipe exposes a secondary timing action.
- [ ] **AND-105** · `SPX-1662` · **Notification Reply Expansion** — compact reply action creates inline input.
- [ ] **AND-106** · `SPX-1663` · **Notification Progress Update** — one notification updates deterministic progress without replacement flicker.
- [ ] **AND-107** · `SPX-1664` · **Silent Notification Compression** — low-priority notifications condense into a quieter group.
- [ ] **AND-108** · `SPX-1665` · **Notification Timeout Retreat** — transient heads-up surface leaves after fixed dwell.

## Toasts, Snackbars & Temporary Feedback

- [x] **AND-109** · `SPX-1666` · **Snackbar Rise** — temporary feedback surface enters from lower edge and settles.
- [ ] **AND-110** · `SPX-1667` · **Snackbar Action Resolve** — UNDO/ACTION changes the snackbar into a finite result state.
- [ ] **AND-111** · `SPX-1668` · **Snackbar Replacement** — a new message replaces current snackbar without stacking uncontrolled surfaces.
- [ ] **AND-112** · `SPX-1669` · **Snackbar Queue Handoff** — queued feedback items transfer through one persistent container.
- [ ] **AND-113** · `SPX-1670` · **Toast Materialise** — compact passive feedback appears, dwells, and retreats.
- [ ] **AND-114** · `SPX-1671` · **Undo Snackbar Restore** — removed content reconstructs into previous position after UNDO.
- [ ] **AND-115** · `SPX-1672` · **Snackbar Swipe Dismiss** — direct gesture removes temporary feedback.
- [ ] **AND-116** · `SPX-1673` · **Anchored Snackbar Avoidance** — snackbar shifts when a FAB/bottom bar occupies its normal region.

## Bottom Sheets

- [ ] **AND-117** · `SPX-1674` · **Modal Bottom Sheet Rise** — sheet enters from bottom while background becomes secondary.
- [x] **AND-118** · `SPX-1675` · **Standard Bottom Sheet Drag** — persistent sheet moves between fixed detents.
- [ ] **AND-119** · `SPX-1676` · **Bottom Sheet Half-to-Full Snap** — sheet chooses medium/full state from release position and velocity.
- [ ] **AND-120** · `SPX-1677` · **Sheet Dismiss Threshold** — downward drag converts from resize into dismissal.
- [ ] **AND-121** · `SPX-1678` · **Sheet Overscroll Resistance** — drag beyond maximum detent meets rubber-band resistance.
- [ ] **AND-122** · `SPX-1679` · **Sheet Content Progressive Reveal** — detail appears as sheet crosses semantic height thresholds.
- [ ] **AND-123** · `SPX-1680` · **Sheet Handle Acquisition** — drag handle enters active state on pickup.
- [ ] **AND-124** · `SPX-1681` · **Sheet-to-Dialog Transform** — sheet changes into centred dialog at wider layout.
- [ ] **AND-125** · `SPX-1682` · **Nested Sheet Handoff** — inner sheet replaces outer while preserving source context.

## Navigation Drawer

- [x] **AND-126** · `SPX-1683` · **Edge Drawer Pull** — drawer follows direct horizontal drag from screen edge.
- [ ] **AND-127** · `SPX-1684` · **Drawer Commit/Cancel** — release threshold determines open or closed state.
- [ ] **AND-128** · `SPX-1685` · **Drawer Item Selection Transfer** — one shared selected backing moves between destinations.
- [ ] **AND-129** · `SPX-1686` · **Drawer Content Parallax** — underlying content shifts slightly while drawer advances.
- [ ] **AND-130** · `SPX-1687` · **Drawer Scrim Progress** — background hierarchy follows drawer percentage.
- [ ] **AND-131** · `SPX-1688` · **Drawer Nested Section Expansion** — navigation group opens without replacing entire drawer.
- [ ] **AND-132** · `SPX-1689` · **Drawer Edge Resistance** — drawer resists being pulled beyond full-open position.

## Bottom Navigation

- [ ] **AND-133** · `SPX-1690` · **Bottom Nav Selection Transfer** — selected state moves between destinations with icon/label hierarchy.
- [x] **AND-134** · `SPX-1691` · **Active Indicator Pill Slide** — one backing pill moves continuously between navigation items.
- [ ] **AND-135** · `SPX-1692` · **Destination Content Fade Through** — content changes using Material-style fade-through.
- [ ] **AND-136** · `SPX-1693` · **Label Reveal on Selection** — active destination gains label while inactive destinations simplify.
- [ ] **AND-137** · `SPX-1694` · **Bottom Nav Hide on Scroll** — bar retreats during downward content motion and returns upward.
- [ ] **AND-138** · `SPX-1695` · **Badge Arrival** — notification count constructs onto a navigation item.
- [ ] **AND-139** · `SPX-1696` · **Badge Clear Morph** — badge resolves into cleared state without popping away abruptly.

## Navigation Rail

- [ ] **AND-140** · `SPX-1697` · **Rail Selection Pill Transfer** — shared active indicator moves vertically between destinations.
- [ ] **AND-141** · `SPX-1698` · **Rail Expand to Drawer** — compact navigation rail becomes a wider labelled drawer.
- [ ] **AND-142** · `SPX-1699` · **Rail Badge Transfer** — status marker follows semantic destination changes.
- [ ] **AND-143** · `SPX-1700` · **Rail Hover/Focus Reveal** — labels or actions become more explicit under desktop-like pointer/focus interaction.

## Tabs

- [ ] **AND-144** · `SPX-1701` · **Tab Indicator Slide** — one underline/pill tracks selection between tabs.
- [ ] **AND-145** · `SPX-1702` · **Scrollable Tab Momentum** — selected offscreen tab causes restrained tab-strip repositioning.
- [ ] **AND-146** · `SPX-1703` · **Tab Content Shared Axis** — content direction reflects selected tab direction.
- [ ] **AND-147** · `SPX-1704` · **Tab Indicator Stretch** — active marker elongates while travelling then returns to normal width.
- [ ] **AND-148** · `SPX-1705` · **Tab Re-selection Pulse** — selecting current tab produces finite content-to-top acknowledgement.
- [ ] **AND-149** · `SPX-1706` · **Tab Badge Arrival** — status badge appears without disturbing tab alignment.

## Chips

- [ ] **AND-150** · `SPX-1707` · **Filter Chip Selection** — chip gains selected backing/check state after touch response.
- [ ] **AND-151** · `SPX-1708` · **Input Chip Formation** — typed value condenses into a discrete removable token.
- [ ] **AND-152** · `SPX-1709` · **Chip Removal Collapse** — removed chip contracts and neighbouring chips reflow.
- [ ] **AND-153** · `SPX-1710` · **Choice Chip Transfer** — mutually exclusive selection ownership moves between chips.
- [ ] **AND-154** · `SPX-1711` · **Assist Chip Action Resolve** — compact suggestion transforms into acknowledged state.
- [ ] **AND-155** · `SPX-1712` · **Chip Overflow Reflow** — chip group recomputes rows while preserving order.

## Material Buttons

- [ ] **AND-156** · `SPX-1713` · **Filled Button Press** — ripple plus subtle compression communicates contact.
- [ ] **AND-157** · `SPX-1714` · **Button Loading Morph** — label becomes finite progress state inside same boundary.
- [ ] **AND-158** · `SPX-1715` · **Button Success Morph** — progress/action resolves into completion geometry.
- [ ] **AND-159** · `SPX-1716` · **Tonal Button State Transfer** — visual hierarchy changes between normal/selected/disabled states.
- [ ] **AND-160** · `SPX-1717` · **Outlined Button Boundary Draw** — focus/selection reinforces the existing boundary.
- [ ] **AND-161** · `SPX-1718` · **Destructive Button Hold** — dangerous action requires short sustained commitment.

## Switches, Sliders & Selection Controls

- [ ] **AND-162** · `SPX-1719` · **Material Switch Toggle** — thumb and track change together through one state transition.
- [ ] **AND-163** · `SPX-1720` · **Slider Thumb Pickup** — thumb enlarges and exposes precision feedback while dragging.
- [ ] **AND-164** · `SPX-1721` · **Slider Tick Acquisition** — thumb snaps onto discrete tick positions.
- [ ] **AND-165** · `SPX-1722` · **Checkbox Draw** — selection mark constructs inside persistent checkbox geometry.
- [ ] **AND-166** · `SPX-1723` · **Radio Ownership Transfer** — active centre transfers between mutually exclusive options.
- [ ] **AND-167** · `SPX-1724` · **Range Slider Dual-Thumb Handoff** — two handles preserve ordering while editing a range.
- [ ] **AND-168** · `SPX-1725` · **Switch Loading Lock** — asynchronous state temporarily locks thumb then resolves.
- [ ] **AND-169** · `SPX-1726` · **Disabled Control State Collapse** — interaction affordance structurally quietens while remaining legible.

## Text Fields

- [ ] **AND-170** · `SPX-1727` · **Floating Label Lift** — placeholder/label relocates into compact field label on focus.
- [ ] **AND-171** · `SPX-1728` · **Underline Focus Expansion** — field focus line expands from contact/focus origin.
- [ ] **AND-172** · `SPX-1729` · **Outlined Label Notch** — field label creates/occupies a notch in outlined boundary.
- [ ] **AND-173** · `SPX-1730` · **Validation Error Expansion** — supporting error text creates layout space below field.
- [ ] **AND-174** · `SPX-1731` · **Password Visibility Morph** — visibility control changes state without swapping unrelated assets.
- [ ] **AND-175** · `SPX-1732` · **Character Counter Arrival** — counter becomes visible near a configured limit.
- [ ] **AND-176** · `SPX-1733` · **Autocomplete Dropdown Materialise** — suggestions expand from field boundary.
- [ ] **AND-177** · `SPX-1734` · **Text Field Clear Action** — trailing clear control appears only when meaningful.

## Search

- [ ] **AND-178** · `SPX-1735` · **Search Bar Activation** — static search surface gains focus and reorganises surrounding content.
- [ ] **AND-179** · `SPX-1736` · **Search Bar-to-View Transform** — search bar expands into dedicated search experience.
- [ ] **AND-180** · `SPX-1737` · **Search Suggestions Cascade** — deterministic result rows construct as query becomes active.
- [ ] **AND-181** · `SPX-1738` · **Search Result Shared Element** — selected result becomes destination header/card.
- [ ] **AND-182** · `SPX-1739` · **Voice Search Listening State** — search field becomes abstract audio acquisition state.
- [ ] **AND-183** · `SPX-1740` · **Search Clear Reversion** — clearing query reconstructs default suggestions/history.
- [ ] **AND-184** · `SPX-1741` · **Search Token Filters** — query filters condense into removable chips.

## Lists

- [ ] **AND-185** · `SPX-1742` · **List Row Insert Expansion** — new item creates vertical space then constructs its contents.
- [ ] **AND-186** · `SPX-1743` · **List Row Delete Collapse** — item content exits before neighbours reclaim its height.
- [ ] **AND-187** · `SPX-1744` · **List Reorder Lift** — selected row becomes drag proxy and leaves one insertion gap.
- [ ] **AND-188** · `SPX-1745` · **Swipe Action Reveal** — horizontal row gesture reveals contextual action.
- [ ] **AND-189** · `SPX-1746` · **Swipe Full Commit** — crossing threshold automatically executes action.
- [ ] **AND-190** · `SPX-1747` · **Expandable List Row** — supporting content unfolds beneath selected row.
- [ ] **AND-191** · `SPX-1748` · **Selection Mode Transition** — list enters multi-select mode and toolbar semantics change.
- [ ] **AND-192** · `SPX-1749` · **Sticky Section Header Handoff** — next section header replaces pinned previous header.

## Pull-to-Refresh & Overscroll

- [ ] **AND-193** · `SPX-1750` · **Material Pull-to-Refresh** — resisted top overscroll crosses a refresh threshold.
- [ ] **AND-194** · `SPX-1751` · **Refresh Indicator Acquisition** — partial pull progressively constructs refresh geometry.
- [ ] **AND-195** · `SPX-1752` · **Refresh Commit Spin** — committed refresh performs a finite deterministic work cycle.
- [ ] **AND-196** · `SPX-1753` · **Stretch Overscroll** — content subtly stretches near scroll boundary instead of moving freely beyond it.
- [ ] **AND-197** · `SPX-1754` · **Bottom Overscroll Stretch** — list footer region stretches at content end.
- [ ] **AND-198** · `SPX-1755` · **Horizontal Overscroll Stretch** — pager boundary communicates no-more-content through deformation.
- [ ] **AND-199** · `SPX-1756` · **Refresh Cancel Rewind** — below-threshold indicator reconstructs back to neutral.

## Android 12+ Stretch / Edge Effects

- [ ] **AND-200** · `SPX-1757` · **Vertical Content Stretch** — overscroll scales content non-uniformly along the gesture axis.
- [ ] **AND-201** · `SPX-1758` · **Horizontal Content Stretch** — pager edge deforms with constrained stretch.
- [ ] **AND-202** · `SPX-1759` · **Nested Stretch Propagation** — inner content reaches boundary and transfers a smaller response to outer container.
- [ ] **AND-203** · `SPX-1760` · **Stretch Release Settle** — deformation returns with a finite spring.
- [ ] **AND-204** · `SPX-1761` · **Stretch Threshold Marker** — semantic action threshold appears within stretch interaction.

## Scroll Behaviour

- [ ] **AND-205** · `SPX-1762` · **Collapsing App Bar** — large top app bar condenses into compact toolbar as content scrolls.
- [ ] **AND-206** · `SPX-1763` · **Flexible Header Collapse** — image/title region compresses while key actions remain available.
- [ ] **AND-207** · `SPX-1764` · **Pinned Toolbar Handoff** — inline control group becomes fixed after reaching top boundary.
- [ ] **AND-208** · `SPX-1765` · **FAB Scroll Hide/Show** — scroll direction controls FAB visibility.
- [ ] **AND-209** · `SPX-1766` · **Bottom Bar Scroll Hide/Show** — navigation retreats and returns based on scroll direction.
- [ ] **AND-210** · `SPX-1767` · **Parallax Header** — background content travels at a reduced scroll ratio.
- [ ] **AND-211** · `SPX-1768` · **Scroll-to-Top Acknowledgement** — reselecting active destination returns content to top with finite feedback.

## Top App Bars

- [ ] **AND-212** · `SPX-1769` · **Large App Bar Collapse** — large title transitions into compact toolbar title.
- [ ] **AND-213** · `SPX-1770` · **Medium App Bar Collapse** — intermediate title region compresses under scroll.
- [ ] **AND-214** · `SPX-1771` · **Contextual Action Bar Enter** — normal toolbar transforms into selection/action mode.
- [ ] **AND-215** · `SPX-1772` · **Contextual Action Bar Exit** — action mode returns to ordinary navigation.
- [ ] **AND-216** · `SPX-1773` · **Toolbar Action Overflow** — overflow menu originates from trailing toolbar action.
- [ ] **AND-217** · `SPX-1774` · **Toolbar Subtitle Compression** — secondary context disappears before primary title.

## Dialogs

- [ ] **AND-218** · `SPX-1775` · **Material Dialog Materialise** — dialog establishes itself through scale/fade hierarchy.
- [ ] **AND-219** · `SPX-1776` · **Dialog-to-Button Return** — dismissal returns visual ownership toward launch control.
- [ ] **AND-220** · `SPX-1777` · **Full-Screen Dialog Advance** — large editing dialog uses shared-axis navigation internally.
- [ ] **AND-221** · `SPX-1778` · **Confirmation State Resolve** — confirm action changes dialog into deterministic working/result state.
- [ ] **AND-222** · `SPX-1779` · **Dialog Error Recoil** — invalid confirmation produces one finite refusal response.
- [ ] **AND-223** · `SPX-1780` · **Dialog Content Height Morph** — optional details expand without recreating entire dialog.

## Menus

- [ ] **AND-224** · `SPX-1781` · **Anchored Dropdown Menu** — menu expands from exact source control.
- [ ] **AND-225** · `SPX-1782` · **Menu Selection Ripple** — selected item resolves touch feedback into persistent choice.
- [ ] **AND-226** · `SPX-1783` · **Submenu Expansion** — nested action surface establishes ownership from parent row.
- [ ] **AND-227** · `SPX-1784` · **Menu Height Reflow** — filtering/context changes row count while boundary adapts.
- [ ] **AND-228** · `SPX-1785` · **Menu Edge Reposition** — constrained menu changes opening direction while preserving anchor.

## Tooltips

- [ ] **AND-229** · `SPX-1786` · **Long-Press Tooltip** — compact label appears after a deterministic hold.
- [ ] **AND-230** · `SPX-1787` · **Hover Tooltip Materialise** — desktop Android/web-style pointer hover produces anchored helper surface.
- [ ] **AND-231** · `SPX-1788` · **Tooltip Anchor Reposition** — tooltip stays in bounds while maintaining connector ownership.
- [ ] **AND-232** · `SPX-1789` · **Tooltip Timeout Retreat** — helper surface leaves after fixed dwell.

## Progress Indicators

- [ ] **AND-233** · `SPX-1790` · **Circular Determinate Progress** — ring advances through fixed measurable values.
- [ ] **AND-234** · `SPX-1791` · **Circular Indeterminate to Result** — looping work indicator resolves into a finite result using same geometry.
- [ ] **AND-235** · `SPX-1792` · **Linear Determinate Progress** — track advances through fixed stages.
- [ ] **AND-236** · `SPX-1793` · **Linear Indeterminate Resolve** — moving segment becomes deterministic completion.
- [ ] **AND-237** · `SPX-1794` · **Progress-to-Action Morph** — completed progress becomes OPEN/CONTINUE action.
- [ ] **AND-238** · `SPX-1795` · **Segmented Multi-Stage Progress** — progress changes meaning between download/process/install.
- [ ] **AND-239** · `SPX-1796` · **Progress Cancellation Rewind** — cancelled operation relinquishes acquired progress.

## Loading & Skeleton States

- [ ] **AND-240** · `SPX-1797` · **Skeleton-to-Content Reveal** — placeholder geometry becomes actual content structure.
- [ ] **AND-241** · `SPX-1798` · **Shimmer Stop-and-Resolve** — loading shimmer runs only while needed then resolves deterministically.
- [ ] **AND-242** · `SPX-1799` · **Card Skeleton Stagger** — multiple content blocks resolve in fixed sequence.
- [ ] **AND-243** · `SPX-1800` · **Image Placeholder Materialise** — placeholder becomes media without layout shift.
- [ ] **AND-244** · `SPX-1801` · **Refresh Skeleton Partial Update** — only changed content regions return to loading state.

## Android Recents / Overview

- [x] **AND-245** · `SPX-1802` · **App-to-Recents Shrink** — current task contracts into an overview card.
- [ ] **AND-246** · `SPX-1803` · **Recents Horizontal Paging** — task cards move with snap/velocity semantics.
- [ ] **AND-247** · `SPX-1804` · **Recents Card Dismiss** — upward swipe removes a task from overview.
- [x] **AND-248** · `SPX-1805` · **Recents Card Restore** — selected task expands back into full application surface.
- [ ] **AND-249** · `SPX-1806` · **Recents Adjacent Task Reveal** — current task shifts to expose neighbouring task.
- [ ] **AND-250** · `SPX-1807` · **Recents Clear-All Arrival** — terminal action appears only near end of task list.
- [ ] **AND-251** · `SPX-1808` · **Screenshot Action Acquisition** — overview task exposes contextual capture action.
- [ ] **AND-252** · `SPX-1809` · **Split-Screen Selection Handoff** — task card moves into one half of split layout.

## Split Screen / Multi-Window

- [ ] **AND-253** · `SPX-1810` · **Split Divider Drag** — divider directly reallocates space between two surfaces.
- [ ] **AND-254** · `SPX-1811` · **Split App Acquisition** — selected task docks into one side while chooser occupies the other.
- [ ] **AND-255** · `SPX-1812` · **Split Dismiss Threshold** — dragging divider past threshold removes one surface.
- [ ] **AND-256** · `SPX-1813` · **Split Orientation Reflow** — two panes reorganise when available aspect ratio changes.
- [ ] **AND-257** · `SPX-1814` · **Picture-in-Picture Collapse** — full media/app surface contracts into floating mini-window.
- [ ] **AND-258** · `SPX-1815` · **Picture-in-Picture Restore** — mini-window expands back into owning application.
- [ ] **AND-259** · `SPX-1816` · **PiP Edge Magnetism** — floating mini-window gravitates toward valid screen-edge anchors.
- [ ] **AND-260** · `SPX-1817` · **PiP Stash** — mini-window partially retreats offscreen while retaining a visible handle.

## Picture-in-Picture

- [ ] **AND-261** · `SPX-1818` · **Full Player to PiP** — player contracts toward fixed floating destination.
- [ ] **AND-262** · `SPX-1819` · **PiP to Full Player** — floating window reconstructs into full playback context.
- [ ] **AND-263** · `SPX-1820` · **PiP Drag & Edge Snap** — free drag resolves to nearest valid edge anchor.
- [ ] **AND-264** · `SPX-1821` · **PiP Controls Materialise** — controls appear temporarily after interaction.
- [ ] **AND-265** · `SPX-1822` · **PiP Resize Snap** — floating window changes between predefined sizes.
- [ ] **AND-266** · `SPX-1823` · **PiP Dismiss Fling** — strong gesture commits removal.

## Lock Screen / Always-On Inspired

- [ ] **AND-267** · `SPX-1824` · **Wake Information Expansion** — low-information state becomes richer active state.
- [ ] **AND-268** · `SPX-1825` · **Notification Wake Arrival** — incoming alert gains prominence without reconstructing entire screen.
- [ ] **AND-269** · `SPX-1826` · **Charging State Bloom** — power connection produces finite charging confirmation.
- [ ] **AND-270** · `SPX-1827` · **Always-On to Active Transition** — persistent information restores into interactive hierarchy.
- [ ] **AND-271** · `SPX-1828` · **Lock Notification Stack Expansion** — grouped alerts become individually readable.
- [ ] **AND-272** · `SPX-1829` · **Media Control Wake Expansion** — compact playback state gains controls after interaction.

## Biometric / Unlock Inspired

- [ ] **AND-273** · `SPX-1830` · **Fingerprint Acquisition Field** — abstract touch target progressively acquires fixed ridge/segment geometry.
- [ ] **AND-274** · `SPX-1831` · **Fingerprint Success Resolve** — acquisition geometry becomes verified state.
- [ ] **AND-275** · `SPX-1832` · **Fingerprint Failure Pulse** — failed acquisition rejects once and returns to retry state.
- [ ] **AND-276** · `SPX-1833` · **Under-Display Sensor Prompt** — touch region gains finite acquisition guidance.
- [ ] **AND-277** · `SPX-1834` · **Unlock-to-Content Handoff** — verified state transfers into application/home context.
- [ ] **AND-278** · `SPX-1835` · **Biometric Timeout Reset** — unresolved request expires to neutral state.

## Keyboard / IME

- [ ] **AND-279** · `SPX-1836` · **Keyboard Rise & Content Avoidance** — focused field remains visible while input region enters.
- [ ] **AND-280** · `SPX-1837` · **Keyboard Interactive Dismiss** — downward gesture moves keyboard/content together.
- [ ] **AND-281** · `SPX-1838` · **Suggestion Strip Acceptance** — suggestion transfers into text stream.
- [ ] **AND-282** · `SPX-1839` · **Voice Input Listening** — keyboard/input area becomes abstract listening state.
- [ ] **AND-283** · `SPX-1840` · **Emoji Panel Swap** — keyboard content plane changes while input remains focused.
- [ ] **AND-284** · `SPX-1841` · **Keyboard Resize Reflow** — content adapts to changing input-panel height.

## Permission & System Prompts

- [ ] **AND-285** · `SPX-1842` · **Permission Prompt Materialise** — compact system decision surface gains priority over app context.
- [ ] **AND-286** · `SPX-1843` · **Permission Grant Resolve** — selected action returns ownership to application with enabled state.
- [ ] **AND-287** · `SPX-1844` · **Permission Denial Recoil** — attempted feature fails gracefully and restores context.
- [ ] **AND-288** · `SPX-1845` · **One-Time Permission Countdown Concept** — temporary permission state visibly remains bounded.
- [ ] **AND-289** · `SPX-1846` · **System Picker Handoff** — application action transfers into external/system selection surface.
- [ ] **AND-290** · `SPX-1847` · **Permission Education Expansion** — app explanation panel expands before system decision.

## Volume / System HUD

- [ ] **AND-291** · `SPX-1848` · **Volume Slider HUD Arrival** — temporary level control enters from edge.
- [ ] **AND-292** · `SPX-1849` · **Volume Level Segment Update** — scalar level changes through persistent geometry.
- [ ] **AND-293** · `SPX-1850` · **Output Device Expansion** — compact volume HUD expands into route selection.
- [ ] **AND-294** · `SPX-1851` · **Mute State Morph** — active level control becomes muted state.
- [ ] **AND-295** · `SPX-1852` · **HUD Timeout Retreat** — system control leaves after fixed inactivity.
- [ ] **AND-296** · `SPX-1853` · **Multiple Stream Expansion** — one volume slider becomes several category sliders.

## Connectivity & Status

- [ ] **AND-297** · `SPX-1854` · **Wi-Fi Searching-to-Connected Morph** — acquisition geometry resolves into stable connection.
- [ ] **AND-298** · `SPX-1855` · **Bluetooth Device Acquisition** — discovered device becomes connected state.
- [ ] **AND-299** · `SPX-1856` · **Airplane Mode State Sweep** — connectivity indicators collectively transition to unavailable.
- [ ] **AND-300** · `SPX-1857` · **Hotspot Active Pulse** — finite state change establishes broadcasting status; avoid infinite decorative pulse under reduced motion.
- [ ] **AND-301** · `SPX-1858` · **Signal Strength Transition** — discrete connectivity bars change through fixed levels.
- [ ] **AND-302** · `SPX-1859` · **Network Failure Reset** — connection attempt fails and returns to retry-ready state.

## Android Share Sheet

- [ ] **AND-303** · `SPX-1860` · **Share Sheet Rise** — share targets enter as a bottom presentation surface.
- [ ] **AND-304** · `SPX-1861` · **Direct Share Target Arrival** — priority recipients construct before general applications.
- [ ] **AND-305** · `SPX-1862` · **Share Target Selection Handoff** — selected item becomes outgoing transfer state.
- [ ] **AND-306** · `SPX-1863` · **Share Sheet Expansion Detent** — compact targets expand into full target list.
- [ ] **AND-307** · `SPX-1864` · **Copy Link Resolve** — share action morphs into finite copied confirmation.
- [ ] **AND-308** · `SPX-1865` · **Share Target Search Expansion** — target list reorganises around search.

## Nearby Share / Quick Share Inspired

- [ ] **AND-309** · `SPX-1866` · **Nearby Device Discovery** — recipient nodes construct around source in deterministic positions.
- [ ] **AND-310** · `SPX-1867` · **Recipient Acquisition** — selected nearby device gains explicit ready state.
- [ ] **AND-311** · `SPX-1868` · **File Transfer Arc** — outgoing object follows a visible transfer path.
- [ ] **AND-312** · `SPX-1869` · **Transfer Acceptance Handoff** — pending state becomes active transfer only after acceptance.
- [ ] **AND-313** · `SPX-1870` · **Transfer Completion Absorption** — file becomes part of recipient representation.
- [ ] **AND-314** · `SPX-1871` · **Transfer Rejection Return** — rejected object restores to sender.
- [ ] **AND-315** · `SPX-1872` · **Multi-File Transfer Stack** — several files condense into counted transfer proxy.
- [ ] **AND-316** · `SPX-1873` · **Discovery Timeout** — unavailable recipient retracts from discovery field.

## Widgets

- [ ] **AND-317** · `SPX-1874` · **Widget Resize Morph** — information module changes between fixed grid sizes.
- [ ] **AND-318** · `SPX-1875` · **Widget Content Refresh** — only changed content regions update without full replacement.
- [ ] **AND-319** · `SPX-1876` · **Widget Configuration Expansion** — placed widget opens compact configuration surface.
- [ ] **AND-320** · `SPX-1877` · **Widget Drag Placement Preview** — occupied launcher cells preview before commit.
- [ ] **AND-321** · `SPX-1878` · **Widget State Crossfade with Stable Frame** — frame persists while content state changes.
- [ ] **AND-322** · `SPX-1879` · **Widget Error Recovery** — unavailable content resolves into retry-ready state.

## Material You / Dynamic Shape Ideas

- [ ] **AND-323** · `SPX-1880` · **Shape Morph Button-to-Card** — rounded control changes into larger irregular/rounded content surface.
- [ ] **AND-324** · `SPX-1881` · **Pill-to-Squircle Morph** — compact pill becomes broader soft-corner container.
- [ ] **AND-325** · `SPX-1882` · **Selected Tile Shape Shift** — state change alters container geometry as well as colour.
- [ ] **AND-326** · `SPX-1883` · **Dynamic Corner Radius Handoff** — shared container changes corner treatment across hierarchy.
- [ ] **AND-327** · `SPX-1884` · **Organic Loading Blob Resolve** — finite shape deformation resolves into stable content geometry.
- [ ] **AND-328** · `SPX-1885` · **Shape Family Selection Transfer** — one shared selected shape moves through option group.

## Material You Colour / State Transitions

- [ ] **AND-329** · `SPX-1886` · **Tonal Surface Selection** — selected item gains a tonal container with structural state change.
- [ ] **AND-330** · `SPX-1887` · **Dynamic Palette State Swap** — specimen changes between two fixed original tonal palettes through controlled token interpolation.
- [ ] **AND-331** · `SPX-1888` · **Contrast Elevation on Focus** — active surface gains stronger tonal separation.
- [ ] **AND-332** · `SPX-1889` · **Disabled Tonal Collapse** — unavailable control loses hierarchy without disappearing.
- [ ] **AND-333** · `SPX-1890` · **Success Tonal Resolve** — action state becomes finite success surface.

## Material Elevation

- [ ] **AND-334** · `SPX-1891` · **Card Lift on Drag** — dragged object gains elevation hierarchy and leaves a source placeholder.
- [ ] **AND-335** · `SPX-1892` · **Surface Elevation Transfer** — selected surface becomes foreground while old foreground recedes.
- [ ] **AND-336** · `SPX-1893` · **App Bar Elevation on Scroll** — toolbar gains separation only after content scrolls beneath it.
- [ ] **AND-337** · `SPX-1894` · **Dialog Elevation Establishment** — dialog gains priority through layered boundary/shadow treatment.
- [ ] **AND-338** · `SPX-1895` · **Elevation Reset on Drop** — drag proxy settles back into destination plane.

## Drag & Drop

- [ ] **AND-339** · `SPX-1896` · **Drag Lift** — item separates from source after movement threshold.
- [ ] **AND-340** · `SPX-1897` · **Drag Proxy Formation** — complex source condenses into portable representation.
- [ ] **AND-341** · `SPX-1898` · **Drop Target Acquisition** — valid target changes geometry as proxy approaches.
- [ ] **AND-342** · `SPX-1899` · **Drop Commit Absorption** — proxy becomes part of destination.
- [ ] **AND-343** · `SPX-1900` · **Invalid Drop Return** — rejected proxy returns deterministically to source.
- [ ] **AND-344** · `SPX-1901` · **Multi-Item Drag Stack** — several selected items become counted stack.
- [ ] **AND-345** · `SPX-1902` · **Grid Reorder Gap** — one insertion gap travels through grid.
- [ ] **AND-346** · `SPX-1903` · **Cross-Container Drag Handoff** — object changes ownership between lists.

## Haptics-Inspired Visual Responses

- [ ] **AND-347** · `SPX-1904` · **Threshold Tick** — one tiny visual response when drag crosses a semantic threshold.
- [ ] **AND-348** · `SPX-1905` · **Selection Tick** — shared marker settles with a compact visual acknowledgement.
- [ ] **AND-349** · `SPX-1906` · **Long-Press Acquisition Tick** — hold threshold produces four small acquisition marks.
- [ ] **AND-350** · `SPX-1907` · **Invalid Action Knock** — one finite lateral refusal.
- [ ] **AND-351** · `SPX-1908` · **Snap Confirmation** — snapping object produces a tiny boundary compression.
- [ ] **AND-352** · `SPX-1909` · **Detent Crossing Tick** — sheet/slider displays a small finite response when crossing fixed detents.

## Error & Validation

- [ ] **AND-353** · `SPX-1910` · **Text Field Error Shake** — one finite lateral refusal followed by supporting text.
- [ ] **AND-354** · `SPX-1911` · **Inline Error Expansion** — error region creates layout space.
- [ ] **AND-355** · `SPX-1912` · **Form Success Resolve** — form action becomes completion state before navigation.
- [ ] **AND-356** · `SPX-1913` · **Permission Error Handoff** — failed action exposes exact required permission.
- [ ] **AND-357** · `SPX-1914` · **Network Retry Morph** — failed state becomes retry control within same container.
- [ ] **AND-358** · `SPX-1915` · **Error Snackbar Escalation** — temporary error expands into detailed corrective action.

## Selection Mode

- [ ] **AND-359** · `SPX-1916` · **Long-Press Enter Selection Mode** — item acquisition transforms toolbar and enables multi-select.
- [ ] **AND-360** · `SPX-1917` · **Selection Count Increment** — selected items contribute to persistent count.
- [ ] **AND-361** · `SPX-1918` · **Selection Toolbar Transform** — ordinary app bar becomes contextual action bar.
- [ ] **AND-362** · `SPX-1919` · **Select-All Sweep** — all visible items enter selected state in deterministic sequence.
- [ ] **AND-363** · `SPX-1920` · **Selection Exit Restore** — toolbar and items return to normal hierarchy.
- [ ] **AND-364** · `SPX-1921` · **Selection Range Drag** — drag gesture extends selection across contiguous items.

## Expand / Collapse Patterns

- [ ] **AND-365** · `SPX-1922` · **Accordion Section Expansion** — content unfolds while surrounding layout reflows.
- [ ] **AND-366** · `SPX-1923` · **Disclosure Icon Rotation** — icon movement is coordinated with actual content expansion.
- [ ] **AND-367** · `SPX-1924` · **Expandable Card Detail** — card height grows to reveal supporting actions/data.
- [ ] **AND-368** · `SPX-1925` · **Read More Text Expansion** — text container reveals additional lines without page jump.
- [ ] **AND-369** · `SPX-1926` · **Nested Settings Expansion** — secondary controls appear beneath preference row.

## Media Controls

- [ ] **AND-370** · `SPX-1927` · **Play/Pause Morph** — one persistent glyph transforms between playback states.
- [ ] **AND-371** · `SPX-1928` · **Mini Player Expansion** — compact playback bar becomes full player.
- [ ] **AND-372** · `SPX-1929` · **Scrubber Pickup** — playback thumb enlarges and reveals timing during drag.
- [ ] **AND-373** · `SPX-1930` · **Track Skip Shared Axis** — metadata transfers directionally between tracks.
- [ ] **AND-374** · `SPX-1931` · **Buffering-to-Playback Resolve** — loading geometry becomes active playback state.
- [ ] **AND-375** · `SPX-1932` · **Output Route Expansion** — compact playback route control opens destination selection.
- [ ] **AND-376** · `SPX-1933` · **Playback Queue Reorder** — dragged queue item leaves insertion gap.

## Camera / Capture Inspired

- [ ] **AND-377** · `SPX-1934` · **Shutter Compression** — capture control compresses and produces finite capture acknowledgement.
- [ ] **AND-378** · `SPX-1935` · **Capture Thumbnail Materialise** — captured item appears in recent-media destination.
- [ ] **AND-379** · `SPX-1936` · **Camera Mode Shared Axis** — PHOTO/VIDEO/etc. selection moves with directional continuity.
- [ ] **AND-380** · `SPX-1937` · **Focus Acquisition Brackets** — four focus marks converge around selected region.
- [ ] **AND-381** · `SPX-1938` · **Exposure Slider Pickup** — contextual scalar control appears beside focus target.
- [ ] **AND-382** · `SPX-1939` · **Capture-to-Preview Transform** — captured frame becomes preview card.

## Screenshot / Selection Inspired

- [ ] **AND-383** · `SPX-1940` · **Screenshot Thumbnail Arrival** — captured screen condenses into temporary corner thumbnail.
- [ ] **AND-384** · `SPX-1941` · **Screenshot Expand to Editor** — thumbnail expands into annotation/editor surface.
- [ ] **AND-385** · `SPX-1942` · **Screenshot Dismiss Fling** — thumbnail follows a strong dismissal gesture.
- [ ] **AND-386** · `SPX-1943` · **Crop Handle Acquisition** — crop region handles become active under drag.
- [ ] **AND-387** · `SPX-1944` · **Share Screenshot Handoff** — captured thumbnail becomes outgoing share proxy.

## System Update / Install

- [ ] **AND-388** · `SPX-1945` · **Download-to-Install Morph** — update progress changes meaning from downloading to installing.
- [ ] **AND-389** · `SPX-1946` · **Install-to-Restart Action** — completed install becomes restart/relaunch control.
- [ ] **AND-390** · `SPX-1947` · **Update Stage Progress** — fixed stages transfer active ownership.
- [ ] **AND-391** · `SPX-1948` · **Update Failure Retry** — failed stage becomes deterministic retry state.
- [ ] **AND-392** · `SPX-1949` · **Background Update Condense** — detailed progress compresses into compact status.

## Wear / Compact Android-Inspired Ideas

- [ ] **AND-393** · `SPX-1950` · **Radial Progress-to-Result** — circular progress becomes completion state.
- [ ] **AND-394** · `SPX-1951` · **Rotary List Focus** — central item gains scale/hierarchy as list moves.
- [ ] **AND-395** · `SPX-1952` · **Compact Tile Swipe** — full-screen cards snap horizontally.
- [ ] **AND-396** · `SPX-1953` · **Edge Curvature Fade** — items near top/bottom become visually compressed.
- [ ] **AND-397** · `SPX-1954` · **Compact Confirmation Countdown** — action resolves after short finite confirmation window.

## Foldable / Adaptive Layout Ideas

- [ ] **AND-398** · `SPX-1955` · **Single-to-Dual Pane Transform** — one content column becomes master/detail when space increases.
- [ ] **AND-399** · `SPX-1956` · **Fold-Aware Pane Handoff** — selected content transfers across a conceptual hinge region.
- [ ] **AND-400** · `SPX-1957` · **Bottom Sheet-to-Side Sheet Transform** — presentation changes edge while preserving content identity.
- [ ] **AND-401** · `SPX-1958` · **Navigation Bar-to-Rail Transform** — bottom navigation becomes vertical rail at wider width.
- [ ] **AND-402** · `SPX-1959` · **Grid Density Reflow** — items retain identity while column count changes.
- [ ] **AND-403** · `SPX-1960` · **Hinge Avoidance Shift** — important content relocates away from an unavailable centre strip.

## Tiny Android Microinteractions

- [ ] **AND-404** · `SPX-1961` · **Copy Confirmation Morph** — Copy Confirmation Morph
- [ ] **AND-405** · `SPX-1962` · **Favourite Toggle Pop** — Favourite Toggle Pop
- [ ] **AND-406** · `SPX-1963` · **Bookmark State Morph** — Bookmark State Morph
- [ ] **AND-407** · `SPX-1964` · **Download Icon-to-Progress** — Download Icon-to-Progress
- [ ] **AND-408** · `SPX-1965` · **Refresh One-Turn Resolve** — Refresh One-Turn Resolve
- [ ] **AND-409** · `SPX-1966` · **Overflow Menu Press Response** — Overflow Menu Press Response
- [ ] **AND-410** · `SPX-1967` · **Clear Text Button Arrival** — Clear Text Button Arrival
- [ ] **AND-411** · `SPX-1968` · **Expand Chevron Turn** — Expand Chevron Turn
- [ ] **AND-412** · `SPX-1969` · **Mute Slash Construct** — Mute Slash Construct
- [ ] **AND-413** · `SPX-1970` · **Lock/Unlock State Morph** — Lock/Unlock State Morph
- [ ] **AND-414** · `SPX-1971` · **Badge Count Increment** — Badge Count Increment
- [ ] **AND-415** · `SPX-1972` · **Badge Count Clear** — Badge Count Clear
- [ ] **AND-416** · `SPX-1973` · **Sync Status Resolve** — Sync Status Resolve
- [ ] **AND-417** · `SPX-1974` · **Pin State Settle** — Pin State Settle

---

## Notes for specimen implementation

- Prefer HTML + CSS; tiny deterministic JS only when gestures/state require it.
- iframe-safe: no parent access, storage, network, or Android APIs.
- Freeze coordinates, durations, thresholds, and easing in the contract.
- Honour `prefers-reduced-motion` and `data-force-reduced-motion`.
- Keep inspiration conceptual; original geometry, not Google/Pixel screenshots.

Extract principles: **predictive navigation, container continuity, touch acknowledgement, temporary system surfaces, boundary deformation, shared-axis hierarchy, task ownership, and compact-to-rich transformation.**
