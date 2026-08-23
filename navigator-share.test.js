const fs=require('fs');const assert=require('assert');
const index=fs.readFileSync('index.html','utf8');
const js=fs.readFileSync('navigator-share.js','utf8');
for(const f of ['navigator-share.css','navigator-share.js'])assert(index.includes(f),`index missing ${f}`);
for(const id of ['full','customer','venue','admin','investor'])assert(js.includes(`'${id}'`),`share tour missing ${id}`);
assert(js.includes("URLSearchParams(location.search).get('tour')"),'direct tour query parsing missing');
assert(js.includes('hhCopyTourLink'),'copy tour link action missing');
assert(js.includes('hhStartTour'),'shared links must start guided tour');
console.log('shareable tour tests passed');