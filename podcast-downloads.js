(() => {
 const limit = 200 * 1024 * 1024;
 let database;
 function open() {
  return database ??= new Promise((resolve, reject) => {
   const request = indexedDB.open('onda-podcast-downloads', 1);
   request.onupgradeneeded = () => request.result.createObjectStore('episodes', {keyPath: 'key'});
   request.onsuccess = () => resolve(request.result);
   request.onerror = () => reject(request.error);
  });
 }
 async function access(mode, action) {
  const db = await open();
  return new Promise((resolve, reject) => {
   const transaction = db.transaction('episodes', mode);
   const request = action(transaction.objectStore('episodes'));
   transaction.oncomplete = () => resolve(request.result);
   transaction.onabort = () => reject(transaction.error);
  });
 }
 const key = row => JSON.stringify([row.showId, row.id]);
 async function save(row, show) {
  const response = await fetch(row.audio, {credentials:'omit', referrerPolicy:'no-referrer'});
  if (!response.ok || Number(response.headers.get('content-length')) > limit) throw Error('Download unavailable');
  const reader = response.body.getReader();
  const parts = [];
  let bytes = 0;
  try {
   for (;;) {
    const {done, value} = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > limit) throw Error('Episode exceeds download limit');
    parts.push(value);
   }
  } finally {
   await reader.cancel().catch(() => {});
  }
  if (!bytes) throw Error('Empty episode');
  const blob = new Blob(parts, {type: response.headers.get('content-type') || 'audio/mpeg'});
  await access('readwrite', store => store.put({key:key(row), row, show, blob}));
 }
 globalThis.OndaPodcastDownloads = {
  save, key,
  list: async () => {
   const records = await access('readonly', store => store.getAll());
   return records.map(({key,row,show}) => ({key,row,show}));
  },
  get: row => access('readonly', store => store.get(key(row))),
  remove: row => access('readwrite', store => store.delete(key(row)))
 };
})();
