# My Hero Academia-Inspired --- 50 Cursor Implementation Prompts

Implementation-ready prompts for the specimen archive at
`playground.humza-butt.space`.

These 50 were selected for **portability, visual distinctiveness,
software usefulness, and variety**. The goal is to extract
comic/action-interface principles rather than clone copyrighted artwork.

## Shared repository rule

Every specimen must remain self-contained, deterministic, iframe-safe,
reduced-motion-aware, and explicitly registered. Do not redesign the
Playground catalogue chrome.

------------------------------------------------------------------------

# 1. Impact Frame Slam

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Impact
Frame Slam**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Impact Frame Slam** as a compact 320--768px preview artifact. It
should have one obvious trigger and one readable end state. The motion
must communicate a software state change rather than exist as ambient
decoration.

### Visual contract

-   Palette: `#38A3FF` primary, `#101820` ink, `#F4F7FA` paper,
    `#FF4D35` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `500ms`; secondary settle/reveal may
    extend total sequence to no more than `1150ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Impact Frame
Slam** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Impact Frame Slam` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Impact Frame Slam** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 2. Speed-Line Action Reveal

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Speed-Line Action Reveal**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Speed-Line Action Reveal** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#E63946` primary, `#111111` ink, `#F1FAEE` paper,
    `#457B9D` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `580ms`; secondary settle/reveal may
    extend total sequence to no more than `1230ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Speed-Line Action
Reveal** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Speed-Line Action Reveal` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Speed-Line Action Reveal** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 3. Panel Break Transition

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Panel
Break Transition**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Panel Break Transition** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F4D35E` primary, `#0D0D0D` ink, `#FAFAFA` paper,
    `#EE964B` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `660ms`; secondary settle/reveal may
    extend total sequence to no more than `1310ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Panel Break
Transition** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Panel Break Transition` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Panel Break Transition** sequence. 2. The effect remains fully clipped
to its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 4. Hero Name Slam

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Hero
Name Slam**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Hero Name Slam** as a compact 320--768px preview artifact. It
should have one obvious trigger and one readable end state. The motion
must communicate a software state change rather than exist as ambient
decoration.

### Visual contract

