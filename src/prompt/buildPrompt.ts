import type { SpecimenResolved } from '../specimens/types'

export type PromptMode = 'full' | 'code' | 'contract'

function fenceFor(content: string, language: string): string {
  const longest = (content.match(/`+/g) ?? []).reduce(
    (max, ticks) => Math.max(max, ticks.length),
    0,
  )
  const ticks = '`'.repeat(Math.max(3, longest + 1))
  return `${ticks}${language}\n${content}\n${ticks}`
}

function originLine(specimen: SpecimenResolved): string {
  const { project, surface } = specimen.origin
  return surface ? `Originally from ${project}, ${surface}.` : `Originally from ${project}.`
}

function depsLine(specimen: SpecimenResolved): string {
  if (specimen.deps === 'none') return 'None. Plain HTML and CSS.'
  return specimen.deps.map((d) => `- ${d}`).join('\n')
}

function parentRequirements(contract: unknown): string[] {
  if (!contract || typeof contract !== 'object') return []
  const root = contract as Record<string, unknown>
  const layout = root.layout
  if (layout && typeof layout === 'object') {
    const reqs = (layout as { parentRequirements?: unknown }).parentRequirements
    if (Array.isArray(reqs) && reqs.every((r) => typeof r === 'string')) {
      return reqs as string[]
    }
  }
  const examples = root.examples
  if (Array.isArray(examples) && examples[0] && typeof examples[0] === 'object') {
    const exampleLayout = (examples[0] as { layout?: { parentRequirements?: unknown } })
      .layout
    const reqs = exampleLayout?.parentRequirements
    if (Array.isArray(reqs) && reqs.every((r) => typeof r === 'string')) {
      return reqs as string[]
    }
  }
  return []
}

function reducedMotionClause(specimen: SpecimenResolved): string {
  if (!specimen.motion.respectsReducedMotion) return ''
  const note =
    specimen.motion.reducedMotionNote ??
    'Stop the animation under prefers-reduced-motion and when data-force-reduced-motion is set on the document root; keep the static effect visible.'
  return note
}

export function buildPrompt(specimen: SpecimenResolved, mode: PromptMode = 'full'): string {
  if (mode === 'code') {
    const parts = [
      fenceFor(specimen.files.html.trimEnd(), 'html'),
      '',
      fenceFor(specimen.files.css.trimEnd(), 'css'),
    ]
    if (specimen.files.js?.trim()) {
      parts.push('', fenceFor(specimen.files.js.trimEnd(), 'js'))
    }
    return parts.join('\n')
  }

  if (mode === 'contract') {
    return JSON.stringify(specimen.contract, null, 2)
  }

  const reqs = parentRequirements(specimen.contract)
  const hostBlock = (specimen.scaffold ?? specimen.preview.scaffold)
    ? [
        '## Host requirements',
        'Mount inside a container that satisfies:',
        ...(reqs.length ? reqs.map((r) => `- \`${r}\``) : ['- `position: relative`', '- `overflow: hidden`']),
        '',
      ].join('\n')
    : ''

  const behaviour = specimen.files.js?.trim()
    ? `## Behaviour\n${fenceFor(specimen.files.js.trimEnd(), 'js')}\n\n`
    : ''

  const integration =
    (specimen.integration?.length
      ? [
          '## Integration',
          ...specimen.integration.map((step, i) => `${i + 1}. ${step}`),
          '',
        ].join('\n')
      : '')

  const acceptanceItems = [...(specimen.acceptance ?? [])]
  const rm = reducedMotionClause(specimen)
  if (rm && !acceptanceItems.some((a) => /reduced motion/i.test(a))) {
    acceptanceItems.push(rm)
  }

  const acceptance = acceptanceItems.length
    ? ['## Acceptance', ...acceptanceItems.map((item) => `- [ ] ${item}`), ''].join(
        '\n',
      )
    : ''

  return [
    `# Recreate: ${specimen.title} (${specimen.ref})`,
    '',
    'Add this self-contained visual effect to the current project. Reproduce it exactly from the',
    'contract below. Do not restyle it to match the host design system, do not rename the classes,',
    'and do not "improve" the values — this is a portable artifact and the numbers are the contract.',
    '',
    '## Intent',
    specimen.blurb,
    originLine(specimen),
    '',
    '## Dependencies',
    depsLine(specimen),
    '',
    hostBlock,
    '## Markup',
    fenceFor(specimen.files.html.trimEnd(), 'html'),
    '',
    '## Styles',
    fenceFor(specimen.files.css.trimEnd(), 'css'),
    '',
    behaviour,
    '## Machine-readable contract',
    fenceFor(JSON.stringify(specimen.contract, null, 2), 'json'),
    '',
    integration,
    acceptance,
  ]
    .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd() + '\n'
}
