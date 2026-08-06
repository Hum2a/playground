# iOS & macOS Specimen Implementation Prompts --- Batch of 50

These prompts are designed for Cursor to implement specimens in the
`playground.humza-butt.space` repository.

## Global instruction for every prompt

Before implementing any specimen: - Inspect the repository and determine
the next available SPX reference. - Follow existing specimen folder,
metadata, registration, preview, scaffold, integration, accessibility,
reduced-motion, and recreation-contract conventions. - Register
explicitly in `src/specimens/index.ts`; do not add magic globs. - Do not
modify catalogue chrome. - Keep the specimen self-contained and
iframe-safe under `<iframe sandbox="allow-scripts">`. - Prefer HTML +
CSS. Use small deterministic JavaScript only when interaction state,
pointer position, dragging, or velocity genuinely requires it. - No
React/Vue inside specimens, no fetch, no storage, no parent-window
access, no same-origin assumptions. - Use original geometry and generic
software content. Do not copy Apple logos, proprietary icons,
application screens, exact branded artwork, or claim the specimen is an
Apple system component. - Freeze exact dimensions, coordinates,
durations, easing curves, thresholds, counts, and colours in the
recreation contract. - Honour both `prefers-reduced-motion` and
`data-force-reduced-motion`. - Run the repository's normal checks before
finishing.

------------------------------------------------------------------------

# 1. Interactive Back Swipe

**Primitive:** `navigation / gesture / threshold`

Create and register **Interactive Back Swipe**.

## Intent

Build a gesture-driven navigation specimen inspired by the spatial
continuity of iOS back navigation. The current detail surface follows a
horizontal drag while the previous surface is progressively revealed
underneath. Release position and velocity determine whether navigation
commits or cancels.

## Scaffold

Previous surface: `PROJECTS` Current surface: `PROJECT // ORBIT` Back
destination label: `PROJECTS` Provide pointer/touch interaction plus
`REPLAY`.

## Contract

Preview: approximately `420 × 560px`. Current page begins at
`translateX(0)`. Previous page sits beneath at `translateX(-28%)` and
`scale(.98)`. Only drags beginning in the left `28px` edge zone start
navigation. Map horizontal drag from `0–100%` of preview width. Current
surface follows pointer 1:1 horizontally. Previous surface maps from
`-28% → 0%`. Previous opacity may map `.72 → 1`, but geometry must also
communicate depth. Commit if either: - drag reaches `42%` width, or -
release velocity exceeds `0.62 px/ms` while moving right. Otherwise
cancel. Commit settle: `260ms`, cubic-bezier approximating a restrained
spring. Cancel settle: `220ms`. During drag, reveal a slim back chevron
and `PROJECTS` label from the left edge. At 42%, give exactly one `2px`
threshold tick response. No vibration API.

## Reduced motion

Keep the gesture and threshold semantics, but remove parallax/scale.
Pages may switch immediately on committed release.

## Acceptance

-   Gesture starts only within the 28px edge zone.
-   Current page tracks the drag.
-   Previous page is revealed continuously.
-   42% position threshold works.
-   Fast release above 0.62 px/ms can commit below 42%.
-   Short/slow release cancels and restores current page.
-   No page remains half-positioned after release.
-   Reduced motion preserves interactive back behaviour.

------------------------------------------------------------------------

# 2. Bottom Sheet Detent Snap

**Primitive:** `sheet / drag / spring`

Create and register **Bottom Sheet Detent Snap**.

## Intent

Create a draggable bottom sheet with three fixed semantic detents. The
specimen should demonstrate physical settling between states rather than
generic modal movement.

## Scaffold

Host page: `MAP // ROUTE 04` Sheet: `ROUTE DETAILS` Detents: `COLLAPSED`
`MEDIUM` `EXPANDED`

## Contract

Preview height: `600px`. Sheet width: `100%`. Detent visible heights: -
collapsed `112px` - medium `318px` - expanded `520px` Top corners:
`18px`. Drag handle: `36 × 5px`. Pointer drag updates sheet position
directly. On release, choose a detent using position plus velocity.
Velocity threshold: `0.55 px/ms`. Without velocity override, nearest
detent wins. Spring settle target duration: approximately `320ms`. Use a
CSS/JS spring-like easing with one restrained overshoot no greater than
`8px`. Content density changes by detent: collapsed: title + summary
only. medium: adds route metrics. expanded: adds full step list. Do not
abruptly swap the entire sheet DOM; progressively reveal sections around
detent boundaries.

## Reduced motion

Dragging remains direct. Release snaps without overshoot using `160ms`
or immediate transition under forced reduced motion.

## Acceptance

-   Exactly three detents.
-   Sheet can be dragged in both directions.
-   Release selects a deterministic detent.
-   Velocity can advance/retreat one detent.
-   Overshoot never exceeds 8px.
-   Expanded content is not visible in collapsed state.
-   Final sheet always rests on an exact detent.

------------------------------------------------------------------------

# 3. Scroll Rubber Band

**Primitive:** `scroll / physics / boundary`

Create and register **Scroll Rubber Band**.

## Intent

Demonstrate non-linear resistance when content is pulled beyond its
valid scroll boundary, followed by a spring return.

## Scaffold

Scrollable card: `ACTIVITY LOG` 12 fixed rows. Start at scroll top.
Provide an obvious but restrained top boundary marker.

## Contract

Viewport: `360 × 440px`. When user drags downward while already at
scrollTop 0, do not move content 1:1. Use resistance:
`displayOffset = 90 * (1 - exp(-dragDistance / 120))` Clamp displayed
overscroll to `90px`. Stretch a top boundary region from `0 → 24px` as
overscroll increases. At `60px` displayed overscroll, construct a small
`RELEASE` marker. On release, content springs to `0`. Settle: about
`420ms`. Maximum overshoot after release: `4px`. No looping spinner and
no refresh action; this specimen is only boundary physics.

## Reduced motion

Permit at most `12px` static resisted displacement and return
immediately on release.

## Acceptance

-   Normal list scrolling still works.
-   Overscroll activates only at top boundary.
-   Drag displacement is non-linear.
-   Displayed overscroll never exceeds 90px.
-   RELEASE marker appears at 60px.
-   Releasing always restores exact zero offset.
-   No refresh is triggered.

------------------------------------------------------------------------

# 4. Matched Card Expansion

**Primitive:** `shared element / expansion / navigation`

Create and register **Matched Card Expansion**.

## Intent

A compact project card continuously becomes a detail surface.
Identity-bearing geometry must persist through the transition instead of
cross-fading between unrelated layouts.

## Scaffold

Grid with three cards: `ORBIT` `ATLAS` `NOVA` ORBIT is interactive.
Detail contains title, status, metrics and description.

## Contract

Preview: `520 × 520px`. ORBIT card: `180 × 118px`. On `OPEN ORBIT`,
measure/freeze its exact start bounds. Create a transition layer that
expands to a detail surface inset `20px` from preview edges. Duration:
`460ms`. Easing: cubic-bezier with fast initial lift and soft settle.
Title ORBIT remains continuously visible and changes position/size:
`20px → 34px`. Card border becomes detail boundary. Card metadata
redistributes rather than fading all at once. Other cards recede with
`scale(.96)` and `translateY(8px)` over `180ms`. Detail-only content
begins revealing after 55% transition progress. Provide CLOSE that
reverses spatial ownership back to the original card.

## Reduced motion

