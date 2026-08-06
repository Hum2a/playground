import type { Specimen } from '../../../types'
export const capsuleCollapse: Specimen = {
  id:'capsule-collapse', ref: 'SPX-1149', title:'Capsule Collapse',
  blurb:'SERVICE // API-07 structurally folds, encodes, and docks as a small stored token without losing identity.',
  origin:{project:'Original',surface:'Dragon Ball-inspired software object storage compression'},
  facets:{kind:'interaction',tech:'tiny-js',scope:'inline',intensity:'subtle'},
  inspiredBy:{franchise:'dragonball'},tags:['compression','storage','packing'],deps:'none',
  motion:{loops:false,respectsReducedMotion:true,reducedMotionNote:'Immediately renders Service API-07 stored.'},
  loadPayload:()=>import('./payload').then((m)=>m.default),
  preview:{width:380,height:380,background:'card',scaffold:'<div style="position:relative;overflow:hidden;width:100%;height:100%;padding:1rem;">{{specimen}}</div>',label:'Service object storage compression'},
  integration:['Keep the two explicit structural compression stages; do not replace them with a single scale.','Preserve four encoding lines and stored API-07 text.','Reduced motion renders the compact stored token immediately.'],
  acceptance:['Full service card structurally folds before two compression stages','Metadata clears REGION → LATENCY → WORKERS while API-07 remains','Exactly four encoding lines; 54×34px token docks and final status is STORED'],
}
