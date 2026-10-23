(()=>{
 const info=document.querySelector('.now-playing-info');
 info?.querySelector('.np-note')?.remove();
 info?.querySelector('.np-label')?.remove();
 if(info)document.querySelector('#nowName').after(info);
})();
