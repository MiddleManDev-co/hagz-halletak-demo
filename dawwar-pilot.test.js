const fs=require('fs');const assert=require('assert');
const index=fs.readFileSync('index.html','utf8');
const js=fs.readFileSync('dawwar-pilot.js','utf8');
const css=fs.readFileSync('dawwar-pilot.css','utf8');
const workflow=fs.readFileSync('.github/workflows/pages.yml','utf8');

assert(index.includes('<title>Dawwar'), 'Dawwar must be the visible product brand');
assert(index.includes('dawwar-pilot.css') && index.includes('dawwar-pilot.js'),'pilot layer must load from index');
assert(index.indexOf('ui-refinement.js') < index.indexOf('dawwar-pilot.js'),'pilot layer must load after existing demo layers');
for(const marker of ['Commission only','Request-to-Book','pilot/request','pilot/quote','pilot/confirmed','pilot/commission','pilot/ops','VenueOS Lite','Future Vision'])assert(js.includes(marker),`pilot marker missing: ${marker}`);
assert(js.includes('Customer pays venue directly') || js.includes('Deposit is paid directly to the venue'),'pilot must state direct customer-to-venue payment');
assert(js.includes('No online hold') || js.includes('No platform payment'),'pilot must not imply hard holds/payment orchestration are launch scope');
assert(css.includes('@media(max-width:620px)'),'pilot must support mobile');
assert(css.includes('@media(prefers-reduced-motion:reduce)'),'pilot must respect reduced motion');
for(const required of ['node --check dawwar-pilot.js','node --check dawwar-pilot.test.js','node dawwar-pilot.test.js'])assert(workflow.includes(required),`workflow missing ${required}`);
console.log('Dawwar pilot tests passed');
