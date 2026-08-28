const fs=require('fs');
const assert=require('assert');
const js=fs.readFileSync('dawwar-plain-copy.js','utf8');
const index=fs.readFileSync('index.html','utf8');

assert(index.includes('dawwar-plain-copy.js'),'plain-copy layer must load');
for(const marker of [
  'ورّيني القاعات','Show me venues','فريق القاعة','Venue team',
  'الاستقبال أو الأمن','reception or security','مفيش حجز، مفيش عمولة','No booking, no fee',
  'إدارة دوّر في شاشة واحدة','Run Dawwar from one simple screen'
]) assert(js.includes(marker),`missing plain-copy marker: ${marker}`);

const pair=/L\('([^']*)','([^']*)'\)/g;
let m,count=0;
while((m=pair.exec(js))){
  count++;
  assert(!/[A-Za-z]/.test(m[1]),`Arabic copy contains Latin letters: ${m[1]}`);
  assert(!/[\u0600-\u06FF]/.test(m[2]),`English copy contains Arabic letters: ${m[2]}`);
}
assert(count>20,'expected many bilingual copy pairs');
assert(!/كريم|آية|Karim|Aya/.test(js),'legacy demo names must not return');
console.log('dawwar-plain-copy.test.js: OK');