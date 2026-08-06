import type { Specimen } from '../types'
export const capsuleDeploy: Specimen={
 id:'capsule-deploy',ref:'SPX-1150',title:'Capsule Deploy',
 blurb:'Stored API-07 extracts, decodes through four structural lines, and constructively rebuilds into a HEALTHY service.',
 origin:{project:'Original',surface:'Dragon Ball-inspired software instantiation'},facets:{kind:'interaction',tech:'tiny-js',scope:'inline',intensity:'subtle'},inspiredBy:{franchise:'dragonball'},tags:['deployment','instantiation','expansion'],deps:'none',
 motion:{loops:false,respectsReducedMotion:true,reducedMotionNote:'Immediately renders full healthy service.'},loadPayload:()=>import('./payload').then((m)=>m.default),
 preview:{width:380,height:380,background:'card',scaffold:'<div style="position:relative;overflow:hidden;width:100%;height:100%;padding:1rem">{{specimen}}</div>',label:'API service deployment'},
 integration:['Keep exactly four decode lines and two reconstruction stages.','Reveal metadata rows sequentially; rail finishes VACANT.'],acceptance:['Token extracts from storage and API-07 remains visible','Four decode lines precede 100×74 then 280×180 reconstruction','Final metadata is healthy and static'],
}
