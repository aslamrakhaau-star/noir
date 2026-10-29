(()=>{
let timer,revealTimer;const $=s=>document.querySelector(s);function clear(){clearTimeout(timer);clearTimeout(revealTimer)}
function step(n,text){$('#cinemaLoading').dataset.step=String(n);$('#loadingStatus').textContent=text}
function show(m){clear();$('#loadingArtwork').src=m.background||m.poster||'';$('#loadingTitle').textContent=m.name;$('#loadingEpisode').textContent=m.type==='tv'?'Preparing episode':'Movie';$('#cinemaLoading').hidden=false;$('#loadingRecovery').hidden=true;step(0,'Preparing your title');timer=setTimeout(()=>{if(!$('#cinemaLoading').hidden){$('#loadingRecovery').hidden=false;$('#loadingStatus').textContent='This source is taking longer than usual.'}},18000)}
function opening(name){step(1,'Opening '+name)}
function opened(){step(2,'Opening player');revealTimer=setTimeout(hide,900)}
function hide(){clear();$('#cinemaLoading').hidden=true}
function fail(message){clear();$('#loadingStatus').textContent=message;$('#loadingRecovery').hidden=false}
$('#showLoadingPlayer').onclick=hide;$('#changeLoadingSource').onclick=()=>{hide();document.dispatchEvent(new CustomEvent('noir:open-sources'))};$('#cancelLoading').onclick=()=>$('#backToTitle').click();
window.NoirLoading={show,opening,opened,hide,fail};
})();