-   Palette: `#F6E652` primary, `#121212` ink, `#F5F2E8` paper,
    `#D72638` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `740ms`; secondary settle/reveal may
    extend total sequence to no more than `1390ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Hero Name Slam**
understandable. If it overlays or transforms content, use a host panel
with `position: relative; overflow: hidden`. Do not redesign catalogue
chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Hero Name Slam` - one-sentence blurb - origin:
`original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Hero Name Slam** sequence. 2. The effect remains fully clipped to its
specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 5. Character Freeze Introduction

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Character Freeze Introduction**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Character Freeze Introduction** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#38A3FF` primary, `#101820` ink, `#F4F7FA` paper,
    `#FF4D35` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `420ms`; secondary settle/reveal may
    extend total sequence to no more than `1070ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Character Freeze
Introduction** understandable. If it overlays or transforms content, use
a host panel with `position: relative; overflow: hidden`. Do not
redesign catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Character Freeze Introduction` - one-sentence
blurb - origin: `original — anime/comic action language study` - useful
tags - `deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Character Freeze Introduction** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 6. Quirk Activation Burst

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Quirk
Activation Burst**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Quirk Activation Burst** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#E63946` primary, `#111111` ink, `#F1FAEE` paper,
    `#457B9D` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `500ms`; secondary settle/reveal may
    extend total sequence to no more than `1150ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Quirk Activation
Burst** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Quirk Activation Burst` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Quirk Activation Burst** sequence. 2. The effect remains fully clipped
to its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 7. Quirk Cooldown Ring

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Quirk
Cooldown Ring**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Quirk Cooldown Ring** as a compact 320--768px preview artifact.
It should have one obvious trigger and one readable end state. The
motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F4D35E` primary, `#0D0D0D` ink, `#FAFAFA` paper,
    `#EE964B` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `580ms`; secondary settle/reveal may
    extend total sequence to no more than `1230ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Quirk Cooldown
Ring** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Quirk Cooldown Ring` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Quirk Cooldown Ring** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 8. Power Threshold Break

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Power
Threshold Break**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Power Threshold Break** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F6E652` primary, `#121212` ink, `#F5F2E8` paper,
    `#D72638` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `660ms`; secondary settle/reveal may
    extend total sequence to no more than `1310ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Power Threshold
Break** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Power Threshold Break` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Power Threshold Break** sequence. 2. The effect remains fully clipped
to its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 9. Branching Energy Surge

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Branching Energy Surge**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Branching Energy Surge** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#38A3FF` primary, `#101820` ink, `#F4F7FA` paper,
    `#FF4D35` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `740ms`; secondary settle/reveal may
    extend total sequence to no more than `1390ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Branching Energy
Surge** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Branching Energy Surge` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Branching Energy Surge** sequence. 2. The effect remains fully clipped
to its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 10. Analysis Scribble Reveal

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Analysis Scribble Reveal**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Analysis Scribble Reveal** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#E63946` primary, `#111111` ink, `#F1FAEE` paper,
    `#457B9D` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `420ms`; secondary settle/reveal may
    extend total sequence to no more than `1070ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Analysis Scribble
Reveal** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Analysis Scribble Reveal` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Analysis Scribble Reveal** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 11. Weakness Highlight Sweep

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Weakness Highlight Sweep**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Weakness Highlight Sweep** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F4D35E` primary, `#0D0D0D` ink, `#FAFAFA` paper,
    `#EE964B` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `500ms`; secondary settle/reveal may
    extend total sequence to no more than `1150ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Weakness Highlight
Sweep** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Weakness Highlight Sweep` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Weakness Highlight Sweep** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 12. Training Simulation Start

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Training Simulation Start**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Training Simulation Start** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F6E652` primary, `#121212` ink, `#F5F2E8` paper,
    `#D72638` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `580ms`; secondary settle/reveal may
    extend total sequence to no more than `1230ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Training
Simulation Start** understandable. If it overlays or transforms content,
use a host panel with `position: relative; overflow: hidden`. Do not
redesign catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Training Simulation Start` - one-sentence
blurb - origin: `original — anime/comic action language study` - useful
tags - `deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Training Simulation Start** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 13. Performance Meter Burst

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Performance Meter Burst**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Performance Meter Burst** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#38A3FF` primary, `#101820` ink, `#F4F7FA` paper,
    `#FF4D35` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `660ms`; secondary settle/reveal may
    extend total sequence to no more than `1310ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Performance Meter
Burst** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Performance Meter Burst` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Performance Meter Burst** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 14. Versus Card Collision

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Versus
Card Collision**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Versus Card Collision** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#E63946` primary, `#111111` ink, `#F1FAEE` paper,
    `#457B9D` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `740ms`; secondary settle/reveal may
    extend total sequence to no more than `1390ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Versus Card
Collision** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Versus Card Collision` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Versus Card Collision** sequence. 2. The effect remains fully clipped
to its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 15. Bracket Winner Advance

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Bracket
Winner Advance**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Bracket Winner Advance** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F4D35E` primary, `#0D0D0D` ink, `#FAFAFA` paper,
    `#EE964B` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `420ms`; secondary settle/reveal may
    extend total sequence to no more than `1070ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Bracket Winner
Advance** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Bracket Winner Advance` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Bracket Winner Advance** sequence. 2. The effect remains fully clipped
to its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 16. Match Start Slam

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Match
Start Slam**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Match Start Slam** as a compact 320--768px preview artifact. It
should have one obvious trigger and one readable end state. The motion
must communicate a software state change rather than exist as ambient
decoration.

### Visual contract

