const assert=require('node:assert/strict');require('../dist/themes.js');const themes=globalThis.NoirThemes;
for(const rgb of [[0,0,0],[255,255,255],[230,30,60],[30,140,210],[-20,800,NaN]]){
 const p=themes.palette(rgb);assert.ok(p.accent.every(v=>v>=102&&v<=255));assert.ok(p.surface.every(v=>v>=4&&v<=19));
 const lum=c=>{const vals=c.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});return vals[0]*.2126+vals[1]*.7152+vals[2]*.0722};assert.ok((lum(p.accent)+.05)/(lum(p.surface)+.05)>3);
}
assert.equal(themes.mood({genres:['Mystery']}).kind,'noir');assert.equal(themes.mood({genres:['Animation']}).kind,'electric');assert.equal(themes.mood({genres:['Science Fiction']}).kind,'cosmic');
assert.equal(themes.dominant(new Uint8ClampedArray([0,0,0,255,255,255,255,255])),null);
assert.deepEqual(themes.dominant(new Uint8ClampedArray([210,40,70,255,200,45,65,255])),[205,43,68]);
console.log('Palette contrast, genre mood and artwork sampling checks passed.');