Swap between card and detail states without large-scale movement;
preserve source/destination relationship with a short opacity/outline
change.

## Acceptance

-   ORBIT title persists through expansion.
-   Transition begins at exact card bounds.
-   Final detail bounds are deterministic.
-   Other cards remain visible until detail takes priority.
-   Close returns to exact originating card.
-   Repeated open/close does not drift geometry.

------------------------------------------------------------------------

# 5. Compact Activity Expansion

**Primitive:** `compact state / morph / live activity`

Create and register **Compact Activity Expansion**.

## Intent

Create a compact persistent task indicator that structurally expands
into a richer live-status surface and can contract again.

## Scaffold

Task: `DEPLOY // 2.4.0` Compact state: `72%` Expanded state includes:
`BUILD PASSED` `TEST PASSED` `DEPLOY 72%` `ETA 00:38`

## Contract

Compact geometry: `126 × 36px`. Expanded geometry: `318 × 152px`. Use a
dark original capsule-like rounded rectangle but do not reproduce
Dynamic Island dimensions or Apple UI. Radius morph: `18px → 24px`.
Expansion: `360ms`. Compact progress glyph remains visible throughout
and relocates to expanded header. Expanded content constructs in order:
header at 35%, job rows at 50%, ETA at 68%. Contraction reverses
information hierarchy but should not simply play every keyframe
backward. Provide `EXPAND` and `COLLAPSE`. Exactly two small status
nodes exist in compact state.

## Reduced motion

Switch geometry immediately or in a short `100ms` non-scaling
transition. All status text remains available.

## Acceptance

-   One compact representation becomes one expanded representation.
-   Width changes 126→318px.
-   Height changes 36→152px.
-   Progress identity persists.
-   Exactly two compact status nodes.
-   Expanded rows appear in deterministic order.
-   Collapse returns to exact compact dimensions.

------------------------------------------------------------------------

# 6. Dual Activity Split

**Primitive:** `compact state / split / concurrency`

Create and register **Dual Activity Split**.

## Intent

One compact status region initially represents a single foreground task.
A second concurrent task begins, causing the region to divide into two
meaningful activity zones.

## Scaffold

Initial: `UPLOAD // 64%` Incoming: `TIMER // 04:12` Final compact zones:
left `UPLOAD 64%` right `04:12`

## Contract

Initial region: `196 × 40px`. On `START TIMER`, compress main region
horizontally to `126px`. Create a `12px` gap. Secondary region grows
from `0 → 58px`. Total split animation: `320ms`. The upload progress
mark must remain attached to the left region. Timer constructs digits
using vertical clipping. Exactly one connecting bridge appears for the
first `90ms`, then separates completely. Provide `END TIMER`; secondary
region collapses and upload reclaims width. No continuous decorative
animation except timer value if implemented; if looping time is used,
reduced motion may keep the displayed value static.

## Reduced motion

Immediately switch between single and dual layouts.

## Acceptance

-   Starts as one activity.
-   Second task creates a second region.
-   Upload identity never jumps to the wrong region.
-   Gap is exactly 12px.
-   Secondary width ends at 58px.
-   Ending timer returns to one 196px region.

------------------------------------------------------------------------

# 7. Dock Magnification

**Primitive:** `pointer proximity / magnification`

Create and register **Proximity Dock Magnification**.

## Intent

Create a pointer-proximity magnification rail inspired by macOS Dock
behaviour without copying Dock icons or artwork.

## Scaffold

Nine abstract application tiles: `01`--`09`. Use original geometric
glyphs.

## Contract

Base tile: `42 × 42px`. Gap: `8px`. Dock rail padding: `12px`. Track
pointer x-position within the rail. For each tile centre calculate
distance `d`. Scale: `1 + 0.65 * exp(-(d*d)/(2*70*70))` Clamp scale to
`1.65`. Apply vertical translation so enlarged items appear anchored to
the rail baseline. Neighbouring tiles must redistribute horizontally to
avoid overlap rather than simply transform over one another. Pointer
leaving rail settles all tiles to 1 over `240ms`. No runtime randomness.

## Reduced motion

Disable proximity scaling entirely; retain hover/focus outline.

## Acceptance

-   Exactly nine items.
-   Maximum scale 1.65.
-   Closest tile is largest.
-   Magnification falls with distance.
-   Enlarged tiles do not overlap.
-   Leaving dock restores exact baseline layout.
-   Keyboard focus remains understandable without motion.

------------------------------------------------------------------------

# 8. Dock Launch Bounce

**Primitive:** `launch / finite attention`

Create and register **Application Launch Bounce**.

## Intent

Represent launching an application from a compact launcher item using a
finite vertical bounce that resolves into a persistent running state.

## Scaffold

Five abstract launcher items. Target: `APP // 03`. Trigger: `LAUNCH 03`.

## Contract

Tiles: `44 × 44px`. Target performs exactly `3` major bounces. Peak
heights: `34px` `24px` `14px`. Total bounce sequence: about `820ms`. Use
decreasing duration/height. After third landing, hold `80ms`. Then
construct a running indicator beneath target: `5 × 5px`. Status label
changes `CLOSED → RUNNING`. Other tiles do not bounce. Trigger disabled
while launch sequence is active.

## Reduced motion

No bounce. Running indicator appears immediately and status becomes
RUNNING.

## Acceptance

-   Exactly three bounces.
-   Each bounce is lower than previous.
-   Only App 03 moves.
-   Running indicator appears only after final landing.
-   Sequence cannot stack from repeated clicks.
-   Final state is static RUNNING.

------------------------------------------------------------------------

# 9. Mission Control Spread

**Primitive:** `window overview / spatial memory`

Create and register **Workspace Overview Spread**.

## Intent

Transform an overlapping desktop into a readable overview while
preserving each window's identity and approximate spatial relationship.

## Scaffold

Exactly five windows: `EDITOR` `TERMINAL` `DOCS` `CHAT` `PREVIEW`

## Contract

Initial windows overlap with fixed coordinates and z-order. On
`OVERVIEW`, each window moves to a predetermined overview rectangle with
minimum `18px` separation. Duration: `520ms`. Windows scale between
`.62` and `.78` depending on target slot. Titles remain readable. A
desktop-space label `SPACE // 01` appears after 60% progress. No window
fades out. Selecting `EDITOR` in overview restores all windows to their
original coordinates and brings EDITOR to front. Restore: `460ms`. Use
transform-based animation.

## Reduced motion

Switch directly between desktop and overview arrangements.

## Acceptance

-   Exactly five windows.
-   Initial overlap is obvious.
-   Overview has no overlaps.
-   Window identities persist.
-   Restore returns all windows to exact original coordinates.
-   Selected EDITOR ends frontmost.

------------------------------------------------------------------------

# 10. Stage Manager Stack Shift

**Primitive:** `workspace / depth / group swap`

Create and register **Staged Workspace Swap**.

## Intent

Create a layered workspace swap inspired conceptually by Stage Manager.
One foreground workspace trades places with a staged background group.

## Scaffold

Foreground group `BUILD` with two windows. Staged group `RESEARCH` with
three mini-window silhouettes.

## Contract

Foreground occupies central `360 × 330px` region. Stage rail sits left,
width `92px`. On `SWAP`, BUILD compresses toward rail: scale `1 → .72`
translateX about `-190px`. RESEARCH simultaneously expands from rail:
scale `.72 → 1` translateX about `190px → 0`. Crossing point around 50%
should preserve both groups, not cross-fade one away. Duration: `480ms`.
Foreground z-order transfers at 52%. BUILD becomes a staged two-window
stack. RESEARCH becomes full three-window workspace. Exactly one stage
marker transfers active state.

