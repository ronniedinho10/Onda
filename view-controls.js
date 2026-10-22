(()=>{
 const tr=s=>OndaI18n.text(s);
 OndaI18n.register([['Ocultar menú','Hide menu','Masquer le menu'],['Mostrar menú','Show menu','Afficher le menu']]);
 const sidebar=document.querySelector('aside');sidebar.id='appSidebar';
 const menu=document.createElement('button');menu.id='toggleSidebar';menu.className='view-control';menu.setAttribute('aria-controls',sidebar.id);
 let collapsed=matchMedia('(max-width:760px)').matches;try{if(localStorage.getItem('onda-sidebar-hidden')!==null)collapsed=localStorage.getItem('onda-sidebar-hidden')==='true'}catch{}
 function sync(){document.body.classList.toggle('sidebar-hidden',collapsed);sidebar.hidden=collapsed;menu.textContent='☰';menu.title=tr(collapsed?'Mostrar menú':'Ocultar menú');menu.setAttribute('aria-label',menu.title);menu.setAttribute('aria-expanded',String(!collapsed));window.dispatchEvent(new Event('resize'))}
 menu.onclick=()=>{collapsed=!collapsed;try{localStorage.setItem('onda-sidebar-hidden',String(collapsed))}catch{}sync()};document.querySelector('header').prepend(menu);sync();
 document.addEventListener('onda-language-changed',sync);
})();
