export interface Specimen {
  id: string
  ref: string
  title: string
  blurb: string
  origin: { project: string; surface?: string }
  tags: string[]
  deps: 'none' | string[]
  motion: {
    loops: boolean
    respectsReducedMotion: boolean
    reducedMotionNote?: string
  }
  files: { html: string; css: string; js?: string }
  spec: string
  contract: unknown
  preview: {
    width: number
    height: number
    background: 'card' | 'page' | 'grid' | 'dark'
    scaffold?: string
    label: string
  }
  integration?: string[]
  acceptance?: string[]
}