## Reduced motion

Instantly swap group layouts with no large travel.

## Acceptance

-   Two distinct groups.
-   BUILD begins foreground.
-   RESEARCH begins staged.
-   Both remain visible during swap.
-   Z-order changes once at deterministic midpoint.
-   Final RESEARCH workspace contains three windows.
-   BUILD remains available in stage rail.

------------------------------------------------------------------------

# 11. Large Title Collapse

**Primitive:** `scroll / typography / navigation`

Create and register **Large Title Collapse**.

## Intent

Create a scroll-driven title transition where a large contextual heading
condenses into a compact navigation title while content moves
underneath.

## Scaffold

Page title: `PROJECTS` Subtitle: `12 ACTIVE` At least 10 list rows.

## Contract

Scroll viewport: `380 × 500px`. Large title baseline size: `42px`.
Compact title size: `17px`. Collapse range: scrollY `0–84px`. Large
title translates upward by `54px`. Compact title becomes fully
established by `72px`. Do not simply crossfade two identical titles. Use
one identity-bearing title or carefully matched layers whose spatial
handoff is continuous. Navigation bar height: `52px`. At scrollY \>=
84px, compact title remains fixed. On return to top, restore large
title. No JS if CSS scroll-driven approach is robust in repo target;
otherwise tiny deterministic JS.

## Reduced motion

Keep size/position state changes tied to scroll but remove interpolated
scale movement where possible.

## Acceptance

-   Large title is visible at top.
-   Collapse occurs over 84px.
-   Compact title is established by 72px.
-   Title remains readable throughout.
-   Scrolling back restores large state.

------------------------------------------------------------------------

# 12. Long-Press Lift

**Primitive:** `press / context / elevation`

Create and register **Long-Press Lift**.

## Intent

Create a touch/pointer hold interaction where a content card separates
from its surrounding context before secondary actions appear.

## Scaffold

Three message cards. Target: middle card `MESSAGE // 04`. Hold
threshold: `420ms`.

## Contract

Pointer down begins hold timer. Movement beyond `8px` before threshold
cancels long press. At 420ms: target scales `1 → 1.035`, translates
`-4px` vertically, surrounding cards recede to `.975`, and a restrained
shadow/material boundary appears. Lift transition: `160ms`. Exactly four
tiny corner ticks construct around target. After lift, expose action
rail: `COPY` `PIN` `DELETE`. Pointer release before 420ms performs no
lift. Provide RESET.

## Reduced motion

At threshold, switch directly to lifted/context state without
scale/translation.

## Acceptance

-   Long press threshold exactly 420ms.
-   Movement over 8px cancels.
-   Early release does nothing.
-   Only target card lifts.
-   Exactly four ticks.
-   Actions appear only after lift.
-   Reset restores original layout.

------------------------------------------------------------------------

# 13. Context Menu Bloom

**Primitive:** `context menu / anchor / expansion`

Create and register **Context Menu Bloom**.

## Intent

A compact contextual menu should construct outward from a source
object's location, making anchor ownership obvious.

## Scaffold

Source row: `FILE // NOTES.MD` Menu actions: `OPEN` `RENAME` `DUPLICATE`
`DELETE`

## Contract

Source anchor point near row trailing edge. Menu final size:
`188 × 176px`. Initial transform origin must match anchor. Sequence: 1.
anchor node `6px` appears, `60ms` 2. menu boundary expands to
`188 × 176px`, `180ms` 3. rows reveal top-to-bottom at `35ms` stagger 4.
active first row receives selection backing. Menu offset from anchor:
`10px`. Dismiss by outside click or ESC. Dismiss collapses toward anchor
over `150ms`. No generic centre-screen scale.

## Reduced motion

Menu appears/disappears immediately at anchored position.

## Acceptance

-   Menu originates from source row.
-   Exactly four actions.
-   Boundary constructs before all rows appear.
-   Dismiss returns toward anchor.
-   ESC works.
-   Focus is moved/restored appropriately where practical.

------------------------------------------------------------------------

# 14. App Launch Expansion

**Primitive:** `grid / expansion / shared origin`

Create and register **Grid Tile Launch Expansion**.

## Intent

Create a full-surface launch transition where a grid tile expands from
its exact spatial origin. Use original app tiles and generic content.

## Scaffold

3×3 grid of abstract app tiles. Target `APP // 05`. Destination surface:
`ANALYTICS`.

## Contract

Tile size: `72 × 72px`. Grid gap: `22px`. On launch, freeze target
bounds. Target expands to preview bounds over `430ms`. Corner radius
morph: `18px → 0`. Internal glyph scales only to `1.18`, then becomes
destination header glyph rather than ballooning with container. Other
icons scale `.92` and recede over `180ms`. Destination content reveals
after 58%. Close contracts back to exact App 05 slot. No copied iOS
icons.

## Reduced motion

Directly switch grid/detail with a short non-spatial state change.

## Acceptance

-   Exactly nine tiles.
-   App 05 is launch origin.
-   Expansion begins at exact tile bounds.
-   Glyph remains recognisable through transition.
-   Close returns to exact slot.
-   No geometry drift after repeats.

------------------------------------------------------------------------

# 15. Notification Stack Compression

**Primitive:** `notification / stack / aggregation`

Create and register **Notification Stack Compression**.

## Intent

Three independent notifications condense into one layered stack
representation while retaining count and top-item identity.

## Scaffold

Notifications: `BUILD COMPLETE` `REVIEW REQUESTED` `DEPLOY READY`

Trigger: `COMPRESS`.

## Contract

Three cards: `320 × 74px`. Vertical gap initially `12px`. On compress:
bottom card moves behind top with y-offset `12px`, scale `.96`; middle
offset `6px`, scale `.98`; top remains scale `1`. Total: `320ms`. Final
stack shows exactly three visible top-edge layers. Counter
`3 NOTIFICATIONS` constructs after settle. Individual secondary text on
hidden cards becomes inaccessible visually but must remain represented
for accessibility. Provide `EXPAND` reversing into three readable cards.

## Reduced motion

Instantly switch layouts.

## Acceptance

-   Starts with three readable notifications.
-   Ends as one obvious three-layer stack.
-   Top notification remains readable.
-   Count equals 3.
-   Expand restores original order and spacing.

------------------------------------------------------------------------

# 16. Spotlight Materialise

**Primitive:** `search / overlay / focus`

Create and register **Command Search Materialise**.

## Intent

Create a central search surface inspired conceptually by Spotlight's
immediate search focus, using original styling and generic results.

## Scaffold

Quiet desktop-like host with three background panels. Search surface:
input placeholder `Search commands` Results: `Open Project` `Run Build`
`View Logs` `Deploy Release`

## Contract

Search panel final: `520 × 286px`. Initial state originates as a
`44 × 44px` central search glyph/field seed. On `OPEN SEARCH`:
background scales `.985` and reduces contrast structurally; seed expands
to `520 × 58px` in `180ms`; results region expands height `58 → 286px`
in next `160ms`; results reveal at `30ms` stagger. Input receives focus.
ESC reverses and restores focus to trigger. No Apple logos/icons.

## Reduced motion

Open final panel immediately; preserve focus semantics.

## Acceptance

