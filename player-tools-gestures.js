(()=>{
 OndaI18n.register([['Desliza hacia abajo para volver al reproductor','Swipe down to return to the player','Glissez vers le bas pour revenir au lecteur']]);
 for(const id of ['syncDialog','settingsDialog']){
  const dialog=document.getElementById(id),surface=document.createElement('div'),zone=document.createElement('div');surface.className='tools-sheet-surface';zone.className='tools-swipe-zone';const handle=document.createElement('span');handle.className='tools-sheet-handle';handle.setAttribute('aria-hidden','true');const hint=document.createElement('p');hint.className='tools-swipe-hint';hint.textContent=OndaI18n.text('Desliza hacia abajo para volver al reproductor');zone.append(handle,dialog.querySelector('h2'));if(id==='syncDialog')zone.append(hint);surface.append(zone,...dialog.children);dialog.append(surface);let drag=null;
  function reset(){drag=null;surface.style.transform='';surface.classList.remove('is-dragging')}
  function dismiss(){reset();dialog.close()}
  zone.addEventListener('pointerdown',e=>{if(e.button!==0||e.isPrimary===false)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,pull:0};zone.setPointerCapture?.(e.pointerId)});
  zone.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>12){reset();return}if(dy>6){e.preventDefault();drag.pull=dy;surface.classList.add('is-dragging');surface.style.transform='translateY('+Math.min(dy,350)+'px)'}});
  zone.addEventListener('pointerup',e=>{if(!drag||drag.id!==e.pointerId)return;drag.pull>65?dismiss():reset()});zone.addEventListener('pointercancel',reset);zone.addEventListener('lostpointercapture',reset);dialog.addEventListener('close',reset);dialog.addEventListener('cancel',e=>{e.preventDefault();dismiss()});
 }
})();