-   Palette: `#F6E652` primary, `#121212` ink, `#F5F2E8` paper,
    `#D72638` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `500ms`; secondary settle/reveal may
    extend total sequence to no more than `1150ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Match Start Slam**
understandable. If it overlays or transforms content, use a host panel
with `position: relative; overflow: hidden`. Do not redesign catalogue
chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Match Start Slam` - one-sentence blurb - origin:
`original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Match Start Slam** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 17. Rank Promotion

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Rank
Promotion**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Rank Promotion** as a compact 320--768px preview artifact. It
should have one obvious trigger and one readable end state. The motion
must communicate a software state change rather than exist as ambient
decoration.

### Visual contract

-   Palette: `#38A3FF` primary, `#101820` ink, `#F4F7FA` paper,
    `#FF4D35` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `580ms`; secondary settle/reveal may
    extend total sequence to no more than `1230ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Rank Promotion**
understandable. If it overlays or transforms content, use a host panel
with `position: relative; overflow: hidden`. Do not redesign catalogue
chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Rank Promotion` - one-sentence blurb - origin:
`original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Rank Promotion** sequence. 2. The effect remains fully clipped to its
specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 18. Incident Dispatch Card

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Incident Dispatch Card**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Incident Dispatch Card** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#E63946` primary, `#111111` ink, `#F1FAEE` paper,
    `#457B9D` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `660ms`; secondary settle/reveal may
    extend total sequence to no more than `1310ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Incident Dispatch
Card** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Incident Dispatch Card` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Incident Dispatch Card** sequence. 2. The effect remains fully clipped
to its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 19. Hero Assignment Transfer

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Hero
Assignment Transfer**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Hero Assignment Transfer** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F4D35E` primary, `#0D0D0D` ink, `#FAFAFA` paper,
    `#EE964B` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `740ms`; secondary settle/reveal may
    extend total sequence to no more than `1390ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Hero Assignment
Transfer** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Hero Assignment Transfer` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Hero Assignment Transfer** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 20. Emergency Screen Takeover

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Emergency Screen Takeover**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Emergency Screen Takeover** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F6E652` primary, `#121212` ink, `#F5F2E8` paper,
    `#D72638` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `420ms`; secondary settle/reveal may
    extend total sequence to no more than `1070ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Emergency Screen
Takeover** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Emergency Screen Takeover` - one-sentence
blurb - origin: `original — anime/comic action language study` - useful
tags - `deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Emergency Screen Takeover** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 21. Threat Level Escalation

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Threat
Level Escalation**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Threat Level Escalation** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#38A3FF` primary, `#101820` ink, `#F4F7FA` paper,
    `#FF4D35` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `500ms`; secondary settle/reveal may
    extend total sequence to no more than `1150ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Threat Level
Escalation** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Threat Level Escalation` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Threat Level Escalation** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 22. Decay Delete

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Decay
Delete**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Decay Delete** as a compact 320--768px preview artifact. It
should have one obvious trigger and one readable end state. The motion
must communicate a software state change rather than exist as ambient
decoration.

### Visual contract

-   Palette: `#E63946` primary, `#111111` ink, `#F1FAEE` paper,
    `#457B9D` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `580ms`; secondary settle/reveal may
    extend total sequence to no more than `1230ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Decay Delete**
understandable. If it overlays or transforms content, use a host panel
with `position: relative; overflow: hidden`. Do not redesign catalogue
chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Decay Delete` - one-sentence blurb - origin:
`original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Decay Delete** sequence. 2. The effect remains fully clipped to its
specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 23. Blueprint Assembly

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Blueprint Assembly**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Blueprint Assembly** as a compact 320--768px preview artifact.
It should have one obvious trigger and one readable end state. The
motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F4D35E` primary, `#0D0D0D` ink, `#FAFAFA` paper,
    `#EE964B` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `660ms`; secondary settle/reveal may
    extend total sequence to no more than `1310ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Blueprint
Assembly** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Blueprint Assembly` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Blueprint Assembly** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 24. Part Compatibility Snap

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Part
Compatibility Snap**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Part Compatibility Snap** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F6E652` primary, `#121212` ink, `#F5F2E8` paper,
    `#D72638` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `740ms`; secondary settle/reveal may
    extend total sequence to no more than `1390ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Part Compatibility
Snap** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Part Compatibility Snap` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Part Compatibility Snap** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 25. Mission Incoming

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Mission
Incoming**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Mission Incoming** as a compact 320--768px preview artifact. It
should have one obvious trigger and one readable end state. The motion
must communicate a software state change rather than exist as ambient
decoration.

### Visual contract

