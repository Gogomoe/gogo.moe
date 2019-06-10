const site = 'https://gogo.moe';
const cacheName = 'gogo.moe-v1';

const fetchInitParam = {
    method: 'GET',
    mode: 'cors'
};

this.addEventListener('fetch', function (event) {
    event.respondWith(respond(event));
});

function respond(event) {
    return caches.match(event.request).then(function (response) {

        let request = event.request.clone();

        if (response) {
            loadResource(request);
            return response;
        }

        return loadResource(request);

    })
}

function loadResource(request) {
    return tryFetch(request).then(function (httpRes) {

        if (!httpRes || httpRes.status !== 200) {
            throw httpRes
        }

        let responseClone = httpRes.clone();
        caches.open(cacheName).then(function (cache) {
            cache.put(request, responseClone);
        });

        return httpRes;
    })
}

function tryFetch(request) {
    if (request.url.startsWith(site)) {
        return fetch(request)
    } else {
        return fetchCros(request)
    }
}

function fetchCros(request) {
    return fetch(request.url, fetchInitParam);
}
