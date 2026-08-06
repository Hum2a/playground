# Inspiration directory

Catalogue of **franchises** (categories) and **works** (specific titles) used to label
specimens that recreate or are inspired by game UI/motion language.

**Source of truth:** [`src/specimens/inspiration.ts`](../src/specimens/inspiration.ts)  
**Agent rule:** [`.cursor/rules/35_taxonomy.mdc`](../.cursor/rules/35_taxonomy.mdc)

Do **not** invent copyrighted assets. Labels describe visual *language* only.

## How specimens use it

```ts
inspiredBy: {
  franchise: 'persona',       // category
  works: ['persona-5'],       // optional specific titles
}
```

- Franchise alone = series-wide language
- Franchise + works = more specific (e.g. Persona → Persona 5)
- Free `tags` stay for effect flavor (`comic`, `wipe`) — never put `persona` / `persona-5` in `tags`

## Current directory

### Persona (`persona`)

| Work id | Label |
| --- | --- |
| `persona-3` | Persona 3 |
| `persona-3-reload` | Persona 3 Reload |
| `persona-4` | Persona 4 |
| `persona-5` | Persona 5 |

### Final Fantasy (`final-fantasy`)

| Work id | Label |
| --- | --- |
| `ff-vii` | Final Fantasy VII |
| `ff-x` | Final Fantasy X |

### The Legend of Zelda (`zelda`)

| Work id | Label |
| --- | --- |
| `zelda-botw` | Breath of the Wild |
| `zelda-totk` | Tears of the Kingdom |

### Metal Gear (`metal-gear`)

| Work id | Label |
| --- | --- |
| `mgs` | Metal Gear Solid |

### Ace Attorney (`ace-attorney`)

*(franchise only so far — add works when needed)*

### Celeste (`celeste`)

*(franchise only so far)*

### Danganronpa (`danganronpa`)

| Work id | Label |
| --- | --- |
| `danganronpa-1` | Danganronpa: Trigger Happy Havoc |
| `danganronpa-2` | Danganronpa 2: Goodbye Despair |
| `danganronpa-v3` | Danganronpa V3: Killing Harmony |

### NieR (`nier`)

| Work id | Label |
| --- | --- |
| `nier-automata` | NieR:Automata |

### Cyberpunk (`cyberpunk`)

*(franchise only so far — original glitch / malfunction UI language; no game-specific assets)*

### Splatoon (`splatoon`)

*(franchise only so far — add works when needed)*

### Pokémon (`pokemon`)

*(franchise only so far — classic creature-battle encounter presentation language; no game assets)*

Backlog: [`docs/catalogue/pokemon-specimen-catalogue.md`](catalogue/pokemon-specimen-catalogue.md) (`PK-NNN` / `SPX-700`…`SPX-965`).

### Dragon Ball (`dragonball`)

*(franchise only so far — ki / scouter / fusion / transmission motion language; no anime or game assets)*

Backlog: [`docs/catalogue/dragonball-specimen-catalogue.md`](catalogue/dragonball-specimen-catalogue.md) (`DB-NNN` / `SPX-966`…`SPX-1209`).

### Apple Platforms (`apple`)

| Work id | Label |
| --- | --- |
| `ios` | iOS |
| `macos` | macOS |

Platform interaction language (continuity, detents, materials, ownership). No Apple marks, SF Symbol assets, or system screenshots.

Backlog: [`docs/catalogue/ios-macos-specimen-catalogue.md`](catalogue/ios-macos-specimen-catalogue.md) (`IOS-NNN` / `SPX-1300`…`SPX-1557`).

### Android (`android`)

*(franchise only so far — Material / predictive-back / system-surface motion language; no Google or Pixel assets)*

Backlog: [`docs/catalogue/android-specimen-catalogue.md`](catalogue/android-specimen-catalogue.md) (`AND-NNN` / `SPX-1558`…`SPX-1974`).

### My Hero Academia (`my-hero-academia`)

*(franchise only so far — manga impact / Quirk activation / analysis / tournament motion language; no anime or manga assets)*

Backlog: [`docs/catalogue/my-hero-academia-specimen-catalogue.md`](catalogue/my-hero-academia-specimen-catalogue.md) (`MHA-NNN` / `SPX-1975`…`SPX-2343`).

### Naruto (`naruto`)

*(franchise only so far — ninja/anime action-language study; no series-specific assets)*

Backlog: [`docs/catalogue/naruto-specimen-catalogue.md`](catalogue/naruto-specimen-catalogue.md) (`NR-NNN` / `SPX-2344`…`SPX-2918`).

### Netflix / streaming UI (`netflix`)

*(franchise only so far — rails, preview expand, playback chrome, skip/next-up, profiles; no Netflix logos, fonts, or show assets)*

Backlog: [`docs/catalogue/netflix-specimen-catalogue.md`](catalogue/netflix-specimen-catalogue.md) (`NF-NNN` / `SPX-3110`…`SPX-3306`).

### PlayStation (`playstation`)

*(PS5-style home/control center, geometric system motion, activities, trophies, downloads, DualSense-style feedback; no PlayStation logos, fonts, or game assets)*

Works: `ps5`, `ps4`.

Backlog: [`docs/catalogue/playstation-specimen-catalogue.md`](catalogue/playstation-specimen-catalogue.md) (`PS-NNN` / `SPX-3307`…`SPX-3522`).

### Original (`original`)

Invented here / not tied to a specific game. Prefer omitting `inspiredBy` when truly original unless you want an explicit “Original” filter chip.

## Adding a franchise or title

1. Edit `INSPIRATION_DIRECTORY` in `src/specimens/inspiration.ts`
2. Mirror the change in **this file**
3. Use the new ids from `inspiredBy` on specimen `entry.ts`
4. `npm run spec:check` must pass

Slug rules: kebab-case ids; human `label` for UI.
