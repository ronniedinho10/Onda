(()=>{
 const stage=document.querySelector('.radio-stage'),section=document.querySelector('.expanded-player-section');
 const dialog=document.createElement('dialog');dialog.id='expandedPlayer';dialog.setAttribute('aria-label','Reproductor');dialog.innerHTML='<div class="player-sheet-header"><button class="player-collapse" aria-label="Minimizar reproductor"><span aria-hidden="true"></span></button><span class="expanded-heading">Reproductor</span></div><div class="player-sheet-content"></div>';const content=dialog.querySelector('.player-sheet-content'),handle=dialog.querySelector('.player-collapse');const surface=document.createElement('div');surface.className='player-sheet-surface';surface.append(...dialog.children);dialog.append(surface);content.append(stage);document.body.append(dialog);section.remove();
 let drag=null;
 const reset=()=>{surface.style.transform='';dialog.classList.remove('is-pulling-down')};
 function cleanup(){drag=null;reset();document.body.classList.remove('player-expanded')}
 function close(){if(!dialog.open)return;cleanup();dialog.close();document.querySelector('#miniPlayer').animate?.([{opacity:.65},{opacity:1}],{duration:180});}

 function open(){if(!current||dialog.open)return;cleanup();content.scrollTop=0;dialog.showModal();document.body.classList.add('player-expanded')}
 handle.onclick=close;dialog.addEventListener('cancel',e=>{e.preventDefault();close()});dialog.addEventListener('close',()=>{cleanup();document.querySelector('.mini-open').focus()});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}});
 document.addEventListener('onda-open-player',open);document.querySelector('#miniPlayer').addEventListener('click',e=>{if(!e.target.closest('button,input,label'))open()});
 stage.querySelector('.stage-kicker').hidden=true;stage.querySelector('.record-wrap').style.touchAction='none';
 dialog.addEventListener('pointerdown',e=>{const onHandle=Boolean(e.target.closest('.player-sheet-header'));if(!e.isPrimary||e.button!==0||(!onHandle&&e.target.closest('button,input,select,a,label,.player-actions')))return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,locked:false,scroll:content.scrollTop,onHandle}});
 dialog.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(!drag.locked&&Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)){drag=null;return}if(Math.abs(dy)>10&&Math.abs(dy)>Math.abs(dx)*1.4){e.preventDefault();drag.locked=true;const pull=drag.onHandle?Math.max(0,dy):Math.max(0,dy-drag.scroll);if(!drag.onHandle)content.scrollTop=Math.max(0,drag.scroll-dy);drag.pull=pull;dialog.classList.toggle('is-pulling-down',pull>0);surface.style.transform='translateY('+Math.min(pull,500)+'px)'}});

 window.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.id)return;const dismiss=drag.locked&&drag.pull>70;drag=null;if(dismiss)close();else reset()},true);
 for(const event of ['pointercancel','lostpointercapture'])dialog.addEventListener(event,()=>{if(!drag)return;drag=null;reset()});

})();
