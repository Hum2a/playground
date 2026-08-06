# Android Motion & UI --- 50 Cursor Implementation Prompts

These are implementation-ready prompts for the specimen archive at
`playground.humza-butt.space`.

## Global contract

Apply these requirements to every prompt:

-   Build a self-contained HTML + CSS (+ tiny JS where necessary)
    specimen.
-   It must work in `<iframe sandbox="allow-scripts">`.
-   No same-origin assumptions, parent APIs, storage, fetch/network,
    native Android APIs, or framework runtime.
-   Prefer `deps: ['none']`.
-   Use deterministic fixed values and original visual assets/copy.
-   Extract Android/Material interaction principles rather than cloning
    proprietary Google or Pixel UI.
-   Honour `prefers-reduced-motion` and `data-force-reduced-motion`.
-   Preserve semantic state and gesture thresholds under reduced motion.
-   Register explicitly in `src/specimens/index.ts`.
-   Supply complete metadata, scaffold, integration steps, and
    observable acceptance criteria.
-   Do not redesign the catalogue/playground chrome.
-   Reset/replay must leave no stale timers, listeners, nodes, or
    transforms.

------------------------------------------------------------------------

# 1. Predictive Back Edge Pull

**Suggested tags:** `gesture, navigation, predictive-back`

## Cursor implementation prompt

Build **SPX-??? --- Predictive Back Edge Pull**, an original web
specimen inspired by Android predictive-back navigation.

Create a 390×720 phone-like scaffold containing a simple "current page"
over a clearly different previous page. Dragging horizontally from the
leftmost 24px edge should acquire the gesture. From 0→140px drag
distance, move the current page right by `dragX * 0.72`, scale it from
`1` to `0.94`, and increase corner radius from `0` to `28px`. Reveal the
destination underneath while its opacity moves `0.55→1` and scale
`0.97→1`. Show a small abstract back indicator near the finger that
grows from 24×24 to 36×36px.

Commit when drag exceeds 112px or release velocity exceeds 0.55 px/ms;
otherwise return to the exact initial state. Use pointer events and
pointer capture. No libraries.

Reduced motion: preserve interactive drag distance and threshold
semantics, but remove scale interpolation and springy settling; snap
immediately after release.

Acceptance: - Gesture can only begin in the left 24px edge zone. -
Current and previous surfaces visibly coexist during drag. -
Below-threshold release restores exact starting state. -
Above-threshold/velocity release completes navigation. - Repeated runs
do not accumulate transforms or listeners.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 2. Predictive Back App Shrink

**Suggested tags:** `gesture, navigation, transform`

## Cursor implementation prompt

Build **SPX-??? --- Predictive Back App Shrink**. Focus specifically on
the Android-style idea that an app becomes a smaller floating surface
while a back gesture progresses.

Use a 390×720 scaffold. The active surface begins flush to all edges.
Acquire only from a 24px left-edge zone. Map 0→160px horizontal drag to
scale `1→0.88`, border radius `0→32px`, horizontal translation `0→46px`,
and vertical inset `0→18px`. A neutral underlying destination should
become visible around all four edges. Add a 1px internal border only
once scale drops below 0.97.

Release threshold: 118px. Cancel settles in 220ms with a critically
damped-feeling cubic-bezier; commit finishes in 180ms. Do not reproduce
Pixel artwork.

Reduced motion keeps the gesture preview but removes scale animation
after release.

Acceptance: - Shrink is continuously controlled by pointer distance. -
Underlying surface is visible before commit. - Radius and inset increase
progressively rather than switching. - Cancel returns to pixel-identical
start geometry. - Works with mouse and touch-style pointer events.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 3. Card-to-Detail Container Transform

**Suggested tags:** `container-transform, card, navigation`

## Cursor implementation prompt

Build **SPX-??? --- Card-to-Detail Container Transform**.

Scaffold: 360×620 content list with three original cards. Clicking the
middle 304×112px card should transform that exact container into a
336×548px detail surface rather than spawning an unrelated modal.
Animate position, width, height, border radius `20px→28px`, and internal
content hierarchy over 420ms.

Keep the card title as a persistent shared element. Fade secondary
list-card metadata out during the first 120ms; reveal destination
content from 160--360ms. Add a Back control inside the expanded state
that reverses the same geometry. Use plain HTML/CSS plus tiny JS to
measure source/destination rectangles. No FLIP library.

Reduced motion: perform an immediate geometry switch with a short
opacity handoff \<=100ms.

Acceptance: - Expanded surface visibly originates from the selected
card. - Title never disappears during the transformation. - Closing
returns to the exact source card. - Sibling cards remain static beneath
the overlay layer. - Reopening after resize recomputes geometry
correctly.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 4. FAB-to-Composer Transform

**Suggested tags:** `fab, container-transform, composer`

## Cursor implementation prompt

Build **SPX-??? --- FAB-to-Composer Transform**.

Place a 56×56px floating action button 24px from the bottom/right of a
390×640 scaffold. On activation, the FAB itself should grow into a
342×210px composer anchored 24px from the sides/bottom. Use radius
`28px→24px`, 360ms duration, and a custom cubic-bezier approximating a
fast-out-slow-in material transition.

The original plus/pencil-style abstract glyph should rotate 45° and fade
by 90ms. Composer title and textarea appear after 120ms, then two action
buttons after 180ms. Cancel reverses the transform. Focus the textarea
only after expansion completes.

Reduced motion: switch container geometry immediately, then reveal
contents without movement.

Acceptance: - There is never a visible duplicate FAB and composer
container. - The composer clearly grows from the FAB's location. -
Cancel reconstructs the original FAB. - Keyboard focus is sensible and
Escape closes it. - No framework or external asset dependency.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 5. Bounded Touch Ripple

**Suggested tags:** `ripple, touch-feedback, css-js`

## Cursor implementation prompt

