const assert = require('assert');
const { translateText } = require('./i18n.js');

const enCases = [
  ['حجز هالتك', 'Hagz Halletak'],
  ['القاهرة الجديدة', 'New Cairo'],
  ['15 أكتوبر 2027 · القاهرة الجديدة · 300 ضيف', '15 October 2027 · New Cairo · 300 guests'],
  ['شوف القاعات المتاحة ←', 'See available venues →'],
  ['متاح', 'Available'],
  ['محجوز', 'Booked'],
  ['السعر', 'Price'],
  ['التوافر', 'Availability'],
  ['طريقة دفع العربون', 'Deposit payment method'],
  ['قول أنت عايز إيه، وخلي القاعات تتنافس على الطلب', 'Tell us what you need and let venues compete for it'],
  ['قاعتك', 'Your venue'],
  ['فاضية يوم إيه؟', 'When is it available?']
];

for (const [source, expected] of enCases) {
  assert.strictEqual(translateText(source, 'en'), expected, `EN translation failed for: ${source}`);
}

const arCases = [
  ['Home', 'الرئيسية'],
  ['Customer', 'العميل'],
  ['Venue Owner', 'صاحب القاعة'],
  ['Platform Admin', 'إدارة المنصة'],
  ['Product Vision', 'رؤية المنتج'],
  ['Live availability', 'توافر مباشر'],
  ['Bookings this month', 'حجوزات هذا الشهر'],
  ['Marketplace Intelligence', 'تحليلات السوق'],
  ['Request Offers', 'اطلب عروض']
];

for (const [source, expected] of arCases) {
  assert.strictEqual(translateText(source, 'ar'), expected, `AR translation failed for: ${source}`);
}

const englishRepresentative = [
  'قاعتك',
  'فاضية يوم إيه؟',
  'اختار التاريخ وشوف القاعات المتاحة فعليًا، قارن، احجز زيارة، اعمل Hold، وكمل الحجز. وفي الخلفية صاحب القاعة بيدير كل حاجة من VenueOS.',
  '15 أكتوبر 2027 · القاهرة الجديدة · 300 ضيف',
  'الطلب على 15 أكتوبر أعلى بوضوح من العرض المؤكد.'
].map(x => translateText(x, 'en'));

for (const text of englishRepresentative) {
  assert(!/[\u0600-\u06FF]/.test(text), `Arabic leakage in EN representative text: ${text}`);
}

console.log('i18n translation tests passed');
