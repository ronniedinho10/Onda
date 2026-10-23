(()=>{
 const states=new WeakMap();
 function update(host,station,trackUrl=''){
  const logo=artworkUrl(station),song=artworkUrl({favicon:trackUrl}),hasSong=Boolean(song&&song!==logo),identity=station.stationuuid+'|'+logo,request=hasSong?song:logo;
  let state=states.get(host);
  if(!state||state.identity!==identity){if(state){clearTimeout(state.timer);state.token++}host.replaceChildren();host.classList.add('composite-cover');const main=document.createElement('div'),badge=document.createElement('div');main.className='composite-main';badge.className='station-icon composite-badge';badge.hidden=true;badge.setAttribute('aria-label','Emisora: '+station.name);setArtwork(badge,station,true);host.append(main,badge);state={identity,main,badge,token:0,requested:null,active:null,timer:null};states.set(host,state)}
  if(state.requested===request)return;state.requested=request;const token=++state.token;clearTimeout(state.timer);
  for(const child of [...state.main.children])if(child!==state.active)child.remove();
  function show(url,isSong){const layer=document.createElement('div');layer.className='station-icon composite-layer'+(isSong?' cover-song':'');layer.style.opacity='0';setArtwork(layer,{...station,favicon:url},true);state.main.append(layer);const image=layer.querySelector('img');let done=false;
   function ready(){if(done||state.token!==token||states.get(host)!==state)return;done=true;const old=state.active;state.active=layer;state.badge.hidden=!isSong;host.dataset.coverType=isSong?'song':'station';void layer.offsetWidth;layer.style.opacity='1';const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced||!old){for(const child of [...state.main.children])if(child!==layer)child.remove()}else state.timer=setTimeout(()=>{if(state.token===token)for(const child of [...state.main.children])if(child!==layer)child.remove()},360)}
   if(image){if(isSong)image.alt='Carátula de la canción';image.addEventListener('load',ready,{once:true});image.addEventListener('error',()=>{if(state.token!==token)return;if(isSong){done=true;layer.remove();show(logo,false)}else ready()},{once:true});if(image.complete&&image.naturalWidth)ready()}else ready();
  }
  if(!state.active&&hasSong){const base=document.createElement('div');base.className='station-icon composite-layer';setArtwork(base,station,true);state.main.append(base);state.active=base}
  show(request,hasSong);
 }
 globalThis.OndaArtwork={update};
})();