Build **SPX-??? --- Bounded Touch Ripple**.

Create a specimen plate with three controls: 280×56px button, 280×72px
list row, and 120×48px chip-like control. Pointer-down creates a
circular response centred on the exact pointer coordinate relative to
the target. Calculate the radius required to cover the furthest corner,
then animate a pseudo/ripple element from scale 0 to 1 over 420ms and
opacity `0.18→0`.

The ripple must be clipped by each target's own border radius. Keyboard
Enter/Space activation should use the centre point. Do not use Material
libraries.

Reduced motion: replace radial expansion with a 100ms whole-control
background flash.

Acceptance: - Pointer-origin visibly changes when clicking different
target areas. - Ripple reaches every corner without escaping the
control. - Rapid repeated presses do not leave orphaned nodes. -
Keyboard activation receives equivalent feedback. - Each control can use
the primitive without bespoke JS.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 6. Fade Through

**Suggested tags:** `transition, fade-through, content-swap`

## Cursor implementation prompt

Build **SPX-??? --- Fade Through**.

Create a 340×420 content scaffold with two distinct information states
and a toggle. Transition A→B in 300ms using a true two-phase handoff:
outgoing content opacity `1→0` and scale `1→0.96` during 0--105ms;
incoming content remains hidden until 105ms, then opacity `0→1` and
scale `0.96→1` during 105--300ms. There must be no moment where both
states appear fully opaque.

Keep the outer container completely stationary. Reverse uses identical
timing. Use CSS custom properties/classes; tiny JS only switches state.

Reduced motion: instantaneous content replacement or \<=80ms
opacity-only handoff.

Acceptance: - Outer geometry does not move. - Outgoing state
relinquishes visibility before incoming state establishes itself. - Both
directions use identical phase boundaries. - Rapid toggling cannot leave
two visible states. - Reduced-motion state remains immediately
understandable.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 7. Shared X-Axis Navigation

**Suggested tags:** `shared-axis, navigation, x-axis`

## Cursor implementation prompt

Build **SPX-??? --- Shared X-Axis Navigation**.

Create three sequential panels inside a fixed 360×480 viewport:
"Overview", "Details", "Confirm". Forward navigation: outgoing panel
translates `0→-30px`, scales `1→0.92`, opacity `1→0` over 300ms;
incoming panel starts at `+30px`, scale `0.92`, opacity 0 and reaches
neutral. Back navigation mirrors the direction.

The movement should communicate hierarchy rather than imitate a
carousel. Keep a persistent top progress label outside the animated
plane.

Reduced motion: content swaps with opacity only and no
translation/scale.

Acceptance: - Forward and back directions are visually opposite. -
Incoming/outgoing panels overlap only during the transition. -
Persistent chrome never moves. - Navigation buttons lock during the
300ms transition. - Returning to Overview restores the exact original
state.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 8. App Launch from Icon

**Suggested tags:** `launcher, icon, container-transform`

## Cursor implementation prompt

Build **SPX-??? --- App Launch from Icon**.

Create an original 4×4 launcher grid inside a 390×700 scaffold. One
56×56 abstract app tile should launch into a full 390×700 application
surface. The opening surface must originate at the tile's measured
centre, beginning at roughly `scale(0.12)` and the tile position, then
reaching full viewport over 420ms. Radius transitions `18px→0`. Fade app
internals in only after progress 45%.

Closing reverses toward the same tile, even if another launcher page
decoration is visible. Use DOM measurements and transforms; no native
APIs.

Reduced motion: immediate full-screen switch with \<=100ms fade.

Acceptance: - Launch origin matches the selected tile centre. - App
internals do not appear while the container is tiny. - Close returns to
the exact source tile. - Launcher remains visually intact underneath. -
No proprietary Android/Google icons are used.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 9. Home Swipe Up

**Suggested tags:** `gesture, home, navigation`

## Cursor implementation prompt

Build **SPX-??? --- Home Swipe Up**.

Scaffold a full app surface above an original launcher background.
Acquire an upward gesture from the bottom 28px. Map vertical drag
0→240px to app translateY `0→-70px`, scale `1→0.72`, radius `0→30px`,
and launcher opacity `0.25→1`. The app should visually become a
task-sized object as it approaches home.

Commit at 150px upward travel or upward velocity \>0.6 px/ms. Cancel
restores the app. Commit finishes by shrinking/moving the app toward a
generic launcher icon position.

Reduced motion keeps direct drag tracking but uses immediate release
resolution.

Acceptance: - Gesture only starts from bottom navigation zone. -
Launcher becomes progressively visible. - App geometry remains coherent
during scale. - Commit ends at a visible home state. - Cancel restores
full-screen app exactly.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 10. App-to-Recents Shrink

**Suggested tags:** `recents, task-card, gesture`

## Cursor implementation prompt

Build **SPX-??? --- App-to-Recents Shrink**.

Build a 390×700 active app that transforms into a centred 300×520 task
card when the user presses "Overview" or performs a short upward drag
then hold. During 380ms, scale the app to the task-card rectangle,
increase radius to 26px, and reveal adjacent task cards at x offsets
±250px.

Keep the active app screenshot/content live as DOM, not canvas. Add a
subtle overview background and a generic task label beneath the card.

Reduced motion: switch directly to the task-card geometry.

Acceptance: - Active application itself becomes the centre task card. -
Adjacent tasks appear only as overview establishes. - No screenshot
image is required. - Active task remains visually dominant. - Restore
can reverse cleanly to full-screen.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 11. Recents Card Restore

**Suggested tags:** `recents, restore, container-transform`

## Cursor implementation prompt

Build **SPX-??? --- Recents Card Restore**.

Start in an overview scaffold with three 286×500 task cards. Selecting
any card expands that exact card to the 390×700 viewport over 380ms.
Radius goes `26px→0`, neighbouring cards translate away and fade, task
label disappears by 120ms, and app controls become active after 300ms.