-   Search begins compact.
-   Input region establishes before results.
-   Exactly four results.
-   Keyboard focus enters search.
-   ESC closes and restores focus.
-   Background remains present.

------------------------------------------------------------------------

# 17. Drag Proxy Formation

**Primitive:** `drag / compression / portability`

Create and register **Drag Proxy Formation**.

## Intent

When dragging a complex object, condense it into a portable
representation rather than moving the entire original layout card.

## Scaffold

Source card: `REPORT // Q3` `18 PAGES` `4 CHARTS` `UPDATED 12:42` Drop
zone: `ARCHIVE`.

## Contract

Card: `260 × 150px`. Pointer movement threshold to begin drag: `6px`. On
drag start, original card remains as a source placeholder. A proxy forms
from its geometry: `260×150 → 116×64px` over `140ms`. Information
hierarchy collapses: remove UPDATED first, then chart count, retain
`REPORT // Q3` and `18 PAGES`. Proxy follows pointer with `8px` offset.
Drop zone reacts when proxy centre enters its bounds. On valid drop, use
absorption semantics. On cancel, proxy returns and merges with
placeholder.

## Reduced motion

Use a fixed compact proxy immediately with no formation morph.

## Acceptance

-   Drag begins only after 6px movement.
-   Original source location remains represented.
-   Proxy is smaller than source.
-   Identity and page count persist.
-   Valid drop target responds.
-   Cancel restores source without duplicate cards.

------------------------------------------------------------------------

# 18. Drop Target Magnetism

**Primitive:** `drag / target / attraction`

Create and register **Drop Target Magnetism**.

## Intent

A draggable object approaching a valid destination should be subtly
attracted and aligned before drop, communicating validity through
motion.

## Scaffold

Draggable `FILE // 07`. Valid target `ARCHIVE`. Invalid target `LOCKED`.

## Contract

Drag proxy: `92 × 52px`. ARCHIVE magnetic radius: `86px`. Inside radius,
blend pointer position toward target centre: 0% attraction at 86px,
maximum 28% positional attraction at 0px. Proxy rotation aligns from
arbitrary drag angle to `0deg`. ARCHIVE boundary expands by `4px`.
Exactly four corner acquisition ticks appear once distance \< `42px`.
LOCKED never attracts. Leaving magnetic radius returns direct pointer
tracking. Drop inside ARCHIVE commits; outside returns to source.

## Reduced motion

Disable positional magnetism; use static valid-target outline when in
bounds.

## Acceptance

-   Only ARCHIVE attracts.
-   Attraction begins at 86px.
-   Maximum attraction limited to 28%.
-   Exactly four acquisition ticks below 42px.
-   Leaving radius restores normal drag.
-   Invalid target never pulls proxy.

------------------------------------------------------------------------

# 19. Quick Look Expansion

**Primitive:** `preview / expansion / context preservation`

Create and register **Quick Preview Expansion**.

## Intent

Expand a selected file representation into a larger preview while
keeping its surrounding file context visible.

## Scaffold

File list with five rows. Selected: `DESIGN.PDF`. Preview content uses
generic document blocks, not a copied Finder/Quick Look screen.

## Contract

Selected row height: `52px`. Preview final: `420 × 330px`. On `PREVIEW`,
create a matched transition from file row's icon/title region toward
preview header. Duration: `380ms`. List behind shifts back with
`scale(.985)` but remains visible. Preview boundary constructs before
document contents. Header identity `DESIGN.PDF` persists. Document
content reveals in three blocks at `45ms` stagger. ESC/CLOSE collapses
to selected row. Do not navigate away.

## Reduced motion

Show/hide preview directly while preserving selected row.

## Acceptance

-   File list remains present.
-   DESIGN.PDF identity persists.
-   Preview expands from selected row context.
-   Exactly three document content blocks reveal.
-   Close returns focus/visual ownership to selected row.

------------------------------------------------------------------------

# 20. Control Centre Module Expansion

**Primitive:** `control / compact-to-rich`

Create and register **System Module Expansion**.

## Intent

A compact system-control tile expands into detailed controls while
preserving its current value and identity.

## Scaffold

Compact module: `AUDIO` `62%` Expanded: slider, `OUTPUT // SPEAKERS`,
`BALANCE // 0`.

## Contract

Compact: `142 × 72px`. Expanded: `320 × 210px`. Expansion: `340ms`. The
`62%` value remains continuously visible and moves into slider header.
Slider track constructs after boundary reaches 70% of final width.
Output row appears next, then balance. Stagger: `45ms`. Collapse
preserves any changed slider value. Provide controls to set volume 62→78
while expanded.

## Reduced motion

Immediate compact/expanded state swap; slider remains functional.

## Acceptance

-   Compact and expanded states share AUDIO identity.
-   62% persists through expansion.
-   Expanded size exact.
-   Detail rows reveal in order.
-   Changed volume persists after collapse.

------------------------------------------------------------------------

# 21. AirDrop Transfer Arc

**Primitive:** `nearby transfer / file movement`

Create and register **Nearby Transfer Arc**.

## Intent

Represent sending one file from a local source to a discovered nearby
recipient using a visible transfer path and explicit
acceptance/completion states.

## Scaffold

Source: `THIS DEVICE` Recipient: `DEVICE // B` File:
`REPORT.PDF // 4.2MB` Trigger: `SEND`.

## Contract

Source and recipient separated by about `280px`. Recipient begins
`AVAILABLE`. On SEND: recipient gets four acquisition brackets, `100ms`.
Status `WAITING ACCEPTANCE`. After deterministic `260ms`, status
`ACCEPTED`. Only then create file proxy `74 × 44px`. Proxy follows a
shallow upward quadratic arc over `520ms`. Progress values tied to path:
0,25,50,75,100. At arrival recipient boundary expands `4px`, proxy
compresses into recipient. Final `RECEIVED`. No network calls.

## Reduced motion

Show accepted then received state without arc travel.

## Acceptance

-   Transfer does not begin before acceptance.
-   Exactly four acquisition brackets.
-   One file proxy.
-   Progress reaches 100.
-   Proxy ends inside recipient, not floating nearby.
-   Final status RECEIVED.

------------------------------------------------------------------------

# 22. Handoff Continuation

**Primitive:** `cross-device / state ownership`

Create and register **Task Handoff Continuation**.

## Intent

Transfer ownership of an in-progress task from one device/context
representation to another while preserving exact progress.

## Scaffold

Device A: `DESKTOP` Device B: `TABLET` Task: `EDIT // REPORT` Progress:
`68%` Trigger: `HAND OFF`.

## Contract

Two abstract device frames, not Apple hardware replicas. A initially
owns task card. On handoff: construct a segmented bridge of exactly `6`
segments. Task card compresses `180×92 → 92×48px`. At midpoint ownership
label changes: A `ACTIVE → RELEASED` B `WAITING → RECEIVING`. Progress
must remain `68%` throughout. Token docks into B and expands back to
`180×92`. Bridge retracts. B continues progress once to `74%` after
arrival to prove continuity.

## Reduced motion

Immediately move task ownership to B at 68%, then show 74%.

## Acceptance

-   A owns task initially.
-   Exactly six bridge segments.
-   Progress never resets.
-   Ownership changes once.
-   B receives same task identity.
-   B continues from 68 to 74.

------------------------------------------------------------------------

# 23. Pull to Refresh

**Primitive:** `scroll / threshold / refresh`

