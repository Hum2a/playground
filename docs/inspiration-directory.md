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

### Original (`original`)

Invented here / not tied to a specific game. Prefer omitting `inspiredBy` when truly original unless you want an explicit “Original” filter chip.

## Adding a franchise or title

1. Edit `INSPIRATION_DIRECTORY` in `src/specimens/inspiration.ts`
2. Mirror the change in **this file**
3. Use the new ids from `inspiredBy` on specimen `entry.ts`
4. `npm run spec:check` must pass

Slug rules: kebab-case ids; human `label` for UI.
