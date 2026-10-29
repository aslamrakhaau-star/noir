const assert=require('node:assert/strict');require('../dist/providers.js');const p=globalThis.NoirProviders;
assert.equal(p.providers.length,5);
for(const name of ['EmbedWave','Stellar','Braflix','ScreenScape','YapGrid']){
 const movie=new URL(p.build(name,{tmdb:157336,type:'movie'}));assert.equal(movie.origin,p.get(name).origin);assert.ok(movie.href.includes('157336'));
 const episode=new URL(p.build(name,{tmdb:1396,type:'tv'},2,3));assert.ok(episode.href.includes('1396'));if(name==='ScreenScape'){assert.equal(episode.searchParams.get('s'),'2');assert.equal(episode.searchParams.get('e'),'3')}else assert.ok(episode.pathname.endsWith(name==='Stellar'?'-2-3':'/2/3'));
 assert.equal(p.build(name,{tmdb:0}),null);assert.equal(p.build(name,{tmdb:157336,type:'tv'},-1,3),null);
}
for(const permission of ['allow-popups','allow-top-navigation','allow-top-navigation-by-user-activation','allow-popups-to-escape-sandbox','allow-forms'])assert.ok(!p.sandbox.split(' ').includes(permission));
assert.equal(new URL(p.build('Braflix',{tmdb:157336},1,1,103.6)).searchParams.get('startAt'),'103');
console.log('Provider URL, TV episode, resume and sandbox policy checks passed.');