Use original mock application content for all cards. Back/Overview
should reconstruct the same task arrangement and scroll position.

Reduced motion: immediate geometry swap plus short fade.

Acceptance: - Any of the three task cards can be restored. - Selected
card remains visually continuous throughout. - Neighbour cards leave
before full expansion completes. - Returning to overview restores task
order. - No raster screenshots or network resources.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 12. Notification Shade Pull-Down

**Suggested tags:** `notification-shade, gesture, system-surface`

## Cursor implementation prompt

Build **SPX-??? --- Notification Shade Pull-Down**.

Create a 390×700 host app. Dragging downward from the top 32px reveals a
notification shade that tracks the pointer. Use a maximum shade height
of 620px. Map drag through resistance so shade movement is approximately
`min(dragY, 620 + sqrt(extra)*8)`. At 0--220px reveal a compact header
and two notifications; after 220px begin exposing a larger
quick-controls region.

Release snaps closed if below 160px, to partial 260px if 160--400px, or
full 620px above 400px, with velocity able to choose the next detent.

Reduced motion: preserve drag/detents, remove animated settling.

Acceptance: - Shade follows direct pointer movement. - At least three
meaningful detents exist. - Host remains visible beneath partial
shade. - Overdrag meets visible resistance. - Upward drag from shade can
dismiss it.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 13. Quick Settings Tile Toggle

**Suggested tags:** `quick-settings, tile, state`

## Cursor implementation prompt

Build **SPX-??? --- Quick Settings Tile Toggle**.

Create a 2×3 grid of original 148×72px system-control tiles. One
"Network" tile is interactive. On pointer down, show bounded ripple. On
activation, animate its active backing from a 40px circle behind the
icon into the full rounded tile over 260ms while the icon shifts 8px and
label weight/secondary copy changes. Deactivation reverses.

Use fixed original colours rather than Android dynamic colour APIs. Add
keyboard focus.

Reduced motion: state changes instantly except a \<=80ms opacity cue.

Acceptance: - Ripple and persistent selection are separate layers. -
Selected state is unmistakable without relying only on colour. - Active
backing visibly grows from icon region. - Toggle is keyboard operable. -
Repeated toggles never distort tile geometry.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 14. Heads-Up Notification Drop

**Suggested tags:** `notification, heads-up, overlay`

## Cursor implementation prompt

Build **SPX-??? --- Heads-Up Notification Drop**.

Inside a 390×700 host application, trigger a 350×88px transient alert.
It begins at `translateY(-110px)` and opacity 0, settles 14px from the
top over 320ms, remains for 3200ms, then retreats upward over 220ms.
Include original sender/title/body copy and two compact actions.

Pointer hover/focus pauses timeout. Clicking the card expands it to
350×156px over 220ms instead of navigating. Swipe upward \>55px
dismisses early.

Reduced motion: alert appears/disappears without travel, retaining dwell
timing.

Acceptance: - Alert overlays rather than pushes host content. - Timeout
pauses while actively interacted with. - Expansion keeps the same outer
container. - Upward swipe dismiss works. - Only one heads-up alert
exists at once.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 15. Snackbar Rise

**Suggested tags:** `snackbar, feedback, temporary`

## Cursor implementation prompt

Build **SPX-??? --- Snackbar Rise**.

Create a generic app scaffold with a "Delete item" action. Deleting
collapses a row, then a 344×52px snackbar enters 20px above the bottom
edge from `translateY(76px)` over 250ms. Copy: "Item removed" plus
`UNDO`. Dwell 4500ms. UNDO reconstructs the removed row and transforms
snackbar copy to "Restored" for 900ms before exit.

If Delete is triggered again while visible, reuse the same snackbar
container rather than stacking another.

Reduced motion: snackbar appears in place with opacity only.

Acceptance: - Snackbar never changes host layout. - UNDO genuinely
restores the deleted row. - Repeated deletes reuse one surface. -
Focus/hover pauses dismissal. - Escape can dismiss temporary feedback.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 16. Bottom Sheet Detent Snap

**Suggested tags:** `bottom-sheet, gesture, detents`

## Cursor implementation prompt

Build **SPX-??? --- Bottom Sheet Detent Snap**.

Create a 390×700 host with a draggable bottom sheet. Fixed detents:
collapsed 96px visible, medium 360px, expanded 640px. Dragging the 48×24
handle region should move the sheet directly. On release, choose the
nearest detent, biased one detent in the velocity direction when
`|v| > 0.55 px/ms`.

At the expanded boundary, apply increasing resistance rather than
allowing unrestricted movement. Scrim opacity should map `0→0.34`
between collapsed and expanded. Clicking scrim returns to collapsed.

Reduced motion: direct drag remains; release snaps instantly.

Acceptance: - Exactly three stable detents. - Velocity can change
destination. - Sheet never travels beyond viewport. - Scrim tracks sheet
progress. - Content remains scrollable only at expanded detent.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 17. Navigation Drawer Edge Pull

**Suggested tags:** `drawer, gesture, navigation`

## Cursor implementation prompt

Build **SPX-??? --- Navigation Drawer Edge Pull**.

Use a 390×700 app scaffold with a 304px-wide left drawer. Acquire
pointer only in first 24px when closed. Drawer x position tracks drag
from `-304px→0`. Underlying app translates `0→24px` and scrim opacity
maps `0→0.32`. Release opens above 46% progress or velocity \>0.5 px/ms,
otherwise closes.

When open, allow drag from anywhere on drawer to close. Include five
generic destinations and one moving selected-state pill.

Reduced motion: direct drag remains; release snaps.

Acceptance: - Closed drawer cannot be acquired from middle of page. -
Drawer is fully pointer-tracked. - Scrim click closes it. - Open/close
threshold is deterministic. - Keyboard Escape closes and focus does not
remain behind drawer.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 18. Active Bottom-Nav Pill Transfer