Create and register **Pull To Refresh Threshold**.

## Intent

Turn top overscroll into a thresholded refresh interaction with clear
pre-threshold and committed states.

## Scaffold

Feed with 8 rows. Last updated: `12:42:18`. Trigger is direct drag.

## Contract

Use resisted overscroll with max displayed pull `110px`. Refresh
threshold: `72px`. 0--71px: indicator arc constructs proportionally but
status `PULL`. At 72px: exactly two threshold ticks appear and status
becomes `RELEASE`. If released below 72px, return to zero without
refresh. If released at/above 72px, hold content at `58px`, run one
finite refresh cycle `620ms`, then update timestamp to `12:43:02`.
Refresh glyph rotates exactly one full turn, not indefinitely. Then
content returns to zero.

## Reduced motion

Keep threshold interaction; committed refresh uses static working
indicator and direct completion.

## Acceptance

-   Pull is resisted.
-   Threshold exactly 72px.
-   Below threshold cancels.
-   At/above threshold commits.
-   Exactly one refresh rotation.
-   Timestamp changes only after committed refresh.
-   Content returns to zero.

------------------------------------------------------------------------

# 24. Swipe Full-Commit

**Primitive:** `swipe / destructive threshold`

Create and register **Swipe Full Commit**.

## Intent

A list-row swipe initially reveals an action, but crossing a second
threshold changes the gesture from reveal into automatic execution.

## Scaffold

Row: `CACHE // BUILD-04` Action: `DELETE`.

## Contract

Row width: `340px`. Drag left. Action reveal begins immediately behind
row. First threshold: `72px`, where DELETE is fully readable.
Full-commit threshold: `190px`. Before 190px, releasing settles either
closed or at `88px` action-open state based on nearest state. At 190px,
action backing expands to occupy full row width and exactly one commit
marker appears. On release beyond threshold, row completes travel left
and collapses height `64 → 0px` over `220ms`. Neighbour row moves into
space. Provide `UNDO` specimen control to restore row.

## Reduced motion

Preserve thresholds but remove large automatic travel; commit may
collapse immediately.

## Acceptance

-   Two distinct thresholds.
-   DELETE readable at 72px.
-   Full commit only at 190px.
-   Release before full threshold can leave action revealed.
-   Release after threshold deletes automatically.
-   Undo restores exact row position.

------------------------------------------------------------------------

# 25. Circular Progress Completion Morph

**Primitive:** `progress / morph / completion`

Create and register **Progress Ring Completion Morph**.

## Intent

A deterministic circular progress indicator reaches 100% and directly
becomes completion geometry rather than swapping to an unrelated success
icon.

## Scaffold

Operation: `EXPORT` Progress: `0% → 100%` Final: `COMPLETE`.

## Contract

Ring: `72 × 72px`. Stroke: `5px`. Progress values: 0, 18, 37, 61, 84,
100. Total progression: `1100ms`. At 100%, hold ring for `100ms`. Then
reuse ring stroke geometry to construct a check-like angular completion
mark: ring retracts from 360° to a `110°` retained arc while two
internal segments construct. Morph duration: `240ms`. No particle burst.
Final label changes `EXPORT → COMPLETE`.

## Reduced motion

Immediately show final completion geometry.

## Acceptance

-   Progress reaches exact listed values.
-   100% ring is visible before morph.
-   Completion mark derives from existing ring geometry.
-   No unrelated icon crossfade.
-   Final state static.

------------------------------------------------------------------------

# 26. Invalid Field Shake

**Primitive:** `validation / refusal`

Create and register **Invalid Field Shake**.

## Intent

Create a compact finite validation refusal gesture suitable for form
fields. The movement should be readable but not cartoonishly violent.

## Scaffold

Field: `PROJECT CODE` Initial value: `ORBIT?` Rule: uppercase
letters/numbers/hyphen only. Trigger: `SUBMIT`.

## Contract

Field width: `300px`. On invalid submit, move field horizontally through
exact offsets: `0, -6, +5, -4, +3, -2, 0px`. Total duration: `310ms`.
Error boundary constructs at first negative offset. Inline error region
expands height `0 → 34px` after `90ms`. Copy: `Use A–Z, 0–9 or -`.
Exactly one small error tick appears at field trailing edge. Correcting
value to `ORBIT-7` and submitting collapses error region and constructs
success tick.

## Reduced motion

No shake; show error boundary and inline message immediately.

## Acceptance

-   Invalid value produces exact finite offset sequence.
-   Field returns to exact original position.
-   Error region uses layout space.
-   Correct value clears error.
-   No looping shake.

------------------------------------------------------------------------

# 27. Translucent Material Lift

**Primitive:** `material / depth / focus`

Create and register **Translucent Material Lift**.

## Intent

Create a contextual surface that separates from underlying content using
translucency, border structure and subtle spatial lift. This is about
layered material hierarchy, not copying Apple's exact blur recipe.

## Scaffold

Host: dense document grid. Floating panel: `FILTERS` Rows: `STATUS`,
`OWNER`, `DATE`.

## Contract

Panel final: `286 × 214px`. Use CSS `backdrop-filter` only as
progressive enhancement; specimen must remain legible without it. Base
panel background uses semi-transparent original colour. On OPEN: panel
translates `8px → 0`, scale `.985 → 1`, boundary opacity/contrast
increases, background content shifts `scale(.995)`. Duration: `220ms`.
Exactly one inner highlight line and one outer border. No giant shadow.
Close reverses hierarchy.

## Reduced motion

No scale/translation; material state appears immediately.

## Acceptance

-   Panel readable with backdrop-filter unavailable.
-   Underlying context remains visible.
-   Exactly two boundary layers.
-   Lift is subtle.
-   No chrome-token restyling.

------------------------------------------------------------------------

# 28. Copy Confirmation Morph

**Primitive:** `microinteraction / confirmation`

Create and register **Copy Confirmation Morph**.

## Intent

Create a tiny reusable copy-action confirmation where the control's
existing geometry transforms into a success state, dwells briefly, then
returns.

## Scaffold

Code token: `SPX-042` Button: `COPY`.

## Contract

Control: `72 × 32px`. On COPY: two overlapping rectangular copy outlines
compress toward centre over `90ms`. Reuse their line segments to form an
angular check over `120ms`. Label clips `COPY → COPIED`. Hold success
`900ms`. Then morph back over `180ms`. Repeated clicks during hold
restart dwell but must not duplicate geometry. Do not use clipboard API
as a requirement; optional if sandbox-safe, but visual specimen must
work without it.

## Reduced motion

Swap labels/states without geometric morph; retain 900ms dwell.

## Acceptance

-   One control.
-   Existing geometry becomes success geometry.
-   COPIED persists 900ms.
-   Returns to COPY.
-   Rapid clicks do not accumulate elements.

------------------------------------------------------------------------

# 29. Sheet Rubber-Band Limit

**Primitive:** `sheet / resistance / overscroll`

Create and register **Sheet Rubber-Band Limit**.

## Intent

Demonstrate resistance when a draggable sheet is pulled beyond its
maximum expanded detent.

## Scaffold

Sheet starts at expanded detent `520px` visible height. Content:
`TASK DETAILS`.

## Contract

Dragging upward beyond expanded position enters overshoot. Use:
`displayOvershoot = 54 * (1 - exp(-rawOvershoot / 70))` Clamp at `54px`.
Sheet content itself moves only 35% of displayed overshoot; top
handle/boundary stretches to communicate tension. At 32px overshoot,
show exactly two limit ticks. On release, settle to expanded detent over
`360ms`. No new detent is created. Downward dragging should return to
normal sheet movement.

