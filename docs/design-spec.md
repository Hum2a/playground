# playground.humza-butt.space — design spec

A catalogue of portable motion artifacts extracted from real projects, plus a sandbox for
building new ones. Every entry is a **specimen**: a live preview, an exact contract, and a
one-click prompt that lets an agent rebuild it somewhere else.

---

## 1. What it is

Two surfaces, one content model.

| Surface | Job |
| --- | --- |
| **Catalogue** (`/`, `/s/:id`) | Browse specimens, see them running, copy a recreation prompt |
| **Playground** (`/playground`) | Write HTML/CSS/JS against a live sandbox, then export it as a specimen |

Non-goals: no accounts, no database, no server, no CMS. It is a static site whose content
lives in the repo. If a specimen isn't in git, it doesn't exist.

## 2. Core constraint that drives everything

Specimens are **arbitrary CSS with global class names, loud colours, and infinite loops**.
They cannot be rendered into the same document as the site chrome — one `* { }` reset or a
`.track` collision and the site eats itself.

So every preview renders inside a **sandboxed `<iframe srcdoc>`**. That single decision buys:

- true style isolation, no scoping hacks, specimen CSS stays verbatim and therefore portable
- per-preview environment toggles (`prefers-reduced-motion` emulation, `data-force-reduced-motion`,
  background, viewport width) without touching the host page
- animation control via `document.getAnimations()` inside the frame — pause, and 0.25×–2× speed
- copy-paste fidelity: what you copy is literally what ran

Sandbox attribute: `sandbox="allow-scripts"` only. Never add `allow-same-origin` alongside it —
that combination un-sandboxes the frame. Specimens therefore cannot read the parent, use
storage, or navigate.

## 3. Content model

One folder per specimen. Everything is a real file so it can be diffed, linted, and copied out.

```
src/specimens/coming-soon-tape/
  entry.ts        # metadata, imports the rest with ?raw
  demo.html       # markup fragment (no <html>/<body>)
  demo.css        # styles, verbatim, portable
  demo.js         # optional
  spec.md         # human-readable portable spec
  contract.json   # machine-readable contract (JSON Schema style)
```

```ts
export interface Specimen {
  id: string;                 // 'coming-soon-tape' — URL slug
  ref: string;                // 'SPX-001' — stable catalogue reference
  title: string;
  blurb: string;              // one sentence, what it looks like
  origin: { project: string; surface?: string };  // 'Buzzer' / 'Teacher class launch pad'
  facets: {                   // required orthogonal axes — see taxonomy below
    kind: 'overlay' | 'transition' | 'loop' | 'interaction';
    tech: 'css-only' | 'tiny-js';
    scope: 'card' | 'fullscreen' | 'inline';
    intensity: 'subtle' | 'graphic' | 'maximal';
  };
  inspiredBy?: {              // optional game lineage — see inspiration directory
    franchise: string;        // e.g. 'persona'
    works?: string[];         // e.g. ['persona-5']
  };
  tags: string[];             // effect flavor only — never duplicate facet/inspiration ids
  deps: 'none' | string[];    // 'none' means pure HTML+CSS
  motion: {
    loops: boolean;
    respectsReducedMotion: boolean;
    reducedMotionNote?: string;
  };
  files: { html: string; css: string; js?: string };
  spec: string;               // spec.md as raw string
  contract: unknown;          // contract.json parsed
  preview: {
    width: number;            // frame width in px, e.g. 360
    height: number;
    background: 'card' | 'page' | 'grid' | 'dark';
    scaffold?: string;        // optional host markup the specimen mounts into
    label: string;            // 'Locked lesson card'
  };
  integration?: string[];     // ordered steps for the target project
  acceptance?: string[];      // checkable outcomes
}
```

`scaffold` matters for overlays. The caution tape is meaningless floating in space — it needs a
card with `position: relative; overflow: hidden` around it. That host markup is part of the
specimen's story, so it ships with it.

### Taxonomy

Facets are the catalogue’s primary filter axes. Source of truth:
`src/specimens/taxonomy.ts`. Free `tags` are optional effect flavor and must not repeat any
facet or inspiration id.

Game / franchise lineage uses optional `inspiredBy` from the inspiration directory
(`src/specimens/inspiration.ts`, human mirror `docs/inspiration-directory.md`):

```ts
inspiredBy: { franchise: 'persona', works: ['persona-5'] }
```

Franchise = category (Persona); works = specific titles (Persona 5). `tech` must match whether
the specimen ships `demo.js` / `files.js`.

Registry is sharded under `src/specimens/registry/`: franchise `shards/<franchise>.ts` plus
canonical `order.ts`, assembled by `assemble.ts`. Specimens live in
`library/<franchise>/<id>/`. Adding a specimen = add that folder, import in the franchise
shard, append the id to `order.ts` (or use `npm run spec:ship`). No dynamic loading, no magic
globs — the explicit shard list keeps ordering and ref numbers under your control. `index.ts`
is a thin barrel only.

