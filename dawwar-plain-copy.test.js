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

const visible=s=>s.replace(/<[^>]+>/g,'').replace(/&[a-z]+;/gi,'');
const pair=/L\('([^']*)','([^']*)'\)/g;
let m,count=0;
while((m=pair.exec(js))){
  count++;
  const ar=visible(m[1]);const en=visible(m[2]);
  assert(!/[A-Za-z]/.test(ar),`Arabic copy contains Latin letters: ${ar}`);
  assert(!/[\u0600-\u06FF]/.test(en),`English copy contains Arabic letters: ${en}`);
}
assert(count>20,'expected many bilingual copy pairs');
assert(!/كريم|آية|Karim|Aya/.test(js),'legacy demo names must not return');
console.log('dawwar-plain-copy.test.js: OK');