/* Artwork-only barrel refraction. Foreground typography and controls never enter the filter. */
(()=>{
'use strict';let ready=false;
function prepare(){if(ready)return;ready=true;
 const canvas=document.createElement('canvas');canvas.width=canvas.height=160;const ctx=canvas.getContext('2d');const map=ctx.createImageData(160,160);
 for(let y=0;y<160;y++)for(let x=0;x<160;x++){const dx=(x/159-.5)*2,dy=(y/159-.5)*2;const bend=Math.pow(Math.max(0,(Math.hypot(dx,dy)/Math.SQRT2-.66)/.34),3);const i=(y*160+x)*4;map.data[i]=128+dx*bend*115;map.data[i+1]=128+dy*bend*115;map.data[i+2]=128;map.data[i+3]=255}
 ctx.putImageData(map,0,0);const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('width','0');svg.setAttribute('height','0');svg.setAttribute('aria-hidden','true');svg.style.position='absolute';
 svg.innerHTML=`<defs><filter id="noir-corner-lens" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB"><feImage href="${canvas.toDataURL()}" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="lensMap"/><feDisplacementMap in="SourceGraphic" in2="lensMap" scale="-32" xChannelSelector="R" yChannelSelector="G" result="redWarp"/><feDisplacementMap in="SourceGraphic" in2="lensMap" scale="-29" xChannelSelector="R" yChannelSelector="G" result="greenWarp"/><feDisplacementMap in="SourceGraphic" in2="lensMap" scale="-26" xChannelSelector="R" yChannelSelector="G" result="blueWarp"/><feColorMatrix in="redWarp" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red"/><feColorMatrix in="greenWarp" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green"/><feColorMatrix in="blueWarp" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue"/><feBlend in="red" in2="green" mode="screen" result="rg"/><feBlend in="rg" in2="blue" mode="screen"/></filter></defs>`;document.body.append(svg);
}
function mount(scene){if(!scene)return;prepare();const artwork=scene.querySelector('.title-art');if(!artwork)return;artwork.classList.add('refracted-art');const glint=document.createElement('div');glint.className='corner-prism';glint.setAttribute('aria-hidden','true');scene.insertBefore(glint,scene.querySelector('.title-nav'));}
window.NoirLens={mount};
})();