**Suggested tags:** `bottom-nav, indicator, navigation`

## Cursor implementation prompt

Build **SPX-??? --- Active Bottom-Nav Pill Transfer**.

Create a 360×72px bottom navigation with four original destinations. A
single 64×32px active indicator pill should physically move between item
centres over 280ms rather than creating one background per item. Active
icon shifts upward 2px and label opacity moves to 1; previous label
fades to 0.65.

Content above uses a 240ms fade-through. Use CSS custom properties for
target x positions.

Reduced motion: indicator jumps directly and content swaps instantly.

Acceptance: - Only one indicator element exists. - Pill centre aligns
precisely with selected destination. - Content and nav state cannot
disagree. - Keyboard arrow navigation updates selection. - Rapid
selection ends on the final requested item.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 19. Material Pull-to-Refresh

**Suggested tags:** `pull-to-refresh, gesture, scroll`

## Cursor implementation prompt

Build **SPX-??? --- Material Pull-to-Refresh**.

Create a 340×500 scrollable feed. When scrollTop is 0, downward pointer
drag produces resisted content translation using
`displayY = 96 * (1 - exp(-dragY/140))`. A 40px refresh indicator
appears above the feed. From 0→72px displayed pull, construct a 270°
circular arc and rotate it up to 120°. Threshold is 72px.

On release above threshold, hold content at 64px and run a finite 900ms
loading cycle, then prepend one deterministic row and settle to zero.
Below threshold, rewind.

Reduced motion: retain threshold and static progress arc; no spinning.

Acceptance: - Pull only activates at scrollTop 0. - Resistance increases
with distance. - Below-threshold pull never refreshes. - Successful
refresh inserts exactly one known row. - Indicator disappears after
settle.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 20. Vertical Content Stretch

**Suggested tags:** `overscroll, stretch, physics`

## Cursor implementation prompt

Build **SPX-??? --- Vertical Content Stretch**.

Create a 340×480 scrollable list with visible top and bottom boundaries.
At top overscroll, visually deform the content plane rather than
translating it freely: map drag 0→140px to `scaleY(1→1.055)` with
transform-origin top and a small `translateY(0→10px)`. At bottom, use
transform-origin bottom with mirrored behaviour.

Release returns to scale 1 over 260ms. Do not interfere with normal
wheel scrolling. Pointer gesture should only take ownership after
reaching a boundary.

Reduced motion: replace deformation with a static 2px boundary emphasis
while dragging.

Acceptance: - Normal scrolling remains normal away from boundaries. -
Top and bottom use opposite transform origins. - Maximum stretch is
capped. - Release always returns to exact scale 1. - No infinite glow or
looping effect.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 21. Collapsing App Bar

**Suggested tags:** `scroll, app-bar, header`

## Cursor implementation prompt

Build **SPX-??? --- Collapsing App Bar**.

Build a 360×560 scrolling article. Initial app bar height 152px with
32px title positioned near the bottom. Over the first 96px of scroll,
collapse the bar to 64px. Title interpolates to 20px and moves into
compact toolbar alignment. A trailing action remains pinned throughout.
Add a 1px bottom divider only after scrollY \> 88px.

Do not use sticky duplicate headers; transform the same title element.
CSS sticky plus tiny scroll JS is acceptable.

Reduced motion: geometry may update directly from scroll position
without eased interpolation.

Acceptance: - Header height maps continuously to first 96px of scroll. -
Same title element survives large and compact states. - Trailing action
remains reachable. - Divider appears only near collapsed state. -
Scrolling back to top restores exact large state.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 22. Fingerprint Acquisition Field

**Suggested tags:** `biometric, authentication, progress`

## Cursor implementation prompt

Build **SPX-??? --- Fingerprint Acquisition Field**, using abstract
original geometry rather than a copied fingerprint asset.

Create a 280×360 authentication card with an 88×88 circular touch target
composed of 12 SVG/CSS arc segments. Holding pointer inside the target
progressively lights segments in a deterministic order over 900ms.
Releasing before 720ms rewinds to idle. Holding past 900ms completes
acquisition: segments contract slightly, then resolve into a simple
check-like verification mark.

Add a "Try again" path that triggers one finite 220ms failure pulse if
pointer leaves target repeatedly.

Reduced motion: segments change in discrete stages with no
pulsing/scaling.

Acceptance: - Acquisition is hold-driven, not a looping loader. -
Progress stops immediately on early release. - Success only occurs after
required hold. - Failure response happens once per failed attempt. - No
biometric/native APIs are required.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 23. Picture-in-Picture Collapse

**Suggested tags:** `pip, media, container-transform`

## Cursor implementation prompt

Build **SPX-??? --- Picture-in-Picture Collapse**.

Create a 390×700 mock media app with a 16:9 player region. Pressing
"Mini" transforms the player into a 176×99px floating window positioned
16px from the lower-right edge. Animate measured rectangle position/size
over 380ms; surrounding player controls/content fade before halfway. PiP
gets 14px corners and a thin border.

The floating window is draggable within viewport bounds. Tapping it
restores to the original player rectangle.

Reduced motion: direct rectangle switch plus opacity handoff.

Acceptance: - Same media DOM element/container is visually continuous. -
PiP lands exactly at defined lower-right position. - Drag cannot move it
fully offscreen. - Restore returns to original player region. - No
actual video/network dependency.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 24. PiP Edge Magnetism

**Suggested tags:** `pip, drag, snap`

## Cursor implementation prompt

Build **SPX-??? --- PiP Edge Magnetism**.

Start with a 176×99px floating media window in a 390×700 scaffold. Allow
free pointer drag. During drag, when the window centre comes within 56px
of a valid left/right edge anchor, apply a visible attraction by
blending 35% of remaining x-distance toward that anchor. On release,
snap to nearest valid corner/edge slot over 180ms.

