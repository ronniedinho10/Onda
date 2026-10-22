(()=>{
 OndaI18n.register([['Emisora anterior','Previous station','Station précédente'],['Emisora siguiente','Next station','Station suivante'],['Desliza para cambiar de emisora','Swipe to change station','Balayez pour changer de station']]);
 const stage=document.querySelector('.radio-stage'),transport=stage.querySelector('.transport'),art=stage.querySelector('.record-wrap');
 const previous=document.createElement('button'),next=document.createElement('button');previous.id='previousStation';next.id='nextStation';previous.className=next.className='station-skip';previous.textContent='⏮';next.textContent='⏭';transport.prepend(previous);document.querySelector('#play').after(next);
 function list(){return OndaCatalog.sortStations(view==='favorites'?favorites:stations)}
 function change(direction){const rows=list();if(!rows.length)return;const index=rows.findIndex(s=>s.stationuuid===current?.stationuuid);const target=index<0?(direction>0?0:rows.length-1):(index+direction+rows.length)%rows.length;if(rows[target].stationuuid!==current?.stationuuid)select(rows[target])}
 previous.onclick=()=>change(-1);next.onclick=()=>change(1);
 function sync(){const rows=list(),disabled=!rows.length||(rows.length===1&&rows[0].stationuuid===current?.stationuuid);previous.disabled=next.disabled=disabled;previous.title=OndaI18n.text('Emisora anterior');next.title=OndaI18n.text('Emisora siguiente');previous.setAttribute('aria-label',previous.title);next.setAttribute('aria-label',next.title)}
 const hint=document.createElement('small');hint.className='station-swipe-hint';hint.textContent='Desliza para cambiar de emisora';art.append(hint);art.style.touchAction='pan-y';let start=null;
 art.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0)return;start={x:e.clientX,y:e.clientY,id:e.pointerId};art.setPointerCapture?.(e.pointerId)});
 art.addEventListener('pointerup',e=>{if(!start||start.id!==e.pointerId)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>=55&&Math.abs(dx)>Math.abs(dy)*1.5)change(dx<0?1:-1)});art.addEventListener('pointercancel',()=>start=null);
 new MutationObserver(sync).observe(document.querySelector('#stations'),{childList:true});document.addEventListener('onda-station-selected',sync);document.addEventListener('onda-language-changed',sync);sync();
})();
