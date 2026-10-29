/* The supplied liquid-glass module owns the optics; this file manages its lifecycle. */
(()=>{
const surfaces=new Map();let scheduled=false;
const selector='.glass,.search,nav,.hero .outline,.hero .icon,.trending,.hero-arrows button,.sourcebar,.liquid-control,.watch-orbit,.loading-back';
function refresh(){scheduled=false;if(typeof liquidGlass!=='function')return;
 for(const [el,handle]of surfaces)if(!el.isConnected||!el.getClientRects().length){handle.destroy();surfaces.delete(el)}
 for(const el of document.querySelectorAll(selector)){
  if(surfaces.has(el)||!el.getClientRects().length)continue;
  if(el.offsetWidth>820||el.offsetHeight>800)continue;
  surfaces.set(el,liquidGlass(el,{scale:-70,chroma:3,border:.1,mapBlur:10,blur:2,saturate:1.25,fallbackBlur:8}));
 }
}
function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(refresh)}}
const observer=new MutationObserver(records=>{if(records.some(r=>r.target.nodeType===1&&!r.target.closest('svg')))schedule()});
observer.observe(document.querySelector('.shell'),{childList:true,subtree:true});
observer.observe(document.querySelector('#player'),{attributes:true,childList:true,subtree:true,attributeFilter:['open','hidden','data-expanded']});
observer.observe(document.querySelector('#detail'),{attributes:true,childList:true,subtree:true,attributeFilter:['open']});
window.addEventListener('resize',schedule,{passive:true});window.addEventListener('pagehide',()=>{observer.disconnect();for(const h of surfaces.values())h.destroy();surfaces.clear()},{once:true});schedule();
})();