Maintain 12px minimum viewport inset. Strong horizontal fling \>0.8
px/ms may choose the edge in fling direction.

Reduced motion: no magnetic interpolation during drag; snap instantly on
release.

Acceptance: - Free drag feels unconstrained away from edges. -
Attraction becomes visible only inside the 56px zone. - Window always
finishes at a valid slot. - Velocity can bias the chosen edge. - Window
remains entirely accessible.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 25. Nearby Device Discovery

**Suggested tags:** `nearby, discovery, transfer`

## Cursor implementation prompt

Build **SPX-??? --- Nearby Device Discovery**, inspired by
nearby-sharing interaction principles without reproducing branded UI.

Create a 360×420 sender surface with a central 64px source node.
Triggering discovery causes four abstract recipient nodes to construct
at fixed radial positions (top, right, lower-right, lower-left) in a
deterministic sequence at 120ms intervals. Each node begins scale
.72/opacity 0 and settles to 1 over 260ms. Add small orbit/range rings
that draw once and stop.

One recipient becomes "ready" after 900ms with a persistent border/check
marker. No random device names.

Reduced motion: all recipients appear immediately in their final
positions.

Acceptance: - Node positions are fixed between runs. - Discovery has a
finite end state. - Ready state is structurally distinguishable. -
Re-running resets cleanly. - No network/Bluetooth APIs are called.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 26. Nearby File Transfer

**Suggested tags:** `nearby, transfer, progress`

## Cursor implementation prompt

Build **SPX-??? --- Nearby File Transfer**.

Create source and recipient nodes 240px apart. A 52×64px generic
document card starts beside source. On Send, condense it to a 34×42px
transfer proxy and move it along a curved CSS/SVG path toward recipient
over 650ms. At recipient, absorb the proxy into the node, then show a
determinate ring progressing 0→100% over 1100ms. Finish with "Received"
state.

Include a Reject button before transfer begins; rejection sends proxy
40px toward recipient then returns it to source.

Reduced motion: proxy jumps between source/recipient while progress
remains determinate.

Acceptance: - Transfer path has visible source and destination. - Reject
never reaches completed state. - Completion absorbs proxy rather than
leaving duplicates. - Progress is finite and deterministic. - Reset
reconstructs original document.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 27. Widget Resize Morph

**Suggested tags:** `widget, resize, adaptive`

## Cursor implementation prompt

Build **SPX-??? --- Widget Resize Morph**.

Create a launcher-like 4-column grid and one original information
widget. Provide three fixed sizes: 2×1 (152×72px), 2×2 (152×152px), 4×2
(320×152px). Selecting the widget reveals four resize handles. Buttons
or handle drag should morph between valid grid sizes over 300ms.

Content adapts by semantic breakpoints: 2×1 shows title/value; 2×2 adds
mini chart; 4×2 adds three metrics. Do not merely scale text. Keep the
widget anchored to its top-left grid cell.

Reduced motion: size changes instantly; content appears/disappears
without movement.

Acceptance: - Only valid grid dimensions can be reached. - Top-left grid
anchor remains fixed. - Content genuinely reflows by size. - Handles
disappear when deselected. - No overlap with neighbouring scaffold
items.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 28. Shape Morph Button-to-Card

**Suggested tags:** `shape-morph, material-you, container`

## Cursor implementation prompt

Build **SPX-??? --- Shape Morph Button-to-Card**.

Create a 132×48px pill action labelled "Details". On activation it
becomes a 320×220px information card using the same DOM container.
Animate width, height, position and corner radius `24px→30px` over
360ms. The button label shifts into a 20px card heading; supporting
content appears after 140ms.

Use an original fixed palette, e.g. background `#DDE7FF`, ink `#17213A`,
accent `#405F91`. No dynamic-colour APIs. Close reverses.

Reduced motion: immediate shape change and content swap.

Acceptance: - One container owns both compact and expanded states. -
Label remains visually continuous. - No cloned hidden card sits behind
the button. - Reverse returns exact compact dimensions. - Works inside
iframe without external CSS.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 29. Screenshot Thumbnail Arrival

**Suggested tags:** `screenshot, thumbnail, temporary-surface`

## Cursor implementation prompt

Build **SPX-??? --- Screenshot Thumbnail Arrival**.

Simulate a capture inside a 390×700 app. Press Capture: flash a
translucent white overlay for 70ms, then create a miniature 116×206px
DOM snapshot representation at bottom-left, 16px from edges. It enters
from scale .72, translateY 36px, opacity 0 and settles over 300ms. Keep
it for 4200ms, then slide it left offscreen.

Use a prebuilt miniature representation, not canvas screenshot APIs.
Tapping thumbnail pauses timeout and opens the editor-transform specimen
state.

Reduced motion: omit flash and travel; thumbnail appears in place.

Acceptance: - Capture does not require browser screenshot permissions. -
Only one thumbnail exists. - New capture replaces/resets existing
timeout cleanly. - Thumbnail never changes app layout. - Timeout pauses
while focused/hovered.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 30. Single-to-Dual Pane Transform

**Suggested tags:** `adaptive, responsive, master-detail`

## Cursor implementation prompt

Build **SPX-??? --- Single-to-Dual Pane Transform**.

Create a resizable preview from 320→760px wide. Below 600px, show a
single list/detail navigation plane. At \>=600px, transform into a
two-pane master/detail layout with a 260px list pane, 1px divider, and
flexible detail pane. Preserve the selected item and detail DOM identity
during the transition.

When width crosses 600px, animate pane positions/widths over 320ms
rather than fading the entire interface. When shrinking, detail becomes
the active single pane if one is selected, otherwise list.

Reduced motion: layout switches immediately.

Acceptance: - Breakpoint is exactly 600px. - Selected item survives both
directions. - No content is duplicated during transition. - Wide state
has persistent master and detail. - Narrow state remains fully
navigable.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 31. Quick App Switch Swipe

