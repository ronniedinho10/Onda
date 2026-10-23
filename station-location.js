(()=>{
 const normal=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
 const nationwide=new Set(['kissfm','kissfmespana','kissfmmadrid','los40','los40espana','los40principales','los40principalesespana','los40classic','los40urban','cadena100','cadenadial','cope','cadenacope','cadenaser','ondacero','europafm','rockfm','rne','rneradionacional','radio3','radio3rne','radio5rne','radiomarca']);
 const catalan=new Set(['rac1','rac105','catalunyaradio','catalunyaradioexclusiu','catalunyamusica','icat','3catinfo']);
 function isNational(s){if(s.countrycode==='ES'&&catalan.has(normal(s.name)))return false;return s.national===true||(s.national!==false&&s.countrycode==='ES'&&nationwide.has(normal(s.name)))}
 function country(s){return globalThis.OndaI18n?.country(s.countrycode,s.country||'')||s.country||s.countrycode||'Radio mundial'}
 function region(s){let value=s.state||'';if(s.countrycode==='ES'&&catalan.has(normal(s.name)))value='Cataluña';if(['catalunya','cataluna','catalonia'].includes(normal(value)))return globalThis.OndaI18n?.language==='en'?'Catalonia':globalThis.OndaI18n?.language==='fr'?'Catalogne':'Cataluña';return String(value).trim()}
 function label(s){const name=country(s);if(isNational(s))return name;if(s.countrycode==='ES'&&catalan.has(normal(s.name)))return region(s)+' · '+name;const generic=new Set(['',normal(name),normal(s.country),normal(s.countrycode),'espana','spain','national','nationwide','nacional','todoelpais','unknown']);const city=String(s.city||'').trim(),state=region(s);const local=!generic.has(normal(city))?city:!generic.has(normal(state))?state:'';return local?local+' · '+name:name}
 globalThis.OndaStationLocation={label,isNational,region};
})();
