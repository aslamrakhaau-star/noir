(function(root){
'use strict';const cache=new Map(),inflight=new Map();
function text(value){return String(value||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim()}
function normalize(items,source='cinemeta'){
 const result=new Map();for(const x of items||[]){const season=Number(x.season),episode=Number(x.episode??x.number);if(!Number.isInteger(season)||season<1||!Number.isInteger(episode)||episode<1)continue;
 const date=x.airdate||x.released||x.firstAired||'',runtime=Number(x.runtime);const item={season,episode,name:text(x.name||x.title)||`Episode ${episode}`,description:text(x.description||x.overview||x.summary),image:x.thumbnail||x.image?.medium||x.image?.original||'',date:date?String(date).slice(0,10):'',runtime:Number.isFinite(runtime)&&runtime>0?Math.round(runtime):null,source};result.set(`${season}:${episode}`,item)}return [...result.values()].sort((a,b)=>a.season-b.season||a.episode-b.episode)
}
function merge(base,extra){const map=new Map(base.map(e=>[`${e.season}:${e.episode}`,e]));for(const e of extra){const old=map.get(`${e.season}:${e.episode}`)||{};map.set(`${e.season}:${e.episode}`,{...old,...e,image:e.image||old.image||'',description:e.description||old.description||'',date:e.date||old.date||'',runtime:e.runtime||old.runtime||null})}return [...map.values()].sort((a,b)=>a.season-b.season||a.episode-b.episode)}
function seasons(episodes){return [...new Set(episodes.map(e=>e.season))].sort((a,b)=>a-b)}
function available(e,now=Date.now()){return !e.date||new Date(e.date+'T00:00:00Z').getTime()<=now}
function adjacent(episodes,season,episode,direction){const list=episodes.filter(e=>available(e)),i=list.findIndex(e=>e.season===Number(season)&&e.episode===Number(episode));return i<0?null:list[i+direction]||null}
async function fetchJSON(url){const r=await fetch(url,{signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('Episode information unavailable');return r.json()}
function notify(id){if(typeof document!=='undefined')document.dispatchEvent(new CustomEvent('noir:episodes-updated',{detail:{id}}))}
async function enrich(m){try{if(!/^tt\d+$/.test(m.id))return;const show=await fetchJSON('https://api.tvmaze.com/lookup/shows?imdb='+encodeURIComponent(m.id));if(!Number.isInteger(show.id))return;const rows=await fetchJSON(`https://api.tvmaze.com/shows/${show.id}/episodes`);const old=cache.get(m.id);if(!old)return;cache.set(m.id,{...old,episodes:merge(old.episodes,normalize(rows,'tvmaze')),attribution:show.url?.startsWith('https://www.tvmaze.com/')?show.url:'https://www.tvmaze.com/'});notify(m.id)}catch{/* Existing Cinemeta information remains usable. */}}
async function load(m){if(cache.has(m.id))return cache.get(m.id);if(inflight.has(m.id))return inflight.get(m.id);const job=(async()=>{let meta=m;if(!Array.isArray(meta.videos)||!meta.videos.length){const d=await fetchJSON(`https://v3-cinemeta.strem.io/meta/series/${encodeURIComponent(m.id)}.json`);meta={...m,...d.meta}}
 const result={episodes:normalize(meta.videos||[]),meta,attribution:null};cache.set(m.id,result);void enrich(m);return result;})();inflight.set(m.id,job);try{return await job}finally{inflight.delete(m.id)}}
root.NoirEpisodes={normalize,merge,seasons,available,adjacent,load,get:id=>cache.get(id)};
})(typeof window==='undefined'?globalThis:window);
