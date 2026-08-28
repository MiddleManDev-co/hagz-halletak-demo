const assert=require('assert');
const fs=require('fs');

const pilot=fs.readFileSync('dawwar-pilot.js','utf8');
const navigator=fs.readFileSync('navigator.js','utf8');
const legacy=fs.readFileSync('locale-legacy-v2.js','utf8');
const index=fs.readFileSync('index.html','utf8');

function unescape(value){return value.replace(/\\'/g,"'").replace(/\\n/g,'\n');}
function visible(value){return value
  .replace(/<[^>]+>/g,'')
  .replace(/DWR-\d+/g,'')
  .replace(/RQ-\d+/g,'')
  .replace(/360°?/g,'')
  .replace(/[\d.,%+–—←→/·:&()#\s-]+/g,' ')
  .trim();
}
function assertPairs(source,name){
  const re=/L\('((?:\\'|[^'])*)','((?:\\'|[^'])*)'\)/g;
  let count=0,m;
  while((m=re.exec(source))){
    count++;
    const ar=visible(unescape(m[1]));
    const en=visible(unescape(m[2]));
    assert(!/[A-Za-z]/.test(ar),`${name} Arabic copy leaked Latin text: ${m[1]}`);
    assert(!/[\u0600-\u06FF]/.test(en),`${name} English copy leaked Arabic text: ${m[2]}`);
  }
  assert(count>20,`${name} should contain explicit bilingual copy pairs`);
}

assertPairs(pilot,'dawwar-pilot.js');
assertPairs(navigator,'navigator.js');

assert(index.includes('locale-legacy-v2.js'),'safe legacy locale layer must be loaded');
assert(!index.includes('language-purity.js'),'broad language-purity observer must not load');
assert(!index.includes('language-purity-terms.js'),'generic terminology observer must not load');
assert(index.includes('دوّر | عرض تفاعلي للمنتج'));
assert(!/Karim|Aya|كريم|آية/.test(index),'legacy couple names must not appear in first paint');

for(const required of [
  "['Karim & Aya','محمود وسلمى']",
  "['كريم وآية','محمود وسلمى']",
  "['محمود وسلمى','Mahmoud & Salma']",
  "['Royal Garden','رويال جاردن']",
  "['رويال جاردن','Royal Garden']"
])assert(legacy.includes(required),`legacy exact localization missing: ${required}`);

assert(!legacy.includes('.split(from).join(to)'),'locale v2 must not use generic substring replacement');
console.log('language-purity.test.js: native bilingual copy OK');
