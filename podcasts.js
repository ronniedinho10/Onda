(()=>{
 const downloads=globalThis.OndaPodcastDownloads;
 const isAndroid=Boolean(window.Capacitor?.isNativePlatform?.());
 const catalog=globalThis.OndaPodcastCatalog;if(!catalog)return;
 const $=s=>document.querySelector(s),tr=s=>OndaI18n.text(s),native=window.Capacitor?.Plugins?.OndaAndroid;
 OndaI18n.register([
 ['Temas en el vídeo original','Topics in the original video','Sujets dans la vidéo originale'],['Ver transcripción de la fuente','View source transcript','Voir la transcription source'],['Seguir escuchando','Continue listening','Continuer l’écoute'],['Desde el principio','Start from the beginning','Reprendre depuis le début'],['Guardar en el dispositivo','Save to device','Enregistrer sur l’appareil'],['No se pudo exportar la descarga.','Could not export the download.','Impossible d’exporter le téléchargement.'],['Transcripción','Transcript','Transcription'],['Cargando transcripción…','Loading transcript…','Chargement de la transcription…'],['No se pudo cargar la transcripción.','Could not load the transcript.','Impossible de charger la transcription.'],['Buscar en la transcripción','Search the transcript','Rechercher dans la transcription'],['Episodios encontrados','Matching episodes','Épisodes trouvés'],['Ver programa','View show','Voir le podcast'],['Guardar podcast en favoritos','Save podcast to favorites','Ajouter le podcast aux favoris'],['Quitar podcast de favoritos','Remove podcast from favorites','Retirer le podcast des favoris'],['Biblioteca','Library','Bibliothèque'],['Descargas','Downloads','Téléchargements'],['Aún no tienes episodios descargados','No downloaded episodes yet','Aucun épisode téléchargé'],['Buscar en este podcast','Search this podcast','Rechercher dans ce podcast'],['Sin episodios para esta búsqueda','No episodes match this search','Aucun épisode ne correspond'],['Descargar','Download','Télécharger'],['Eliminar descarga','Remove download','Supprimer le téléchargement'],['Descargando…','Downloading…','Téléchargement…'],['No se pudo guardar el episodio para escucharlo sin conexión.','Could not save this episode for offline listening.','Impossible de télécharger cet épisode pour l’écoute hors ligne.'],['Categoría','Category','Catégorie'],['Todas las categorías','All categories','Toutes les catégories'],['Radio','Radio','Radio'],['Podcasts','Podcasts','Podcasts'],['Populares en','Popular in','Populaires en'],['Busca un podcast','Find a podcast','Rechercher un podcast'],['Actualizar','Refresh','Actualiser'],['Volver a podcasts','Back to podcasts','Retour aux podcasts'],['Episodios','Episodes','Épisodes'],['Más podcasts','More podcasts','Plus de podcasts'],['Más episodios','More episodes','Plus d’épisodes'],['Escuchar episodio','Play episode','Écouter l’épisode'],['Pausar episodio','Pause episode','Mettre en pause'],['Reanudar episodio','Resume episode','Reprendre l’épisode'],['Retroceder 15 segundos','Back 15 seconds','Reculer de 15 secondes'],['Avanzar 15 segundos','Forward 15 seconds','Avancer de 15 secondes'],['Posición del episodio','Episode position','Position dans l’épisode'],['Velocidad','Speed','Vitesse'],['Elige un país para ver sus podcasts populares.','Choose a country to see its popular podcasts.','Choisissez un pays pour voir ses podcasts populaires.'],['No hay podcasts disponibles para esta búsqueda.','No podcasts match this search.','Aucun podcast ne correspond à cette recherche.'],['No se pudo actualizar. Mostramos la última versión guardada.','Could not refresh. Showing the last saved version.','Actualisation impossible. Affichage de la dernière version enregistrée.'],['No se pudieron obtener los podcasts de este país. Puedes cambiar de país o volver a intentarlo.','Could not get podcasts for this country. Choose another country or try again.','Impossible d’obtenir les podcasts de ce pays. Changez de pays ou réessayez.'],['No se pudieron obtener los episodios. Vuelve a intentarlo.','Could not get episodes. Please try again.','Impossible d’obtenir les épisodes. Réessayez.'],['No hay episodios de audio disponibles.','No audio episodes are available.','Aucun épisode audio disponible.'],['No se pudo reproducir este episodio. Pulsa reproducir para reintentarlo.','Could not play this episode. Press play to retry.','Impossible de lire cet épisode. Appuyez sur lecture pour réessayer.'],['Resultados de búsqueda','Search results','Résultats de recherche'],['Última comprobación','Last checked','Dernière vérification'],['Episodios del programa','Publisher episodes','Épisodes du programme'],['Abrir fuente del episodio','Open episode source','Ouvrir la source de l’épisode'],['Actualizando…','Refreshing…','Actualisation…'],['Cargando episodios…','Fetching episodes…','Recherche des épisodes…'],['Cargando podcasts…','Fetching podcasts…','Recherche des podcasts…'],['El episodio se ha detenido por inactividad. Pulsa reproducir para continuar.','The episode stopped after inactivity. Press play to continue.','L’épisode a été arrêté après une période d’inactivité. Appuyez sur lecture pour continuer.']
 ]);
 const tabs=document.createElement('div');tabs.id='mediaModes';tabs.setAttribute('role','group');tabs.setAttribute('aria-label','Radio y podcasts');tabs.innerHTML='<button type="button" id="radioMode" aria-pressed="true">Radio</button><button type="button" id="podcastMode" aria-pressed="false">Podcasts</button>';$('.country-picker').after(tabs);
 const page=document.createElement('section');page.id='podcastPage';page.hidden=true;page.innerHTML='<div class="podcast-heading"><h1 id="podcastHeading"></h1><button type="button" id="podcastRefresh" class="view-all"></button></div><div class="podcast-tools"><label class="visually-hidden" for="podcastCategory">Categoría</label><select id="podcastCategory"></select><label class="podcast-search"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/></svg><input id="podcastSearch" type="search" autocomplete="off" maxlength="120"></label></div><section id="podcastDownloads" hidden><div></div><p id="podcastExportStatus" role="status"></p></section><p id="podcastSource" class="podcast-source"></p><p id="podcastStatus" role="status"></p><section id="podcastEpisodeMatches" hidden><h2></h2><div></div></section><div id="podcastGrid" class="podcast-grid"></div><button id="podcastMore" class="view-all" type="button" hidden></button><section id="podcastDetail" hidden><button type="button" id="podcastBack" class="view-all"></button><div class="podcast-program"><div id="podcastProgramArt" class="podcast-art"></div><div><div class="podcast-program-title"><h2 id="podcastProgramTitle"></h2><button id="podcastProgramFavorite" type="button"></button></div><p id="podcastProgramAuthor"></p><p id="podcastProgramDescription"></p></div></div><section id="podcastPlayer" hidden><div class="podcast-playing-copy"><strong id="podcastPlayingTitle"></strong><p id="podcastPlaybackStatus" role="status"></p></div><div class="podcast-seek-row"><span id="podcastElapsed">0:00</span><input id="podcastSeek" type="range" min="0" max="1" value="0" step="1" disabled><span id="podcastDuration">0:00</span></div><div class="podcast-transport"><button id="podcastRewind" type="button">↶<small>15</small></button><button id="podcastPlay" type="button" class="podcast-play"></button><button id="podcastForward" type="button">↷<small>15</small></button><div class="podcast-speed-control"><button id="podcastSpeed" type="button" aria-controls="podcastSpeedPanel" aria-expanded="false">1×</button><div id="podcastSpeedPanel" hidden><h3 id="podcastSpeedLabel"></h3><div id="podcastSpeedOptions" role="group" aria-labelledby="podcastSpeedLabel"></div></div></div></div><details id="podcastTranscript" hidden><summary></summary><input type="search" maxlength="120" class="podcast-episode-search"><p role="status"></p><div class="podcast-transcript-lines"></div></details><details id="podcastVideoTopics" hidden><summary></summary><div class="podcast-video-topics"></div><a target="_blank" rel="noopener noreferrer"></a></details></section><h3 id="podcastEpisodesHeading"></h3><input id="podcastEpisodeSearch" class="podcast-episode-search" type="search" autocomplete="off" maxlength="120"><p id="podcastEpisodeSearchStatus" role="status"></p><p id="podcastDownloadStatus" role="status"></p><p id="podcastEpisodesStatus" role="status"></p><div id="podcastEpisodes"></div><button id="podcastEpisodesMore" class="view-all" type="button" hidden></button></section>';
 tabs.after(page);
 const mini=document.createElement('section');mini.id='podcastMini';mini.hidden=true;mini.setAttribute('aria-label','Podcast');mini.innerHTML='<button type="button" class="podcast-mini-open"><div class="podcast-art"></div><span><strong></strong><small></small></span></button><button type="button" class="podcast-mini-play podcast-play"></button>';document.body.append(mini);
 const podcastAudio=document.createElement('audio');podcastAudio.id='podcastAudio';podcastAudio.preload='none';document.body.append(podcastAudio);
 let resumeUntil=0,resumeTimer,libraryBackToPodcasts=false,library=false,category='',mode=false,market=$('#worldCountry').value||countryCode||'ES',program=null,programRows=[],episodeRows=[],shown=30,episodeShown=20,version=0,request=null,busy=false,searchTimer=0,poll=0,checked=0,countryQueued=false,selected=null,selectedShow=null,waiting=false,lastNative='',playVersion=0,lastSaved=0,restorePosition=0;
 const savedDownloads=new Map(), downloadPending=new Set();
 let offlineUrl='';
 downloads?.list().then(records=>{records.forEach(record=>savedDownloads.set(record.key,record));renderEpisodes();renderDownloads();}).catch(()=>{});
 let favoriteIds=new Set();
 try{
  const stored=JSON.parse(localStorage.getItem('onda-podcast-favorites')||'[]');
  if(Array.isArray(stored))favoriteIds=new Set(stored.filter(id=>typeof id==='string'));
 }catch{}
 function favoriteButton(button,entry){
  const active=favoriteIds.has(entry.id);
  button.type='button';button.className='podcast-favorite';
  button.textContent=active?'♥':'♡';
  button.setAttribute('aria-pressed',String(active));
  const label=tr(active?'Quitar podcast de favoritos':'Guardar podcast en favoritos');
  button.setAttribute('aria-label',label+' · '+entry.title);
  button.title=label;
  button.onclick=()=>{
   if(favoriteIds.has(entry.id))favoriteIds.delete(entry.id);
   else favoriteIds.add(entry.id);
   try{localStorage.setItem('onda-podcast-favorites',JSON.stringify([...favoriteIds]));}catch{}
   renderShows();
   if(program)favoriteButton($('#podcastProgramFavorite'),program);
  };
 }
 let positions={};try{const data=JSON.parse(localStorage.getItem('onda-podcast-positions')||'{}');if(data&&typeof data==='object'&&!Array.isArray(data))positions=Object.fromEntries(Object.entries(data).filter(([,r])=>r&&Number.isFinite(r.seconds)&&r.seconds>=0).slice(-100));}catch{}
 const title=()=>tr('Populares en')+' '+OndaI18n.country(market,market);
 const time=value=>{const seconds=Math.max(0,Math.floor(Number(value)||0));return seconds>=3600?Math.floor(seconds/3600)+':'+String(Math.floor(seconds/60)%60).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0'):Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');};
 for(const id of ['podcastRewind','podcastForward']){const button=document.querySelector('#'+id);button.firstChild.remove();const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.setAttribute('viewBox','0 0 24 24');icon.setAttribute('fill','none');icon.setAttribute('stroke','currentColor');icon.setAttribute('stroke-width','1.6');icon.setAttribute('stroke-linecap','round');icon.setAttribute('stroke-linejoin','round');icon.setAttribute('aria-hidden','true');const path=document.createElementNS(icon.namespaceURI,'path');path.setAttribute('d','M3 10a9 9 0 1 1 1.6 7M3 4v6h6');icon.append(path);button.prepend(icon);}
 function playIcon(paused){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',paused?'M8 5v14l11-7Z':'M6 5h4v14H6zM14 5h4v14h-4z');svg.append(path);return svg;}
 function art(host,entry){if(host.dataset.url===entry.artwork&&host.dataset.name===entry.title)return;host.dataset.url=entry.artwork||'';host.dataset.name=entry.title;const fallback=document.createElement('span');fallback.textContent=(entry.title||'P').slice(0,2).toLocaleUpperCase();host.replaceChildren(fallback);const value=catalog.safeUrl(entry.artwork);if(value){const image=document.createElement('img');image.src=value;image.alt='';image.loading='lazy';image.decoding='async';image.referrerPolicy='no-referrer';image.onerror=()=>image.remove();host.append(image);}}
 function labels(){renderDownloads();$('#podcastTranscript summary').textContent=tr('Transcripción');const transcriptLabel=tr('Buscar en la transcripción');$('#podcastTranscript input').placeholder=transcriptLabel;$('#podcastTranscript input').setAttribute('aria-label',transcriptLabel);const search=$('#podcastEpisodeSearch');search.placeholder=tr('Buscar en este podcast');search.setAttribute('aria-label',search.placeholder);tabs.querySelector('#radioMode').textContent=tr('Radio');tabs.querySelector('#podcastMode').textContent=tr('Podcasts');$('#podcastHeading').textContent=library?tr(isAndroid?'Biblioteca':'Descargas'):program?program.title:$('#podcastSearch').value.trim()?tr('Resultados de búsqueda'):market?title():tr('Podcasts');$('#podcastSearch').placeholder=tr('Busca un podcast');$('#podcastSearch').setAttribute('aria-label',tr('Busca un podcast'));$('#podcastRefresh').textContent=tr(busy?'Actualizando…':'Actualizar');$('#podcastMore').textContent=tr('Más podcasts');$('#podcastBack').textContent=tr('Volver a podcasts');$('#podcastEpisodesHeading').textContent=tr('Episodios');$('#podcastEpisodesMore').textContent=tr('Más episodios');$('#podcastSeek').setAttribute('aria-label',tr('Posición del episodio'));$('#podcastRewind').setAttribute('aria-label',tr('Retroceder 15 segundos'));$('#podcastForward').setAttribute('aria-label',tr('Avanzar 15 segundos'));$('#podcastSpeedLabel').textContent=tr('Velocidad');$('#podcastSpeed').setAttribute('aria-label',tr('Velocidad'));$('#podcastCategory').setAttribute('aria-label',tr('Categoría'));syncPlayer();}
 function categories(){
  const picker=$('#podcastCategory');
  const values=[...new Set(programRows.map(row=>row.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b,OndaI18n.language));
  if(!values.includes(category))category='';
  picker.replaceChildren(new Option(tr('Todas las categorías'),''),...values.map(value=>new Option(value,value)));
  picker.value=category;
 }
 function surface(){document.body.classList.toggle('podcast-library-open',mode&&library&&document.body.dataset.surface!=='map');document.title=mode?'Onda RadioFM - Podcasts':'Onda RadioFM';page.hidden=!mode||document.body.dataset.surface==='map';tabs.hidden=document.body.dataset.surface==='map'||document.body.dataset.surface==='directory'||view==='favorites';tabs.querySelector('#radioMode').setAttribute('aria-pressed',String(!mode));tabs.querySelector('#podcastMode').setAttribute('aria-pressed',String(mode));document.body.dataset.mediaMode=mode?'podcasts':'radio';if(mode&&document.body.dataset.surface!=='map'){document.body.dataset.surface='podcasts';view='all';$('#favoritesPage').hidden=true;document.body.classList.remove('favorites-page-open');}schedule();}
 function schedule(){clearInterval(poll);poll=0;if(mode&&!library&&!document.hidden&&!page.hidden)poll=setInterval(()=>{if(!busy&&Date.now()-checked>=300000)refresh(true);},300000);}
 function status(message){$('#podcastStatus').textContent=tr(message);}
 function source(result){const node=$('#podcastSource');node.replaceChildren();if(!market)return;if(result?.time){const checkedText=document.createElement('span');checkedText.textContent=tr('Última comprobación')+' '+new Date(result.time).toLocaleTimeString(OndaI18n.language,{hour:'2-digit',minute:'2-digit'});node.append(checkedText);}if(result?.stale)status('No se pudo actualizar. Mostramos la última versión guardada.');}
 function card(entry){const article=document.createElement('article');article.className='podcast-card';article.dataset.id=entry.id;const open=document.createElement('button');open.type='button';open.className='podcast-card-open';const image=document.createElement('div');image.className='podcast-art';art(image,entry);const name=document.createElement('strong');name.textContent=entry.title;const author=document.createElement('span');author.textContent=entry.author;open.append(image,name,author);open.setAttribute('aria-label',entry.title);open.onclick=()=>openProgram(entry);const favorite=document.createElement('button');favoriteButton(favorite,entry);article.append(open,favorite);return article;}
 function renderShows(){categories();const visible=category?programRows.filter(row=>row.category===category):programRows;const host=$('#podcastGrid'),rows=[...visible.filter(row=>favoriteIds.has(row.id)),...visible.filter(row=>!favoriteIds.has(row.id))].slice(0,shown),signature=JSON.stringify(rows.map(r=>[r.id,r.title,r.artwork,favoriteIds.has(r.id)]));if(host.dataset.signature!==signature){host.replaceChildren(...rows.map(card));host.dataset.signature=signature;}$('#podcastMore').hidden=shown>=(category?programRows.filter(row=>row.category===category).length:programRows.length);}
 function renderEpisodeMatches(matches=[]){
  const section=$('#podcastEpisodeMatches'),list=section.querySelector('div');
  section.hidden=!matches.length;
  section.querySelector('h2').textContent=tr('Episodios encontrados');
  list.replaceChildren();
  const query=normalize($('#podcastSearch').value);
  const ordered=[...matches].sort((a,b)=>Number(normalize(b.item.title).includes(query))-Number(normalize(a.item.title).includes(query)));
  for(const {program:show,item} of ordered){
   const article=document.createElement('article');article.className='podcast-episode';
   const play=document.createElement('button');play.type='button';play.className='podcast-episode-main';
   const title=document.createElement('strong');title.textContent=item.title;
   const author=document.createElement('small');author.textContent=show.title;
   const icon=document.createElement('span');icon.className='podcast-episode-play';icon.append(playIcon(true));
   play.append(title,author,icon);play.onclick=()=>playEpisode(item,show);
   play.setAttribute('aria-label',tr('Escuchar episodio')+' · '+item.title);
   const details=document.createElement('button');details.type='button';details.className='view-all podcast-download';
   details.textContent=tr('Ver programa');details.onclick=()=>openProgram(show);
   article.append(play,details);list.append(article);
  }
 }
 function showProgram(){if(program)$('#podcastEpisodeMatches').hidden=true;const detail=$('#podcastDetail');detail.hidden=!program;$('#podcastGrid').hidden=Boolean(program);$('#podcastMore').hidden=Boolean(program)||shown>=(category?programRows.filter(row=>row.category===category).length:programRows.length);$('.podcast-tools').hidden=Boolean(program);if(!program)return;art($('#podcastProgramArt'),program);$('#podcastProgramTitle').textContent=program.title;favoriteButton($('#podcastProgramFavorite'),program);$('#podcastProgramAuthor').textContent=program.author;$('#podcastProgramDescription').textContent=program.description||'';renderEpisodes();syncPlayer();labels();}
 const normalize=value=>(value||'').normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
 function matchingEpisodes(){
  const query=normalize($('#podcastEpisodeSearch').value);
  if(!query)return episodeRows;
  const tokens=query.split(' ');
  return episodeRows.map((row,index)=>{
   const title=normalize(row.title), description=normalize(row.description);
   const score=tokens.every(token=>title.includes(token)||description.includes(token))
    ? (title===query?200:title.includes(query)?100:0)+tokens.filter(token=>title.includes(token)).length*10+(description.includes(query)?1:0)
    : -1;
   return {row,index,score};
  }).filter(match=>match.score>=0).sort((a,b)=>b.score-a.score||a.index-b.index).map(match=>match.row);
 }
 async function exportDownload(row){
  const status=$('#podcastExportStatus');
  status.textContent='';
  try{
   const record=await downloads.get(row);
   if(!record?.blob)throw Error('Missing download');
   const type=record.blob.type.split(';')[0];
   const known={'audio/mpeg':'mp3','audio/mp3':'mp3','audio/mp4':'m4a','audio/aac':'aac','audio/ogg':'ogg','audio/opus':'opus','audio/wav':'wav','audio/webm':'webm','audio/flac':'flac'};
   const extension=known[type]||new URL(row.audio).pathname.match(/\.(mp3|m4a|aac|ogg|opus|wav|webm|flac)$/i)?.[1];
   const filename=row.title.replace(/[<>:"/\\|?*\x00-\x1f]/g,' ').trim().slice(0,120)||'Onda Podcast';
   const objectUrl=URL.createObjectURL(record.blob);
   const link=document.createElement('a');
   link.href=objectUrl;link.download=filename+(extension?'.'+extension:'');
   document.body.append(link);link.click();link.remove();
   setTimeout(()=>URL.revokeObjectURL(objectUrl),60000);
  }catch{status.textContent=tr('No se pudo exportar la descarga.');}
 }
 function renderDownloads(){
  const panel=$('#podcastDownloads');
  panel.hidden=!downloads||!library;
  const list=panel.querySelector('div');
  const signature=JSON.stringify([OndaI18n.language,[...savedDownloads.keys()],[...downloadPending]]);
  if(list.dataset.signature===signature)return;
  list.dataset.signature=signature;
  list.replaceChildren();
  if(!savedDownloads.size){list.textContent=tr('Aún no tienes episodios descargados');return;}
  for(const {key,row,show} of savedDownloads.values()){
   const item=document.createElement('div'), play=document.createElement('button'), remove=document.createElement('button');
   play.type=remove.type='button';
   play.className=remove.className='view-all';
   play.textContent=show.title+' · '+row.title;
   play.onclick=()=>playEpisode(row,show);
   remove.textContent=tr('Eliminar descarga');
   remove.disabled=downloadPending.has(key);
   remove.onclick=()=>toggleDownload(row,show);
   item.append(play);
   if(!isAndroid){
    const save=document.createElement('button');save.type='button';save.className='view-all';
    save.textContent=tr('Guardar en el dispositivo');save.onclick=()=>exportDownload(row);item.append(save);
   }
   item.append(remove);list.append(item);
  }
 }
 async function toggleDownload(row,show){
  const key=downloads.key(row);
  if(downloadPending.has(key))return;
  downloadPending.add(key);
  $('#podcastDownloadStatus').textContent='';
  renderEpisodes();renderDownloads();
  try{
   if(savedDownloads.has(key)){await downloads.remove(row);savedDownloads.delete(key);}
   else{await downloads.save(row,show);savedDownloads.set(key,{key,row,show});}
  }catch{
   $('#podcastDownloadStatus').textContent=tr('No se pudo guardar el episodio para escucharlo sin conexión.');
  }finally{downloadPending.delete(key);renderEpisodes();renderDownloads();}
 }
 const positionKey=row=>row.showId+':'+row.id;
 function refreshEpisodeProgress(){
  for(const article of $('#podcastEpisodes').children){
   const progress=article.querySelector('progress'), actions=progress.parentElement;
   const saved=positions[article.dataset.positionKey];
   actions.hidden=Date.now()>=resumeUntil||!(saved?.seconds>0);
   progress.max=Number(saved?.duration)||Number(article.dataset.duration)||Math.max(1,(saved?.seconds||0)+1);
   progress.value=saved?.seconds||0;
   actions.querySelector('button').textContent=tr('Seguir escuchando')+' · '+time(progress.value);
   actions.querySelector('button:last-child').textContent=tr('Desde el principio');
  }
 }
 function renderEpisodes(){const host=$('#podcastEpisodes'),matches=matchingEpisodes(),rows=matches.slice(0,episodeShown),signature=JSON.stringify(rows.map(r=>[r.showId,r.id,r.audio,r.title,r.description,r.date,r.duration,downloads&&savedDownloads.has(downloads.key(r)),downloads&&downloadPending.has(downloads.key(r))]));if(host.dataset.signature!==signature){const fragment=document.createDocumentFragment();for(const row of rows){const article=document.createElement('article');article.className='podcast-episode';article.dataset.id=row.id;const button=document.createElement('button');button.className='podcast-episode-main';button.type='button';const date=document.createElement('small');date.textContent=row.date?new Date(row.date).toLocaleDateString(OndaI18n.language,{day:'numeric',month:'short',year:'numeric'}):'';const name=document.createElement('strong');name.textContent=row.title;const description=document.createElement('p');description.textContent=row.description;const length=document.createElement('small');length.textContent=row.duration?time(row.duration):'';const icon=document.createElement('span');icon.className='podcast-episode-play';icon.append(playIcon(true));button.append(date,name,description,length,icon);button.onclick=()=>playEpisode(row,program);button.setAttribute('aria-label',tr('Escuchar episodio')+' · '+row.title);article.append(button);
 const actions=document.createElement('div');actions.className='podcast-resume';actions.hidden=true;
 const progress=document.createElement('progress');progress.setAttribute('aria-label',tr('Posición del episodio'));
 const resumeButton=document.createElement('button'),restartButton=document.createElement('button');
 resumeButton.type=restartButton.type='button';resumeButton.className=restartButton.className='view-all';
 const show=program;
 resumeButton.onclick=()=>{hideResumePrompt();playEpisode(row,show,'resume');};
 restartButton.onclick=()=>{hideResumePrompt();playEpisode(row,show,'restart');};
 actions.append(progress,resumeButton,restartButton);article.append(actions);
 article.dataset.positionKey=positionKey(row);article.dataset.duration=row.duration||0;
 if(downloads){const save=document.createElement('button');const key=downloads.key(row);save.type='button';save.className='podcast-download view-all';save.disabled=downloadPending.has(key);const saved=savedDownloads.has(key);
 const label=tr(save.disabled?'Descargando…':saved?'Eliminar descarga':'Descargar');
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.setAttribute('viewBox','0 0 24 24');
 svg.setAttribute('aria-hidden','true');
 const path=document.createElementNS(svg.namespaceURI,'path');
 path.setAttribute('d',saved?'m5 12 4 4L19 6':'M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4');
 svg.append(path);
 save.append(svg,document.createTextNode(label));save.onclick=()=>toggleDownload(row,program);article.append(save);}fragment.append(article);}host.replaceChildren(fragment);host.dataset.signature=signature;}for(const row of host.children){const playing=selected&&row.dataset.id===selected.id;row.classList.toggle('is-playing',Boolean(playing));if(playing)row.setAttribute('aria-current','true');else row.removeAttribute('aria-current');}refreshEpisodeProgress();$('#podcastEpisodesMore').hidden=episodeShown>=matches.length;$('#podcastEpisodeSearchStatus').textContent=$('#podcastEpisodeSearch').value.trim()&&episodeRows.length&&!matches.length?tr('Sin episodios para esta búsqueda'):'';}
 function cancel(){version++;request?.abort();request=null;busy=false;$('#podcastRefresh').disabled=false;}
 async function refresh(force=false){if(!mode||library||page.hidden)return;cancel();const token=version,code=market,item=program,query=$('#podcastSearch').value.trim();if(!code){status('Elige un país para ver sus podcasts populares.');programRows=[];renderShows();source();return;}request=new AbortController();const signal=request.signal;busy=true;$('#podcastRefresh').disabled=true;page.setAttribute('aria-busy','true');labels();if(item&&!episodeRows.length)$('#podcastEpisodesStatus').textContent=tr('Cargando episodios…');else if(!item&&!programRows.length)status('Cargando podcasts…');try{const result=item?await catalog.episodes(item,code,{signal,force}):query.length>=2?await catalog.search(code,query,{signal,force}):await catalog.chart(code,{signal,force});if(token!==version||!mode||code!==market||item?.id!==program?.id)return;checked=Date.now();status('');source(result);if(item){program=result.show||program;episodeRows=result.rows;$('#podcastEpisodesStatus').textContent=result.stale?tr('No se pudo actualizar. Mostramos la última versión guardada.'):episodeRows.length?'':tr('No hay episodios de audio disponibles.');showProgram();}else{programRows=result.rows;renderShows();renderEpisodeMatches(result.matches);if(!programRows.length&&!result.matches?.length)status('No hay podcasts disponibles para esta búsqueda.');}}catch(error){if(token!==version||error.name==='AbortError')return;if(item)$('#podcastEpisodesStatus').textContent=tr('No se pudieron obtener los episodios. Vuelve a intentarlo.');else status('No se pudieron obtener los podcasts de este país. Puedes cambiar de país o volver a intentarlo.');}finally{if(token===version){busy=false;$('#podcastRefresh').disabled=false;page.setAttribute('aria-busy','false');labels();}}}
 function open(){library=false;globalThis.OndaLibraryView?.close();loadController?.abort();loadVersion++;$('#stations').setAttribute('aria-busy','false');mode=true;syncCountry();surface();if(!programRows.length&&!program){const cached=market&&catalog.peekChart(market);if(cached){programRows=cached.rows;renderShows();source(cached);}}showProgram();labels();refresh();}
 function openLibrary(){
  if(!library)libraryBackToPodcasts=mode;
  hideResumePrompt();
  globalThis.OndaLibraryView?.close();
  if(document.body.dataset.surface==='map')$('#closeMap').click();
  cancel();clearTimeout(searchTimer);library=true;mode=true;

  surface();labels();document.dispatchEvent(new Event('onda-media-mode-changed'));
  window.scrollTo({top:0,behavior:'instant'});
 }
 function close(reload=false){hideResumePrompt();library=false;mode=false;cancel();clearTimeout(searchTimer);if(document.body.dataset.surface==='podcasts')document.body.dataset.surface='browse';surface();document.dispatchEvent(new Event('onda-media-mode-changed'));if(reload&&view!=='favorites')load();}
 function syncCountry(){
  const code=$('#worldCountry').value;
  if(code===market)return false;
  cancel();market=code;program=null;programRows=[];episodeRows=[];category='';shown=30;
  clearTimeout(searchTimer);$('#podcastSearch').value='';renderEpisodeMatches();status('');
  const cached=market&&catalog.peekChart(market);
  if(cached)programRows=cached.rows;
  source(cached);renderShows();showProgram();labels();
  return true;
 }
 function countryChanged(){
  if(library||!mode||countryQueued)return;
  countryQueued=true;
  queueMicrotask(()=>{countryQueued=false;if(!mode)return;const changed=syncCountry();surface();if(changed)refresh();});
 }
 function hideResumePrompt(){
  clearTimeout(resumeTimer);resumeUntil=0;refreshEpisodeProgress();
 }
 function showResumePrompt(){
  clearTimeout(resumeTimer);resumeUntil=Date.now()+7000;
  resumeTimer=setTimeout(hideResumePrompt,7000);
 }
 async function openProgram(item){cancel();showResumePrompt();if(program?.id!==item.id)$('#podcastEpisodeSearch').value='';program=item;episodeRows=[];episodeShown=20;status('');const saved=catalog.peekEpisodes(item,market);if(saved){program=saved.show||item;episodeRows=saved.rows;source(saved);}showProgram();refresh();}
 function savePosition(){if(!selected)return;const seconds=Number(podcastAudio.currentTime)||0,duration=Number(podcastAudio.duration)||selected.duration||0;positions[selected.showId+':'+selected.id]={seconds:duration&&seconds>=duration-15?0:seconds,duration,last:Date.now()};positions=Object.fromEntries(Object.entries(positions).sort((a,b)=>a[1].last-b[1].last).slice(-100));try{localStorage.setItem('onda-podcast-positions',JSON.stringify(positions));}catch{}lastSaved=Date.now();refreshEpisodeProgress();}
 function metadata(){if(!selected)return;if('mediaSession' in navigator&&'MediaMetadata' in window){navigator.mediaSession.metadata=new MediaMetadata({title:selected.title,artist:selectedShow.title,album:'Onda Podcasts',artwork:selected.artwork?[{src:selected.artwork}]:[]});navigator.mediaSession.playbackState=podcastAudio.paused?'paused':'playing';const handlers={play:()=>resume(),pause:()=>podcastAudio.pause(),seekbackward:event=>seek(-Math.max(1,event.seekOffset||15)),seekforward:event=>seek(Math.max(1,event.seekOffset||15)),seekto:event=>{if(Number.isFinite(event.seekTime)&&Number.isFinite(podcastAudio.duration))podcastAudio.currentTime=Math.min(podcastAudio.duration,Math.max(0,event.seekTime));},previoustrack:()=>seek(-15),nexttrack:()=>seek(15),stop:()=>stopPlayback()};for(const [action,handler] of Object.entries(handlers))try{navigator.mediaSession.setActionHandler(action,handler);}catch{}}}
 function nativeSync(){if(!native||!selected)return;const data={playing:!podcastAudio.paused&&!podcastAudio.error&&!waiting,station:selectedShow.title,track:selected.title,hasTrack:true,notificationMode:'song',stationId:'podcast:'+selected.showId+':'+selected.id,artwork:selected.artwork||selectedShow.artwork};const key=JSON.stringify(data);if(key===lastNative)return;lastNative=key;native.setPlayback(data).catch(()=>{lastNative='';});}
 // These timestamps refer to the linked video, never to the ad-supported audio.
 const videoTopics={
  'APO2626085968.mp3':{video:'1YlGArMx_N4',source:'feijoo',topics:[
   [0,'Introducción'],[273,'Posibles pactos de gobierno'],[1161,'Pensiones y economía'],
   [1731,'Fiscalidad y autónomos'],[2467,'Frontera de Ceuta'],[3436,'Marcial Dorado'],
   [3834,'Casos de corrupción'],[4357,'Relación con Ayuso']
  ]},
  'APO3569494233.mp3':{video:'mStOFBvToUI',source:'sanchez',topics:[
   [0,'Introducción'],[218,'Continuidad en el Gobierno'],[453,'Polarización política'],
   [844,'Gestión ferroviaria'],[1738,'Ceuta y Marruecos'],[3091,'Integración e inmigración']
  ]}
 };
 function renderVideoTopics(){
  const panel=$('#podcastVideoTopics'), list=panel.querySelector('div'), sourceLink=panel.querySelector('a');
  const audioUrl=selected?.showId==='1501968107'&&catalog.safeUrl(selected.audio);
  const media=audioUrl?new URL(audioUrl):null;
  const chapters=media?.hostname==='traffic.megaphone.fm'?videoTopics[media.pathname.slice(1)]:null;
  panel.hidden=!chapters;panel.open=false;list.replaceChildren();
  if(!chapters)return;
  panel.querySelector('summary').textContent=tr('Temas en el vídeo original');
  sourceLink.textContent=tr('Ver transcripción de la fuente');
  sourceLink.href='https://verificacion-podcast.vercel.app/'+chapters.source+'/transcripcion';
  for(const [seconds,topic] of chapters.topics){
   const link=document.createElement('a');
   link.href='https://www.youtube.com/watch?v='+chapters.video+'&t='+seconds+'s';
   link.target='_blank';link.rel='noopener noreferrer';
   link.textContent=time(seconds)+' · '+topic;
   list.append(link);
  }
 }
 const transcriptPanel=$('#podcastTranscript');
 const transcriptSearch=transcriptPanel.querySelector('input');
 const transcriptStatus=transcriptPanel.querySelector('[role=status]');
 const transcriptList=transcriptPanel.querySelector('.podcast-transcript-lines');
 let transcriptEpisode,transcriptRows=[],transcriptRequest;
 function renderTranscript(){
  const query=normalize(transcriptSearch.value);
  const rows=query?transcriptRows.filter(row=>normalize(row.text).includes(query)):transcriptRows;
  const fragment=document.createDocumentFragment();
  for(const row of rows){
   const button=document.createElement('button'),stamp=document.createElement('time'),line=document.createElement('span');
   button.type='button';stamp.textContent=time(row.start);line.textContent=row.text;
   button.append(stamp,line);
   button.onclick=()=>{
    if(!Number.isFinite(podcastAudio.duration)||row.start>=podcastAudio.duration)return;
    podcastAudio.currentTime=row.start;savePosition();syncPlayer();
   };
   fragment.append(button);
  }
  transcriptList.replaceChildren(fragment);
 }
 function updateTranscript(){
  if(transcriptEpisode===selected)return;
  transcriptRequest?.abort();transcriptEpisode=selected;renderVideoTopics();transcriptRows=[];
  transcriptPanel.open=false;transcriptPanel.hidden=!selected?.transcripts?.length;
  transcriptSearch.value='';transcriptStatus.textContent='';renderTranscript();
 }
 transcriptSearch.oninput=renderTranscript;
 transcriptPanel.addEventListener('toggle',async()=>{
  if(!transcriptPanel.open||!selected?.transcripts?.length||transcriptRows.length)return;
  transcriptRequest?.abort();
  const controller=transcriptRequest=new AbortController();
  transcriptStatus.textContent=tr('Cargando transcripción…');
  try{
   const result=await catalog.transcript(selected.transcripts,{signal:controller.signal});
   if(controller.signal.aborted)return;
   transcriptRows=result.rows;transcriptStatus.textContent='';renderTranscript();
  }catch{if(!controller.signal.aborted)transcriptStatus.textContent=tr('No se pudo cargar la transcripción.');}
 });
 function syncPlayer(){updateTranscript();const own=Boolean(selected);mini.hidden=!own;document.body.classList.toggle('podcast-playback-selected',own);if(own)document.body.classList.add('has-mini-player');$('#podcastPlayer').hidden=!(own&&program?.id===selected.showId);if(!own)return;art(mini.querySelector('.podcast-art'),selected);mini.querySelector('strong').textContent=selected.title;mini.querySelector('small').textContent=selectedShow.title;$('#podcastPlayingTitle').textContent=selected.title;const label=tr(podcastAudio.paused?'Reanudar episodio':'Pausar episodio');for(const button of [$('#podcastPlay'),mini.querySelector('.podcast-mini-play')]){const icon=podcastAudio.paused?'play':'pause';if(button.dataset.icon!==icon){button.replaceChildren(playIcon(podcastAudio.paused));button.dataset.icon=icon;}button.setAttribute('aria-label',label);}const total=Number.isFinite(podcastAudio.duration)?podcastAudio.duration:selected.duration;$('#podcastElapsed').textContent=time(podcastAudio.currentTime);$('#podcastDuration').textContent=time(total);const range=$('#podcastSeek');range.disabled=!(Number.isFinite(podcastAudio.duration)&&podcastAudio.duration>0);range.max=String(total||1);if(document.activeElement!==range)range.value=String(podcastAudio.currentTime||0);range.setAttribute('aria-valuetext',time(podcastAudio.currentTime)+' / '+time(total));syncSpeed();for(const row of $('#podcastEpisodes').children)row.classList.toggle('is-playing',row.dataset.id===selected.id);}
 async function playEpisode(row,item,action='toggle'){if(!row||!catalog.safeUrl(row.audio))return;if(selected?.id===row.id&&selected.showId===row.showId){if(action==='restart'){podcastAudio.currentTime=0;savePosition();await resume();}else if(podcastAudio.paused)await resume();else if(action==='toggle')podcastAudio.pause();return;}savePosition();playVersion++;selected=row;selectedShow={...item};waiting=false;lastNative='';if(action==='restart'){delete positions[positionKey(row)];refreshEpisodeProgress();}restorePosition=positions[positionKey(row)]?.seconds||0;playbackVersion++;globalThis.OndaStreams?.cancel();audio.pause();audio.removeAttribute('src');audio.load();podcastAudio.pause();if(offlineUrl){URL.revokeObjectURL(offlineUrl);offlineUrl='';}const token=playVersion;if(downloads&&savedDownloads.has(downloads.key(row))){const saved=await downloads.get(row).catch(()=>null);if(token!==playVersion)return;if(saved?.blob)offlineUrl=URL.createObjectURL(saved.blob);}podcastAudio.src=offlineUrl||row.audio;podcastAudio.playbackRate=1;$('#podcastPlaybackStatus').textContent='';syncPlayer();metadata();await resume();}
 async function resume(){if(!selected)return;const token=++playVersion;if(podcastAudio.error||!podcastAudio.getAttribute('src')){restorePosition=positions[selected.showId+':'+selected.id]?.seconds||0;podcastAudio.src=offlineUrl||selected.audio;}try{await podcastAudio.play();if(token!==playVersion)return;$('#podcastPlaybackStatus').textContent='';}catch{if(token===playVersion)$('#podcastPlaybackStatus').textContent=tr('No se pudo reproducir este episodio. Pulsa reproducir para reintentarlo.');}syncPlayer();nativeSync();}
 function seek(delta){if(!selected||!Number.isFinite(podcastAudio.duration))return;podcastAudio.currentTime=Math.max(0,Math.min(podcastAudio.duration,(podcastAudio.currentTime||0)+delta));savePosition();syncPlayer();}
 function stopPlayback(clear=false){playVersion++;savePosition();podcastAudio.pause();podcastAudio.removeAttribute('src');podcastAudio.load();waiting=false;if(clear){if(offlineUrl){URL.revokeObjectURL(offlineUrl);offlineUrl='';}if('mediaSession' in navigator){for(const [name,handler] of Object.entries({play:()=>$('#play').click(),pause:()=>audio.pause(),previoustrack:()=>$('#previousStation').click(),nexttrack:()=>$('#nextStation').click(),seekbackward:null,seekforward:null,seekto:null,stop:()=>{audio.pause();}}))try{navigator.mediaSession.setActionHandler(name,handler);}catch{}}selected=selectedShow=null;lastNative='';mini.hidden=true;document.body.classList.remove('podcast-playback-selected');if(!current)document.body.classList.remove('has-mini-player');}syncPlayer();}
 $('#podcastPlay').onclick=mini.querySelector('.podcast-mini-play').onclick=()=>podcastAudio.paused?resume():podcastAudio.pause();$('#podcastRewind').onclick=()=>seek(-15);$('#podcastForward').onclick=()=>seek(15);$('#podcastSeek').oninput=event=>{if(!Number.isFinite(podcastAudio.duration))return;podcastAudio.currentTime=Math.min(podcastAudio.duration,Math.max(0,Number(event.target.value)||0));syncPlayer();};$('#podcastSeek').onchange=savePosition;function setSpeedPanel(open,restoreFocus=false){
  const toggle=$('#podcastSpeed');
  $('#podcastSpeedPanel').hidden=!open;toggle.setAttribute('aria-expanded',String(open));
  if(open)$('#podcastSpeedOptions [aria-pressed="true"]')?.focus();
  else if(restoreFocus)toggle.focus();
 }
 $('#podcastSpeed').onclick=()=>{syncSpeed();setSpeedPanel($('#podcastSpeedPanel').hidden);};
 document.addEventListener('pointerdown',event=>{if(!event.target.closest('.podcast-speed-control'))setSpeedPanel(false);});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('#podcastSpeedPanel').hidden){event.preventDefault();setSpeedPanel(false,true);}});
 const speeds=[.75,1,1.25,1.5,1.75,2];
 const speedLabel=rate=>rate.toLocaleString(OndaI18n.language)+'×';
 for(const rate of speeds){
  const option=document.createElement('button');
  option.type='button';option.dataset.rate=rate;
  option.onclick=()=>{podcastAudio.playbackRate=rate;syncSpeed();setSpeedPanel(false,true);};
  $('#podcastSpeedOptions').append(option);
 }
 function syncSpeed(){
  const rate=podcastAudio.playbackRate;
  $('#podcastSpeed').textContent=speedLabel(rate);
  $('#podcastSpeed').setAttribute('aria-label',tr('Velocidad')+' · '+speedLabel(rate));
  for(const option of $('#podcastSpeedOptions').children){
   const value=Number(option.dataset.rate);
   option.textContent=speedLabel(value);
   option.setAttribute('aria-pressed',String(value===rate));
  }
 }
 podcastAudio.addEventListener('loadedmetadata',()=>{if(restorePosition&&Number.isFinite(podcastAudio.duration)){podcastAudio.currentTime=Math.max(0,Math.min(restorePosition,podcastAudio.duration-1));restorePosition=0;}syncPlayer();});for(const name of ['play','playing','pause','ended','error','waiting'])podcastAudio.addEventListener(name,()=>{waiting=name==='waiting';if(name==='error')$('#podcastPlaybackStatus').textContent=tr('No se pudo reproducir este episodio. Pulsa reproducir para reintentarlo.');if(name==='pause'||name==='ended')savePosition();syncPlayer();metadata();nativeSync();});podcastAudio.addEventListener('timeupdate',()=>{syncPlayer();if(Date.now()-lastSaved>10000)savePosition();if('mediaSession' in navigator&&navigator.mediaSession.setPositionState&&Number.isFinite(podcastAudio.duration)&&podcastAudio.duration>0)try{navigator.mediaSession.setPositionState({duration:podcastAudio.duration,playbackRate:podcastAudio.playbackRate,position:Math.min(podcastAudio.duration,podcastAudio.currentTime||0)});}catch{}});
 mini.querySelector('.podcast-mini-open').onclick=()=>{if(!selected)return;open();openProgram(selectedShow);page.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});};
 $('#radioMode').onclick=()=>close(true);$('#podcastMode').onclick=()=>{program=null;episodeRows=[];hideResumePrompt();open();};$('#podcastRefresh').onclick=()=>refresh(true);$('#podcastMore').onclick=()=>{shown+=20;renderShows();};$('#podcastEpisodesMore').onclick=()=>{episodeShown+=20;renderEpisodes();};$('#podcastBack').onclick=()=>{hideResumePrompt();cancel();program=null;episodeRows=[];$('#podcastEpisodesStatus').textContent='';showProgram();labels();refresh();};$('#podcastCategory').onchange=event=>{category=event.target.value;shown=30;renderShows();};
 $('#podcastEpisodeSearch').oninput=()=>{episodeShown=20;renderEpisodes();};
 $('#podcastSearch').oninput=()=>{clearTimeout(searchTimer);cancel();program=null;shown=30;programRows=[];renderEpisodeMatches();renderShows();showProgram();const query=$('#podcastSearch').value.trim();if(query.length===1){status('');return;}searchTimer=setTimeout(()=>refresh(),450);};$('#podcastSearch').onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();clearTimeout(searchTimer);refresh();event.target.blur();}};
 for(const button of document.querySelectorAll('[data-view]')){button.addEventListener('click',()=>close(),{capture:true});button.addEventListener('click',()=>queueMicrotask(surface));}document.addEventListener('onda-country-selected',countryChanged);document.addEventListener('onda-map-opened',surface);document.addEventListener('onda-map-closed',()=>queueMicrotask(surface));document.addEventListener('onda-station-changing',()=>{if(selected)stopPlayback(true);});document.addEventListener('onda-language-changed',()=>{categories();labels();$('#podcastGrid').dataset.signature='';$('#podcastEpisodes').dataset.signature='';renderShows();renderEpisodes();if(program)favoriteButton($('#podcastProgramFavorite'),program);});document.addEventListener('visibilitychange',()=>{if(document.hidden)savePosition();else if(mode&&!page.hidden&&!busy&&Date.now()-checked>=300000)refresh(true);schedule();});window.addEventListener('pagehide',savePosition);
 function back(){
  if(!mode)return false;
  if(!$('#podcastSpeedPanel').hidden){setSpeedPanel(false,true);return true;}
  if(library&&libraryBackToPodcasts){open();return true;}
  if(!library&&program){$('#podcastBack').click();return true;}
  close(true);return true;
 }
 globalThis.OndaPodcasts={back,openLibrary,isOpen:()=>mode,countryChanged,ownsPlayback:()=>Boolean(selected),open,handleMediaCommand(event){if(!selected)return false;const expected='podcast:'+selected.showId+':'+selected.id;if(event.command==='idle-stop'&&event.stationId&&event.stationId!==expected)return true;switch(event.command){case 'play':resume();break;case 'pause':podcastAudio.pause();break;case 'previous':seek(-15);break;case 'next':seek(15);break;case 'idle-stop':if(!podcastAudio.paused&&!waiting&&!podcastAudio.error){lastNative='';nativeSync();break;}stopPlayback();$('#podcastPlaybackStatus').textContent=tr('El episodio se ha detenido por inactividad. Pulsa reproducir para continuar.');break;case 'stop':stopPlayback();native?.stop().catch(()=>{});break;}return true;}};
 categories();labels();surface();
})();
