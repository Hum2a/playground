# Cursor rules — Specimen Archive

Numbered project rules in `rules/`, following the Buzzer `NN_topic.mdc` pattern.
Decades leave room for inserts (`45_`, `46_`, …).

Hand-authored — not auto-synced from `AGENTS.md`. Keep `AGENTS.md` short; expand
detail here. Deeper product text lives in `docs/design-spec.md`.

| File | When it applies |
| --- | --- |
| `00_core.mdc` | Always — product invariants |
| `10_stack.mdc` | Always — stack and tooling |
| `20_structure.mdc` | Always — folder map and sharded registry |
| `30_specimens.mdc` | `src/specimens/**` |
| `35_taxonomy.mdc` | `src/specimens/**` — facets, tags, inspiration directory |
| `36_specimen-commits.mdc` | Always — auto-commit after adding a new specimen |
| `37_persona-catalogue.mdc` | Always — mark P5/P3/PK/DB/IOS/AND/MHA/NR/P4/NF/PS/NEWS/MUSIC/MANGA checklist when a catalogue specimen ships |
| `40_harness.mdc` | `src/harness/**` |
| `45_design.mdc` | Chrome styles / app shell CSS |
| `46_motion.mdc` | Always — reduced motion |
| `50_prompt.mdc` | `src/prompt/**` |
| `55_catalogue.mdc` | `src/catalogue/**` |
| `56_playground.mdc` | `src/playground/**` |
| `60_testing.mdc` | Tests, e2e, `scripts/spec-*` |
| `70_deploy.mdc` | Wrangler, `_headers`, `_redirects`, GHA |
| `80_a11y.mdc` | Always — accessibility floor |
| `90_maintain-rules.mdc` | Always — keep rules in sync |

When you add a new `.mdc`, add a row here in the same change.
