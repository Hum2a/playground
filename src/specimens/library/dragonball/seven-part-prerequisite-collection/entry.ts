import type { Specimen } from '../../../types'
export const sevenPartPrerequisiteCollection: Specimen = {
  id:'seven-part-prerequisite-collection',ref:'SPX-1070',title:'Seven-Part Prerequisite Collection',
  blurb:
    'Six shape-matched glyphs light asymmetric radar blips; a seventh star signal acquires into the vacant APPROVAL receptacle, seven hub-ward links draw, and publish unlocks.',
  origin:{project:'Original',surface:'Dragon Ball collection-completion–inspired prerequisite unlock'},
  facets:{kind:'interaction',tech:'tiny-js',scope:'inline',intensity:'graphic'},
  inspiredBy:{franchise:'dragonball'},tags:['collection','prerequisite','completion','unlock'],deps:'none',
  motion:{loops:false,respectsReducedMotion:true,reducedMotionNote:'Immediately presents seven connected requirements and PUBLISH READY.'},
  loadPayload:()=>import('./payload').then((m)=>m.default),
  preview:{width:360,height:390,background:'dark',label:'Seven part prerequisite collection'},
  integration: [
    'Keep seven asymmetric anchor coordinates and SVG link endpoints fixed.',
    'Each receptacle must match its token clip-path (diamond, square, triangle, hex, cross, chevron, star).',
    'Call window.sevenPartPrerequisiteCollection.receive() / .reset().',
    'Keep the 140ms post-dock hold before link draw.',
  ],
  acceptance: [
    'Seven distinct glyph shapes at fixed blips — not a ring of identical dots.',
    'APPROVAL star slot begins VACANT at 6/7; acquires over 300ms then seats.',
    'After 140ms hold exactly seven SVG links draw to hub 160,130.',
    'PUBLISH unlocks only after hub flare; final state is static.',
  ],
}
