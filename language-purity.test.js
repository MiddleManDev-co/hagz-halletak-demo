const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

let language = 'ar';
const documentStub = {
  readyState: 'loading',
  body: {},
  documentElement: {},
  title: '',
  addEventListener() {},
  querySelectorAll() { return []; },
  createTreeWalker() { return { currentNode: null, nextNode() { return false; } }; }
};

const windowStub = {
  hhGetLanguage: () => language,
  addEventListener() {}
};

const context = {
  window: windowStub,
  document: documentStub,
  NodeFilter: { SHOW_TEXT: 4 },
  MutationObserver: class { observe() {} },
  localStorage: { getItem() { return language; } },
  setTimeout() {},
  clearTimeout() {},
  console
};
windowStub.window = windowStub;
windowStub.document = documentStub;

vm.runInNewContext(fs.readFileSync('language-purity.js', 'utf8'), context, { filename: 'language-purity.js' });
vm.runInNewContext(fs.readFileSync('language-purity-terms.js', 'utf8'), context, { filename: 'language-purity-terms.js' });

const purify = value => windowStub.dawwarPurifyTerminology(windowStub.dawwarPurifyText(value));

language = 'ar';
const arabic = purify('Dawwar Pilot · Royal Garden · Karim & Aya · Leads CRM · Online Payment · BI · AI · GMV · SaaS');
assert(!/[A-Za-z]/.test(arabic), `Arabic mode leaked Latin copy: ${arabic}`);
assert(arabic.includes('دوّر'), arabic);
assert(arabic.includes('رويال جاردن'), arabic);
assert(arabic.includes('محمود وسلمى'), arabic);
assert(!/كريم|آية|Karim|Aya/.test(arabic), arabic);

language = 'en';
const english = purify('نسخة دوّر التجريبية · رويال جاردن · محمود وسلمى · إدارة العملاء المحتملين · الدفع الإلكتروني · ذكاء الأعمال · الذكاء الاصطناعي');
assert(!/[\u0600-\u06FF]/.test(english), `English mode leaked Arabic copy: ${english}`);
assert(english.includes('Dawwar'), english);
assert(english.includes('Royal Garden'), english);
assert(english.includes('Mahmoud & Salma'), english);
assert(!/كريم|آية|Karim|Aya/.test(english), english);

const index = fs.readFileSync('index.html', 'utf8');
assert(index.includes('language-purity.js'));
assert(index.includes('language-purity-terms.js'));
assert(!/Karim|Aya|كريم|آية/.test(index), 'Legacy demo names must not appear in the static shell');
assert(index.includes('دوّر | عرض تفاعلي للمنتج'));

console.log('language-purity.test.js: OK');