## 4. The prompt builder

The reason the site exists. `buildPrompt(specimen, mode)` returns a clipboard string.

Three modes on every specimen: **Full prompt** (default), **Code only**, **Contract only**.

Full prompt template:

````md
# Recreate: {title} ({ref})

Add this self-contained visual effect to the current project. Reproduce it exactly from the
contract below. Do not restyle it to match the host design system, do not rename the classes,
and do not "improve" the values — this is a portable artifact and the numbers are the contract.

## Intent
{blurb}
Originally from {origin.project}{, origin.surface}.

## Dependencies
{deps === 'none' ? 'None. Plain HTML and CSS.' : list}

## Host requirements
{preview.scaffold ? 'Mount inside a container that satisfies:' : ''}
{contract.layout.parentRequirements}

## Markup
```html
{files.html}
```

## Styles
```css
{files.css}
```

{files.js ? '## Behaviour\n```js\n...\n```' : ''}

## Machine-readable contract
```json
{contract}
```

## Integration
{integration steps, numbered}

## Acceptance
{acceptance items, as a checklist}
````

Rules for the generated text:

- No prose about the playground itself. The receiving agent has no idea this site exists.
- Imperative, second person, present tense.
- Acceptance criteria are observable, not aspirational: "marquee loops with no visible seam",
  not "looks good".
- Always include the reduced-motion clause when `motion.respectsReducedMotion` is true.

## 5. Visual direction

The specimens are loud, clashing, and arbitrary. **The chrome is therefore monochrome by
policy** — the only colour on any page comes from the specimens themselves and from one accent
reserved exclusively for interactive affordances. This is the design's central rule; every
other decision follows from it.

The reference frame is a **parts catalogue**: numbered references, dimensioned plates, terse
captions. Not a dev-tool dashboard, not a portfolio.

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#12141A` | Page ground |
| `--panel` | `#1B1E26` | Plate / card ground |
| `--rule` | `#2C313C` | Hairlines, frame edges |
| `--pewter` | `#767E8C` | Captions, metadata, disabled |
| `--chalk` | `#E6E8EC` | Primary text |
| `--verdigris` | `#4E9E8F` | The only accent. Focus, active state, copy confirmation. |

Verdigris is deliberately desaturated and cool — it reads as "interactive" without competing
with a `#f5c518` caution band sitting two inches away. It is never used decoratively, never as
a gradient, and never on more than one element at a time in a viewport.

### Type

| Role | Face | Setting |
| --- | --- | --- |
| Display | **Archivo Expanded** 700 | Specimen titles, hero. Tight leading, `-0.02em`. |
| Body | **Inter Tight** 400/500 | Prose, blurbs, UI labels. |
| Utility | **JetBrains Mono** 400/700 | Refs, tags, dimensions, code, every number on the page. |

Deliberately not Outfit — Outfit is a Buzzer face and appears inside the first specimen. The
chrome must never be mistaken for content.

Scale: `0.6875 / 0.8125 / 1 / 1.375 / 2 / 3.25rem`. Mono is always one step smaller than the
body text it sits beside, and always uppercase with `0.08em` tracking for refs and tags.

### Layout