**Suggested tags:** `gesture, task-switching, navigation`

## Cursor implementation prompt

Build **SPX-??? --- Quick App Switch Swipe**.

Create two original full-screen task surfaces in a 390×700 viewport.
Acquire horizontal gestures only from bottom 32px. As drag moves
left/right, current task translates up to 72px horizontally and scales
to 0.96 while adjacent task enters from the corresponding side. Use a
96px commit threshold or 0.6 px/ms velocity.

After commit, adjacent task becomes current and positions reset without
a visible jump. Support switching back.

Reduced motion: maintain direct positional preview but snap immediately
on release.

Acceptance: - Gesture ownership is restricted to bottom zone. - Adjacent
task is visible before commitment. - Cancel restores current task. -
Commit supports both directions where a neighbour exists. - Internal
task state is preserved.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 32. Notification Swipe Dismiss

**Suggested tags:** `notification, swipe, dismiss`

## Cursor implementation prompt

Build **SPX-??? --- Notification Swipe Dismiss**.

Create a stack of four 336×76px notification cards. Horizontal pointer
drag moves one card directly. Map drag progress to opacity only after
35% width, reaching 0 at 100%. Behind the card, reveal a neutral
dismissal field. Commit at 45% card width or horizontal velocity \>0.65
px/ms.

On commit, card exits in drag direction over \<=160ms, then its height
collapses from 76px to 0 over 180ms so neighbours reclaim space. Cancel
returns card to x=0.

Reduced motion: card follows drag, then disappears/collapses immediately
on commit.

Acceptance: - Vertical stack does not move until dismissal is
committed. - Both left and right dismiss work. - Cancel leaves card
unchanged. - Height collapse happens only after horizontal exit. -
Remaining cards preserve order.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 33. Search Bar-to-View Transform

**Suggested tags:** `search, container-transform`

## Cursor implementation prompt

Build **SPX-??? --- Search Bar-to-View Transform**.

Create a 320×56px search bar inside a 360×560 catalogue scaffold.
Activating it should expand that exact container into a 344×500px search
view. Radius changes `28px→24px`; the search icon moves 8px left;
placeholder becomes an active input; a Back control appears in the
leading region. Results rows reveal after 140ms.

Escape/back collapses to the original bar and restores the previous host
scroll position. Focus input after transform completion.

Reduced motion: immediate container geometry switch.

Acceptance: - Search view originates from the search bar. - Search input
remains the same logical field. - Results do not appear before expanded
state begins. - Back restores exact compact geometry. - Host content is
inert while expanded.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 34. Material Switch Toggle

**Suggested tags:** `switch, control, state`

## Cursor implementation prompt

Build **SPX-??? --- Material Switch Toggle**.

Create three 52×32px original switches demonstrating off, on, and
disabled. Interactive switch thumb is 24px and travels exactly 20px.
Track changes from a neutral outlined state to a filled active state
over 180ms. Thumb scales `1→1.08→1` during activation and contains a
small check-like mark only in on state.

Pointer-down also shows a 40px unbounded touch response centred on
thumb. Use a real checkbox input for semantics.

Reduced motion: thumb jumps to target position; no scale/ripple travel.

Acceptance: - Native checkbox state is authoritative. - Thumb travel is
exactly 20px. - Disabled switch cannot toggle. - Keyboard Space works. -
State remains distinguishable without animation.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 35. Floating Label Lift

**Suggested tags:** `textfield, focus, form`

## Cursor implementation prompt

Build **SPX-??? --- Floating Label Lift**.

Create a 300×58px outlined text field. Empty/unfocused state places
label at x=16px, vertically centred, 16px type. On focus or non-empty
value, the same label moves to y=-7px, x=12px, becomes 12px type, and
receives a background patch matching the field surface to interrupt the
outline.

Transition 180ms. Border emphasis moves from 1px neutral to 2px active.
Include error toggle that changes supporting text below without moving
the floating-label position.

Reduced motion: label changes position instantly.

Acceptance: - Label stays floated whenever value is non-empty. -
Placeholder is not used as a fake label. - Error text creates real
layout space. - Clicking label focuses input. - Field remains usable
with keyboard only.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 36. Dialog Materialise

**Suggested tags:** `dialog, overlay, modal`

## Cursor implementation prompt

Build **SPX-??? --- Dialog Materialise**.

Create a host settings screen and a 304×220px confirmation dialog. On
open, scrim opacity reaches 0.32 over 180ms while dialog transitions
from scale .92/opacity 0 to scale 1/opacity 1 over 240ms. Transform
origin should be approximately aligned with the triggering button's
centre using CSS custom properties.

Dialog contains heading, short copy, Cancel, Confirm. Escape/scrim
cancel. Confirm changes the same dialog into a 700ms finite working
state then success before closing.

Reduced motion: dialog appears at final scale with opacity-only
\<=100ms.

Acceptance: - Background is inert while dialog is open. - Focus moves
into dialog and returns to trigger. - Confirm does not spawn a second
surface. - Scrim and dialog have separate timing. - No infinite loading
state.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 37. Slider Thumb Pickup

**Suggested tags:** `slider, control, drag`

## Cursor implementation prompt

Build **SPX-??? --- Slider Thumb Pickup**.

Create a 280px horizontal slider with range 0--100, step 5. Idle thumb
diameter 20px; pointer/focus acquisition grows it to 28px over 120ms.
During drag, show a 44×32px value bubble 12px above thumb. Track fill
follows exact value. Snap to 5-point increments on movement.

Use a native range input or accessible custom slider semantics. Value
bubble disappears 180ms after release.

Reduced motion: thumb size and bubble state switch instantly.

Acceptance: - Value is always a multiple of 5. - Bubble follows thumb
centre. - Keyboard arrows update value. - Track fill and numeric value
cannot disagree. - Thumb returns to 20px after interaction.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 38. Button Loading Morph