-   Palette: `#38A3FF` primary, `#101820` ink, `#F4F7FA` paper,
    `#FF4D35` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `420ms`; secondary settle/reveal may
    extend total sequence to no more than `1070ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Mission Incoming**
understandable. If it overlays or transforms content, use a host panel
with `position: relative; overflow: hidden`. Do not redesign catalogue
chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Mission Incoming` - one-sentence blurb - origin:
`original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Mission Incoming** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 26. Objective Update Slash

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Objective Update Slash**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Objective Update Slash** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#E63946` primary, `#111111` ink, `#F1FAEE` paper,
    `#457B9D` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `500ms`; secondary settle/reveal may
    extend total sequence to no more than `1150ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Objective Update
Slash** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Objective Update Slash` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Objective Update Slash** sequence. 2. The effect remains fully clipped
to its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 27. Maximum Output Breakthrough

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Maximum
Output Breakthrough**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Maximum Output Breakthrough** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F4D35E` primary, `#0D0D0D` ink, `#FAFAFA` paper,
    `#EE964B` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `580ms`; secondary settle/reveal may
    extend total sequence to no more than `1230ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Maximum Output
Breakthrough** understandable. If it overlays or transforms content, use
a host panel with `position: relative; overflow: hidden`. Do not
redesign catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Maximum Output Breakthrough` - one-sentence
blurb - origin: `original — anime/comic action language study` - useful
tags - `deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Maximum Output Breakthrough** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 28. Button Impact Shockwave

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Button
Impact Shockwave**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Button Impact Shockwave** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F6E652` primary, `#121212` ink, `#F5F2E8` paper,
    `#D72638` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `660ms`; secondary settle/reveal may
    extend total sequence to no more than `1310ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Button Impact
Shockwave** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Button Impact Shockwave` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Button Impact Shockwave** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 29. Ice Wipe Transition

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Ice
Wipe Transition**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Ice Wipe Transition** as a compact 320--768px preview artifact.
It should have one obvious trigger and one readable end state. The
motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#38A3FF` primary, `#101820` ink, `#F4F7FA` paper,
    `#FF4D35` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `740ms`; secondary settle/reveal may
    extend total sequence to no more than `1390ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Ice Wipe
Transition** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Ice Wipe Transition` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Ice Wipe Transition** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 30. Explosive Notification Burst

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Explosive Notification Burst**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Explosive Notification Burst** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#E63946` primary, `#111111` ink, `#F1FAEE` paper,
    `#457B9D` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `420ms`; secondary settle/reveal may
    extend total sequence to no more than `1070ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Explosive
Notification Burst** understandable. If it overlays or transforms
content, use a host panel with `position: relative; overflow: hidden`.
Do not redesign catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Explosive Notification Burst` - one-sentence
blurb - origin: `original — anime/comic action language study` - useful
tags - `deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Explosive Notification Burst** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 31. Binding Wrap Lock

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Binding
Wrap Lock**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Binding Wrap Lock** as a compact 320--768px preview artifact. It
should have one obvious trigger and one readable end state. The motion
must communicate a software state change rather than exist as ambient
decoration.

### Visual contract

-   Palette: `#F4D35E` primary, `#0D0D0D` ink, `#FAFAFA` paper,
    `#EE964B` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `500ms`; secondary settle/reveal may
    extend total sequence to no more than `1150ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Binding Wrap
Lock** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Binding Wrap Lock` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Binding Wrap Lock** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 32. Team Formation Snap

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Team
Formation Snap**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Team Formation Snap** as a compact 320--768px preview artifact.
It should have one obvious trigger and one readable end state. The
motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F6E652` primary, `#121212` ink, `#F5F2E8` paper,
    `#D72638` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `580ms`; secondary settle/reveal may
    extend total sequence to no more than `1230ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Team Formation
Snap** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Team Formation Snap` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Team Formation Snap** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 33. Rival Cards Clash

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Rival
Cards Clash**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Rival Cards Clash** as a compact 320--768px preview artifact. It
should have one obvious trigger and one readable end state. The motion
must communicate a software state change rather than exist as ambient
decoration.

### Visual contract

