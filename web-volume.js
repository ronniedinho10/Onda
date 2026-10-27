(()=>{
 if(window.Capacitor?.isNativePlatform?.())return;
 const range=document.querySelector('#volume'),media=document.querySelector('#audio');if(!range||!media)return;
 const tr=text=>OndaI18n.text(text),buttons=[];let previous=Number(range.value)||.75;
 try{const saved=Number(localStorage.getItem('onda-last-audible-volume'));if(saved>0&&saved<=1)previous=saved}catch{}
 OndaI18n.register([['Silenciar radio','Mute radio','Couper le son'],['Restaurar sonido','Restore sound','Rétablir le son']]);
 const icon=muted=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4Z"/>'+(muted?'<path d="m16 9 5 6m0-6-5 6"/>':'<path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>')+'</svg>';
 const muted=()=>media.muted||Number(range.value)===0;
 function remember(value){if(value>0){previous=value;try{localStorage.setItem('onda-last-audible-volume',String(value))}catch{}}}
 function sync(){const silent=muted();for(const button of buttons){button.innerHTML=icon(silent);button.setAttribute('aria-pressed',String(silent));button.setAttribute('aria-label',tr(silent?'Restaurar sonido':'Silenciar radio'));button.title=tr(silent?'Restaurar sonido':'Silenciar radio');button.disabled=usesSystemVolume()}}
 function apply(){if(usesSystemVolume())return;if(!ctx)media.volume=outputVolume();if(gain)gain.gain.value=media.paused?0:outputVolume();sync()}
 function toggle(){if(usesSystemVolume())return;if(muted()){if(Number(range.value)===0){range.value=previous;range.dispatchEvent(new Event('input'))}media.muted=false}else{remember(Number(range.value));media.muted=true}apply()}
 for(const selector of ['.volume','.mini-volume']){const original=document.querySelector(selector);if(!original)continue;const wrapper=document.createElement('div'),input=original.querySelector('input'),button=document.createElement('button');wrapper.className=original.className;button.type='button';button.className='mute-toggle';button.onclick=toggle;wrapper.append(button,input);original.replaceWith(wrapper);buttons.push(button)}
 range.addEventListener('input',()=>{if(usesSystemVolume())return;const value=Number(range.value);remember(value);media.muted=value===0;apply()});media.addEventListener('volumechange',sync);document.addEventListener('onda-language-changed',sync);systemVolumeMedia.addEventListener?.('change',sync);sync();
})();