**Suggested tags:** `button, progress, state`

## Cursor implementation prompt

Build **SPX-??? --- Button Loading Morph**.

Create a 160×48px "Save changes" button. On activation, keep its outer
dimensions fixed. Label fades out over 80ms; a 20px circular progress
arc constructs in its place and rotates for exactly 900ms. At
completion, stop rotation at a deterministic angle and morph/replace the
arc into a check-like success mark over 180ms. Show "Saved" after
another 100ms, then return to normal after 1200ms.

Reduced motion: use a static determinate arc that fills over 900ms with
no rotation.

Acceptance: - Button width never changes. - Repeated clicks are ignored
while busy. - Loading always has a finite completion. - Success state is
visually distinct. - Reset restores original label exactly.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 39. Grid Reorder Gap

**Suggested tags:** `drag, grid, reorder`

## Cursor implementation prompt

Build **SPX-??? --- Grid Reorder Gap**.

Create a 4×3 grid of 64×64px original tiles with 12px gaps. Long press
240ms or mouse drag threshold 6px acquires a tile. Lifted tile becomes
an absolute drag proxy scaled to 1.06. Its source position becomes one
visible empty gap. As pointer crosses another tile centre, move the gap
to that index and animate affected tiles to new positions over 160ms.

Drop inserts proxy into gap and removes elevated state. Escape cancels
to original order.

Reduced motion: affected tiles jump between grid slots; drag proxy still
follows pointer.

Acceptance: - Exactly one gap exists. - Dragged tile is never
duplicated. - Reordering uses pointer position, not random swapping. -
Cancel restores original ordering. - Drop produces a stable new DOM
order.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 40. Drag Proxy Formation

**Suggested tags:** `drag-drop, proxy, ownership`

## Cursor implementation prompt

Build **SPX-??? --- Drag Proxy Formation**.

Create a rich 300×92px file row containing icon, title, metadata, and
actions. After 7px drag threshold, visually condense the row into a
156×48px proxy containing only icon/title while leaving a 92px source
placeholder. Proxy follows pointer with an 8px offset and slight scale
1.03.

Provide two drop targets. Valid target gains a 2px acquisition border
when proxy centre enters its bounds. Drop into valid target absorbs
proxy and updates target count; invalid drop returns proxy to source
over 220ms.

Reduced motion: proxy formation and return happen instantly.

Acceptance: - Drag does not start on simple click. - Source layout stays
stable via placeholder. - Proxy contains reduced, not duplicated,
information. - Valid target acquisition is deterministic. - Invalid drop
restores source exactly.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 41. Invalid Drop Return

**Suggested tags:** `drag-drop, error, return`

## Cursor implementation prompt

Build **SPX-??? --- Invalid Drop Return**.

Focus on the return physics of a rejected drag. Use a 220×70px draggable
task card and one valid/one invalid target. When released outside a
valid target, freeze pointer ownership, then animate the proxy from its
release coordinates back to the source rectangle over 260ms with a
slight overshoot capped at 6px. Source placeholder remains until return
finishes.

If dropped on explicitly invalid target, trigger one 90ms boundary flash
before return. No shaking loop.

Reduced motion: proxy instantly returns after the invalid-state cue.

Acceptance: - Return starts from exact release coordinates. - Source
never collapses during rejected drag. - Invalid target gives one finite
cue. - Proxy is removed only after reaching source. - Valid drops never
run return animation.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 42. Screenshot Expand to Editor

**Suggested tags:** `screenshot, container-transform, editor`

## Cursor implementation prompt

Build **SPX-??? --- Screenshot Expand to Editor**.

Start with a 116×206px screenshot thumbnail at bottom-left of a 390×700
scaffold. Tapping it transforms the same thumbnail container into a
358×620px editor surface centred in the viewport over 380ms. Radius
changes `18px→26px`; screenshot representation grows into a large
preview; crop/action controls reveal after 180ms.

A Close action reverses to thumbnail if its timeout has not expired. Use
original mock screenshot content, not canvas capture.

Reduced motion: immediate geometry switch.

Acceptance: - Editor visibly originates from thumbnail. - Screenshot
representation stays continuous. - Controls appear after expansion
starts. - Closing reconstructs thumbnail position. - No browser capture
APIs.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 43. Volume Slider HUD

**Suggested tags:** `system-hud, slider, temporary`

## Cursor implementation prompt

Build **SPX-??? --- Volume Slider HUD**.

Create a host media screen. Pressing volume +/- keys in the specimen or
on-screen controls reveals a 72×280px temporary HUD 16px from the right
edge. It contains a vertical 180px track, 20px thumb, and generic
speaker glyph. HUD enters from translateX(90px) over 220ms and times out
after 2200ms inactivity.

Each input resets timeout. Value changes in 10-point increments. At 0,
glyph morphs to muted state. Clicking an expand control widens HUD to
240px and reveals three sliders.

Reduced motion: HUD appears/disappears in place.

Acceptance: - Timeout resets after every level change. - Level stays
0--100. - Expanded state uses same container. - Mute state appears
exactly at 0. - HUD never shifts host layout.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 44. Wi-Fi Searching-to-Connected Morph

**Suggested tags:** `connectivity, state, finite`

## Cursor implementation prompt

Build **SPX-??? --- Wi-Fi Searching-to-Connected Morph** using abstract
signal geometry.

Create a 300×180 connectivity card. On Connect, three nested signal arcs
illuminate sequentially every 180ms while a small centre dot performs a
finite 540ms acquisition cycle. After 900ms, stop all searching motion
and resolve into stable connected geometry plus text "Connected".

Add a Fail scenario button: after the same acquisition sequence, arcs
retract and "Try again" appears. No endless scanning.

Reduced motion: arcs step through discrete states without
rotation/pulsing.