## Reduced motion

Clamp upward motion to 8px and snap back immediately.

## Acceptance

-   Sheet starts fully expanded.
-   Upward drag meets increasing resistance.
-   Overshoot max 54px.
-   Exactly two limit ticks at 32px.
-   Release always returns to same detent.

------------------------------------------------------------------------

# 30. Pressed Control Compression

**Primitive:** `press / tactile response`

Create and register **Pressed Control Compression**.

## Intent

Create a reusable press-state primitive for cards/buttons where touch
contact produces a small physical compression and release outcome.

## Scaffold

Primary control: `RUN BUILD` Secondary card: `BUILD // READY`.

## Contract

Primary control: `180 × 52px`. Pointer down: scale `1 → .965`, internal
horizontal padding visually compresses by `3px`, duration `70ms`. Hold
remains stable, no pulse. Pointer up inside: scale `.965 → 1.015 → 1`,
durations `80ms + 90ms`, then state `READY → RUNNING`. Pointer
cancel/outside: return `.965 → 1` over `100ms` with no activation.
Keyboard Space/Enter should produce equivalent semantic activation.

## Reduced motion

No scale; use immediate structural pressed boundary.

## Acceptance

-   Press compresses once.
-   Holding does not loop.
-   Release inside activates.
-   Release/cancel outside does not.
-   Keyboard activation works where practical.

------------------------------------------------------------------------

# 31. Spring Selection Pill

**Primitive:** `selection / spring / ownership`

Create and register **Spring Selection Marker**.

## Intent

Move one shared selection backing between four options with restrained
spring settling, making selection ownership continuous.

## Scaffold

Segments: `DAY` `WEEK` `MONTH` `YEAR` Initial `DAY`. Trigger buttons or
direct click.

## Contract

Container: `336 × 44px`. Four equal segments. Selection backing inset
`3px`. On DAY→YEAR, backing translates across three segments. Duration:
about `340ms`. Overshoot destination by max `5px`, then settle. On
adjacent move: `240ms`, max overshoot `3px`. Labels do not move. There
must only ever be one selection backing. Rapid selection changes should
retarget from current visual position, not reset to DAY.

## Reduced motion

Backing jumps directly to selected segment.

## Acceptance

-   Exactly four options.
-   Exactly one backing.
-   Long jump and adjacent jump have different restrained spring
    responses.
-   Rapid retargeting does not duplicate markers.

------------------------------------------------------------------------

# 32. Notification Banner Drop

**Primitive:** `notification / temporary alert`

Create and register **Notification Banner Drop**.

## Intent

Create a temporary top-edge alert that enters, settles, remains
readable, then retreats.

## Scaffold

Host page: `BUILD DASHBOARD`. Banner: `DEPLOY COMPLETE`
`Release 2.4.0 is live`.

## Contract

Banner: `340 × 74px`. Starts `translateY(-96px)`. Entry: `280ms`,
overshoot final y by `6px`, settle `80ms`. Dwell: `2200ms`. Exit:
`220ms` upward. Exactly one status marker at leading edge. Hover/focus
pauses automatic retreat. Provide replay. Do not loop automatically
forever.

## Reduced motion

Banner appears at final position, dwells, then disappears without
travel.

## Acceptance

-   Banner originates above viewport.
-   Overshoot max 6px.
-   Dwell 2200ms.
-   Hover/focus pauses timeout.
-   Banner exits completely.

------------------------------------------------------------------------

# 33. Notification Expand

**Primitive:** `notification / compact-to-rich`

Create and register **Notification Detail Expansion**.

## Intent

Expand a compact notification into actionable detail while retaining its
identity.

## Scaffold

Compact: `REVIEW REQUEST` `Mina requested approval` Expanded adds:
`PR #184` `12 files changed` buttons `OPEN`, `APPROVE`.

## Contract

Compact: `330 × 76px`. Expanded: `330 × 184px`. Height expansion:
`280ms`. Title remains fixed within top region. Detail rows reveal after
height passes `120px`. Buttons construct last at `40ms` stagger.
Clicking compact notification expands; CLOSE collapses. No page
navigation.

## Reduced motion

Immediate height/state switch.

## Acceptance

-   Width remains constant.
-   Height 76→184px.
-   Title identity persists.
-   Actions only appear in expanded state.
-   Collapse returns exact compact height.

------------------------------------------------------------------------

# 34. Biometric Scan Acquisition

**Primitive:** `authentication / acquisition / validation`

Create and register **Identity Scan Acquisition**.

## Intent

Create an abstract biometric-style acquisition sequence without
reproducing Face ID glyphs or facial imagery. A field searches for a
valid identity signature, acquires it, validates it and unlocks a
protected action.

## Scaffold

Protected action: `OPEN VAULT` Initial `LOCKED`. Abstract identity field
with 16 fixed nodes.

## Contract

Field: `180 × 180px`. Exactly 16 nodes arranged in original asymmetric
geometry. Scan line traverses field exactly twice, each pass `420ms`.
First pass activates 10 nodes. Second activates remaining 6. After all
16 acquired, four outer brackets move inward `6px`. Validation hold
`120ms`. Field contracts slightly and status changes
`SCANNING → VERIFIED`. `OPEN VAULT` becomes enabled. No
camera/network/API.

## Reduced motion

Immediately show all 16 nodes acquired and VERIFIED.

## Acceptance

-   Exactly 16 nodes.
-   Exactly two scan passes.
-   Protected action locked before verification.
-   Four acquisition brackets.
-   Action unlocks only after validation.

------------------------------------------------------------------------

# 35. Search Field Activation

**Primitive:** `search / layout morph / focus`

Create and register **Search Field Activation**.

## Intent

A compact search affordance expands into a focused input while
neighbouring navigation controls reorganise around it.

## Scaffold

Header title `LIBRARY`. Compact search button. Trailing action `ADD`.

## Contract

Header width: `360px`. Search compact width: `38px`. Expanded width:
`276px`. On activation: title clips/retracts over `120ms`; ADD shifts
right/out of active region; search expands `38→276px` over `260ms`;
placeholder `Search library` appears after 55%; input receives focus.
CANCEL appears at trailing edge after expansion. Cancel restores
original header arrangement.

## Reduced motion

Immediate layout swap with focus preserved.

## Acceptance

-   Search starts compact.
-   Expanded width 276px.
-   Focus enters input.
-   Cancel restores title and ADD.
-   No elements overlap during transition.

------------------------------------------------------------------------

# 36. Multi-Item Drag Stack

**Primitive:** `drag / aggregation / count`

Create and register **Multi-Item Drag Stack**.

## Intent

Several selected objects condense into one portable drag stack while
preserving count and top-item identity.

## Scaffold

Selected files: `A.MD` `B.PDF` `C.PNG` `D.JSON` Trigger `START DRAG`.

## Contract

Exactly four source cards. Top proxy: `A.MD`, `108 × 58px`. Other three
proxies appear behind with offsets: `4px`, `8px`, `12px`. Scale: 1, .98,
.96, .94. Count badge `4`. Formation stagger `45ms`. Source locations
remain as selected placeholders. Dragging stack follows pointer.
Dropping in target absorbs all four sequentially at `35ms` stagger.

## Reduced motion

