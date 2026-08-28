const fs=require('fs');const assert=require('assert');
const index=fs.readFileSync('index.html','utf8');
const js=fs.readFileSync('persona-ui.js','utf8');
const css=fs.readFileSync('persona-ui.css','utf8');
for(const f of ['persona-ui.css','persona-ui.js'])assert(index.includes(f),`index missing ${f}`);
for(const role of ['customer','venue','admin','investor'])assert(js.includes(`${role}:` )||js.includes(`'${role}'`),`missing role ${role}`);
for(const route of [
 'home','explore','my-wedding','visits','messages','account',
 'venue-os/overview','venue-os/calendar','venue-os/leads','venue-os/visits','venue-os/bookings','venue-os/team',
 'pilot/ops','admin/verification','admin/venues','admin/bookings','admin/support',
 'investor','vision','admin/economics','admin/marketplace-health','strategy-simulator'
])assert(js.includes(route),`missing persona route ${route}`);
assert(js.includes("admin:'pilot/ops'"),'admin home must be pilot operations, not legacy platform metrics');
assert(!/venue:\(\)=>\[[\s\S]*venue-os\/business-center[\s\S]*\]/.test(js),'advanced business center must not crowd the venue pilot nav');
assert(js.includes('renderMainNav'),'role-aware top navigation missing');
assert(js.includes('renderMobileNav'),'role-aware mobile navigation missing');
assert(js.includes('inferRole'),'route-to-role synchronization missing');
assert(js.includes('hhSwitchRole'),'role switch action missing');
assert(js.includes("body.dataset.demoRole"),'role visual state missing');
for(const bp of ['@media(max-width:1020px)','@media(max-width:760px)','@media(max-width:480px)'])assert(css.includes(bp),`missing responsive breakpoint ${bp}`);
console.log('persona workspace tests passed');