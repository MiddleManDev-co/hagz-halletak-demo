(function(){
'use strict';

const isEn = () => window.hhGetLanguage?.() === 'en';
const L = (ar,en) => isEn() ? en : ar;
const routeNow = () => (location.hash.replace(/^#\/?/, '') || 'home');
const lang = () => isEn() ? 'en' : 'ar';

const tours = {
  full: {
    label: () => L('الجولة الكاملة · 5 دقائق','Full story · 5 min'),
    note: () => L('أفضل اختيار لأول مرة','Best for a first-time viewer'),
    steps: [
      ['home','customer','ابدأ من المشكلة: ابحث بالتاريخ بدل الاتصال بكل قاعة.','Start with the problem: search by date instead of calling every venue.'],
      ['explore','customer','شوف القاعات المتاحة فعلًا والـMatch والفلترة.','See genuinely available venues, match scores, and filters.'],
      ['venue/royal-garden','customer','افتح القاعة وشوف التوافر والباقات والـHold.','Open a venue and inspect availability, packages, and the hold flow.'],
      ['package-builder/royal-garden','customer','خصص الباقة وشوف السعر يتغير قبل الحجز.','Customize the package and see price change before booking.'],
      ['booking/royal-garden','customer','راجع العربون والرصيد وطريقة الدفع التجريبية.','Review deposit, balance, and the simulated payment flow.'],
      ['success','customer','الحجز HGZ-2031 اتأكد؛ من هنا القصة تنتقل لصاحب القاعة.','Booking HGZ-2031 is confirmed; now the story moves to the venue.','booking'],
      ['venue-os/calendar','venue','نفس الحجز ظهر فورًا في Calendar ومنع الـdouble booking.','The same booking appears in Calendar and protects against double booking.','booking'],
      ['venue-os/quick-booking','venue','جرّب تسجيل Walk-in وشوف كشف التعارض قبل الحفظ.','Try a walk-in booking and see conflict detection before saving.','booking'],
      ['admin/verification','admin','الإدارة تراجع جودة العرض وصحة بيانات القاعات.','Platform operations verify venue quality and supply accuracy.','booking'],
      ['admin/disputes','admin','بعد الحجز، شوف النزاعات والاسترجاع كجزء من التشغيل الحقيقي.','After booking, inspect disputes and refunds as real platform operations.','booking'],
      ['investor','investor','اختم بالقصة التجارية: Marketplace + VenueOS + Transactions + Data.','Finish with the business story: Marketplace + VenueOS + Transactions + Data.','booking']
    ]
  },
  customer: {
    label: () => L('رحلة العميل · دقيقتان','Customer flow · 2 min'),
    note: () => L('من البحث للحجز وما بعده','Discovery to booking and aftercare'),
    steps: [
      ['home','customer','ابدأ من التاريخ والميزانية والسعة.','Start from date, budget, and capacity.'],
      ['explore','customer','قارن النتائج حسب التوافر والـMatch.','Compare results by availability and match.'],
      ['venue/royal-garden','customer','راجع التوافر والباقات ثم أكمل للحجز.','Review availability and packages, then continue to booking.'],
      ['booking/royal-garden','customer','اعرض تقسيم السعر والعربون.','Show the price breakdown and deposit.'],
      ['success','customer','أكد الحجز التجريبي.','Confirm the demo booking.','booking'],
      ['account','customer','اختم بما بعد الحجز: زيارات، دفعات، رسائل وتنبيهات.','Finish with post-booking: visits, payments, messages, and alerts.','booking']
    ]
  },
  venue: {
    label: () => L('تشغيل القاعة · دقيقتان','Venue operations · 2 min'),
    note: () => L('Calendar وCRM وQuick Booking','Calendar, CRM, and Quick Booking'),
    seedBooking: true,
    steps: [
      ['venue-os/overview','venue','ابدأ بالـKPIs وCalendar Health.','Start with KPIs and Calendar Health.','booking'],
      ['venue-os/calendar','venue','شوف الحجوزات Online + Offline في تقويم واحد.','See online and offline bookings in one calendar.','booking'],
      ['venue-os/leads','venue','تابع العميل من Lead إلى Won.','Track the customer from lead to won.','booking'],
      ['venue-os/quick-booking','venue','اعمل Walk-in booking واختبر منع التعارض.','Create a walk-in booking and test conflict prevention.','booking'],
      ['venue-os/datedrop','venue','حوّل اليوم الفاضي إلى DateDrop بدل خسارة الإيراد.','Turn an empty date into a DateDrop instead of lost revenue.','booking'],
      ['venue-os/analytics','venue','اختم بالإيراد والإشغال والطلب المفقود.','Finish with revenue, occupancy, and lost demand.','booking']
    ]
  },
  admin: {
    label: () => L('إدارة المنصة · دقيقتان','Platform admin · 2 min'),
    note: () => L('Trust وPayments وMarketplace Ops','Trust, payments, and marketplace ops'),
    seedBooking: true,
    steps: [
      ['admin/overview','admin','ابدأ من GMV والطلب والفجوة بين العرض والطلب.','Start with GMV, demand, and the supply gap.','booking'],
      ['admin/verification','admin','راجع القاعات قبل ما تبقى Supply موثوق.','Verify venues before they become trusted supply.','booking'],
      ['admin/bookings','admin','تابع الحجز والدفع من منظور المنصة.','Monitor bookings and payments from the platform view.','booking'],
      ['admin/disputes','admin','شوف النزاعات والاسترجاع بدل تجاهل الحالات الصعبة.','Inspect disputes and refunds instead of hiding edge cases.','booking'],
      ['admin/payouts','admin','اعرض العمولة والتحويلات لصاحب القاعة.','Show commission and venue payouts.','booking'],
      ['admin/analytics','admin','اختم بذكاء السوق ومناطق التوسع.','Finish with marketplace intelligence and expansion signals.','booking']
    ]
  },
  investor: {
    label: () => L('قصة المستثمر · 90 ثانية','Investor story · 90 sec'),
    note: () => L('المشكلة → الحل → الـMoat','Problem → solution → moat'),
    seedBooking: true,
    steps: [
      ['home','customer','المشكلة: البحث مجزأ والتوافر غير واضح.','Problem: discovery is fragmented and availability is opaque.'],
      ['venue-os/overview','venue','الحل مش Marketplace فقط؛ VenueOS يملك مصدر التوافر.','The solution is not only a marketplace; VenueOS owns the availability source.','booking'],
      ['admin/analytics','admin','المنصة تحول التشغيل إلى بيانات طلب وعرض قابلة للتوسع.','Operations become scalable supply-and-demand intelligence.','booking'],
      ['investor','investor','اختم بالـflywheel والربح والـmoat.','Finish with the flywheel, monetization, and moat.','booking']
    ]
  }
};

let activeTour = null;
let stepIndex = 0;
let launcherOpen = false;
let welcomeOpen = false;

function seedBooking(){
  try { localStorage.setItem('hh-booking','1'); } catch(_){}
  if (window.state) window.state.bookingCreated = true;
}

function persist(){
  try {
    if (activeTour) {
      localStorage.setItem('hh-guide-tour',activeTour);
      localStorage.setItem('hh-guide-step',String(stepIndex));
    } else {
      localStorage.removeItem('hh-guide-tour');
      localStorage.removeItem('hh-guide-step');
    }
  } catch(_){}
}

function setPersonaAndRoute(persona, route){
  if (persona === 'investor') {
    try { localStorage.setItem('hh-persona','investor'); } catch(_){}
    if (window.state) window.state.persona = 'investor';
    window.navTo?.(route);
    return;
  }
  if (window.setPersona) window.setPersona(persona, route);
  else window.navTo?.(route);
}

function currentStep(){
  return activeTour ? tours[activeTour]?.steps[stepIndex] : null;
}

function stepTo(i){
  if (!activeTour || !tours[activeTour]) return;
  const max = tours[activeTour].steps.length - 1;
  stepIndex = Math.max(0, Math.min(i,max));
  const s = currentStep();
  if (!s) return;
  if (tours[activeTour].seedBooking || s[4] === 'booking') seedBooking();
  persist();
  setPersonaAndRoute(s[1],s[0]);
  setTimeout(renderAll,80);
}

function startTour(id){
  if (!tours[id]) return;
  activeTour=id; stepIndex=0; launcherOpen=false; welcomeOpen=false;
  try { localStorage.setItem('hh-guide-welcome','1'); } catch(_){}
  if (tours[id].seedBooking) seedBooking();
  persist();
  stepTo(0);
}

function stopTour(){
  activeTour=null; stepIndex=0; persist(); renderAll();
}

function resetDemo(){
  const keepLang = (()=>{try{return localStorage.getItem('hh-lang')}catch(_){return null}})();
  const keepWelcome = '1';
  try {
    Object.keys(localStorage).filter(k=>k.startsWith('hh-')).forEach(k=>localStorage.removeItem(k));
    if (keepLang) localStorage.setItem('hh-lang',keepLang);
    localStorage.setItem('hh-guide-welcome',keepWelcome);
  } catch(_){}
  activeTour=null;stepIndex=0;launcherOpen=false;welcomeOpen=false;
  if(window.state){
    window.state.bookingCreated=false;
    window.state.persona='customer';
    window.state.shortlist=['royal-garden','luma-hall','nile-palace'];
  }
  location.hash='#/home';
  setTimeout(()=>location.reload(),120);
}

function smartNext(){
  const r=routeNow();
  const map = {
    'home':['explore','customer',L('شوف النتائج','See results')],
    'explore':['venue/royal-garden','customer',L('افتح أفضل Match','Open best match')],
    'venue/royal-garden':['package-builder/royal-garden','customer',L('خصص الباقة','Customize package')],
    'package-builder/royal-garden':['booking/royal-garden','customer',L('كمّل للحجز','Continue to booking')],
    'booking/royal-garden':['success','customer',L('اعرض نجاح الحجز','Show booking success'),'booking'],
    'success':['venue-os/calendar','venue',L('شوفه عند القاعة','See it in VenueOS'),'booking'],
    'account':['venue-os/calendar','venue',L('انتقل لصاحب القاعة','Switch to venue'),'booking'],
    'venue-os/overview':['venue-os/calendar','venue',L('افتح التقويم','Open calendar'),'booking'],
    'venue-os/calendar':['venue-os/quick-booking','venue',L('جرّب Quick Booking','Try Quick Booking'),'booking'],
    'venue-os/quick-booking':['admin/overview','admin',L('انتقل للإدارة','Switch to Admin'),'booking'],
    'admin/overview':['admin/verification','admin',L('راجع التحقق','Review verification'),'booking'],
    'admin/verification':['admin/disputes','admin',L('شوف النزاعات','See disputes'),'booking'],
    'admin/disputes':['investor','investor',L('اختم بقصة المستثمر','Finish with investor story'),'booking'],
    'vision':['investor','investor',L('شوف الـBusiness Story','See business story'),'booking']
  };
  return map[r] || null;
}

function takeSmartNext(){
  const n=smartNext(); if(!n)return;
  if(n[3]==='booking')seedBooking();
  setPersonaAndRoute(n[1],n[0]);
}

function ensureRoot(){
  let root=document.querySelector('#demoNavigatorRoot');
  if(!root){root=document.createElement('div');root.id='demoNavigatorRoot';document.body.appendChild(root)}
  return root;
}

function launcherHtml(){
  return `<div class="dn-backdrop" onclick="if(event.target===this)hhCloseDemoNavigator()">
    <section class="dn-launcher" role="dialog" aria-modal="true" aria-label="${L('موجه الديمو','Demo Navigator')}">
      <div class="dn-head"><div><span class="badge blue">${L('عرض أسهل','Easier demo')}</span><h2>${L('إنت عايز تعرض إيه؟','What do you want to show?')}</h2><p>${L('اختار سيناريو، وأنا همشيك خطوة بخطوة مع تبديل المنظور تلقائيًا.','Choose a scenario and get a step-by-step path with automatic persona switching.')}</p></div><button class="dn-x" onclick="hhCloseDemoNavigator()">✕</button></div>
      <div class="dn-tour-grid">
        ${Object.entries(tours).map(([id,t],idx)=>`<button class="dn-tour ${idx===0?'recommended':''}" onclick="hhStartTour('${id}')">
          <span class="dn-tour-icon">${['◎','💍','🏛','🛡','📈'][idx]}</span>
          <strong>${t.label()}</strong><small>${t.note()}</small>
          ${idx===0?`<em>${L('مقترح','Recommended')}</em>`:''}
        </button>`).join('')}
      </div>
      <div class="dn-launcher-foot">
        <button class="btn btn-light" onclick="hhCloseDemoNavigator();navTo('home')">${L('استكشف براحتك','Explore freely')}</button>
        <button class="btn btn-light" onclick="hhCloseDemoNavigator();auditToggleGuide?.(true)">${L('خريطة كل الشاشات','All screens map')}</button>
        <button class="btn btn-soft" onclick="hhResetGuidedDemo()">↻ ${L('Reset Demo','Reset Demo')}</button>
      </div>
    </section>
  </div>`;
}

function welcomeHtml(){
  return `<div class="dn-backdrop dn-welcome-backdrop">
    <section class="dn-welcome" role="dialog" aria-modal="true">
      <span class="dn-spark">✦</span>
      <div class="kicker">${L('حجز هالتك · Interactive Demo','Hagz Halletak · Interactive Demo')}</div>
      <h1>${L('شوف المنتج كله من غير ما تتوه','See the whole product without getting lost')}</h1>
      <p>${L('الديمو كبير عن قصد. الجولة الموجهة هتوريك أهم قصة في حوالي 5 دقائق، وبعدها تقدر تستكشف أي جزء براحتك.','The demo is intentionally broad. The guided story shows the strongest flow in about five minutes, then you can explore anything freely.')}</p>
      <div class="dn-welcome-actions">
        <button class="btn btn-primary" onclick="hhStartTour('full')">▶ ${L('ابدأ الجولة الكاملة','Start full guided tour')}</button>
        <button class="btn btn-light" onclick="hhDismissWelcome();hhOpenDemoNavigator()">${L('اختار سيناريو','Choose a scenario')}</button>
        <button class="btn btn-ghost" onclick="hhDismissWelcome()">${L('هستكشف بنفسي','I’ll explore myself')}</button>
      </div>
      <small>${L('تقدر تفتح الموجه في أي وقت من زر “Guide”.','You can reopen the navigator any time from the “Guide” button.')}</small>
    </section>
  </div>`;
}

function progressHtml(){
  const t=tours[activeTour], s=currentStep(); if(!t||!s)return '';
  const pct=Math.round(((stepIndex+1)/t.steps.length)*100);
  return `<aside class="dn-progress">
    <div class="dn-progress-top">
      <div><span class="dn-step">${L('خطوة','Step')} ${stepIndex+1}/${t.steps.length}</span><strong>${t.label()}</strong></div>
      <button onclick="hhStopTour()" title="${L('إنهاء الجولة','Exit tour')}">✕</button>
    </div>
    <div class="dn-bar"><i style="width:${pct}%"></i></div>
    <p>${L(s[2],s[3])}</p>
    <div class="dn-progress-actions">
      <button class="btn btn-light btn-sm" onclick="hhTourBack()" ${stepIndex===0?'disabled':''}>${L('السابق','Back')}</button>
      <button class="btn btn-light btn-sm" onclick="hhOpenDemoNavigator()">${L('تغيير السيناريو','Change')}</button>
      ${stepIndex===t.steps.length-1
        ? `<button class="btn btn-primary btn-sm" onclick="hhStopTour()">${L('تم ✓','Done ✓')}</button>`
        : `<button class="btn btn-primary btn-sm" onclick="hhTourNext()">${L('التالي','Next')} ${isEn()?'→':'←'}</button>`}
    </div>
  </aside>`;
}

function smartBarHtml(){
  if(activeTour)return '';
  const n=smartNext(); if(!n)return '';
  return `<div class="dn-smartbar">
    <div><span>${L('الخطوة المقترحة','Suggested next')}</span><strong>${n[2]}</strong></div>
    <button onclick="hhTakeSmartNext()">${L('كمل القصة','Continue story')} ${isEn()?'→':'←'}</button>
  </div>`;
}

function guideButtonHtml(){
  return `<button class="dn-guide-btn" onclick="hhOpenDemoNavigator()" aria-label="${L('موجه الديمو','Demo guide')}"><span>◎</span><strong>${L('Guide','Guide')}</strong></button>`;
}

function renderAll(){
  const root=ensureRoot();
  root.innerHTML = `${welcomeOpen?welcomeHtml():''}${launcherOpen?launcherHtml():''}${progressHtml()}${smartBarHtml()}${guideButtonHtml()}`;
  const old=document.querySelector('.floating-demo');
  if(old)old.style.display='none';
}

function restore(){
  try {
    const t=localStorage.getItem('hh-guide-tour');
    const i=parseInt(localStorage.getItem('hh-guide-step')||'0',10);
    if(t&&tours[t]){activeTour=t;stepIndex=Math.max(0,Math.min(i,tours[t].steps.length-1))}
    welcomeOpen=!localStorage.getItem('hh-guide-welcome')&&!activeTour;
  } catch(_){welcomeOpen=!activeTour}
}

window.hhOpenDemoNavigator=()=>{launcherOpen=true;welcomeOpen=false;renderAll()};
window.hhCloseDemoNavigator=()=>{launcherOpen=false;renderAll()};
window.hhDismissWelcome=()=>{welcomeOpen=false;try{localStorage.setItem('hh-guide-welcome','1')}catch(_){}renderAll()};
window.hhStartTour=startTour;
window.hhStopTour=stopTour;
window.hhTourNext=()=>stepTo(stepIndex+1);
window.hhTourBack=()=>stepTo(stepIndex-1);
window.hhTakeSmartNext=takeSmartNext;
window.hhResetGuidedDemo=resetDemo;

window.addEventListener('hashchange',()=>setTimeout(renderAll,100));
window.addEventListener('hh:languagechange',()=>setTimeout(renderAll,40));
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){launcherOpen=false;welcomeOpen=false;renderAll()}
  if(activeTour&&e.altKey&&e.key==='ArrowRight')stepTo(stepIndex+1);
  if(activeTour&&e.altKey&&e.key==='ArrowLeft')stepTo(stepIndex-1);
});
document.addEventListener('DOMContentLoaded',()=>{restore();setTimeout(renderAll,180)});
})();