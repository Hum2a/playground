export interface ParsedCssContract {
  durations: string[]
  timingFunctions: string[]
  transforms: string[]
  angles: string[]
  colours: string[]
  fontWeights: string[]
  fontSizes: string[]
  todos: string[]
}

const TODO = (field: string) => `TODO: fill ${field}`

export function parseCssContract(css: string): Record<string, unknown> {
  const durations = unique(css.match(/\b\d+(?:\.\d+)?m?s\b/g) ?? [])
  const timingFunctions = unique(
    css.match(/\b(?:linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier\([^)]+\))\b/g) ??
      [],
  )
  const transforms = unique(css.match(/transform:\s*([^;]+);/g)?.map((m) => m.replace(/^transform:\s*|;$/g, '')) ?? [])
  const angles = unique(css.match(/-?\d+(?:\.\d+)?deg/g) ?? [])
  const colours = unique(css.match(/#[0-9A-Fa-f]{3,8}\b/g) ?? [])
  const fontWeights = unique(css.match(/font-weight:\s*(\d{3}|bold|normal)/g)?.map((m) => m.split(':')[1].trim()) ?? [])
  const fontSizes = unique(css.match(/font-size:\s*([^;]+);/g)?.map((m) => m.replace(/^font-size:\s*|;$/g, '').trim()) ?? [])

  const todos: string[] = []
  if (!durations.length) todos.push(TODO('animation.durationSeconds'))
  if (!timingFunctions.length) todos.push(TODO('animation.timingFunction'))
  if (!transforms.length) todos.push(TODO('animation.keyframes / layout transforms'))
  if (!angles.length) todos.push(TODO('layout.angleDegrees'))
  if (!colours.length) todos.push(TODO('colours'))
  if (!fontWeights.length) todos.push(TODO('typography.fontWeight'))
  if (!fontSizes.length) todos.push(TODO('typography.fontSize'))
  todos.push(TODO('copy.unit'))
  todos.push(TODO('dom structure'))
  todos.push(TODO('a11y contract'))
  todos.push(TODO('reducedMotion.triggers confirmation'))

  return {
    name: 'TODO: specimen-name',
    intent: 'TODO: one-line intent',
    inferredFromCss: {
      durations: durations.length ? durations : [TODO('durations')],
      timingFunctions: timingFunctions.length ? timingFunctions : [TODO('timingFunctions')],
      transforms: transforms.length ? transforms : [TODO('transforms')],
      angles: angles.length ? angles : [TODO('angles')],
      colours: colours.length ? colours : [TODO('colours')],
      fontWeights: fontWeights.length ? fontWeights : [TODO('fontWeights')],
      fontSizes: fontSizes.length ? fontSizes : [TODO('fontSizes')],
    },
    todos,
  }
}

function unique(items: string[]): string[] {
  return [...new Set(items)]
}
