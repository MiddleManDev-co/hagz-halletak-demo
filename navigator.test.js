const fs=require('fs');const assert=require('assert');
const index=fs.readFileSync('index.html','utf8');
const js=fs.readFileSync('navigator.js','utf8');
const css=fs.readFileSync('navigator.css','utf8');
for(const f of ['navigator.css','navigator.js'])assert(index.includes(f),`index missing ${f}`);
for(const id of ['full','customer','venue','admin','investor'])assert(js.includes(`${id}:`),`tour missing: ${id}`);
for(const route of [
 'venue/royal-garden','pilot/request/royal-garden','pilot/quote/royal-garden','pilot/confirmed',
 'venue-os/visits','venue-os/bookings','pilot/commission','pilot/ops','admin/verification','admin/bookings','admin/support','vision','investor'
])assert(js.includes(`'${route}'`),`guided route missing: ${route}`);
for(const fn of ['hhOpenDemoNavigator','hhStartTour','hhTourNext','hhTourBack','hhTakeSmartNext','hhResetGuidedDemo','hhStopTour'])assert(js.includes(fn),`global action missing: ${fn}`);
assert(js.includes('hh:languagechange'),'navigator must react to language changes');
assert(js.includes('No booking, no fee'),'venue tour must explain commission in plain language');
assert(js.includes('reception or security'),'venue tour must include the visit view used by front-desk/security staff');
assert(!js.includes("['admin/overview','admin'"),'pilot admin tour must not present legacy scale metrics as the main story');
assert(js.indexOf("'venue-os/leads'") < js.indexOf("'venue-os/visits'"),'venue requests must come before visits');
assert(js.indexOf("'venue-os/visits'") < js.indexOf("'venue-os/bookings'"),'venue visits must come before bookings');
assert(css.includes('@media(max-width:760px)'),'mobile navigator styles missing');
assert(css.includes('@media(prefers-reduced-motion:reduce)'),'reduced motion support missing');
console.log('Dawwar demo navigator tests passed');