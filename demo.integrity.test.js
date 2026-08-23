const fs = require('fs');
const assert = require('assert');

const read = p => fs.readFileSync(p, 'utf8');
const index = read('index.html');
const audit = read('audit.js');
const css = read('audit.css');
const workflow = read('.github/workflows/pages.yml');

for (const file of ['styles.css','i18n.css','audit.css','i18n.js','app.js','extras.js','audit.js']) {
  assert(index.includes(file), `index.html is missing ${file}`);
}

const requiredRoutes = [
  "p==='account'",
  "p==='visits'",
  "p==='messages'",
  "p==='notifications'",
  "p==='booking-details'",
  "p==='refund'",
  "p==='states'",
  "p==='package-builder'",
  "p==='map'",
  "a==='visits'",
  "a==='booking-detail'",
  "a==='datedrop'",
  "a==='team'",
  "a==='verification'",
  "a==='disputes'",
  "a==='payouts'",
  "a==='promotions'",
  "a==='support'",
  "p==='investor'"
];
for (const route of requiredRoutes) assert(audit.includes(route), `Missing demo route: ${route}`);

for (const marker of ['@media(max-width:1020px)','@media(max-width:760px)','@media(max-width:520px)','@media(prefers-reduced-motion:reduce)']) {
  assert(css.includes(marker), `Missing responsive/accessibility marker: ${marker}`);
}

assert(index.indexOf('i18n.js') < index.indexOf('app.js'), 'i18n.js must load before app.js');
assert(index.indexOf('app.js') < index.indexOf('extras.js'), 'app.js must load before extras.js');
assert(index.indexOf('extras.js') < index.indexOf('audit.js'), 'audit.js must load after extras.js');
assert(index.includes('data-lang="ar"') && index.includes('data-lang="en"'), 'Language switch is incomplete');
assert(audit.includes("hh:languagechange"), 'Audit layer must react to language changes');
assert(audit.includes('demo-guide-trigger'), 'Presentation demo guide missing');
assert(audit.includes('auditResetDemo'), 'Reset Demo control missing');
assert(audit.includes('skip-link'), 'Accessibility skip link missing');

for (const required of ['node --check audit.js','node demo.integrity.test.js']) {
  assert(workflow.includes(required), `Pages workflow missing validation: ${required}`);
}

console.log('demo integrity tests passed');