Create final four-item stack immediately.

## Acceptance

-   Exactly four items.
-   Exactly four visible stack layers where geometry permits.
-   Count equals 4.
-   A.MD remains top identity.
-   No source duplication after successful drop.

------------------------------------------------------------------------

# 37. Invalid Drop Return

**Primitive:** `drag / rejection / restoration`

Create and register **Invalid Drop Return**.

## Intent

A rejected drag should visibly return to its source rather than simply
disappearing and reappearing.

## Scaffold

Source `CONFIG.JSON`. Invalid destination `READ ONLY`. Valid destination
also visible for contrast.

## Contract

Drag proxy follows pointer. When released over READ ONLY: target
performs one `3px` lateral refusal. Proxy pauses `70ms`. Then returns
along a fixed quadratic path to source over `360ms`. Return starts fast
and decelerates. At source, proxy merges into placeholder: scale
`1.04 → 1`. Status `DROP REJECTED` remains for `700ms`. No bounce around
invalid target.

## Reduced motion

Proxy immediately restores to source and displays rejection status.

## Acceptance

-   Invalid target is visibly distinct.
-   Rejected proxy returns to exact source.
-   One refusal movement only.
-   Placeholder prevents layout collapse.
-   No duplicate remains.

------------------------------------------------------------------------

# 38. Window Snap Preview

**Primitive:** `window / drag / preview`

Create and register **Window Snap Preview**.

## Intent

Dragging a floating window near a layout region should preview its
potential final bounds before the user commits.

## Scaffold

Desktop region `520 × 380px`. Window `EDITOR`, `260 × 190px`. Left snap
target = 50% desktop.

## Contract

Drag freely. When pointer/window enters left `54px` activation zone:
construct preview rectangle inset `10px`, width
`(desktopWidth - 30px)/2`, height `desktopHeight - 20px`. Preview
boundary constructs over `120ms`. Window itself remains under pointer.
Leaving activation zone removes preview in `90ms`. Release while preview
active commits to preview bounds over `260ms`. Release elsewhere keeps
free window position.

## Reduced motion

Preview appears instantly; committed window snaps instantly.

## Acceptance

-   Preview only appears in left activation zone.
-   Preview does not move the window before release.
-   Leaving zone cancels preview.
-   Release inside commits exact preview bounds.

------------------------------------------------------------------------

# 39. Window Minimise Funnel

**Primitive:** `window / compression / spatial continuity`

Create and register **Window Minimise Funnel**.

## Intent

Compress a full window toward a small launcher destination using a
funnel-like geometric mapping that preserves where the window went.

## Scaffold

Window: `TERMINAL`. Destination token in bottom rail: `TERMINAL`.

## Contract

Window start: `380 × 250px`. Destination: `52 × 34px`. Duration:
`520ms`. Do not use a simple uniform scale. Represent window with
top/bottom boundary slices or CSS clip-path points. During minimise,
upper corners travel toward destination more gradually than lower
corners, producing a controlled funnel. At 70%, internal content is
clipped away but title persists. At destination, title compresses into
token. Provide RESTORE with constructive expansion, not necessarily
exact reverse keyframes.

## Reduced motion

Immediate compact/full state swap.

## Acceptance

-   Destination is visible before minimise.
-   Geometry visibly funnels.
-   Identity TERMINAL persists.
-   Final token occupies exact destination.
-   Restore reconstructs full window.

------------------------------------------------------------------------

# 40. Desktop Space Swipe

**Primitive:** `workspace / navigation / plane`

Create and register **Desktop Space Swipe**.

## Intent

Treat two workspaces as adjacent spatial planes. Switching spaces moves
the whole workspace coherently rather than independently animating each
window.

## Scaffold

SPACE 01: three windows. SPACE 02: two windows. Trigger `NEXT SPACE`.

## Contract

Viewport `520 × 360px`. Space planes each exactly viewport-sized. On
transition: SPACE 01 x `0 → -100%`; SPACE 02 x `100% → 0`. Duration
`460ms`. Apply tiny depth response: outgoing scale `1 → .985`; incoming
`.985 → 1`. Space indicator moves `01 → 02` after 50% progress. No
individual window offsets. Provide PREVIOUS.

## Reduced motion

Instantly switch space planes.

## Acceptance

-   All windows within a space move as one plane.
-   No window independently lags.
-   Space indicator changes once.
-   Previous returns to exact Space 01 arrangement.

------------------------------------------------------------------------

# 41. Play Pause Glyph Morph

**Primitive:** `media / icon morph / state`

Create and register **Playback Glyph Morph**.

## Intent

Create one control whose line geometry directly transforms between play
and pause states instead of cross-fading unrelated icons.

## Scaffold

Track `SIGNAL // 04`. Control initial `PLAY`. Trigger direct click.

## Contract

Control: `48 × 48px`. Build play glyph from three line/polygon segments
that can be interpolated into two pause bars using CSS
transforms/clip-path. PLAY→PAUSE morph: `180ms`. PAUSE→PLAY: `160ms`.
Control compresses to `.96` on pointer down. Label/state changes only
when morph crosses 50%. No continuous media animation.

## Reduced motion

Instant glyph state swap.

## Acceptance

-   One persistent glyph container.
-   No simultaneous full play and pause icons.
-   State toggles repeatedly without geometry drift.
-   Keyboard activation works.

------------------------------------------------------------------------

# 42. Now Playing Expansion

**Primitive:** `media / compact-to-rich`

Create and register **Now Playing Expansion**.

## Intent

A compact playback strip expands into richer playback controls while
track identity and current progress persist.

## Scaffold

Track `NIGHT SIGNAL` Artist `VECTOR` Progress `01:42 / 03:18`.

## Contract

Compact: `300 × 56px`. Expanded: `360 × 260px`. Artwork substitute:
original abstract geometric tile. Expansion `360ms`. Track title remains
continuously visible. Progress rail moves from compact bottom edge into
expanded middle region. Controls reveal in order: previous, play/pause,
next. Volume row last. Collapse retains progress `01:42`.

## Reduced motion

Immediate state switch.

## Acceptance

-   Track identity persists.
-   Progress does not reset.
-   Compact and expanded dimensions exact.
-   Controls reveal deterministically.

------------------------------------------------------------------------

# 43. Volume Brightness HUD

**Primitive:** `hud / transient value`

Create and register **Transient Level HUD**.

## Intent

Create a temporary system-value overlay for a changing scalar such as
volume or brightness, using original geometry.

## Scaffold

Metric `OUTPUT LEVEL`. Initial `42`. Trigger `INCREASE` to `68`.

## Contract

HUD: `220 × 86px`. Appears centred from scale `.96→1` and y `6→0` over
`140ms`. Exactly 10 level segments. 42 maps to 4 filled + partial fifth
representation. 68 maps to 6 filled + partial seventh. Value change
animates segments over `180ms`. Dwell `900ms` after last input. Repeated
INCREASE resets dwell but does not replay entrance. Exit `120ms`.

## Reduced motion

HUD appears/disappears without scale movement.

## Acceptance

-   Exactly ten segments.
-   Final value 68.
-   Repeated input extends dwell.
-   Only one HUD exists.

------------------------------------------------------------------------

# 44. File List to Icon View Morph

**Primitive:** `layout / identity preservation`

Create and register **Collection View Morph**.

## Intent

The same six files reorganise between list and icon-grid representations
while preserving item identity.

## Scaffold

