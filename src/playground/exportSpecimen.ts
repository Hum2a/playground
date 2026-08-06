import { zipSync, strToU8 } from 'fflate'
import type { HarnessControls } from '../harness'
import { specimens } from '../specimens'
import type {
  SpecimenIntensity,
  SpecimenKind,
  SpecimenScope,
  SpecimenTech,
} from '../specimens/taxonomy'
import {
  FACET_VALUES,
  type FacetKey,
} from '../specimens/taxonomy'
import { parseCssContract } from './parseCssContract'

export interface ExportMeta {
  id: string
  title: string
  blurb: string
  originProject: string
  originSurface?: string
  kind: SpecimenKind
  tech: SpecimenTech
  scope: SpecimenScope
  intensity: SpecimenIntensity
  /** Comma-separated free tags. */
  tags: string
}

export interface ExportInput extends ExportMeta {
  html: string
  css: string
  js: string
  controls: HarnessControls
  previewWidth: number
  previewHeight: number
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function parseTags(raw: string): string[] {
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

function isFacetValue<K extends FacetKey>(
  key: K,
  value: string,
): value is (typeof FACET_VALUES)[K][number] {
  return (FACET_VALUES[key] as readonly string[]).includes(value)
}

export function validateExportMeta(meta: ExportMeta): string | null {
  if (!SLUG_RE.test(meta.id)) {
    return 'Id must be a lowercase slug (a-z, 0-9, hyphens).'
  }
  if (specimens.some((s) => s.id === meta.id)) {
    return `Id “${meta.id}” is already in the registry.`
  }
  if (!meta.title.trim()) return 'Title is required.'
  if (!meta.blurb.trim()) return 'Blurb is required.'
  if (!meta.originProject.trim()) return 'Origin project is required.'
  if (!isFacetValue('kind', meta.kind)) return 'Kind is required.'
  if (!isFacetValue('tech', meta.tech)) return 'Tech is required.'
  if (!isFacetValue('scope', meta.scope)) return 'Scope is required.'
  if (!isFacetValue('intensity', meta.intensity)) return 'Intensity is required.'
  return null
}

function buildEntryTs(input: ExportInput): string {
  const surface = input.originSurface?.trim()
    ? `\n    surface: ${JSON.stringify(input.originSurface.trim())},`
    : ''
  const jsImport = input.js.trim()
    ? `import js from './demo.js?raw'\n`
    : ''
  const jsField = input.js.trim() ? `\n    js,` : ''
  const tags = parseTags(input.tags)

  return `import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
${jsImport}import spec from './spec.md?raw'
import contract from './contract.json'

export const specimen: Specimen = {
  id: ${JSON.stringify(input.id)},
  ref: 'SPX-TODO',
  title: ${JSON.stringify(input.title.trim())},
  blurb: ${JSON.stringify(input.blurb.trim())},
  origin: {
    project: ${JSON.stringify(input.originProject.trim())},${surface}
  },
  // TODO: set inspiredBy (see inspiration.ts / docs/inspiration-directory.md)
  facets: {
    kind: ${JSON.stringify(input.kind)},
    tech: ${JSON.stringify(input.tech)},
    scope: ${JSON.stringify(input.scope)},
    intensity: ${JSON.stringify(input.intensity)},
  },
  // inspiredBy: { franchise: 'persona', works: ['persona-5'] },
  tags: ${JSON.stringify(tags)},
  deps: 'none',
  motion: {
    loops: true,
    respectsReducedMotion: true,
    reducedMotionNote: 'TODO: describe reduced-motion behaviour',
  },
  files: { html, css,${jsField} },
  spec,
  contract,
  preview: {
    width: ${input.previewWidth},
    height: ${input.previewHeight},
    background: ${JSON.stringify(input.controls.background)},
    label: ${JSON.stringify(input.title.trim())},
  },
  integration: [
    'TODO: mount steps for the target project',
  ],
  acceptance: [
    'TODO: observable acceptance criteria',
  ],
}
`
}

function buildSpecMd(input: ExportInput): string {
  return `# ${input.title.trim()}

## Visual intent

${input.blurb.trim()}

## DOM structure

\`\`\`html
${input.html.trim()}
\`\`\`

## Copy

TODO: document the visible copy units.

## Layout and colour contract

TODO: table of contracted values (angles, colours, sizes, timings).

## Reduced motion

Stop motion under \`prefers-reduced-motion: reduce\` and \`data-force-reduced-motion="true"\`.
Keep the static effect visible.

## Accessibility

TODO: decorative vs announced content.

## Porting to another stack

1. Copy the DOM + CSS.
2. Mount inside any required host scaffold.
3. Gate render with your own boolean.
4. Wire both reduced-motion triggers.
`
}

export function buildSpecimenZip(input: ExportInput): Uint8Array {
  const folder = `${input.id}/`
  const files: Record<string, Uint8Array> = {
    [`${folder}demo.html`]: strToU8(input.html),
    [`${folder}demo.css`]: strToU8(input.css),
    [`${folder}demo.style.txt`]: strToU8(input.css),
    [`${folder}spec.md`]: strToU8(buildSpecMd(input)),
    [`${folder}contract.json`]: strToU8(
      JSON.stringify(parseCssContract(input.css), null, 2) + '\n',
    ),
    [`${folder}entry.ts`]: strToU8(buildEntryTs(input)),
    [`${folder}README.md`]: strToU8(
      `# ${input.title.trim()}

## Manual steps

1. Drop this folder into \`src/specimens/\`.
2. Add one import line for \`entry.ts\` in \`src/specimens/index.ts\` and push the specimen into the \`specimens\` array.
`,
    ),
  }

  if (input.js.trim()) {
    files[`${folder}demo.js`] = strToU8(input.js)
  }

  return zipSync(files)
}

export function downloadZip(filename: string, data: Uint8Array) {
  const copy = new Uint8Array(data.byteLength)
  copy.set(data)
  const blob = new Blob([copy], { type: 'application/zip' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