-   Palette: `#38A3FF` primary, `#101820` ink, `#F4F7FA` paper,
    `#FF4D35` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `660ms`; secondary settle/reveal may
    extend total sequence to no more than `1310ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Rival Cards
Clash** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Rival Cards Clash` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Rival Cards Clash** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 34. Panel-to-Panel Route

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Panel-to-Panel Route**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Panel-to-Panel Route** as a compact 320--768px preview artifact.
It should have one obvious trigger and one readable end state. The
motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#E63946` primary, `#111111` ink, `#F1FAEE` paper,
    `#457B9D` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `740ms`; secondary settle/reveal may
    extend total sequence to no more than `1390ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Panel-to-Panel
Route** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Panel-to-Panel Route` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Panel-to-Panel Route** sequence. 2. The effect remains fully clipped
to its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 35. Episode Title Card Interrupt

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Episode
Title Card Interrupt**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Episode Title Card Interrupt** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F4D35E` primary, `#0D0D0D` ink, `#FAFAFA` paper,
    `#EE964B` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `420ms`; secondary settle/reveal may
    extend total sequence to no more than `1070ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Episode Title Card
Interrupt** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Episode Title Card Interrupt` - one-sentence
blurb - origin: `original — anime/comic action language study` - useful
tags - `deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Episode Title Card Interrupt** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 36. Eyecatch Transition

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Eyecatch Transition**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Eyecatch Transition** as a compact 320--768px preview artifact.
It should have one obvious trigger and one readable end state. The
motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F6E652` primary, `#121212` ink, `#F5F2E8` paper,
    `#D72638` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `500ms`; secondary settle/reveal may
    extend total sequence to no more than `1150ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Eyecatch
Transition** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Eyecatch Transition` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Eyecatch Transition** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 37. Quirk Capability Radar Build

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Quirk
Capability Radar Build**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Quirk Capability Radar Build** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#38A3FF` primary, `#101820` ink, `#F4F7FA` paper,
    `#FF4D35` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `580ms`; secondary settle/reveal may
    extend total sequence to no more than `1230ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Quirk Capability
Radar Build** understandable. If it overlays or transforms content, use
a host panel with `position: relative; overflow: hidden`. Do not
redesign catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Quirk Capability Radar Build` - one-sentence
blurb - origin: `original — anime/comic action language study` - useful
tags - `deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Quirk Capability Radar Build** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 38. Angular Focus Brackets

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Angular
Focus Brackets**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Angular Focus Brackets** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#E63946` primary, `#111111` ink, `#F1FAEE` paper,
    `#457B9D` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `660ms`; secondary settle/reveal may
    extend total sequence to no more than `1310ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Angular Focus
Brackets** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Angular Focus Brackets` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Angular Focus Brackets** sequence. 2. The effect remains fully clipped
to its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 39. Hero Assignment Drag

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Hero
Assignment Drag**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Hero Assignment Drag** as a compact 320--768px preview artifact.
It should have one obvious trigger and one readable end state. The
motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F4D35E` primary, `#0D0D0D` ink, `#FAFAFA` paper,
    `#EE964B` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `740ms`; secondary settle/reveal may
    extend total sequence to no more than `1390ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Hero Assignment
Drag** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Hero Assignment Drag` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Hero Assignment Drag** sequence. 2. The effect remains fully clipped
to its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 40. Halftone Expansion

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Halftone Expansion**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Halftone Expansion** as a compact 320--768px preview artifact.
It should have one obvious trigger and one readable end state. The
motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F6E652` primary, `#121212` ink, `#F5F2E8` paper,
    `#D72638` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `420ms`; secondary settle/reveal may
    extend total sequence to no more than `1070ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Halftone
Expansion** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Halftone Expansion` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Halftone Expansion** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 41. Energy Transfer

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Energy
Transfer**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Energy Transfer** as a compact 320--768px preview artifact. It
should have one obvious trigger and one readable end state. The motion
must communicate a software state change rather than exist as ambient
decoration.

### Visual contract

