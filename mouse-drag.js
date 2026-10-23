(()=>{
 for(const track of document.querySelectorAll('#stations,.personal-carousel')){
  let drag=null,suppressUntil=0;
  track.addEventListener('dragstart',e=>e.preventDefault());
  track.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('.star,.tiny-play,.personal-favorite')||track.scrollWidth<=track.clientWidth+2)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,left:track.scrollLeft,moved:false};OndaBrowseMotion?.stop()});
  track.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;if(!(e.buttons&1)){finish();return}const dx=e.clientX-drag.x;if(!drag.moved&&Math.abs(dx)<7)return;if(!drag.moved&&Math.abs(e.clientY-drag.y)>Math.abs(dx)){drag=null;return}if(!drag.moved){drag.moved=true;track.classList.add('mouse-dragging');track.setPointerCapture?.(e.pointerId)}e.preventDefault();track.scrollLeft=drag.left-dx});
  function finish(){if(drag?.moved)suppressUntil=Date.now()+300;drag=null;track.classList.remove('mouse-dragging')}
  track.addEventListener('pointerup',finish);track.addEventListener('pointercancel',finish);track.addEventListener('lostpointercapture',finish);window.addEventListener('blur',finish);track.addEventListener('click',e=>{if(Date.now()<suppressUntil){e.preventDefault();e.stopImmediatePropagation()}},true);
 }
})();
