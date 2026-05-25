const CACHE_NOMBRE = "Hormiga-v1";

const ARCHIVOS_CACHE = [
    "/",
    "/jugar",
    "/apple-touch-icon.png",
    "/mano-png.svg",
    "/icon-192.png",
    "/icon-512.png",
    "/screenshot-escritorio.png",
    "/screenshot-movil.png",

];

//al instalar el nuevo sw.js vamos a guardar los archivos esenciales

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NOMBRE).then((cache) => {
      return cache.addAll(ARCHIVOS_CACHE);
    }),
  );
  self.skipWaiting();
});

//Al activar el nuevo sw.js
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((nombres) =>
        Promise.all(
          nombres
            .filter((nombre) => nombre !== CACHE_NOMBRE)
            .map((nombre) => caches.delete(nombre)),
        ),
      ),
  )
  self.clients.claim();
})
self.addEventListener('fetch',(e)=>{
    //Dejo pasar sin interferir en todas las peticiones que no sean GET
if(e.request.method !=="GET") return; 

//Dejo pasar todo lo que no se dirija a mi domínio
if(!e.request.url.starWith(self.location.origin))return;

//a los assets de next le devolvemos siempre la respuesta desde in
if(e.request.url.includes('/_next/')){
    e.respondWith(fetch(e.request));
    return;
}

if(e.request.url.includes('/api/')){
    e.respondWith(fetch(e.request));
    return;
}

//El resto de las peticiones pasarán por aquí
//donde usaremos una estrategia de network first
e.respondWith(
    fetch(e.request)
.then((respuesta)=>{
    // comprobamos que la respuesta sea válida
    if(respuesta && respuesta.status ===200){
        //Guardamos una copia de la respuesta en la cache
        const copiaRespuesta = respuesta.clone();
        caches.open(CACHE_NOMBRE).then((cache)=>{
            cache.put(e.request)
        })
    }
    return respuesta;
})
.catch(()=>{
    //si falla el fetch
    return caches.match(e.request);
    
})
)

});
