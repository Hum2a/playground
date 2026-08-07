# Entry Registration (portable recreation spec)

Unknown catalogue entry is scanned, identified, numbered, and permanently
registered. Rebuild from this document and `contract.json`.

Do **not** reproduce Pokédex hardware, Pokémon art, logos, sprites, fonts, or
franchise branding.

## Visual intent

| Phase | Copy |
| ----- | ---- |
| Initial | `ENTRY // ???` · NAME/CLASS UNKNOWN · STATUS UNREGISTERED |
| Final | `ENTRY // 086` · VECTOR BLOOM · TRANSITION · REGISTERED |

Trigger: `REGISTER`

## Palette

| Token | Value |
| ----- | ----- |
| Panel | `#19252a` |
| Paper | `#e8eadf` |
| Coral | `#cf5a47` |
| Gold | `#e5b24b` |
| Sage | `#78a88c` |

## Scan (phase 1)

- Vertical beam, **2px**, left → right over **620ms**
- Behind beam: structured geometry (`--er-scan` clip)
- Ahead: soft unknown silhouette
- Keep `ENTRY // …` aligned above the two-column record; labels and values must
  remain separately legible in the compact `380px` preview.

## Metadata thresholds

| Field | Reveal at scan progress | Swap |
| ----- | ---------------------- | ---- |
| NAME | **30%** | UNKNOWN → VECTOR BLOOM (vertical replace, no fade) |
| CLASS | **55%** | UNKNOWN → TRANSITION |
| STATUS | after index lock | UNREGISTERED → REGISTERED |

## Index assignment

After scan, cycle exactly **7** values at **~45ms** each:

`014 → 038 → 051 → 072 → 083 → 085 → 086`

Lock on **086**. Do **not** announce intermediates to AT.

## Registration lock

Four corner brackets move inward; STATUS becomes REGISTERED; thin underline
grows under the record. Final state is static.

## Reduced motion

Immediate final registered record.

## API

- `window.entryRegistration.register(root)`
- `window.entryRegistration.reset(root)`
- `window.entryRegistration.init(scope?)`
