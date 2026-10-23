// The lateral menu has been replaced by direct responsive navigation.
(()=>{const placeholder=document.createElement('button');placeholder.id='toggleSidebar';placeholder.hidden=true;document.querySelector('header').append(placeholder);document.querySelector('aside').hidden=true;document.body.classList.add('sidebar-hidden')})();
