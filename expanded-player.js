(()=>{
 const stage=document.querySelector('.radio-stage'),section=document.querySelector('.expanded-player-section');
 const dialog=document.createElement('dialog');dialog.id='expandedPlayer';dialog.setAttribute('aria-label','Reproductor');dialog.innerHTML='<div class="player-sheet-header"><button class="player-collapse" aria-label="Minimizar reproductor"><span aria-hidden="true"></span></button></div><div class="player-sheet-content"></div>';const content=dialog.querySelector('.player-sheet-content'),handle=dialog.querySelector('.player-collapse');const surface=document.createElement('div');surface.className='player-sheet-surface';surface.append(...dialog.children);dialog.append(surface);content.append(stage);document.body.append(dialog);section.remove();
 let drag=null,suppressClickUntil=0,entrance=[];
 const reducedMotion=matchMedia('(prefers-reduced-motion:reduce)');
 function stopEntrance(){for(const animation of entrance)animation.cancel();entrance=[]}
 function animateEntrance(){
  if(reducedMotion.matches||!surface.animate)return;
  entrance.push(surface.animate([{transform:'translateY(100%)',opacity:.7},{transform:'translateY(0)',opacity:1}],{duration:360,easing:'cubic-bezier(.2,.8,.2,1)'}));
  const art=stage.querySelector('.record-wrap');if(art?.animate)entrance.push(art.animate([{opacity:.4,transform:'scale(.94)'},{opacity:1,transform:'scale(1)'}],{duration:400,easing:'cubic-bezier(.2,.8,.2,1)'}));
 }
 reducedMotion.addEventListener?.('change',()=>{if(reducedMotion.matches)stopEntrance()});
 const reset=()=>{surface.style.transform='';dialog.classList.remove('is-pulling-down')};
 function cleanup(){stopEntrance();drag=null;reset();document.body.classList.remove('player-expanded')}
 function close(){if(!dialog.open)return;cleanup();dialog.close();if(!reducedMotion.matches)document.querySelector('#miniPlayer').animate?.([{opacity:.65},{opacity:1}],{duration:180});}

 function open(){if(!current||dialog.open)return;cleanup();content.scrollTop=0;dialog.showModal();document.body.classList.add('player-expanded');animateEntrance()}
 handle.onclick=close;dialog.addEventListener('cancel',e=>{e.preventDefault();close()});dialog.addEventListener('close',()=>{cleanup();document.querySelector('.mini-open').focus({preventScroll:true})});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}});
 document.addEventListener('onda-open-player',open);document.querySelector('#miniPlayer').addEventListener('click',e=>{if(!e.target.closest('button,input,label'))open()});
 stage.querySelector('.stage-kicker').hidden=true;stage.querySelector('.record-wrap').style.touchAction='none';
 dialog.addEventListener('pointerdown',e=>{if(e.isPrimary===false||e.button!==0||e.target.closest('input,select,textarea'))return;stopEntrance();drag={id:e.pointerId,x:e.clientX,y:e.clientY,locked:false,pull:0};},true);
 dialog.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)>14&&Math.abs(dx)>Math.abs(dy)){drag=null;reset();return}if(dy>18&&dy>Math.abs(dx)*1.7){e.preventDefault();if(!drag.locked)dialog.setPointerCapture?.(e.pointerId);drag.locked=true;drag.pull=dy;dialog.classList.add('is-pulling-down');surface.style.transform='translateY('+Math.min(dy*.8,400)+'px)'}},true);
 window.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.id)return;const dismiss=drag.locked&&drag.pull>70;if(drag.locked)suppressClickUntil=Date.now()+300;drag=null;if(dismiss)close();else reset()},true);
 dialog.addEventListener('click',e=>{if(Date.now()<suppressClickUntil){e.preventDefault();e.stopImmediatePropagation()}},true);
 for(const event of ['pointercancel','lostpointercapture'])dialog.addEventListener(event,e=>{if(event==='lostpointercapture'&&e.target!==dialog)return;if(!drag)return;drag=null;reset()});

})();
