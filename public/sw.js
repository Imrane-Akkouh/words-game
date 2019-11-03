const cacheName = "wordsV1";
const staticAssets = [
    './',
    './index.html',
    './index.css',
    './explore.html',
    './explore.css',
    './quiz.html',
    './quiz.css',
    './tutorial.html',
    './tutorial.css',
    './explore.js',
    './manifest.json',
    './quiz.js',
    './chime.mp3'
]

self.addEventListener('install',async e=>{
    const cache = await caches.open(cacheName);
    cache.addAll(staticAssets);
    return self.skipWaiting();
})

self.addEventListener('active',async e=>{
    await self.clients.claim();
})

self.addEventListener('fetch', function (event) {
    // it can be empty if you just want to get rid of that error
});