Files: `ALPHA.MD` `BETA.PDF` `GAMMA.PNG` `DELTA.JSON` `EPSILON.TXT`
`ZETA.CSV`

## Contract

List: six `44px` rows. Grid: 3×2, cell `116 × 104px`. On `GRID VIEW`,
each item moves from its exact list coordinates to fixed grid
coordinates over `420ms`. Filename remains attached to its item.
Secondary list metadata collapses during first 35%. Abstract file glyph
grows `24→42px`. Return to LIST reverses layout semantics. No item
cross-fades into a new duplicate.

## Reduced motion

Immediate re-layout.

## Acceptance

-   Exactly six persistent items.
-   Every filename preserved.
-   Grid 3×2.
-   No identity swapping.
-   Return restores exact list order.

------------------------------------------------------------------------

# 45. Menu Bar Active Transfer

**Primitive:** `menu / hover ownership`

Create and register **Menu Ownership Transfer**.

## Intent

Demonstrate an open top-level menu transferring between adjacent
headings as the pointer crosses them, without fully dismissing and
reopening the menu surface.

## Scaffold

Headings: `FILE` `EDIT` `VIEW` Initial click FILE opens menu.

## Contract

Top bar height `32px`. Menu surface width `190px`. When open and pointer
enters another heading: menu boundary translates horizontally to new
anchor over `120ms`; height adjusts to target menu over `100ms`; rows
replace using vertical clip at midpoint. FILE 5 rows. EDIT 6 rows. VIEW
4 rows. Active heading marker moves with menu. Leaving menu system
closes after `220ms` grace period.

## Reduced motion

Transfer menu instantly between anchors.

## Acceptance

-   Menu must be opened first.
-   Pointer transfer changes ownership.
-   Surface is reused rather than duplicated.
-   Row counts correct.
-   Grace period prevents accidental close during transfer.

------------------------------------------------------------------------

# 46. Control Module Collapse

**Primitive:** `control / rich-to-compact`

Create and register **System Module Collapse**.

## Intent

Create the semantic counterpart to System Module Expansion. A detailed
control surface condenses into a compact summary while preserving the
user's latest setting.

## Scaffold

Expanded `NETWORK`. Details: `STATUS CONNECTED` `ROUTE PRIMARY`
`LATENCY 18ms` Compact final: `NETWORK // CONNECTED`.

## Contract

Expanded `320 × 210px`. Compact `142 × 72px`. Collapse sequence: detail
rows retract bottom-up at `35ms` stagger; latency disappears first;
route second; status identity persists; boundary contracts over `300ms`.
One status node remains in compact state. Do not reset values.

## Reduced motion

Immediate collapse.

## Acceptance

-   Expanded state starts readable.
-   Rows retract in deterministic order.
-   CONNECTED identity persists.
-   Final dimensions exact.
-   Exactly one compact status node.

------------------------------------------------------------------------

# 47. Authentication Success Morph

**Primitive:** `authentication / completion morph`

Create and register **Authentication Success Morph**.

## Intent

Transform an abstract scanning/acquisition structure into a
verified/unlocked state using the same geometry.

## Scaffold

Identity field with four corner brackets and central 8-node pattern.
Initial `VERIFYING`. Final `VERIFIED`.

## Contract

On `RESOLVE SUCCESS`: four brackets move inward `6px` over `100ms`; 8
nodes converge into two diagonal/orthogonal completion strokes over
`180ms`; outer boundary closes into a stable verified frame; status
clips `VERIFYING → VERIFIED`; protected action `CONTINUE` enables only
after morph. Exactly one finite settle `scale(.98→1.02→1)`.

## Reduced motion

Immediate verified geometry.

## Acceptance

-   Same nodes become completion geometry.
-   No unrelated success icon fade-in.
-   CONTINUE locked before completion.
-   Final state static.

------------------------------------------------------------------------

# 48. Authentication Failure Reset

**Primitive:** `authentication / failure / retry`

Create and register **Authentication Failure Reset**.

## Intent

A failed identity acquisition should reject once, explain failure, and
reset to a clean retry-ready state.

## Scaffold

Abstract scan field. Initial `SCANNING`. Trigger `FAIL`. Final
`READY TO RETRY`.

## Contract

On failure: scan stops. field offsets exact sequence `0,-4,+4,-3,+2,0px`
over `240ms`. Exactly four acquisition brackets rotate outward `8deg`
and retract `5px`. Status `SCANNING → NOT VERIFIED`. Hold `650ms`. Then
brackets and nodes restore neutral positions over `180ms`. Status
`READY TO RETRY`. No automatic retry loop.

## Reduced motion

Show NOT VERIFIED, dwell, then READY TO RETRY without shake.

## Acceptance

-   One finite rejection.
-   Field returns to exact origin.
-   Four brackets respond.
-   Retry state is clean.
-   No loop.

------------------------------------------------------------------------

# 49. Universal Clipboard Transfer

**Primitive:** `cross-device / clipboard / handoff`

Create and register **Shared Clipboard Transfer**.

## Intent

Represent copied content becoming a temporary transferable token that
materialises in another device/context.

## Scaffold

Source `DESKTOP`. Destination `TABLET`. Copied text `BUILD-184`. Trigger
`COPY & HANDOFF`.

## Contract

Source text selection constructs a compact token `BUILD-184`,
`96 × 34px`. Token lifts `8px`, then source retains a small `COPIED`
marker. A six-dot transfer corridor appears. Token does not visibly
traverse every pixel; instead it compresses at source, disappears for
`70ms`, then reconstructs at destination to distinguish continuity
transfer from ordinary drag. Destination insertion caret exists before
arrival. On arrival token expands into text at caret. Status `PASTED`.

## Reduced motion

Immediate copied/pasted state.

## Acceptance

-   Text identity persists.
-   Exactly six corridor dots.
-   There is a visible absence gap.
-   Destination caret pre-exists.
-   Final text is BUILD-184.

------------------------------------------------------------------------

# 50. Cross Device Cursor Handoff

**Primitive:** `pointer / boundary / continuity`

Create and register **Cross-Surface Pointer Handoff**.

## Intent

A pointer reaches the boundary of one abstract display and continues
from the adjacent boundary of another, preserving trajectory.

## Scaffold

Two device/display frames with `36px` gap. Pointer starts in left frame.
Provide automated DEMO plus optional pointer interaction.

## Contract

Demo path approaches right edge at y `62%`. At exact edge: left pointer
clips away over last `4px`. After `45ms`, pointer appears at left edge
of right display at same normalised y. Velocity before/after handoff
should match. Exactly two boundary ticks, one on each display, appear
for `120ms`. Pointer continues another `120px`. Do not animate through
physical gap.

## Reduced motion

Show pointer directly transferring boundaries with no travel animation.

## Acceptance

-   Pointer never traverses gap.
-   Normalised y preserved.
-   Two boundary ticks.
-   Velocity continuity visually plausible.

------------------------------------------------------------------------

# Suggested build order

The first 20 are deliberately weighted toward the most distinctive and
portable iOS/macOS-inspired interactions: spatial navigation, spring
physics, compact-to-rich morphing, Dock/workspace behaviour, contextual
presentation, nearby transfer, and threshold gestures.

After those, work downward through the supporting physics, notification,
authentication, drag/drop, window-management, media, cross-device,
collection, scrolling, and control-state specimens.

Every implementation should remain an original web specimen rather than
an exact reproduction of Apple UI.
