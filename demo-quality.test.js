const fs=require('fs');const assert=require('assert');
const index=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('demo-quality.css','utf8');
const persona=fs.readFileSync('persona-ui.js','utf8');
const nav=fs.readFileSync('navigator.js','utf8');

assert(index.includes('demo-quality.css'),'final presentation CSS must load');
for(const marker of ['.badge.green{color:#0f684b}','.badge.orange{color:#8d4600}','.badge.blue{color:#2f56b6}','focus-visible','@media(max-width:760px)','prefers-reduced-motion'])assert(css.includes(marker),`missing quality marker: ${marker}`);
for(const route of ['venue-os/visits','venue-os/bookings','admin/support'])assert(persona.includes(route)&&nav.includes(route),`people-first route missing from nav/tour: ${route}`);
assert(persona.includes("admin:'pilot/ops'"),'admin must land on pilot operations');
assert(nav.includes('No booking, no fee'),'simple commission message missing');
assert(nav.includes('reception or security'),'front desk/security story missing');
console.log('demo-quality.test.js: OK');