Acceptance: - Searching always ends in success or failure. - Connected
state has no looping animation. - Fail path exposes retry. - Geometry is
original, not copied system artwork. - Reset returns to disconnected
state.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 45. Permission Prompt Materialise

**Suggested tags:** `permission, modal, system-surface`

## Cursor implementation prompt

Build **SPX-??? --- Permission Prompt Materialise**.

Create an app scaffold with a "Use microphone" feature. Activation opens
a centred 320×250px decision surface over a 0.28 scrim. Dialog begins
scale .94/opacity 0 and reaches final state in 220ms. Include an
original abstract microphone glyph, concise rationale, and three
actions: "While using", "Only this time", "Don't allow".

Choosing either grant state closes the prompt and updates the feature
card to Enabled; denial closes and shows a corrective snackbar. This is
a visual simulation only.

Reduced motion: prompt appears immediately.

Acceptance: - Prompt never calls browser permission APIs. - All three
choices produce deterministic states. - Focus is trapped while open. -
Escape behaves like denial/cancel. - Host feature visibly reflects
result.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 46. Keyboard Rise & Content Avoidance

**Suggested tags:** `keyboard, layout, focus`

## Cursor implementation prompt

Build **SPX-??? --- Keyboard Rise & Content Avoidance**.

Create a 390×700 chat/form scaffold with an input near the bottom.
Focusing it should reveal a simulated 390×260px keyboard panel from
below over 260ms. The app viewport should resize/reflow so the focused
input remains at least 16px above the keyboard, rather than simply
covering content. Include several generic key rectangles but no exact
platform keyboard copy.

Blur or a keyboard-dismiss control reverses. Also test a second input
higher on page that requires little/no scroll adjustment.

Reduced motion: keyboard appears instantly and layout reflows
immediately.

Acceptance: - Bottom input remains visible. - Higher input is not
unnecessarily moved. - Keyboard changes available layout height. -
Dismiss restores previous scroll position where possible. - No native
keyboard APIs are assumed.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 47. Quick Settings Expansion

**Suggested tags:** `quick-settings, grid, container-transform`

## Cursor implementation prompt

Build **SPX-??? --- Quick Settings Expansion**.

Create a compact 360×96px control strip with four circular/compact
controls. Dragging shade expansion or pressing Expand transforms it into
a 360×330px panel with a 2×3 grid of 154×68px tiles, brightness slider,
and status header. Existing first four controls should morph/reposition
into their corresponding expanded tiles rather than disappear and
respawn.

Duration 360ms. Additional controls fade in after 45% progress. Collapse
reverses.

Reduced motion: switch geometry immediately while preserving semantic
continuity.

Acceptance: - First four controls have visible compact→expanded
continuity. - Extra controls only exist visually in expanded phase. -
Expanded layout fits without overflow. - Collapse restores original
order. - No Android proprietary icons.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 48. Notification Stack Expansion

**Suggested tags:** `notifications, stack, expand`

## Cursor implementation prompt

Build **SPX-??? --- Notification Stack Expansion**.

Create four notifications visually compressed into a 336×150px layered
stack, each subsequent card offset 8px vertically and scaled by 0.98.
Clicking the stack expands it to four separate 336×74px cards with 10px
gaps over 320ms. Front card moves least; rear cards travel farther.

Collapse reverses into the layered stack. Keep each card's DOM identity
and content.

Reduced motion: cards jump between stacked/separate positions.

Acceptance: - Four cards remain individually identifiable. - Expanded
stack has no overlaps. - Collapsed state clearly implies multiple
items. - No cards are created/destroyed during toggle. - Height of
parent tracks final layout correctly.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 49. Extended FAB Collapse

**Suggested tags:** `fab, scroll, adaptive-control`

## Cursor implementation prompt

Build **SPX-??? --- Extended FAB Collapse**.

Create a 152×56px extended action button with icon and "New item" label,
positioned over a scrollable feed. When downward scroll accumulation
exceeds 48px, contract it to a 56×56px icon-only FAB over 240ms, keeping
the trailing/right edge anchored. On upward scroll accumulation of 36px,
expand again.

Label should fade/clip before width finishes shrinking. Reset
accumulated direction distance whenever scroll direction changes.

Reduced motion: width state switches immediately.

Acceptance: - Right edge remains fixed. - Minor scroll jitter does not
toggle state. - Label never spills outside shrinking container. -
Up/down thresholds differ as specified. - At scroll top, extended state
is restored.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# 50. Tab Indicator Stretch

**Suggested tags:** `tabs, indicator, selection`

## Cursor implementation prompt

Build **SPX-??? --- Tab Indicator Stretch**.

Create four equal-width tabs in a 336px strip. Use one 34×3px indicator.
On selection, animate indicator between tab centres over 300ms. During
first 45% of travel, stretch its width toward
`34 + min(distance*0.45, 70)` while the leading edge advances; during
final 55%, trailing edge catches up and width returns to 34px.

Content below uses directional fade-through. Keyboard arrows switch
tabs.

Reduced motion: indicator jumps to new centre at fixed 34px width.

Acceptance: - Only one indicator exists. - Width returns exactly to 34px
after every transition. - Longer moves stretch more, capped at 104px. -
Rapid tab changes settle correctly. - Selected tab has semantic aria
state.

Also complete the specimen metadata, integration instructions, scaffold
declaration, reduced-motion contract, and observable acceptance entries,
then verify the result inside the sandboxed preview.

------------------------------------------------------------------------

# Build-order note

The list is front-loaded with the most distinctive Android interaction
primitives: predictive back, container transforms, touch ripple,
shared-axis motion, launcher/task transitions, system surfaces, sheets,
overscroll physics, and adaptive components.

If building sequentially, start at #1 and work downward. The early
specimens establish a reusable Android-inspired motion vocabulary that
later specimens can explore without becoming copies of complete Android
screens.