Content is near full-bleed inside shared gutters (`--gutter-inline`). Catalogue, detail, and
playground have no narrow page max-width (`--content-max: none`). The filtered plate grid uses
`auto-fill` with `--plate-min`, which densifies above `90rem` and `120rem`. Intro copy and detail
blurbs keep a short prose measure so text does not stretch wall-to-wall.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ SPECIMEN ARCHIVE                          [ catalogue ] [ playground ]        │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ [ all ] [ overlay ] [ marquee ] …                                  ⌕ filter  │
├──────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ …          │  ← plates densify
│ │ SPX-001  │ │ SPX-002  │ │ SPX-003  │ │ SPX-004  │ │ SPX-005  │            │    on wide viewports
│ │ preview  │ │ preview  │ │ preview  │ │ preview  │ │ preview  │            │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
└──────────────────────────────────────────────────────────────────────────────┘
```

Detail route `/s/:id` is a two-column plate: sticky preview with its control strip on the left
(`--detail-preview-col`, grows on wide viewports), tabbed source (Spec / Markup / Styles /
Contract / Prompt) on the right. Collapses to stacked on mobile with the preview pinned to the top.

### Catalogue entry

The catalogue begins with its filters and filtered plate grid. This keeps the first viewport
purposeful: visitors can immediately narrow the archive rather than loading an unfiltered
duplicate of every preview. Per-plate play is always available, and motion-sensitive visitors
can keep individual previews static.

The filter bar includes a persistent Explorer-style view chooser: compact, standard, large, and
extra-large. Its non-default selection is stored in `?view=` so the chosen preview density can be
shared without changing the applied filters.

### Restraint list

- One accent, one use.
- Hairlines at `1px solid var(--rule)`. No shadows on chrome — shadows belong to specimens.
- `border-radius: 2px` on plates, `0` on everything else.
- No hover effects on the chrome beyond a rule-colour shift and a focus ring. The page is a
  frame for motion; the frame does not move.

## 6. Playground

Split view: editor column (HTML / CSS / JS tabs, CodeMirror 6) and the same iframe harness used
by the catalogue.

Control strip, shared with the detail route:

- Viewport width presets: 320 / 360 / 768 / full
- Background: card / page / grid / dark
- Reduced motion: off / `prefers-reduced-motion` / `data-force-reduced-motion`
- Playback: pause, and 0.25× / 0.5× / 1× / 2× via `getAnimations()` `playbackRate`
- Restart frame

Persistence: debounced to `localStorage` under `playground:draft:{id}`, plus **Share** which
lz-string-compresses the draft into the URL hash. No backend, and a shared link is inert because
the frame is sandboxed.

**Export specimen** generates the folder from section 3 — `demo.html`, `demo.css`, optional
`demo.js`, a filled `entry.ts`, a `spec.md` scaffold, and a `contract.json` derived from what it
can read (angles, durations, colours found in the CSS) with `TODO` markers for the rest. Download
as a zip. This is the loop that keeps the catalogue growing without friction.

## 7. Stack and deployment

Static only. Explicitly **not** the usual scaffold — no Hono, no Neon, no auth, no Workers.

- React 19 + Vite + TypeScript, npm
- Vanilla CSS with custom properties, no Tailwind (the chrome is small and the tokens above are
  the whole system)
- React Router, or a 60-line hash router if you'd rather not add the dep
- CodeMirror 6 (`@codemirror/lang-html|css|javascript`) — playground route only, lazy-loaded
- Catalogue / detail / playground routes are `React.lazy`-split so Shell (LCP wordmark) paints before specimen meta; playground deps (`fflate`, CodeMirror) stay off `/`
- Specimen folders split light `entry.ts` (metadata + `loadPayload`) from `payload.ts` (`?raw` assets); previews and copy resolve payloads on demand
- Fonts load after first paint (`import()` from `main.tsx`) with `font-display: optional` to avoid bandwidth contention and font CLS; faces are latin (+ latin-ext) only via `src/styles/fonts-latin.css`
- Vitest for `buildPrompt` and the srcdoc composer; Playwright for one smoke test per route

Build and host:

- `vite build` → `dist`
- `npm run analyze` — list hashed asset sizes after build
- Cloudflare Pages project `playground`, connected to the repo, production branch `main`
- Custom domain `playground.humza-butt.space` added in Pages; the CNAME is created automatically
  on the `humza-butt.space` zone
- `public/_redirects`: `/*  /index.html  200`
- `public/_headers`: immutable caching on `/assets/*`, and a CSP that allows `frame-src 'self'`
  plus inline styles in the frame document

Scripts, matching the `<domain>:<action>` convention:

```
dev            spec:new <slug>      # scaffold a specimen folder (entry + payload)
build          spec:check           # validate every entry against contract.json
preview        deploy:preview
test           deploy:prod
analyze        # build + report chunk sizes
```

## 8. Quality floor

- Visible focus ring in verdigris on every interactive element, `:focus-visible` only
- Copy buttons announce via a polite live region: "Prompt copied — 1,842 characters"
- Every iframe carries a real `title` ("Preview: Coming-soon caution tape")
- Contact sheet and plates lazy-mount frames via `IntersectionObserver` (`useFrameVisibility` starts
  not-visible, sync-checks above-fold hosts, ~50% rootMargin); unmount when outside that margin;
  placeholders and `PreviewFrame` share the specimen aspect-ratio (CSS container-query scale — no
  post-paint JS resize) so iframe mount does not shift layout
- Lighthouse ≥ 90 on mobile for `/` with the sheet paused
- Works with JS disabled to the extent of showing the spec text — nice to have, not a gate

## 9. First specimen

`SPX-001 — Coming-soon caution tape`, from Buzzer's teacher class launch pad. The supplied
`coming-soon-tape.md` becomes `spec.md` with the Buzzer-internal sections (toggle locations,
repo paths, related living docs) stripped into `entry.ts` metadata instead. The supplied schema
becomes `contract.json` unchanged. `preview.scaffold` is a dimmed lesson card at
`position: relative; overflow: hidden`, opacity `0.55`, so the tape reads exactly as it does in
Buzzer.
