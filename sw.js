const CACHE_NAME = 'v1'
const CACHE_ASSETS = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened caching');
                return cache.addAll(CACHE_ASSETS);
            })
    )
});

self.addEventListener('activate', e => {
    console.log('activating')
    e.waitUntil(
        caches.keys().then(cachesNames => {
            return Promise.all(
                cachesNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});




// self.addEventListener('fetch', event => {
//     console.log('fetch listener');
//     event.respondWith(
//         caches.match(event.request)
//         .then(response => {
//             if (response){
//                 return response;
//             }

//         return fetch(e.request)
//             .then(response => {
//                 if(!response || response.status !== 200 || response.type !== 'basic') {
//                     return response;
//                 }
//                 const responseToCache = response.clone();
//                 caches.open(CACHE_NAME)
//                     .then(cache => {
//                         console.log('caching');
//                         cache.put(event.request, responseToCache);
//                     })
//                 return response;
//             });
//         }));
// })
self.addEventListener('fetch', event => {
    console.log('fetch listener');
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request);
            })
    );
})