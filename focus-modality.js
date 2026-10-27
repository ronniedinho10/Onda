(()=>{
 const root=document.documentElement;
 const setKeyboard=value=>root.classList.toggle('keyboard-navigation',value);
 document.addEventListener('keydown',event=>{if(event.metaKey||event.ctrlKey||event.altKey||event.isComposing)return;if(['Tab','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter',' '].includes(event.key)&&!event.target.closest('input,textarea,[contenteditable=true]'))setKeyboard(true);else if(event.key==='Tab')setKeyboard(true)},true);
 for(const name of ['pointerdown','touchstart','mousedown'])document.addEventListener(name,()=>setKeyboard(false),{capture:true,passive:true});
})();
