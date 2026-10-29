(function(root){
'use strict';
const sandbox='allow-scripts allow-same-origin allow-presentation';
const providers=[
 {name:'ScreenScape',origin:'https://nxsha.screenscape.me',path:(id,t,s,e)=>`/embed?tmdb=${id}&type=${t}${t==='tv'?`&s=${s}&e=${e}`:''}`,params:{lan:'eng'},resume:false},
 {name:'YapGrid',origin:'https://yapgrid.com',path:(id,t,s,e)=>`/embed/${t}/${id}${t==='tv'?`/${s}/${e}`:''}`,params:{autoplay:'1',lang:'en'},resume:false},
 {name:'Braflix',origin:'https://braflix.dev',path:(id,t,s,e)=>`/embed/${t}/${id}${t==='tv'?`/${s}/${e}`:''}`,params:{autoplay:'true',primaryColor:'FFFFFF',secondaryColor:'333333',iconColor:'FFFFFF'},resume:true,events:true},
 {name:'EmbedWave',origin:'https://embedwave.cc',path:(id,t,s,e)=>`/embed/${t}/${id}${t==='tv'?`/${s}/${e}`:''}`,params:{autoplay:'1'},resume:false},
 {name:'Stellar',restricted:true,origin:'https://stellar.rip',path:(id,t,s,e)=>`/en/watch/embed/${t}/${id}${t==='tv'?`-${s}-${e}`:''}`,params:{autoPlay:'true',theme:'FFFFFF'},resume:true,events:true}
];
function get(name){return providers.find(p=>p.name===name)}
function build(name,m,s=1,e=1,position=0){const p=get(name),id=Number(m.tmdb);if(!p||!Number.isSafeInteger(id)||id<1)return null;s=Number(s);e=Number(e);if(!Number.isInteger(s)||s<1||!Number.isInteger(e)||e<1)return null;const t=m.type==='tv'?'tv':'movie';const u=new URL(p.path(id,t,s,e),p.origin);for(const [k,v]of Object.entries(p.params))u.searchParams.set(k,v);if(p.resume&&Number.isFinite(position)&&position>0)u.searchParams.set('startAt',Math.floor(position));return u.href}
root.NoirProviders={providers,get,build,sandbox};
})(typeof window==='undefined'?globalThis:window);