-   Palette: `#38A3FF` primary, `#101820` ink, `#F4F7FA` paper,
    `#FF4D35` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `500ms`; secondary settle/reveal may
    extend total sequence to no more than `1150ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Energy Transfer**
understandable. If it overlays or transforms content, use a host panel
with `position: relative; overflow: hidden`. Do not redesign catalogue
chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Energy Transfer` - one-sentence blurb - origin:
`original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Energy Transfer** sequence. 2. The effect remains fully clipped to its
specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 42. Overuse Warning

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Overuse
Warning**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Overuse Warning** as a compact 320--768px preview artifact. It
should have one obvious trigger and one readable end state. The motion
must communicate a software state change rather than exist as ambient
decoration.

### Visual contract

-   Palette: `#E63946` primary, `#111111` ink, `#F1FAEE` paper,
    `#457B9D` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `580ms`; secondary settle/reveal may
    extend total sequence to no more than `1230ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Overuse Warning**
understandable. If it overlays or transforms content, use a host panel
with `position: relative; overflow: hidden`. Do not redesign catalogue
chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Overuse Warning` - one-sentence blurb - origin:
`original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Overuse Warning** sequence. 2. The effect remains fully clipped to its
specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 43. Target Acquisition

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Target
Acquisition**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Target Acquisition** as a compact 320--768px preview artifact.
It should have one obvious trigger and one readable end state. The
motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F4D35E` primary, `#0D0D0D` ink, `#FAFAFA` paper,
    `#EE964B` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `660ms`; secondary settle/reveal may
    extend total sequence to no more than `1310ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Target
Acquisition** understandable. If it overlays or transforms content, use
a host panel with `position: relative; overflow: hidden`. Do not
redesign catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Target Acquisition` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Target Acquisition** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 44. Winner Banner Breakthrough

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Winner
Banner Breakthrough**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Winner Banner Breakthrough** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F6E652` primary, `#121212` ink, `#F5F2E8` paper,
    `#D72638` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `740ms`; secondary settle/reveal may
    extend total sequence to no more than `1390ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Winner Banner
Breakthrough** understandable. If it overlays or transforms content, use
a host panel with `position: relative; overflow: hidden`. Do not
redesign catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Winner Banner Breakthrough` - one-sentence
blurb - origin: `original — anime/comic action language study` - useful
tags - `deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Winner Banner Breakthrough** sequence. 2. The effect remains fully
clipped to its specimen/scaffold. 3. No external resources or privileged
iframe capabilities are required. 4. Replay produces the same sequence
without stale nodes, classes, timers or transforms. 5. Reduced-motion
mode preserves the final meaning without high-motion choreography. 6.
The result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 45. Lockdown Shutter

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Lockdown Shutter**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Lockdown Shutter** as a compact 320--768px preview artifact. It
should have one obvious trigger and one readable end state. The motion
must communicate a software state change rather than exist as ambient
decoration.

### Visual contract

-   Palette: `#38A3FF` primary, `#101820` ink, `#F4F7FA` paper,
    `#FF4D35` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `420ms`; secondary settle/reveal may
    extend total sequence to no more than `1070ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Lockdown Shutter**
understandable. If it overlays or transforms content, use a host panel
with `position: relative; overflow: hidden`. Do not redesign catalogue
chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Lockdown Shutter` - one-sentence blurb - origin:
`original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Lockdown Shutter** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 46. Gadget Deployment

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Gadget
Deployment**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Gadget Deployment** as a compact 320--768px preview artifact. It
should have one obvious trigger and one readable end state. The motion
must communicate a software state change rather than exist as ambient
decoration.

### Visual contract

-   Palette: `#E63946` primary, `#111111` ink, `#F1FAEE` paper,
    `#457B9D` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `500ms`; secondary settle/reveal may
    extend total sequence to no more than `1150ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Gadget
Deployment** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Gadget Deployment` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Gadget Deployment** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 47. License Card Issue

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **License
Card Issue**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **License Card Issue** as a compact 320--768px preview artifact.
It should have one obvious trigger and one readable end state. The
motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F4D35E` primary, `#0D0D0D` ink, `#FAFAFA` paper,
    `#EE964B` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `580ms`; secondary settle/reveal may
    extend total sequence to no more than `1230ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **License Card
Issue** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `License Card Issue` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**License Card Issue** sequence. 2. The effect remains fully clipped to
its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 48. Mission Complete Burst

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled **Mission
Complete Burst**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Mission Complete Burst** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#F6E652` primary, `#121212` ink, `#F5F2E8` paper,
    `#D72638` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `660ms`; secondary settle/reveal may
    extend total sequence to no more than `1310ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Mission Complete
Burst** understandable. If it overlays or transforms content, use a host
panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Mission Complete Burst` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Mission Complete Burst** sequence. 2. The effect remains fully clipped
to its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 49. Hold-to-Maximum Button

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**Hold-to-Maximum Button**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **Hold-to-Maximum Button** as a compact 320--768px preview
artifact. It should have one obvious trigger and one readable end state.
The motion must communicate a software state change rather than exist as
ambient decoration.

### Visual contract

-   Palette: `#38A3FF` primary, `#101820` ink, `#F4F7FA` paper,
    `#FF4D35` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `740ms`; secondary settle/reveal may
    extend total sequence to no more than `1390ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **Hold-to-Maximum
Button** understandable. If it overlays or transforms content, use a
host panel with `position: relative; overflow: hidden`. Do not redesign
catalogue chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `Hold-to-Maximum Button` - one-sentence blurb -
origin: `original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**Hold-to-Maximum Button** sequence. 2. The effect remains fully clipped
to its specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# 50. All-Clear Reset

## Cursor implementation prompt

Create a new specimen for `playground.humza-butt.space` titled
**All-Clear Reset**.

The specimen should translate the My Hero Academia-inspired idea into an
**original, portable software interaction**, not reproduce anime frames,
logos, character likenesses, costumes, catchphrase artwork, or
proprietary typography.

### Goal

Build **All-Clear Reset** as a compact 320--768px preview artifact. It
should have one obvious trigger and one readable end state. The motion
must communicate a software state change rather than exist as ambient
decoration.

### Visual contract

-   Palette: `#E63946` primary, `#111111` ink, `#F1FAEE` paper,
    `#457B9D` secondary accent.
-   Use hard comic geometry: clipped polygons, 2--6px ink rules,
    diagonal planes, halftone/line texture where appropriate.
-   Avoid gradients unless essential to the named effect.
-   Primary motion duration: about `420ms`; secondary settle/reveal may
    extend total sequence to no more than `1070ms`.
-   Use strong scale/translation/clip-path changes, but keep text
    readable at the settled state.
-   Use original generic copy such as `ANALYSIS`, `READY`, `ALERT`,
    `COMPLETE`, `TARGET`, `RANK`, `OUTPUT`, or `MISSION`.
-   No external images, fonts, SVG files, fetches, or network
    dependencies. Inline SVG is allowed when useful.

### Interaction

Provide a visible demo trigger such as `Run`, `Activate`, `Assign`,
`Start`, or `Replay`. The initial state, transition state, and final
state must all be visually distinct. Replay must deterministically
return to the exact initial state before rerunning.

### Technical constraints

-   Plain HTML + CSS, with tiny vanilla JS only when interaction
    state/timing requires it.
-   Must run inside `<iframe sandbox="allow-scripts">`.
-   Never use parent access, same-origin assumptions, storage,
    navigation, fetch, React/Vue, or native APIs.
-   Prefer `deps: ['none']`.
-   Keep CSS verbatim and self-contained.
-   No runtime randomness.
-   Clean up timers/listeners on replay where applicable.
-   Register explicitly in `src/specimens/index.ts`.

### Reduced motion

Honor both `prefers-reduced-motion: reduce` and
`data-force-reduced-motion`. Under reduced motion, remove large
translations, shakes, rapid flashes, repeated pulses and looping motion.
Preserve the semantic end state immediately using static comic geometry,
borders, typography, colour and/or halftone texture.

### Scaffold

Create only the minimum host context needed to make **All-Clear Reset**
understandable. If it overlays or transforms content, use a host panel
with `position: relative; overflow: hidden`. Do not redesign catalogue
chrome.

### Metadata

Create complete specimen metadata: - unique `id` and next available
`SPX-???` ref - title: `All-Clear Reset` - one-sentence blurb - origin:
`original — anime/comic action language study` - useful tags -
`deps: ['none']` - accurate motion metadata - preview
dimensions/background/scaffold - ordered integration instructions -
observable acceptance criteria

### Acceptance

At minimum verify: 1. The trigger produces one complete, deterministic
**All-Clear Reset** sequence. 2. The effect remains fully clipped to its
specimen/scaffold. 3. No external resources or privileged iframe
capabilities are required. 4. Replay produces the same sequence without
stale nodes, classes, timers or transforms. 5. Reduced-motion mode
preserves the final meaning without high-motion choreography. 6. The
result reads as an energetic comic/anime-inspired software primitive
while remaining clearly original.

Implement the specimen, register it, and verify it in the sandboxed
preview.

------------------------------------------------------------------------

# Suggested first ten

If Cursor is implementing these sequentially, start with:

1.  Impact Frame Slam
2.  Speed-Line Action Reveal
3.  Panel Break Transition
4.  Hero Name Slam
5.  Quirk Activation Burst
6.  Analysis Scribble Reveal
7.  Versus Card Collision
8.  Emergency Screen Takeover
9.  Blueprint Assembly
10. Maximum Output Breakthrough

These establish the catalogue's core vocabulary: comic impact, panels,
identity reveals, capability activation, analysis, competition,
emergency state, assembly, and threshold-breaking completion.
